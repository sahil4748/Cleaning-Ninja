'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { SERVICES } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" className="py-24 bg-accent relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold font-elegant font-semibold text-sm tracking-wider uppercase mb-4">
            Premium Services
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-navy mb-6">
            Our Expert Cleaning Services
          </h2>
          <p className="text-xl text-navy/70 max-w-3xl mx-auto">
            Professional cleaning solutions tailored for Australian homes and businesses.
            Each service delivered with precision, care, and guaranteed results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group"
            >
              <Link href={`/services/${service.slug}`} className="block">
                <div className="bg-white rounded-3xl overflow-hidden shadow-elegant hover:shadow-royal transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                  {/* Service GIF/Image */}
                  <div className="relative h-64 overflow-hidden">
                    {/* Try to load GIF, fallback to image */}
                    <img
                      src={service.fallback}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gold Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gold/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Premium Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-gold text-navy px-4 py-2 rounded-full font-bold text-sm shadow-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Premium
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="font-display font-bold text-2xl text-navy mb-3 group-hover:text-gold transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-navy/70 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center space-x-2 text-gold font-semibold group-hover:translate-x-2 transition-transform">
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5" />
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
