'use client'

import { ReactNode } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

interface ScaleInProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView' | 'viewport' | 'transition' | 'variants'> {
  /** Starting scale. Default: 1.02 (a quiet zoom from). */
  from?: number
  /** Duration in seconds. Default: 0.9. */
  duration?: number
  /** Delay in seconds. Default: 0. */
  delay?: number
  /** If true, animates on mount instead of on scroll-into-view. */
  immediate?: boolean
  children?: ReactNode
}

/**
 * Subtle scale-in reveal — used for hero images and key editorial visuals.
 *
 * - Scales from `from` (default 1.02) to 1.0.
 * - No bounce. No spring. No overshoot.
 * - Honours prefers-reduced-motion.
 */
export function ScaleIn({
  from = 1.02,
  duration = 0.9,
  delay = 0,
  immediate = false,
  children,
  ...props
}: ScaleInProps) {
  const reduced = useReducedMotion()

  const initial = reduced ? { opacity: 0 } : { opacity: 0, scale: from }
  const animate = reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }

  const transition = {
    duration: reduced ? 0.2 : duration,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  }

  if (immediate) {
    return (
      <motion.div initial={initial} animate={animate} transition={transition} {...props}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  )
}
