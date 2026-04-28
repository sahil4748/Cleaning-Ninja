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
    <section className="py-20 md:py-28 lg:py-32 overflow-hidden bg-beige-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
          
          {/* Left: Content */}
          <motion.div 
            className="flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              variants={itemVariants}
              className="font-body text-olive-700 text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-4"
            >
              Premium Australian Cleaning
            </motion.span>

            <motion.h1 
              variants={itemVariants}
              className="font-display font-bold text-olive-900 text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6"
            >
              Professional Cleaning Services You Can Trust
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="font-body text-beige-700 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10"
            >
              Expert carpet, upholstery, and end-of-lease cleaning. Fully insured, eco-friendly, and dedicated to flawless results.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link href="#quote" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-olive-700 text-white font-body font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-olive-900 transition-all duration-300">
                  Get Free Quote
                </button>
              </Link>
              <Link href="#services" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-white border-2 border-beige-300 text-olive-900 font-body font-bold px-8 py-4 rounded-xl hover:bg-beige-100 hover:border-olive-300 transition-all duration-300">
                  View Services
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Image — offset slightly right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative lg:translate-x-4"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[4/5] w-full">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" 
                alt="Professional cleaning service"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-olive-900/5 mix-blend-multiply pointer-events-none" />
            </div>
            {/* Decorative background shape */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-olive-100 rounded-full -z-10 blur-3xl opacity-60 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
