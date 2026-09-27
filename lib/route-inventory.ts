import { COVERAGE, suburbSlug } from '@/content/coverage'
import { JOURNAL } from '@/content/journal'
import { SERVICES } from '@/content/services'
export const CONTENT_ROUTES = [
  '/', '/about', '/book', '/careers', '/contact', '/gallery', '/journal',
  '/legal/insurance', '/legal/privacy', '/legal/terms', '/our-standard',
  '/pricing', '/reviews', '/service-areas', '/services', '/team',
  ...SERVICES.map(service => service.href),
  ...JOURNAL.map(entry => `/journal/${entry.slug}`),
  ...COVERAGE.flatMap(city => [city.href, ...city.suburbs.map(suburb => `${city.href}/${suburbSlug(suburb)}`)]),
]
