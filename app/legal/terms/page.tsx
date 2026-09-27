import type { Metadata } from 'next'
import { LegalLayout } from '../LegalLayout'
import { BUSINESS } from '@/content/navigation'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The booking, cancellation, payment and guarantee terms for all Cleaning Ninja services.',
  alternates: { canonical: '/legal/terms' },
}

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      intro="These terms govern your use of cleaningninja.com.au and any cleaning service you book through us."
      updated="1 May 2026"
      current="terms"
    >
      <h2 className="text-[24px] font-semibold pt-4">1. The agreement</h2>
      <p>
        By booking a service through Cleaning Ninja, you
        agree to these terms. The agreement is between you (the "Customer")
        and Cleaning Ninja. If you book on behalf of someone else, you confirm
        you have their authority and they accept these terms.
      </p>

      <h2 className="text-[24px] font-semibold pt-4">2. Pricing and payment</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Quotes displayed on the website are real booking prices and include GST.</li>
        <li>Payment terms are confirmed with the customer before work begins.</li>
        <li>For recurring bookings, payment timing is confirmed when the recurring schedule is accepted.</li>
        <li>If the scope changes on arrival (e.g. larger property than booked), we will call you before proceeding. You may decline.</li>
      </ul>

      <h2 className="text-[24px] font-semibold pt-4">3. Cancellation and rescheduling</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>24+ hours before booking: no fee.</li>
        <li>Inside 24 hours: 50% of the booking total.</li>
        <li>Same-day cancellation or no-access at the booked time: 100% of the booking total.</li>
        <li>Rescheduling 24+ hours ahead: free, subject to availability.</li>
      </ul>

      <h2 className="text-[24px] font-semibold pt-4">4. End-of-lease follow-up</h2>
      <p>
        For end-of-lease cleans, if your property manager notifies us within
        seven (7) days of the clean that the property failed inspection on a
        cleaning issue, contact us with the inspection notes and supporting
        photos. We will review the issue against the booked scope. This assumes:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>The property was substantially empty when we cleaned it.</li>
        <li>The flagged issue is on the documented checklist (we provide a copy of every checklist used).</li>
        <li>The issue was not introduced by you or another party after our clean.</li>
        <li>Carpet steam was included in the original booking (where carpets are flagged).</li>
      </ul>
      <p>
        Mould, structural damage, pest infestations, paint touch-ups, and items
        outside the cleaning checklist are outside the standard scope.
      </p>

      <h2 className="text-[24px] font-semibold pt-4">5. Limitation of liability</h2>
      <p>
        Our liability for damage caused during a clean is limited to the
        replacement value of the affected item, subject to the terms confirmed
        for the booking. We are not liable for: pre-existing damage,
        cosmetic wear, items not declared as fragile or valuable, or
        consequential losses.
      </p>

      <h2 className="text-[24px] font-semibold pt-4">6. Access and safety</h2>
      <p>
        You must provide safe and lawful access to the property. We reserve
        the right to refuse work in conditions that pose health or safety
        risks to our team (biohazards, structural risks, hostile occupants).
      </p>

      <h2 className="text-[24px] font-semibold pt-4">7. NDIS bookings</h2>
      <p>
        Contact us to discuss your cleaning requirements. NDIS arrangements must be checked before proceeding.
      </p>

      <h2 className="text-[24px] font-semibold pt-4">8. Disputes</h2>
      <p>
        Disputes should be raised by email to {BUSINESS.email}. If unresolved
        within 30 days, the matter may be referred to the relevant
        State/Territory consumer affairs body (e.g. NSW Fair Trading, Consumer
        Affairs Victoria).
      </p>

      <h2 className="text-[24px] font-semibold pt-4">9. Governing law</h2>
      <p>
        These terms are governed by the laws of New South Wales, Australia,
        and the parties submit to the non-exclusive jurisdiction of its courts.
      </p>

      <p className="italic text-charcoal/75 pt-4 border-t border-border">
        Placeholder draft — these terms are honest, plain-English summaries pending
        formal legal review by our solicitors before the certified launch. The
        commercial commitments are subject to final legal review before launch.
      </p>
    </LegalLayout>
  )
}
