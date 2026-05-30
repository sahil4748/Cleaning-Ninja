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

export const FOOTER_SERVICES: NavItem[] = [
  { label: 'End-of-Lease', href: '/services/end-of-lease-cleaning' },
  { label: 'Carpet Steam', href: '/services/carpet-cleaning' },
  { label: 'Upholstery', href: '/services/upholstery-cleaning' },
  { label: 'Tile & Grout', href: '/services/tile-grout-cleaning' },
  { label: 'Leather Care', href: '/services/leather-cleaning' },
]

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
  name: 'Cleaning Ninja',
  tagline: 'Your Mess, Our Mission!',
  abn: '12 345 678 901',
  phone: '1300 NINJAS',
  phoneRaw: '1300646527',
  email: 'hello@cleaningninja.com.au',
  publicLiability: '$20M',
  insurer: 'Allianz Australia',
  ndisProvider: '401 234 567',
  policeCheck: '100% nationally police-checked',
  rating: 4.9,
  reviewCount: 1247,
}
