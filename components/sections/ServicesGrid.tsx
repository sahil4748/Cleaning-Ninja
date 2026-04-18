'use client'

import { motion } from 'framer-motion'
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  }

  return (
    <section id="services" className="w-full bg-beige-100 py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-body text-sm text-olive-500 uppercase tracking-widest font-semibold block mb-3">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-olive-900 font-semibold mb-4">
            Expert Cleaning Services
          </h2>
          <p className="font-body text-beige-700 text-lg">
            Professional solutions tailored for Australian homes
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="group/card bg-cream border border-beige-300 rounded-xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col h-full"
              >
                <div className="w-12 h-12 text-olive-500 mb-6 transform group-hover/card:scale-110 transition-transform duration-300 ease-out">
                  <Icon className="w-full h-full" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-display text-xl text-olive-900 font-semibold mb-3">
                  {service.title}
                </h3>
                
                <p className="font-body text-base text-beige-700 leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                
                <Link 
                  href={service.link}
                  className="inline-flex items-center gap-2 font-body font-semibold text-olive-700 hover:text-olive-900 transition-colors group/link mt-auto"
                >
                  Learn More 
                  <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
        
      </div>
    </section>
  )
}
