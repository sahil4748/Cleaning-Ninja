'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { Home, SprayCan, CheckCircle2 } from 'lucide-react'

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const scaleUp: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export default function NinjaClubRedesign() {
  return (
    <section className="py-16 md:py-24 lg:py-28 bg-beige-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14 md:mb-16"
        >
          <span className="font-body text-xs md:text-sm font-bold text-olive-700 uppercase tracking-[0.2em] block mb-4">JOIN THE CLUB</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-olive-900 font-bold mb-5 max-w-2xl leading-tight">Welcome to the Ninja Club</h2>
          <p className="font-body text-beige-700 font-light max-w-lg text-base md:text-lg">
            Whether you're looking for premium cleaning at a discount, or you're a professional cleaner looking to join our team—there's a place for you.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Homeowner Card */}
          <motion.div variants={scaleUp} className="bg-olive-900 rounded-2xl p-8 lg:p-12 shadow-2xl shadow-olive-900/20 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col">
            <div className="absolute top-0 right-0 w-64 h-64 bg-olive-700 rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none" />

            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-7 mx-auto md:mx-0">
              <Home className="w-7 h-7 text-white" />
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-3 text-center md:text-left">For Homeowners</h3>
            <p className="font-body text-olive-100 mb-8 font-light text-center md:text-left text-sm">Subscribe to recurring cleans and save up to 15% on every visit.</p>

            <ul className="space-y-4 mb-10 flex-grow">
              {['15% off recurring services', 'Priority booking dates', 'Dedicated cleaning team', 'Flexible cancellation'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-olive-300 flex-shrink-0 mt-0.5" />
                  <span className="font-body text-white/90 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="#homeowner-club" className="w-full mt-auto">
              <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="w-full bg-white text-olive-900 font-body font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-base cursor-pointer">
                Join Homeowner Club
              </motion.button>
            </Link>
          </motion.div>

          {/* Cleaner Card */}
          <motion.div variants={scaleUp} className="bg-white border-2 border-beige-100 rounded-2xl p-8 lg:p-12 shadow-md relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-xl hover:border-olive-200 ease-out flex flex-col">
            <div className="absolute top-0 right-0 w-64 h-64 bg-beige-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none" />

            <div className="w-14 h-14 bg-olive-50 rounded-xl flex items-center justify-center mb-7 mx-auto md:mx-0">
              <SprayCan className="w-7 h-7 text-olive-900" />
            </div>

            <h3 className="font-display text-2xl font-bold text-olive-900 mb-3 text-center md:text-left">For Cleaners</h3>
            <p className="font-body text-beige-700 mb-8 font-light text-center md:text-left text-sm">Join Australia's fastest-growing premium cleaning platform. Set your hours, earn top rates.</p>

            <ul className="space-y-4 mb-10 flex-grow">
              {['Industry-leading pay rates', 'Choose your own schedule', 'Full support & training', 'Quality supplies provided'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-olive-500 flex-shrink-0 mt-0.5" />
                  <span className="font-body text-olive-900/80 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="#cleaner-club" className="w-full mt-auto">
              <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="w-full bg-transparent border-2 border-olive-900 text-olive-900 font-body font-bold py-4 rounded-xl hover:bg-olive-900 hover:text-white transition-all duration-300 text-base cursor-pointer">
                Apply as a Cleaner
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
