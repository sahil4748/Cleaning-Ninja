import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, CheckCircle, MapPin, Star } from 'lucide-react'
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
import { COVERAGE, findSuburb, suburbSlug } from '@/content/coverage'
import { TEAM } from '@/content/team'
import { REVIEWS } from '@/content/reviews'
import { REGULAR_CLEAN_MATRIX, END_OF_LEASE_MATRIX } from '@/content/pricing'
import { breadcrumbSchema, localBusinessSchema } from '@/lib/schema'

export async function generateStaticParams() {
  return COVERAGE.flatMap((city) =>
    city.suburbs.map((s) => ({ city: city.slug, suburb: suburbSlug(s) })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; suburb: string }>
}): Promise<Metadata> {
  const { city: citySlug, suburb: suburbInput } = await params
  const found = findSuburb(citySlug, suburbInput)
  if (!found) return { title: 'Suburb not found' }
  const { city, suburb } = found

  return {
    title: `${city.bondTerm} ${suburb} — Cleaning Ninja ${city.city}`,
    description: `Professional ${city.bondTerm.toLowerCase()} and house cleaning in ${suburb}, ${city.city}. Named local cleaners, bond-back guarantee, flat-rate pricing. From $${REGULAR_CLEAN_MATRIX[0].prices[city.slug]}.`,
    keywords: [
      `${city.bondTerm.toLowerCase()} ${suburb.toLowerCase()}`,
      `house cleaning ${suburb.toLowerCase()}`,
      `cleaners ${suburb.toLowerCase()}`,
      `${suburb.toLowerCase()} cleaning service`,
      `${city.city.toLowerCase()} cleaners`,
    ],
    alternates: { canonical: `/service-areas/${city.slug}/${suburbInput}` },
  }
}

export default async function SuburbPage({
  params,
}: {
  params: Promise<{ city: string; suburb: string }>
}) {
  const { city: citySlug, suburb: suburbInput } = await params
  const found = findSuburb(citySlug, suburbInput)
  if (!found) notFound()
  const { city, suburb } = found

  // Deterministic cleaner picking by suburb hash (so each suburb has a stable named Ninja).
  const cityTeam = TEAM.filter(
    (t) => t.city === city.city || t.cityCovered.some((s) => suburb.includes(s)),
  )
  const teamRoster = cityTeam.length > 0 ? cityTeam : TEAM.filter((t) => t.city === city.city || t.cityCovered.includes('Nationwide oversight'))
  const namedNinja =
    teamRoster[suburb.length % Math.max(teamRoster.length, 1)] ?? TEAM[0]

  const cityReviews = REVIEWS.filter((r) => r.city === city.city).slice(0, 2)
  const regRow = REGULAR_CLEAN_MATRIX.find((r) => r.size === '2br1ba')
  const eolRow = END_OF_LEASE_MATRIX.find((r) => r.size === '3br2ba')

  const otherSuburbs = city.suburbs.filter((s) => s !== suburb).slice(0, 8)

  const localBusiness = localBusinessSchema(city.slug)

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Areas', href: '/service-areas' },
            { name: city.city, href: `/service-areas/${city.slug}` },
            { name: suburb, href: `/service-areas/${city.slug}/${suburbInput}` },
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
                <Link
                  href={`/service-areas/${city.slug}`}
                  className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal/50 hover:text-olive transition-colors"
                >
                  {city.city}
                </Link>
                <span className="font-body text-[12px] text-charcoal/30">/</span>
                <span className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-olive">
                  {suburb}
                </span>
              </div>
              <Eyebrow tone="champagne" withRule>
                {city.city} · {city.state}
              </Eyebrow>
              <Heading
                as="h1"
                variant="display-l"
                className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[40px] sm:!text-[52px] lg:!text-[60px]"
              >
                Cleaning Ninja {suburb}.
              </Heading>
              <Body
                variant="body-l"
                className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                measure
              >
                Local cleaners, flat-rate pricing, and a 72-hour bond-back guarantee — for every {suburb} address. Whether you're in a terrace off the main strip, an apartment near the station, or a family home further out, we send a named Ninja from the {city.city} roster who already knows the suburb.
              </Body>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  as={Link}
                  href={`/book?city=${city.slug}&suburb=${suburbInput}`}
                  variant="primary-light"
                  size="lg"
                >
                  Book in {suburb}
                </Button>
                <Button
                  as={Link}
                  href={`/service-areas/${city.slug}`}
                  variant="secondary-light"
                  size="lg"
                >
                  All {city.city} suburbs
                </Button>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Long-form copy */}
      <Section surface="cream" spacing="default" className="border-b border-border">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-6">
              <FadeUp>
                <Eyebrow tone="champagne">About {suburb}</Eyebrow>
                <Heading
                  as="h2"
                  variant="h2"
                  className="mt-3 mb-6 tracking-tight text-charcoal"
                >
                  How we work in {suburb}.
                </Heading>
              </FadeUp>

              <Body variant="body-l" className="text-charcoal/80" measure>
                {suburb} sits inside {city.city}'s broader rental and residential
                market, and the cleans we run here look different from the inner-CBD
                jobs. Apartments tend to be smaller-footprint with tighter
                inspection standards, family homes carry more carpet and tile
                surface area, and short-stay properties demand same-day
                turnarounds with linen changes. We assign each booking to a
                Ninja with the specialty that matches — never a one-size cleaner
                for every job.
              </Body>

              <Body variant="body-l" className="text-charcoal/80" measure>
                For end-of-lease and bond cleans in {suburb}, our team works to
                the RE
                {city.state === 'QLD' ? 'IQ' : city.state === 'NSW' ? 'INSW' : city.state === 'VIC' ? 'IV' : city.state === 'WA' ? 'IWA' : 'ISA'}{' '}
                checklist — the same one the property manager will be inspecting
                against. We document every room with date-stamped photos and
                stake the bond-back guarantee on it. If your PM flags anything
                on the final inspection, we return within 72 hours and re-clean
                whatever was missed. No charge, no negotiation.
              </Body>

              <Body variant="body-l" className="text-charcoal/80" measure>
                For regular cleans in {suburb}, you get the same Ninja each
                visit. They learn your home — where the kettle goes, which dog
                hates the vacuum, which mat is hand-wash only — and the work
                gets noticeably better month-on-month. Bookings are fortnightly,
                weekly, or four-weekly; pause whenever you need without a fee.
              </Body>

              <Body variant="body-l" className="text-charcoal/80" measure>
                Specialty work — carpet steam extraction, leather conditioning,
                tile and grout deep-cleans, upholstery method-matched to the
                fabric code — is booked through the same channel and runs on the
                same flat-rate pricing. No "starts from" trickery on this site;
                what you see is what you pay.
              </Body>

              <Heading as="h3" variant="h3" className="mt-12 mb-4 text-charcoal">
                What you get with every {suburb} booking
              </Heading>

              <ul className="space-y-3">
                {[
                  `A named, police-checked ${city.city} Ninja — same one every visit for regular bookings`,
                  '$20M public liability cover through Allianz Australia',
                  'Eco-certified products (Koh, Ecologic, Murchison-Hume) — no caustic chemistry indoors',
                  'Photo documentation on bond cleans, sent within an hour of finishing',
                  '72-hour re-clean guarantee on end-of-lease work',
                  'GST included on every price — no surprise additions',
                  'SMS confirmation 24 hours before the booking and arrival ETA on the day',
                  'Pause or cancel any regular booking 24+ hours ahead with no fee',
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 font-body text-[15px] text-charcoal/85"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-olive" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <div className="border border-border bg-surface-muted rounded-[4px] p-6">
                <Caption className="font-body text-charcoal/75 uppercase tracking-widest">
                  {suburb} prices
                </Caption>
                <ul className="mt-4 divide-y divide-border">
                  <li className="flex items-baseline justify-between py-3">
                    <span className="font-body text-[14px] text-charcoal/85">
                      Regular (2BR/1BA)
                    </span>
                    <span className="font-display font-bold text-[18px] text-charcoal tabular-nums">
                      ${regRow?.prices[city.slug]}
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between py-3">
                    <span className="font-body text-[14px] text-charcoal/85">
                      {city.bondTerm} (3BR)
                    </span>
                    <span className="font-display font-bold text-[18px] text-charcoal tabular-nums">
                      ${eolRow?.prices[city.slug]}
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between py-3">
                    <span className="font-body text-[14px] text-charcoal/85">
                      Carpet steam (per room)
                    </span>
                    <span className="font-display font-bold text-[18px] text-charcoal tabular-nums">
                      $49
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between py-3">
                    <span className="font-body text-[14px] text-charcoal/85">
                      3-seater upholstery
                    </span>
                    <span className="font-display font-bold text-[18px] text-charcoal tabular-nums">
                      $129
                    </span>
                  </li>
                </ul>
                <Button
                  as={Link}
                  href={`/book?city=${city.slug}&suburb=${suburbInput}`}
                  variant="primary-light"
                  className="w-full mt-5"
                >
                  Book {suburb} clean
                </Button>
              </div>

              {namedNinja ? (
                <div className="border border-border bg-cream rounded-[4px] p-6">
                  <Caption className="font-body text-charcoal/75 uppercase tracking-widest mb-2">
                    Your {suburb} Ninja
                  </Caption>
                  <h3 className="font-display font-semibold text-[20px] text-charcoal tracking-tight">
                    {namedNinja.name}
                  </h3>
                  <p className="font-body text-[13px] text-charcoal/75 mt-1">
                    {namedNinja.role} · {namedNinja.yearsWithUs} years
                  </p>
                  <blockquote className="mt-4 font-display italic text-[14px] text-charcoal/80 leading-snug border-l-2 border-olive pl-3">
                    "{namedNinja.quote}"
                  </blockquote>
                  <Link
                    href="/team"
                    className="mt-4 inline-flex items-center gap-1 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-charcoal hover:text-olive transition-colors"
                  >
                    See the {city.city} roster
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : null}

              <div className="border border-border bg-cream rounded-[4px] p-6">
                <Caption className="font-body text-charcoal/75 uppercase tracking-widest mb-2">
                  Nearby suburbs
                </Caption>
                <ul className="mt-3 space-y-2 font-body text-[14px]">
                  {otherSuburbs.map((s) => (
                    <li key={s}>
                      <Link
                        href={`/service-areas/${city.slug}/${suburbSlug(s)}`}
                        className="text-charcoal/80 hover:text-olive transition-colors inline-flex items-center gap-1.5"
                      >
                        <MapPin className="h-3.5 w-3.5 text-olive" />
                        {city.bondTerm} {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Local reviews */}
      {cityReviews.length > 0 ? (
        <Section surface="surface-muted" spacing="default">
          <Container width="wide">
            <FadeUp>
              <div className="max-w-3xl mb-10">
                <Eyebrow tone="champagne">Reviews from {city.city}</Eyebrow>
                <Heading
                  as="h2"
                  variant="h2"
                  className="mt-4 tracking-tight text-charcoal"
                >
                  Real {city.city} customers.{' '}
                  <span className="text-olive italic">
                    Real outcomes near {suburb}.
                  </span>
                </Heading>
              </div>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Eyebrow tone="bone">Book {suburb}</Eyebrow>
                <Heading
                  as="h2"
                  variant="display-l"
                  className="tracking-tight leading-none text-cream !text-[32px] sm:!text-[44px] lg:!text-[52px]"
                >
                  Your {suburb} clean,{' '}
                  <span className="text-olive-soft italic">priced upfront.</span>
                </Heading>
                <Body variant="body-l" className="text-cream/70 max-w-2xl">
                  Pick a date, pick a Ninja, done. No call-back queue, no quote
                  runaround.
                </Body>
                <div className="pt-4">
                  <Button
                    as={Link}
                    href={`/book?city=${city.slug}&suburb=${suburbInput}`}
                    variant="primary-dark"
                    size="lg"
                  >
                    Book my {suburb} clean
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
