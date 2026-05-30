import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Clock } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Caption from '@/components/ui/Caption'
import { FadeUp } from '@/components/motion/FadeUp'
import { Stagger } from '@/components/motion/Stagger'
import { JsonLd } from '@/components/seo/JsonLd'
import { JOURNAL } from '@/content/journal'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'The Cleaning Ninja Journal — Bond, NDIS, Eco, Pricing',
  description:
    'Plain-English articles on residential cleaning in Australia: bond-back rules, NDIS support codes, eco-product science, fair pricing, fabric care. Updated regularly.',
  keywords: [
    'cleaning blog australia',
    'bond cleaning guide',
    'ndis cleaning guide',
    'eco cleaning products',
  ],
  alternates: { canonical: '/journal' },
}

export default function JournalPage() {
  const [featured, ...rest] = JOURNAL

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Journal', href: '/journal' },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream py-16 lg:py-24 border-b border-border">
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
          <FadeUp>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Link
                  href="/"
                  className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal/50 hover:text-olive transition-colors"
                >
                  Home
                </Link>
                <span className="font-body text-[12px] text-charcoal/30">/</span>
                <span className="font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-olive">
                  Journal
                </span>
              </div>
              <Eyebrow tone="champagne" withRule>
                The journal
              </Eyebrow>
              <Heading
                as="h1"
                variant="display-l"
                className="mt-4 mb-6 tracking-tight text-charcoal leading-none !text-[44px] sm:!text-[56px] lg:!text-[68px]"
              >
                Plain answers. <span className="text-olive italic">Real numbers.</span>
              </Heading>
              <Body
                variant="body-l"
                className="text-charcoal/75 !text-[17px] sm:!text-[19px] leading-relaxed"
                measure
              >
                Long-form notes on the things we get asked all the time —
                bond-back rules by state, NDIS support codes, what "eco-friendly"
                actually means in practice, and the real cost of an end-of-lease
                clean in 2026.
              </Body>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Featured */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <FadeUp>
            <Link
              href={`/journal/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-charcoal rounded-[4px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                <div className="absolute top-4 left-4 z-10 backdrop-blur-sm bg-charcoal/40 px-3 py-1 rounded-[2px]">
                  <Caption className="text-cream/90 text-[11px] font-mono uppercase tracking-widest">
                    FEATURED · {featured.category}
                  </Caption>
                </div>
              </div>
              <div className="lg:col-span-5">
                <Eyebrow tone="champagne">{featured.category}</Eyebrow>
                <h2 className="font-display font-semibold text-[28px] sm:text-[32px] lg:text-[36px] tracking-tight text-charcoal mt-3 mb-4 leading-tight group-hover:text-olive-deep transition-colors">
                  {featured.title}
                </h2>
                <Body variant="body-l" className="text-charcoal/80 mb-5">
                  {featured.dek}
                </Body>
                <div className="flex items-center gap-4 mb-6">
                  <Caption className="font-body text-charcoal/75 inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {featured.readMinutes} min read
                  </Caption>
                  <Caption className="font-body text-charcoal/75">
                    By {featured.author}
                  </Caption>
                </div>
                <span className="inline-flex items-center gap-1.5 font-body text-[13px] font-bold uppercase tracking-[0.14em] text-charcoal group-hover:text-olive transition-colors">
                  Read the article
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </FadeUp>
        </Container>
      </Section>

      {/* Grid */}
      <Section surface="cream" spacing="default" className="border-t border-border">
        <Container width="wide">
          <Stagger gap={0.06} distance={14}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {rest.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/journal/${entry.slug}`}
                  className="group flex flex-col border border-border bg-cream rounded-[4px] overflow-hidden hover:border-olive transition-colors"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <Eyebrow tone="champagne">{entry.category}</Eyebrow>
                      <Caption className="font-body text-charcoal/75 inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {entry.readMinutes} min
                      </Caption>
                    </div>
                    <h3 className="font-display font-semibold text-[20px] text-charcoal tracking-tight leading-snug group-hover:text-olive-deep transition-colors">
                      {entry.title}
                    </h3>
                    <p className="font-body text-[14px] text-charcoal/80 leading-relaxed line-clamp-3">
                      {entry.dek}
                    </p>
                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                      <Caption className="font-body text-charcoal/75">
                        By {entry.author}
                      </Caption>
                      <ArrowUpRight className="h-4 w-4 text-charcoal/40 group-hover:text-olive transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Stagger>
        </Container>
      </Section>
    </>
  )
}
