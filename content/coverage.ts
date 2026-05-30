/**
 * Cleaning Ninja — service coverage.
 *
 * Six metros at launch. Each city has its own /service-areas/[city] page and
 * top-suburb landing pages at /service-areas/[city]/[suburb] for SEO.
 *
 * Each city also has lat/lng for the SVG Australia map dot positions.
 */

export interface CoverageRegion {
  slug: string
  city: string
  state: string
  /** Local term for end-of-lease cleaning. */
  bondTerm: 'Bond clean' | 'End of lease' | 'Vacate clean'
  /** Editorial blurb for the homepage Coverage card. */
  blurb: string
  /** Top suburbs — render as individual landing pages. */
  suburbs: string[]
  /** Aggregate price benchmark for the city's 3BR EOL clean. */
  benchmarkPrice: number
  /** Stat — number of cleans completed in this city. Dummy data. */
  cleansCompleted: number
  /** Dot position on the Australia SVG (0-100% based viewBox 0 0 100 100). */
  mapDot: { x: number; y: number }
  href: string
}

export const COVERAGE: CoverageRegion[] = [
  {
    slug: 'sydney',
    city: 'Sydney',
    state: 'NSW',
    bondTerm: 'End of lease',
    blurb:
      'Inner-west terraces, eastern-suburb apartments, North-Shore family homes — and everything in between.',
    suburbs: [
      'Bondi',
      'Surry Hills',
      'Newtown',
      'Manly',
      'Parramatta',
      'Chatswood',
      'Mosman',
      'Marrickville',
      'Paddington',
      'Randwick',
    ],
    benchmarkPrice: 485,
    cleansCompleted: 14820,
    mapDot: { x: 86, y: 70 },
    href: '/service-areas/sydney',
  },
  {
    slug: 'melbourne',
    city: 'Melbourne',
    state: 'VIC',
    bondTerm: 'End of lease',
    blurb:
      'Period workers\' cottages, CBD apartments, beachside Brighton homes. The inner city to the bay.',
    suburbs: [
      'Carlton',
      'Fitzroy',
      'Richmond',
      'St Kilda',
      'South Yarra',
      'Brunswick',
      'Brighton',
      'Footscray',
      'Hawthorn',
      'Toorak',
    ],
    benchmarkPrice: 420,
    cleansCompleted: 12340,
    mapDot: { x: 72, y: 84 },
    href: '/service-areas/melbourne',
  },
  {
    slug: 'brisbane',
    city: 'Brisbane',
    state: 'QLD',
    bondTerm: 'Bond clean',
    blurb:
      'Queenslanders in West End, riverside apartments in Newstead, family homes in The Gap.',
    suburbs: [
      'New Farm',
      'Paddington',
      'West End',
      'Toowong',
      'Bulimba',
      'Hamilton',
      'Kelvin Grove',
      'Indooroopilly',
      'The Gap',
      'Carindale',
    ],
    benchmarkPrice: 365,
    cleansCompleted: 9870,
    mapDot: { x: 84, y: 50 },
    href: '/service-areas/brisbane',
  },
  {
    slug: 'perth',
    city: 'Perth',
    state: 'WA',
    bondTerm: 'Vacate clean',
    blurb:
      'Cottesloe seaside, Subiaco terraces, and family suburbs from Joondalup to Fremantle.',
    suburbs: [
      'Cottesloe',
      'Subiaco',
      'Fremantle',
      'Joondalup',
      'Scarborough',
      'Leederville',
      'Mount Hawthorn',
      'Mosman Park',
      'Claremont',
      'Nedlands',
    ],
    benchmarkPrice: 395,
    cleansCompleted: 6420,
    mapDot: { x: 16, y: 70 },
    href: '/service-areas/perth',
  },
  {
    slug: 'adelaide',
    city: 'Adelaide',
    state: 'SA',
    bondTerm: 'End of lease',
    blurb:
      'Heritage cottages in North Adelaide, beachside Glenelg homes, modern Norwood townhouses.',
    suburbs: [
      'North Adelaide',
      'Glenelg',
      'Norwood',
      'Unley',
      'Prospect',
      'Burnside',
      'Henley Beach',
      'Mile End',
      'Stepney',
      'Walkerville',
    ],
    benchmarkPrice: 345,
    cleansCompleted: 4910,
    mapDot: { x: 56, y: 80 },
    href: '/service-areas/adelaide',
  },
  {
    slug: 'gold-coast',
    city: 'Gold Coast',
    state: 'QLD',
    bondTerm: 'Bond clean',
    blurb:
      'Beachside towers, hinterland homes, and holiday lets from Coolangatta to Main Beach.',
    suburbs: [
      'Burleigh Heads',
      'Mermaid Beach',
      'Broadbeach',
      'Main Beach',
      'Palm Beach',
      'Coolangatta',
      'Surfers Paradise',
      'Robina',
      'Currumbin',
      'Bundall',
    ],
    benchmarkPrice: 380,
    cleansCompleted: 5630,
    mapDot: { x: 87, y: 56 },
    href: '/service-areas/gold-coast',
  },
]

export function findCity(slug: string): CoverageRegion | undefined {
  return COVERAGE.find((c) => c.slug === slug)
}

/** Slug-safe form of a suburb name. */
export function suburbSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function findSuburb(citySlug: string, suburbSlugInput: string) {
  const city = findCity(citySlug)
  if (!city) return null
  const suburb = city.suburbs.find((s) => suburbSlug(s) === suburbSlugInput)
  if (!suburb) return null
  return { city, suburb }
}

/** Reverse lookup of which city a suburb belongs to. */
export function findCityBySuburb(suburbSlugInput: string) {
  for (const city of COVERAGE) {
    if (city.suburbs.some((s) => suburbSlug(s) === suburbSlugInput)) {
      return city
    }
  }
  return null
}
