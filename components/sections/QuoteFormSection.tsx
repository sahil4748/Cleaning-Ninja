'use client'

import { motion } from 'framer-motion'
import QuoteForm from '@/components/forms/QuoteForm'

export default function QuoteFormSection() {
  return (
    <section id="quote" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-navy mb-4">
              Get Your Free Quote in 60 Seconds
            </h2>
            <p className="text-xl text-navy-light">
              No obligation, free quotes with same-day response
            </p>
          </div>

          <div className="bg-accent rounded-2xl p-8 shadow-elegant">
            <QuoteForm />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
