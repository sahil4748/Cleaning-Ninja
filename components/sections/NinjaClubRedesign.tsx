'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { Home, SprayCan, CheckCircle2 } from 'lucide-react'

export default function NinjaClubRedesign() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  }

  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-8">
        
        <div className="flex flex-col items-center text-center mx-auto mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm font-bold text-olive-700 uppercase tracking-[0.2em] block mb-4"
          >
            JOIN THE CLUB
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl text-olive-900 font-bold mb-4 max-w-[600px] mx-auto"
          >
            Welcome to the Ninja Club
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-beige-700 font-light max-w-[500px] mx-auto"
          >
            Whether you're looking for premium, recurring cleaning services at a discount, or you're a professional cleaner looking to join our elite team—there's a place for you.
          </motion.p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Homeowner Card (Primary) */}
          <motion.div 
            variants={cardVariants}
            className="bg-olive-900 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 ease-out flex flex-col"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-olive-700 rounded-full blur-3xl opacity-30 -mr-20 -mt-20 pointer-events-none" />
            
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Home className="w-7 h-7 text-white" />
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-3 text-center">
              For Homeowners
            </h3>
            <p className="font-body text-olive-100 mb-8 font-light text-center text-sm">
              Subscribe to recurring cleans and never worry about a dirty home again. Members save up to 15% on every visit.
            </p>

            <ul className="space-y-4 mb-10 flex-grow">
              {['15% off recurring services', 'Priority booking dates', 'Dedicated cleaning team', 'Flexible cancellation'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-olive-300 flex-shrink-0 mt-0.5" />
                  <span className="font-body text-white/90">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="#homeowner-club" className="w-full mt-auto">
              <button className="w-full bg-white text-olive-900 font-body font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-beige-50 transition-all duration-300 text-lg">
                Join Homeowner Club
              </button>
            </Link>
          </motion.div>

          {/* Cleaner Card (Secondary) */}
          <motion.div 
            variants={cardVariants}
            className="bg-white border-2 border-beige-100 rounded-3xl p-8 lg:p-12 shadow-lg relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:border-olive-300 ease-out flex flex-col"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-beige-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none" />
            
            <div className="w-14 h-14 bg-olive-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <SprayCan className="w-7 h-7 text-olive-900" />
            </div>

            <h3 className="font-display text-2xl font-bold text-olive-900 mb-3 text-center">
              For Cleaners
            </h3>
            <p className="font-body text-beige-700 mb-8 font-light text-center text-sm">
              Join Australia's fastest-growing premium cleaning platform. Set your own hours, earn top rates, and build your career.
            </p>

            <ul className="space-y-4 mb-10 flex-grow">
              {['Industry-leading pay rates', 'Choose your own schedule', 'Full support & training', 'Quality supplies provided'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-olive-500 flex-shrink-0 mt-0.5" />
                  <span className="font-body text-olive-900/80">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="#cleaner-club" className="w-full mt-auto">
              <button className="w-full bg-transparent border-2 border-olive-900 text-olive-900 font-body font-bold py-4 rounded-xl hover:bg-olive-900 hover:text-white transition-all duration-300 text-lg">
                Apply as a Cleaner
              </button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
