import type { Metadata } from 'next'
import { LegalLayout } from '../LegalLayout'
import { BUSINESS } from '@/content/navigation'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How Cleaning Ninja collects, uses, stores and protects your personal information under the Australian Privacy Principles.`,
  alternates: { canonical: '/legal/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="This policy explains how Cleaning Ninja collects, uses, holds and discloses your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles."
      updated="1 May 2026"
      current="privacy"
    >
      <h2 className="text-[24px] font-semibold pt-4">1. Who we are</h2>
      <p>
        Cleaning Ninja (ABN {BUSINESS.abn}) operates a residential cleaning
        service across Sydney, Melbourne, Brisbane, Perth, Adelaide and the
        Gold Coast. References to "we", "us" and "our" mean Cleaning Ninja and
        any related entity acting on our behalf (e.g. franchise operators or
        contracted sub-processors).
      </p>

      <h2 className="text-[24px] font-semibold pt-4">2. What we collect</h2>
      <p>We collect the following categories of personal information:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Identity</strong>: name, address, phone number, email, date of birth (only if required for an NDIS booking).</li>
        <li><strong>Service detail</strong>: property type, suburb, scope of work, access instructions, photos taken during the clean.</li>
        <li><strong>Payment</strong>: handled by our PCI-DSS-compliant payment processor (Stripe). We do not store full card numbers.</li>
        <li><strong>Device data</strong>: IP address, browser, pages viewed (analytics only — see §7).</li>
      </ul>

      <h2 className="text-[24px] font-semibold pt-4">3. How we use it</h2>
      <p>
        Your information is used to: deliver the cleaning service, route the
        correct cleaner to your property, communicate booking details, process
        payment, document the work for the bond-back guarantee, respond to
        enquiries and complaints, and improve our service. We do not sell
        personal information to third parties.
      </p>

      <h2 className="text-[24px] font-semibold pt-4">4. Who we share with</h2>
      <p>We share information only with:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>The named cleaner assigned to your booking.</li>
        <li>Stripe (payments) and Twilio (SMS) — both APP-bound.</li>
        <li>Plan managers (NDIS only, at your direction).</li>
        <li>Law-enforcement or government authorities where legally required.</li>
      </ul>

      <h2 className="text-[24px] font-semibold pt-4">5. Storage and security</h2>
      <p>
        We store data on AWS infrastructure in the Sydney (ap-southeast-2)
        region. Access is restricted by role-based permissions, two-factor
        authentication, and audit logging. We retain booking records for seven
        years (Australian Taxation Office requirement) and delete other
        personal data on request.
      </p>

      <h2 className="text-[24px] font-semibold pt-4">6. Your rights</h2>
      <p>
        You can request access to, correction of, or deletion of your personal
        information at any time. Email <a className="text-olive underline decoration-olive-deep" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>{' '}
        with your full name and address; we respond within 30 days. You can
        also lodge a complaint with the Office of the Australian Information
        Commissioner (oaic.gov.au).
      </p>

      <h2 className="text-[24px] font-semibold pt-4">7. Cookies and analytics</h2>
      <p>
        Our website uses essential cookies (for session and authentication)
        and Google Analytics for aggregate usage statistics. We do not run
        advertising trackers. Decline cookies in your browser settings if you
        prefer; the booking flow will continue to function.
      </p>

      <h2 className="text-[24px] font-semibold pt-4">8. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        communicated via the email address on your account.
      </p>

      <h2 className="text-[24px] font-semibold pt-4">9. Contact</h2>
      <p>
        Privacy Officer · Cleaning Ninja · ABN {BUSINESS.abn} · email{' '}
        <a className="text-olive underline decoration-olive-deep" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
      </p>

      <p className="italic text-charcoal/55 pt-4 border-t border-border">
        Placeholder copy — these terms are honest, plain-English drafts pending
        a formal legal review. The bond-back guarantee and insurance commitments
        are real; the precise legal language will be ratified by our solicitors
        before the certified launch.
      </p>
    </LegalLayout>
  )
}
