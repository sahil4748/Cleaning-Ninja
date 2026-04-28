'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { Wind, ClipboardCheck, Sofa, Building2, ArrowRight } from 'lucide-react'

const SERVICES = [
  { title: 'Carpet Cleaning', description: 'Deep extraction cleaning that removes allergens, stains, and odors. Safe for pets and children.', icon: Wind, link: '/services/carpet-cleaning', num: '01' },
  { title: 'End of Lease Cleaning', description: 'REA-approved checklists with a bond-back guarantee. We return until your agent is satisfied.', icon: ClipboardCheck, link: '/services/end-of-lease', num: '02' },
  { title: 'Upholstery Cleaning', description: 'Restore sofas, mattresses, and curtains to like-new condition with hospital-grade equipment.', icon: Sofa, link: '/services/upholstery', num: '03' },
  { title: 'Commercial Cleaning', description: 'Office, retail, and strata cleaning with flexible scheduling that never disrupts your business.', icon: Building2, link: '/services/commercial', num: '04' }
]

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export default function ServicesGrid() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-28 bg-beige-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14 md:mb-16"
        >
          <span className="font-body text-xs md:text-sm font-bold text-olive-700 uppercase tracking-[0.2em] mb-4">Our Services</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-olive-900 mb-5 max-w-2xl leading-tight">Expert Cleaning Services</h2>
          <p className="font-body text-beige-700 leading-relaxed max-w-lg text-base md:text-lg">Professional solutions tailored for premium Australian homes.</p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div key={i} variants={fadeUp} className="group bg-white border border-beige-100 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-beige-900/6 hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col relative overflow-hidden">
                <span className="absolute top-5 right-6 font-display text-6xl font-bold text-beige-100 select-none pointer-events-none group-hover:text-olive-50 transition-colors duration-500">{service.num}</span>

                <div className="relative z-10 w-14 h-14 bg-olive-50 rounded-xl mb-6 flex items-center justify-center text-olive-900 group-hover:bg-olive-900 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>

                <h3 className="relative z-10 font-display text-xl md:text-2xl font-bold text-olive-900 mb-3">{service.title}</h3>
                <p className="relative z-10 font-body text-sm md:text-base text-beige-700 mb-8 leading-relaxed flex-grow">{service.description}</p>

                <Link href={service.link} className="relative z-10 inline-flex items-center gap-2 font-body font-semibold text-olive-900 hover:text-olive-700 transition-all duration-300 self-start group/link">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}