'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { Wind, ClipboardCheck, Sofa, Building2, ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    title: 'Carpet Cleaning',
    description: 'Deep extraction cleaning that removes allergens, stains, and odors. Safe for pets and children.',
    icon: Wind,
    link: '/services/carpet-cleaning'
  },
  {
    title: 'End of Lease Cleaning',
    description: 'REA-approved checklists with a bond-back guarantee. We return until your agent is satisfied.',
    icon: ClipboardCheck,
    link: '/services/end-of-lease'
  },
  {
    title: 'Upholstery Cleaning',
    description: 'Restore sofas, mattresses, and curtains to like-new condition with hospital-grade equipment.',
    icon: Sofa,
    link: '/services/upholstery'
  },
  {
    title: 'Commercial Cleaning',
    description: 'Office, retail, and strata cleaning with flexible scheduling that never disrupts your business.',
    icon: Building2,
    link: '/services/commercial'
  }
]

export default function ServicesGrid() {
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
      transition: { 
        duration: 0.6, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }
    }
  }

  return (
    <section id="services" className="py-16 md:py-20 bg-beige-50">
      <div className="max-w-6xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-body text-sm font-bold text-olive-700 uppercase tracking-[0.2em] block mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-olive-900 font-bold mb-6">
            Expert Cleaning Services
          </h2>
          <p className="font-body text-beige-700 font-light">
            Professional solutions tailored for premium Australian homes.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="group/card bg-white border border-beige-100 rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col items-center text-center h-full relative overflow-hidden"
              >
                {/* Subtle Hover Background Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-olive-50 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover/card:scale-150 ease-out" />

                <div className="relative z-10 w-14 h-14 bg-olive-100 rounded-xl mb-6 flex items-center justify-center text-olive-900 group-hover/card:bg-olive-900 group-hover/card:text-white transition-colors duration-500">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                
                <h3 className="relative z-10 font-display text-xl text-olive-900 font-bold mb-3">
                  {service.title}
                </h3>
                
                <p className="relative z-10 font-body text-sm text-beige-700 mb-6 font-light flex-grow leading-relaxed">
                  {service.description}
                </p>
                
                <Link 
                  href={service.link}
                  className="relative z-10 inline-flex items-center gap-2 font-body font-semibold text-olive-900 hover:text-olive-700 transition-colors group/link mt-auto"
                >
                  <span className="border-b-2 border-transparent group-hover/link:border-olive-700 transition-colors pb-0.5">Learn More</span>
                  <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
        
      </div>
    </section>
  )
}
