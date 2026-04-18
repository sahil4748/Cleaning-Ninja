'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SERVICES } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-6">
            Expert Cleaning Services
          </h2>
          <p className="text-lg text-gray-600">
            Professional solutions tailored for Australian homes. Every service is delivered with precision, care, and guaranteed results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/services/${service.slug}`} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col border border-gray-100">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={service.fallback}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow">
                      {service.description}
                    </p>
                    <div className="flex items-center text-gold font-semibold mt-auto">
                      <span>View details</span>
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
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
