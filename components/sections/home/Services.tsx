'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, CheckCircle, Clock } from 'lucide-react'
import { useState, useRef, MouseEvent } from 'react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Button from '@/components/ui/Button'
import Tilt from '@/components/ui/Tilt'
import { FadeUp } from '@/components/motion/FadeUp'
import { Stagger } from '@/components/motion/Stagger'
import { SplitText } from '@/components/motion/SplitText'
import { useGsapMatchMedia, gsap, ScrollTrigger } from '@/components/motion/PinnedScroll'
import { SERVICES, type Service } from '@/content/services'
import { cn } from '@/lib/utils'

/**
 * Services / Disciplines.
 *
 * Two distinct layouts driven by viewport:
 *
 *   - sm/md  → vertical bento grid (existing Stagger reveal).
 *   - lg+    → pinned horizontal scroll. Section pins for ~1.5× viewport
 *              height while the card track translates horizontally based on
 *              GSAP ScrollTrigger scrub. Below lg this layout is `display:none`
 *              and no GSAP runs (matchMedia gating).
 *
 * Each card:
 *   - From-price stamp in olive
 *   - Cursor spotlight on hover
 *   - Tilts 6deg via Tilt primitive (hover-gated)
 *   - data-magnetic for SparkleCursor snap
 */

function ServiceCard({
  service,
  size,
  index,
  total,
}: {
  service: Service
  size: 'small' | 'large'
  index: number
  total: number
}) {
  const [spotlight, setSpotlight] = useState<{ x: number; y: number } | null>(null)
  const isLarge = size === 'large'

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <Tilt maxRotation={6} scale={1.01} className="h-full">
      <Link
        href={service.href}
        onMouseMove={onMove}
        onMouseLeave={() => setSpotlight(null)}
        data-magnetic
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-[color:var(--color-border)] bg-cream transition-colors duration-300 hover:border-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-olive',
        )}
      >
        {spotlight && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
            style={{
              background: `radial-gradient(360px circle at ${spotlight.x}px ${spotlight.y}px, rgba(107,124,58,0.18), transparent 60%)`,
            }}
          />
        )}

        <div className={cn('relative overflow-hidden bg-charcoal', isLarge ? 'aspect-[16/10]' : 'aspect-[4/3]')}>
          <Image
            src={service.image}
            alt={service.name}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="absolute inset-0 object-cover opacity-90 transition-transform duration-700 ease-[var(--ease-out-long)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/70 via-charcoal/20 to-transparent" />
          <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-olive" />
            from ${service.fromPrice}
          </div>
          <div className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-cream/90">
            <Clock className="h-3.5 w-3.5" />
            <span>{service.durationHours} hr</span>
          </div>
        </div>

        <div className={cn('relative z-[2] flex flex-1 flex-col gap-5 p-6 sm:p-7', isLarge && 'lg:p-10')}>
          <div className="flex items-start justify-between gap-4">
            <h3
              className={cn(
                'font-display font-bold leading-[1.1] tracking-[-0.02em] text-charcoal transition-colors duration-200 group-hover:text-olive-deep',
                isLarge ? 'text-[28px] sm:text-[34px] lg:text-[40px]' : 'text-[22px] sm:text-[24px]',
              )}
            >
              {service.name}
            </h3>
            <span className="font-display text-[26px] font-bold leading-none text-olive lg:text-[32px]">
              ${service.fromPrice}
            </span>
          </div>

          <p className={cn('text-charcoal/80', isLarge ? 'text-[17px]' : 'text-[15px]')}>
            {service.tagline}
          </p>

          <ul className="mt-1 grid gap-2 text-[13.5px] text-charcoal/75">
            {service.inclusions.map((inc) => (
              <li key={inc} className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 shrink-0 text-olive" />
                {inc}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between border-t border-[color:var(--color-border)] pt-5">
            <span className="inline-flex items-center gap-1.5 font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors duration-200 group-hover:text-olive">
              Book this clean
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-charcoal/45">
              0{index + 1} / 0{total}
            </span>
          </div>
        </div>
      </Link>
    </Tilt>
  )
}

/**
 * Desktop-only pinned horizontal scroll wrapper.
 *
 * The wrapping `<section>` pins to the viewport top; the inner track translates
 * X based on scroll progress. Scroll distance is capped at 1.6× viewport
 * height per blueprint §3.C.3.
 */
function ServicesHorizontalTrack() {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGsapMatchMedia(pinRef, () => {
    const pin = pinRef.current
    const track = trackRef.current
    if (!pin || !track) return

    // Distance the track needs to travel so its right edge clears the viewport.
    const compute = () => {
      const overflow = track.scrollWidth - window.innerWidth
      // Leave a small padding so the last card breathes against the edge.
      return Math.max(overflow + 80, 0)
    }

    const trackDistance = compute()
    if (trackDistance === 0) return

    // Cap pinned scroll at 1.6× viewport height for narrow vertical budget.
    const scrollDistance = Math.min(trackDistance, window.innerHeight * 1.6)

    gsap.to(track, {
      x: -trackDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // Subtle entry stagger as section enters from below.
    gsap.from(track.children, {
      autoAlpha: 0,
      y: 24,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: pin,
        start: 'top 85%',
        once: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === pin) st.kill()
      })
    }
  })

  return (
    <div ref={pinRef} className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 will-change-transform"
        style={{ touchAction: 'pan-y' }}
      >
        {SERVICES.map((s, i) => (
          <div
            key={s.slug}
            className={cn(
              'shrink-0',
              s.bentoSize === 'large'
                ? 'w-[58vw] max-w-[640px]'
                : 'w-[36vw] max-w-[420px]',
            )}
          >
            <ServiceCard service={s} size={s.bentoSize} index={i} total={SERVICES.length} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <Section surface="cream" spacing="default" aria-labelledby="services-heading">
      <Container width="wide">
        <FadeUp>
          <div className="mb-14 grid grid-cols-1 gap-10 md:mb-20 md:grid-cols-12">
            <div className="md:col-span-7">
              <Stack gap="4">
                <Eyebrow tone="champagne" withRule>
                  Disciplines
                </Eyebrow>
                <Heading as="h2" id="services-heading" variant="display-xl" balance>
                  <SplitText>Pick the clean you need.</SplitText>
                </Heading>
              </Stack>
            </div>
            <div className="md:col-span-5">
              <Body variant="body-l" className="text-charcoal/80 max-w-[44ch]">
                Every service has a flat from-price visible up front. No quote runaround, no "depends on the day". What you see is what you pay.
              </Body>
            </div>
          </div>
        </FadeUp>

        {/* sm/md: vertical bento grid (no pin). Mirrors the original layout
            cadence — 1 col mobile, 2 cols tablet — so the section never
            collapses to an awkward 5-row stack on bigger phones. */}
        <div className="lg:hidden">
          <Stagger gap={0.08} distance={18}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
              {SERVICES.map((s, i) => (
                <ServiceCard
                  key={s.slug}
                  service={s}
                  size="small"
                  index={i}
                  total={SERVICES.length}
                />
              ))}
            </div>
          </Stagger>
        </div>
      </Container>

      {/* lg+: pinned horizontal track. Lives outside Container so the track
          can translate across the full viewport width without gutter clipping. */}
      <div className="hidden lg:block">
        <div className="pl-[max(80px,calc((100vw-1440px)/2+80px))]">
          <ServicesHorizontalTrack />
        </div>
      </div>

      <Container width="wide">
        <div className="mt-16 flex justify-center">
          <Button as={Link} href="/services" variant="secondary-light" data-magnetic>
            See all services
          </Button>
        </div>
      </Container>
    </Section>
  )
}
