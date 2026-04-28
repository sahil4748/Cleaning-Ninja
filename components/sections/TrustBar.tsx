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
    <span ref={ref} className="font-display font-bold text-3xl md:text-4xl text-white flex items-center justify-center mb-1">
      <motion.span>{rounded}</motion.span>
      <span className="text-olive-300 ml-1">{suffix}</span>
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
    <section className="py-12 md:py-16 bg-olive-900">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center relative py-3 md:py-0">
              <Counter to={stat.value} suffix={stat.suffix} />
              <span className="font-body text-xs md:text-sm text-beige-300 uppercase tracking-[0.15em] text-center font-medium">
                {stat.label}
              </span>
              {/* Desktop Divider */}
              {index < STATS.length - 1 && (
                <div className="hidden md:block absolute -right-[16px] top-1/2 -translate-y-1/2 w-[1px] h-12 bg-olive-700/50" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
