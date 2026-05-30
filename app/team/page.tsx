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
import { TEAM } from '@/content/team'
import { breadcrumbSchema } from '@/lib/schema'
import { TeamGrid } from './TeamGrid'

export const metadata: Metadata = {
  title: 'Meet the Cleaning Ninja Team — Named Cleaners, Six Cities',
  description:
    'Every Cleaning Ninja has a name, a face, and a suburb. Browse our roster of police-checked cleaners across Sydney, Melbourne, Brisbane, Perth, Adelaide and the Gold Coast.',
  keywords: [
    'cleaning ninja team',
    'professional cleaners australia',
    'house cleaners sydney',
    'cleaners melbourne',
  ],
  alternates: { canonical: '/team' },
}

export default function TeamPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Team', href: '/team' },
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
                  Team
                </span>
              </div>
              <Eyebrow tone="champagne" withRule>
                The Ninjas
              </Eyebrow>
              <Heading
                as="h1"
                variant="display-l"
                className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[44px] sm:!text-[56px] lg:!text-[68px]"
              >
                The people. <span className="text-olive italic">Not "the team".</span>
              </Heading>
              <Body
                variant="body-l"
                className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                measure
              >
                Every Ninja on this page has a name, a face, a suburb, and years
                of service. None of them are subcontractors. All of them are
                nationally police-checked. Most have a specialty — bond cleans,
                fabric care, NDIS — and most have a strong opinion about how to
                clean a wool rug. Pick one. Book them.
              </Body>
              <div className="mt-8 flex flex-wrap gap-8">
                {[
                  { label: 'Named cleaners', value: TEAM.length },
                  { label: 'Combined years', value: TEAM.reduce((a, b) => a + b.yearsWithUs, 0) },
                  { label: 'Languages spoken', value: new Set(TEAM.flatMap((t) => t.languages)).size },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-[36px] sm:text-[44px] font-bold text-charcoal tracking-tight tabular-nums">
                      {stat.value}+
                    </div>
                    <div className="font-body text-[12px] uppercase tracking-[0.14em] text-charcoal/55 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Grid */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <TeamGrid />
        </Container>
      </Section>

      {/* Recruitment CTA */}
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
                <Eyebrow tone="champagne">Become a Ninja</Eyebrow>
                <Heading
                  as="h2"
                  variant="display-l"
                  className="tracking-tight leading-none text-cream !text-[32px] sm:!text-[44px] lg:!text-[52px]"
                >
                  Could your name <span className="text-olive-soft italic">be on this page?</span>
                </Heading>
                <Body variant="body-l" className="text-cream/70 max-w-2xl">
                  We're hiring across all six cities. Above-award pay, full
                  insurance, paid training, and the work that you'd put your
                  name on. No subbie contracts.
                </Body>
                <div className="pt-4">
                  <Button as={Link} href="/careers" variant="primary-dark" size="lg">
                    See open roles
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
