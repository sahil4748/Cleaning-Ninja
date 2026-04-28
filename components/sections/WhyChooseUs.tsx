'use client'

import { motion, Variants } from 'framer-motion'
import { CheckCircle2, Award } from 'lucide-react'

const PILLARS = [
  { title: 'Hospital-Grade Equipment', description: 'We invest in industry-leading machinery that extracts deep-seated dirt and allergens DIY machines leave behind.' },
  { title: 'Transparent Pricing', description: 'No hidden fees or surprise upsells. The quote you receive is the price you pay, guaranteed.' },
  { title: 'Punctual Professionals', description: 'We respect your time. Our teams arrive exactly when scheduled and work efficiently without cutting corners.' },
  { title: 'Bond Back Guarantee', description: "For end-of-lease cleans, we use REA-approved checklists. If the agent isn't happy, we return for free." }
]

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const slideRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-olive-900/8 aspect-[4/5] lg:aspect-square w-full ring-1 ring-black/5">
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" alt="Professional cleaner at work" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-900/10 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-olive-100 rounded-full -z-10 blur-3xl opacity-50" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-6 -right-2 md:-right-6 bg-white p-5 rounded-2xl shadow-xl shadow-beige-900/8 border border-beige-100 flex items-center gap-3"
            >
              <div className="w-11 h-11 bg-olive-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-olive-700" />
              </div>
              <p className="font-display font-bold text-olive-900 text-sm leading-tight">5,000+ Happy<br/>Families</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <span className="font-body text-xs md:text-sm font-bold text-olive-700 uppercase tracking-[0.2em] block mb-4">Why Choose Us</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-olive-900 font-bold mb-6 leading-[1.12]">Why Aussies Trust Cleaning Ninja</h2>
              <p className="font-body text-beige-700 font-light text-base md:text-lg leading-relaxed max-w-lg">
                We don't just clean; we restore. Our commitment to premium service means you get reliable, high-quality results every single time.
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {PILLARS.map((pillar, i) => (
                <motion.div key={i} variants={slideRight} className="flex items-start gap-4 group bg-beige-50 hover:bg-white rounded-xl p-5 border border-transparent hover:border-beige-100 hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 bg-olive-50 rounded-lg flex items-center justify-center group-hover:bg-olive-100 transition-colors duration-300 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-olive-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-olive-900 font-bold mb-1">{pillar.title}</h3>
                    <p className="font-body text-sm text-beige-700 leading-relaxed font-light">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
