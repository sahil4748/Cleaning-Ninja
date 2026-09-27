import type { Lead, LeadResult } from '../lead-contract'
import { BUSINESS_CONFIG } from '../../content/business-config'
export const LEAD_UNAVAILABLE_MESSAGE = `Your request has not been sent. Online requests are not available yet. Please email ${BUSINESS_CONFIG.primaryEmail}.`
export async function submitLead(lead: Lead, key: string = crypto.randomUUID(), website = ''): Promise<LeadResult> {
  const response = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify({ ...lead, website }), signal: AbortSignal.timeout(45000) })
  const result = await response.json()
  if (response.ok && result.status === 'accepted' && typeof result.durableId === 'string' && result.durableId.trim()) return { status: 'accepted', durableId: result.durableId, message: "We've received your request." }
  return { status: 'unavailable', message: LEAD_UNAVAILABLE_MESSAGE }
}
