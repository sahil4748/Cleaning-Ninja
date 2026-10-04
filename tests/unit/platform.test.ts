import './isolated-environment'
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { BUSINESS_CONFIG } from '../../content/business-config'
import { FEATURES, communicationChannels } from '../../content/features'
import { SERVICE_CATALOGUE } from '../../content/service-catalogue'
import { SERVICES, AUXILIARY_SERVICES } from '../../content/services'
import { PACKAGES } from '../../content/packages'
import { REVIEWS, reviewStats } from '../../content/reviews'
import { publicFacts, type BusinessFact } from '../../content/knowledge'
import { MEDIA, heroMedia, resolveMedia } from '../../content/media'
import { LeadSchema, LEAD_SOURCES } from '../../lib/lead-contract'
import { canTransition } from '../../lib/platform/booking'
import { leadService, createLeadService, type LeadRecord } from '../../lib/platform/lead-service'
import { assistantKnowledge, captureAssistantLead, AI_TOOL_PERMISSIONS } from '../../lib/platform/assistant'
import { serviceMetadata } from '../../lib/platform/metadata'
const lead = { schemaVersion: 1, channel: 'website', leadSource: 'homepage', intent: 'quote', name: 'Test Customer', phone: '0400000000', suburbOrAddress: 'Test suburb', service: 'carpet-cleaning', description: 'Synthetic cleaning enquiry' }

test('catalogue is unique, complete and shared with legacy identities', () => {
  assert.equal(SERVICE_CATALOGUE.length, 10)
  assert.equal(new Set(SERVICE_CATALOGUE.map(s => s.id)).size, 10)
  assert.equal(new Set(SERVICE_CATALOGUE.map(s => s.slug)).size, 10)
  for (const service of SERVICE_CATALOGUE) {
    assert.equal([...SERVICES, ...AUXILIARY_SERVICES].find(s => s.slug === service.slug)?.name, service.name)
    assert.ok(service.quoteEnabled && !service.bookingEnabled)
    assert.equal(service.coveragePolicy, 'check-on-enquiry')
    assert.ok(service.summary && service.description && service.seoDescription && service.quoteLabel)
    assert.ok(service.cardMediaKey in MEDIA.images)
    assert.ok(existsSync(`app${service.href}/page.tsx`))
  }
})
test('packages reference services and cannot publish unverified commercial terms', () => {
  assert.equal(PACKAGES.length, 5)
  assert.equal(new Set(PACKAGES.map(p => p.id)).size, 5)
  for (const item of PACKAGES) {
    assert.ok(SERVICE_CATALOGUE.some(s => s.id === item.service))
    assert.equal(item.commercialEnabled, false)
    for (const key of ['price', 'discount', 'terms', 'expiry', 'eligibility'] as const) assert.equal(item[key], null)
  }
})
test('safe business defaults never expose a phone or placeholder review', () => {
  assert.equal(BUSINESS_CONFIG.primaryEmail, 'contact@cleaningninja.co')
  assert.equal(BUSINESS_CONFIG.canonicalDomain, 'cleaningninja.co')
  assert.equal(BUSINESS_CONFIG.publicPhone, null)
  assert.equal(communicationChannels().phone.href, null)
  assert.equal(communicationChannels({ ...BUSINESS_CONFIG, publicPhone: 'unverified' }).phone.href, null)
  assert.equal(communicationChannels({ ...BUSINESS_CONFIG, phoneEnabled: true }).phone.href, null)
  for (const key of ['aiChat', 'aiVoice', 'phoneCalling', 'callback', 'booking', 'reviews', 'cinematicHero', 'advancedMotion'] as const) assert.equal(FEATURES[key], false)
  assert.deepEqual(REVIEWS, [])
  assert.equal(reviewStats().aggregateCount, 0)
  for (const status of ['pending', 'placeholder', 'do-not-publish'] as const) {
    const fact: BusinessFact = { id: 'test', value: 'unsafe', status, source: 'test', scope: 'test' }
    assert.deepEqual(publicFacts([fact]), [])
  }
})
test('lead sources, package relationships, consent and trusted timestamps are validated', () => {
  for (const leadSource of LEAD_SOURCES) assert.ok(LeadSchema.safeParse({ ...lead, leadSource }).success)
  for (const extra of [{ leadSource: 'invented' }, { service: 'invented' }, { package: PACKAGES[0].id, service: 'window-cleaning' }, { createdAt: '2020-01-01' }, { conversationContext: { summary: 'test', consentToStore: false } }, { sourcePage: '//external.example' }]) assert.equal(LeadSchema.safeParse({ ...lead, ...extra }).success, false)
  assert.ok(LeadSchema.safeParse({ ...lead, package: PACKAGES[0].id, service: PACKAGES[0].service }).success)
})
test('quote requests cannot become confirmed bookings or skip acknowledgement', () => {
  assert.ok(canTransition('draft', 'quote_requested'))
  assert.ok(canTransition('draft', 'booking_requested'))
  assert.equal(canTransition('quote_requested', 'availability_pending'), false)
  for (const state of ['draft', 'quote_requested', 'quote_acknowledged', 'booking_requested', 'availability_pending', 'cancelled'] as const) assert.equal(canTransition(state, 'booking_confirmed'), false)
})
test('lead service fails closed, persists before notifying, and timestamps server-side', async () => {
  assert.equal((await leadService.submitLead(lead)).status, 'unavailable')
  let called = false
  const invalid = createLeadService({ async persistLead() { called = true; return { status: 'unavailable' } } })
  assert.equal((await invalid.submitLead({})).status, 'invalid')
  assert.equal(called, false)
  for (const persistence of [
    { async persistLead() { throw new Error('storage unavailable') } },
    { async persistLead() { return { status: 'persisted' as const, durableId: '' } } },
  ]) assert.equal((await createLeadService(persistence).submitLead(lead)).status, 'unavailable')
  const events: string[] = []
  let saved: LeadRecord | undefined
  const service = createLeadService({ async persistLead(record) { saved = record; events.push('persist'); return { status: 'persisted', durableId: 'synthetic-test-id' } } }, { async notifyLead() { events.push('notify'); throw new Error('notification unavailable') } })
  assert.equal((await service.submitLead(lead)).status, 'accepted')
  assert.deepEqual(events, ['persist', 'notify'])
  assert.equal(saved?.state, 'quote_requested')
  assert.ok(saved?.createdAt && !Number.isNaN(Date.parse(saved.createdAt)))
})
test('assistant uses canonical sources with tools disabled and no legacy claims', async () => {
  assert.equal(assistantKnowledge.business, BUSINESS_CONFIG)
  assert.equal(assistantKnowledge.services, SERVICE_CATALOGUE)
  assert.equal(assistantKnowledge.packages, PACKAGES)
  assert.equal(AI_TOOL_PERMISSIONS.confirmBooking, false)
  assert.equal((await captureAssistantLead(lead)).status, 'unavailable')
  assert.equal(JSON.stringify(assistantKnowledge).includes('fromPrice'), false)
})
test('media has independent posters, independent approved desktop and mobile clips', () => {
  for (const device of ['desktop', 'mobile'] as const) {
    assert.ok(existsSync(`public${heroMedia(device).poster}`))
  }
  assert.ok(existsSync(`public${heroMedia('mobile').video}`))
  assert.notEqual(heroMedia('desktop').video, heroMedia('mobile').video)
  assert.ok(existsSync(`public${heroMedia('desktop').video}`))
  assert.notEqual(heroMedia('desktop').poster, heroMedia('mobile').poster)
  assert.equal(resolveMedia('missing'), MEDIA.hero.desktop.poster)
  assert.equal(resolveMedia('__proto__'), MEDIA.hero.desktop.poster)
  for (const key of Object.keys(MEDIA.images)) assert.ok(existsSync(`public${resolveMedia(key)}`))
})
test('metadata retains canonical strategy and excludes pending locations', () => {
  const metadata = serviceMetadata('carpet-cleaning', { name: 'Unverified suburb', status: 'pending', seoEnabled: true })
  assert.equal(metadata.alternates?.canonical, 'https://cleaningninja.co/services/carpet-cleaning')
  assert.equal(JSON.stringify(metadata).includes('Unverified suburb'), false)
  assert.equal(JSON.stringify(metadata).includes('$49'), false)
})
