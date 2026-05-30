'use client'

import { ReactNode, useMemo } from 'react'
import { motion, useReducedMotion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SplitTextProps {
  children: string
  className?: string
  /** Split by 'word' (default) or 'char'. */
  by?: 'word' | 'char'
  /** Stagger between units, in seconds. Default 0.05. */
  stagger?: number
  /** Initial Y offset. Default 110% (full mask). */
  yOffset?: string | number
  /** Total animation duration per unit. Default 0.6s. */
  duration?: number
  /** Trigger when scrolled into view (default true) or immediately. */
  whileInView?: boolean
  /** Delay before the first unit starts. Default 0. */
  delay?: number
  /** Visual tag — h1/h2/span. Default span. */
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div'
}

/**
 * Mask-reveal SplitText. Splits a string into word or char units, each wrapped
 * in an overflow:hidden mask, then translates Y from yOffset → 0 on stagger.
 *
 * Lightweight Framer Motion implementation (no GSAP SplitText needed for the
 * core case). For more advanced char-by-char with custom timelines, swap in
 * the GSAP SplitText plugin later.
 */
export function SplitText({
  children,
  className,
  by = 'word',
  stagger = 0.05,
  yOffset = '110%',
  duration = 0.6,
  whileInView = true,
  delay = 0,
  as = 'span',
}: SplitTextProps) {
  const reduced = useReducedMotion()

  const units = useMemo(() => {
    if (by === 'word') {
      return children.split(/(\s+)/).filter((w) => w.length > 0)
    }
    return Array.from(children)
  }, [children, by])

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: reduced ? 0 : stagger,
      },
    },
  }

  const unit: Variants = {
    hidden: { y: reduced ? 0 : yOffset, opacity: reduced ? 1 : 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: reduced ? 0 : duration,
        ease: [0.65, 0.05, 0.36, 1],
      },
    },
  }

  const Tag = motion[as] as typeof motion.span

  return (
    <Tag
      className={cn('inline-block', className)}
      variants={container}
      initial="hidden"
      animate={whileInView ? undefined : 'visible'}
      whileInView={whileInView ? 'visible' : undefined}
      viewport={whileInView ? { once: true, margin: '-15% 0px' } : undefined}
      aria-label={children}
    >
      {units.map((u, i) => {
        if (/^\s+$/.test(u)) return <span key={i}>{u}</span>
        return (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
            <motion.span className="inline-block" variants={unit}>
              {u}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}
