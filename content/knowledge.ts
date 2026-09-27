import { BUSINESS_CONFIG } from './business-config'
export type FactStatus = 'verified' | 'pending' | 'placeholder' | 'do-not-publish' | 'owner-approved'
export interface BusinessFact { id: string; value: string | null; status: FactStatus; source: string; scope: string }
export const BUSINESS_FACTS: readonly BusinessFact[] = [
  { id: 'name', value: BUSINESS_CONFIG.businessName, status: 'verified', source: 'Owner brief 2026-09-27', scope: 'identity' },
  { id: 'email', value: BUSINESS_CONFIG.primaryEmail, status: 'verified', source: 'Owner brief 2026-09-27', scope: 'operational mailbox' },
  { id: 'market', value: BUSINESS_CONFIG.primaryMarket, status: 'owner-approved', source: 'owner-decisions.md', scope: 'primary market, not coverage eligibility' },
  { id: 'phone', value: null, status: 'pending', source: 'owner-decisions.md', scope: 'public contact' },
]
export function publicFacts(facts: readonly BusinessFact[] = BUSINESS_FACTS) {
  return facts.filter(fact => fact.value !== null && (fact.status === 'verified' || fact.status === 'owner-approved'))
}
