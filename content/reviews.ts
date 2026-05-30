/**
 * Cleaning Ninja — reviews.
 *
 * Real-feeling dummy data structured exactly as the Google Business Profile
 * API returns it. Real GBP integration deferred per scope.
 *
 * Each review attributes to a named cleaner — the Calibre trick that turns
 * social proof into a person, not a faceless 5-star.
 */

export interface Review {
  id: string
  customerFirstName: string
  /** Suburb only — privacy. */
  suburb: string
  city: string
  rating: 1 | 2 | 3 | 4 | 5
  /** Review body — 2-3 sentences max, plain Australian voice. */
  body: string
  service: string
  /** Cleaner name as attributed. */
  cleanerName: string
  /** ISO date string. */
  date: string
  /** Source — for filtering. */
  source: 'google' | 'productreview' | 'direct'
}

export const REVIEWS: Review[] = [
  {
    id: 'rv-001',
    customerFirstName: 'Hannah',
    suburb: 'Bondi',
    city: 'Sydney',
    rating: 5,
    body: 'Got the full bond back, no negotiations. Photos of every room sent to me within an hour of the clean finishing. Property manager actually messaged to compliment the work.',
    service: 'End-of-Lease Clean',
    cleanerName: 'Priya Sharma',
    date: '2026-04-14',
    source: 'google',
  },
  {
    id: 'rv-002',
    customerFirstName: 'Marcus',
    suburb: 'Fitzroy',
    city: 'Melbourne',
    rating: 5,
    body: 'Same cleaner every fortnight for eight months now. She knows where the kettle goes, the dog\'s scared of the vacuum, all that. Best $169 we spend.',
    service: 'Regular Home Clean',
    cleanerName: 'Elena Kovac',
    date: '2026-04-02',
    source: 'google',
  },
  {
    id: 'rv-003',
    customerFirstName: 'Sienna',
    suburb: 'New Farm',
    city: 'Brisbane',
    rating: 5,
    body: 'Wool runner had two-year-old red wine in it and I\'d written it off. Now you can\'t tell where the stain was. I asked twice. Genuine magic.',
    service: 'Carpet Steam Clean',
    cleanerName: 'Tom Whittaker',
    date: '2026-03-28',
    source: 'productreview',
  },
  {
    id: 'rv-004',
    customerFirstName: 'David',
    suburb: 'Cottesloe',
    city: 'Perth',
    rating: 5,
    body: 'Booked Friday, cleaned Saturday morning. Quote on screen, no phone tag, no "depends on the day". Bathrooms came up like new. Will use again.',
    service: 'Regular Home Clean',
    cleanerName: 'Jessica Tran',
    date: '2026-03-22',
    source: 'google',
  },
  {
    id: 'rv-005',
    customerFirstName: 'Aisha',
    suburb: 'Norwood',
    city: 'Adelaide',
    rating: 5,
    body: 'Three-seater linen lounge that had absorbed every spilled coffee. Tom explained the fabric code, did a test patch first, came back beautiful. Honest about what couldn\'t come out (one ink stain) — appreciate it.',
    service: 'Upholstery Care',
    cleanerName: 'Tom Whittaker',
    date: '2026-03-18',
    source: 'google',
  },
  {
    id: 'rv-006',
    customerFirstName: 'James',
    suburb: 'Burleigh Heads',
    city: 'Gold Coast',
    rating: 5,
    body: 'Airbnb turnaround for our beach house. They handled six cleans last summer with same-day SMS confirmation each time. Guests started leaving five-stars for the cleanliness alone.',
    service: 'Airbnb Turnaround',
    cleanerName: 'Mia Reyes',
    date: '2026-03-12',
    source: 'google',
  },
  {
    id: 'rv-007',
    customerFirstName: 'Charlotte',
    suburb: 'Surry Hills',
    city: 'Sydney',
    rating: 5,
    body: 'NDIS plan-managed. Smooth invoicing, no chasing, cleaner knew the support plan and worked to it. Mum has stage-4 arthritis and Priya was lovely with her.',
    service: 'Regular Home Clean',
    cleanerName: 'Priya Sharma',
    date: '2026-03-04',
    source: 'direct',
  },
  {
    id: 'rv-008',
    customerFirstName: 'Ryan',
    suburb: 'Richmond',
    city: 'Melbourne',
    rating: 5,
    body: 'Property manager flagged the oven on the final inspection. The team came back the next morning, redid the oven and the range hood, sent updated photos. Bond came back in full.',
    service: 'End-of-Lease Clean',
    cleanerName: 'Daniel Costa',
    date: '2026-02-26',
    source: 'google',
  },
  {
    id: 'rv-009',
    customerFirstName: 'Olivia',
    suburb: 'Paddington',
    city: 'Brisbane',
    rating: 4,
    body: 'Solid clean of the whole house — tiles look amazing. Lost one star because the team turned up 25 minutes late, though they did message me ahead. Bathrooms were perfect.',
    service: 'End-of-Lease Clean',
    cleanerName: 'Tom Whittaker',
    date: '2026-02-19',
    source: 'productreview',
  },
  {
    id: 'rv-010',
    customerFirstName: 'Liam',
    suburb: 'Fremantle',
    city: 'Perth',
    rating: 5,
    body: 'Leather chesterfield that hadn\'t been touched in 15 years. Jessica conditioned and protected it — looks like a different couch. Worth every cent.',
    service: 'Leather Care',
    cleanerName: 'Jessica Tran',
    date: '2026-02-11',
    source: 'google',
  },
  {
    id: 'rv-011',
    customerFirstName: 'Sophie',
    suburb: 'Glenelg',
    city: 'Adelaide',
    rating: 5,
    body: 'Pre-sale styling clean before our auction. Place looked photo-ready by the time they left. Helped us beat reserve by $50k. Not joking.',
    service: 'Regular Home Clean',
    cleanerName: 'Elena Kovac',
    date: '2026-02-03',
    source: 'google',
  },
  {
    id: 'rv-012',
    customerFirstName: 'Noah',
    suburb: 'Mermaid Beach',
    city: 'Gold Coast',
    rating: 5,
    body: 'Travertine bathroom tiles that I thought we\'d need to replace. Mia did the high-pressure rotary thing, then sealed the grout. Two years later still looks fresh.',
    service: 'Tile & Grout',
    cleanerName: 'Mia Reyes',
    date: '2026-01-28',
    source: 'direct',
  },
]

export function reviewStats() {
  const avg = REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length
  return {
    avgRating: Number(avg.toFixed(1)),
    count: REVIEWS.length,
    /** Aggregate count surfaced in the trust strip — much larger than the visible sample. */
    aggregateCount: 1247,
  }
}
