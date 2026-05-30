'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BadgeDollarSign, GraduationCap, Heart } from 'lucide-react'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Button from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { SplitText } from '@/components/motion/SplitText'
import { CountUp } from '@/components/motion/CountUp'

export default function BecomeCleaner() {
  return (
    <Section surface="cream" spacing="default" aria-labelledby="recruitment-heading" className="relative overflow-hidden">
      <Container width="wide">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[8px]">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 h-full w-full rounded-[8px] bg-olive transition-transform duration-500 group-hover:-bottom-5 group-hover:-right-5"
                />
                <Image
                  src="https://images.pexels.com/photos/4098188/pexels-photo-4098188.jpeg"
                  alt="A Cleaning Ninja team member preparing equipment for a job"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="relative object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-charcoal/10 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-olive-pale">Join the team</p>
                  <p className="mt-2 font-display text-[22px] font-bold leading-tight text-cream">
                    "Same suburb, same hands, every fortnight. That's the work."
                  </p>
                  <p className="mt-2 text-[12px] text-cream/70">— Elena, Regional Lead, Melbourne</p>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <FadeUp delay={0.1}>
              <Stack gap="6">
                <Eyebrow tone="champagne" withRule>
                  Careers
                </Eyebrow>

                <Heading as="h2" id="recruitment-heading" variant="display-xl" balance>
                  <SplitText>Cleaners earn</SplitText>{' '}
                  <span className="text-olive">
                    <CountUp prefix="$" to={32} suffix="+" duration={1200} />/hr
                  </span>{' '}
                  <SplitText delay={0.3}>at Cleaning Ninja.</SplitText>
                </Heading>

                <Body variant="body-l" className="text-charcoal/80 max-w-[58ch]">
                  No gig-economy piece rates. We pay above-award, with super, sick leave, and ongoing training built in. Police checks and insurance covered by us.
                </Body>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {[
                    {
                      icon: BadgeDollarSign,
                      title: 'Above award',
                      desc: '$32+/hr base. Super and sick leave from week one.',
                    },
                    {
                      icon: GraduationCap,
                      title: 'Real training',
                      desc: '40-hour onboarding. Fabric codes, pH chemistry, machine handling.',
                    },
                    {
                      icon: Heart,
                      title: 'Genuine support',
                      desc: 'A Regional Lead in your city. Backup cleaners when you\'re sick.',
                    },
                  ].map((p) => {
                    const Icon = p.icon
                    return (
                      <div key={p.title} className="rounded-[6px] border border-[color:var(--color-border)] bg-cream-warm p-5 transition-colors duration-300 hover:border-olive" style={{ background: 'var(--color-surface-muted)' }}>
                        <Icon className="h-6 w-6 text-olive" strokeWidth={2.25} />
                        <h3 className="mt-4 font-display text-[17px] font-bold tracking-[-0.015em] text-charcoal">{p.title}</h3>
                        <p className="mt-2 text-[13px] leading-[1.5] text-charcoal/75">{p.desc}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button as={Link} href="/careers" variant="primary-light" data-magnetic className="bg-olive-deep border-olive-deep text-cream hover:bg-olive hover:border-olive">
                    Apply now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <span className="text-[13px] text-charcoal/75 max-w-xs">
                    Full-time and part-time roles open across all six cities. Career progression to Regional Lead in 18 months.
                  </span>
                </div>
              </Stack>
            </FadeUp>
          </div>
        </div>
      </Container>
    </Section>
  )
}
