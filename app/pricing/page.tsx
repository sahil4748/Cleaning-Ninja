import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Button from '@/components/ui/Button'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { FadeUp } from '@/components/motion/FadeUp'
import { JsonLd } from '@/components/seo/JsonLd'
import { SERVICES } from '@/content/services'
import { FAQS } from '@/content/faq'
import {
  breadcrumbSchema,
  faqSchema,
  housekeepingServiceSchema,
} from '@/lib/schema'
import { PricingMatrices } from './PricingMatrices'

export const metadata: Metadata = {
  title: 'Transparent Cleaning Prices — Flat-Rate, No Surprises',
  description:
    'Every price on this page is a real booking price. No "starting from", no quote runaround. Regular cleans from $129, end-of-lease from $295, carpet from $49/room. Six cities, GST included.',
  keywords: [
    'cleaning prices australia',
    'house cleaning cost sydney',
    'bond clean price brisbane',
    'carpet cleaning prices',
    'flat rate cleaning',
    'cleaning quote',
  ],
  alternates: { canonical: '/pricing' },
}

const PRICING_FAQ = [
  {
    question: 'Is the price I see on this page the price I pay?',
    answer:
      'Yes. Every figure here is a real booking price, GST included. The only time pricing shifts is if the property scope changes on arrival (e.g. five-bedroom booked as a three-bedroom). We notify you before any change and you can decline.',
  },
  {
    question: 'Why is Sydney more expensive than Adelaide?',
    answer:
      'Pricing reflects local wages, public liability rates, and supplies cost. Sydney, Perth and the Gold Coast sit highest; Melbourne and Brisbane mid-range; Adelaide ~20% under Sydney. The work itself is the same — police-checked Ninjas, eco-only products, full insurance.',
  },
  {
    question: 'Can I get a custom quote?',
    answer:
      'For one-off jobs (large estates, hoarding-grade cleans, commercial) yes. Submit the booking form with the closest match and a note in the address field; our team rings back within one business day with a written scope.',
  },
  {
    question: 'Do you offer recurring discounts?',
    answer:
      'Weekly bookings 10% off the listed rate. Fortnightly 7%. Four-weekly 5%. Discount applies from the second visit onwards — no upfront commitment.',
  },
  {
    question: 'What if the clean is rejected on the bond inspection?',
    answer:
      'We re-clean whatever the property manager flagged, free, within 72 hours. Documented in our terms (see /legal/insurance for the certificate of currency and the bond-back terms PDF).',
  },
]

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Pricing', href: '/pricing' },
          ]),
          faqSchema(PRICING_FAQ),
          ...SERVICES.map((s) => housekeepingServiceSchema(s)),
        ]}
      />

      {/* Header */}
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
                  Pricing
                </span>
              </div>
              <Eyebrow tone="champagne" withRule>
                Transparent pricing
              </Eyebrow>
              <Heading
                as="h1"
                variant="display-l"
                className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[44px] sm:!text-[56px] lg:!text-[68px]"
              >
                Real prices. <span className="text-olive italic">No quote runaround.</span>
              </Heading>
              <Body
                variant="body-l"
                className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
              >
                Every figure on this page is a real booking price. Pick your
                service, see the rate in your city, book online in 90 seconds.
                Add-ons (oven, windows, sealing) priced separately and quoted
                upfront — never on arrival.
              </Body>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Pricing matrices */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <PricingMatrices />
        </Container>
      </Section>

      {/* Trust statement */}
      <Section surface="cream" spacing="default" className="border-y border-border">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'GST included',
                body: 'Every price displayed already includes 10% GST. No tax shock at checkout.',
              },
              {
                title: 'No travel charges',
                body: 'Your Ninja lives in the city they service. No "depot to suburb" surcharge.',
              },
              {
                title: 'No surprise add-ons',
                body: "If we hit something out of scope on arrival, we ring you before doing it. You decide.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border bg-cream rounded-[4px] p-6"
              >
                <h3 className="font-display font-semibold text-[20px] text-charcoal tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-[14.5px] text-charcoal/75 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <FadeUp>
                <Stack gap="4">
                  <Eyebrow tone="champagne">Pricing FAQ</Eyebrow>
                  <Heading
                    as="h2"
                    variant="h2"
                    className="tracking-tight text-charcoal"
                  >
                    Common questions. <span className="text-olive italic">Direct answers.</span>
                  </Heading>
                  <Body variant="body" className="text-charcoal/75">
                    Still uncertain? Ring the team on 1300 NINJAS or send
                    through your enquiry — we respond within one business
                    day.
                  </Body>
                </Stack>
              </FadeUp>
            </div>
            <div className="lg:col-span-8">
              <Accordion>
                {PRICING_FAQ.map((q, i) => (
                  <AccordionItem
                    key={i}
                    id={`pricing-q-${i}`}
                    question={q.question}
                  >
                    {q.answer}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
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
                <Eyebrow tone="bone">Book today</Eyebrow>
                <Heading
                  as="h2"
                  variant="display-l"
                  className="tracking-tight leading-none text-cream !text-[32px] sm:!text-[44px] lg:!text-[52px]"
                >
                  Same price online, <span className="text-olive-soft italic">no haggling.</span>
                </Heading>
                <Body variant="body-l" className="text-cream/70 max-w-2xl">
                  The figure you see is the figure you pay. Pick a date, pick a Ninja, done.
                </Body>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Button as={Link} href="/book" variant="primary-dark" size="lg">
                    Book my clean
                  </Button>
                  <Button as={Link} href="/services" variant="secondary-dark" size="lg">
                    Browse services
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
