'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SERVICES } from '@/lib/constants'

export default function ServicesSection() {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-navy mb-4">
            Our Expert Cleaning Services
          </h2>
          <p className="text-xl text-navy-light max-w-2xl mx-auto">
            Professional cleaning solutions tailored for Australian homes and businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/services/${service.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-elegant hover:shadow-gold transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.fallback}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-2xl text-navy mb-3 group-hover:text-gold transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-navy-light">{service.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
