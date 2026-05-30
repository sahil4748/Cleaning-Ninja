import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Caption from '@/components/ui/Caption'
import Button from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { Stagger } from '@/components/motion/Stagger'
import { JsonLd } from '@/components/seo/JsonLd'
import { COVERAGE, suburbSlug } from '@/content/coverage'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Service Areas — Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast',
  description:
    'Cleaning Ninja covers six Australian metros: Sydney, Melbourne, Brisbane, Perth, Adelaide and the Gold Coast. Find your suburb and book a local cleaner today.',
  keywords: [
    'cleaning services australia',
    'cleaners sydney suburbs',
    'cleaners melbourne suburbs',
    'cleaners brisbane',
    'cleaners perth',
    'cleaners adelaide',
    'cleaners gold coast',
  ],
  alternates: { canonical: '/service-areas' },
}

export default function ServiceAreasPage() {
  const totalSuburbs = COVERAGE.reduce((a, c) => a + c.suburbs.length, 0)
  const totalCleans = COVERAGE.reduce((a, c) => a + c.cleansCompleted, 0)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Service areas', href: '/service-areas' },
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
                  Service areas
                </span>
              </div>
              <Eyebrow tone="champagne" withRule>
                Coverage
              </Eyebrow>
              <Heading
                as="h1"
                variant="display-l"
                className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[44px] sm:!text-[56px] lg:!text-[68px]"
              >
                Six cities. <span className="text-olive italic">{totalSuburbs}+ suburbs.</span>
              </Heading>
              <Body
                variant="body-l"
                className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                measure
              >
                Every Ninja lives in the city they service. No travel charges,
                no convoys, no depot 90 minutes away. Find your city below, then
                drill down to your suburb. {totalCleans.toLocaleString()}+ cleans
                already completed across our service footprint.
              </Body>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Australia map + city cards */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <FadeUp>
                <div className="aspect-square relative bg-cream border border-border rounded-[4px] p-6 sm:p-8 overflow-hidden">
                  <Caption className="font-mono uppercase tracking-widest text-charcoal/50 mb-2">
                    The footprint
                  </Caption>
                  <h3 className="font-display font-semibold text-[20px] text-charcoal tracking-tight mb-6">
                    Australia — 2026
                  </h3>
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-auto"
                    aria-label="Australia map showing six service cities"
                  >
                    <path
                      d="M15,50 Q12,40 18,32 Q25,25 35,28 Q45,20 55,22 Q70,18 80,25 Q90,32 92,42 Q94,55 88,65 Q82,72 75,75 Q60,82 50,80 Q35,82 22,75 Q14,68 13,58 Z"
                      fill="var(--color-charcoal-soft)"
                      opacity="0.15"
                      stroke="var(--color-charcoal)"
                      strokeWidth="0.4"
                      strokeOpacity="0.3"
                    />
                    {COVERAGE.map((c) => (
                      <g key={c.slug}>
                        <circle
                          cx={c.mapDot.x}
                          cy={c.mapDot.y}
                          r="2.5"
                          fill="var(--color-olive)"
                        />
                        <circle
                          cx={c.mapDot.x}
                          cy={c.mapDot.y}
                          r="5"
                          fill="var(--color-olive)"
                          opacity="0.18"
                        />
                        <text
                          x={c.mapDot.x}
                          y={c.mapDot.y - 4}
                          textAnchor="middle"
                          fontSize="2.6"
                          fontFamily="var(--font-inter)"
                          fontWeight="600"
                          fill="var(--color-charcoal)"
                        >
                          {c.city}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </FadeUp>
            </div>

            <div className="lg:col-span-7">
              <Stagger gap={0.06} distance={12}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {COVERAGE.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/service-areas/${city.slug}`}
                      className="group block border border-border bg-cream rounded-[4px] p-6 hover:border-olive transition-colors"
                    >
                      <div className="flex items-baseline justify-between mb-4">
                        <Eyebrow tone="champagne">{city.state}</Eyebrow>
                        <ArrowUpRight className="h-4 w-4 text-charcoal/40 group-hover:text-olive transition-colors" />
                      </div>
                      <h3 className="font-display font-semibold text-[26px] text-charcoal tracking-tight mb-3 group-hover:text-olive-deep transition-colors">
                        {city.city}
                      </h3>
                      <p className="font-body text-[14px] text-charcoal/72 leading-relaxed line-clamp-3 mb-5">
                        {city.blurb}
                      </p>
                      <div className="flex items-center gap-x-4 gap-y-2 flex-wrap text-charcoal/75">
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-body uppercase tracking-[0.12em]">
                          <MapPin className="h-3.5 w-3.5 text-olive" />
                          {city.suburbs.length} suburbs
                        </span>
                        <span className="font-body text-[12px] uppercase tracking-[0.12em] text-charcoal/55">
                          From ${city.benchmarkPrice}
                        </span>
                        <span className="font-body text-[12px] uppercase tracking-[0.12em] text-charcoal/55">
                          {city.cleansCompleted.toLocaleString()} cleans
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </Stagger>
            </div>
          </div>
        </Container>
      </Section>

      {/* All suburbs index */}
      <Section surface="cream" spacing="default" className="border-y border-border">
        <Container width="wide">
          <FadeUp>
            <div className="max-w-3xl mb-12">
              <Eyebrow tone="champagne">Every suburb</Eyebrow>
              <Heading
                as="h2"
                variant="h2"
                className="mt-4 tracking-tight text-charcoal"
              >
                Find your suburb. <span className="text-olive italic">See your local team.</span>
              </Heading>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {COVERAGE.map((city) => (
              <div key={city.slug}>
                <Link
                  href={`/service-areas/${city.slug}`}
                  className="group flex items-baseline justify-between border-b border-border pb-3 mb-4 hover:border-olive transition-colors"
                >
                  <h3 className="font-display font-semibold text-[20px] text-charcoal tracking-tight group-hover:text-olive transition-colors">
                    {city.city}
                  </h3>
                  <Caption className="font-body text-charcoal/55">
                    {city.suburbs.length} suburbs
                  </Caption>
                </Link>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-body text-[14px] text-charcoal/75">
                  {city.suburbs.map((s) => (
                    <li key={s}>
                      <Link
                        href={`/service-areas/${city.slug}/${suburbSlug(s)}`}
                        className="hover:text-olive transition-colors"
                      >
                        {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section surface="charcoal" spacing="default" className="relative overflow-hidden">
        <Container width="narrow">
          <FadeUp>
            <div className="text-center">
              <Stack gap="6" align="center">
                <Eyebrow tone="champagne">Not sure?</Eyebrow>
                <Heading
                  as="h2"
                  variant="display-l"
                  className="tracking-tight leading-none text-cream !text-[32px] sm:!text-[44px] lg:!text-[52px]"
                >
                  Your suburb not listed?{' '}
                  <span className="text-olive-soft italic">Ring us.</span>
                </Heading>
                <Body variant="body-l" className="text-cream/70 max-w-2xl">
                  We list the most-booked suburbs — but we cover hundreds more.
                  Drop your address in the booking flow and we'll confirm coverage.
                </Body>
                <div className="pt-4">
                  <Button as={Link} href="/book" variant="primary-dark" size="lg">
                    Check coverage
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
