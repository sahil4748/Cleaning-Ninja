import { randomUUID } from 'node:crypto'
import { BUSINESS_CONFIG } from '../../content/business-config'
import { leadDatabase } from './lead-store'
import { leadEmail, sendEmail, type EmailMessage } from './email'
import type { LeadNotifications, LeadRecord } from './lead-service'
export const NOTIFICATION_CONFIG = {
  businessMailbox: BUSINESS_CONFIG.primaryEmail,
  customerAcknowledgement: 'after-durable-acceptance-only', bookingConfirmation: false,
} as const
/** Durable leases survive interrupted functions; provider keys survive retries. */
export async function processNotifications(limit = 10, leadId?: string, database: typeof leadDatabase = leadDatabase, sender: typeof sendEmail = sendEmail) {
  const from = process.env.LEAD_EMAIL_FROM
  if (!process.env.RESEND_API_KEY || !from || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(from)) return { status: 'not-configured', processed: 0 }
  const db = database()
  let processed = 0
  for (let i = 0; i < Math.min(limit, 10); i++) {
    const lease = randomUUID()
    const claimed = await db.query(`UPDATE lead_notifications SET status='processing', lease_token=$1,
      next_attempt_at=now()+interval '2 minutes', updated_at=now()
      WHERE id=(SELECT id FROM lead_notifications WHERE status IN ('pending','processing') AND next_attempt_at<=now()
        AND ($2::uuid IS NULL OR lead_id=$2) ORDER BY next_attempt_at FOR UPDATE SKIP LOCKED LIMIT 1) RETURNING *`, [lease, leadId ?? null])
    const job = claimed.rows[0]
    if (!job) break
    // Never automatically resend outside the provider's 24-hour deduplication window.
    if (job.first_attempt_at && Date.now() - new Date(job.first_attempt_at).getTime() >= 23 * 3600000 || job.attempts >= 8) {
      await db.query("UPDATE lead_notifications SET status='review_required',last_error='retry_window_exhausted',updated_at=now() WHERE id=$1 AND lease_token=$2", [job.id, lease])
      continue
    }
    try {
      let message: EmailMessage = job.message
      if (!message) {
        const result = await db.query('SELECT payload,created_at,status FROM leads WHERE id=$1', [job.lead_id])
        const row = result.rows[0]
        const record: LeadRecord = { ...row.payload, createdAt: row.created_at.toISOString(), state: row.status }
        message = leadEmail(record, job.lead_id, job.kind, from)
      }
      // Freeze provider request before first send: config/template changes cannot alter a retry.
      await db.query('UPDATE lead_notifications SET message=$3, first_attempt_at=COALESCE(first_attempt_at,now()),attempts=attempts+1 WHERE id=$1 AND lease_token=$2', [job.id, lease, message])
      const providerId = await sender(message, `lead-${job.id}`)
      await db.query("UPDATE lead_notifications SET status='provider_accepted',provider_id=$3,last_error=NULL,updated_at=now() WHERE id=$1 AND lease_token=$2", [job.id, lease, providerId])
      processed++
    } catch {
      await db.query("UPDATE lead_notifications SET status='pending',last_error='delivery_attempt_failed',next_attempt_at=now()+($3 * interval '1 second'),updated_at=now() WHERE id=$1 AND lease_token=$2", [job.id, lease, Math.min(3600, 60 * 2 ** job.attempts)])
    }
  }
  return { status: 'processed', processed }
}
export const notificationService: LeadNotifications = {
  async notifyLead(_record, id) { const result = await processNotifications(2, id); return result.status === 'not-configured' ? 'not-configured' : 'queued' },
}
