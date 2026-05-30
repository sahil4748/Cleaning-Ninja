'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  to: number
  /** Animation duration in ms. Default 1400. */
  duration?: number
  /** Optional formatter (e.g. comma grouping). */
  format?: (n: number) => string
  prefix?: string
  suffix?: string
  className?: string
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function CountUp({
  to,
  duration = 1400,
  format = (n) => n.toLocaleString('en-AU'),
  prefix = '',
  suffix = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // Bottom-only trigger inset: counters that are already above-the-fold (e.g. the
  // hero trust strip) fire on mount instead of sitting at 0, while below-fold
  // counters still animate as they scroll into view. A symmetric -15% inset
  // created a bottom deadzone that left fold-edge stats stuck at zero.
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? to : 0)

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setValue(to)
      return
    }

    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(easeOutCubic(progress) * to))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(value)}
      {suffix}
    </span>
  )
}
