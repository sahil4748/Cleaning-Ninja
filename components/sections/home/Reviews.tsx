'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import { FadeUp } from '@/components/motion/FadeUp'
import { SplitText } from '@/components/motion/SplitText'
import { CountUp } from '@/components/motion/CountUp'
import { REVIEWS, reviewStats } from '@/content/reviews'
import { cn } from '@/lib/utils'

export default function Reviews() {
  const stats = reviewStats()
  const [page, setPage] = useState(0)
  const cardsPerPage = 3
  const pages = Math.ceil(REVIEWS.length / cardsPerPage)

  // Auto-advance carousel (slow, 6s)
  useEffect(() => {
    const id = setInterval(() => {
      setPage((p) => (p + 1) % pages)
    }, 6000)
    return () => clearInterval(id)
  }, [pages])

  const visible = REVIEWS.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage)

  return (
    <Section surface="surface-muted" spacing="default" aria-labelledby="reviews-heading">
      <Container width="wide">
        <FadeUp>
          <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Stack gap="6">
                <Eyebrow tone="champagne" withRule>
                  Reviews
                </Eyebrow>
                <Heading as="h2" id="reviews-heading" variant="display-xl" balance>
                  <SplitText>What Australians actually say.</SplitText>
                </Heading>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[64px] font-bold leading-none tracking-[-0.03em] text-olive">
                    {stats.avgRating}
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-0.5 text-olive">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[13px] text-charcoal/75">
                      across <CountUp to={stats.aggregateCount} /> reviews
                    </span>
                  </div>
                </div>
              </Stack>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <Body variant="body-l" className="text-charcoal/80 max-w-[52ch]">
                Every review attributes to the named cleaner who did the job. Real first names, real suburbs, real services. Sample shown; the full feed is at <a href="/reviews" className="text-olive underline decoration-olive-deep underline-offset-4 transition-colors hover:text-olive-deep">/reviews</a>.
              </Body>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((p) => (p - 1 + pages) % pages)}
                  aria-label="Previous reviews"
                  className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[color:var(--color-border)] text-charcoal transition-colors duration-200 hover:border-olive hover:text-olive"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => (p + 1) % pages)}
                  aria-label="Next reviews"
                  className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[color:var(--color-border)] text-charcoal transition-colors duration-200 hover:border-olive hover:text-olive"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="ml-2 flex items-center gap-1.5">
                  {Array.from({ length: pages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPage(i)}
                      aria-label={`Go to review page ${i + 1}`}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-300',
                        i === page ? 'w-6 bg-olive' : 'w-1.5 bg-charcoal/25 hover:bg-charcoal/45',
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}
              className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6"
            >
              {visible.map((review) => (
                <article
                  key={review.id}
                  className="relative flex flex-col gap-5 rounded-[8px] border border-[color:var(--color-border)] bg-cream p-7 transition-colors duration-300 hover:border-olive"
                >
                  <Quote className="h-6 w-6 text-olive" />
                  <div className="flex items-center gap-1 text-olive">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn('h-3.5 w-3.5', s <= review.rating ? 'fill-current' : 'opacity-25')}
                      />
                    ))}
                  </div>
                  <Body variant="body" className="text-charcoal/85 italic flex-1">
                    "{review.body}"
                  </Body>
                  <div className="border-t border-[color:var(--color-border)] pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold text-charcoal">{review.customerFirstName}</span>
                      <span className="text-[12px] text-charcoal/75">
                        {new Date(review.date).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-charcoal/75">
                      <span>{review.suburb}, {review.city}</span>
                      <span className="text-charcoal/30">·</span>
                      <span>{review.service}</span>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-olive-deep">
                      <span className="inline-block h-1 w-1 rounded-full bg-olive-deep" />
                      Cleaned by {review.cleanerName}
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  )
}
