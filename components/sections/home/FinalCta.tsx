'use client'

import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Cluster from '@/components/ui/Cluster'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Button from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { Parallax } from '@/components/motion/Parallax'
import { SplitText } from '@/components/motion/SplitText'
import { BUSINESS } from '@/content/navigation'

export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-charcoal text-cream"
    >
      <div aria-hidden="true" className="h-px w-full bg-olive/40" />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, var(--color-cream) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(107,124,58,0.22), transparent 70%)',
        }}
      />

      <Parallax
        strength={50}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span
          aria-hidden="true"
          className="font-display font-bold text-[clamp(160px,40vw,520px)] leading-[0.85] tracking-[-0.06em] text-cream/[0.045]"
        >
          Ninja
        </span>
      </Parallax>

      <Container width="wide" className="relative">
        <div className="grid grid-cols-1 gap-16 py-28 md:py-36 lg:grid-cols-12 lg:py-44">
          <div className="lg:col-span-10 lg:col-start-2">
            <FadeUp>
              <Stack gap="8" className="text-center">
                <Eyebrow tone="champagne" className="mx-auto" withRule>
                  Stop scrolling
                </Eyebrow>
                <Heading
                  as="h2"
                  id="final-cta-heading"
                  variant="display-xxl"
                  tone="bone"
                  balance
                >
                  <SplitText>Start cleaning.</SplitText>
                </Heading>
                <Body
                  variant="body-l"
                  className="mx-auto text-cream/75 text-[17px] sm:text-[19px] lg:text-[21px]"
                  measure
                >
                  Flat-rate from <span className="text-olive font-semibold">$129</span>. Bond back, or we re-clean free. Pick a time — we'll do the rest.
                </Body>

                <Cluster gap="4" justify="center" align="center" className="pt-4">
                  <Button
                    as={Link}
                    href="/book"
                    variant="primary-dark"
                    size="lg"
                    data-magnetic
                    className="group"
                  >
                    See my price (60 sec)
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                  <Button as="a" href={`tel:${BUSINESS.phoneRaw}`} variant="secondary-dark" size="lg" data-magnetic>
                    <Phone className="h-4 w-4" />
                    Or call {BUSINESS.phone}
                  </Button>
                </Cluster>

                <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3 text-[12px] uppercase tracking-[0.22em] text-cream/55">
                  <span>Sydney</span>
                  <span className="text-olive">·</span>
                  <span>Melbourne</span>
                  <span className="text-olive">·</span>
                  <span>Brisbane</span>
                  <span className="text-olive">·</span>
                  <span>Perth</span>
                  <span className="text-olive">·</span>
                  <span>Adelaide</span>
                  <span className="text-olive">·</span>
                  <span>Gold Coast</span>
                </div>
              </Stack>
            </FadeUp>
          </div>
        </div>
      </Container>
    </section>
  )
}
