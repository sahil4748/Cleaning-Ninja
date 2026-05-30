/**
 * Cleaning Ninja — journal articles.
 *
 * Six launch articles targeting the highest-volume informational queries in
 * the AU cleaning space. Each article is structured as headline + dek +
 * body markdown placeholder for now; bodies are filled in week 2 by the
 * content lead.
 */

export interface JournalEntry {
  slug: string
  title: string
  dek: string
  category: 'Pricing' | 'Bond' | 'Eco' | 'NDIS' | 'Airbnb' | 'Care'
  readMinutes: number
  publishedAt: string
  author: string
  image: string
  bodyMarkdown: string
}

export const JOURNAL: JournalEntry[] = [
  {
    slug: 'end-of-lease-cleaning-sydney-2026',
    title: 'What does end-of-lease cleaning actually cost in Sydney in 2026?',
    dek: 'A no-nonsense price breakdown by property size, plus the four hidden costs most quotes leave out.',
    category: 'Pricing',
    readMinutes: 7,
    publishedAt: '2026-04-22',
    author: 'Saima Imtiyaz',
    image: 'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg',
    bodyMarkdown:
      '*Full article — published in week 2 of the redev.* Sydney end-of-lease pricing in 2026 sits roughly 18% higher than Melbourne and 25% higher than Brisbane for the same property size...',
  },
  {
    slug: 'bond-back-guarantee-qld-tenants',
    title: 'Bond-back guarantee: what every QLD tenant should demand',
    dek: 'The four exact phrases your bond-clean contract must include, or the guarantee is a marketing word.',
    category: 'Bond',
    readMinutes: 6,
    publishedAt: '2026-04-08',
    author: 'Tom Whittaker',
    image: 'https://images.pexels.com/photos/1879061/pexels-photo-1879061.jpeg',
    bodyMarkdown:
      '*Full article — published in week 2 of the redev.* Under the QLD Residential Tenancies and Rooming Accommodation Act 2008...',
  },
  {
    slug: 'eco-cleaning-products-that-actually-work',
    title: 'Eco-cleaning products that actually work (and the ones that don\'t)',
    dek: 'We ran six "green" cleaners against a known soiled tile. Two failed. One demolished. Here\'s the data.',
    category: 'Eco',
    readMinutes: 8,
    publishedAt: '2026-03-25',
    author: 'Hassan Al-Mahdi',
    image: 'https://images.pexels.com/photos/4239147/pexels-photo-4239147.jpeg',
    bodyMarkdown:
      '*Full article — published in week 2 of the redev.* Koh, Ecologic, Murchison-Hume, Earth Choice, Ecover, Simple Green...',
  },
  {
    slug: 'ndis-cleaning-explained',
    title: 'NDIS cleaning explained: support codes, plan-management, and how to claim',
    dek: 'A plain-English walkthrough of support item 01_020_0120_1_1 and what it does — and doesn\'t — cover.',
    category: 'NDIS',
    readMinutes: 9,
    publishedAt: '2026-03-11',
    author: 'Priya Sharma',
    image: 'https://images.pexels.com/photos/6196250/pexels-photo-6196250.jpeg',
    bodyMarkdown:
      '*Full article — published in week 2 of the redev.* Household Tasks under the NDIS price guide...',
  },
  {
    slug: 'airbnb-host-clean-between-guests-checklist',
    title: 'The Airbnb host\'s clean-between-guests checklist (printable)',
    dek: '47 items, ordered by room, that turn a 4-star "clean" review into a 5-star.',
    category: 'Airbnb',
    readMinutes: 5,
    publishedAt: '2026-02-19',
    author: 'Mia Reyes',
    image: 'https://images.pexels.com/photos/6580226/pexels-photo-6580226.jpeg',
    bodyMarkdown:
      '*Full article — published in week 2 of the redev.* Linen first, kitchen second, bathrooms third...',
  },
  {
    slug: 'carpet-care-how-often-is-too-often',
    title: 'Carpet care: how often is too often?',
    dek: 'Wool versus synthetic, pets versus no-pets, busy entry versus formal room — the real schedule.',
    category: 'Care',
    readMinutes: 4,
    publishedAt: '2026-02-05',
    author: 'Tom Whittaker',
    image: 'https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg',
    bodyMarkdown:
      '*Full article — published in week 2 of the redev.* The Carpet & Rug Institute recommendation is 12–18 months...',
  },
]
