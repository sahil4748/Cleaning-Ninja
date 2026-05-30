import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { DollarSign, ShieldCheck, GraduationCap, Users } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Caption from '@/components/ui/Caption'
import { FadeUp } from '@/components/motion/FadeUp'
import { Stagger } from '@/components/motion/Stagger'
import { JsonLd } from '@/components/seo/JsonLd'
import { TEAM } from '@/content/team'
import { breadcrumbSchema } from '@/lib/schema'
import { ApplicationForm } from './ApplicationForm'

export const metadata: Metadata = {
  title: 'Become a Cleaning Ninja — Cleaner Jobs Australia',
  description:
    "We're hiring cleaners across Sydney, Melbourne, Brisbane, Perth, Adelaide and the Gold Coast. Above-award pay, full insurance, paid training, no subcontractor contracts.",
  keywords: [
    'cleaner jobs australia',
    'cleaning jobs sydney',
    'cleaning jobs melbourne',
    'professional cleaner career',
    'cleaning ninja careers',
  ],
  alternates: { canonical: '/careers' },
}

const PILLARS = [
  {
    icon: DollarSign,
    title: 'Above-award pay',
    body: '$38-$48/hour for senior cleaners. Penalty rates honoured. Paid weekly. No piece rates.',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance + super',
    body: 'Workers compensation, $20M public liability, and 11.5% super on every hour worked.',
  },
  {
    icon: GraduationCap,
    title: 'Paid training',
    body: 'Two-week onboarding paid at full rate. Specialty courses (fabric care, fibre science) all paid.',
  },
  {
    icon: Users,
    title: 'Real team',
    body: 'You join a roster, not a piecework pool. Annual leave, sick leave, and a roster you can plan around.',
  },
]

export default function CareersPage() {
  const testimonials = TEAM.slice(0, 3)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Careers', href: '/careers' },
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <FadeUp>
                <div className="flex items-center gap-3 mb-6">
                  <Link
                    href="/"
                    className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal/50 hover:text-olive transition-colors"
                  >
                    Home
                  </Link>
                  <span className="font-body text-[12px] text-charcoal/30">/</span>
                  <span className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-olive">
                    Careers
                  </span>
                </div>
                <Eyebrow tone="champagne" withRule>
                  Become a Ninja
                </Eyebrow>
                <Heading
                  as="h1"
                  variant="display-l"
                  className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[44px] sm:!text-[56px] lg:!text-[68px]"
                >
                  Cleaning work, <span className="text-olive italic">on your terms.</span>
                </Heading>
                <Body
                  variant="body-l"
                  className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                  measure
                >
                  Above-award pay. Full insurance and super on every hour. Paid
                  training. A roster you can plan around. No subcontractor
                  contracts, no piece rates, no surprises. We hire only employees,
                  and we hire from the suburb you live in.
                </Body>
              </FadeUp>
            </div>
            <div className="lg:col-span-5">
              <FadeUp delay={0.15}>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal border border-border-dark shadow-xl rounded-[4px]">
                  <Image
                    src="https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg"
                    alt="Cleaning Ninja team member at work"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      {/* Pay/benefits/training pillars */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <FadeUp>
            <div className="max-w-3xl mb-12">
              <Eyebrow tone="champagne">Why work here</Eyebrow>
              <Heading
                as="h2"
                variant="h2"
                className="mt-4 mb-4 tracking-tight text-charcoal"
              >
                Four things <span className="text-olive italic">we promise on the contract.</span>
              </Heading>
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
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-[2px] bg-olive-pale">
                      <Icon className="h-6 w-6 text-olive-deep" />
                    </div>
                    <h3 className="font-display font-semibold text-[22px] text-charcoal tracking-tight">
                      {p.title}
                    </h3>
                    <p className="font-body text-[15px] text-charcoal/72 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </Stagger>
        </Container>
      </Section>

      {/* Team testimonials */}
      <Section surface="cream" spacing="default" className="border-y border-border">
        <Container width="wide">
          <FadeUp>
            <div className="max-w-3xl mb-12">
              <Eyebrow tone="champagne">From the roster</Eyebrow>
              <Heading
                as="h2"
                variant="h2"
                className="mt-4 tracking-tight text-charcoal"
              >
                What current Ninjas <span className="text-olive italic">say about the work.</span>
              </Heading>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="border border-border bg-cream rounded-[4px] p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-charcoal-soft">
                    <Image
                      src={t.photo}
                      alt={t.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-[15px] text-charcoal tracking-tight">
                      {t.name}
                    </p>
                    <Caption className="font-body text-charcoal/55">
                      {t.role} · {t.yearsWithUs}y
                    </Caption>
                  </div>
                </div>
                <blockquote className="font-display italic text-[16px] leading-snug text-charcoal/85">
                  "{t.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Application form */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <FadeUp>
                <Stack gap="4">
                  <Eyebrow tone="champagne">Apply</Eyebrow>
                  <Heading
                    as="h2"
                    variant="h2"
                    className="tracking-tight text-charcoal"
                  >
                    Tell us about you.
                  </Heading>
                  <Body variant="body" className="text-charcoal/70">
                    Six fields, ninety seconds. We respond within two business
                    days. If your application progresses we'll arrange a paid
                    trial clean.
                  </Body>
                </Stack>
              </FadeUp>
            </div>
            <div className="lg:col-span-8">
              <FadeUp delay={0.1}>
                <ApplicationForm />
              </FadeUp>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
