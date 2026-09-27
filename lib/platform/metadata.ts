import type { Metadata } from 'next'
import { BUSINESS_CONFIG } from '../../content/business-config'
import { getService } from '../../content/service-catalogue'
import { SITE_CONFIG } from '../site-config'
export interface LocationContext { name: string; status: 'verified' | 'pending'; seoEnabled: boolean }
export function serviceMetadata(id: string, location?: LocationContext): Metadata {
  const service = getService(id)
  if (!service) throw new Error('Unknown service metadata ID')
  const suffix = location?.status === 'verified' && location.seoEnabled ? ` — ${location.name}` : ''
  return { title: `${service.seoTitle}${suffix} | ${BUSINESS_CONFIG.businessName}`, description: service.seoDescription,
    alternates: { canonical: `${SITE_CONFIG.canonicalOrigin}${service.href}` }, robots: { index: SITE_CONFIG.indexable, follow: SITE_CONFIG.indexable } }
}
