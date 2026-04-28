'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Timer } from 'lucide-react'

export default function SpecialOfferSimple() {
  return (
    <section className="section bg-olive-900 overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-olive-900/80 to-transparent" />
      
      <div className="container relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[720px] mx-auto"
        >
          {/* Eyebrow with Urgency */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/20">
            <Timer className="w-4 h-4 text-amber-400" />
            <span className="font-body text-xs md:text-sm font-semibold text-white uppercase tracking-[0.15em]">
              Limited Slots Available This Week
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Get $50 Off Your First Clean
          </h2>

          {/* Subheadline */}
          <p className="font-body text-lg md:text-xl text-beige-100 mb-12 leading-relaxed font-light">
            Experience the Cleaning Ninja difference. Book any service over $150 and claim your exclusive first-time customer discount today before our schedule fills up.
          </p>

          {/* CTA */}
          <Link href="#quote" className="inline-block w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-white text-olive-900 font-body font-bold px-10 md:px-12 py-4 md:py-5 rounded-lg shadow-xl hover:bg-beige-50 hover:shadow-2xl transition-all duration-300 text-lg"
            >
              Book Cleaning Now
            </motion.button>
          </Link>

          {/* Terms */}
          <p className="font-body text-sm text-olive-300/80 mt-8 font-light">
            *Terms and conditions apply. Valid for new customers only.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
