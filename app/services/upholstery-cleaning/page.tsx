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

export const metadata: Metadata = {
  title: 'Sofa & Upholstery Cleaning Australia — From $89',
  description:
    'Method-matched fabric care for boucle, linen, velvet and microfibre. We identify the fabric code (W, S, WS, X) before we touch it. 3-seater from $129. Safe for delicate textiles. Six cities, named cleaners.',
  keywords: [
    'sofa cleaning sydney',
    'upholstery cleaning melbourne',
    'lounge cleaning brisbane',
    'mattress cleaning perth',
    'fabric sofa cleaning',
    'boucle cleaning',
    'velvet upholstery clean',
  ],
  alternates: { canonical: '/services/upholstery-cleaning' },
}

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
