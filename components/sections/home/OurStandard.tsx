'use client'

import { Users, Sparkles, Droplets, ShieldCheck } from 'lucide-react'
import dynamic from 'next/dynamic'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import { FadeUp } from '@/components/motion/FadeUp'
import { Stagger } from '@/components/motion/Stagger'
import { SplitText } from '@/components/motion/SplitText'

/**
 * GrimeToGleam canvas — lazily imported. Lives on the dark "Standards" section
 * and crossfades a grimy texture to a clean texture as the user scrolls.
 *
 * Lazy-loaded after LCP with a static placeholder image fallback.
 */
const GrimeToGleam = dynamic(() => import('./GrimeToGleam').then((m) => m.GrimeToGleam), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-deep to-charcoal opacity-50 animate-pulse" />
  ),
})

const TENETS = [
  {
    icon: Users,
    title: 'Same cleaner. Every clean.',
    body: 'Continuity beats novelty. We send your cleaner — not a different stranger every fortnight.',
  },
  {
    icon: Sparkles,
    title: 'Eco-certified products only.',
    body: 'Koh, Ecologic, Murchison-Hume, and our own pH-balanced formulations. No toxic surfactants, no mystery sprays.',
  },
  {
    icon: Droplets,
    title: '95% moisture extraction.',
    body: 'Truck-mounted Rotovac, calibrated weekly. Your carpet dries in 2–4 hours, not 2 days.',
  },
  {
    icon: ShieldCheck,
    title: 'Bond-back guarantee in writing.',
    body: 'If your property manager rejects the clean, we redo whatever was flagged within 72 hours. Free.',
  },
]

export default function OurStandard() {
  return (
    <Section surface="charcoal" spacing="default" aria-labelledby="standard-heading" className="relative overflow-hidden">
      <Container width="wide" className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Three.js scene */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] lg:col-span-6 lg:aspect-auto lg:min-h-[560px]">
            <GrimeToGleam />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-charcoal/40 via-transparent to-transparent" />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-cream backdrop-blur-md">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-olive-soft animate-pulse" />
              Scroll to clean
            </div>
          </div>

          <div className="lg:col-span-6">
            <FadeUp>
              <Stack gap="6">
                <Eyebrow tone="champagne" withRule>
                  The standard
                </Eyebrow>
                <Heading
                  as="h2"
                  id="standard-heading"
                  variant="display-xl"
                  tone="bone"
                  balance
                >
                  <SplitText>How we clean differently.</SplitText>
                </Heading>
                <Body variant="body-l" className="text-cream/72 max-w-[52ch]">
                  Four non-negotiables every cleaner on the team signs in writing. The work is the same whether it's a Brisbane terrace or a Surry Hills apartment — only the suburb changes.
                </Body>
              </Stack>
            </FadeUp>

            <Stagger gap={0.08} distance={14}>
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {TENETS.map((t) => {
                  const Icon = t.icon
                  return (
                    <div
                      key={t.title}
                      className="relative rounded-[8px] border border-[color:var(--color-border-dark)] bg-charcoal-soft p-6 transition-colors duration-300 hover:border-olive"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-olive/15 text-olive-soft">
                        <Icon className="h-5 w-5" strokeWidth={2.25} />
                      </span>
                      <h3 className="mt-5 font-display text-[20px] font-bold leading-[1.2] tracking-[-0.015em] text-cream">
                        {t.title}
                      </h3>
                      <p className="mt-3 text-[14.5px] leading-[1.55] text-cream/72">
                        {t.body}
                      </p>
                    </div>
                  )
                })}
              </div>
            </Stagger>
          </div>
        </div>
      </Container>

      {/* Oversized watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none font-display text-[clamp(120px,30vw,360px)] font-bold leading-none tracking-[-0.06em] text-cream/[0.04]"
      >
        Standard
      </span>
    </Section>
  )
}
