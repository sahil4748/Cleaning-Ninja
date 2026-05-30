'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
  User,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import Caption from '@/components/ui/Caption'
import Eyebrow from '@/components/ui/Eyebrow'
import { SERVICES, AUXILIARY_SERVICES } from '@/content/services'
import { COVERAGE, suburbSlug } from '@/content/coverage'
import { TEAM } from '@/content/team'
import {
  REGULAR_CLEAN_MATRIX,
  END_OF_LEASE_MATRIX,
  PropertySize,
} from '@/content/pricing'
import { BUSINESS } from '@/content/navigation'
import { cn } from '@/lib/utils'

/** Combined service catalogue for the picker. */
const ALL_SERVICES = [
  ...SERVICES.map((s) => ({
    slug: s.slug,
    name: s.name,
    tagline: s.tagline,
    fromPrice: s.fromPrice,
  })),
  ...AUXILIARY_SERVICES.map((s) => ({
    slug: s.slug,
    name: s.name,
    tagline: s.tagline,
    fromPrice: s.fromPrice,
  })),
]

const PROPERTY_SIZES: Array<{ size: PropertySize; label: string; rooms: string }> = [
  { size: '1br1ba', label: 'Studio / 1 bed', rooms: '1 bed · 1 bath' },
  { size: '2br1ba', label: '2 bed · 1 bath', rooms: 'Apartment / unit' },
  { size: '2br2ba', label: '2 bed · 2 bath', rooms: 'Apartment / townhouse' },
  { size: '3br2ba', label: '3 bed · 2 bath', rooms: 'Family home' },
  { size: '4br2ba', label: '4 bed · 2 bath', rooms: 'Larger home' },
  { size: '5br3ba', label: '5+ bed', rooms: 'Big house / estate' },
]

const TIME_SLOTS = ['8:00am', '9:00am', '10:00am', '11:00am', '12:30pm', '2:00pm', '3:30pm']

interface BookingState {
  serviceSlug: string
  size: PropertySize | ''
  city: string
  suburb: string
  date: string
  time: string
  cleanerId: string | 'any'
  name: string
  email: string
  phone: string
  address: string
  notes: string
}

const initialState = (defaults: {
  service?: string
  city?: string
  suburb?: string
}): BookingState => ({
  serviceSlug: defaults.service ?? '',
  size: '',
  city: defaults.city ?? '',
  suburb: defaults.suburb ?? '',
  date: '',
  time: '',
  cleanerId: 'any',
  name: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
})

interface BookingFlowProps {
  defaults: { service?: string; city?: string; suburb?: string }
}

export function BookingFlow({ defaults }: BookingFlowProps) {
  const [step, setStep] = useState(1)
  const [state, setState] = useState<BookingState>(() => initialState(defaults))
  const [submitting, setSubmitting] = useState(false)
  const [reference, setReference] = useState<string | null>(null)

  // Auto-advance: if a service slug was provided in the URL, skip to step 2.
  useEffect(() => {
    if (defaults.service && step === 1 && state.serviceSlug) {
      setStep(2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalSteps = 7

  const service = ALL_SERVICES.find((s) => s.slug === state.serviceSlug)
  const cityData = COVERAGE.find((c) => c.slug === state.city)

  const estimatedPrice = useMemo(() => {
    if (!service) return 0
    if (state.serviceSlug === 'end-of-lease-cleaning' && state.size && state.city) {
      const row = END_OF_LEASE_MATRIX.find((r) => r.size === state.size)
      return row?.prices[state.city] ?? service.fromPrice
    }
    if (state.serviceSlug === 'regular-home' && state.size && state.city) {
      const row = REGULAR_CLEAN_MATRIX.find((r) => r.size === state.size)
      return row?.prices[state.city] ?? service.fromPrice
    }
    return service.fromPrice
  }, [service, state.serviceSlug, state.size, state.city])

  const cityTeam = useMemo(() => {
    if (!cityData) return TEAM
    return TEAM.filter(
      (t) =>
        t.city === cityData.city ||
        t.cityCovered.some((s) => cityData.suburbs.includes(s)),
    )
  }, [cityData])

  // Validation per step.
  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return !!state.serviceSlug
      case 2:
        return !!state.size
      case 3:
        return !!state.city && !!state.suburb
      case 4:
        return !!state.date && !!state.time
      case 5:
        return !!state.cleanerId
      case 6:
        return (
          state.name.length >= 2 &&
          /^\S+@\S+\.\S+$/.test(state.email) &&
          state.phone.length >= 8 &&
          state.address.length >= 5
        )
      case 7:
        return true
      default:
        return false
    }
  }, [step, state])

  const next = () => {
    if (canProceed && step < totalSteps) setStep(step + 1)
  }
  const back = () => {
    if (step > 1) setStep(step - 1)
  }

  const submit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    const ref = `CN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    setReference(ref)
    setSubmitting(false)
  }

  // Success screen.
  if (reference) {
    return <SuccessScreen reference={reference} state={state} price={estimatedPrice} />
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Main flow */}
      <div className="lg:col-span-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <Caption className="font-body text-charcoal/75 uppercase tracking-widest">
              Step {step} of {totalSteps}
            </Caption>
            <Caption className="font-body text-charcoal/75">
              {Math.round((step / totalSteps) * 100)}% complete
            </Caption>
          </div>
          <div className="relative h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-olive"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ type: 'spring', stiffness: 160, damping: 24 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border border-border bg-cream rounded-[4px] p-6 sm:p-8 lg:p-10 min-h-[420px]"
          >
            {step === 1 && (
              <ServiceStep
                value={state.serviceSlug}
                onChange={(slug) => setState({ ...state, serviceSlug: slug })}
              />
            )}
            {step === 2 && (
              <SizeStep
                serviceSlug={state.serviceSlug}
                value={state.size}
                onChange={(size) => setState({ ...state, size })}
              />
            )}
            {step === 3 && (
              <LocationStep
                city={state.city}
                suburb={state.suburb}
                onCity={(city) => setState({ ...state, city, suburb: '' })}
                onSuburb={(suburb) => setState({ ...state, suburb })}
              />
            )}
            {step === 4 && (
              <DateStep
                date={state.date}
                time={state.time}
                onDate={(date) => setState({ ...state, date })}
                onTime={(time) => setState({ ...state, time })}
              />
            )}
            {step === 5 && (
              <CleanerStep
                cleaners={cityTeam}
                value={state.cleanerId}
                onChange={(cleanerId) => setState({ ...state, cleanerId })}
              />
            )}
            {step === 6 && (
              <ContactStep state={state} setState={setState} />
            )}
            {step === 7 && (
              <SummaryStep state={state} estimatedPrice={estimatedPrice} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            type="button"
            variant="quiet-link"
            onClick={back}
            disabled={step === 1}
            className={step === 1 ? 'invisible' : ''}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          {step < totalSteps ? (
            <Button
              type="button"
              variant="primary-light"
              size="lg"
              onClick={next}
              disabled={!canProceed}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary-light"
              size="lg"
              onClick={submit}
              disabled={submitting || !canProceed}
            >
              {submitting ? 'Booking...' : 'Confirm booking'}
              <Check className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <BookingSummary state={state} estimatedPrice={estimatedPrice} />
        </div>
      </aside>
    </div>
  )
}

/* ------------------------------ STEP 1 ------------------------------ */
function ServiceStep({
  value,
  onChange,
}: {
  value: string
  onChange: (slug: string) => void
}) {
  return (
    <div>
      <Eyebrow tone="champagne">Step 1 · Service</Eyebrow>
      <h2 className="font-display font-semibold text-[28px] sm:text-[34px] text-charcoal tracking-tight mt-3 mb-2 leading-tight">
        What needs cleaning?
      </h2>
      <p className="font-body text-[16px] text-charcoal/75 mb-8 leading-relaxed">
        Pick the closest match — if it's a combination job (e.g. end-of-lease + carpet),
        choose the headline service and add notes at the end.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ALL_SERVICES.map((s) => {
          const active = value === s.slug
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => onChange(s.slug)}
              aria-pressed={active}
              className={cn(
                'group text-left border rounded-[4px] p-5 transition-colors cursor-pointer',
                active
                  ? 'border-olive bg-olive-pale/40'
                  : 'border-border bg-cream hover:border-olive',
              )}
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-display font-semibold text-[17px] text-charcoal tracking-tight">
                  {s.name}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-charcoal/75">
                  From ${s.fromPrice}
                </span>
              </div>
              <p className="font-body text-[13.5px] text-charcoal/75 leading-snug">
                {s.tagline}
              </p>
              {active ? (
                <div className="mt-3 inline-flex items-center gap-1 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-olive">
                  <Check className="h-3.5 w-3.5" /> Selected
                </div>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------ STEP 2 ------------------------------ */
function SizeStep({
  serviceSlug,
  value,
  onChange,
}: {
  serviceSlug: string
  value: PropertySize | ''
  onChange: (s: PropertySize) => void
}) {
  const isPriceDriven =
    serviceSlug === 'end-of-lease-cleaning' || serviceSlug === 'regular-home'

  return (
    <div>
      <Eyebrow tone="champagne">Step 2 · Size</Eyebrow>
      <h2 className="font-display font-semibold text-[28px] sm:text-[34px] text-charcoal tracking-tight mt-3 mb-2 leading-tight">
        How big is the property?
      </h2>
      <p className="font-body text-[16px] text-charcoal/75 mb-8 leading-relaxed">
        {isPriceDriven
          ? 'Bedrooms × bathrooms determine the flat-rate price. Pick the closest match.'
          : 'Size helps us schedule — the price for this service is per room/piece/m², not per property.'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PROPERTY_SIZES.map((p) => {
          const active = value === p.size
          return (
            <button
              key={p.size}
              type="button"
              onClick={() => onChange(p.size)}
              aria-pressed={active}
              className={cn(
                'text-left border rounded-[4px] p-4 transition-colors cursor-pointer',
                active
                  ? 'border-olive bg-olive-pale/40'
                  : 'border-border bg-cream hover:border-olive',
              )}
            >
              <p className="font-display font-semibold text-[17px] text-charcoal tracking-tight">
                {p.label}
              </p>
              <p className="font-body text-[12.5px] text-charcoal/75 mt-1">
                {p.rooms}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------ STEP 3 ------------------------------ */
function LocationStep({
  city,
  suburb,
  onCity,
  onSuburb,
}: {
  city: string
  suburb: string
  onCity: (c: string) => void
  onSuburb: (s: string) => void
}) {
  const cityData = COVERAGE.find((c) => c.slug === city)
  const [suburbInput, setSuburbInput] = useState(suburb)

  useEffect(() => {
    setSuburbInput(suburb)
  }, [suburb])

  const matches = useMemo(() => {
    if (!cityData || !suburbInput) return []
    return cityData.suburbs
      .filter((s) => s.toLowerCase().includes(suburbInput.toLowerCase()))
      .slice(0, 6)
  }, [cityData, suburbInput])

  return (
    <div>
      <Eyebrow tone="champagne">Step 3 · Where</Eyebrow>
      <h2 className="font-display font-semibold text-[28px] sm:text-[34px] text-charcoal tracking-tight mt-3 mb-2 leading-tight">
        Which city and suburb?
      </h2>
      <p className="font-body text-[16px] text-charcoal/75 mb-8 leading-relaxed">
        We cover six metros and hundreds of suburbs across them. Type to filter.
      </p>

      <div className="space-y-6">
        <div>
          <Caption className="font-body text-charcoal/75 uppercase tracking-widest mb-3">
            City
          </Caption>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {COVERAGE.map((c) => {
              const active = city === c.slug
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => onCity(c.slug)}
                  className={cn(
                    'text-left border rounded-[4px] p-3 transition-colors cursor-pointer',
                    active
                      ? 'border-olive bg-olive-pale/40'
                      : 'border-border bg-cream hover:border-olive',
                  )}
                >
                  <p className="font-display font-semibold text-[15px] text-charcoal tracking-tight">
                    {c.city}
                  </p>
                  <Caption className="font-body text-charcoal/75 mt-0.5">
                    {c.state} · {c.suburbs.length} suburbs
                  </Caption>
                </button>
              )
            })}
          </div>
        </div>

        {cityData ? (
          <div>
            <Caption className="font-body text-charcoal/75 uppercase tracking-widest mb-3">
              Suburb
            </Caption>
            <div className="relative">
              <input
                type="text"
                value={suburbInput}
                onChange={(e) => setSuburbInput(e.target.value)}
                placeholder="Start typing your suburb..."
                className="h-13 w-full bg-cream border border-border rounded-[4px] px-4 font-body text-[16px] text-charcoal focus:outline-none focus:border-olive transition-colors"
              />
              {suburbInput && matches.length > 0 && suburb !== suburbInput ? (
                <ul className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-cream border border-border rounded-[4px] shadow-lg z-10">
                  {matches.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => {
                          onSuburb(s)
                          setSuburbInput(s)
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-olive-pale/30 font-body text-[14px] text-charcoal cursor-pointer"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {suburb ? (
              <p className="mt-3 inline-flex items-center gap-1.5 font-body text-[13px] text-olive">
                <Check className="h-3.5 w-3.5" /> {suburb}, {cityData.city}
              </p>
            ) : (
              <p className="mt-3 font-body text-[13px] text-charcoal/75">
                Or pick from popular: {cityData.suburbs.slice(0, 5).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      onSuburb(s)
                      setSuburbInput(s)
                    }}
                    className="text-olive hover:text-olive-deep transition-colors mx-1 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/* ------------------------------ STEP 4 ------------------------------ */
function DateStep({
  date,
  time,
  onDate,
  onTime,
}: {
  date: string
  time: string
  onDate: (d: string) => void
  onTime: (t: string) => void
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date(today)
    d.setDate(1)
    return d
  })

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate()
  const firstWeekday = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay()

  const monthLabel = viewMonth.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })

  const pickDate = (day: number) => {
    const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)
    if (d < today) return
    onDate(d.toISOString().slice(0, 10))
  }

  const navigateMonth = (delta: number) => {
    const next = new Date(viewMonth)
    next.setMonth(next.getMonth() + delta)
    setViewMonth(next)
  }

  return (
    <div>
      <Eyebrow tone="champagne">Step 4 · When</Eyebrow>
      <h2 className="font-display font-semibold text-[28px] sm:text-[34px] text-charcoal tracking-tight mt-3 mb-2 leading-tight">
        Pick a date and time.
      </h2>
      <p className="font-body text-[16px] text-charcoal/75 mb-8 leading-relaxed">
        Same-day bookings still possible — just call us. For online booking, choose any
        date from tomorrow.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-2 border border-border rounded-[4px] hover:border-olive transition-colors cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4 text-charcoal" />
            </button>
            <p className="font-display font-semibold text-[18px] text-charcoal tracking-tight">
              {monthLabel}
            </p>
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-2 border border-border rounded-[4px] hover:border-olive transition-colors cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4 text-charcoal" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div
                key={i}
                className="font-body text-[11px] uppercase tracking-widest text-charcoal/45 text-center py-1"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)
              const isPast = d < today
              const dStr = d.toISOString().slice(0, 10)
              const selected = date === dStr
              const isToday = dStr === today.toISOString().slice(0, 10)

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => pickDate(day)}
                  disabled={isPast}
                  className={cn(
                    'aspect-square rounded-[4px] font-body text-[14px] transition-colors',
                    isPast && 'text-charcoal/25 cursor-not-allowed',
                    !isPast && !selected && 'text-charcoal hover:bg-olive-pale/40 cursor-pointer',
                    selected && 'bg-olive text-cream font-semibold cursor-pointer',
                    isToday && !selected && 'border border-olive',
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* Time slots */}
        <div>
          <Caption className="font-body text-charcoal/75 uppercase tracking-widest mb-4">
            {date ? 'Arrival window' : 'Select a date first'}
          </Caption>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((t) => {
              const active = time === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTime(t)}
                  disabled={!date}
                  className={cn(
                    'border rounded-[4px] py-3 font-display font-medium text-[14px] tracking-tight transition-colors',
                    !date && 'text-charcoal/30 cursor-not-allowed',
                    date && active && 'border-olive-deep bg-olive-deep text-cream cursor-pointer',
                    date && !active && 'border-border bg-cream text-charcoal hover:border-olive cursor-pointer',
                  )}
                >
                  {t}
                </button>
              )
            })}
          </div>
          {date && time ? (
            <p className="mt-4 inline-flex items-center gap-1.5 font-body text-[13px] text-olive">
              <Check className="h-3.5 w-3.5" />
              {new Date(date).toLocaleDateString('en-AU', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
              {' · '}
              {time}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ STEP 5 ------------------------------ */
function CleanerStep({
  cleaners,
  value,
  onChange,
}: {
  cleaners: typeof TEAM
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div>
      <Eyebrow tone="champagne">Step 5 · Your Ninja</Eyebrow>
      <h2 className="font-display font-semibold text-[28px] sm:text-[34px] text-charcoal tracking-tight mt-3 mb-2 leading-tight">
        Pick a Ninja.
      </h2>
      <p className="font-body text-[16px] text-charcoal/75 mb-8 leading-relaxed">
        Or let us auto-assign the best fit for your suburb and job — we send a senior cleaner with the matching specialty.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange('any')}
          className={cn(
            'text-left border rounded-[4px] p-5 transition-colors cursor-pointer',
            value === 'any'
              ? 'border-olive bg-olive-pale/40'
              : 'border-border bg-cream hover:border-olive',
          )}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-olive-pale">
              <Sparkles className="h-5 w-5 text-olive-deep" />
            </div>
            <div>
              <p className="font-display font-semibold text-[16px] text-charcoal tracking-tight">
                Auto-assign
              </p>
              <Caption className="font-body text-charcoal/75">Recommended</Caption>
            </div>
          </div>
          <p className="font-body text-[13.5px] text-charcoal/75 leading-relaxed">
            We pick the senior cleaner in your suburb with the right specialty.
          </p>
        </button>

        {cleaners.map((m) => {
          const active = value === m.id
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              className={cn(
                'text-left border rounded-[4px] p-5 transition-colors cursor-pointer',
                active
                  ? 'border-olive bg-olive-pale/40'
                  : 'border-border bg-cream hover:border-olive',
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-charcoal-soft flex-shrink-0">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-display font-semibold text-[16px] text-charcoal tracking-tight">
                    {m.name}
                  </p>
                  <Caption className="font-body text-charcoal/75">
                    {m.role} · {m.yearsWithUs}y
                  </Caption>
                </div>
              </div>
              <p className="font-body text-[13px] text-charcoal/75 leading-snug">
                {m.specialty}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------ STEP 6 ------------------------------ */
function ContactStep({
  state,
  setState,
}: {
  state: BookingState
  setState: (s: BookingState) => void
}) {
  return (
    <div>
      <Eyebrow tone="champagne">Step 6 · Your details</Eyebrow>
      <h2 className="font-display font-semibold text-[28px] sm:text-[34px] text-charcoal tracking-tight mt-3 mb-2 leading-tight">
        Who do we contact?
      </h2>
      <p className="font-body text-[16px] text-charcoal/75 mb-8 leading-relaxed">
        We send SMS confirmation and arrival ETA on the day. We do not share these details with anyone outside the assigned Ninja.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Full name"
          placeholder="Jane Singh"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="jane@email.com"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="04XX XXX XXX"
          value={state.phone}
          onChange={(e) => setState({ ...state, phone: e.target.value })}
        />
        <Input
          label="Property address"
          placeholder="e.g. 14 Smith St"
          value={state.address}
          onChange={(e) => setState({ ...state, address: e.target.value })}
        />
      </div>

      <div className="mt-6">
        <Textarea
          label="Notes (optional)"
          placeholder="Access codes, dog at home, anything we should know."
          rows={4}
          value={state.notes}
          onChange={(e) => setState({ ...state, notes: e.target.value })}
        />
      </div>
    </div>
  )
}

/* ------------------------------ STEP 7 ------------------------------ */
function SummaryStep({
  state,
  estimatedPrice,
}: {
  state: BookingState
  estimatedPrice: number
}) {
  const service = ALL_SERVICES.find((s) => s.slug === state.serviceSlug)
  const city = COVERAGE.find((c) => c.slug === state.city)
  const cleaner = state.cleanerId === 'any' ? null : TEAM.find((t) => t.id === state.cleanerId)
  const size = PROPERTY_SIZES.find((p) => p.size === state.size)

  return (
    <div>
      <Eyebrow tone="champagne">Step 7 · Confirm</Eyebrow>
      <h2 className="font-display font-semibold text-[28px] sm:text-[34px] text-charcoal tracking-tight mt-3 mb-2 leading-tight">
        Looks right?
      </h2>
      <p className="font-body text-[16px] text-charcoal/75 mb-8 leading-relaxed">
        Final check. The price below is your real, GST-inclusive booking total.
      </p>

      <dl className="divide-y divide-border border border-border rounded-[4px] bg-surface-muted/40">
        {[
          { label: 'Service', value: service?.name },
          { label: 'Property size', value: size?.label },
          {
            label: 'Location',
            value: city ? `${state.suburb}, ${city.city}` : '—',
          },
          {
            label: 'Date and time',
            value: state.date
              ? `${new Date(state.date).toLocaleDateString('en-AU', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })} at ${state.time}`
              : '—',
          },
          { label: 'Cleaner', value: cleaner ? cleaner.name : 'Auto-assigned' },
          { label: 'Name', value: state.name },
          { label: 'Email', value: state.email },
          { label: 'Phone', value: state.phone },
          { label: 'Address', value: state.address },
          ...(state.notes ? [{ label: 'Notes', value: state.notes }] : []),
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-6 px-5 py-4"
          >
            <dt className="font-body text-[12px] uppercase tracking-widest text-charcoal/75 flex-shrink-0">
              {row.label}
            </dt>
            <dd className="font-display text-[15px] text-charcoal text-right">
              {row.value}
            </dd>
          </div>
        ))}

        <div className="flex items-baseline justify-between px-5 py-5 bg-cream">
          <dt className="font-display font-semibold text-[16px] text-charcoal">
            Booking total
          </dt>
          <dd className="font-display font-bold text-[32px] text-charcoal tracking-tight tabular-nums">
            ${estimatedPrice}
          </dd>
        </div>
      </dl>

      <p className="mt-4 font-body text-[13px] text-charcoal/75 leading-relaxed">
        By confirming you agree to the{' '}
        <Link href="/legal/terms" className="text-olive underline decoration-olive-deep">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/legal/privacy"
          className="text-olive underline decoration-olive-deep"
        >
          Privacy Policy
        </Link>
        . Payment is taken on the day the work is completed, via Stripe. Cancel
        24+ hours ahead for no fee.
      </p>
    </div>
  )
}

/* --------------------------- SIDEBAR --------------------------- */
function BookingSummary({
  state,
  estimatedPrice,
}: {
  state: BookingState
  estimatedPrice: number
}) {
  const service = ALL_SERVICES.find((s) => s.slug === state.serviceSlug)
  const city = COVERAGE.find((c) => c.slug === state.city)

  return (
    <div className="border border-border bg-cream rounded-[4px] p-6 space-y-5">
      <Caption className="font-body text-charcoal/75 uppercase tracking-widest">
        Your booking
      </Caption>

      <div className="space-y-3 text-[14px] font-body text-charcoal/85">
        {service ? (
          <div className="flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-olive flex-shrink-0 mt-0.5" />
            <span>{service.name}</span>
          </div>
        ) : (
          <p className="text-charcoal/45 italic">Service: not yet picked</p>
        )}
        {state.size ? (
          <div className="flex items-start gap-2.5">
            <User className="h-4 w-4 text-olive flex-shrink-0 mt-0.5" />
            <span>{PROPERTY_SIZES.find((p) => p.size === state.size)?.label}</span>
          </div>
        ) : null}
        {city ? (
          <div className="flex items-start gap-2.5">
            <MapPin className="h-4 w-4 text-olive flex-shrink-0 mt-0.5" />
            <span>
              {state.suburb || 'Suburb pending'}
              {state.suburb ? ',' : ''} {city.city}
            </span>
          </div>
        ) : null}
        {state.date ? (
          <div className="flex items-start gap-2.5">
            <CalendarIcon className="h-4 w-4 text-olive flex-shrink-0 mt-0.5" />
            <span>
              {new Date(state.date).toLocaleDateString('en-AU', {
                day: 'numeric',
                month: 'short',
              })}
              {state.time ? ` · ${state.time}` : ''}
            </span>
          </div>
        ) : null}
      </div>

      {service ? (
        <div className="pt-5 border-t border-border">
          <p className="font-body text-[12px] uppercase tracking-widest text-charcoal/75 mb-1">
            {state.size && state.city ? 'Booking total' : 'Estimated from'}
          </p>
          <p className="font-display font-bold text-[36px] text-charcoal tracking-tight tabular-nums">
            ${estimatedPrice}
          </p>
          <Caption className="font-body text-charcoal/75 mt-1">
            GST included. No surprise charges.
          </Caption>
        </div>
      ) : null}

      <div className="pt-5 border-t border-border space-y-2 font-body text-[13px] text-charcoal/75">
        <div className="flex items-start gap-2">
          <Check className="h-3.5 w-3.5 text-olive flex-shrink-0 mt-1" />
          <span>Police-checked, insured Ninja</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="h-3.5 w-3.5 text-olive flex-shrink-0 mt-1" />
          <span>SMS confirmation + arrival ETA</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="h-3.5 w-3.5 text-olive flex-shrink-0 mt-1" />
          <span>Free cancellation 24h+ ahead</span>
        </div>
      </div>

      <p className="font-body text-[12px] text-charcoal/75 leading-relaxed pt-3 border-t border-border">
        Need a hand? Ring{' '}
        <a
          href={`tel:${BUSINESS.phoneRaw}`}
          className="text-olive underline decoration-olive-deep"
        >
          {BUSINESS.phone}
        </a>
      </p>
    </div>
  )
}

/* --------------------------- SUCCESS --------------------------- */
function SuccessScreen({
  reference,
  state,
  price,
}: {
  reference: string
  state: BookingState
  price: number
}) {
  const service = ALL_SERVICES.find((s) => s.slug === state.serviceSlug)
  const city = COVERAGE.find((c) => c.slug === state.city)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto border border-olive bg-cream rounded-[4px] p-8 sm:p-12 text-center"
    >
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-olive-pale mb-6">
        <CheckCircle className="h-8 w-8 text-olive-deep" />
      </div>
      <Eyebrow tone="champagne" withRule>
        Booking confirmed
      </Eyebrow>
      <h2 className="font-display font-semibold text-[36px] sm:text-[44px] text-charcoal tracking-tight mt-4 mb-4 leading-tight">
        You're booked in.
      </h2>
      <p className="font-body text-[16px] text-charcoal/75 leading-relaxed max-w-md mx-auto">
        Confirmation SMS has gone to <strong>{state.phone}</strong> and email to{' '}
        <strong>{state.email}</strong>. We send the arrival ETA on the morning of
        the booking.
      </p>

      <div className="mt-8 border border-border bg-surface-muted/40 rounded-[4px] p-5">
        <Caption className="font-body text-charcoal/75 uppercase tracking-widest mb-1">
          Booking reference
        </Caption>
        <p className="font-display font-bold text-[28px] text-charcoal tracking-tight tabular-nums">
          {reference}
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-left">
        {[
          { label: 'Service', value: service?.name },
          { label: 'Total', value: `$${price}` },
          {
            label: 'Date',
            value: state.date
              ? new Date(state.date).toLocaleDateString('en-AU', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })
              : '—',
          },
          { label: 'Time', value: state.time },
          {
            label: 'Address',
            value: `${state.address}, ${state.suburb}, ${city?.city ?? ''}`,
          },
          {
            label: 'Cleaner',
            value: state.cleanerId === 'any' ? 'Auto-assigned' : TEAM.find((t) => t.id === state.cleanerId)?.name,
          },
        ].map((row) => (
          <div key={row.label}>
            <Caption className="font-body text-charcoal/75 uppercase tracking-widest">
              {row.label}
            </Caption>
            <p className="font-display text-[15px] text-charcoal mt-0.5">
              {row.value}
            </p>
          </div>
        ))}
      </dl>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button as={Link} href="/" variant="primary-light">
          Back to home
        </Button>
        <Button as={Link} href="/journal" variant="secondary-light">
          Read the journal
        </Button>
      </div>

      <p className="mt-8 font-body text-[12px] text-charcoal/75 leading-relaxed">
        Need to make changes? Ring{' '}
        <a
          href={`tel:${BUSINESS.phoneRaw}`}
          className="text-olive underline decoration-olive-deep"
        >
          {BUSINESS.phone}
        </a>{' '}
        or quote <strong>{reference}</strong> in any email.
      </p>
    </motion.div>
  )
}
