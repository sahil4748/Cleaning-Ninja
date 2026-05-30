import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceDetail from '@/components/sections/service/ServiceDetail'
import { JsonLd } from '@/components/seo/JsonLd'
import { SERVICES } from '@/content/services'
import { housekeepingServiceSchema, breadcrumbSchema } from '@/lib/schema'

const SLUG = 'leather-cleaning'
const service = SERVICES.find((s) => s.slug === SLUG)
const index = SERVICES.findIndex((s) => s.slug === SLUG)

export const metadata: Metadata = {
  title: 'Leather Cleaning & Conditioning — From $149',
  description:
    'pH-balanced cleaning, deep conditioning, and protective top-coat for aniline, semi-aniline and pigmented leather. Manufacturer-safe products. Six cities, named cleaners.',
  keywords: [
    'leather cleaning sydney',
    'leather sofa cleaning melbourne',
    'leather restoration brisbane',
    'leather conditioning perth',
    'aniline leather cleaning',
    'leather couch repair',
  ],
  alternates: { canonical: '/services/leather-cleaning' },
}

export default function LeatherCleaningPage() {
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
        simplePricing={[
          { label: 'Leather armchair', price: 149 },
          { label: 'Leather 2-seater', price: 219 },
          { label: 'Leather 3-seater', price: 289 },
          { label: 'Leather sectional', price: 389 },
          { label: 'Conditioning only', price: 99 },
          { label: 'Protective top-coat', price: 79 },
        ]}
        pricingMatrixLabel="By piece. Same rate, six cities."
      />
    </>
  )
}
