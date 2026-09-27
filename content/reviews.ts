/** PLACEHOLDER: Review and aggregate ratings. Visual preview only; prohibited as verified business truth. Production release is blocked. */
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

/** No review has source evidence and publication approval yet. */
export const REVIEWS: Review[] = []
export function reviewStats() {
  const count = REVIEWS.length
  return { avgRating: count ? Number((REVIEWS.reduce((sum, review) => sum + review.rating, 0) / count).toFixed(1)) : 0,
    count, aggregateCount: count }
}
