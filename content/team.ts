/**
 * Cleaning Ninja — named cleaner roster.
 *
 * The Calibre trust trick: every cleaner has a name, a face, a suburb, and
 * years of service. Trust through humans, not stock photos. Real photos
 * deferred to week 6 shoot per the asset plan.
 *
 * Image fields point to neutral Pexels portraits for now — explicitly *not*
 * the stock "cleaner with gloves and rictus grin" archetype.
 */

export interface TeamMember {
  id: string
  name: string
  /** Lead, senior, specialist, regional manager. */
  role: string
  city: string
  cityCovered: string[]
  yearsWithUs: number
  specialty: string
  languages: string[]
  photo: string
  /** Quote shown on the team page. */
  quote: string
}

export const TEAM: TeamMember[] = [
  {
    id: 'tm-priya',
    name: 'Priya Sharma',
    role: 'Senior Cleaner',
    city: 'Sydney',
    cityCovered: ['Bondi', 'Surry Hills', 'Paddington', 'Newtown'],
    yearsWithUs: 4,
    specialty: 'End-of-Lease + NDIS',
    languages: ['English', 'Hindi', 'Punjabi'],
    photo: 'https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg',
    quote: 'Property managers know my work. That trust is the whole job.',
  },
  {
    id: 'tm-elena',
    name: 'Elena Kovac',
    role: 'Regional Lead — Melbourne',
    city: 'Melbourne',
    cityCovered: ['Fitzroy', 'Carlton', 'Richmond', 'Brunswick'],
    yearsWithUs: 6,
    specialty: 'Regular home clean, pre-sale styling',
    languages: ['English', 'Serbian'],
    photo: 'https://images.pexels.com/photos/4098188/pexels-photo-4098188.jpeg',
    quote: 'Same home, same hands, every fortnight. That\'s the work.',
  },
  {
    id: 'tm-tom',
    name: 'Tom Whittaker',
    role: 'Carpet & Upholstery Specialist',
    city: 'Brisbane',
    cityCovered: ['New Farm', 'Paddington', 'West End', 'Bulimba'],
    yearsWithUs: 3,
    specialty: 'Hot-water extraction, leather, fabric codes',
    languages: ['English'],
    photo: 'https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg',
    quote: 'A wool rug is not a synthetic rug. The method follows the fibre.',
  },
  {
    id: 'tm-jessica',
    name: 'Jessica Tran',
    role: 'Senior Cleaner',
    city: 'Perth',
    cityCovered: ['Cottesloe', 'Subiaco', 'Fremantle', 'Claremont'],
    yearsWithUs: 5,
    specialty: 'Leather care, regular home, vacate cleans',
    languages: ['English', 'Vietnamese'],
    photo: 'https://images.pexels.com/photos/4098271/pexels-photo-4098271.jpeg',
    quote: 'Vacate cleans are how I started. Still my favourite — clear brief, clear result.',
  },
  {
    id: 'tm-daniel',
    name: 'Daniel Costa',
    role: 'End-of-Lease Specialist',
    city: 'Melbourne',
    cityCovered: ['South Yarra', 'St Kilda', 'Brighton', 'Hawthorn'],
    yearsWithUs: 4,
    specialty: 'Bond-back guarantee, REIV compliance',
    languages: ['English', 'Portuguese'],
    photo: 'https://images.pexels.com/photos/5212361/pexels-photo-5212361.jpeg',
    quote: 'If the inspection flags anything, I\'m back at the property within 24 hours.',
  },
  {
    id: 'tm-mia',
    name: 'Mia Reyes',
    role: 'Airbnb & Short-stay Lead',
    city: 'Gold Coast',
    cityCovered: ['Burleigh', 'Broadbeach', 'Mermaid', 'Surfers'],
    yearsWithUs: 3,
    specialty: 'Same-day turnaround, linen, restock',
    languages: ['English', 'Spanish', 'Tagalog'],
    photo: 'https://images.pexels.com/photos/4098361/pexels-photo-4098361.jpeg',
    quote: 'Check-out is 10am, check-in is 3pm. That\'s my Olympics every Friday.',
  },
  {
    id: 'tm-hassan',
    name: 'Hassan Al-Mahdi',
    role: 'Senior Cleaner',
    city: 'Adelaide',
    cityCovered: ['Norwood', 'Glenelg', 'North Adelaide', 'Unley'],
    yearsWithUs: 2,
    specialty: 'Heritage cottages, eco-only products',
    languages: ['English', 'Arabic'],
    photo: 'https://images.pexels.com/photos/8867438/pexels-photo-8867438.jpeg',
    quote: 'Old houses need a gentle hand. Steam, microfibre, and patience.',
  },
  {
    id: 'tm-saima',
    name: 'Saima Imtiyaz',
    role: 'Operations + Quality Lead',
    city: 'Sydney',
    cityCovered: ['Nationwide oversight'],
    yearsWithUs: 7,
    specialty: 'Training, QA, customer escalations',
    languages: ['English'],
    photo: 'https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg',
    quote: 'I trained every senior cleaner on this team. They\'ve earned the badge.',
  },
]
