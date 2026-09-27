import { postgresPersistence } from './lead-store'
import { notificationService } from './notifications'
import { LeadSchema, type Lead, type LeadResult } from '../lead-contract'
import { BUSINESS_CONFIG } from '../../content/business-config'
import { initialRequestState, type RequestState } from './booking'
export const LEAD_UNAVAILABLE_MESSAGE = `Your request has not been sent. Please email ${BUSINESS_CONFIG.primaryEmail}.`
export type LeadRecord = Lead & { createdAt: string; state: RequestState }
export type PersistenceResult = { status: 'persisted'; durableId: string } | { status: 'unavailable' | 'conflict' | 'rate-limited' }
/** A persisted result guarantees a committed lead AND its notification outbox. */
export interface LeadPersistence { persistLead(record: LeadRecord, idempotencyKey?: string): Promise<PersistenceResult> }
export interface LeadNotifications { notifyLead(record: LeadRecord, durableId: string): Promise<'queued' | 'not-configured'> }
// Explicit fail-closed adapter retained for callers that disable persistence.
export const unavailablePersistence: LeadPersistence = { async persistLead() { return { status: 'unavailable' } } }
export const unavailableNotifications = notificationService
export const validateLead = (input: unknown) => LeadSchema.safeParse(input)
export function createLeadService(persistence: LeadPersistence, notifications: LeadNotifications = unavailableNotifications) {
  return {
    async submitLead(input: unknown, idempotencyKey?: string): Promise<LeadResult> {
      const parsed = validateLead(input)
      if (!parsed.success) return { status: 'invalid', message: 'Check your request details.' }
      const record: LeadRecord = { ...parsed.data, createdAt: new Date().toISOString(), state: initialRequestState(parsed.data.intent) }
      let result: PersistenceResult
      try { result = await persistence.persistLead(record, idempotencyKey) } catch { return { status: 'unavailable', message: LEAD_UNAVAILABLE_MESSAGE } }
      if (result.status === 'conflict' || result.status === 'rate-limited') return { status: result.status, message: 'Please check your request or try again later.' }
      if (result.status !== 'persisted' || !result.durableId.trim()) return { status: 'unavailable', message: LEAD_UNAVAILABLE_MESSAGE }
      // Notification failure must not erase durable acceptance or encourage duplicate requests.
      try { await notifications.notifyLead(record, result.durableId) } catch { /* Atomic outbox remains pending; scheduled worker recovers it. */ }
      return { status: 'accepted', durableId: result.durableId, message: "We've received your request." }
    },
  }
}
export const leadService = createLeadService(postgresPersistence)
