import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'
import { CONTENT_ROUTES } from '@/lib/route-inventory'
export default function sitemap(): MetadataRoute.Sitemap {
  // Route inventory only; no fabricated edit dates or claim of launch eligibility.
  return [...new Set(CONTENT_ROUTES)].map(path => ({ url: `${SITE_URL}${path === '/' ? '' : path}` }))
}
