/**
 * Cleaning Ninja — JSON-LD schema builders.
 *
 * One source of truth for structured data across the site. Returns plain
 * objects (no JSX) so server components can render them via <JsonLd>.
 */

import { BUSINESS } from '@/content/navigation'
import { COVERAGE } from '@/content/coverage'
import { Service } from '@/content/services'
import { Review, reviewStats } from '@/content/reviews'
import { JournalEntry } from '@/content/journal'

const SITE_URL = 'https://cleaningninja.com.au'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: BUSINESS.name,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    image: `${SITE_URL}/og-image.svg`,
    telephone: `+61${BUSINESS.phoneRaw.replace(/^0/, '')}`,
    email: BUSINESS.email,
    description:
      'Flat-rate residential and commercial cleaning across Sydney, Melbourne, Brisbane, Perth, Adelaide and the Gold Coast. Police-checked, ABN-verified, fully insured.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
      addressRegion: 'NSW',
      addressLocality: 'Sydney',
    },
    areaServed: COVERAGE.map((c) => ({
      '@type': 'City',
      name: c.city,
      address: { '@type': 'PostalAddress', addressRegion: c.state, addressCountry: 'AU' },
    })),
    sameAs: [
      'https://www.facebook.com/cleaningninja',
      'https://www.instagram.com/cleaningninja',
      'https://www.linkedin.com/company/cleaningninja',
      'https://www.google.com/maps?cid=cleaningninja',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(BUSINESS.rating),
      reviewCount: String(BUSINESS.reviewCount),
    },
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'ABN',
      value: BUSINESS.abn,
    },
  }
}

export function housekeepingServiceSchema(service: Service, fromPrice?: number) {
  const price = fromPrice ?? service.fromPrice
  return {
    '@context': 'https://schema.org',
    '@type': 'HousekeepingService',
    name: `${service.name} — ${BUSINESS.name}`,
    description: service.description,
    url: `${SITE_URL}${service.href}`,
    image: service.image,
    provider: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: SITE_URL,
      telephone: `+61${BUSINESS.phoneRaw.replace(/^0/, '')}`,
    },
    areaServed: COVERAGE.map((c) => ({ '@type': 'City', name: c.city })),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      price: String(price),
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'AUD',
        minPrice: String(price),
      },
    },
    priceRange: `$${price}+`,
  }
}

export function localBusinessSchema(citySlug: string) {
  const city = COVERAGE.find((c) => c.slug === citySlug)
  if (!city) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/service-areas/${city.slug}#localbusiness`,
    name: `${BUSINESS.name} — ${city.city}`,
    description: `Flat-rate cleaning services across ${city.city} suburbs. Police-checked, fully insured, bond-back guaranteed.`,
    url: `${SITE_URL}/service-areas/${city.slug}`,
    image: `${SITE_URL}/og-image.svg`,
    telephone: `+61${BUSINESS.phoneRaw.replace(/^0/, '')}`,
    priceRange: `$${city.benchmarkPrice}+`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.city,
      addressRegion: city.state,
      addressCountry: 'AU',
    },
    areaServed: city.suburbs.map((s) => ({ '@type': 'Place', name: s })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(reviewStats().avgRating),
      reviewCount: String(reviewStats().aggregateCount),
    },
  }
}

export function reviewSchema(review: Review) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: review.customerFirstName },
    datePublished: review.date,
    reviewBody: review.body,
    reviewRating: { '@type': 'Rating', ratingValue: String(review.rating), bestRating: '5' },
    itemReviewed: {
      '@type': 'Service',
      name: review.service,
      provider: { '@type': 'Organization', name: BUSINESS.name },
    },
  }
}

export function articleSchema(entry: JournalEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.dek,
    image: entry.image,
    datePublished: entry.publishedAt,
    dateModified: entry.publishedAt,
    author: { '@type': 'Person', name: entry.author },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/journal/${entry.slug}` },
    articleSection: entry.category,
    wordCount: entry.readMinutes * 220,
  }
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  }
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  }
}
