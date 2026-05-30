import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Caption from '@/components/ui/Caption'
import Button from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { Stagger } from '@/components/motion/Stagger'

const ARTICLES = [
  {
    id: 'art-1',
    title: 'The Chemistry of Fiber Care: Why pH Matters',
    excerpt: 'Wool fibers require delicate acidic rinses whereas synthetic fibers can withstand mild alkalines. Discover how cheap household detergents leave sticky alkaline residues that attract dirt.',
    date: 'May 12, 2026',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg',
    category: 'Chemistry'
  },
  {
    id: 'art-2',
    title: 'Natural Stone and Travertine: The Silenced Erosion',
    excerpt: 'Acidic store-bought tile cleaners instantly etch and corrode limestone, marble, and travertine. Learn why closed-circuit neutral rotary extraction is the only safe deep-clean method.',
    date: 'April 28, 2026',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg',
    category: 'Restoration'
  },
  {
    id: 'art-3',
    title: 'Leather Preservation: Beyond the Cosmetic Shine',
    excerpt: 'Baby wipes and cheap silicone products strip leather protective coats, sealing in sweat and oils that crack the hide. Why organic lipid conditioners are crucial for aniline leather.',
    date: 'April 05, 2026',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/154161/pexels-photo-154161.jpeg',
    category: 'Preservation'
  }
]

export default function Journal() {
  return (
    <Section
      surface="cream"
      spacing="default"
      aria-labelledby="journal-heading"
      className="relative"
    >
      <Container width="wide">
        {/* Section Intro */}
        <FadeUp>
          <div className="mb-14 grid grid-cols-1 gap-10 md:mb-20 md:grid-cols-12">
            <div className="md:col-span-5">
              <Stack gap="4">
                <Eyebrow tone="champagne">Journal</Eyebrow>
                <Heading
                  as="h2"
                  id="journal-heading"
                  variant="display-l"
                  balance
                  className="!text-[36px] sm:!text-[48px] lg:!text-[60px]"
                >
                  Surface science, <span className="italic text-olive">demystified.</span>
                </Heading>
              </Stack>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <Body
                variant="body-l"
                className="text-charcoal/72 !text-[16px] sm:!text-[18px]"
                measure
              >
                No marketing slogans. We share our internal technical findings, surface compositions, and chemical safety guidelines. Read how the correct method preserves your home.
              </Body>
            </div>
          </div>
        </FadeUp>

        {/* Article Grid */}
        <Stagger gap={0.08} distance={16}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((art) => (
              <div
                key={art.id}
                className="group flex h-full flex-col border border-border bg-cream hover:border-olive hover:shadow-[0_4px_24px_-12px_rgba(107,124,58,0.15)] transition-all duration-300 rounded-[4px] overflow-hidden"
              >
                {/* Image panel */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
                  <div className="absolute inset-0 bg-charcoal-soft animate-pulse" />
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-80 transition-transform duration-700 ease-[var(--ease-out-long)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/30 transition-opacity duration-300 group-hover:bg-charcoal/10" />
                  <div className="absolute left-4 top-4 z-10 backdrop-blur-sm bg-charcoal/35 px-2.5 py-1 rounded-[2px]">
                    <Caption className="text-cream text-[11px] font-mono tracking-widest uppercase">{art.category}</Caption>
                  </div>
                </div>

                {/* Content body */}
                <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                  <div className="flex items-center justify-between text-charcoal/50 text-[12.5px] font-medium font-body">
                    <span>{art.date}</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-display font-medium text-[22px] tracking-tight leading-snug text-charcoal group-hover:text-olive-deep transition-colors">
                    {art.title}
                  </h3>

                  <Body variant="body" className="text-charcoal/70 !text-[14px] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </Body>

                  <div className="mt-auto pt-5 border-t border-border/60 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 font-body text-[13px] font-bold uppercase tracking-[0.14em] text-charcoal transition-colors duration-200 group-hover:text-olive cursor-pointer">
                      Read article
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-olive"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Stagger>

        <div className="mt-14 flex justify-center md:mt-20">
          <Button as={Link} href="/journal" variant="secondary-light" className="hover:-translate-y-[1px] transition-all duration-200">
            View All Articles
          </Button>
        </div>
      </Container>
    </Section>
  )
}
