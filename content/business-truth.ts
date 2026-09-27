import { BUSINESS_CONFIG } from './business-config'
import { PACKAGES } from './packages'
/** Public facts only. Never import prototype review/team/pricing modules here. */
export const BUSINESS_TRUTH = {
  name: BUSINESS_CONFIG.businessName,
  email: BUSINESS_CONFIG.primaryEmail,
  primaryMarket: BUSINESS_CONFIG.primaryMarket,
  commercialModel: 'quote-first',
} as const

export const COMMERCIAL_DIRECTION = {
  status: 'OWNER-APPROVED',
  followUpHours: { min: 24, max: 48, qualifier: 'usually' },
  futurePricingModes: ['quote', 'fixed', 'mixed'],
  offer: {
    status: 'PENDING',
    direction: 'Up to 30% off selected packages',
    packages: PACKAGES.map(item => item.name),
    terms: null,
  },
} as const
