import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, FileCheck, ShieldCheck } from 'lucide-react'
import Button from '@/components/ui/Button'
import { LegalLayout } from '../LegalLayout'
import { BUSINESS } from '@/content/navigation'

export const metadata: Metadata = {
  title: 'Insurance & Compliance',
  description: 'Cleaning Ninja insurance and compliance documentation page. Final certificates should be verified before launch.',
  alternates: { canonical: '/legal/insurance' },
}

export default function InsurancePage() {
  return (
    <LegalLayout
      title="Insurance & Compliance"
      intro="Cleaning Ninja compliance documentation is listed here for review. Final certificate details should be verified before launch."
      updated="1 May 2026"
      current="insurance"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 not-prose">
        {[
          {
            icon: ShieldCheck,
            title: 'Insurance documentation',
            value: 'To verify',
            note: 'Certificate details should be confirmed before this page is used for customer-facing launch claims.',
          },
          {
            icon: FileCheck,
            title: 'Workers Compensation',
            value: 'To verify',
            note: 'State coverage and policy details should be confirmed before publication.',
          },
          {
            icon: FileCheck,
            title: 'Service documents',
            value: 'On request',
            note: 'Supporting documents should be supplied by the operations team after verification.',
          },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="border border-border bg-cream rounded-[4px] p-6"
            >
              <Icon className="h-7 w-7 text-olive mb-4" />
              <p className="font-body text-[11px] uppercase tracking-widest text-charcoal/75 mb-1">
                {item.title}
              </p>
              <p className="font-display font-bold text-[22px] text-charcoal tracking-tight">
                {item.value}
              </p>
              <p className="font-body text-[13.5px] text-charcoal/75 mt-2 leading-relaxed">
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
          { label: 'Insurance certificate', file: 'insurance-certificate.pdf' },
          { label: 'Workers compensation certificate', file: 'workers-comp-certificate.pdf' },
          { label: 'Service compliance document', file: 'service-compliance.pdf' },
        ].map((doc) => (
          <a
            key={doc.file}
            href="#"
            className="group flex items-center justify-between border border-border bg-cream rounded-[4px] px-5 py-4 hover:border-olive transition-colors"
          >
            <span className="font-display font-medium text-[15px] text-charcoal tracking-tight">
              {doc.label}
            </span>
            <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal/75 group-hover:text-olive transition-colors">
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </span>
          </a>
        ))}
      </div>

      <p className="italic text-charcoal/75 mt-2 text-[14px]">
        PDFs are placeholders pending final document review. Email {BUSINESS.email} if you need a copy in the meantime.
      </p>

      <h2 className="text-[24px] font-semibold pt-4">Insurance details</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Policy details should be verified before launch.</li>
        <li>Certificate files should link to final approved documents.</li>
        <li>Any cover amount should be added only after confirmation.</li>
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
