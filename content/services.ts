/**
 * Cleaning Ninja — services taxonomy.
 *
 * Single source of truth for service offerings. Imported by the homepage
 * Services section, /services hub, footer, nav surfaces, schema markup,
 * and the booking flow.
 *
 * Voice: plain, confident, mildly cheeky. Aussie register without "g'day mate".
 */

export interface Service {
  slug: string
  name: string
  /** One-line summary used in cards. */
  tagline: string
  /** Longer marketing description on the service detail page. */
  description: string
  /** Starting flat-rate price in AUD. */
  fromPrice: number
  /** Average completion time in hours. */
  durationHours: string
  /** Numbered process steps shown on the detail page. */
  steps: string[]
  /** Inclusion bullets shown on the homepage card. */
  inclusions: string[]
  /** Trust badges shown next to the card. */
  trustSignals: string[]
  /** Aliases for SEO and copy regions. */
  aliases: string[]
  /** Bento card span — large or small. */
  bentoSize: 'large' | 'small'
  /** Hero image (stock for now — replaced by bespoke shoot in week 6). */
  image: string
  /** Service detail href. */
  href: string
}

export const SERVICES: Service[] = [
  {
    slug: 'end-of-lease-cleaning',
    name: 'End-of-Lease Clean',
    tagline: 'Bond back. Or we re-clean free, within 72 hours.',
    description:
      'A room-by-room exit clean built to the exact checklist your property manager inspects against. We document every room with date-stamped photos and stake our reputation on you getting the full deposit back. Standard QLD bond clean, NSW/VIC end-of-lease, WA vacate clean — same job, three names.',
    fromPrice: 295,
    durationHours: '4–8',
    steps: [
      'Entry condition report review',
      'Kitchen deep restoration — oven, range hood, drawers, drip trays',
      'Bathrooms & toilets sanitisation top to bottom',
      'All rooms — skirting, tracks, blinds, windowsills',
      'Floors deep wash + carpet steam (where included)',
      'Final walkthrough + signed checklist',
    ],
    inclusions: [
      'REA-approved checklist',
      '72-hour re-clean guarantee',
      'Photo documentation',
    ],
    trustSignals: ['Bond-back guaranteed', 'REIQ / REINSW / REIV compliant'],
    aliases: ['bond cleaning', 'vacate cleaning', 'move out cleaning'],
    bentoSize: 'large',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    href: '/services/end-of-lease-cleaning',
  },
  {
    slug: 'carpet-cleaning',
    name: 'Carpet Steam Clean',
    tagline: 'Hot-water extraction. Dry in 2–4 hours.',
    description:
      'Truck-mounted Rotovac extraction lifts embedded grit, recovers colour, and dissolves the oils that hold dirt in place. We pre-condition, agitate, extract at 90°C, then pH-rinse so nothing sticky stays behind to attract dirt back.',
    fromPrice: 49,
    durationHours: '1–3',
    steps: [
      'Fibre inspection + assessment',
      'Dry vacuum extraction',
      'Pre-conditioner + dwell time',
      'Spot stain pre-treatment',
      'Hot-water extraction pass at 90°C',
      'pH-neutral rinse',
      'Speed-dry fan setup',
    ],
    inclusions: ['$49/room flat rate', 'Pet-stain treatment', 'Speed-dry fans'],
    trustSignals: ['Safe for wool + synthetics', '95%+ moisture extraction'],
    aliases: ['carpet steam cleaning', 'carpet shampoo', 'rug cleaning'],
    bentoSize: 'small',
    image: 'https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg',
    href: '/services/carpet-cleaning',
  },
  {
    slug: 'upholstery-cleaning',
    name: 'Upholstery Care',
    tagline: 'Method matched to fabric. No water marks.',
    description:
      'Boucle, linen, velvet, microfibre — every fabric needs a different hand. We identify the fabric code (W, S, WS, X) and pick the right method so you never get water-marking, shrinkage, or dye bleed.',
    fromPrice: 89,
    durationHours: '1–2',
    steps: [
      'Fabric code identification',
      'Pre-vacuum',
      'Pre-conditioner application',
      'Method-appropriate extraction',
      'Deodorise',
      'Groom + dry',
    ],
    inclusions: ['3-seater from $129', 'Fabric-safe', 'Stain-block top-coat'],
    trustSignals: ['All fabric codes', 'No over-wetting'],
    aliases: ['sofa cleaning', 'lounge cleaning', 'mattress cleaning'],
    bentoSize: 'small',
    image: 'https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg',
    href: '/services/upholstery-cleaning',
  },
  {
    slug: 'tile-grout-cleaning',
    name: 'Tile & Grout',
    tagline: 'Where the mop never reaches.',
    description:
      'Mopping moves dirt from tile to grout, and grout absorbs everything. We alkaline-pre-spray, rotary-extract at high pressure, then pH-neutral rinse — and optionally seal the grout so it stays clean.',
    fromPrice: 9,
    durationHours: '2–4',
    steps: [
      'Surface + grout assessment',
      'Alkaline pre-spray + dwell',
      'High-pressure rotary extraction',
      'pH-neutral rinse',
      'Optional penetrating sealer',
    ],
    inclusions: ['From $9/m²', 'Grout sealing add-on', 'Stone-safe option'],
    trustSignals: ['Porcelain + ceramic + stone', 'No acid on stone'],
    aliases: ['grout cleaning', 'tile restoration'],
    bentoSize: 'small',
    image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg',
    href: '/services/tile-grout-cleaning',
  },
  {
    slug: 'leather-cleaning',
    name: 'Leather Care',
    tagline: 'Cleanse. Condition. Protect.',
    description:
      'Baby wipes and supermarket sprays strip the manufacturer\'s protective finish from leather. We pH-balance, gently lift body oils and soil, condition, then top-coat to preserve suppleness and prevent dye transfer.',
    fromPrice: 149,
    durationHours: '1–2',
    steps: [
      'Leather type identification',
      'pH-balanced surface clean',
      'Deep clean on textured areas',
      'Conditioner application',
      'Protective top-coat',
    ],
    inclusions: ['Aniline + semi-aniline + pigmented', 'No silicone products', 'Dye-transfer protection'],
    trustSignals: ['Manufacturer-safe', 'Conditioner included'],
    aliases: ['leather sofa cleaning', 'leather restoration'],
    bentoSize: 'small',
    image: 'https://images.pexels.com/photos/154161/pexels-photo-154161.jpeg',
    href: '/services/leather-cleaning',
  },
]

/**
 * Auxiliary services not in the homepage bento but available in the booking flow
 * and on /services and /pricing pages.
 */
export const AUXILIARY_SERVICES = [
  { slug: 'pressure-washing', name: 'Pressure Washing', fromPrice: 189, tagline: 'Driveways, decks, paths.' },
  { slug: 'window-cleaning', name: 'Window Cleaning', fromPrice: 89, tagline: 'Streak-free, inside and out.' },
  { slug: 'oven-cleaning', name: 'Oven Deep Clean', fromPrice: 99, tagline: 'Caustic-free, fully degreased.' },
  { slug: 'airbnb-turnaround', name: 'Airbnb Turnaround', fromPrice: 119, tagline: 'Same-day turnover. Fresh linen.' },
  { slug: 'regular-home', name: 'Regular Home Clean', fromPrice: 129, tagline: 'Same cleaner. Every visit.' },
] as const
