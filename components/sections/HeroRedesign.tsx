'use client'

import { PHONE_NUMBER, PHONE_LINK } from '@/lib/constants'
import { Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroRedesign() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-navy">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=90"
          alt="Professional cleaning service"
          className="w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full text-center lg:text-left">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto lg:mx-0"
        >
          <motion.div variants={itemVariants} className="mb-8 flex justify-center lg:justify-start">
            <div className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/10 text-white px-5 py-2.5 rounded-full shadow-lg">
              <span className="text-sm font-semibold tracking-widest uppercase text-gold">Australia's Premium Cleaning Service</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Spotless Results, <br />
              <span className="text-gold">Guaranteed.</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Professional carpet, upholstery, and end-of-lease cleaning. Fully insured, eco-friendly, and trusted by over 5,000 Australian families.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="#quote" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">
                Get Your Free Quote
              </Button>
            </Link>
            <a href={PHONE_LINK} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full border-white/30 text-white hover:bg-white hover:text-navy hover:border-white">
                <Phone className="w-5 h-5 mr-2" />
                Call {PHONE_NUMBER}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
