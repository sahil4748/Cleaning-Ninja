'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react'

const reasons = [
  {
    icon: Sparkles,
    title: 'Hospital-Grade Equipment',
    description: 'We invest in industry-leading machinery that extracts deep-seated dirt and allergens DIY machines leave behind.'
  },
  {
    icon: CheckCircle2,
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprise upsells. The quote you receive is the price you pay, guaranteed.'
  },
  {
    icon: Clock,
    title: 'Punctual Professionals',
    description: 'We respect your time. Our teams arrive exactly when scheduled and work efficiently without cutting corners.'
  },
  {
    icon: ShieldCheck,
    title: 'Bond Back Guarantee',
    description: 'For end-of-lease cleans, we use REA-approved checklists. If the agent isn\'t happy, we return for free.'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-6">
              Why Aussies Trust <br/>Cleaning Ninja
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We don't just clean; we restore. Our commitment to premium service means you get reliable, high-quality results every single time, without the hassle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {reasons.map((reason, index) => {
                const Icon = reason.icon
                return (
                  <div key={index} className="flex flex-col">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">{reason.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[600px] rounded-3xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80" 
              alt="Professional cleaning" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
