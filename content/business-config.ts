/** Owner brief 2026-09-27. Target domain is not an activated migration. */
export interface BusinessConfig {
  businessName: string
  canonicalDomain: string
  primaryEmail: string
  publicPhone: string | null
  phoneEnabled: boolean
  aiVoiceEnabled: boolean
  callbackEnabled: boolean
  primaryMarket: string | null
  coverageStatus: 'pending' | 'verified'
  quoteMode: 'enabled' | 'disabled'
  bookingMode: 'request-only' | 'disabled'
  reviewVisibility: 'verified-only'
  packageVisibility: 'enquiry-concepts' | 'hidden'
}
export const BUSINESS_CONFIG: Readonly<BusinessConfig> = Object.freeze({
  businessName: 'Cleaning Ninja', canonicalDomain: 'cleaningninja.co',
  primaryEmail: 'contact@cleaningninja.co', publicPhone: null,
  phoneEnabled: false, aiVoiceEnabled: false, callbackEnabled: false,
  primaryMarket: 'Brisbane', coverageStatus: 'pending', quoteMode: 'enabled',
  bookingMode: 'request-only', reviewVisibility: 'verified-only', packageVisibility: 'enquiry-concepts',
})
