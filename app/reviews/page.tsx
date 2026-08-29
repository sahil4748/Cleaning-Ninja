import type { Metadata } from 'next'
import Link from 'next/link'
import { Star } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Caption from '@/components/ui/Caption'
import Button from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { JsonLd } from '@/components/seo/JsonLd'
import { REVIEWS, reviewStats } from '@/content/reviews'
import { breadcrumbSchema, reviewSchema } from '@/lib/schema'
import { ReviewsWall } from './ReviewsWall'

export const metadata: Metadata = {
  title: 'Cleaning Ninja Reviews — Customer Feedback',
  description:
    'Read current Cleaning Ninja review samples across Sydney, Melbourne, Brisbane, Perth, Adelaide and the Gold Coast. Filter by city, service or rating.',
  keywords: [
    'cleaning ninja reviews',
    'cleaning service reviews australia',
    'house cleaners reviews sydney',
    'bond cleaning reviews brisbane',
  ],
  alternates: { canonical: '/reviews' },
}

export default function ReviewsPage() {
  const stats = reviewStats()
  const fiveStarCount = REVIEWS.filter((review) => review.rating === 5).length

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Reviews', href: '/reviews' },
          ]),
          ...REVIEWS.map(reviewSchema),
        ]}
      />

      {/* Hero with stats */}
      <section className="relative overflow-hidden bg-cream py-16 lg:py-24 border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--color-charcoal) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <Container width="wide">
          <FadeUp>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Link
                  href="/"
                  className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal/50 hover:text-olive transition-colors"
                >
                  Home
                </Link>
                <span className="font-body text-[12px] text-charcoal/30">/</span>
                <span className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-olive">
                  Reviews
                </span>
              </div>
              <Eyebrow tone="champagne" withRule>
                Customer reviews
              </Eyebrow>
              <Heading
                as="h1"
                variant="display-l"
                className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[44px] sm:!text-[56px] lg:!text-[68px]"
              >
                Customer feedback.{' '}
                <span className="text-olive italic">Sorted by service.</span>
              </Heading>
              <Body
                variant="body-l"
                className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                measure
              >
                Browse the current review samples by city, service, or rating.
                Live review-source integration should be verified before launch.
              </Body>
            </div>
          </FadeUp>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border pt-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-[40px] sm:text-[48px] font-bold text-charcoal tracking-tight">
                  {stats.avgRating}
                </span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-olive text-olive" />
                  ))}
                </div>
              </div>
              <Caption className="text-charcoal/75 mt-1">
                Average in current sample
              </Caption>
            </div>
            <div>
              <div className="font-display text-[40px] sm:text-[48px] font-bold text-charcoal tracking-tight tabular-nums">
                {stats.count}
              </div>
              <Caption className="text-charcoal/75 mt-1">Sample reviews</Caption>
            </div>
            <div>
              <div className="font-display text-[40px] sm:text-[48px] font-bold text-charcoal tracking-tight tabular-nums">
                {fiveStarCount}
              </div>
              <Caption className="text-charcoal/75 mt-1">5-star samples</Caption>
            </div>
            <div>
              <div className="font-display text-[40px] sm:text-[48px] font-bold text-charcoal tracking-tight tabular-nums">
                6
              </div>
              <Caption className="text-charcoal/75 mt-1">
                Cities with sample reviews
              </Caption>
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews wall */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <ReviewsWall />
        </Container>
      </Section>

      {/* CTA */}
      <Section surface="charcoal" spacing="default" className="relative overflow-hidden">
        <Container width="narrow">
          <FadeUp>
            <div className="text-center">
              <Stack gap="6" align="center">
                <Eyebrow tone="bone">Your turn</Eyebrow>
                <Heading
                  as="h2"
                  variant="display-l"
                  className="tracking-tight leading-none text-cream !text-[32px] sm:!text-[44px] lg:!text-[52px]"
                >
                  Join the{' '}
                  <span className="text-olive-soft italic">5-star wall.</span>
                </Heading>
                <Body variant="body-l" className="text-cream/70 max-w-2xl">
                  Book your first clean today. We'd love to hear what you think.
                </Body>
                <div className="pt-4">
                  <Button as={Link} href="/book" variant="primary-dark" size="lg">
                    Get a Quote
                  </Button>
                </div>
                <Caption className="font-body text-cream/55">
                  Sample of {stats.count} reviews shown from the current site data.
                </Caption>
              </Stack>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  )
}
