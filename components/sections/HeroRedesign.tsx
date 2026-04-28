'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { Shield, Star } from 'lucide-react'

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
    <section className="relative py-16 md:py-20 lg:py-28 bg-gradient-to-b from-beige-50 via-beige-50 to-beige-100/50 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-olive-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-beige-300/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Content */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow Pill */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-olive-50 border border-olive-200 rounded-full px-4 py-2 mb-6"
            >
              <Shield className="w-4 h-4 text-olive-700" />
              <span className="font-body text-olive-700 text-xs font-semibold uppercase tracking-[0.15em]">
                Trusted by 5,000+ Families
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-olive-900 font-bold text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl leading-[1.08] mb-6 tracking-tight"
            >
              Professional Cleaning{' '}
              <span className="text-olive-700">Services</span> You Can Trust
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body text-beige-700 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            >
              Expert carpet, upholstery, and end-of-lease cleaning. Fully insured, eco-friendly, and dedicated to flawless results.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8"
            >
              <Link href="#quote" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-olive-700 text-white font-body font-bold px-10 py-4 rounded-xl shadow-lg shadow-olive-700/25 hover:bg-olive-900 hover:shadow-xl hover:shadow-olive-900/30 transition-all duration-300 text-lg"
                >
                  Get Free Quote
                </motion.button>
              </Link>
              <Link href="#services" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-white border-2 border-beige-200 text-olive-900 font-body font-bold px-10 py-4 rounded-xl shadow-sm hover:border-olive-300 hover:shadow-md transition-all duration-300 text-lg"
                >
                  View Services
                </motion.button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-olive-100 border-2 border-white shadow-sm" />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-body text-xs text-beige-700">
                  Rated 4.9/5 from 500+ reviews
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative hidden sm:block"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-olive-900/15 aspect-[4/3] lg:aspect-[4/5] w-full ring-1 ring-black/5">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop"
                alt="Professional cleaning service"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-900/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 md:-left-6 bg-white rounded-2xl shadow-xl shadow-beige-900/10 border border-beige-100 p-4 md:p-5 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-olive-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-olive-700" />
              </div>
              <div>
                <p className="font-display font-bold text-olive-900 text-base leading-tight">Fully Insured</p>
                <p className="font-body text-xs text-beige-700">& Bond-Back Guaranteed</p>
              </div>
            </motion.div>

            {/* Decorative */}
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-olive-100 rounded-full -z-10 blur-3xl opacity-50 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}