import { BUSINESS_CONFIG as business } from './business-config'
export interface FeatureConfig {
  aiChat: boolean; aiVoice: boolean; phoneCalling: boolean; callback: boolean
  booking: boolean; reviews: boolean; packages: boolean; cinematicHero: boolean; advancedMotion: boolean
}
export const FEATURES: Readonly<FeatureConfig> = Object.freeze({
  aiChat: false, aiVoice: business.aiVoiceEnabled, phoneCalling: business.phoneEnabled && !!business.publicPhone,
  callback: business.callbackEnabled, booking: false, reviews: false,
  packages: business.packageVisibility === 'enquiry-concepts', cinematicHero: false, advancedMotion: false,
})
export function communicationChannels(config: Readonly<typeof business> = business) {
  return {
    email: { enabled: true, address: config.primaryEmail, href: `mailto:${config.primaryEmail}` },
    phone: { enabled: config.phoneEnabled && !!config.publicPhone,
      href: config.phoneEnabled && config.publicPhone ? `tel:${config.publicPhone}` : null },
    aiVoice: { enabled: config.aiVoiceEnabled, status: 'Coming soon' },
    callback: { enabled: config.callbackEnabled, status: 'Coming soon' },
  }
}
export const COMMUNICATION = communicationChannels()
