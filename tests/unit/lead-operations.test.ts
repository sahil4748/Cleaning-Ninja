import './isolated-environment'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { PGlite } from '@electric-sql/pglite'
import type { Pool } from 'pg'
import { createPostgresPersistence, leadDatabase } from '../../lib/platform/lead-store'
import { createLeadService } from '../../lib/platform/lead-service'
import { processNotifications } from '../../lib/platform/notifications'
import { leadEmail, sendEmail } from '../../lib/platform/email'
import { POST } from '../../app/api/quote/route'
import { LeadSchema } from '../../lib/lead-contract'
const input = { schemaVersion: 1, channel: 'website', leadSource: 'package', sourcePage: '/', intent: 'quote', name: 'Synthetic Customer', phone: '0400000000', suburbOrAddress: 'Test suburb', service: 'carpet-cleaning', package: '3-bedroom-carpet', description: 'Synthetic cleaning enquiry', attribution: { source: 'test' } }

test('real SQL: atomic lead/outbox, duplicate/conflict, optional email, rate limits, recovery and booking guard', async () => {
  const db = new PGlite()
  await db.exec(readFileSync('db/migrations/001_leads.sql', 'utf8'))
  const query = async (sql: string, params?: unknown[]) => { const result = await db.query(sql, params); return { rows: result.rows, rowCount: result.rows.length || result.affectedRows || 0 } }
  const database = () => ({ query, connect: async () => ({ query, release() {} }) }) as unknown as Pool
  assert.equal((await processNotifications(1, undefined, database)).status, 'not-configured')
  const old = { rate: process.env.LEAD_RATE_LIMIT_SECRET, from: process.env.LEAD_EMAIL_FROM, api: process.env.RESEND_API_KEY }
  process.env.LEAD_RATE_LIMIT_SECRET = 'synthetic-rate-secret-for-local-tests-only'
  process.env.LEAD_EMAIL_FROM = 'test@example.com'
  process.env.RESEND_API_KEY = 'synthetic-not-a-real-key'
  try {
    const service = createLeadService(createPostgresPersistence(database), { async notifyLead() { throw new Error('synthetic failure') } })
    const key = randomUUID()
    const accepted = await service.submitLead(input, key)
    assert.equal(accepted.status, 'accepted')
    assert.deepEqual(await service.submitLead(input, key), accepted)
    assert.equal((await service.submitLead({ ...input, name: 'Changed Customer' }, key)).status, 'conflict')
    assert.equal((await db.query('SELECT * FROM leads')).rows.length, 1)
    assert.equal((await db.query('SELECT * FROM lead_notifications')).rows.length, 1)
    const withEmail = await service.submitLead({ ...input, email: 'synthetic@example.com', intent: 'booking', preferredDateTime: { date: '2026-12-20', timeZone: 'Australia/Brisbane' } }, randomUUID())
    assert.equal(withEmail.status, 'accepted')
    const leads = (await db.query<{ payload: typeof input; status: string }>('SELECT * FROM leads ORDER BY created_at')).rows
    assert.equal(leads[0].payload.attribution.source, 'test')
    assert.equal(leads[0].payload.package, input.package)
    assert.equal(leads[1].status, 'booking_requested')
    await assert.rejects(db.query("UPDATE leads SET status='booking_confirmed'"))
    const keys: string[] = []
    await processNotifications(10, undefined, database, async (_message, key) => { keys.push(key); throw new Error('private data must not persist in error') })
    const failed = (await db.query<{ status: string; last_error: string }>('SELECT * FROM lead_notifications')).rows
    assert.equal(failed.length, 3)
    assert.ok(failed.every(job => job.status === 'pending' && job.last_error === 'delivery_attempt_failed'))
    await db.query("UPDATE lead_notifications SET next_attempt_at=now()-interval '1 second'")
    await processNotifications(10, undefined, database, async (_message, key) => { assert.ok(keys.includes(key)); return 'synthetic-provider-id' })
    assert.equal((await db.query("SELECT * FROM lead_notifications WHERE status='provider_accepted'")).rows.length, 3)
    // An acknowledgement failure must not requeue an accepted internal notification.
    await db.query("UPDATE lead_notifications SET status='pending',next_attempt_at=now()-interval '1 second' WHERE kind='acknowledgement'")
    await processNotifications(10, undefined, database, async () => { throw new Error('synthetic acknowledgement outage') })
    assert.equal((await db.query("SELECT * FROM lead_notifications WHERE kind='internal' AND status='provider_accepted'")).rows.length, 2)
    assert.equal((await db.query("SELECT * FROM lead_notifications WHERE kind='acknowledgement' AND status='pending'")).rows.length, 1)
    // Lost provider response + expired deduplication window must require review, not resend.
    await db.query("UPDATE lead_notifications SET status='processing',next_attempt_at=now()-interval '1 minute',first_attempt_at=now()-interval '24 hours'")
    await processNotifications(10, undefined, database, async () => { assert.fail('expired job must not send'); return '' })
    assert.equal((await db.query("SELECT * FROM lead_notifications WHERE status='review_required'")).rows.length, 3)
    for (let i = 0; i < 3; i++) assert.equal((await service.submitLead(input, randomUUID())).status, 'accepted')
    assert.equal((await service.submitLead(input, randomUUID())).status, 'rate-limited')
    assert.equal((await db.query('SELECT * FROM leads')).rows.length, 5)
    assert.deepEqual(await service.submitLead(input, key), accepted)
    // Outbox insertion failure rolls back the lead itself.
    await db.exec('ALTER TABLE lead_notifications ADD CONSTRAINT synthetic_failure CHECK (false) NOT VALID')
    assert.equal((await service.submitLead({ ...input, phone: '0400000001' }, randomUUID())).status, 'unavailable')
    assert.equal((await db.query('SELECT * FROM leads')).rows.length, 5)
  } finally {
    for (const [name, value] of Object.entries({ LEAD_RATE_LIMIT_SECRET: old.rate, LEAD_EMAIL_FROM: old.from, RESEND_API_KEY: old.api })) { if (value === undefined) delete process.env[name]; else process.env[name] = value }
    await db.close()
  }
})

test('API honeypot, required key and invalid context never accept or echo input', async () => {
  for (const body of [{ ...input, website: 'spam' }, { ...input, service: 'invented' }, { ...input, package: 'invented' }, { ...input, status: 'booking_confirmed' }, input]) {
    const result = await POST(new Request('http://localhost/api/quote', { method: 'POST', body: JSON.stringify(body) }))
    assert.equal(result.status, 400)
    assert.ok(!(await result.text()).includes(input.phone))
  }
})

test('homepage and package API enforce all five required fields before persistence', async () => {
  for (const leadSource of ['homepage', 'package']) {
    for (const field of ['service', 'suburbOrAddress', 'description', 'name', 'phone']) {
      for (const value of [undefined, '   ']) {
        const result = await POST(new Request('http://localhost/api/quote', {
          method: 'POST', headers: { 'Idempotency-Key': randomUUID() },
          body: JSON.stringify({ ...input, leadSource, [field]: value }),
        }))
        assert.equal(result.status, 400, `${leadSource}: ${field}`)
        assert.equal((await result.json()).status, 'invalid')
      }
    }
  }
})

test('homepage normalisation preserves optional contact and requested scheduling without city attribution', () => {
  const parsed = LeadSchema.parse({ ...input, leadSource: 'homepage', package: undefined,
    name: '  Synthetic QA  ', phone: '0400 000 000', suburbOrAddress: '  QA suburb  ', description: '  QA only  ',
  })
  assert.equal(parsed.name, 'Synthetic QA')
  assert.equal(parsed.phone, '0400000000')
  assert.equal(parsed.suburbOrAddress, 'QA suburb')
  assert.equal(parsed.description, 'QA only')
  assert.equal(parsed.city, undefined)
  assert.equal(parsed.email, undefined)
  assert.equal(parsed.preferredDateTime, undefined)
  assert.ok(LeadSchema.safeParse({ ...parsed, intent: 'booking', email: 'qa@example.invalid',
    preferredDateTime: { date: '2026-12-20', time: '09:00', timeZone: 'Australia/Brisbane' },
  }).success)
})

test('email templates and transport report only provider acceptance; no email without address', async () => {
  const record = { ...input, schemaVersion: 1 as const, channel: 'website' as const, leadSource: 'package' as const, intent: 'quote' as const, createdAt: '2026-09-27T00:00:00.000Z', state: 'quote_requested' as const }
  const internal = leadEmail(record, 'safe-reference', 'internal', 'test@example.com')
  assert.deepEqual(internal.to, ['contact@cleaningninja.co'])
  assert.ok(internal.text.includes('safe-reference') && internal.text.includes(input.package))
  assert.throws(() => leadEmail(record, 'ref', 'acknowledgement', 'test@example.com'))
  const ack = leadEmail({ ...record, email: 'synthetic@example.com' }, 'ref', 'acknowledgement', 'test@example.com')
  assert.match(ack.text, /not a confirmed booking/)
  assert.doesNotMatch(ack.text, /within|will arrive|booking is confirmed/)
  await assert.rejects(sendEmail(ack, 'key', async () => new Response('{}', { status: 500 })))
  await assert.rejects(sendEmail(ack, 'key', async () => new Response('{}', { status: 200 })))
  assert.equal(await sendEmail(ack, 'key', async (_url, init) => {
    assert.equal((init?.headers as Record<string, string>)['Idempotency-Key'], 'key')
    return new Response('{"id":"synthetic-provider-id"}', { status: 200 })
  }), 'synthetic-provider-id')
})

test('recovery endpoint rejects unauthorised requests without exposing records', async () => {
  const { POST: recover } = await import('../../app/api/internal/lead-notifications/route')
  const response = await recover(new Request('http://localhost/api/internal/lead-notifications', { method: 'POST' }))
  assert.equal(response.status, 401)
  assert.deepEqual(await response.json(), { status: 'unauthorised' })
})

test('unavailable PostgreSQL connection never returns receipt; recovery stops at absent email config', async () => {
  // Loopback only; deliberately unavailable, with synthetic credentials that must not escape.
  process.env.LEAD_DATABASE_URL = 'postgresql://synthetic:synthetic-secret@127.0.0.1:1/synthetic?connect_timeout=1'
  process.env.LEAD_WORKER_SECRET = 'synthetic-worker-secret-for-local-tests-only'
  try {
    const response = await POST(new Request('http://localhost/api/quote', {
      method: 'POST', headers: { 'Idempotency-Key': randomUUID() }, body: JSON.stringify(input),
    }))
    assert.equal(response.status, 503)
    const result = await response.json()
    assert.equal(result.status, 'unavailable')
    assert.doesNotMatch(JSON.stringify(result), /received|synthetic-secret|postgresql|0400000000/)
    const { POST: recover } = await import('../../app/api/internal/lead-notifications/route')
    const recovery = await recover(new Request('http://localhost/api/internal/lead-notifications', {
      method: 'POST', headers: { authorization: `Bearer ${process.env.LEAD_WORKER_SECRET}` },
    }))
    assert.equal(recovery.status, 200)
    assert.deepEqual(await recovery.json(), { status: 'not-configured', processed: 0 })
  } finally {
    await leadDatabase().end()
    delete process.env.LEAD_DATABASE_URL
    delete process.env.LEAD_WORKER_SECRET
  }
})
