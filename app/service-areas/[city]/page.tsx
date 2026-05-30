import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ArrowUpRight, Star, ShieldCheck, MapPin, Clock } from 'lucide-react'
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
import { COVERAGE, findCity, suburbSlug } from '@/content/coverage'
import { REVIEWS } from '@/content/reviews'
import { TEAM } from '@/content/team'
import { REGULAR_CLEAN_MATRIX, END_OF_LEASE_MATRIX } from '@/content/pricing'
import { breadcrumbSchema, localBusinessSchema } from '@/lib/schema'

export async function generateStaticParams() {
  return COVERAGE.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = findCity(citySlug)
  if (!city) return { title: 'City not found' }

  return {
    title: `Cleaning Services ${city.city} — ${city.bondTerm}, Carpet, Regular Clean`,
    description: `Local ${city.city} cleaning team. ${city.bondTerm} from $${city.benchmarkPrice}, regular cleans from $${REGULAR_CLEAN_MATRIX[0].prices[city.slug]}, carpet steam from $49/room. ${city.cleansCompleted.toLocaleString()}+ cleans completed across ${city.suburbs.length} suburbs.`,
    keywords: [
      `cleaning ${city.city.toLowerCase()}`,
      `${city.bondTerm.toLowerCase()} ${city.city.toLowerCase()}`,
      `house cleaning ${city.city.toLowerCase()}`,
      `${city.city.toLowerCase()} cleaners`,
    ],
    alternates: { canonical: `/service-areas/${city.slug}` },
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: citySlug } = await params
  const city = findCity(citySlug)
  if (!city) notFound()

  const cityReviews = REVIEWS.filter((r) => r.city === city.city)
  const cityTeam = TEAM.filter(
    (t) => t.city === city.city || t.cityCovered.some((s) => city.suburbs.includes(s)),
  )

  const eolRow = END_OF_LEASE_MATRIX.find((r) => r.size === '3br2ba')
  const regRow = REGULAR_CLEAN_MATRIX.find((r) => r.size === '2br1ba')

  const localBusiness = localBusinessSchema(city.slug)
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Service areas', href: '/service-areas' },
            { name: city.city, href: `/service-areas/${city.slug}` },
          ]),
          ...(localBusiness ? [localBusiness] : []),
        ]}
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
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link
                  href="/"
                  className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal/50 hover:text-olive transition-colors"
                >
                  Home
                </Link>
                <span className="font-body text-[12px] text-charcoal/30">/</span>
                <Link
                  href="/service-areas"
                  className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal/50 hover:text-olive transition-colors"
                >
                  Areas
                </Link>
                <span className="font-body text-[12px] text-charcoal/30">/</span>
                <span className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-olive">
                  {city.city}
                </span>
              </div>
              <Eyebrow tone="champagne" withRule>
                {city.state} · {city.bondTerm}
              </Eyebrow>
              <Heading
                as="h1"
                variant="display-l"
                className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[44px] sm:!text-[56px] lg:!text-[68px]"
              >
                Cleaning Ninja <span className="text-olive italic">{city.city}.</span>
              </Heading>
              <Body
                variant="body-l"
                className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                measure
              >
                {city.blurb} Every Ninja on the {city.city} roster lives in the
                metro and works from your local team — no travel surcharges, no
                strangers from out of town.
              </Body>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="font-display text-[32px] sm:text-[36px] font-bold text-charcoal tracking-tight tabular-nums">
                    {city.cleansCompleted.toLocaleString()}
                  </div>
                  <Caption className="text-charcoal/75 mt-1">
                    Cleans completed
                  </Caption>
                </div>
                <div>
                  <div className="font-display text-[32px] sm:text-[36px] font-bold text-charcoal tracking-tight tabular-nums">
                    {city.suburbs.length}
                  </div>
                  <Caption className="text-charcoal/75 mt-1">Suburbs covered</Caption>
                </div>
                <div>
                  <div className="font-display text-[32px] sm:text-[36px] font-bold text-charcoal tracking-tight tabular-nums">
                    ${city.benchmarkPrice}
                  </div>
                  <Caption className="text-charcoal/75 mt-1">
                    3-br {city.bondTerm.toLowerCase()}
                  </Caption>
                </div>
                <div>
                  <div className="font-display text-[32px] sm:text-[36px] font-bold text-charcoal tracking-tight tabular-nums">
                    {cityTeam.length || 1}
                  </div>
                  <Caption className="text-charcoal/75 mt-1">
                    Named Ninjas on the {city.city} roster
                  </Caption>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  as={Link}
                  href={`/book?city=${city.slug}`}
                  variant="primary-light"
                  size="lg"
                >
                  Book in {city.city}
                </Button>
                <Button as={Link} href="/pricing" variant="secondary-light" size="lg">
                  See pricing
                </Button>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Suburb list */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <FadeUp>
            <div className="max-w-3xl mb-12">
              <Eyebrow tone="champagne">Suburbs we cover</Eyebrow>
              <Heading
                as="h2"
                variant="h2"
                className="mt-4 mb-4 tracking-tight text-charcoal"
              >
                Top {city.suburbs.length} {city.city} suburbs.
              </Heading>
              <Body variant="body" className="text-charcoal/75" measure>
                Each suburb has its own dedicated page with local pricing notes
                and the named Ninja assigned to that area. Tap any suburb to
                see who'll be cleaning your place.
              </Body>
            </div>
          </FadeUp>

          <Stagger gap={0.04} distance={10}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.suburbs.map((s) => (
                <Link
                  key={s}
                  href={`/service-areas/${city.slug}/${suburbSlug(s)}`}
                  className="group flex items-center justify-between border border-border bg-cream rounded-[4px] px-5 py-4 hover:border-olive transition-colors"
                >
                  <span className="font-display font-medium text-[17px] text-charcoal tracking-tight">
                    {city.bondTerm} {s}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-charcoal/40 group-hover:text-olive transition-colors" />
                </Link>
              ))}
            </div>
          </Stagger>
        </Container>
      </Section>

      {/* Local pricing snapshot */}
      <Section surface="cream" spacing="default" className="border-y border-border">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <FadeUp>
                <Stack gap="4">
                  <Eyebrow tone="champagne">{city.city} pricing</Eyebrow>
                  <Heading
                    as="h2"
                    variant="h2"
                    className="tracking-tight text-charcoal"
                  >
                    Local rates. <span className="text-olive italic">No phone runaround.</span>
                  </Heading>
                  <Body variant="body" className="text-charcoal/75">
                    {city.city} prices reflect local wages, insurance and
                    supplies. Every figure here is GST-included and is the price
                    on the booking. See the full pricing matrix for all
                    property sizes.
                  </Body>
                  <div className="pt-3">
                    <Button as={Link} href="/pricing" variant="primary-light">
                      See full pricing
                    </Button>
                  </div>
                </Stack>
              </FadeUp>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  label: 'Regular clean (2BR/1BA)',
                  price: regRow?.prices[city.slug] ?? 0,
                  note: 'Same cleaner, fortnightly',
                  href: '/services',
                },
                {
                  label: `${city.bondTerm} (3BR/2BA)`,
                  price: eolRow?.prices[city.slug] ?? city.benchmarkPrice,
                  note: '72-hour re-clean guarantee',
                  href: '/services/end-of-lease-cleaning',
                },
                {
                  label: 'Carpet steam',
                  price: 49,
                  note: 'Per room, hot-water extraction',
                  href: '/services/carpet-cleaning',
                },
                {
                  label: 'Upholstery (3-seater)',
                  price: 129,
                  note: 'Method matched to fabric',
                  href: '/services/upholstery-cleaning',
                },
              ].map((row) => (
                <Link
                  key={row.label}
                  href={row.href}
                  className="block border border-border bg-cream rounded-[4px] p-5 hover:border-olive transition-colors"
                >
                  <Caption className="text-charcoal/75 mb-1 font-body">
                    {row.label}
                  </Caption>
                  <div className="font-display text-[32px] font-bold tabular-nums text-charcoal tracking-tight">
                    ${row.price}
                  </div>
                  <p className="font-body text-[13px] text-charcoal/75 mt-1">
                    {row.note}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust signals */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Local accountability',
                body: `Every ${city.city} Ninja is on payroll, lives in the metro, and is nationally police-checked. Trained on REI${city.state === 'QLD' ? 'Q' : city.state === 'NSW' ? 'NSW' : city.state === 'VIC' ? 'V' : city.state === 'WA' ? 'WA' : 'SA'} compliant exit standards.`,
              },
              {
                icon: Clock,
                title: 'On-time guarantee',
                body: `Booking window of 60 minutes. If we're late we cover the first $30 of the clean. Same-day SMS confirmation.`,
              },
              {
                icon: MapPin,
                title: `Real ${city.city} coverage`,
                body: `${city.suburbs.length} suburbs at last count. No "minimum job" surcharge — same rate at $${regRow?.prices[city.slug]} whether you're in ${city.suburbs[0]} or ${city.suburbs[city.suburbs.length - 1]}.`,
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="border border-border bg-cream rounded-[4px] p-6"
                >
                  <Icon className="h-7 w-7 text-olive mb-4" />
                  <h3 className="font-display font-semibold text-[19px] text-charcoal tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-[14.5px] text-charcoal/80 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* City Ninjas */}
      {cityTeam.length > 0 ? (
        <Section surface="cream" spacing="default" className="border-y border-border">
          <Container width="wide">
            <FadeUp>
              <div className="max-w-3xl mb-12">
                <Eyebrow tone="champagne">{city.city} Ninjas</Eyebrow>
                <Heading
                  as="h2"
                  variant="h2"
                  className="mt-4 tracking-tight text-charcoal"
                >
                  Your local team.
                </Heading>
              </div>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityTeam.map((m) => (
                <div
                  key={m.id}
                  className="border border-border bg-cream rounded-[4px] overflow-hidden"
                >
                  <div className="relative aspect-[4/3] bg-charcoal">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <Caption className="font-body text-charcoal/75">{m.role}</Caption>
                    <h3 className="font-display font-semibold text-[19px] text-charcoal tracking-tight mt-1">
                      {m.name}
                    </h3>
                    <p className="font-body text-[13.5px] text-charcoal/75 mt-2 leading-snug">
                      {m.specialty}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Local reviews */}
      {cityReviews.length > 0 ? (
        <Section surface="surface-muted" spacing="default">
          <Container width="wide">
            <FadeUp>
              <div className="max-w-3xl mb-12">
                <Eyebrow tone="champagne">{city.city} reviews</Eyebrow>
                <Heading
                  as="h2"
                  variant="h2"
                  className="mt-4 tracking-tight text-charcoal"
                >
                  Real {city.city} customers.{' '}
                  <span className="text-olive italic">Real outcomes.</span>
                </Heading>
              </div>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityReviews.map((r) => (
                <div
                  key={r.id}
                  className="border border-border bg-cream rounded-[4px] p-6"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-olive text-olive" />
                    ))}
                  </div>
                  <blockquote className="font-body text-[15px] text-charcoal/85 leading-relaxed mb-4">
                    "{r.body}"
                  </blockquote>
                  <div className="border-t border-border pt-3">
                    <p className="font-display font-semibold text-[14px] text-charcoal">
                      {r.customerFirstName} — {r.suburb}
                    </p>
                    <Caption className="font-body text-charcoal/75 mt-0.5">
                      {r.service} · cleaned by {r.cleanerName}
                    </Caption>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* CTA */}
      <Section surface="charcoal" spacing="default">
        <Container width="narrow">
          <FadeUp>
            <div className="text-center">
              <Stack gap="6" align="center">
                <Eyebrow tone="bone">Book in {city.city}</Eyebrow>
                <Heading
                  as="h2"
                  variant="display-l"
                  className="tracking-tight leading-none text-cream !text-[32px] sm:!text-[44px] lg:!text-[52px]"
                >
                  Pick a date.{' '}
                  <span className="text-olive-soft italic">Pick your Ninja.</span>
                </Heading>
                <Body variant="body-l" className="text-cream/70 max-w-2xl">
                  90 seconds, SMS confirmation, no quote runaround.
                </Body>
                <div className="pt-4">
                  <Button
                    as={Link}
                    href={`/book?city=${city.slug}`}
                    variant="primary-dark"
                    size="lg"
                  >
                    Book my {city.city} clean
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
