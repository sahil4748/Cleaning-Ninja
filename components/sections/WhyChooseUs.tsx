'use client'

import { motion, Variants } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const PILLARS = [
  {
    title: 'Hospital-Grade Equipment',
    description: 'We invest in industry-leading machinery that extracts deep-seated dirt and allergens DIY machines leave behind.'
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprise upsells. The quote you receive is the price you pay, guaranteed.'
  },
  {
    title: 'Punctual Professionals',
    description: 'We respect your time. Our teams arrive exactly when scheduled and work efficiently without cutting corners.'
  },
  {
    title: 'Bond Back Guarantee',
    description: "For end-of-lease cleans, we use REA-approved checklists. If the agent isn't happy, we return for free."
  }
]

export default function WhyChooseUs() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const slideLeftVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-8">
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Image Column */}
          <motion.div 
            className="relative"
            variants={slideLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square w-full">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" 
                alt="Professional cleaner at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-olive-900/5 mix-blend-multiply pointer-events-none" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-olive-100 rounded-full -z-10 blur-3xl opacity-60" />
            
            {/* Floating Trust Badge */}
            <div className="absolute bottom-8 -right-4 md:-right-8 bg-white p-6 rounded-2xl shadow-xl border border-beige-100 flex items-center gap-4 max-w-[240px]">
              <div className="w-12 h-12 bg-olive-50 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-olive-700" />
              </div>
              <p className="font-display font-bold text-olive-900 text-lg leading-tight">
                5,000+ Happy <br/> Families
              </p>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-12"
            >
              <span className="font-body text-sm font-bold text-olive-700 uppercase tracking-[0.2em] block mb-4">
                Why Choose Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-olive-900 font-bold mb-6">
                Why Aussies Trust Cleaning Ninja
              </h2>
              <p className="font-body text-beige-700 font-light">
                We don't just clean; we restore. Our commitment to premium service means you get reliable, high-quality results every single time, without the hassle.
              </p>
            </motion.div>

            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {PILLARS.map((pillar, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-olive-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-olive-900 font-bold mb-2">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-base text-beige-700 leading-relaxed font-light">
                      {pillar.description}
                    </p>
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
