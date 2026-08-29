import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, FileText, Clock, MapPin } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Caption from '@/components/ui/Caption'
import { FadeUp } from '@/components/motion/FadeUp'
import { JsonLd } from '@/components/seo/JsonLd'
import { BUSINESS } from '@/content/navigation'
import { COVERAGE } from '@/content/coverage'
import { breadcrumbSchema } from '@/lib/schema'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Cleaning Ninja — Phone, Email, City Offices',
  description: `Speak to the Cleaning Ninja team. ${BUSINESS.phone}, ${BUSINESS.email}, ABN ${BUSINESS.abn}.`,
  alternates: { canonical: '/contact' },
}

const CITY_HOURS = [
  { city: 'Sydney', hours: 'Service enquiries', phone: '02 8000 0001' },
  { city: 'Melbourne', hours: 'Service enquiries', phone: '03 9000 0002' },
  { city: 'Brisbane', hours: 'Service enquiries', phone: '07 3000 0003' },
  { city: 'Perth', hours: 'Service enquiries', phone: '08 6000 0004' },
  { city: 'Adelaide', hours: 'Service enquiries', phone: '08 7000 0005' },
  { city: 'Gold Coast', hours: 'Service enquiries', phone: '07 5000 0006' },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
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
                  Contact
                </span>
              </div>
              <Eyebrow tone="champagne" withRule>
                Contact
              </Eyebrow>
              <Heading
                as="h1"
                variant="display-l"
                className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[44px] sm:!text-[56px] lg:!text-[68px]"
              >
                A real team. <span className="text-olive italic">On a real phone.</span>
              </Heading>
              <Body
                variant="body-l"
                className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                measure
              >
                You can request a quote through the website or contact the team
                by phone or email. Include your suburb, property size, and the
                service you need so we can respond clearly.
              </Body>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Contact tiles */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Phone,
                label: 'Phone',
                value: BUSINESS.phone,
                href: `tel:${BUSINESS.phoneRaw}`,
                note: 'Main contact number',
              },
              {
                icon: Mail,
                label: 'Email',
                value: BUSINESS.email,
                href: `mailto:${BUSINESS.email}`,
                note: 'For quote and service enquiries',
              },
              {
                icon: FileText,
                label: 'ABN',
                value: BUSINESS.abn,
                href: `https://abr.business.gov.au/ABN/View?id=${BUSINESS.abn.replace(/\s/g, '')}`,
                note: 'Verified on the ABR',
              },
              {
                icon: Clock,
                label: 'Response time',
                value: 'Enquiry received',
                href: '/contact',
                note: 'Use /book for quote requests',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group block border border-border bg-cream rounded-[4px] p-6 hover:border-olive transition-colors"
                >
                  <Icon className="h-7 w-7 text-olive mb-4" />
                  <Caption className="font-body text-charcoal/75 uppercase tracking-widest mb-1">
                    {item.label}
                  </Caption>
                  <p className="font-display font-semibold text-[18px] text-charcoal tracking-tight break-words">
                    {item.value}
                  </p>
                  <p className="font-body text-[13px] text-charcoal/75 mt-2">
                    {item.note}
                  </p>
                </a>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Form + city hours */}
      <Section surface="cream" spacing="default" className="border-y border-border">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <FadeUp>
                <Stack gap="4" className="mb-8">
                  <Eyebrow tone="champagne">Send an enquiry</Eyebrow>
                  <Heading as="h2" variant="h2" className="tracking-tight text-charcoal">
                    Six fields. <span className="text-olive italic">Ninety seconds.</span>
                  </Heading>
                  <Body variant="body" className="text-charcoal/75">
                    If you're after a booking, the booking flow is faster — but for
                    everything else (NDIS, commercial, complaints, custom scopes),
                    this is the path.
                  </Body>
                </Stack>
              </FadeUp>
              <ContactForm />
            </div>

            <div className="lg:col-span-5">
              <FadeUp delay={0.15}>
                <Stack gap="4" className="mb-6">
                  <Eyebrow tone="champagne">By city</Eyebrow>
                  <Heading as="h2" variant="h2" className="tracking-tight text-charcoal">
                    City contacts.
                  </Heading>
                </Stack>
                <ul className="divide-y divide-border border border-border rounded-[4px] bg-cream">
                  {CITY_HOURS.map((c) => (
                    <li key={c.city} className="flex items-start justify-between gap-4 p-5">
                      <div>
                        <p className="font-display font-semibold text-[17px] text-charcoal tracking-tight inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-olive" />
                          {c.city}
                        </p>
                        <Caption className="font-body text-charcoal/75 mt-1 ml-6">
                          {c.hours}
                        </Caption>
                      </div>
                      <a
                        href={`tel:${c.phone.replace(/\s/g, '')}`}
                        className="font-body text-[13px] font-semibold text-charcoal hover:text-olive transition-colors tabular-nums"
                      >
                        {c.phone}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[13px] font-body text-charcoal/75 leading-relaxed">
                  These city numbers are currently listed as contact placeholders
                  and should be verified before launch. Use the main 1300 number
                  or email for customer enquiries.
                </p>
              </FadeUp>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
