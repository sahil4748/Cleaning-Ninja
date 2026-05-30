'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Button from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { SplitText } from '@/components/motion/SplitText'
import { PRICING_TABS } from '@/content/pricing'
import { COVERAGE } from '@/content/coverage'
import { cn } from '@/lib/utils'

/**
 * PricingPreview — transparent flat-rate matrix.
 *
 * Tabbed by service category (regular vs end-of-lease). Rows are property
 * sizes, columns are cities. The competitive differentiator — competitors
 * hide pricing; we lead with it.
 */
export default function PricingPreview() {
  const [tabId, setTabId] = useState<(typeof PRICING_TABS)[number]['id']>('regular')
  const tab = PRICING_TABS.find((t) => t.id === tabId) ?? PRICING_TABS[0]
  const [cityHover, setCityHover] = useState<string | null>(null)

  return (
    <Section surface="surface-muted" spacing="default" aria-labelledby="pricing-heading" className="relative">
      <Container width="wide">
        <FadeUp>
          <div className="mb-12 grid grid-cols-1 gap-10 md:mb-16 md:grid-cols-12">
            <div className="md:col-span-7">
              <Stack gap="4">
                <Eyebrow tone="champagne" withRule>
                  Transparent pricing
                </Eyebrow>
                <Heading as="h2" id="pricing-heading" variant="display-xl" balance>
                  <SplitText>Flat rates.</SplitText>{' '}
                  <span className="text-olive"><SplitText>No nasty surprises.</SplitText></span>
                </Heading>
              </Stack>
            </div>
            <div className="md:col-span-5">
              <Body variant="body-l" className="text-charcoal/72">
                What you see is what you pay. No mystery surcharges, no quote runaround, no "depends on the day". Prices in <span className="font-semibold text-charcoal">AUD, GST included</span>.
              </Body>
            </div>
          </div>
        </FadeUp>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-[color:var(--color-border)] pb-1">
          {PRICING_TABS.map((t) => {
            const active = t.id === tabId
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTabId(t.id)}
                aria-pressed={active}
                className={cn(
                  'relative -mb-px cursor-pointer rounded-t-[6px] border border-b-0 px-5 py-3 text-[14px] font-medium tracking-[0.01em] transition-all duration-200',
                  active
                    ? 'border-[color:var(--color-border)] bg-cream text-charcoal shadow-[0_-2px_0_0_var(--color-olive)_inset]'
                    : 'border-transparent text-charcoal/55 hover:text-charcoal',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-[8px] border border-[color:var(--color-border)] bg-cream shadow-[0_24px_56px_-32px_rgba(44,44,44,0.18)]">
          <div className="overflow-x-auto">
            <AnimatePresence mode="wait">
              <motion.table
                key={tabId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.65, 0.05, 0.36, 1] }}
                className="w-full min-w-[720px] border-separate border-spacing-0 text-left"
              >
                <thead>
                  <tr className="bg-cream-warm" style={{ background: 'var(--color-surface-muted)' }}>
                    <th className="sticky left-0 z-10 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] px-5 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal/60">
                      Property size
                    </th>
                    {COVERAGE.map((city) => (
                      <th
                        key={city.slug}
                        onMouseEnter={() => setCityHover(city.slug)}
                        onMouseLeave={() => setCityHover(null)}
                        className={cn(
                          'border-b border-[color:var(--color-border)] px-4 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal/60 transition-colors',
                          cityHover === city.slug && 'text-olive',
                        )}
                      >
                        {city.city}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tab.matrix.map((row, idx) => (
                    <tr key={row.size} className={idx % 2 === 1 ? 'bg-[color:var(--color-surface-muted)]/40' : ''}>
                      <td className="sticky left-0 z-10 bg-cream px-5 py-4 text-[14.5px] font-medium text-charcoal">
                        {row.label}
                      </td>
                      {COVERAGE.map((city) => (
                        <td
                          key={city.slug}
                          onMouseEnter={() => setCityHover(city.slug)}
                          onMouseLeave={() => setCityHover(null)}
                          className={cn(
                            'border-l border-[color:var(--color-border)]/40 px-4 py-4 font-display text-[20px] font-semibold leading-none text-charcoal transition-colors duration-200',
                            cityHover === city.slug && 'bg-olive-pale text-olive-deep',
                          )}
                        >
                          ${row.prices[city.slug]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </motion.table>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer band */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            'Same cleaner every time, where you book regular.',
            '72-hour re-clean guarantee on end-of-lease.',
            'No lock-in contracts, ever.',
          ].map((line) => (
            <p key={line} className="flex items-start gap-2 text-[14px] text-charcoal/75">
              <CheckCircle className="h-4 w-4 shrink-0 text-olive" />
              {line}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <Body variant="body" className="text-charcoal/65">
            Need a price for a 6+ bed, post-build, or commercial clean?
          </Body>
          <div className="flex flex-wrap gap-3">
            <Button as={Link} href="/pricing" variant="secondary-light" data-magnetic>
              Full pricing
            </Button>
            <Button
              as={Link}
              href="/book"
              variant="primary-light"
              data-magnetic
              className="bg-olive border-olive text-cream hover:bg-olive-deep hover:border-olive-deep"
            >
              Book at this price
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
