'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import Caption from '@/components/ui/Caption'
import {
  CARPET_MATRIX,
  END_OF_LEASE_MATRIX,
  REGULAR_CLEAN_MATRIX,
  TILE_GROUT_MATRIX,
  UPHOLSTERY_MATRIX,
} from '@/content/pricing'
import { COVERAGE } from '@/content/coverage'
import { cn } from '@/lib/utils'

type TabId = 'regular' | 'eol' | 'carpet' | 'upholstery' | 'tile' | 'leather'

const TABS: Array<{ id: TabId; label: string; slug: string }> = [
  { id: 'regular', label: 'Regular clean', slug: 'regular-home' },
  { id: 'eol', label: 'End-of-lease', slug: 'end-of-lease-cleaning' },
  { id: 'carpet', label: 'Carpet steam', slug: 'carpet-cleaning' },
  { id: 'upholstery', label: 'Upholstery', slug: 'upholstery-cleaning' },
  { id: 'tile', label: 'Tile & grout', slug: 'tile-grout-cleaning' },
  { id: 'leather', label: 'Leather care', slug: 'leather-cleaning' },
]

const INCLUSIONS: Record<TabId, { included: string[]; excluded: string[] }> = {
  regular: {
    included: [
      'All living areas, dusted and vacuumed',
      'Kitchen — wipe-down of benches, splashback, stovetop',
      'Bathrooms — toilet, vanity, mirror, shower',
      'Floors mopped (hard) or vacuumed (soft)',
      'Skirting boards dusted',
      'Bins emptied and lined',
      'Eco-only products',
      'Same cleaner on every visit',
    ],
    excluded: [
      'Inside oven (separate add-on)',
      'External windows above ground floor',
      'Heavy furniture moved',
      'Pest-infestation cleaning',
    ],
  },
  eol: {
    included: [
      'REIQ / REINSW / REIV checklist',
      'Oven deep clean (inside, racks, trays)',
      'Range hood degrease + filter',
      'All cupboards inside + out',
      'Bathrooms — full sanitation top to bottom',
      'Skirting, tracks, blinds, windowsills',
      'Carpet steam (where included on booking)',
      'Date-stamped photo documentation',
      '72-hour re-clean if PM flags anything',
    ],
    excluded: [
      'Bond-back guarantee assumes property is empty',
      'Mould remediation (separate quote)',
      'Garden / external area',
      'Repainting touch-ups',
    ],
  },
  carpet: {
    included: [
      'Fibre inspection',
      'Pre-vacuum',
      'Pre-conditioner + dwell',
      'Spot stain pre-treatment',
      'Hot-water extraction at 90°C',
      'pH-neutral rinse',
      'Speed-dry fans',
    ],
    excluded: [
      'Permanent dye stains (ink, hair dye)',
      'Mould below the backing',
      'Pet-urine in subfloor (separate UV treatment quote)',
    ],
  },
  upholstery: {
    included: [
      'Fabric code identification (W, S, WS, X)',
      'Pre-vacuum',
      'Pre-conditioner',
      'Method-appropriate extraction',
      'Deodorise',
      'Groom + dry',
    ],
    excluded: [
      'Frame repair',
      'Cushion re-stuffing',
      'Permanent ink / dye-bleed stains',
    ],
  },
  tile: {
    included: [
      'Surface + grout inspection',
      'Alkaline pre-spray + dwell',
      'High-pressure rotary extraction',
      'pH-neutral rinse',
      'Optional penetrating sealer',
    ],
    excluded: [
      'Grout re-grouting',
      'Cracked-tile replacement',
      'Acid cleaning on stone (we never do this)',
    ],
  },
  leather: {
    included: [
      'Leather type identification',
      'pH-balanced surface clean',
      'Deep clean on textured areas',
      'Conditioner application',
      'Protective top-coat',
    ],
    excluded: [
      'Re-dyeing',
      'Frame / spring repair',
      'Tear or puncture repair',
    ],
  },
}

export function PricingMatrices() {
  const [tab, setTab] = useState<TabId>('regular')

  return (
    <div>
      {/* Tab nav */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4 mb-10">
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={active}
              className={cn(
                'rounded-full border px-4 py-2 font-body text-[13px] font-semibold transition-colors duration-200 cursor-pointer',
                active
                  ? 'border-olive-deep bg-olive-deep text-cream'
                  : 'border-charcoal/20 bg-cream text-charcoal/75 hover:border-charcoal hover:text-charcoal',
              )}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Pricing table */}
      {tab === 'regular' || tab === 'eol' ? (
        <div className="overflow-x-auto rounded-[4px] border border-border bg-cream">
          <table className="w-full text-left">
            <thead className="bg-surface-muted text-charcoal/80 text-[12px] font-body uppercase tracking-[0.14em]">
              <tr>
                <th className="px-4 py-3 font-semibold">Property</th>
                {COVERAGE.map((c) => (
                  <th key={c.slug} className="px-4 py-3 font-semibold text-right">
                    {c.city}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-body text-[14px] text-charcoal/85">
              {(tab === 'regular' ? REGULAR_CLEAN_MATRIX : END_OF_LEASE_MATRIX).map(
                (row, ri) => (
                  <tr
                    key={row.size}
                    className={ri % 2 === 0 ? 'bg-cream' : 'bg-surface-muted/40'}
                  >
                    <td className="px-4 py-3 font-semibold text-charcoal">
                      {row.label}
                    </td>
                    {COVERAGE.map((c) => (
                      <td
                        key={c.slug}
                        className="px-4 py-3 text-right tabular-nums"
                      >
                        ${row.prices[c.slug]}
                      </td>
                    ))}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[4px] border border-border bg-cream">
          <ul className="divide-y divide-border">
            {(tab === 'carpet'
              ? CARPET_MATRIX
              : tab === 'upholstery'
                ? UPHOLSTERY_MATRIX
                : tab === 'tile'
                  ? TILE_GROUT_MATRIX
                  : [
                      { type: 'armchair', label: 'Leather armchair', price: 149 },
                      { type: '2-seater', label: 'Leather 2-seater', price: 219 },
                      { type: '3-seater', label: 'Leather 3-seater', price: 289 },
                      { type: 'sectional', label: 'Leather sectional', price: 389 },
                      { type: 'conditioning', label: 'Conditioning only', price: 99 },
                      { type: 'topcoat', label: 'Protective top-coat', price: 79 },
                    ]
            ).map((row) => (
              <li
                key={row.label}
                className="flex items-baseline justify-between px-5 py-4"
              >
                <span className="font-display text-[16px] font-medium text-charcoal">
                  {row.label}
                </span>
                <span className="font-display text-[20px] font-bold tabular-nums text-charcoal">
                  ${row.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Caption className="mt-3 text-charcoal/75">
        Prices include GST. Cleans run by a named, police-checked Ninja from your local team.
      </Caption>

      {/* What's included / excluded */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="border border-border rounded-[4px] p-6 bg-cream">
          <h3 className="font-display font-semibold text-[20px] text-charcoal mb-4 tracking-tight">
            What's included
          </h3>
          <ul className="space-y-3">
            {INCLUSIONS[tab].included.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 font-body text-[14.5px] text-charcoal/85 leading-snug"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-olive" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-border rounded-[4px] p-6 bg-surface-muted/60">
          <h3 className="font-display font-semibold text-[20px] text-charcoal mb-4 tracking-tight">
            What's not included
          </h3>
          <ul className="space-y-3">
            {INCLUSIONS[tab].excluded.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 font-body text-[14.5px] text-charcoal/75 leading-snug"
              >
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-charcoal/40" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button
          as={Link}
          href={`/book?service=${TABS.find((t) => t.id === tab)?.slug}`}
          variant="primary-light"
          size="lg"
        >
          Book this clean
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
        <Button
          as={Link}
          href={`/services/${TABS.find((t) => t.id === tab)?.slug}`}
          variant="secondary-light"
          size="lg"
        >
          See service detail
        </Button>
      </div>
    </div>
  )
}
