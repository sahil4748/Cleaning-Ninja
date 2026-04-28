'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate, Variants } from 'framer-motion'

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
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString('en-US'))

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: "easeOut" })
      return controls.stop
    }
  }, [inView, count, to, duration])

  return (
    <span ref={ref} className="font-display font-bold text-3xl md:text-4xl text-white flex items-center justify-center mb-2">
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

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export default function TrustBar() {
  return (
    <section className="py-14 md:py-16 bg-olive-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10"
        >
          {STATS.map((stat, index) => (
            <motion.div key={index} variants={fadeUp} className="flex flex-col items-center justify-center relative py-2 md:py-0">
              <Counter to={stat.value} suffix={stat.suffix} />
              <span className="font-body text-xs md:text-sm text-beige-300 uppercase tracking-[0.15em] text-center font-medium">
                {stat.label}
              </span>
              {index < STATS.length - 1 && (
                <div className="hidden md:block absolute -right-[20px] top-1/2 -translate-y-1/2 w-[1px] h-12 bg-olive-700/40" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
