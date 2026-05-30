import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceDetail from '@/components/sections/service/ServiceDetail'
import { JsonLd } from '@/components/seo/JsonLd'
import { SERVICES } from '@/content/services'
import { CARPET_MATRIX } from '@/content/pricing'
import { housekeepingServiceSchema, breadcrumbSchema } from '@/lib/schema'

const SLUG = 'carpet-cleaning'
const service = SERVICES.find((s) => s.slug === SLUG)
const index = SERVICES.findIndex((s) => s.slug === SLUG)

export const metadata: Metadata = {
  title: 'Carpet Steam Cleaning Australia — From $49/room',
  description:
    'Professional hot-water extraction carpet cleaning across Sydney, Melbourne, Brisbane, Perth, Adelaide and the Gold Coast. Truck-mounted Rotovac, dry in 2–4 hours, safe for wool and synthetics. Flat-rate $49 per room.',
  keywords: [
    'carpet cleaning sydney',
    'carpet steam cleaning melbourne',
    'carpet cleaning brisbane',
    'carpet cleaning perth',
    'carpet steam clean adelaide',
    'carpet cleaning gold coast',
    'hot water extraction',
    'pet stain treatment',
  ],
  alternates: { canonical: '/services/carpet-cleaning' },
}

export default function CarpetCleaningPage() {
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
        simplePricing={CARPET_MATRIX.map((r) => ({ label: r.label, price: r.price }))}
        pricingMatrixLabel="Per room. Same rate, six cities."
      />
    </>
  )
}
