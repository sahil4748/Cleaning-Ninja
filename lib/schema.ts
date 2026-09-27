/** Structured data accepts only approved business facts and route identity. */
import { BUSINESS_TRUTH } from '@/content/business-truth'
import type { Service } from '@/content/services'
import type { Review } from '@/content/reviews'
import type { JournalEntry } from '@/content/journal'
import { SITE_URL } from '@/lib/site-config'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org', '@type': 'Organization',
    '@id': `${SITE_URL}#organization`, name: BUSINESS_TRUTH.name,
    url: SITE_URL, email: BUSINESS_TRUTH.email,
  }
}
export function housekeepingServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org', '@type': 'Service',
    name: `${service.name} — ${BUSINESS_TRUTH.name}`,
    url: `${SITE_URL}${service.href}`,
    provider: { '@id': `${SITE_URL}#organization` },
  }
}
// Local offices, suburb eligibility, reviews, authors and FAQ claims are unverified.
// Keep these extension points, but emit nothing until evidence is approved.
export function localBusinessSchema(_citySlug: string) { return null }
export function reviewSchema(_review: Review) { return null }
export function articleSchema(_entry: JournalEntry) { return null }
export function faqSchema(_items: Array<{ question: string; answer: string }>) { return null }
export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem', position: i + 1, name: item.name, item: `${SITE_URL}${item.href}`,
    })),
  }
}
