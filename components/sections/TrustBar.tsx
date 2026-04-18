'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

interface CounterProps {
  from?: number
  to: number
  suffix?: string
  duration?: number
}

function Counter({ from = 0, to, suffix = '', duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const count = useMotionValue(from)
  
  // Format the number with commas (e.g. 5000 -> 5,000)
  const rounded = useTransform(count, (latest) => 
    Math.round(latest).toLocaleString('en-US')
  )

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: "easeOut" })
      return controls.stop
    }
  }, [inView, count, to, duration])

  return (
    <span ref={ref} className="font-display font-bold text-3xl md:text-4xl text-white flex items-center justify-center">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

const STATS = [
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 5000, suffix: '+', label: 'Happy Families' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate' },
  { value: 24, suffix: '/7', label: 'Customer Support' },
]

export default function TrustBar() {
  return (
    <section className="w-full bg-olive-700 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-0 relative">
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center relative">
              <Counter to={stat.value} suffix={stat.suffix} />
              <span className="font-body text-sm text-beige-300 uppercase tracking-wider mt-2 text-center">
                {stat.label}
              </span>
              
              {/* Desktop Divider */}
              {index < STATS.length - 1 && (
                <div className="hidden md:block absolute -right-[1px] top-1/2 -translate-y-1/2 w-[1px] h-12 bg-olive-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
