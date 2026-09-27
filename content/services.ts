import { getService } from './service-catalogue'

/**
 * Cleaning Ninja — services taxonomy.
 *
 * Legacy preview details only; service-catalogue.ts owns approved identity.
 * Prices, methods and inclusions below are unverified and excluded from AI/new pages. Imported by the homepage
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

    tagline: 'Move-out cleaning with a room-by-room checklist.',
    description:
      'A detailed move-out clean for renters, owners, and property handovers. We work through the kitchen, bathrooms, living areas, bedrooms, floors, tracks, skirting boards, and other agreed items so the property is ready for final inspection.',
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
      'Room-by-room checklist',
      'Kitchen and bathroom detail',
      'Final walkthrough',
    ],
    trustSignals: ['Move-out focused', 'Checklist-based'],
    aliases: ['bond cleaning', 'vacate cleaning', 'move out cleaning'],
    bentoSize: 'large' as const,
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    href: '/services/end-of-lease-cleaning',
  },
  {
    slug: 'carpet-cleaning',

    tagline: 'Steam cleaning for everyday carpet wear.',
    description:
      'Carpet cleaning for bedrooms, living areas, hallways, rugs, and rental handovers. We inspect the fibres, pre-treat common marks, clean with hot-water extraction where suitable, and leave the carpet ready to air dry.',
    fromPrice: 49,
    durationHours: '1–3',
    steps: [
      'Fibre inspection + assessment',
      'Dry vacuum extraction',
      'Pre-conditioner + dwell time',
      'Spot stain pre-treatment',
      'Hot-water extraction pass where suitable',
      'pH-neutral rinse',
      'Final grooming',
    ],
    inclusions: ['$49/room flat rate', 'Spot pre-treatment', 'Final grooming'],
    trustSignals: ['Fibre checked first', 'Clear room pricing'],
    aliases: ['carpet steam cleaning', 'carpet shampoo', 'rug cleaning'],
    bentoSize: 'small' as const,
    image: 'https://images.pexels.com/photos/4176298/pexels-photo-4176298.jpeg',
    href: '/services/carpet-cleaning',
  },
  {
    slug: 'upholstery-cleaning',

    tagline: 'Careful cleaning for lounges and soft furniture.',
    description:
      'Upholstery cleaning for sofas, armchairs, dining chairs, and mattresses. We check the care label or fabric type first, then choose a suitable cleaning method and test carefully before treating the full piece.',
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
    inclusions: ['3-seater from $129', 'Fabric check first', 'Deodorise'],
    trustSignals: ['Care-label guided', 'Tested first'],
    aliases: ['sofa cleaning', 'lounge cleaning', 'mattress cleaning'],
    bentoSize: 'small' as const,
    image: 'https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg',
    href: '/services/upholstery-cleaning',
  },
  {
    slug: 'tile-grout-cleaning',

    tagline: 'Where the mop never reaches.',
    description:
      'Deep cleaning for tiled kitchens, bathrooms, laundries, and living areas. We assess the surface, loosen soil from the tile and grout lines, clean the area, and rinse so the finish looks fresher without harsh stone-damaging methods.',
    fromPrice: 9,
    durationHours: '2–4',
    steps: [
      'Surface + grout assessment',
      'Alkaline pre-spray + dwell',
      'High-pressure rotary extraction',
      'pH-neutral rinse',
      'Final surface check',
    ],
    inclusions: ['From $9/m²', 'Grout-line cleaning', 'Stone-safe option'],
    trustSignals: ['Porcelain + ceramic + stone', 'No acid on stone'],
    aliases: ['grout cleaning', 'tile restoration'],
    bentoSize: 'small' as const,
    image: 'https://images.pexels.com/photos/7641000/pexels-photo-7641000.jpeg',
    href: '/services/tile-grout-cleaning',
  },
  {
    slug: 'leather-cleaning',

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
    bentoSize: 'small' as const,
    image: 'https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg',
    href: '/services/leather-cleaning',
  },
].map(service => ({ ...service, name: getService(service.slug)!.name }))

/**
 * Auxiliary services not in the homepage bento but available in the booking flow
 * and on /services and /pricing pages.
 */
export const AUXILIARY_SERVICES = [
  { slug: 'pressure-washing',  fromPrice: 189, tagline: 'Driveways, decks, paths.' },
  { slug: 'window-cleaning',  fromPrice: 89, tagline: 'Streak-free, inside and out.' },
  { slug: 'oven-cleaning',  fromPrice: 99, tagline: 'Caustic-free, fully degreased.' },
  { slug: 'airbnb-turnaround',  fromPrice: 119, tagline: 'Short-stay cleaning between guests.' },
  { slug: 'regular-home',  fromPrice: 129, tagline: 'Same cleaner. Every visit.' },
].map(service => ({ ...service, name: getService(service.slug)!.name }))
