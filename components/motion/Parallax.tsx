'use client'

import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxProps {
  /** Strength as a percentage of element height. Default: 10 (= 10%). */
  strength?: number
  /** Optional className for the wrapper. */
  className?: string
  /** Child content — typically an image or background block. */
  children?: ReactNode
}

/**
 * Restrained scroll-driven parallax. Used sparingly (final CTA background only,
 * per blueprint). Skipped entirely when prefers-reduced-motion is active.
 *
 * The child element is translated by ±strength% of its own height as it
 * passes through the viewport.
 */
export function Parallax({ strength = 10, className, children }: ParallaxProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const range = `-${strength}%`
  const y = useTransform(scrollYProgress, [0, 1], [range, `${strength}%`])

  if (reduced) {
    return (
      <div ref={ref} className={cn('relative', className)}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
