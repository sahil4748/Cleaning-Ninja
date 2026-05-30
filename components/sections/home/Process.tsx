'use client'

import { useRef } from 'react'
import { Calculator, CalendarCheck, UserCheck, ClipboardCheck, CreditCard } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import { FadeUp } from '@/components/motion/FadeUp'
import { SplitText } from '@/components/motion/SplitText'
import { useGsapMatchMedia, gsap, ScrollTrigger } from '@/components/motion/PinnedScroll'

const STEPS = [
  {
    icon: Calculator,
    title: 'Get a price',
    body: '60 seconds, no obligation. Three questions and a real number.',
  },
  {
    icon: CalendarCheck,
    title: 'Pick a time',
    body: 'Next-day cleans available in every city we operate in.',
  },
  {
    icon: UserCheck,
    title: 'Meet your Ninja',
    body: 'Same cleaner every time, for regular bookings. Photo and bio sent ahead.',
  },
  {
    icon: ClipboardCheck,
    title: 'Inspect & approve',
    body: 'We walk you through the checklist room-by-room before we leave.',
  },
  {
    icon: CreditCard,
    title: 'Pay only when happy',
    body: 'Card on file, charged after sign-off. Or we re-do it. Your call.',
  },
]

/**
 * Desktop pinned-timeline track.
 *
 * Pins the timeline strip for ~1.4× viewport height. As scroll progresses:
 *   - Connecting olive line draws (strokeDashoffset 1000 → 0).
 *   - Each numbered bubble scales in (0.8 → 1.0) when the drawn line reaches it.
 *   - Step body fades + lifts in tandem.
 *
 * Gated to lg+ AND prefers-reduced-motion: no-preference via gsap.matchMedia.
 * Mobile/reduced-motion users see the same DOM in its final state (no pin,
 * full line, full opacity).
 */
function PinnedTimeline() {
  const pinRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const bubbleRefs = useRef<Array<HTMLDivElement | null>>([])
  const bodyRefs = useRef<Array<HTMLDivElement | null>>([])

  useGsapMatchMedia(pinRef, () => {
    const pin = pinRef.current
    const line = lineRef.current
    if (!pin || !line) return

    // Prime the line with a dash that we then scrub to fully drawn.
    gsap.set(line, { strokeDasharray: 1000, strokeDashoffset: 1000 })
    bubbleRefs.current.forEach((b) => {
      if (b) gsap.set(b, { scale: 0.78, autoAlpha: 0 })
    })
    bodyRefs.current.forEach((b) => {
      if (b) gsap.set(b, { y: 16, autoAlpha: 0 })
    })

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: '+=140%',
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.to(line, { strokeDashoffset: 0, duration: 1 }, 0)

    STEPS.forEach((_, i) => {
      const t = (i + 0.5) / STEPS.length
      const bubble = bubbleRefs.current[i]
      const body = bodyRefs.current[i]
      if (bubble) {
        tl.to(
          bubble,
          { scale: 1, autoAlpha: 1, duration: 0.18, ease: 'power2.out' },
          t,
        )
      }
      if (body) {
        tl.to(
          body,
          { y: 0, autoAlpha: 1, duration: 0.22, ease: 'power2.out' },
          t + 0.04,
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === pin) st.kill()
      })
    }
  })

  return (
    <div ref={pinRef} className="relative">
      <ol className="relative grid grid-cols-5 gap-6">
        <svg
          className="pointer-events-none absolute left-0 right-0 top-6 -z-0 h-px w-full"
          viewBox="0 0 1000 1"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            ref={lineRef}
            x1="0"
            y1="0.5"
            x2="1000"
            y2="0.5"
            stroke="var(--color-olive)"
            strokeWidth="1"
          />
        </svg>
        {STEPS.map((s, idx) => {
          const Icon = s.icon
          return (
            <li key={s.title} className="relative flex flex-col items-center text-center">
              <div
                ref={(el) => {
                  bubbleRefs.current[idx] = el
                }}
                className="relative grid h-12 w-12 place-items-center rounded-full bg-olive text-cream font-display text-[18px] font-bold ring-4 ring-charcoal"
              >
                {idx + 1}
              </div>
              <div
                ref={(el) => {
                  bodyRefs.current[idx] = el
                }}
              >
                <div className="mt-6 flex items-center justify-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-olive-soft" />
                  <h3 className="font-display text-[18px] font-bold text-cream tracking-[-0.015em]">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-[22ch] text-[13.5px] text-cream/70">{s.body}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default function Process() {
  return (
    <Section surface="charcoal" spacing="default" aria-labelledby="process-heading" className="relative overflow-hidden">
      <Container width="wide">
        <FadeUp>
          <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <Stack gap="4">
                <Eyebrow tone="champagne" withRule>
                  How it works
                </Eyebrow>
                <Heading as="h2" id="process-heading" variant="display-xl" tone="bone" balance>
                  <SplitText>How a Cleaning Ninja booking</SplitText>{' '}
                  <span className="text-olive"><SplitText>actually works.</SplitText></span>
                </Heading>
              </Stack>
            </div>
            <div className="md:col-span-5">
              <Body variant="body-l" className="text-cream/70 max-w-[44ch]">
                No phone tag. No "depends on the day". Five steps from price to spotless, and one of them is "we walk you through it before we leave".
              </Body>
            </div>
          </div>
        </FadeUp>

        {/* Mobile: vertical timeline (no pin) */}
        <ol className="space-y-6 lg:hidden">
          {STEPS.map((s, idx) => {
            const Icon = s.icon
            return (
              <li key={s.title} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-olive text-cream font-display text-[18px] font-bold">
                    {idx + 1}
                  </div>
                  {idx < STEPS.length - 1 && (
                    <span className="mt-2 h-full w-px flex-1 bg-olive/35" aria-hidden="true" />
                  )}
                </div>
                <div className="pb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-olive-soft" />
                    <h3 className="font-display text-[22px] font-bold text-cream tracking-[-0.015em]">{s.title}</h3>
                  </div>
                  <p className="text-[14.5px] text-cream/70 max-w-[52ch]">{s.body}</p>
                </div>
              </li>
            )
          })}
        </ol>

        {/* Desktop: pinned horizontal timeline with GSAP scrub */}
        <div className="hidden lg:block">
          <PinnedTimeline />
        </div>
      </Container>
    </Section>
  )
}
