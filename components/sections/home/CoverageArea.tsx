'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import { FadeUp } from '@/components/motion/FadeUp'
import { Stagger } from '@/components/motion/Stagger'
import { SplitText } from '@/components/motion/SplitText'
import { COVERAGE } from '@/content/coverage'
import { cn } from '@/lib/utils'

/**
 * CoverageArea — six metros + abstract Australia SVG with pulse dots.
 *
 * Hover on a city in the list lights up the matching dot. Hover on a dot
 * highlights the city in the list. Two-way bound state.
 */
export default function CoverageArea() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <Section surface="cream" spacing="default" aria-labelledby="coverage-heading" className="relative overflow-hidden">
      <Container width="wide">
        <FadeUp>
          <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <Stack gap="4">
                <Eyebrow tone="champagne" withRule>
                  Coverage
                </Eyebrow>
                <Heading as="h2" id="coverage-heading" variant="display-xl" balance>
                  <SplitText>We come to you.</SplitText>{' '}
                  <span className="text-olive"><SplitText>Six cities, 200+ suburbs.</SplitText></span>
                </Heading>
              </Stack>
            </div>
            <div className="md:col-span-5">
              <Body variant="body-l" className="text-charcoal/80 max-w-[44ch]">
                From Bondi to Burleigh, Carlton to Cottesloe — Cleaning Ninja teams operate in every major Australian metro. Pick your city for local pricing, suburb pages, and the cleaners who work near you.
              </Body>
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Australia map */}
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[8px] border border-[color:var(--color-border)] bg-cream-warm" style={{ background: 'var(--color-surface-muted)' }}>
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {/* Soft hand-drawn Australia outline */}
                <path
                  d="M14 64 Q10 56 14 48 Q12 42 16 36 Q20 30 28 28 Q34 26 40 28 Q44 30 50 28 Q56 26 64 28 Q72 30 78 36 Q82 40 86 44 Q90 50 88 58 Q86 64 84 70 Q82 76 76 78 Q70 80 62 80 Q56 82 50 84 Q44 86 38 86 Q32 88 26 86 Q20 84 18 78 Q14 72 14 64 Z"
                  fill="var(--color-cream)"
                  stroke="var(--color-olive)"
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                  opacity="0.9"
                />

                {/* Latitude lines */}
                <g stroke="var(--color-border)" strokeWidth="0.15" strokeDasharray="0.4 0.6">
                  {[35, 50, 65, 80].map((y) => (
                    <line key={y} x1="10" x2="90" y1={y} y2={y} />
                  ))}
                </g>

                {/* Dots */}
                {COVERAGE.map((city) => {
                  const isActive = active === city.slug
                  return (
                    <g
                      key={city.slug}
                      className="cursor-pointer"
                      onMouseEnter={() => setActive(city.slug)}
                      onMouseLeave={() => setActive(null)}
                    >
                      {/* Ring */}
                      <circle
                        cx={city.mapDot.x}
                        cy={city.mapDot.y}
                        r={isActive ? 4 : 2.5}
                        fill="none"
                        stroke="var(--color-olive)"
                        strokeWidth="0.4"
                        opacity={isActive ? 0.85 : 0.45}
                        style={{ transition: 'all 280ms cubic-bezier(0.65, 0.05, 0.36, 1)' }}
                      />
                      {/* Dot */}
                      <circle
                        cx={city.mapDot.x}
                        cy={city.mapDot.y}
                        r={isActive ? 1.6 : 1.2}
                        fill="var(--color-olive)"
                        style={{
                          transition: 'all 280ms cubic-bezier(0.65, 0.05, 0.36, 1)',
                          animation: 'pulseDot 2.4s ease-in-out infinite',
                          transformOrigin: `${city.mapDot.x}px ${city.mapDot.y}px`,
                        }}
                      />
                      {/* Label */}
                      <text
                        x={city.mapDot.x}
                        y={city.mapDot.y - (isActive ? 5 : 3.5)}
                        textAnchor="middle"
                        fontSize="2.4"
                        fontFamily="var(--font-display)"
                        fontWeight="600"
                        fill="var(--color-charcoal)"
                        opacity={isActive ? 1 : 0.7}
                        style={{ transition: 'all 280ms ease' }}
                      >
                        {city.city}
                      </text>
                    </g>
                  )
                })}
              </svg>

              <div className="pointer-events-none absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.16em] text-charcoal/45">
                AU · 6 metros
              </div>
            </div>
          </div>

          {/* City list */}
          <div className="lg:col-span-5">
            <Stagger gap={0.06} distance={10}>
              <ul className="flex flex-col gap-3">
                {COVERAGE.map((city) => {
                  const isActive = active === city.slug
                  return (
                    <li key={city.slug}>
                      <Link
                        href={city.href}
                        onMouseEnter={() => setActive(city.slug)}
                        onMouseLeave={() => setActive(null)}
                        data-magnetic
                        className={cn(
                          'group flex items-center justify-between rounded-[8px] border bg-cream px-5 py-4 transition-all duration-300',
                          isActive
                            ? 'border-olive shadow-[0_18px_44px_-24px_rgba(74,86,40,0.32)]'
                            : 'border-[color:var(--color-border)] hover:border-olive',
                        )}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className={cn(
                              'grid h-9 w-9 shrink-0 place-items-center rounded-full text-olive-deep transition-colors duration-300',
                              isActive ? 'bg-olive text-cream' : 'bg-olive-pale',
                            )}
                          >
                            <MapPin className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 leading-tight">
                            <div className="flex items-baseline gap-2">
                              <span className="font-display text-[18px] font-semibold tracking-[-0.015em] text-charcoal">
                                {city.city}
                              </span>
                              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-charcoal/45">
                                {city.state}
                              </span>
                            </div>
                            <p className="mt-1 truncate text-[12.5px] text-charcoal/75">
                              {city.bondTerm} · from ${city.benchmarkPrice}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight
                          className={cn(
                            'h-4 w-4 transition-all duration-200',
                            isActive ? 'text-olive translate-x-0.5 -translate-y-0.5' : 'text-charcoal/40 group-hover:text-olive',
                          )}
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Stagger>
          </div>
        </div>
      </Container>
    </Section>
  )
}
