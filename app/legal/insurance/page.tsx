import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, ShieldCheck, FileCheck, Award } from 'lucide-react'
import Button from '@/components/ui/Button'
import { LegalLayout } from '../LegalLayout'
import { BUSINESS } from '@/content/navigation'

export const metadata: Metadata = {
  title: 'Insurance & Compliance',
  description: `Cleaning Ninja insurance and compliance documentation. ${BUSINESS.publicLiability} public liability through ${BUSINESS.insurer}. Certificates of currency downloadable.`,
  alternates: { canonical: '/legal/insurance' },
}

export default function InsurancePage() {
  return (
    <LegalLayout
      title="Insurance & Compliance"
      intro="Cleaning Ninja is fully insured for residential, commercial and short-stay cleaning across every Australian state we operate in. Documentation is downloadable below."
      updated="1 May 2026"
      current="insurance"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 not-prose">
        {[
          {
            icon: ShieldCheck,
            title: 'Public Liability',
            value: BUSINESS.publicLiability,
            note: `Held through ${BUSINESS.insurer}. Policy renewed annually. Certificate of currency available on request and downloadable below.`,
          },
          {
            icon: FileCheck,
            title: 'Workers Compensation',
            value: 'All states',
            note: 'icare NSW, WorkSafe VIC, WorkCover QLD, WorkCover WA, ReturnToWorkSA. Every cleaner is covered for workplace injury.',
          },
          {
            icon: Award,
            title: 'NDIS Provider',
            value: `Provider ${BUSINESS.ndisProvider}`,
            note: 'Registered under support item 01_020_0120_1_1 (Household Tasks). Plan-managed and self-managed both supported.',
          },
          {
            icon: ShieldCheck,
            title: 'Police checks',
            value: '100% national',
            note: 'Every cleaner holds a current National Police Check via the Australian Federal Police. Renewed annually.',
          },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="border border-border bg-cream rounded-[4px] p-6"
            >
              <Icon className="h-7 w-7 text-olive mb-4" />
              <p className="font-body text-[11px] uppercase tracking-widest text-charcoal/55 mb-1">
                {item.title}
              </p>
              <p className="font-display font-bold text-[22px] text-charcoal tracking-tight">
                {item.value}
              </p>
              <p className="font-body text-[13.5px] text-charcoal/70 mt-2 leading-relaxed">
                {item.note}
              </p>
            </div>
          )
        })}
      </div>

      <h2 className="text-[24px] font-semibold pt-4">Downloads</h2>
      <p>
        Below are the formal documents we provide to body corporates, strata
        managers, real estate agents, and any property manager who requests
        compliance evidence before allowing us on a site.
      </p>

      <div className="not-prose space-y-3">
        {[
          { label: 'Certificate of Currency — Public Liability', file: 'public-liability-COC.pdf' },
          { label: 'Certificate of Currency — Workers Compensation', file: 'workers-comp-COC.pdf' },
          { label: 'NDIS Registration Statement', file: 'ndis-registration.pdf' },
          { label: 'Police Check Verification Letter', file: 'police-check-process.pdf' },
        ].map((doc) => (
          <a
            key={doc.file}
            href="#"
            className="group flex items-center justify-between border border-border bg-cream rounded-[4px] px-5 py-4 hover:border-olive transition-colors"
          >
            <span className="font-display font-medium text-[15px] text-charcoal tracking-tight">
              {doc.label}
            </span>
            <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal/70 group-hover:text-olive transition-colors">
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </span>
          </a>
        ))}
      </div>

      <p className="italic text-charcoal/55 mt-2 text-[14px]">
        PDFs are placeholders pending final document review — link targets will go live before the certified launch. Email {BUSINESS.email} if you need a copy in the meantime; we send the formal certificate within one business day.
      </p>

      <h2 className="text-[24px] font-semibold pt-4">Insurer details</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Public Liability</strong>: {BUSINESS.insurer}, policy renewed annually.</li>
        <li><strong>Cover amount</strong>: {BUSINESS.publicLiability} per occurrence.</li>
        <li><strong>Excess</strong>: $500 per claim.</li>
        <li><strong>Brokers</strong>: Available on request.</li>
      </ul>

      <h2 className="text-[24px] font-semibold pt-4">Reporting a claim</h2>
      <p>
        Damage or loss claims should be reported by email to{' '}
        <a className="text-olive underline decoration-olive-deep" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>{' '}
        within 14 days of the relevant clean. Include the booking reference,
        photos of the damage, and the item's replacement value with proof
        (purchase receipt, valuation, or comparable retail listing).
      </p>

      <div className="not-prose pt-6 border-t border-border">
        <Button as={Link} href="/contact" variant="primary-light">
          Request certificate
        </Button>
      </div>
    </LegalLayout>
  )
}
