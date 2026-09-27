import { SERVICE_CATALOGUE } from './service-catalogue'
import { COMMUNICATION } from './features'
import { BUSINESS_TRUTH } from './business-truth'

/**
 * Cleaning Ninja — site navigation.
 *
 * Primary nav, footer columns, and CTA bar shared across the site.
 */

export interface NavItem {
  label: string
  href: string
}

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Areas', href: '/service-areas' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
]

export const FOOTER_SERVICES: NavItem[] = SERVICE_CATALOGUE.filter(service => service.category === 'primary').map(service => ({ label: service.shortName, href: service.href }))

export const FOOTER_AREAS: NavItem[] = [
  { label: 'Sydney', href: '/service-areas/sydney' },
  { label: 'Melbourne', href: '/service-areas/melbourne' },
  { label: 'Brisbane', href: '/service-areas/brisbane' },
  { label: 'Perth', href: '/service-areas/perth' },
  { label: 'Adelaide', href: '/service-areas/adelaide' },
  { label: 'Gold Coast', href: '/service-areas/gold-coast' },
]

export const FOOTER_COMPANY: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Our Team', href: '/team' },
  { label: 'Careers', href: '/careers' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
]

export const FOOTER_LEGAL: NavItem[] = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Insurance', href: '/legal/insurance' },
]

/** Business identity, surfaced everywhere trust matters. */
export const BUSINESS = {
  name: BUSINESS_TRUTH.name,
  tagline: 'Your Mess, Our Mission!',
  abn: '', // PENDING; omit from public output
  phone: 'Contact us',
  phoneRaw: COMMUNICATION.phone.href?.replace('tel:', '') ?? '',
  email: BUSINESS_TRUTH.email,
  ndisProvider: '', // PENDING; omit from public output
  // PLACEHOLDER ratings: visual prototype only; never business truth/schema.
  rating: null,
  reviewCount: null,
}
