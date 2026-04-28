'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

export default function HeroRedesign() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }
    }
  }

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-beige-50">
      <div className="max-w-6xl mx-auto px-5">
        
        {/* Centered Content */}
        <motion.div 
          className="flex flex-col items-center text-center mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            variants={itemVariants}
            className="font-body text-olive-700 text-sm font-bold uppercase tracking-[0.2em] mb-4"
          >
            Premium Australian Cleaning
          </motion.span>

          <motion.h1 
            variants={itemVariants}
            className="font-display font-bold text-olive-900 text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-6 max-w-3xl"
          >
            Professional Cleaning Services You Can Trust
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="font-body text-beige-700 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8"
          >
            Expert carpet, upholstery, and end-of-lease cleaning. Fully insured, eco-friendly, and dedicated to flawless results.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="#quote">
              <button className="bg-olive-700 text-white font-body font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:bg-olive-900 transition-all duration-300">
                Get Free Quote
              </button>
            </Link>
            <Link href="#services">
              <button className="bg-white border-2 border-beige-300 text-olive-900 font-body font-bold px-8 py-3.5 rounded-xl hover:bg-beige-100 hover:border-olive-300 transition-all duration-300">
                View Services
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Centered Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/9] w-full">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" 
              alt="Professional cleaning service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-olive-900/5 mix-blend-multiply pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
