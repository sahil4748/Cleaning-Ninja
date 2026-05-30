'use client'

import { ReactNode } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

interface FadeUpProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView' | 'viewport' | 'transition' | 'variants'> {
  /** Optional override for the upward translation in pixels. Default: 12. */
  distance?: number
  /** Duration in seconds. Default: 0.5. */
  duration?: number
  /** Delay in seconds. Default: 0. */
  delay?: number
  /** If true, animates as soon as mounted instead of on scroll-into-view. */
  immediate?: boolean
  children?: ReactNode
}

/**
 * Soft fade-up reveal — the blueprint's default entrance animation.
 *
 * - Reveal only — never bounce, never spring.
 * - Duration: 500ms default.
 * - Easing: ease-out-long.
 * - Honours prefers-reduced-motion — falls back to instant opacity.
 */
export function FadeUp({
  distance = 12,
  duration = 0.5,
  delay = 0,
  immediate = false,
  children,
  ...props
}: FadeUpProps) {
  const reduced = useReducedMotion()

  const initial = reduced ? { opacity: 0 } : { opacity: 0, y: distance }
  const animate = reduced ? { opacity: 1 } : { opacity: 1, y: 0 }

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
