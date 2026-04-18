'use client'

import { motion } from 'framer-motion'
import { Cog, BadgeCheck, Clock, ShieldCheck } from 'lucide-react'

const PILLARS = [
  {
    title: 'Hospital-Grade Equipment',
    description: 'We invest in industry-leading machinery that extracts deep-seated dirt and allergens DIY machines leave behind.',
    icon: Cog
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprise upsells. The quote you receive is the price you pay, guaranteed.',
    icon: BadgeCheck
  },
  {
    title: 'Punctual Professionals',
    description: 'We respect your time. Our teams arrive exactly when scheduled and work efficiently without cutting corners.',
    icon: Clock
  },
  {
    title: 'Bond Back Guarantee',
    description: "For end-of-lease cleans, we use REA-approved checklists. If the agent isn't happy, we return for free.",
    icon: ShieldCheck
  }
]

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const pillarVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="w-full bg-cream py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-body text-sm text-olive-500 uppercase tracking-widest font-semibold block mb-3">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-olive-900 font-bold mb-4">
            Why Aussies Trust Cleaning Ninja
          </h2>
          <p className="font-body text-beige-700 text-lg leading-relaxed">
            We don't just clean; we restore. Our commitment to premium service means you get reliable, high-quality results every single time, without the hassle.
          </p>
        </div>

        {/* Pillars Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div 
                key={index}
                variants={pillarVariants}
                className="flex flex-col items-center md:items-start text-center md:text-left group cursor-default"
              >
                <div className="mb-6 flex items-center justify-center w-20 h-20 bg-olive-100 rounded-full group-hover:scale-105 transition-transform duration-300 ease-out">
                  <Icon className="w-10 h-10 text-olive-500" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-display text-xl text-olive-900 font-semibold mb-3">
                  {pillar.title}
                </h3>
                
                <p className="font-body text-base text-beige-700 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
        
      </div>
    </section>
  )
}
