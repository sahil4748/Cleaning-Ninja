'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { BUSINESS_CONFIG } from '@/content/business-config'
import { LeadSchema } from '@/lib/lead-contract'
import { submitLead } from '@/lib/platform/lead-client'

type Selection = {
  service: string
  serviceName: string
  packageName: string
}

type Props = {
  selection: Selection
  onReset: () => void
  resetKey: number
  onBusyChange?: (busy: boolean) => void
}

const fieldIds: Record<string, string> = {
  name: 'cp-name',
  phone: 'cp-phone',
  suburbOrAddress: 'cp-suburb',
  email: 'cp-email',
  date: 'cp-date',
  description: 'cp-details',
}

export default function QuoteForm({ selection, onReset, resetKey, onBusyChange }: Props) {
  const form = useRef<HTMLFormElement>(null)
  const serviceSummary = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const attempt = useRef<{ payload: string; key: string } | null>(null)
  const inFlight = useRef(false)
  const previousResetKey = useRef(resetKey)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [status, setStatus] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  // A new quote CTA starts another enquiry only after the previous one was accepted.
  useEffect(() => {
    if (previousResetKey.current === resetKey) return
    previousResetKey.current = resetKey
    if (!accepted) return
    const frame = requestAnimationFrame(() => {
      form.current?.reset()
      attempt.current = null
      setErrors({})
      setStatus('')
      setAccepted(false)
    })
    return () => cancelAnimationFrame(frame)
  }, [resetKey, accepted])

  function clearError(name: string) {
    if (!errors[name]) return
    setErrors(previous => {
      const next = { ...previous }
      delete next[name]
      return next
    })
  }

  function startAnother() {
    form.current?.reset()
    attempt.current = null
    setErrors({})
    setStatus('')
    setAccepted(false)
    requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>('#cp-name')?.focus())
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ready || inFlight.current || accepted) return

    const data = new FormData(event.currentTarget)
    const date = String(data.get('date') || '')
    const details = String(data.get('description') || '').trim()
    const description = [
      `Service: ${selection.serviceName}`,
      selection.packageName ? `Selected package: ${selection.packageName}` : '',
      details,
    ].filter(Boolean).join('\n')
    const parsed = LeadSchema.safeParse({
      schemaVersion: 1,
      leadSource: 'service-page',
      sourcePage: '/services/carpet-cleaning',
      channel: 'website',
      intent: date ? 'booking' : 'quote',
      service: selection.service,
      name: String(data.get('name') || ''),
      phone: String(data.get('phone') || ''),
      suburbOrAddress: String(data.get('suburbOrAddress') || ''),
      email: String(data.get('email') || '').trim(),
      description,
      consent: { purpose: 'enquiry-contact', granted: true, noticeVersion: 'enquiry-2026-09-27' },
      ...(date ? { preferredDateTime: { date, timeZone: 'Australia/Brisbane' } } : {}),
    })

    const nextErrors: Record<string, string> = {}
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] === 'preferredDateTime' ? 'date' : String(issue.path[0])
        if (!nextErrors[field]) nextErrors[field] = field === 'email' ? 'Enter a valid email address.' : issue.message
      }
    }
    if (!selection.service) nextErrors.service = 'Choose a service before requesting a quote.'
    setErrors(nextErrors)
    setStatus('')
    if (Object.keys(nextErrors).length) {
      const first = ['name', 'phone', 'suburbOrAddress', 'email', 'date', 'description'].find(field => nextErrors[field])
      requestAnimationFrame(() => {
        if (first) form.current?.querySelector<HTMLElement>(`#${fieldIds[first]}`)?.focus()
        else serviceSummary.current?.focus()
      })
      return
    }
    if (!parsed.success) return

    inFlight.current = true
    setBusy(true)
    onBusyChange?.(true)
    try {
      const payload = JSON.stringify(parsed.data)
      if (attempt.current?.payload !== payload) attempt.current = { payload, key: crypto.randomUUID() }
      const result = await submitLead(parsed.data, attempt.current.key, String(data.get('website') || ''))
      if (result.status === 'accepted') {
        setAccepted(true)
        setStatus("We've received your quote request. Cleaning Ninja will contact you about your enquiry. This is not a confirmed booking.")
      } else {
        setStatus(`Your request has not been sent. Your details remain in the form. Try again or email ${BUSINESS_CONFIG.primaryEmail}.`)
      }
    } catch {
      setStatus(`We could not confirm receipt. Your details remain in the form. Retry safely with the same details, or email ${BUSINESS_CONFIG.primaryEmail}.`)
    } finally {
      inFlight.current = false
      setBusy(false)
      onBusyChange?.(false)
      requestAnimationFrame(() => statusRef.current?.focus())
    }
  }

  function fieldProps(name: string, hint?: string) {
    const describedBy = [hint, errors[name] ? `${fieldIds[name]}-error` : ''].filter(Boolean).join(' ')
    return {
      disabled: busy || accepted,
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': describedBy || undefined,
      onChange: () => clearError(name),
    }
  }

  function error(name: string) {
    return errors[name] ? <span className="cp-field-error" id={`${fieldIds[name] || 'cp-service'}-error`}>{errors[name]}</span> : null
  }

  return (
    <form ref={form} className="cp-form" method="post" action="/api/quote" noValidate onSubmit={submit} aria-labelledby="cp-form-title" aria-busy={busy}>
      <h3 id="cp-form-title" tabIndex={-1}>Tell us about your clean.</h3>
      <div ref={serviceSummary} className="cp-form-service" tabIndex={-1} aria-describedby={errors.service ? 'cp-service-error' : undefined}>
        <div><span>Selected service</span><strong>{selection.serviceName}</strong>{selection.packageName && <span className="cp-selected-package">{selection.packageName}</span>}</div>
        {selection.packageName && <button type="button" onClick={onReset} disabled={busy || accepted}>Remove package</button>}
        {error('service')}
      </div>
      <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="cp-form-grid">
        <label className="cp-field" htmlFor="cp-name">Name <span>(required)</span><input id="cp-name" name="name" autoComplete="name" maxLength={120} required {...fieldProps('name')} />{error('name')}</label>
        <label className="cp-field" htmlFor="cp-phone">Phone <span>(required)</span><input id="cp-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} required {...fieldProps('phone')} />{error('phone')}</label>
        <label className="cp-field cp-field-wide" htmlFor="cp-suburb">Suburb or address <span>(required)</span><input id="cp-suburb" name="suburbOrAddress" autoComplete="street-address" maxLength={300} required {...fieldProps('suburbOrAddress')} />{error('suburbOrAddress')}</label>
        <label className="cp-field" htmlFor="cp-email">Email <span>(optional)</span><input id="cp-email" name="email" type="email" autoComplete="email" maxLength={254} {...fieldProps('email')} />{error('email')}</label>
        <label className="cp-field" htmlFor="cp-date">Preferred date <span>(optional)</span><input id="cp-date" name="date" type="date" {...fieldProps('date', 'cp-date-help')} />{error('date')}</label>
        <label className="cp-field cp-field-wide" htmlFor="cp-details">Tell us what you need <span>(optional)</span><textarea id="cp-details" name="description" rows={3} maxLength={2600} placeholder="Number of rooms, carpet condition or particular areas of concern." {...fieldProps('description')} />{error('description')}</label>
      </div>
      <p className="cp-form-note" id="cp-date-help">Your preferred date is a request in Brisbane time. Availability and booking are confirmed separately.</p>
      <div className="cp-form-actions">
        <button className="cp-submit" type="submit" disabled={!ready || busy || accepted}>{busy ? 'Sending request…' : accepted ? 'Request received' : 'Get a Free Quote'}<ArrowUpRight size={18} aria-hidden="true" /></button>
        {accepted && <button className="cp-send-another" type="button" onClick={startAnother}>Send another request</button>}
      </div>
      <p className="cp-form-note">By submitting, you agree to be contacted about your enquiry. <a href="/legal/privacy">Privacy policy</a>. You can also <a href={`mailto:${BUSINESS_CONFIG.primaryEmail}`}>email us</a>.</p>
      <noscript><p className="cp-form-note">To request a quote without JavaScript, <a href={`mailto:${BUSINESS_CONFIG.primaryEmail}`}>email Cleaning Ninja</a> with your name, phone number, suburb and cleaning requirements.</p></noscript>
      {status && <div ref={statusRef} className="cp-form-status" tabIndex={-1} role={accepted ? 'status' : 'alert'}>{status}</div>}
    </form>
  )
}
