'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, BadgeCheck, FileBadge, Users, Star } from 'lucide-react'
import Container from '@/components/ui/Container'
import { BUSINESS } from '@/content/navigation'
import { CountUp } from '@/components/motion/CountUp'

const PILLS = [
  {
    icon: BadgeCheck,
    label: 'ABN verified',
    value: BUSINESS.abn,
    mono: true,
  },
  {
    icon: ShieldCheck,
    label: 'Public Liability',
    value: `${BUSINESS.publicLiability} · ${BUSINESS.insurer}`,
  },
  {
    icon: Users,
    label: 'Cleaners',
    value: BUSINESS.policeCheck,
  },
  {
    icon: FileBadge,
    label: 'NDIS Provider',
    value: BUSINESS.ndisProvider,
    mono: true,
  },
  {
    icon: Star,
    label: 'Rating',
    valueNode: (
      <span className="inline-flex items-baseline gap-1.5">
        <span className="text-olive font-semibold">{BUSINESS.rating}★</span>
        <CountUp to={BUSINESS.reviewCount} className="text-charcoal" />
        <span className="text-charcoal/70 text-[13px]">reviews</span>
      </span>
    ),
  },
] as const

export default function TrustStrip() {
  return (
    <section aria-label="Trust signals" className="relative bg-cream-warm border-y border-[color:var(--color-border)]" style={{ background: 'var(--color-surface-muted)' }}>
      <Container width="wide">
        <ul className="-mx-4 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-4 py-5 sm:gap-4 sm:py-6 md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:px-0 md:overflow-visible">
          {PILLS.map((pill, i) => {
            const Icon = pill.icon
            return (
              <motion.li
                key={pill.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.5, ease: [0.65, 0.05, 0.36, 1], delay: i * 0.08 }}
                className="flex min-w-[240px] snap-start items-center gap-3 rounded-[6px] border border-[color:var(--color-border)] bg-cream px-4 py-3 md:min-w-0 md:py-3.5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-olive-pale text-olive-deep">
                  <Icon className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-charcoal/55">
                    {pill.label}
                  </span>
                  <span
                    className={
                      'mt-1 truncate text-[13.5px] font-medium text-charcoal' +
                      ('mono' in pill && pill.mono ? ' font-mono tracking-[0.04em]' : '')
                    }
                  >
                    {'valueNode' in pill && pill.valueNode
                      ? pill.valueNode
                      : 'value' in pill
                        ? pill.value
                        : null}
                  </span>
                </span>
              </motion.li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
