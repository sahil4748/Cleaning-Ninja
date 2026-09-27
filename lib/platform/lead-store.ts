import { createHash, randomUUID } from 'node:crypto'
import { Pool } from 'pg'
import type { LeadPersistence, LeadRecord } from './lead-service'
let pool: Pool | undefined
export function leadDatabase() {
  if (!process.env.LEAD_DATABASE_URL) throw new Error('persistence_not_configured')
  if (!pool) {
    pool = new Pool({ connectionString: process.env.LEAD_DATABASE_URL, max: 3, idleTimeoutMillis: 10000, connectionTimeoutMillis: 3000, statement_timeout: 5000 })
    pool.on('error', () => console.error('lead_database_connection_error'))
  }
  return pool
}
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`
  if (value && typeof value === 'object') return `{${Object.entries(value).filter(([, v]) => v !== undefined).sort(([a], [b]) => a.localeCompare(b)).map(([k,v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(',')}}`
  return JSON.stringify(value)
}
export function createPostgresPersistence(database: typeof leadDatabase = leadDatabase): LeadPersistence { return {
  async persistLead(record: LeadRecord, key = randomUUID()) {
    const { createdAt: _createdAt, state, ...payload } = record
    void _createdAt
    const hash = createHash('sha256').update(canonical(payload)).digest('hex')
    const client = await database().connect()
    try {
      await client.query('BEGIN')
      // Serialise same-key attempts across serverless instances before rate accounting.
      await client.query('SELECT pg_advisory_xact_lock(hashtextextended($1, 0))', [key])
      const previous = await client.query('SELECT id, payload_hash FROM leads WHERE idempotency_key=$1', [key])
      if (previous.rowCount) {
        await client.query('COMMIT')
        return previous.rows[0].payload_hash === hash ? { status: 'persisted', durableId: previous.rows[0].id } : { status: 'conflict' }
      }
      // No raw IP retained. Phone rate identifier is keyed; secret required in production.
      const secret = process.env.LEAD_RATE_LIMIT_SECRET
      if (!secret || secret.length < 32) throw new Error('rate_limit_not_configured')
      const { createHmac } = await import('node:crypto')
      const phone = payload.phone.replace(/^0/, '+61')
      const phoneHash = createHmac('sha256', secret).update(phone).digest('hex')
      const hour = Math.floor(Date.now() / 3600000)
      for (const [bucket, limit] of [[`global:${hour}`, 100], [`${phoneHash}:${hour}`, 5]] as const) {
        const rate = await client.query('INSERT INTO lead_rate_limits(bucket,count,expires_at) VALUES($1,1,now()+interval \'2 hours\') ON CONFLICT(bucket) DO UPDATE SET count=lead_rate_limits.count+1 RETURNING count', [bucket])
        if (rate.rows[0].count > limit) { await client.query('ROLLBACK'); return { status: 'rate-limited' } }
      }
      await client.query('DELETE FROM lead_rate_limits WHERE expires_at < now()')
      const id = randomUUID()
      await client.query('INSERT INTO leads(id,idempotency_key,payload_hash,status,payload) VALUES($1,$2,$3,$4,$5)', [id, key, hash, state, payload])
      for (const kind of payload.email ? ['internal', 'acknowledgement'] : ['internal']) {
        await client.query('INSERT INTO lead_notifications(id,lead_id,kind) VALUES($1,$2,$3)', [randomUUID(), id, kind])
      }
      await client.query('COMMIT')
      return { status: 'persisted', durableId: id }
    } catch { await client.query('ROLLBACK').catch(() => {}); throw new Error('lead_persistence_failed') }
    finally { client.release() }
  },
} }
export const postgresPersistence = createPostgresPersistence()
