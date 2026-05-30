'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { MoveHorizontal } from 'lucide-react'
import Caption from '@/components/ui/Caption'
import Eyebrow from '@/components/ui/Eyebrow'
import { COVERAGE } from '@/content/coverage'
import { cn } from '@/lib/utils'

/** A single before/after pair. */
export interface GalleryItem {
  id: string
  service: 'carpet' | 'upholstery' | 'tile-grout' | 'leather' | 'end-of-lease' | 'regular'
  serviceLabel: string
  city: string
  suburb: string
  description: string
  image: string
  beforeFilter: string
}

const SERVICE_FILTERS = [
  { value: 'all', label: 'All services' },
  { value: 'end-of-lease', label: 'End-of-lease' },
  { value: 'carpet', label: 'Carpet' },
  { value: 'upholstery', label: 'Upholstery' },
  { value: 'tile-grout', label: 'Tile & grout' },
  { value: 'leather', label: 'Leather' },
  { value: 'regular', label: 'Regular' },
]

const GALLERY: GalleryItem[] = [
  {
    id: 'g1', service: 'end-of-lease', serviceLabel: 'End-of-lease',
    city: 'Sydney', suburb: 'Bondi',
    description: '3-bed apartment, full bond clean. Bond returned in full.',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    beforeFilter: 'brightness-[0.72] saturate-[0.5] contrast-[0.9] sepia-[15%]',
  },
  {
    id: 'g2', service: 'carpet', serviceLabel: 'Carpet steam',
    city: 'Melbourne', suburb: 'Fitzroy',
    description: 'Wool stair runner — red wine stain, 2y old.',
    image: 'https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg',
    beforeFilter: 'brightness-[0.7] saturate-[0.55] contrast-[0.85] sepia-[18%]',
  },
  {
    id: 'g3', service: 'upholstery', serviceLabel: 'Upholstery',
    city: 'Brisbane', suburb: 'New Farm',
    description: 'Linen boucle 3-seater, body-oil saturation.',
    image: 'https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg',
    beforeFilter: 'brightness-[0.75] saturate-[0.6] contrast-[0.85] sepia-[10%]',
  },
  {
    id: 'g4', service: 'tile-grout', serviceLabel: 'Tile & grout',
    city: 'Perth', suburb: 'Cottesloe',
    description: 'Travertine ensuite floor, grout heavily soiled.',
    image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg',
    beforeFilter: 'brightness-[0.68] saturate-[0.4] contrast-[0.95] sepia-[20%]',
  },
  {
    id: 'g5', service: 'leather', serviceLabel: 'Leather care',
    city: 'Adelaide', suburb: 'Norwood',
    description: 'Aniline armchair, 15y of neglect. Conditioned + top-coated.',
    image: 'https://images.pexels.com/photos/154161/pexels-photo-154161.jpeg',
    beforeFilter: 'brightness-[0.65] saturate-[0.55] contrast-[0.9] sepia-[12%]',
  },
  {
    id: 'g6', service: 'regular', serviceLabel: 'Regular',
    city: 'Gold Coast', suburb: 'Burleigh Heads',
    description: 'Family kitchen, fortnightly. First catch-up clean.',
    image: 'https://images.pexels.com/photos/3935326/pexels-photo-3935326.jpeg',
    beforeFilter: 'brightness-[0.7] saturate-[0.55] contrast-[0.9] sepia-[14%]',
  },
  {
    id: 'g7', service: 'end-of-lease', serviceLabel: 'End-of-lease',
    city: 'Melbourne', suburb: 'Richmond',
    description: 'Worker\'s cottage, oven + range hood deep clean.',
    image: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg',
    beforeFilter: 'brightness-[0.65] saturate-[0.45] contrast-[0.92] sepia-[18%]',
  },
  {
    id: 'g8', service: 'carpet', serviceLabel: 'Carpet steam',
    city: 'Brisbane', suburb: 'Paddington',
    description: 'Synthetic broadloom, high traffic hallway.',
    image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
    beforeFilter: 'brightness-[0.7] saturate-[0.5] contrast-[0.88] sepia-[16%]',
  },
  {
    id: 'g9', service: 'tile-grout', serviceLabel: 'Tile & grout',
    city: 'Sydney', suburb: 'Surry Hills',
    description: 'Ceramic kitchen splashback, oil saturation.',
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    beforeFilter: 'brightness-[0.7] saturate-[0.5] contrast-[0.85] sepia-[16%]',
  },
  {
    id: 'g10', service: 'upholstery', serviceLabel: 'Upholstery',
    city: 'Perth', suburb: 'Subiaco',
    description: 'Velvet 2-seater, mid-century. Method matched.',
    image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg',
    beforeFilter: 'brightness-[0.72] saturate-[0.55] contrast-[0.9] sepia-[12%]',
  },
  {
    id: 'g11', service: 'regular', serviceLabel: 'Regular',
    city: 'Adelaide', suburb: 'Glenelg',
    description: 'Pre-auction styling clean. 4-bed family home.',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    beforeFilter: 'brightness-[0.7] saturate-[0.5] contrast-[0.88] sepia-[14%]',
  },
  {
    id: 'g12', service: 'leather', serviceLabel: 'Leather care',
    city: 'Sydney', suburb: 'Mosman',
    description: 'Chesterfield sofa, dye transfer + body oils.',
    image: 'https://images.pexels.com/photos/280475/pexels-photo-280475.jpeg',
    beforeFilter: 'brightness-[0.68] saturate-[0.55] contrast-[0.9] sepia-[14%]',
  },
  {
    id: 'g13', service: 'end-of-lease', serviceLabel: 'End-of-lease',
    city: 'Gold Coast', suburb: 'Surfers Paradise',
    description: 'High-rise apartment, holiday-let restoration.',
    image: 'https://images.pexels.com/photos/3935328/pexels-photo-3935328.jpeg',
    beforeFilter: 'brightness-[0.7] saturate-[0.5] contrast-[0.9] sepia-[16%]',
  },
  {
    id: 'g14', service: 'carpet', serviceLabel: 'Carpet steam',
    city: 'Sydney', suburb: 'Manly',
    description: 'Berber carpet, pet stains. Pet-specific treatment.',
    image: 'https://images.pexels.com/photos/2746187/pexels-photo-2746187.jpeg',
    beforeFilter: 'brightness-[0.7] saturate-[0.5] contrast-[0.85] sepia-[18%]',
  },
  {
    id: 'g15', service: 'tile-grout', serviceLabel: 'Tile & grout',
    city: 'Melbourne', suburb: 'St Kilda',
    description: 'Bathroom porcelain, grout discolouration.',
    image: 'https://images.pexels.com/photos/161517/background-bathroom-clean-comfort-161517.jpeg',
    beforeFilter: 'brightness-[0.65] saturate-[0.5] contrast-[0.9] sepia-[20%]',
  },
  {
    id: 'g16', service: 'upholstery', serviceLabel: 'Upholstery',
    city: 'Gold Coast', suburb: 'Broadbeach',
    description: 'Microfibre sectional, deep extraction.',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    beforeFilter: 'brightness-[0.72] saturate-[0.55] contrast-[0.88] sepia-[14%]',
  },
  {
    id: 'g17', service: 'regular', serviceLabel: 'Regular',
    city: 'Brisbane', suburb: 'Bulimba',
    description: 'Weekly clean, family of five + golden retriever.',
    image: 'https://images.pexels.com/photos/4239011/pexels-photo-4239011.jpeg',
    beforeFilter: 'brightness-[0.7] saturate-[0.5] contrast-[0.9] sepia-[14%]',
  },
  {
    id: 'g18', service: 'end-of-lease', serviceLabel: 'End-of-lease',
    city: 'Perth', suburb: 'Fremantle',
    description: 'Heritage cottage, eco-only products required.',
    image: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg',
    beforeFilter: 'brightness-[0.68] saturate-[0.5] contrast-[0.9] sepia-[18%]',
  },
  {
    id: 'g19', service: 'leather', serviceLabel: 'Leather care',
    city: 'Adelaide', suburb: 'Burnside',
    description: 'Recliner suite, conditioner only — no over-clean.',
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg',
    beforeFilter: 'brightness-[0.7] saturate-[0.55] contrast-[0.9] sepia-[14%]',
  },
  {
    id: 'g20', service: 'carpet', serviceLabel: 'Carpet steam',
    city: 'Gold Coast', suburb: 'Mermaid Beach',
    description: 'Holiday rental turnaround. Sand + sunscreen marks.',
    image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
    beforeFilter: 'brightness-[0.72] saturate-[0.55] contrast-[0.88] sepia-[12%]',
  },
]

function CompareSlider({ item }: { item: GalleryItem }) {
  const [position, setSliderPosition] = useState<number>(50)

  return (
    <article className="group relative flex flex-col gap-4 border border-border bg-cream p-3 rounded-[4px] hover:border-olive transition-colors">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal select-none rounded-[2px]">
        {/* AFTER */}
        <div className="absolute inset-0 h-full w-full">
          <div className="absolute inset-0 skeleton" />
          <Image
            src={item.image}
            alt={`${item.description} - after`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="absolute inset-0 object-cover select-none"
            draggable={false}
          />
          <div className="absolute right-4 top-4 z-10 backdrop-blur-md bg-charcoal/30 px-2.5 py-1 rounded-[2px]">
            <Eyebrow tone="bone" className="!text-cream font-semibold">
              After
            </Eyebrow>
          </div>
        </div>

        {/* BEFORE */}
        <div
          className="absolute inset-0 z-20"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="absolute inset-0 skeleton" />
          <Image
            src={item.image}
            alt={`${item.description} - before`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn('absolute inset-0 object-cover select-none', item.beforeFilter)}
            draggable={false}
          />
          <div className="absolute left-4 top-4 z-10 backdrop-blur-md bg-charcoal/30 px-2.5 py-1 rounded-[2px]">
            <Eyebrow tone="bone" className="!text-cream/90 font-semibold">
              Before
            </Eyebrow>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-px bg-cream/80 z-30 pointer-events-none"
          style={{ left: `${position}%` }}
        />

        <div
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-40 pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cream bg-charcoal shadow-lg">
            <MoveHorizontal className="h-4 w-4 text-cream" />
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 h-full w-full opacity-0 cursor-ew-resize z-50"
          aria-label={`Slide to compare before and after of ${item.description}`}
        />
      </div>

      <div className="px-2 pb-1">
        <div className="flex items-baseline justify-between mb-2">
          <Eyebrow tone="champagne">{item.serviceLabel}</Eyebrow>
          <Caption className="font-body text-charcoal/55">
            {item.suburb}, {item.city}
          </Caption>
        </div>
        <p className="font-display text-[16px] leading-snug tracking-tight text-charcoal">
          {item.description}
        </p>
      </div>
    </article>
  )
}

export function GalleryGrid() {
  const [service, setService] = useState<string>('all')
  const [suburb, setSuburb] = useState<string>('all')

  const allSuburbs = useMemo(() => {
    const set = new Set<string>()
    GALLERY.forEach((g) => set.add(g.suburb))
    return ['all', ...Array.from(set).sort()]
  }, [])

  const visible = useMemo(() => {
    return GALLERY.filter((g) => {
      if (service !== 'all' && g.service !== service) return false
      if (suburb !== 'all' && g.suburb !== suburb) return false
      return true
    })
  }, [service, suburb])

  return (
    <div>
      {/* Service chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        {SERVICE_FILTERS.map((f) => {
          const active = service === f.value
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setService(f.value)}
              aria-pressed={active}
              className={cn(
                'rounded-full border px-4 py-1.5 font-body text-[13px] font-semibold transition-colors duration-200 cursor-pointer',
                active
                  ? 'border-olive bg-olive text-cream'
                  : 'border-charcoal/20 bg-cream text-charcoal/70 hover:border-charcoal hover:text-charcoal',
              )}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* Suburb dropdown */}
      <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-border pb-6">
        <label
          htmlFor="suburb-filter"
          className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal/55"
        >
          Suburb
        </label>
        <select
          id="suburb-filter"
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
          className="border border-border bg-cream rounded-[4px] px-3 py-1.5 font-body text-[14px] text-charcoal focus:outline-none focus:border-olive cursor-pointer"
        >
          {allSuburbs.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? 'All suburbs' : s}
            </option>
          ))}
        </select>
        <Caption className="ml-auto font-body text-charcoal/55">
          Showing {visible.length} of {GALLERY.length}
        </Caption>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((item) => (
          <CompareSlider key={item.id} item={item} />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-center py-12 font-body text-charcoal/60">
          No matches for that combination. Reset the filters or try a different
          service.
        </p>
      ) : null}
    </div>
  )
}
