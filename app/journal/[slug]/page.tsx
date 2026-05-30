import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Caption from '@/components/ui/Caption'
import Button from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { JsonLd } from '@/components/seo/JsonLd'
import { JOURNAL } from '@/content/journal'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'

export async function generateStaticParams() {
  return JOURNAL.map((j) => ({ slug: j.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = JOURNAL.find((j) => j.slug === slug)
  if (!entry) return { title: 'Article not found' }

  return {
    title: entry.title,
    description: entry.dek,
    keywords: [entry.category.toLowerCase(), 'cleaning ninja', 'cleaning advice'],
    alternates: { canonical: `/journal/${entry.slug}` },
    openGraph: {
      title: entry.title,
      description: entry.dek,
      type: 'article',
      publishedTime: entry.publishedAt,
      authors: [entry.author],
      images: [{ url: entry.image, width: 1200, height: 630, alt: entry.title }],
    },
  }
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = JOURNAL.find((j) => j.slug === slug)
  if (!entry) notFound()

  const related = JOURNAL.filter((j) => j.slug !== entry.slug).slice(0, 3)

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Journal', href: '/journal' },
            { name: entry.title, href: `/journal/${entry.slug}` },
          ]),
          articleSchema(entry),
        ]}
      />

      {/* Article header */}
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
        <Container width="prose">
          <FadeUp>
            <Link
              href="/journal"
              className="inline-flex items-center gap-1.5 font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal/60 hover:text-olive transition-colors mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All articles
            </Link>
            <Eyebrow tone="champagne" withRule>
              {entry.category}
            </Eyebrow>
            <Heading
              as="h1"
              variant="display-l"
              className="mt-4 mb-6 tracking-tight text-charcoal leading-tight !text-[36px] sm:!text-[44px] lg:!text-[52px]"
            >
              {entry.title}
            </Heading>
            <Body variant="body-l" className="text-charcoal/75 leading-relaxed">
              {entry.dek}
            </Body>
            <div className="mt-8 flex items-center gap-6 border-t border-border pt-6">
              <div>
                <Caption className="font-body text-charcoal/55">By</Caption>
                <p className="font-display font-semibold text-[15px] text-charcoal mt-1">
                  {entry.author}
                </p>
              </div>
              <div>
                <Caption className="font-body text-charcoal/55">Published</Caption>
                <p className="font-display font-semibold text-[15px] text-charcoal mt-1">
                  {new Date(entry.publishedAt).toLocaleDateString('en-AU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <Caption className="font-body text-charcoal/55">Read time</Caption>
                <p className="font-display font-semibold text-[15px] text-charcoal mt-1 inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-olive" />
                  {entry.readMinutes} min
                </p>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Hero image */}
      <section className="bg-cream">
        <Container width="wide">
          <div className="relative aspect-[2/1] w-full overflow-hidden bg-charcoal rounded-[4px] -mt-8 lg:-mt-12 mb-12 border border-border">
            <Image
              src={entry.image}
              alt={entry.title}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              priority
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Body */}
      <Section surface="cream" spacing="tight" className="border-b border-border">
        <Container width="prose">
          <article className="font-body text-[17px] sm:text-[18px] leading-[1.75] text-charcoal/85 space-y-6">
            <p className="font-display italic text-[20px] text-charcoal/90 leading-snug border-l-2 border-olive pl-5">
              {entry.bodyMarkdown}
            </p>

            <p>
              We're publishing the full long-form version of this article in week 2 of the
              redev. In the meantime, the key data points are summarised below and the
              fully-cited piece will go live shortly.
            </p>

            <h2 className="font-display font-semibold text-[28px] text-charcoal tracking-tight pt-6 leading-snug">
              What this article will cover
            </h2>
            <p>
              The piece is being written by {entry.author}, who has{' '}
              {entry.author === "Saima Imtiyaz"
                ? 'seven years of operations'
                : 'five-plus years of fieldwork'}{' '}
              behind it. It will run through:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The current AU market data on this topic, sourced from public datasets</li>
              <li>A clear, plain-English explainer free of marketing jargon</li>
              <li>What Cleaning Ninja's own internal numbers show</li>
              <li>The specific decisions you can make on the back of it</li>
            </ul>

            <h2 className="font-display font-semibold text-[28px] text-charcoal tracking-tight pt-6 leading-snug">
              Why we wrote it
            </h2>
            <p>
              Most of what's online for {entry.category.toLowerCase()}-related questions is
              either thin SEO bait or generic franchise copy from the early 2010s. We get
              asked these things every week and we wanted a clear, honest, currently-AU
              source we could send people to. That's what this is.
            </p>

            <h2 className="font-display font-semibold text-[28px] text-charcoal tracking-tight pt-6 leading-snug">
              Got a specific question?
            </h2>
            <p>
              The team responds to enquiries within one business day on{' '}
              <a
                href="/contact"
                className="text-olive underline decoration-olive-deep underline-offset-2 hover:text-olive-deep transition-colors"
              >
                /contact
              </a>
              . If your question is bookable (i.e. "can you do an end-of-lease in
              Carlton next Thursday?"), the booking flow is faster.
            </p>
          </article>

          <div className="mt-12 pt-10 border-t border-border">
            <Button as={Link} href="/book" variant="primary-light" size="lg">
              Book a clean
            </Button>
          </div>
        </Container>
      </Section>

      {/* Related */}
      <Section surface="surface-muted" spacing="default">
        <Container width="wide">
          <FadeUp>
            <div className="max-w-3xl mb-10">
              <Eyebrow tone="champagne">Keep reading</Eyebrow>
              <Heading
                as="h2"
                variant="h2"
                className="mt-4 tracking-tight text-charcoal"
              >
                Related articles.
              </Heading>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/journal/${r.slug}`}
                className="group flex flex-col border border-border bg-cream rounded-[4px] overflow-hidden hover:border-olive transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 p-5">
                  <Eyebrow tone="champagne">{r.category}</Eyebrow>
                  <h3 className="font-display font-semibold text-[18px] text-charcoal tracking-tight mt-2 mb-2 leading-snug group-hover:text-olive-deep transition-colors">
                    {r.title}
                  </h3>
                  <Caption className="font-body text-charcoal/55">
                    {r.readMinutes} min · {r.author}
                  </Caption>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
