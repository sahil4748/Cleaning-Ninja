'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Timer, Sparkles } from 'lucide-react'

export default function SpecialOfferSimple() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-olive-900 overflow-hidden relative">
      {/* Dynamic Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}
      />
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-olive-900 via-olive-900/95 to-olive-700/90" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-olive-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[720px] mx-auto"
        >
          {/* Eyebrow with Urgency */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-10 border border-white/15 shadow-lg shadow-black/10">
            <Timer className="w-4 h-4 text-amber-400" />
            <span className="font-body text-xs md:text-sm font-semibold text-white uppercase tracking-[0.15em]">
              Limited Slots Available This Week
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Get <span className="text-amber-300">$50 Off</span> Your First Clean
          </h2>

          {/* Subheadline */}
          <p className="font-body text-white/80 mb-12 font-light text-base md:text-lg leading-relaxed max-w-[560px] mx-auto">
            Experience the Cleaning Ninja difference. Book any service over $150 and claim your exclusive first-time customer discount today.
          </p>

          {/* CTA */}
          <Link href="#quote" className="inline-block w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto bg-white text-olive-900 font-body font-bold px-12 py-5 rounded-xl shadow-xl shadow-black/15 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 text-lg inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Claim Your $50 Off
            </motion.button>
          </Link>

          {/* Terms */}
          <p className="font-body text-sm text-olive-300/60 mt-8 font-light">
            *Terms and conditions apply. Valid for new customers only.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
