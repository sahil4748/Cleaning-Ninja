import './isolated-environment'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { LeadSchema } from '../../lib/lead-contract'
import { calendarDate, parseCalendarDate } from '../../lib/calendar-date'
import { organizationSchema, housekeepingServiceSchema, reviewSchema, localBusinessSchema, articleSchema, faqSchema } from '../../lib/schema'
import { SERVICES } from '../../content/services'
import { PLACEHOLDER_REVIEWS as REVIEWS } from './placeholder-reviews'
import { JOURNAL } from '../../content/journal'
import { BUSINESS_TRUTH } from '../../content/business-truth'
import sitemap from '../../app/sitemap'
import { POST } from '../../app/api/quote/route'

const lead = { schemaVersion: 1, channel: 'website', intent: 'quote', name: 'Test Customer', phone: '0400 000 000', suburbOrAddress: 'Brisbane' }

test('all channels accept minimum agreed fields without email, description or service', () => {
  for (const channel of ['website', 'ai-chat', 'web-voice', 'phone-voice']) {
    const result = LeadSchema.parse({ ...lead, channel })
    assert.equal(result.phone, '0400000000')
  }
})
test('rejects missing required fields, fake scheduling proof, invalid preferences and excess fields', () => {
  for (const field of ['name', 'phone', 'suburbOrAddress']) {
    assert.equal(LeadSchema.safeParse({ ...lead, [field]: '' }).success, false)
  }
  for (const extra of [{ bookingConfirmed: true }, { email: 'bad' }, { preferredDateTime: { date: '2026-02-30', timeZone: 'Australia/Brisbane' } }]) {
    assert.equal(LeadSchema.safeParse({ ...lead, ...extra }).success, false)
  }
  assert.equal(LeadSchema.safeParse({ ...lead, intent: 'booking', preferredDateTime: { date: '2026-10-04', time: '09:00', timeZone: 'Australia/Sydney' } }).success, true)
})
test('calendar date survives Sydney DST and other timezone round trips', () => {
  const previous = process.env.TZ
  try {
    for (const zone of ['Australia/Sydney', 'Australia/Brisbane', 'America/Los_Angeles']) {
      process.env.TZ = zone
      for (const date of ['2026-09-23', '2026-10-04', '2027-04-04']) {
        assert.equal(calendarDate(parseCalendarDate(date)), date)
      }
    }
  } finally {
    if (previous === undefined) delete process.env.TZ
    else process.env.TZ = previous
  }
})
test('schema and public truth exclude prototype proof', () => {
  assert.equal(reviewSchema(REVIEWS[0]), null)
  assert.equal(localBusinessSchema('brisbane'), null)
  assert.equal(articleSchema(JOURNAL[0]), null)
  assert.equal(faqSchema([{ question: 'Proof?', answer: 'Insured' }]), null)
  const output = JSON.stringify([organizationSchema(), ...SERVICES.map(service => housekeepingServiceSchema(service)), BUSINESS_TRUTH])
  for (const forbidden of ['aggregateRating', 'reviewRating', 'telephone', 'ABN', 'NDIS', 'offers', 'priceRange', 'Person', 'insured', 'guarantee']) {
    assert.equal(output.includes(forbidden), false, forbidden)
  }
})
test('sitemap lists only the indexable homepage, without false timestamps or 404 entries', () => {
  const entries = sitemap()
  assert.equal(entries.length, 1)
  assert.equal(new Set(entries.map(entry => entry.url)).size, 1)
  assert.ok(entries.every(entry => !entry.lastModified))
  assert.ok(entries.every(entry => !/special-offers|become-a-cleaner/.test(entry.url)))
})
test('API rejects invalid payloads and never accepts valid leads without durable storage', async () => {
  for (const [body, expected] of [['{', 400], ['{}', 400], [JSON.stringify(lead), 503], ['x'.repeat(17000), 413]] as const) {
    const result = await POST(new Request('http://localhost/api/quote', { method: 'POST', body, headers: { 'Idempotency-Key': '18c83fea-e9ef-4b0d-a32e-11d4b1b84dff' } }))
    assert.equal(result.status, expected)
    const payload = await result.json()
    assert.notEqual(payload.success, true)
    assert.notEqual(payload.status, 'accepted')
    assert.equal(result.headers.get('cache-control'), 'no-store')
  }
})
test('production release guard fails, including direct Next configuration load', () => {
  const guard = spawnSync(process.execPath, ['--import', 'tsx', 'scripts/check-release.ts', '--release'], { encoding: 'utf8' })
  assert.equal(guard.status, 1)
  assert.match(guard.stderr, /Production release blocked/)
  const nextConfig = spawnSync(process.execPath, ['-e', "require('./next.config.js')"], { env: { ...process.env, VERCEL_ENV: 'production' }, encoding: 'utf8' })
  assert.notEqual(nextConfig.status, 0)
  assert.match(nextConfig.stderr, /Production release blocked/)
})
