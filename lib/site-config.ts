import { BUSINESS_CONFIG } from '@/content/business-config'
/** Preserve the existing canonical host until SEO equity/ownership is checked.
 * Target identity is recorded, not activated as a migration or redirect.
 */
export const SITE_CONFIG = {
  canonicalOrigin: 'https://cleaningninja.co',
  targetOrigin: `https://${BUSINESS_CONFIG.canonicalDomain}`,
  targetStatus: 'TARGET_PENDING_EQUITY_CHECK',
  indexable: false,
} as const
export const SITE_URL = SITE_CONFIG.canonicalOrigin
