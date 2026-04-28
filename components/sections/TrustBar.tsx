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
    <span ref={ref} className="font-display font-bold text-4xl md:text-5xl text-white flex items-center justify-center mb-2">
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
    <section className="section bg-olive-900 overflow-hidden">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {STATS.map((stat, index) => (
            <div key={index} className="flex-none w-[80vw] sm:w-[45vw] md:w-auto md:flex-1 snap-center flex flex-col items-center justify-center relative">
              <Counter to={stat.value} suffix={stat.suffix} />
              <span className="font-body text-sm md:text-base text-beige-300 uppercase tracking-[0.15em] text-center font-medium">
                {stat.label}
              </span>
              
              {/* Desktop Divider */}
              {index < STATS.length - 1 && (
                <div className="hidden md:block absolute -right-[12px] top-1/2 -translate-y-1/2 w-[1px] h-16 bg-olive-700" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
