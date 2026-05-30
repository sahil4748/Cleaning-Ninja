'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { MoveHorizontal } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Caption from '@/components/ui/Caption'
import { FadeUp } from '@/components/motion/FadeUp'
import { Stagger } from '@/components/motion/Stagger'
import { ScrollTrigger } from '@/components/motion/PinnedScroll'
import { cn } from '@/lib/utils'

/**
 * Before & After — scroll-scrubbed comparison sliders with manual override.
 *
 * Default mode: as each card travels through the viewport, the slider position
 * scrubs from 0% (fully "Before") at viewport-bottom to 100% ("After") at
 * viewport-top. Plan §4.3 §7.
 *
 * Manual mode: once the user drags or arrow-keys the slider, that card's
 * `manualOverride` ref flips on and scroll-scrub stops affecting it. The card
 * remembers the override for the rest of the session.
 *
 * Gated to prefers-reduced-motion: no-preference. Reduced-motion users get the
 * static 50/50 split that they can still drag manually.
 */

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'carpet', label: 'Carpet' },
  { value: 'upholstery', label: 'Upholstery' },
  { value: 'tile-grout', label: 'Tile & Grout' },
  { value: 'leather', label: 'Leather' },
]

const SLOTS = [
  { 
    id: 's1', 
    category: 'carpet', 
    label: 'Wool stair runner',
    image: 'https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg',
    beforeFilter: 'brightness-[0.72] saturate-[0.5] contrast-[0.9] sepia-[15%]'
  },
  { 
    id: 's2', 
    category: 'upholstery', 
    label: 'Linen boucle sofa',
    image: 'https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg',
    beforeFilter: 'brightness-[0.75] saturate-[0.6] contrast-[0.85] sepia-[10%]'
  },
  { 
    id: 's3', 
    category: 'tile-grout', 
    label: 'Travertine ensuite tiles',
    image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg',
    beforeFilter: 'brightness-[0.68] saturate-[0.4] contrast-[0.95] sepia-[20%] hue-rotate-15'
  },
  { 
    id: 's4', 
    category: 'leather', 
    label: 'Aniline leather armchair',
    image: 'https://images.pexels.com/photos/154161/pexels-photo-154161.jpeg',
    beforeFilter: 'brightness-[0.65] saturate-[0.55] contrast-[0.9] sepia-[12%]'
  },
]

function CompareSlider({ 
  label, 
  imageUrl, 
  beforeFilter 
}: { 
  label: string
  imageUrl: string
  beforeFilter: string 
}) {
  const [position, setSliderPosition] = useState<number>(50)
  const cardRef = useRef<HTMLElement>(null)
  // Ref (not state) so the ScrollTrigger callback sees the latest value
  // without forcing a teardown/rebuild of the trigger.
  const manualOverrideRef = useRef<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = cardRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      end: 'bottom 10%',
      onUpdate: (self) => {
        if (manualOverrideRef.current) return
        // Map 0..1 → 0..100, but clamp so cards never "flash" the full Before
        // at the very moment they enter (looks jarring); start at 8%.
        const p = self.progress * 100
        setSliderPosition(Math.min(Math.max(p, 0), 100))
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  const handleManualChange = (value: number) => {
    manualOverrideRef.current = true
    setSliderPosition(value)
  }

  return (
    <article ref={cardRef} className="group relative flex flex-col gap-5 border border-border bg-cream p-3 transition-colors duration-200 hover:border-olive rounded-[4px] has-[input:focus-visible]:border-olive has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-olive/40">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal text-cream select-none rounded-[2px]">
        
        {/* AFTER IMAGE (Bottom Layer - Pristine) */}
        <div className="absolute inset-0 h-full w-full">
          {/* Shimmer Placeholder */}
          <div className="absolute inset-0 skeleton" />
          <Image
            src={imageUrl}
            alt={`${label} - after restorative care`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="absolute inset-0 h-full w-full object-cover select-none"
            draggable={false}
          />
          <div className="absolute right-4 top-4 z-10 backdrop-blur-md bg-charcoal/30 px-2.5 py-1 rounded-[2px]">
            <Eyebrow tone="bone" className="!text-cream font-semibold">
              After
            </Eyebrow>
          </div>
        </div>

        {/* BEFORE IMAGE — full-bleed layer, revealed via clip-path driven by slider position.
            Fixes the audit bug where the inner div used hard pixel widths that broke at lg:grid-cols-4. */}
        <div
          className="absolute inset-0 z-20"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="absolute inset-0 skeleton" />
          <Image
            src={imageUrl}
            alt={`${label} - before care`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              'absolute inset-0 h-full w-full object-cover select-none',
              beforeFilter,
            )}
            draggable={false}
          />
          <div className="absolute left-4 top-4 z-10 backdrop-blur-md bg-charcoal/30 px-2.5 py-1 rounded-[2px]">
            <Eyebrow tone="bone" className="!text-cream/90 font-semibold">
              Before
            </Eyebrow>
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-px bg-cream/80 z-30 pointer-events-none"
          style={{ left: `${position}%` }}
        >
          {/* Glowing dot track */}
          <div className="absolute inset-y-0 -left-px w-[3px] bg-olive/30 blur-[1px]" />
        </div>

        {/* Drag Handle Button */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-40 pointer-events-none transition-transform duration-200 group-hover:scale-110 group-has-[input:focus-visible]:scale-110 group-has-[input:focus-visible]:ring-2 group-has-[input:focus-visible]:ring-olive"
          style={{ left: `${position}%` }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cream bg-charcoal shadow-lg backdrop-blur-sm">
            <MoveHorizontal className="h-4 w-4 text-cream" />
          </div>
        </div>

        {/* Transparent Range Input Overlay for flawless drag physics */}
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => handleManualChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full opacity-0 cursor-ew-resize z-50"
          aria-label={`Slide to compare before and after states of ${label}`}
        />

        {/* Technical Specification stamp */}
        <div className="absolute bottom-3 left-4 z-10 pointer-events-none bg-charcoal/40 backdrop-blur-sm px-2 py-0.5 rounded-[2px]">
          <Caption className="text-cream/80 text-[10px] tracking-widest font-mono">SPEC · DE-RESTORE</Caption>
        </div>
      </div>

      <div className="flex items-end justify-between px-2 pb-2">
        <div>
          <Eyebrow tone="champagne">Methodical Care</Eyebrow>
          <p className="mt-1 font-display text-[18px] leading-tight tracking-tight text-charcoal lg:text-[20px]">
            {label}
          </p>
        </div>
        <Caption className="text-charcoal/50 font-medium">Drag slider</Caption>
      </div>
    </article>
  )
}

export default function BeforeAfter() {
  const [category, setCategory] = useState<string>('all')
  
  const visible = useMemo(() => {
    if (category === 'all') return SLOTS
    return SLOTS.filter((s) => s.category === category)
  }, [category])

  return (
    <Section
      surface="surface-muted"
      spacing="default"
      aria-labelledby="ba-heading"
      className="relative"
    >
      <Container width="wide">
        <FadeUp>
          <div className="mb-12 grid grid-cols-1 gap-10 md:mb-16 md:grid-cols-12">
            <div className="md:col-span-7">
              <Stack gap="4">
                <Eyebrow tone="champagne" withRule>
                  Proof
                </Eyebrow>
                <Heading as="h2" id="ba-heading" variant="display-xl" balance>
                  Real homes. <span className="text-olive">Real results.</span>
                </Heading>
              </Stack>
            </div>
            <div className="md:col-span-5">
              <Body variant="body-l" className="text-charcoal/72 max-w-[44ch]">
                Drag the slider on any card. Each pair is the same room, same camera, same time of day — only the work changed.
              </Body>
            </div>
          </div>
        </FadeUp>

        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-border pb-6 md:mb-14">
          {CATEGORIES.map((c) => {
            const active = category === c.value
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                aria-pressed={active}
                className={cn(
                  'rounded-full border px-4 py-1.5 font-body text-[13px] font-semibold transition-all duration-200 cursor-pointer',
                  active
                    ? 'border-olive bg-olive text-cream'
                    : 'border-charcoal/20 bg-cream text-charcoal/70 hover:border-charcoal hover:text-charcoal',
                )}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        <Stagger gap={0.06} distance={14}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {visible.map((slot) => (
              <CompareSlider 
                key={slot.id} 
                label={slot.label} 
                imageUrl={slot.image}
                beforeFilter={slot.beforeFilter}
              />
            ))}
          </div>
        </Stagger>

        <div className="mt-10 text-center md:mt-14">
          <Caption className="text-charcoal/60 text-[12px] uppercase tracking-[0.16em] font-medium font-body">
            More pairs at <a href="/gallery" className="text-olive hover:text-olive-deep transition-colors underline decoration-olive-deep underline-offset-4">/gallery</a> — filtered by service and suburb
          </Caption>
        </div>
      </Container>
    </Section>
  )
}
