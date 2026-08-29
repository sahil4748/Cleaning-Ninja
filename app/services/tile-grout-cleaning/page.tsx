import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceDetail from '@/components/sections/service/ServiceDetail'
import { JsonLd } from '@/components/seo/JsonLd'
import { SERVICES } from '@/content/services'
import { TILE_GROUT_MATRIX } from '@/content/pricing'
import { housekeepingServiceSchema, breadcrumbSchema } from '@/lib/schema'

const SLUG = 'tile-grout-cleaning'
const service = SERVICES.find((s) => s.slug === SLUG)
const index = SERVICES.findIndex((s) => s.slug === SLUG)

export const metadata: Metadata = {
  title: 'Tile & Grout Cleaning Australia — From $99',
  description:
    'Tile and grout cleaning for kitchens, bathrooms, laundries and living areas. Surface assessment, grout-line cleaning, rinse and final check. From $9/m². Six cities.',
  keywords: [
    'tile cleaning sydney',
    'grout cleaning melbourne',
    'tile and grout brisbane',
    'tile restoration perth',
    'porcelain tile cleaning',
    'grout cleaning',
    'travertine cleaning',
  ],
  alternates: { canonical: '/services/tile-grout-cleaning' },
}

export default function TileGroutCleaningPage() {
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
        simplePricing={TILE_GROUT_MATRIX.map((r) => ({
          label: r.label,
          price: r.price,
          unit: undefined,
        }))}
        pricingMatrixLabel="By area. Same rate, six cities."
      />
    </>
  )
}
