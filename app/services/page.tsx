import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, CheckCircle } from 'lucide-react'
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
import { SERVICES, AUXILIARY_SERVICES } from '@/content/services'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Cleaning Services Australia — Bond, Carpet, Upholstery, Tile, Leather',
  description:
    'Cleaning Ninja delivers five core cleaning disciplines across Sydney, Melbourne, Brisbane, Perth, Adelaide and the Gold Coast. End-of-lease, carpet steam, upholstery, tile & grout, leather care. Flat-rate, fully insured, bond-back guaranteed.',
  keywords: [
    'cleaning services australia',
    'house cleaning sydney',
    'carpet cleaning melbourne',
    'bond cleaning brisbane',
    'tile cleaning perth',
    'cleaning services adelaide',
    'cleaners gold coast',
  ],
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ])}
      />
      <div className="bg-cream">
        {/* Header */}
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
                    Services
                  </span>
                </div>
                <Eyebrow tone="champagne" withRule>
                  Disciplines
                </Eyebrow>
                <Heading
                  as="h1"
                  variant="display-l"
                  className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[44px] sm:!text-[56px] lg:!text-[68px]"
                >
                  Five disciplines. <span className="text-olive italic">One standard.</span>
                </Heading>
                <Body
                  variant="body-l"
                  className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                >
                  Every service we offer is treated as its own craft. Surface-specific
                  formulations, documented method, named cleaners — not a roving van
                  with one bottle of generic spray. Flat-rate, GST included, no surprise
                  charges on arrival.
                </Body>
                <div className="flex flex-wrap gap-4 pt-6">
                  <Button as={Link} href="/book" variant="primary-light" size="lg">
                    Book now
                  </Button>
                  <Button as={Link} href="/pricing" variant="secondary-light" size="lg">
                    See all pricing
                  </Button>
                </div>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* Grid of 5 Services */}
        <Section surface="surface-muted" spacing="default">
          <Container width="wide">
            <Stagger gap={0.08} distance={16}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES.map((s, idx) => (
                  <Link
                    key={s.slug}
                    href={s.href}
                    className="group flex h-full flex-col border border-border bg-cream hover:border-olive transition-all duration-300 rounded-[4px] overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
                      <div className="absolute inset-0 skeleton" />
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-charcoal/30 transition-opacity duration-300 group-hover:bg-charcoal/20" />
                      <div className="absolute right-4 top-4 z-10 backdrop-blur-sm bg-charcoal/30 px-2.5 py-1 rounded-[2px]">
                        <Caption className="text-cream text-[11px] font-mono tracking-widest uppercase">
                          DISCIPLINE 0{idx + 1}
                        </Caption>
                      </div>
                      <div className="absolute bottom-4 left-4 z-10 backdrop-blur-sm bg-charcoal/40 px-2.5 py-1 rounded-[2px]">
                        <Caption className="text-cream text-[11px] font-mono tracking-widest uppercase">
                          FROM ${s.fromPrice}
                        </Caption>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                      <Stack gap="2">
                        <Eyebrow tone="champagne">Service · 0{idx + 1}</Eyebrow>
                        <h2 className="font-display font-medium text-[24px] sm:text-[28px] tracking-tight leading-none text-charcoal group-hover:text-olive-deep transition-colors">
                          {s.name}
                        </h2>
                        <p className="font-display italic text-olive text-[15px] sm:text-[16px] tracking-tight">
                          {s.tagline}
                        </p>
                      </Stack>

                      <Body
                        variant="body"
                        className="text-charcoal/80 !text-[14.5px] leading-relaxed"
                      >
                        {s.description}
                      </Body>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {s.trustSignals.map((sig) => (
                          <span
                            key={sig}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-olive-pale text-olive-deep text-[11px] font-semibold uppercase tracking-wider font-body"
                          >
                            <CheckCircle className="h-3 w-3 text-olive" />
                            {sig}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-6 border-t border-border/60 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 font-body text-[13px] font-bold uppercase tracking-[0.14em] text-charcoal group-hover:text-olive transition-colors">
                          Explore method
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Stagger>
          </Container>
        </Section>

        {/* Auxiliary services */}
        <Section surface="cream" spacing="default" className="border-y border-border">
          <Container width="wide">
            <FadeUp>
              <div className="mb-12 max-w-3xl">
                <Eyebrow tone="champagne">Also available</Eyebrow>
                <Heading
                  as="h2"
                  variant="h2"
                  className="mt-4 tracking-tight text-charcoal"
                >
                  Auxiliary services. <span className="text-olive italic">Same standard.</span>
                </Heading>
                <Body variant="body" className="text-charcoal/80 mt-4" measure>
                  Not headline disciplines, but bookable any time through our team.
                </Body>
              </div>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {AUXILIARY_SERVICES.map((s) => (
                <div
                  key={s.slug}
                  className="border border-border rounded-[4px] p-5 hover:border-olive transition-colors"
                >
                  <Caption className="font-body text-[11px] uppercase tracking-[0.14em] text-charcoal/75 mb-2">
                    From ${s.fromPrice}
                  </Caption>
                  <h3 className="font-display font-semibold text-[18px] text-charcoal tracking-tight">
                    {s.name}
                  </h3>
                  <p className="font-body text-[13px] text-charcoal/75 mt-2 leading-snug">
                    {s.tagline}
                  </p>
                </div>
              ))}
            </div>
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
                  <Eyebrow tone="bone">Next step</Eyebrow>
                  <Heading
                    as="h2"
                    variant="display-l"
                    className="tracking-tight leading-none text-cream !text-[32px] sm:!text-[44px] lg:!text-[52px]"
                  >
                    One booking. <span className="text-olive-soft italic">Any discipline.</span>
                  </Heading>
                  <Body variant="body-l" className="text-cream/70 max-w-2xl">
                    Pick the service, the date, the suburb. We confirm by SMS and show up on
                    time with the right cleaner for the job. Six cities, hundreds of suburbs.
                  </Body>
                  <div className="pt-4">
                    <Button
                      as={Link}
                      href="/book"
                      variant="primary-dark"
                      size="lg"
                    >
                      Build my quote
                    </Button>
                  </div>
                </Stack>
              </div>
            </FadeUp>
          </Container>
        </Section>
      </div>
    </>
  )
}
