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
    'High-pressure rotary extraction for tile and grout, with optional penetrating sealer. Porcelain, ceramic, stone — method matched to the surface. No acid on stone. From $9/m². Six cities.',
  keywords: [
    'tile cleaning sydney',
    'grout cleaning melbourne',
    'tile and grout brisbane',
    'tile restoration perth',
    'porcelain tile cleaning',
    'grout sealing',
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
          unit: r.area === 'sealing' ? '/m²' : undefined,
        }))}
        pricingMatrixLabel="By area. Same rate, six cities."
      />
    </>
  )
}
