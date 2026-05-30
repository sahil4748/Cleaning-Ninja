'use client'

import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import Caption from '@/components/ui/Caption'
import { REVIEWS } from '@/content/reviews'
import { cn } from '@/lib/utils'

const CITY_FILTERS = ['All cities', 'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast']
const SERVICE_FILTERS = ['All services', 'End-of-Lease Clean', 'Regular Home Clean', 'Carpet Steam Clean', 'Upholstery Care', 'Tile & Grout', 'Leather Care', 'Airbnb Turnaround']
const RATING_FILTERS = [0, 5, 4, 3] as const

export function ReviewsWall() {
  const [city, setCity] = useState<string>('All cities')
  const [service, setService] = useState<string>('All services')
  const [rating, setRating] = useState<number>(0)

  const visible = useMemo(() => {
    return REVIEWS.filter((r) => {
      if (city !== 'All cities' && r.city !== city) return false
      if (service !== 'All services' && r.service !== service) return false
      if (rating > 0 && r.rating < rating) return false
      return true
    })
  }, [city, service, rating])

  return (
    <div>
      {/* Filter row */}
      <div className="space-y-4 border-b border-border pb-6 mb-10">
        <div className="flex flex-wrap items-center gap-2">
          <Caption className="font-body text-charcoal/75 mr-2 uppercase tracking-widest">
            City
          </Caption>
          {CITY_FILTERS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              aria-pressed={city === c}
              className={cn(
                'rounded-full border px-3 py-1 font-body text-[12px] font-semibold transition-colors cursor-pointer',
                city === c
                  ? 'border-olive-deep bg-olive-deep text-cream'
                  : 'border-charcoal/20 bg-cream text-charcoal/75 hover:border-charcoal',
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Caption className="font-body text-charcoal/75 mr-2 uppercase tracking-widest">
            Service
          </Caption>
          {SERVICE_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setService(s)}
              aria-pressed={service === s}
              className={cn(
                'rounded-full border px-3 py-1 font-body text-[12px] font-semibold transition-colors cursor-pointer',
                service === s
                  ? 'border-olive-deep bg-olive-deep text-cream'
                  : 'border-charcoal/20 bg-cream text-charcoal/75 hover:border-charcoal',
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Caption className="font-body text-charcoal/75 mr-2 uppercase tracking-widest">
            Rating
          </Caption>
          {RATING_FILTERS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRating(r)}
              aria-pressed={rating === r}
              className={cn(
                'rounded-full border px-3 py-1 font-body text-[12px] font-semibold transition-colors cursor-pointer',
                rating === r
                  ? 'border-olive-deep bg-olive-deep text-cream'
                  : 'border-charcoal/20 bg-cream text-charcoal/75 hover:border-charcoal',
              )}
            >
              {r === 0 ? 'All' : `${r}+ stars`}
            </button>
          ))}
          <Caption className="ml-auto font-body text-charcoal/75">
            Showing {visible.length} of {REVIEWS.length}
          </Caption>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((r) => (
          <article
            key={r.id}
            className="border border-border bg-cream rounded-[4px] p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-olive text-olive" />
                ))}
              </div>
              <Caption className="font-mono text-[10px] uppercase tracking-widest text-charcoal/45">
                {r.source}
              </Caption>
            </div>
            <blockquote className="font-body text-[15px] text-charcoal/85 leading-relaxed mb-4 flex-1">
              "{r.body}"
            </blockquote>
            <div className="border-t border-border pt-3">
              <p className="font-display font-semibold text-[14px] text-charcoal">
                {r.customerFirstName} — {r.suburb}, {r.city}
              </p>
              <Caption className="font-body text-charcoal/75 mt-0.5">
                {r.service} · cleaned by {r.cleanerName} ·{' '}
                {new Date(r.date).toLocaleDateString('en-AU', {
                  month: 'short',
                  year: 'numeric',
                })}
              </Caption>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-center py-12 font-body text-charcoal/75">
          No reviews match that combination. Try resetting a filter.
        </p>
      ) : null}
    </div>
  )
}
