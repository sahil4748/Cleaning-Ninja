import type { MediaKey } from './media'
export interface CatalogueService {
  id: string; slug: string; name: string; shortName: string
  summary: string; description: string; category: 'primary' | 'additional'; quoteLabel: string
  seoTitle: string; seoDescription: string; heroMediaKey: MediaKey; cardMediaKey: MediaKey
  enabled: boolean; quoteEnabled: boolean; bookingEnabled: boolean
  coveragePolicy: 'check-on-enquiry'; href: string
}
// Owner-approved taxonomy only. No legacy prices, methods, inclusions or proof.
const identities = [
  { id: 'end-of-lease-cleaning', slug: 'end-of-lease-cleaning', name: 'End-of-Lease Clean', shortName: 'End-of-Lease', category: 'primary', heroMediaKey: 'interior', cardMediaKey: 'interior', href: '/services/end-of-lease-cleaning' },
  { id: 'carpet-cleaning', slug: 'carpet-cleaning', name: 'Carpet Steam Clean', shortName: 'Carpet Steam', category: 'primary', heroMediaKey: 'carpet', cardMediaKey: 'carpet', href: '/services/carpet-cleaning' },
  { id: 'upholstery-cleaning', slug: 'upholstery-cleaning', name: 'Upholstery Care', shortName: 'Upholstery', category: 'primary', heroMediaKey: 'mobileInterior', cardMediaKey: 'mobileInterior', href: '/services/upholstery-cleaning' },
  { id: 'tile-grout-cleaning', slug: 'tile-grout-cleaning', name: 'Tile & Grout', shortName: 'Tile & Grout', category: 'primary', heroMediaKey: 'tile', cardMediaKey: 'tile', href: '/services/tile-grout-cleaning' },
  { id: 'leather-cleaning', slug: 'leather-cleaning', name: 'Leather Care', shortName: 'Leather Care', category: 'primary', heroMediaKey: 'leather', cardMediaKey: 'leather', href: '/services/leather-cleaning' },
  { id: 'pressure-washing', slug: 'pressure-washing', name: 'Pressure Washing', shortName: 'Pressure Washing', category: 'additional', heroMediaKey: 'interior', cardMediaKey: 'interior', href: '/services' },
  { id: 'window-cleaning', slug: 'window-cleaning', name: 'Window Cleaning', shortName: 'Window Cleaning', category: 'additional', heroMediaKey: 'interior', cardMediaKey: 'interior', href: '/services' },
  { id: 'oven-cleaning', slug: 'oven-cleaning', name: 'Oven Deep Clean', shortName: 'Oven Deep Clean', category: 'additional', heroMediaKey: 'interior', cardMediaKey: 'interior', href: '/services' },
  { id: 'airbnb-turnaround', slug: 'airbnb-turnaround', name: 'Airbnb Turnaround', shortName: 'Airbnb Turnaround', category: 'additional', heroMediaKey: 'interior', cardMediaKey: 'interior', href: '/services' },
  { id: 'regular-home', slug: 'regular-home', name: 'Regular Home Clean', shortName: 'Regular Home Clean', category: 'additional', heroMediaKey: 'interior', cardMediaKey: 'interior', href: '/services' }
] as const
export const SERVICE_CATALOGUE: readonly CatalogueService[] = identities.map(service => ({
  ...service, summary: `Enquire about ${service.name.toLowerCase()}.`,
  description: 'Share your requirements so scope, suitability and coverage can be checked.',
  quoteLabel: service.name, seoTitle: `${service.name} — Request a Quote`,
  seoDescription: `Enquire about ${service.name.toLowerCase()}. Scope, pricing and coverage are checked with your request.`,
  enabled: true, quoteEnabled: true, bookingEnabled: false, coveragePolicy: 'check-on-enquiry',
}))
export function getService(id: string) { return SERVICE_CATALOGUE.find(service => service.id === id) }
