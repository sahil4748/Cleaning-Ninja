import { z } from 'zod'
import { getService } from '@/content/service-catalogue'
import { getPackage } from '@/content/packages'

const optionalText = (max: number) => z.string().trim().max(max).optional()
export const LEAD_SOURCES = ['homepage', 'service-page', 'package', 'quote-form', 'booking-flow', 'ai-chat', 'ai-voice', 'phone', 'callback'] as const
export const LeadSchema = z.strictObject({
  schemaVersion: z.literal(1),
  // Compatibility default for existing v1 callers; new consumers supply attribution.
  leadSource: z.enum(LEAD_SOURCES).default('quote-form'),
  package: optionalText(120),
  sourcePage: z.string().max(500).regex(/^\/(?!\/)[^?#]*$/).optional(),
  attribution: z.strictObject({ source: optionalText(120), medium: optionalText(120), campaign: optionalText(200), term: optionalText(200), content: optionalText(200) }).optional(),
  conversationContext: z.strictObject({ summary: z.string().max(2000), consentToStore: z.literal(true) }).optional(),
  consent: z.strictObject({ purpose: z.enum(['enquiry-contact', 'callback']), granted: z.literal(true), noticeVersion: z.string().min(1).max(80) }).optional(),
  channel: z.enum(['website', 'ai-chat', 'web-voice', 'phone-voice']),
  intent: z.enum(['quote', 'booking', 'callback', 'contact']),
  name: z.string().trim().min(2, 'Enter your name.').max(120),
  phone: z.string().trim().transform(value => value.replace(/[\s()-]/g, '')).pipe(z.string().regex(/^(?:0[2378]\d{8}|04\d{8}|\+61[23478]\d{8})$/, 'Enter an Australian phone number.')),
  suburbOrAddress: z.string().trim().min(2, 'Enter your suburb or address.').max(300),
  email: z.union([z.email().max(254), z.literal('')]).optional(),
  description: optionalText(3000),
  service: optionalText(120),
  city: optionalText(120),
  // Local calendar preference plus IANA time zone, never an available slot.
  preferredDateTime: z.strictObject({
    date: z.iso.date(),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
    timeZone: z.enum(['Australia/Brisbane', 'Australia/Sydney', 'Australia/Melbourne', 'Australia/Perth', 'Australia/Adelaide', 'Australia/Darwin', 'Australia/Hobart']),
  }).optional(),
}).superRefine((lead, ctx) => {
  if (lead.service && !getService(lead.service)?.quoteEnabled) ctx.addIssue({ code: 'custom', path: ['service'], message: 'Choose an available service.' })
  if (lead.package) {
    const item = getPackage(lead.package)
    if (!item?.enabled || item.service !== lead.service) ctx.addIssue({ code: 'custom', path: ['package'], message: 'Choose a package matching the service.' })
  }
  if (lead.preferredDateTime && lead.intent !== 'booking') {
    ctx.addIssue({ code: 'custom', path: ['preferredDateTime'], message: 'Date/time preferences apply only to booking requests.' })
  }
})
export type Lead = z.infer<typeof LeadSchema>

// Future accepted response requires a durable record ID; a UI timer is not acceptance.
export type LeadResult =
  | { status: 'accepted'; durableId: string; message: "We've received your request." }
  | { status: 'unavailable' | 'invalid' | 'conflict' | 'rate-limited'; message: string }
