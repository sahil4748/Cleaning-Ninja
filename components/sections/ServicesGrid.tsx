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
    // ✅ FIX: more breathing space top & bottom
    <section id="services" className="py-20 md:py-24 bg-beige-50">

      {/* ✅ FIX: better side spacing */}
      <div className="max-w-6xl mx-auto px-8 md:px-14 lg:px-20">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold text-olive-700 uppercase tracking-[0.2em] block mb-4">
            Our Services
          </span>

          <h2 className="text-3xl md:text-4xl text-olive-900 font-bold mb-5">
            Expert Cleaning Services
          </h2>

          <p className="text-beige-700 leading-relaxed">
            Professional solutions tailored for premium Australian homes.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
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

                // ✅ FIX: card padding + shadow improved
                className="group bg-white border border-beige-100 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center h-full relative overflow-hidden"
              >
                {/* hover bg */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-olive-50 rounded-bl-full -mr-14 -mt-14 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative z-10 w-14 h-14 bg-olive-100 rounded-xl mb-6 flex items-center justify-center text-olive-900 group-hover:bg-olive-900 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>

                <h3 className="relative z-10 text-lg text-olive-900 font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="relative z-10 text-sm text-beige-700 mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>

                <Link
                  href={service.link}
                  className="relative z-10 inline-flex items-center gap-2 font-semibold text-olive-900 hover:text-olive-700 transition-colors mt-auto"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}