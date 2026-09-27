import { getService } from '../../content/service-catalogue'
import { getPackage } from '../../content/packages'
import { BUSINESS_CONFIG } from '../../content/business-config'
import type { LeadRecord } from './lead-service'
export type EmailMessage = { from: string; to: string[]; reply_to: string; subject: string; text: string }
export function leadEmail(record: LeadRecord, reference: string, kind: 'internal' | 'acknowledgement', from: string): EmailMessage {
  const mailbox = BUSINESS_CONFIG.primaryEmail
  const base = { from: `Cleaning Ninja <${from}>`, reply_to: mailbox }
  if (kind === 'acknowledgement') {
    if (!record.email) throw new Error('missing_recipient')
    return { ...base, to: [record.email], subject: 'We received your Cleaning Ninja quote request', text: `Thank you for contacting Cleaning Ninja. We've received your quote request.\n\nReference: ${reference}\n\nThis is not a confirmed booking. Any preferred date or time is a request only.\n\nYou can contact us at ${mailbox}.` }
  }
  return { ...base, to: [mailbox], subject: `New Cleaning Ninja enquiry — ${reference}`, text: [
    ['Reference', reference], ['Submitted (UTC)', record.createdAt], ['Source', record.leadSource], ['Intent', record.intent],
    ['Service', record.service ? getService(record.service)?.name ?? record.service : undefined], ['Package', record.package ? `${getPackage(record.package)?.name ?? record.package} (${record.package})` : undefined], ['Name', record.name], ['Phone', record.phone], ['Email', record.email],
    ['Suburb/address', record.suburbOrAddress], ['Description', record.description], ['Preferred date', record.preferredDateTime?.date],
    ['Preferred time', record.preferredDateTime?.time], ['Time zone', record.preferredDateTime?.timeZone], ['Source page', record.sourcePage],
    ['Attribution', record.attribution ? JSON.stringify(record.attribution) : undefined],
    ['Consented conversation summary', record.conversationContext?.summary],
  ].filter(([, value]) => value).map(([label,value]) => `${label}: ${value}`).join('\n\n') + '\n\nEnquiry only; no booking is confirmed.' }
}
export async function sendEmail(message: EmailMessage, key: string, fetcher: typeof fetch = fetch) {
  const response = await fetcher('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': key },
    body: JSON.stringify(message), signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error('email_provider_rejected')
  const result = await response.json()
  if (typeof result.id !== 'string' || !result.id) throw new Error('email_provider_invalid_response')
  return result.id as string
}
