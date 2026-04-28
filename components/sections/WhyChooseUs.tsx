'use client'

import { motion, Variants } from 'framer-motion'
import { CheckCircle2, Award } from 'lucide-react'

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
        staggerChildren: 0.12
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
    <section className="py-16 md:py-20 lg:py-24 bg-beige-50 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8">
        
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          {/* Image Column */}
          <motion.div 
            className="relative"
            variants={slideLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-olive-900/10 aspect-[4/5] lg:aspect-square w-full ring-1 ring-black/5">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" 
                alt="Professional cleaner at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-900/15 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-olive-100 rounded-full -z-10 blur-3xl opacity-60" />
            
            {/* Floating Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-6 -right-3 md:-right-6 bg-white p-5 md:p-6 rounded-2xl shadow-xl shadow-beige-900/10 border border-beige-100 flex items-center gap-4 max-w-[240px]"
            >
              <div className="w-12 h-12 bg-olive-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-olive-700" />
              </div>
              <p className="font-display font-bold text-olive-900 text-base leading-tight">
                5,000+ Happy <br/> Families
              </p>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <div className="flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-10"
            >
              <span className="font-body text-sm font-bold text-olive-700 uppercase tracking-[0.2em] block mb-4">
                Why Choose Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-olive-900 font-bold mb-6 leading-[1.15]">
                Why Aussies Trust Cleaning Ninja
              </h2>
              <p className="font-body text-beige-700 font-light text-base md:text-lg leading-relaxed">
                We don't just clean; we restore. Our commitment to premium service means you get reliable, high-quality results every single time, without the hassle.
              </p>
            </motion.div>

            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {PILLARS.map((pillar, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 group bg-white rounded-xl p-5 border border-beige-100 shadow-sm hover:shadow-md hover:border-olive-200 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-olive-50 rounded-lg flex items-center justify-center group-hover:bg-olive-100 transition-colors duration-300">
                    <CheckCircle2 className="w-5 h-5 text-olive-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-olive-900 font-bold mb-1">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-sm text-beige-700 leading-relaxed font-light">
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
