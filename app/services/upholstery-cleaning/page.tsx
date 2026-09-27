import { serviceMetadata } from '@/lib/platform/metadata'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceDetail from '@/components/sections/service/ServiceDetail'
import { JsonLd } from '@/components/seo/JsonLd'
import { SERVICES } from '@/content/services'
import { UPHOLSTERY_MATRIX } from '@/content/pricing'
import { housekeepingServiceSchema, breadcrumbSchema } from '@/lib/schema'

const SLUG = 'upholstery-cleaning'
const service = SERVICES.find((s) => s.slug === SLUG)
const index = SERVICES.findIndex((s) => s.slug === SLUG)

export const metadata: Metadata = serviceMetadata(SLUG)

export default function UpholsteryCleaningPage() {
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
        simplePricing={UPHOLSTERY_MATRIX.map((r) => ({ label: r.label, price: r.price }))}
        pricingMatrixLabel="By piece. Same rate, six cities."
      />
    </>
  )
}
