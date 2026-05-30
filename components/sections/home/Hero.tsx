'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import { SplitText } from '@/components/motion/SplitText'
import { CountUp } from '@/components/motion/CountUp'
import { HeroCanvas } from './HeroCanvas'
import { BUSINESS } from '@/content/navigation'

/**
 * Hero — Draftly-grade opener.
 *
 * Frame-scrub canvas (Apple-AirPods-style) lives behind the headline and scrubs
 * as the user scrolls. Headline mask-reveals on mount. The price anchor and the
 * city strip enter on stagger.
 *
 * The CTA pair is in-viewport on every breakpoint. The secondary CTA opens a
 * 30s reel modal (deferred — currently routes to /gallery for the photo wall).
 */
export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative w-full overflow-hidden bg-cream text-charcoal" aria-labelledby="hero-headline">
      <HeroCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/65 to-cream/85 pointer-events-none" aria-hidden="true" />

      <Container width="wide" className="relative z-10">
        <div className="grid min-h-[calc(100vh-4rem)] grid-cols-12 items-center gap-x-6 gap-y-8 py-16 sm:py-20 lg:min-h-[calc(100vh-5rem)] lg:py-32">
          <div className="col-span-12 lg:col-span-9 xl:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.65, 0.05, 0.36, 1], delay: reduced ? 0 : 0.2 }}
            >
              <Eyebrow tone="champagne" withRule>
                Ninja-precision home cleaning · Australia-wide
              </Eyebrow>
            </motion.div>

            <Heading
              as="h1"
              id="hero-headline"
              variant="display-xxl"
              className="mt-6 max-w-[14ch] text-charcoal sm:mt-8"
            >
              <SplitText delay={reduced ? 0 : 0.35} stagger={0.06} duration={0.7}>
                Spotless.
              </SplitText>{' '}
              <SplitText delay={reduced ? 0 : 0.55} stagger={0.06} duration={0.7}>
                On time.
              </SplitText>{' '}
              <span className="text-olive">
                <SplitText delay={reduced ? 0 : 0.85} stagger={0.06} duration={0.7}>
                  Bond back.
                </SplitText>
              </span>
            </Heading>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.65, 0.05, 0.36, 1], delay: reduced ? 0 : 1.15 }}
              className="mt-8 max-w-[58ch]"
            >
              <Body variant="body-l" className="text-charcoal/80">
                Flat-rate cleans from <span className="font-semibold text-charcoal">$129</span>. Police-checked teams in Sydney, Melbourne, Brisbane, Perth, Adelaide and the Gold Coast. ABN-verified, fully insured, no nasty surprises.
              </Body>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.65, 0.05, 0.36, 1], delay: reduced ? 0 : 1.35 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                as={Link}
                href="/book"
                variant="primary-light"
                size="lg"
                data-magnetic
                className="group bg-olive border-olive text-cream hover:bg-olive-deep hover:border-olive-deep shadow-[0_18px_44px_-18px_rgba(74,86,40,0.55)] hover:-translate-y-[1px] transition-all duration-200"
              >
                See my price (60 sec)
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button
                as={Link}
                href="/gallery"
                variant="quiet-link"
                data-magnetic
                className="group text-charcoal"
              >
                <PlayCircle className="h-4 w-4 text-olive" />
                Watch a clean
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : 1.55 }}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-charcoal/70 lg:mt-16"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-charcoal text-[12px] tracking-[0.08em]">ABN {BUSINESS.abn}</span>
              </div>
              <span className="text-charcoal/30">·</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-charcoal">{BUSINESS.publicLiability}</span>
                <span>Public Liability</span>
              </div>
              <span className="text-charcoal/30">·</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-olive">{BUSINESS.rating}★</span>
                <CountUp to={BUSINESS.reviewCount} className="font-semibold text-charcoal" />
                <span>Google reviews</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
