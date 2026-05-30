'use client'

import { Children, ReactNode, isValidElement, cloneElement } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

interface StaggerProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'viewport' | 'transition' | 'variants'> {
  /** Gap between each child animation, in seconds. Default: 0.08. */
  gap?: number
  /** Delay before the first child starts. Default: 0.1. */
  delayChildren?: number
  /** Y translate distance for each child. Default: 12. */
  distance?: number
  /** Per-child duration. Default: 0.5. */
  duration?: number
  children?: ReactNode
}

/**
 * Staggered reveal container. Each direct child is wrapped in a motion item
 * and revealed in sequence.
 *
 * - No bounce. No spring.
 * - Honours prefers-reduced-motion (children become instant opacity reveals).
 */
export function Stagger({
  gap = 0.08,
  delayChildren = 0.1,
  distance = 12,
  duration = 0.5,
  children,
  ...props
}: StaggerProps) {
  const reduced = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduced ? 0 : gap,
        delayChildren: reduced ? 0 : delayChildren,
      },
    },
  }

  const itemVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: distance },
    visible: reduced
      ? { opacity: 1, transition: { duration: 0.2 } }
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      {...props}
    >
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child
        return (
          <motion.div key={i} variants={itemVariants}>
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
