'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Cluster from '@/components/ui/Cluster'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Caption from '@/components/ui/Caption'
import Button from '@/components/ui/Button'
import { SERVICES } from '@/content/services'
import { COVERAGE } from '@/content/coverage'
import { cn } from '@/lib/utils'

/**
 * Homepage estimator preview — three short answers, then continue to /book.
 *
 * Visual upgrade: charcoal panel on cream surface gives the form clear product
 * weight. Olive selected states, premium custom inputs, elegant floating border states.
 * Progress rail at the top. Smooth, restrained step transitions.
 */

const PROPERTY_OPTIONS = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'house', label: 'House' },
  { value: 'commercial', label: 'Commercial space' },
]

type Step = 1 | 2 | 3

export default function QuoteEstimatorPreview() {
  const [step, setStep] = useState<Step>(1)
  const [service, setService] = useState<string>('')
  const [propertyType, setPropertyType] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const reduced = useReducedMotion()

  const canContinueFromStep1 = service !== ''
  const canContinueFromStep2 = propertyType !== ''
  const canContinueFromStep3 = city !== ''

  const next = () => setStep((s) => (s < 3 ? ((s + 1) as Step) : s))
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))

  const continueHref =
    canContinueFromStep1 && canContinueFromStep2 && canContinueFromStep3
      ? `/book?service=${encodeURIComponent(service)}&property=${encodeURIComponent(propertyType)}&city=${encodeURIComponent(city)}`
      : '/book'

  const transition = reduced
    ? { duration: 0.15 }
    : { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

  return (
    <Section
      surface="surface-muted"
      spacing="default"
      aria-labelledby="estimator-heading"
      className="relative overflow-hidden"
    >
      {/* Soft olive accent on the right edge */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 hidden h-[60%] w-px -translate-y-1/2 bg-olive/30 lg:block"
      />

      <Container width="wide">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
          <div className="lg:col-span-5">
            <Stack gap="6">
              <Eyebrow tone="champagne" withRule>
                Build a quote
              </Eyebrow>
              <Heading as="h2" id="estimator-heading" variant="display-xl" balance>
                Three answers. <span className="text-olive">Real price.</span>{' '}
                <span className="block text-charcoal/65">60 seconds.</span>
              </Heading>
              <Body variant="body-l" className="text-charcoal/75 max-w-[44ch]">
                Service, property, city. You get a real flat-rate number on the next screen — not a quote-callback purgatory.
              </Body>
              <div className="border-t border-[color:var(--color-border)] pt-5">
                <Caption className="text-charcoal/60">
                  Prices shown are flat-rate, GST included. Final invoice matches the quote you book at.
                </Caption>
              </div>
            </Stack>
          </div>

          {/* Estimator panel */}
          <div className="lg:col-span-7">
            <div className="relative group">
              {/* Offset olive plate behind for depth */}
              <div
                aria-hidden="true"
                className="absolute -bottom-2.5 -right-2.5 h-full w-full bg-olive/85 transition-transform duration-300 group-hover:-bottom-3.5 group-hover:-right-3.5"
              />
              <div className="relative bg-charcoal text-cream border border-border-dark shadow-xl">
                {/* Progress rail */}
                <div className="border-b border-border-dark px-6 py-5 sm:px-9 bg-charcoal-deep/30">
                  <div className="flex items-center justify-between gap-2.5 sm:gap-4">
                    {([1, 2, 3] as const).map((n) => {
                      const labels = ['Service', 'Property', 'Region']
                      const isActive = step === n
                      const isDone = step > n
                      return (
                        <span key={n} className="flex flex-1 items-center gap-1.5 sm:gap-3">
                          <span
                            className={cn(
                              'inline-flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold leading-none transition-all duration-300 border border-white/5 shadow-inner',
                              isActive
                                ? 'bg-olive text-cream ring-4 ring-olive/25 border-olive/30'
                                : isDone
                                  ? 'bg-cream text-charcoal border-cream/50'
                                  : 'bg-charcoal-soft text-cream/55 border-charcoal-soft/50',
                            )}
                          >
                            {isDone ? <Check className="h-4 w-4" /> : n}
                          </span>
                          <span
                            className={cn(
                              'hidden font-body text-[11px] sm:text-[12px] uppercase tracking-[0.14em] font-semibold sm:inline',
                              isActive ? 'text-cream font-bold' : 'text-cream/55',
                            )}
                          >
                            {labels[n - 1]}
                          </span>
                          {n < 3 ? (
                            <span
                              aria-hidden="true"
                              className={cn(
                                'h-px flex-1 transition-colors duration-300',
                                isDone ? 'bg-olive' : 'bg-border-dark',
                              )}
                            />
                          ) : null}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {/* Step body */}
                <div className="px-7 py-8 sm:px-9 sm:py-10">
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                        transition={transition}
                      >
                        <Stack gap="6">
                          <Stack gap="2">
                            <Eyebrow tone="champagne">Step 1</Eyebrow>
                            <Heading as="h3" variant="h3" tone="bone" className="tracking-tight">
                              What surface or service?
                            </Heading>
                          </Stack>
                          <div
                            role="radiogroup"
                            aria-label="Service"
                            className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                          >
                            {SERVICES.map((s) => {
                              const checked = service === s.slug
                              return (
                                <label
                                  key={s.slug}
                                  className={cn(
                                    'group/item relative block cursor-pointer rounded-[4px] border px-5 py-4 transition-all duration-200 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-olive',
                                    checked
                                      ? 'border-olive bg-olive/15 text-cream'
                                      : 'border-border-dark bg-charcoal-soft text-cream/80 hover:border-olive/60 hover:text-cream',
                                  )}
                                >
                                  <input
                                    type="radio"
                                    name="estimator-service"
                                    value={s.slug}
                                    checked={checked}
                                    onChange={() => setService(s.slug)}
                                    className="sr-only"
                                  />
                                  <span className="font-body text-[15px] font-semibold">
                                    {s.name}
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className={cn(
                                      'absolute right-4 top-1/2 -translate-y-1/2 transition-opacity duration-200',
                                      checked ? 'opacity-100' : 'opacity-0',
                                    )}
                                  >
                                    <Check className="h-4 w-4 text-olive-soft" />
                                  </span>
                                </label>
                              )
                            })}
                          </div>
                          <Cluster gap="3" justify="end" className="pt-2">
                            <Button
                              variant="primary-dark"
                              size="md"
                              disabled={!canContinueFromStep1}
                              onClick={next}
                              className="group/btn"
                            >
                              Next
                              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />
                            </Button>
                          </Cluster>
                        </Stack>
                      </motion.div>
                    ) : null}

                    {step === 2 ? (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                        transition={transition}
                      >
                        <Stack gap="6">
                          <Stack gap="2">
                            <Eyebrow tone="champagne">Step 2</Eyebrow>
                            <Heading as="h3" variant="h3" tone="bone" className="tracking-tight">
                              What kind of property?
                            </Heading>
                          </Stack>
                          <div
                            role="radiogroup"
                            aria-label="Property type"
                            className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                          >
                            {PROPERTY_OPTIONS.map((p) => {
                              const checked = propertyType === p.value
                              return (
                                <label
                                  key={p.value}
                                  className={cn(
                                    'group/item relative block cursor-pointer rounded-[4px] border px-5 py-4 transition-all duration-200 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-olive',
                                    checked
                                      ? 'border-olive bg-olive/15 text-cream'
                                      : 'border-border-dark bg-charcoal-soft text-cream/80 hover:border-olive/60 hover:text-cream',
                                  )}
                                >
                                  <input
                                    type="radio"
                                    name="estimator-property"
                                    value={p.value}
                                    checked={checked}
                                    onChange={() => setPropertyType(p.value)}
                                    className="sr-only"
                                  />
                                  <span className="font-body text-[15px] font-semibold">
                                    {p.label}
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className={cn(
                                      'absolute right-4 top-1/2 -translate-y-1/2 transition-opacity duration-200',
                                      checked ? 'opacity-100' : 'opacity-0',
                                    )}
                                  >
                                    <Check className="h-4 w-4 text-olive-soft" />
                                  </span>
                                </label>
                              )
                            })}
                          </div>
                          <Cluster gap="3" justify="between" className="pt-2">
                            <Button variant="secondary-dark" size="md" onClick={back} className="group/back">
                              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover/back:-translate-x-0.5" aria-hidden="true" />
                              Back
                            </Button>
                            <Button
                              variant="primary-dark"
                              size="md"
                              disabled={!canContinueFromStep2}
                              onClick={next}
                              className="group/btn"
                            >
                              Next
                              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />
                            </Button>
                          </Cluster>
                        </Stack>
                      </motion.div>
                    ) : null}

                    {step === 3 ? (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                        transition={transition}
                      >
                        <Stack gap="6">
                          <Stack gap="2">
                            <Eyebrow tone="champagne">Step 3</Eyebrow>
                            <Heading as="h3" variant="h3" tone="bone">
                              Which Australian city?
                            </Heading>
                          </Stack>
                          <div
                            role="radiogroup"
                            aria-label="Region"
                            className="grid grid-cols-1 gap-2.5 sm:grid-cols-3"
                          >
                            {COVERAGE.map((c) => {
                              const checked = city === c.slug
                              return (
                                <label
                                  key={c.slug}
                                  className={cn(
                                    'group/item relative block cursor-pointer rounded-[4px] border px-5 py-4 transition-all duration-200 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-olive',
                                    checked
                                      ? 'border-olive bg-olive/15 text-cream'
                                      : 'border-border-dark bg-charcoal-soft text-cream/80 hover:border-olive/60 hover:text-cream',
                                  )}
                                >
                                  <input
                                    type="radio"
                                    name="estimator-city"
                                    value={c.slug}
                                    checked={checked}
                                    onChange={() => setCity(c.slug)}
                                    className="sr-only"
                                  />
                                  <span className="font-body text-[15px] font-semibold">
                                    {c.city}
                                  </span>
                                </label>
                              )
                            })}
                          </div>
                          <Caption className="text-cream/55 leading-relaxed">
                            Outside these regions? Send a request anyway — we'll let
                            you know if we can help.
                          </Caption>
                          <Cluster gap="3" justify="between" className="pt-2">
                            <Button variant="secondary-dark" size="md" onClick={back} className="group/back">
                              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover/back:-translate-x-0.5" aria-hidden="true" />
                              Back
                            </Button>
                            <Button
                              as={Link}
                              href={continueHref}
                              variant="primary-dark"
                              size="md"
                              aria-disabled={!canContinueFromStep3}
                              className={cn(
                                !canContinueFromStep3 && 'pointer-events-none opacity-40',
                                'group/btn'
                              )}
                            >
                              Continue to build your quote
                              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />
                            </Button>
                          </Cluster>
                        </Stack>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
