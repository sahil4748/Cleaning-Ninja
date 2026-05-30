import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, Users, MapPin, FileCheck } from 'lucide-react'
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
import { BUSINESS } from '@/content/navigation'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'About Cleaning Ninja — Named Cleaners, Six Cities, One Standard',
  description:
    'Cleaning Ninja is a national residential cleaning service founded on a simple promise: every Ninja has a name, a face, and lives in the city they service. No subcontractors, no roving vans, no surprise charges.',
  keywords: [
    'about cleaning ninja',
    'australian cleaning company',
    'national cleaning service',
    'ndis cleaning provider',
    'police checked cleaners',
  ],
  alternates: { canonical: '/about' },
}

const PILLARS = [
  {
    icon: Users,
    title: 'Named, not anonymous',
    body: "Every cleaner in our roster has a name, a face, a suburb, and years of service. You see who's coming to your home before they arrive — and you can request them again.",
  },
  {
    icon: ShieldCheck,
    title: 'Fully insured',
    body: `${BUSINESS.publicLiability} Public Liability through ${BUSINESS.insurer}. Workers compensation in every state we operate. Certificate of currency available on /legal/insurance.`,
  },
  {
    icon: MapPin,
    title: 'Locally embedded',
    body: 'Every Ninja lives in the city they service. No depots, no convoys, no 90-minute travel charges. Local teams, local accountability.',
  },
  {
    icon: FileCheck,
    title: 'Transparent pricing',
    body: 'Every price on this site is a real booking price. Quote shown is the quote you pay. If scope changes on arrival, we ring first and you decide.',
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream py-20 lg:py-28 border-b border-border">
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
                  About
                </span>
              </div>
              <Eyebrow tone="champagne" withRule>
                About us
              </Eyebrow>
              <Heading
                as="h1"
                variant="display-l"
                className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[44px] sm:!text-[56px] lg:!text-[68px]"
              >
                Spotless. On time. <span className="text-olive italic">Bond back.</span>
              </Heading>
              <Body
                variant="body-l"
                className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                measure
              >
                Cleaning Ninja was founded on the idea that residential cleaning
                in Australia should not feel like a guessing game. You shouldn't
                need to ring three companies for three different quotes, get a
                fourth on arrival, or never know who's actually showing up at
                your door. We named every Ninja. We published every price. We
                operate in six cities and we send the same standard to all of them.
              </Body>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Story */}
      <Section surface="cream" spacing="default" className="border-b border-border">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <FadeUp>
                <Stack gap="4">
                  <Eyebrow tone="champagne">The story</Eyebrow>
                  <Heading
                    as="h2"
                    variant="h2"
                    className="tracking-tight text-charcoal"
                  >
                    Started in 2019. <span className="text-olive italic">From one bond clean.</span>
                  </Heading>
                </Stack>
              </FadeUp>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <Body variant="body-l" className="text-charcoal/75" measure>
                Saima Imtiyaz started Cleaning Ninja after losing $1,800 of her
                own bond to a property manager who flagged a smudge on a window
                track. The cleaner had insisted the job was finished. There were
                no photos, no checklist, no comeback. Saima decided to build the
                cleaning company she'd wanted to hire.
              </Body>
              <Body variant="body" className="text-charcoal/75" measure>
                Six years on, we run a roster of named, vetted, police-checked
                cleaners across Sydney, Melbourne, Brisbane, Perth, Adelaide and
                the Gold Coast. Every booking gets a photo report. Every end-of-lease
                clean carries a written 72-hour re-clean guarantee. Every price on
                the site is the price you pay. No subcontractors, no surprises.
              </Body>
              <Body variant="body" className="text-charcoal/75" measure>
                We are now an NDIS-registered provider (provider {BUSINESS.ndisProvider}),
                cover {BUSINESS.publicLiability} in public liability through{' '}
                {BUSINESS.insurer}, and have processed {BUSINESS.reviewCount.toLocaleString()}+
                verified reviews. Still a Saima-and-team operation. Still answering the phone.
              </Body>
            </div>
          </div>
        </Container>
      </Section>

      {/* Four pillars */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <FadeUp>
            <div className="max-w-3xl mb-12 lg:mb-16">
              <Eyebrow tone="champagne">Our standard</Eyebrow>
              <Heading
                as="h2"
                variant="h2"
                className="mt-4 mb-4 tracking-tight text-charcoal"
              >
                Four pillars. <span className="text-olive italic">No exceptions.</span>
              </Heading>
              <Body variant="body-l" className="text-charcoal/75" measure>
                Everything we do is checked against these four lines. If a job,
                a hire, or a process can't pass them, we don't run it.
              </Body>
            </div>
          </FadeUp>
          <Stagger gap={0.06} distance={14}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PILLARS.map((p) => {
                const Icon = p.icon
                return (
                  <div
                    key={p.title}
                    className="border border-border bg-cream rounded-[4px] p-6 sm:p-8 flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-[2px] bg-olive-pale">
                        <Icon className="h-6 w-6 text-olive-deep" />
                      </div>
                      <Caption className="text-charcoal/35 font-mono text-[11px] tracking-widest">
                        STANDARD
                      </Caption>
                    </div>
                    <h3 className="font-display font-semibold text-[24px] text-charcoal tracking-tight">
                      {p.title}
                    </h3>
                    <p className="font-body text-[15px] text-charcoal/80 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </Stagger>
        </Container>
      </Section>

      {/* Photo strip */}
      <Section surface="cream" spacing="default" className="border-y border-border">
        <Container width="wide">
          <FadeUp>
            <div className="max-w-3xl mb-12">
              <Eyebrow tone="champagne">The team in the field</Eyebrow>
              <Heading
                as="h2"
                variant="h2"
                className="mt-4 tracking-tight text-charcoal"
              >
                Real people. <span className="text-olive italic">Real work.</span>
              </Heading>
              <Body variant="body" className="text-charcoal/75 mt-4">
                A glimpse of the day-to-day — week 6 of the rebuild we replace these
                with our own shoot.
              </Body>
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg',
              'https://images.pexels.com/photos/4239147/pexels-photo-4239147.jpeg',
              'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg',
              'https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg',
              'https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg',
              'https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg',
              'https://images.pexels.com/photos/4239111/pexels-photo-4239111.jpeg',
              'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
            ].map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden bg-charcoal rounded-[4px]"
              >
                <Image
                  src={src}
                  alt="Cleaning Ninja team at work"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
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
                <Eyebrow tone="bone">Meet the team</Eyebrow>
                <Heading
                  as="h2"
                  variant="display-l"
                  className="tracking-tight leading-none text-cream !text-[32px] sm:!text-[44px] lg:!text-[52px]"
                >
                  Eight cities. Eight leads.
                  <span className="text-olive-soft italic"> Hundreds of Ninjas.</span>
                </Heading>
                <Body variant="body-l" className="text-cream/70 max-w-2xl">
                  Browse our named cleaner roster, then book the one in your suburb.
                </Body>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Button as={Link} href="/team" variant="primary-dark" size="lg">
                    Meet the team
                  </Button>
                  <Button as={Link} href="/book" variant="secondary-dark" size="lg">
                    Book a Ninja
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
