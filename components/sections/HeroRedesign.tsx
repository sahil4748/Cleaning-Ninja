'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

export default function HeroRedesign() {
  // Stagger children animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
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
    <section className="hero-section h-screen min-h-[600px] overflow-hidden flex items-center">
      {/* Background Image with Slow Zoom Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 25, ease: "linear" }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        {/* Dark Gradient Overlay for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </motion.div>

      {/* Content Container */}
      <div className="container relative z-10">
        <motion.div 
          className="max-w-[800px] mx-auto flex flex-col items-center text-center pt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.span 
            variants={itemVariants}
            className="font-body text-beige-300 text-sm md:text-base font-medium uppercase tracking-[0.2em] mb-4 md:mb-6"
          >
            Premium Australian Cleaning
          </motion.span>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="font-display font-bold text-white leading-[1.1] mb-6 md:mb-8"
          >
            Expert Cleaning Services You Can Trust
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="font-body text-beige-100 font-light max-w-xl mb-10 md:mb-12"
          >
            Professional carpet, upholstery, and end-of-lease cleaning. Fully insured, eco-friendly, and dedicated to flawless results.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full sm:w-auto"
          >
            <Link href="#quote" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-olive-700 text-white font-body font-semibold px-8 md:px-10 py-4 md:py-4 rounded-lg hover:bg-olive-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ease-out text-lg">
                Get Free Quote
              </button>
            </Link>
            <Link href="#services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/30 text-white font-body font-medium px-8 md:px-10 py-4 md:py-4 rounded-lg hover:bg-white hover:text-olive-900 transition-all duration-300 hover:-translate-y-1 ease-out text-lg">
                View Services
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
