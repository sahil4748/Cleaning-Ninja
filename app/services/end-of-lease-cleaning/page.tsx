import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceDetail from '@/components/sections/service/ServiceDetail'
import { JsonLd } from '@/components/seo/JsonLd'
import { SERVICES } from '@/content/services'
import { END_OF_LEASE_MATRIX } from '@/content/pricing'
import { housekeepingServiceSchema, breadcrumbSchema } from '@/lib/schema'

const SLUG = 'end-of-lease-cleaning'
const service = SERVICES.find((s) => s.slug === SLUG)
const index = SERVICES.findIndex((s) => s.slug === SLUG)

export const metadata: Metadata = {
  title: 'End-of-Lease & Bond Cleaning — Bond Back Guaranteed',
  description:
    'REIQ / REINSW / REIV-trained exit cleans from $295. Documented checklist, date-stamped photos, 72-hour re-clean guarantee if the property manager flags anything. Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast.',
  keywords: [
    'end of lease cleaning sydney',
    'bond cleaning brisbane',
    'vacate cleaning perth',
    'end of lease melbourne',
    'bond back guarantee',
    'REIQ bond clean',
    'exit cleaning',
    'move out cleaning',
  ],
  alternates: { canonical: '/services/end-of-lease-cleaning' },
}

export default function EndOfLeaseCleaningPage() {
  if (!service) notFound()

  return (
    <>
      <JsonLd
        data={[
          housekeepingServiceSchema(service),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services' },
            { name: service.name, href: service.href },
          ]),
        ]}
      />
      <ServiceDetail
        service={service}
        index={index}
        pricingMatrix={END_OF_LEASE_MATRIX}
        pricingMatrixLabel="End-of-lease rates by city."
      />
    </>
  )
}
