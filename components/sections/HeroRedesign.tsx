'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroRedesign() {
  // Stagger children animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1] 
      }
    }
  }

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center">
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        {/* Dark Olive Overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(45, 55, 25, 0.4)' }}
        />
      </motion.div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16 md:mt-0">
        <motion.div 
          className="max-w-[640px] mx-auto md:mx-0 flex flex-col items-center md:items-start text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.span 
            variants={itemVariants}
            className="font-body text-beige-300 text-sm uppercase tracking-widest mb-4"
          >
            PREMIUM CLEANING SERVICES
          </motion.span>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="font-display font-semibold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6"
          >
            Expert Cleaning with a Personal Touch
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="font-body text-beige-100 text-lg md:text-xl leading-relaxed max-w-xl mb-10"
          >
            Professional carpet, upholstery, and end-of-lease cleaning across Australia. Fully insured, eco-friendly products, and a bond-back guarantee.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link href="#quote" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-olive-700 text-white font-body font-semibold px-8 py-4 rounded-lg hover:bg-olive-900 transition-all duration-300 hover:-translate-y-0.5 ease-out">
                Get Free Quote
              </button>
            </Link>
            <Link href="#services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-transparent border border-white text-white font-body font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-olive-900 transition-all duration-300 ease-out">
                Our Services
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
