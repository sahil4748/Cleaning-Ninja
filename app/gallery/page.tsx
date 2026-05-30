import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Button from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { GalleryGrid } from './GalleryGrid'

export const metadata: Metadata = {
  title: 'Cleaning Ninja Before & After Gallery — Real Jobs, Real Results',
  description:
    'Browse 20+ before-and-after pairs across end-of-lease, carpet, upholstery, tile and leather work. Filter by service or suburb. Same room, same camera — only the work changed.',
  keywords: [
    'cleaning before and after',
    'carpet cleaning results',
    'bond cleaning gallery',
    'cleaning ninja portfolio',
  ],
  alternates: { canonical: '/gallery' },
}

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Gallery', href: '/gallery' },
        ])}
      />

      {/* Hero */}
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
                  Gallery
                </span>
              </div>
              <Eyebrow tone="champagne" withRule>
                Proof, not pitches
              </Eyebrow>
              <Heading
                as="h1"
                variant="display-l"
                className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[44px] sm:!text-[56px] lg:!text-[68px]"
              >
                Before. <span className="text-olive italic">And after.</span>
              </Heading>
              <Body
                variant="body-l"
                className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                measure
              >
                Every pair below is the same room, the same camera, the same time
                of day. The only thing that changed was the work. Drag the slider
                to compare. Filter by service or suburb to see jobs from your area.
              </Body>
            </div>
          </FadeUp>
        </Container>
      </section>

      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <GalleryGrid />
        </Container>
      </Section>

      {/* CTA */}
      <Section surface="charcoal" spacing="default" className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--color-cream) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <Container width="narrow">
          <FadeUp>
            <div className="text-center">
              <Stack gap="6" align="center">
                <Eyebrow tone="champagne">Your turn</Eyebrow>
                <Heading
                  as="h2"
                  variant="display-l"
                  className="tracking-tight leading-none text-cream !text-[32px] sm:!text-[44px] lg:!text-[52px]"
                >
                  Want this for your place?{' '}
                  <span className="text-olive-soft italic">Pick a date.</span>
                </Heading>
                <Body variant="body-l" className="text-cream/70 max-w-2xl">
                  Book online in 90 seconds. We document every clean with date-stamped photos.
                </Body>
                <div className="pt-4">
                  <Button as={Link} href="/book" variant="primary-dark" size="lg">
                    Book my clean
                  </Button>
                </div>
              </Stack>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  )
}
