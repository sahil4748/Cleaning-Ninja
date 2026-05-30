import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { BookingFlow } from './BookingFlow'

export const metadata: Metadata = {
  title: 'Book a Cleaning Ninja — 90-Second Booking, Flat-Rate Price',
  description:
    'Book a flat-rate cleaning service in 90 seconds. Pick the service, the date, your Ninja. SMS confirmation, no quote runaround, no surprise charges.',
  alternates: { canonical: '/book' },
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; city?: string; suburb?: string }>
}) {
  const params = await searchParams

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Book', href: '/book' },
        ])}
      />

      {/* Header */}
      <section className="relative overflow-hidden bg-cream py-16 lg:py-20 border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--color-charcoal) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <Container width="wide">
          <div className="max-w-3xl">
            <Eyebrow tone="champagne" withRule>
              Book a clean
            </Eyebrow>
            <Heading
              as="h1"
              variant="display-l"
              className="mt-4 mb-4 tracking-tight text-charcoal leading-tight !text-[40px] sm:!text-[52px] lg:!text-[60px]"
            >
              90 seconds. <span className="text-olive italic">No quote runaround.</span>
            </Heading>
            <Body
              variant="body-l"
              className="text-charcoal/75 !text-[16px] sm:!text-[18px] leading-relaxed"
              measure
            >
              Pick a service, a date, and a Ninja. SMS confirmation in real time.
              Payment is taken on the day, after the work. The price you see in
              the sidebar is the final, GST-inclusive total.
            </Body>
          </div>
        </Container>
      </section>

      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <BookingFlow defaults={params ?? {}} />
        </Container>
      </Section>
    </>
  )
}
