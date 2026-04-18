'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NinjaClubRedesign() {
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    }
  }

  return (
    <section className="w-full bg-beige-100 py-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Content Side */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="font-body text-sm text-olive-500 uppercase tracking-widest font-semibold mb-4">
              JOIN THE CLUB
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-olive-900 font-bold mb-6">
              Join the Ninja Club
            </h2>
            <p className="font-body text-lg text-beige-700 leading-relaxed max-w-xl mb-10">
              Whether you're looking for premium, recurring cleaning services at a discount, or you're a professional cleaner looking to join our elite team—there's a place for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Homeowner CTA */}
              <Link href="#homeowner-club" className="w-full sm:w-auto flex-1">
                <button className="w-full bg-olive-700 hover:bg-olive-900 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex flex-col items-center justify-center group h-full">
                  <span className="font-body font-bold text-lg mb-1">For Homeowners</span>
                  <span className="font-body text-xs text-olive-100 font-medium">Save 15% on recurring cleans</span>
                </button>
              </Link>

              {/* Cleaner CTA */}
              <Link href="#cleaner-club" className="w-full sm:w-auto flex-1">
                <button className="w-full bg-transparent hover:bg-olive-100 border-2 border-olive-700 text-olive-700 px-8 py-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex flex-col items-center justify-center group h-full">
                  <span className="font-body font-bold text-lg mb-1">For Cleaners</span>
                  <span className="font-body text-xs text-olive-700/80 font-medium group-hover:text-olive-700 transition-colors">Join our elite team</span>
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[500px] w-full">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" 
                alt="Professional cleaning team"
                className="w-full h-full object-cover"
              />
              {/* Subtle Olive Overlay */}
              <div className="absolute inset-0 bg-olive-900/10 mix-blend-multiply pointer-events-none" />
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-olive-300/30 rounded-full -z-10 blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-olive-300/30 rounded-full -z-10 blur-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
