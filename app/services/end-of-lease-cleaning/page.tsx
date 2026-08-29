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
  title: 'End-of-Lease & Bond Cleaning — Move-Out Cleaning',
  description:
    'Move-out cleaning from $295 with a room-by-room checklist for kitchens, bathrooms, living areas, bedrooms, floors and tracks. Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast.',
  keywords: [
    'end of lease cleaning sydney',
    'bond cleaning brisbane',
    'vacate cleaning perth',
    'end of lease melbourne',
    'move out cleaning',
    'rental cleaning',
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
