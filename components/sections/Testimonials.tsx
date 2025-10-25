'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-24 bg-accent relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-gold/10">
        <Quote className="w-32 h-32" />
      </div>
      <div className="absolute bottom-20 right-10 text-gold/10">
        <Quote className="w-32 h-32 transform rotate-180" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold font-elegant font-semibold text-sm tracking-wider uppercase mb-4">
            Customer Reviews
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-navy mb-6">
            What Our Aussie Customers Say
          </h2>
          <p className="text-xl text-navy/70 max-w-2xl mx-auto">
            Real reviews from real customers across Australia. Join thousands of satisfied families.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-elegant hover:shadow-royal transition-all duration-500 transform hover:-translate-y-2 relative">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-gold rounded-bl-full opacity-10" />

                {/* Stars */}
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-gold text-gold"
                    />
                  ))}
                </div>

                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-gold shadow-gold"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold">
                      <span className="text-2xl">✓</span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-gold/30 absolute -top-2 -left-2" />
                  <p className="text-navy/80 italic text-center relative z-10 px-4 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <Quote className="w-8 h-8 text-gold/30 absolute -bottom-2 -right-2 transform rotate-180" />
                </div>

                {/* Customer Info */}
                <div className="text-center border-t border-gold/20 pt-4">
                  <p className="font-bold text-navy text-lg">{testimonial.name}</p>
                  <p className="text-sm text-navy/60">{testimonial.location}</p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-gold rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
        >
          {[
            { number: '5,000+', label: 'Happy Customers' },
            { number: '4.9/5', label: 'Average Rating' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '10+', label: 'Years Experience' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
              className="text-center bg-white rounded-2xl p-6 shadow-elegant"
            >
              <p className="text-3xl font-bold text-gold mb-2">{stat.number}</p>
              <p className="text-navy/70 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
