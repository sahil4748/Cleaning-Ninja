'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Languages, Calendar } from 'lucide-react'
import Caption from '@/components/ui/Caption'
import { TEAM } from '@/content/team'
import { COVERAGE } from '@/content/coverage'
import { cn } from '@/lib/utils'

const CITY_FILTERS = [
  { value: 'all', label: 'All cities' },
  ...COVERAGE.map((c) => ({ value: c.city, label: c.city })),
]

export function TeamGrid() {
  const [city, setCity] = useState<string>('all')

  const visible = useMemo(() => {
    if (city === 'all') return TEAM
    return TEAM.filter((m) => m.city === city || m.cityCovered.includes('Nationwide oversight'))
  }, [city])

  return (
    <div>
      {/* Filter chips */}
      <div className="mb-10 flex flex-wrap gap-2 border-b border-border pb-6">
        {CITY_FILTERS.map((c) => {
          const active = city === c.value
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => setCity(c.value)}
              aria-pressed={active}
              className={cn(
                'rounded-full border px-4 py-1.5 font-body text-[13px] font-semibold transition-colors duration-200 cursor-pointer',
                active
                  ? 'border-olive-deep bg-olive-deep text-cream'
                  : 'border-charcoal/20 bg-cream text-charcoal/75 hover:border-charcoal hover:text-charcoal',
              )}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {visible.map((m) => (
          <article
            key={m.id}
            className="group flex flex-col border border-border bg-cream rounded-[4px] overflow-hidden hover:border-olive transition-colors"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal">
              <div className="absolute inset-0 bg-charcoal-soft animate-pulse" />
              <Image
                src={m.photo}
                alt={`${m.name} — ${m.role}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Caption className="text-cream/90 font-mono text-[10px] uppercase tracking-widest">
                  {m.role}
                </Caption>
                <h3 className="font-display font-semibold text-[22px] text-cream tracking-tight leading-tight">
                  {m.name}
                </h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-charcoal/75">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-body">
                  <MapPin className="h-3.5 w-3.5 text-olive" />
                  {m.city}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-body">
                  <Calendar className="h-3.5 w-3.5 text-olive" />
                  {m.yearsWithUs}y with us
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-body">
                  <Languages className="h-3.5 w-3.5 text-olive" />
                  {m.languages.join(', ')}
                </span>
              </div>

              <p className="font-body text-[14px] text-charcoal/75 leading-relaxed">
                <span className="font-semibold text-charcoal">Specialty:</span>{' '}
                {m.specialty}
              </p>

              <blockquote className="border-l-2 border-olive pl-4 font-display italic text-[15px] text-charcoal/85 leading-snug">
                "{m.quote}"
              </blockquote>

              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <Caption className="font-body text-[11px] uppercase tracking-[0.14em] text-charcoal/50">
                  Suburbs
                </Caption>
                <span className="font-body text-[12px] text-charcoal/75 text-right max-w-[60%] leading-tight">
                  {m.cityCovered.join(' · ')}
                </span>
              </div>

              <Link
                href={`/book?city=${encodeURIComponent(m.city.toLowerCase().replace(/\s+/g, '-'))}`}
                className="mt-2 inline-flex items-center gap-1 font-body text-[13px] font-bold uppercase tracking-[0.14em] text-charcoal hover:text-olive transition-colors"
              >
                Book {m.name.split(' ')[0]}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-center py-12 font-body text-charcoal/75">
          No team members in this city yet. Try another filter or browse all.
        </p>
      ) : null}
    </div>
  )
}
