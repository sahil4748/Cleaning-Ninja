'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SpecialOfferSimple() {
  return (
    <section className="w-full bg-olive-700 py-16 md:py-20 relative overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[640px] mx-auto"
        >
          {/* Eyebrow */}
          <span className="font-body text-sm font-semibold text-olive-100 uppercase tracking-[0.2em] mb-4 block">
            LIMITED TIME OFFER
          </span>

          {/* Headline */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Get $50 Off Your First Clean
          </h2>

          {/* Subheadline */}
          <p className="font-body text-lg text-beige-100 mb-10 leading-relaxed">
            Experience the Cleaning Ninja difference. Book any service over $150 and claim your exclusive first-time customer discount today.
          </p>

          {/* CTA */}
          <Link href="#quote" className="inline-block">
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-olive-900 font-body font-semibold px-10 py-4 rounded-lg shadow-lg hover:bg-beige-100 transition-all duration-300"
            >
              Claim $50 Off
            </motion.button>
          </Link>

          {/* Terms */}
          <p className="font-body text-sm text-olive-300 mt-8">
            *Terms and conditions apply. Valid for new customers only.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
