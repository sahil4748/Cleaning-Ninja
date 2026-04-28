'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { Wind, ClipboardCheck, Sofa, Building2, ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    title: 'Carpet Cleaning',
    description: 'Deep extraction cleaning that removes allergens, stains, and odors. Safe for pets and children.',
    icon: Wind,
    link: '/services/carpet-cleaning',
    number: '01'
  },
  {
    title: 'End of Lease Cleaning',
    description: 'REA-approved checklists with a bond-back guarantee. We return until your agent is satisfied.',
    icon: ClipboardCheck,
    link: '/services/end-of-lease',
    number: '02'
  },
  {
    title: 'Upholstery Cleaning',
    description: 'Restore sofas, mattresses, and curtains to like-new condition with hospital-grade equipment.',
    icon: Sofa,
    link: '/services/upholstery',
    number: '03'
  },
  {
    title: 'Commercial Cleaning',
    description: 'Office, retail, and strata cleaning with flexible scheduling that never disrupts your business.',
    icon: Building2,
    link: '/services/commercial',
    number: '04'
  }
]

export default function ServicesGrid() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  }

  return (
    <section id="services" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8">

        <div className="flex flex-col items-center text-center mx-auto mb-14 md:mb-16">
          <span className="font-body text-sm font-bold text-olive-700 uppercase tracking-[0.2em] mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-olive-900 mb-6 max-w-[600px] mx-auto leading-tight">
            Expert Cleaning Services
          </h2>
          <p className="font-body text-beige-700 leading-relaxed max-w-[500px] mx-auto text-base md:text-lg">
            Professional solutions tailored for premium Australian homes.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-10"
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
                className="group bg-beige-50 hover:bg-white border border-beige-100 rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-beige-900/8 hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-6 font-display text-6xl md:text-7xl font-bold text-olive-50 select-none pointer-events-none transition-colors duration-500 group-hover:text-olive-100">
                  {service.number}
                </span>

                <div className="relative z-10 w-16 h-16 bg-olive-100 rounded-2xl mb-7 flex items-center justify-center text-olive-900 group-hover:bg-olive-900 group-hover:text-white transition-all duration-400 shadow-sm group-hover:shadow-lg group-hover:shadow-olive-900/20">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>

                <h3 className="relative z-10 font-display text-xl md:text-2xl font-bold text-olive-900 mb-3">
                  {service.title}
                </h3>

                <p className="relative z-10 font-body text-sm md:text-base text-beige-700 mb-8 leading-relaxed flex-grow">
                  {service.description}
                </p>

                <Link
                  href={service.link}
                  className="relative z-10 inline-flex items-center gap-2 font-body font-semibold text-olive-900 hover:text-olive-700 transition-all duration-300 group/link border-b-2 border-transparent hover:border-olive-300 pb-0.5"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}