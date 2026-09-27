'use client'

import { useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { submitLead } from '@/lib/platform/lead-client'
import { PACKAGES } from '@/content/packages'
import { BUSINESS_CONFIG } from '@/content/business-config'
import { LeadSchema } from '@/lib/lead-contract'
import { homeServices } from '@/content/homepage'

export type QuoteContext = { service: string; suburb: string; packageName: string }

export default function QuoteForm({ context, onChange }: { context: QuoteContext; onChange: (value: QuoteContext) => void }) {
  const attempt = useRef<{ payload: string; key: string } | null>(null)
  const inFlight = useRef(false)
  const form = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const [accepted, setAccepted] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current || accepted) return
    const data = new FormData(event.currentTarget)
    const date = String(data.get('date') || '')
    const time = String(data.get('time') || '')
    const description = String(data.get('description') || '')
    const parsed = LeadSchema.safeParse({
      schemaVersion: 1, leadSource: context.packageName ? 'package' : 'homepage', sourcePage: '/',
      package: PACKAGES.find(item => item.name === context.packageName)?.id,
      consent: { purpose: 'enquiry-contact', granted: true, noticeVersion: 'enquiry-2026-09-27' }, channel: 'website', intent: date ? 'booking' : 'quote',
      service: context.service, city: BUSINESS_CONFIG.primaryMarket ?? undefined, suburbOrAddress: context.suburb,
      description,
      name: data.get('name'), phone: data.get('phone'), email: data.get('email'),
      ...(date ? { preferredDateTime: { date, ...(time ? { time } : {}), timeZone: 'Australia/Brisbane' } } : {}),
    })
    const nextErrors: Record<string, string> = {}
    if (!parsed.success) for (const issue of parsed.error.issues) nextErrors[issue.path[0] === 'preferredDateTime' ? 'date' : issue.path[0] as string] = issue.message
    if (time && !date) nextErrors.date = 'Add a preferred date with your time.'
    setErrors(nextErrors)
    setStatus('')
    if (Object.keys(nextErrors).length) {
      const name = ['service', 'suburbOrAddress', 'description', 'name', 'phone', 'email', 'date', 'preferredDateTime'].find(field => nextErrors[field])!
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>(`[name="${name === 'preferredDateTime' ? 'date' : name}"]`)?.focus())
      return
    }
    if (!parsed.success) return
    inFlight.current = true
    setBusy(true)
    setAccepted(false)
    try {
      const payload = JSON.stringify(parsed.data)
      if (attempt.current?.payload !== payload) attempt.current = { payload, key: crypto.randomUUID() }
      const result = await submitLead(parsed.data, attempt.current.key, String(data.get('website') || ''))
      if (result.status === 'accepted') {
        setAccepted(true)
        setStatus("We've received your request. Your quote request has been sent to Cleaning Ninja. This is not a confirmed booking.")
      } else {
        setStatus(`Your request wasn't sent. Your details remain in the form. Please email ${BUSINESS_CONFIG.primaryEmail} or try again later.`)
      }
    } catch {
      setStatus(`We could not confirm receipt. Your details remain in the form. Retry safely using the same details. Please email ${BUSINESS_CONFIG.primaryEmail} if you need help.`)
    } finally {
      inFlight.current = false
      setBusy(false)
      requestAnimationFrame(() => statusRef.current?.focus())
    }
  }
  const fieldProps = (name: string) => ({ 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-error` : undefined })
  const error = (name: string) => errors[name] ? <span className="home-field-error" id={`${name}-error`}>{errors[name]}</span> : null
  return <form ref={form} method="post" action="/api/quote" className="home-quote-form" noValidate onSubmit={submit} aria-label="Request a Quote">
    {context.packageName && <div className="home-selected-package" role="status"><span>Selected package: <strong>{context.packageName}</strong></span><button type="button" onClick={() => onChange({ ...context, packageName: '' })}>Remove package</button></div>}
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="home-form-grid">
      <label htmlFor="quote-service">Service<select aria-label="Service" id="quote-service" name="service" value={context.service} onChange={event => onChange({ ...context, service: event.target.value, packageName: '' })}><option value="">Help me choose</option>{homeServices.map(service => <option key={service.slug} value={service.slug}>{service.name}</option>)}</select></label>
      <label htmlFor="quote-suburb">Suburb/address <span>(required)</span><input id="quote-suburb" name="suburbOrAddress" autoComplete="street-address" maxLength={300} required value={context.suburb} onChange={event => onChange({ ...context, suburb: event.target.value })} {...fieldProps('suburbOrAddress')} />{error('suburbOrAddress')}</label>
      <label className="home-field-wide" htmlFor="quote-description">Description <span>(optional)</span><textarea id="quote-description" name="description" rows={3} maxLength={2800} placeholder="Tell us a little about your space and what you need." {...fieldProps('description')} />{error('description')}</label>
      <label htmlFor="quote-name">Name <span>(required)</span><input id="quote-name" name="name" autoComplete="name" maxLength={120} required {...fieldProps('name')} />{error('name')}</label>
      <label htmlFor="quote-phone">Phone <span>(required)</span><input id="quote-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} required {...fieldProps('phone')} />{error('phone')}</label>
      <label className="home-field-wide" htmlFor="quote-email">Email <span>(optional)</span><input id="quote-email" name="email" type="email" autoComplete="email" maxLength={254} {...fieldProps('email')} />{error('email')}</label>
      <label htmlFor="quote-date">Preferred date <span>(optional)</span><input id="quote-date" name="date" type="date" {...fieldProps('date')} />{error('date')}{error('preferredDateTime')}</label>
      <label htmlFor="quote-time">Preferred time <span>(optional)</span><input id="quote-time" name="time" type="time" /></label>
    </div>
    <p className="home-form-note">Preferred times are requests in Brisbane time, not confirmed availability.</p>
    <p className="home-form-note">You can also <a href={`mailto:${BUSINESS_CONFIG.primaryEmail}`}>email us</a>.</p>
    <button className="home-button" type="submit" disabled={busy || accepted}>{busy ? 'Sending request…' : accepted ? 'Request received' : 'Request a Quote'}<ArrowUpRight size={18} /></button>
    <p className="home-form-note">By submitting, you agree to be contacted about your enquiry. <a href="/legal/privacy">Privacy policy</a></p>
    {status && <div ref={statusRef} tabIndex={-1} role={accepted ? 'status' : 'alert'} className="home-form-status">{status}</div>}
  </form>
}
