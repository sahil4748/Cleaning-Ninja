import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Clock, MapPin, ShieldCheck } from 'lucide-react'
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
import { Service } from '@/content/services'
import { COVERAGE } from '@/content/coverage'
import { BUSINESS } from '@/content/navigation'
import { PriceRow } from '@/content/pricing'

/**
 * Shared service-detail layout.
 *
 * Each /services/[slug]/page.tsx imports this and supplies the matching service
 * + pricing matrix. Keeps per-page boilerplate light while letting each route
 * own its <Metadata> + JSON-LD.
 */
interface ServiceDetailProps {
  service: Service
  /** Optional pricing matrix for this service. Cities along columns, sizes down rows. */
  pricingMatrix?: PriceRow[]
  pricingMatrixLabel?: string
  /** Optional simple price list (carpet, upholstery, tile) — { label, price }. */
  simplePricing?: Array<{ label: string; price: number; unit?: string }>
  /** Index of this service in SERVICES — for the "Discipline 0X" stamp. */
  index?: number
}

export default function ServiceDetail({
  service,
  pricingMatrix,
  pricingMatrixLabel,
  simplePricing,
  index = 0,
}: ServiceDetailProps) {
  const indexStr = String(index + 1).padStart(2, '0')
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream py-16 lg:py-24 border-b border-border">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-border" />
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
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <FadeUp>
                <Stack gap="6">
                  <div className="flex items-center gap-3">
                    <Link
                      href="/"
                      className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal/50 hover:text-olive transition-colors"
                    >
                      Home
                    </Link>
                    <span className="font-body text-[12px] text-charcoal/30">/</span>
                    <Link
                      href="/services"
                      className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal/50 hover:text-olive transition-colors"
                    >
                      Services
                    </Link>
                    <span className="font-body text-[12px] text-charcoal/30">/</span>
                    <span className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-olive">
                      {service.name}
                    </span>
                  </div>

                  <Eyebrow tone="champagne" withRule>
                    Service · {indexStr}
                  </Eyebrow>

                  <Heading
                    as="h1"
                    variant="display-l"
                    className="tracking-tight leading-none text-charcoal !text-[40px] sm:!text-[52px] lg:!text-[64px]"
                  >
                    {service.name}
                  </Heading>

                  <p className="font-display italic text-olive text-[20px] sm:text-[24px] tracking-tight leading-snug">
                    “{service.tagline}”
                  </p>

                  <Body
                    variant="body-l"
                    className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                    measure
                  >
                    {service.description}
                  </Body>

                  <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-[14px] uppercase tracking-[0.14em] text-charcoal/75">
                        From
                      </span>
                      <span className="font-display text-[32px] font-bold text-charcoal tracking-tight">
                        ${service.fromPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-charcoal/75">
                      <Clock className="h-4 w-4" />
                      <span className="font-body text-[14px]">
                        {service.durationHours} hours typical
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.trustSignals.map((sig) => (
                      <span
                        key={sig}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-olive-pale text-olive-deep text-[12px] font-semibold tracking-wider uppercase font-body border border-olive/10"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-olive" />
                        {sig}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <Button
                      as={Link}
                      href={`/book?service=${service.slug}`}
                      variant="primary-light"
                      size="lg"
                    >
                      Book this clean
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                    <Button as={Link} href="/pricing" variant="secondary-light" size="lg">
                      See full pricing
                    </Button>
                  </div>
                </Stack>
              </FadeUp>
            </div>

            <div className="lg:col-span-5 relative">
              <FadeUp delay={0.15}>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal border border-border-dark shadow-xl rounded-[4px] group">
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-3 -right-3 h-full w-full bg-olive/85 transition-transform duration-500 group-hover:-bottom-4 group-hover:-right-4 rounded-[4px]"
                  />
                  <div className="absolute inset-0 bg-charcoal-soft animate-pulse rounded-[4px]" />
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 rounded-[4px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent rounded-[4px]" />
                  <div className="absolute top-4 left-4 z-10 backdrop-blur-sm bg-charcoal/40 px-3 py-1 rounded-[2px]">
                    <Caption className="text-cream/90 text-[11px] font-mono tracking-widest uppercase">
                      DISCIPLINE · {indexStr}
                    </Caption>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      {/* Inclusions */}
      <Section surface="cream" spacing="default" className="border-b border-border">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <FadeUp>
                <Stack gap="4">
                  <Eyebrow tone="champagne">What's included</Eyebrow>
                  <Heading
                    as="h2"
                    variant="h2"
                    className="tracking-tight text-charcoal"
                  >
                    Every booking. <span className="text-olive italic">No upsells.</span>
                  </Heading>
                  <Body variant="body-l" className="text-charcoal/75" measure>
                    A flat-rate {service.name.toLowerCase()} from Cleaning Ninja includes every line below. If we missed a spot, we come back free — that's the deal.
                  </Body>
                </Stack>
              </FadeUp>
            </div>
            <div className="lg:col-span-7">
              <Stagger gap={0.04} distance={10}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {service.inclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-b border-border pb-4 font-body text-[15px] leading-snug text-charcoal/85"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-olive" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Stagger>
            </div>
          </div>
        </Container>
      </Section>

      {/* How we do it */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <FadeUp>
            <div className="max-w-3xl mb-12 lg:mb-16">
              <Eyebrow tone="champagne">Method</Eyebrow>
              <Heading
                as="h2"
                variant="h2"
                className="mt-4 mb-6 tracking-tight text-charcoal"
              >
                How we do it. <span className="text-olive italic">Step by step.</span>
              </Heading>
              <Body variant="body-l" className="text-charcoal/80" measure>
                Every clean follows the same documented sequence. No shortcuts.
                Each step is signed off before we move to the next.
              </Body>
            </div>
          </FadeUp>

          <Stagger gap={0.06} distance={14}>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.steps.map((step, idx) => (
                <li
                  key={step}
                  className="bg-cream p-6 border border-border rounded-[4px] flex flex-col gap-4 h-full"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-olive text-cream font-display font-bold text-[14px]">
                      {idx + 1}
                    </span>
                    <Caption className="text-charcoal/40 font-mono text-[10px] tracking-widest">
                      STEP {String(idx + 1).padStart(2, '0')}
                    </Caption>
                  </div>
                  <h3 className="font-display font-medium text-[20px] text-charcoal leading-snug tracking-tight">
                    {step}
                  </h3>
                </li>
              ))}
            </ol>
          </Stagger>
        </Container>
      </Section>

      {/* Pricing */}
      {pricingMatrix && pricingMatrix.length > 0 ? (
        <Section surface="cream" spacing="default" className="border-y border-border">
          <Container width="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <FadeUp>
                  <Stack gap="4">
                    <Eyebrow tone="champagne">Pricing</Eyebrow>
                    <Heading
                      as="h2"
                      variant="h2"
                      className="tracking-tight text-charcoal"
                    >
                      {pricingMatrixLabel ?? 'Flat-rate by city.'}
                    </Heading>
                    <Body variant="body" className="text-charcoal/75">
                      Every figure on this site is a real booking price. No
                      "starting from" trick, no surprise additions on arrival.
                      Pricing varies by city — Melbourne, Brisbane and Adelaide
                      sit ~15-20% under Sydney.
                    </Body>
                    <div className="pt-3">
                      <Button
                        as={Link}
                        href={`/book?service=${service.slug}`}
                        variant="primary-light"
                      >
                        Get instant quote
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </Stack>
                </FadeUp>
              </div>
              <div className="lg:col-span-8">
                <FadeUp delay={0.12}>
                  <div className="overflow-x-auto rounded-[4px] border border-border bg-cream">
                    <table className="w-full text-left">
                      <thead className="bg-surface-muted text-charcoal/80 text-[12px] font-body uppercase tracking-[0.14em]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Property</th>
                          {COVERAGE.map((c) => (
                            <th
                              key={c.slug}
                              className="px-4 py-3 font-semibold text-right"
                            >
                              {c.city}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="font-body text-[14px] text-charcoal/85">
                        {pricingMatrix.map((row, ri) => (
                          <tr
                            key={row.size}
                            className={
                              ri % 2 === 0 ? 'bg-cream' : 'bg-surface-muted/40'
                            }
                          >
                            <td className="px-4 py-3 font-semibold text-charcoal">
                              {row.label}
                            </td>
                            {COVERAGE.map((c) => (
                              <td
                                key={c.slug}
                                className="px-4 py-3 text-right tabular-nums"
                              >
                                ${row.prices[c.slug]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Caption className="mt-3 text-charcoal/75 font-body">
                    Prices include GST. Cleans run by a named, police-checked
                    Ninja from your local team.
                  </Caption>
                </FadeUp>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {simplePricing && simplePricing.length > 0 ? (
        <Section surface="cream" spacing="default" className="border-y border-border">
          <Container width="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <FadeUp>
                  <Stack gap="4">
                    <Eyebrow tone="champagne">Pricing</Eyebrow>
                    <Heading
                      as="h2"
                      variant="h2"
                      className="tracking-tight text-charcoal"
                    >
                      {pricingMatrixLabel ?? 'Flat rates. No surprises.'}
                    </Heading>
                    <Body variant="body" className="text-charcoal/75">
                      Pricing is set by the unit (room, seater, square metre)
                      — same rate across all six cities. Add-ons (sealing,
                      stain treatment) priced separately and quoted upfront.
                    </Body>
                    <div className="pt-3">
                      <Button
                        as={Link}
                        href={`/book?service=${service.slug}`}
                        variant="primary-light"
                      >
                        Get instant quote
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </Stack>
                </FadeUp>
              </div>
              <div className="lg:col-span-8">
                <FadeUp delay={0.12}>
                  <ul className="divide-y divide-border border border-border rounded-[4px] bg-cream">
                    {simplePricing.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-baseline justify-between px-5 py-4"
                      >
                        <span className="font-display text-[16px] font-medium text-charcoal">
                          {row.label}
                        </span>
                        <span className="font-display text-[20px] font-bold tabular-nums text-charcoal">
                          ${row.price}
                          {row.unit ? (
                            <span className="font-body text-[13px] font-normal text-charcoal/75 ml-1">
                              {row.unit}
                            </span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </FadeUp>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Trust band */}
      <Section
        surface="charcoal"
        spacing="default"
        className="relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--color-cream) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <Container width="wide" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <FadeUp>
                <Stack gap="6">
                  <Eyebrow tone="bone">Standards</Eyebrow>
                  <Heading
                    as="h2"
                    variant="display-l"
                    className="tracking-tight leading-none text-cream !text-[36px] sm:!text-[44px] lg:!text-[52px]"
                  >
                    Considered care, <span className="text-olive-soft italic">honest pricing.</span>
                  </Heading>
                  <Body variant="body-l" className="text-cream/70">
                    Every {service.name.toLowerCase()} is performed by a named, police-checked Ninja from your local team. ABN-verified, ${BUSINESS.publicLiability} Public Liability cover, REIQ / REINSW / REIV trained.
                  </Body>
                </Stack>
              </FadeUp>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: ShieldCheck,
                    title: 'Bond-back guaranteed',
                    desc: "If your property manager flags anything on the inspection, we return within 72 hours and re-clean — no charge, no negotiation.",
                  },
                  {
                    icon: Clock,
                    title: 'Same-day quotes',
                    desc: 'Every figure on this site is a real booking price. No "starts from", no quote shopping.',
                  },
                  {
                    icon: MapPin,
                    title: 'Local Ninjas',
                    desc: 'Every cleaner lives in the city they service. No travel charges, no convoys from a depot 90 minutes away.',
                  },
                  {
                    icon: ShieldCheck,
                    title: `${BUSINESS.publicLiability} insured`,
                    desc: `${BUSINESS.publicLiability} Public Liability through ${BUSINESS.insurer}. Certificate of Currency downloadable on /legal/insurance.`,
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="bg-charcoal-soft p-6 border border-border-dark rounded-[4px]"
                    >
                      <Icon className="h-7 w-7 text-olive-soft mb-4" />
                      <h3 className="font-display font-medium text-[18px] text-cream mb-2 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="font-body text-[14px] text-cream/70 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Suburb-list footer for SEO */}
      <Section surface="surface-muted" spacing="default" className="border-t border-border">
        <Container width="wide">
          <FadeUp>
            <div className="max-w-3xl mb-10">
              <Eyebrow tone="champagne">Areas served</Eyebrow>
              <Heading
                as="h2"
                variant="h2"
                className="mt-4 tracking-tight text-charcoal"
              >
                {service.name} in your suburb.
              </Heading>
              <Body variant="body" className="text-charcoal/75 mt-3" measure>
                Local Ninjas, six metros, hundreds of suburbs. We list the most-booked below — but if your suburb isn't here, we still likely cover it. Just check the booking flow.
              </Body>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {COVERAGE.map((city) => (
              <div key={city.slug}>
                <div className="flex items-baseline justify-between border-b border-border pb-3 mb-4">
                  <h3 className="font-display font-semibold text-[18px] text-charcoal tracking-tight">
                    {city.city}
                  </h3>
                  <Link
                    href={`/service-areas/${city.slug}`}
                    className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-olive hover:text-olive-deep transition-colors"
                  >
                    See all →
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-body text-[14px] text-charcoal/75">
                  {city.suburbs.slice(0, 8).map((suburb) => (
                    <li key={suburb}>
                      <Link
                        href={`/service-areas/${city.slug}/${slugify(suburb)}`}
                        className="hover:text-olive transition-colors"
                      >
                        {service.name === 'End-of-Lease Clean'
                          ? `${city.bondTerm} ${suburb}`
                          : `${suburb}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section surface="cream" spacing="default" className="border-t border-border">
        <Container width="narrow">
          <FadeUp>
            <div className="text-center">
              <Stack gap="6" align="center">
                <Eyebrow tone="champagne">Next step</Eyebrow>
                <Heading
                  as="h2"
                  variant="display-l"
                  className="tracking-tight leading-none text-charcoal !text-[32px] sm:!text-[44px] lg:!text-[52px]"
                >
                  Book your {service.name.toLowerCase()}{' '}
                  <span className="text-olive italic">in 90 seconds.</span>
                </Heading>
                <Body
                  variant="body-l"
                  className="text-charcoal/80 max-w-2xl"
                  measure
                >
                  Pick a date, a property size, and a Ninja. We confirm by SMS,
                  show up on time, and document the clean with date-stamped
                  photos. From ${service.fromPrice}.
                </Body>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Button
                    as={Link}
                    href={`/book?service=${service.slug}`}
                    variant="primary-light"
                    size="lg"
                  >
                    Book now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button as={Link} href="/services" variant="secondary-light" size="lg">
                    Browse all services
                  </Button>
                </div>
              </Stack>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </div>
  )
}

/** Slugify a suburb name for URL routing. */
export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
