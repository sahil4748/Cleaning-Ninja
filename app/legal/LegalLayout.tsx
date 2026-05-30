import Link from 'next/link'
import { ReactNode } from 'react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Caption from '@/components/ui/Caption'
import { FadeUp } from '@/components/motion/FadeUp'

/**
 * Shared layout for /legal/* pages. Centralises the breadcrumb + header so the
 * three policy pages stay visually consistent.
 */
export function LegalLayout({
  title,
  intro,
  updated,
  children,
  current,
}: {
  title: string
  intro: string
  updated: string
  current: 'privacy' | 'terms' | 'insurance'
  children: ReactNode
}) {
  const navItems = [
    { id: 'privacy' as const, label: 'Privacy', href: '/legal/privacy' },
    { id: 'terms' as const, label: 'Terms', href: '/legal/terms' },
    { id: 'insurance' as const, label: 'Insurance', href: '/legal/insurance' },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-cream py-16 lg:py-20 border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--color-charcoal) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <Container width="prose">
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <Link
                href="/"
                className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal/50 hover:text-olive transition-colors"
              >
                Home
              </Link>
              <span className="font-body text-[12px] text-charcoal/30">/</span>
              <span className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal/50">
                Legal
              </span>
              <span className="font-body text-[12px] text-charcoal/30">/</span>
              <span className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-olive">
                {title}
              </span>
            </div>
            <Eyebrow tone="champagne" withRule>
              Legal
            </Eyebrow>
            <Heading
              as="h1"
              variant="display-l"
              className="mt-4 mb-6 tracking-tight text-charcoal leading-tight !text-[36px] sm:!text-[44px] lg:!text-[52px]"
            >
              {title}
            </Heading>
            <Body variant="body-l" className="text-charcoal/75 leading-relaxed">
              {intro}
            </Body>
            <Caption className="mt-6 font-body text-charcoal/75">
              Last updated · {updated}
            </Caption>
          </FadeUp>
        </Container>
      </section>

      <Section surface="cream" spacing="default" className="border-b border-border">
        <Container width="prose">
          <div className="flex flex-wrap gap-2 mb-12 border-b border-border pb-4">
            {navItems.map((n) => (
              <Link
                key={n.id}
                href={n.href}
                className={`rounded-full border px-4 py-1.5 font-body text-[13px] font-semibold transition-colors ${
                  current === n.id
                    ? 'border-olive-deep bg-olive-deep text-cream'
                    : 'border-charcoal/20 bg-cream text-charcoal/75 hover:border-charcoal hover:text-charcoal'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </div>

          <article className="font-body text-[16px] leading-[1.75] text-charcoal/85 space-y-6 prose-headings:font-display prose-headings:tracking-tight prose-headings:text-charcoal">
            {children}
          </article>
        </Container>
      </Section>
    </>
  )
}
