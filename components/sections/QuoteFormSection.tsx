'use client'

import { useState } from 'react'
import { Phone, Mail, CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SERVICES, PHONE_NUMBER, EMAIL } from '@/lib/constants'

export default function QuoteFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Note: API integration pending
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you! Your quote request has been received. We will contact you shortly.')
    }, 1000)
  }

  return (
    <section id="quote" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          {/* Left Column: Copy & Trust */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-6">
              Get Your Free Quote
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Fill out the form below and our team will get back to you within 2 hours with a transparent, no-obligation quote.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                  <CheckCircle2 className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-navy">No Hidden Fees</h4>
                  <p className="text-gray-600 text-sm">What we quote is what you pay.</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                  <CheckCircle2 className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-navy">Fast Response</h4>
                  <p className="text-gray-600 text-sm">Guaranteed reply within 2 business hours.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8 space-y-4">
              <p className="text-gray-600">Need immediate assistance?</p>
              <div className="flex items-center text-navy font-bold text-lg">
                <Phone className="w-5 h-5 mr-3 text-gold" />
                {PHONE_NUMBER}
              </div>
              <div className="flex items-center text-navy font-bold text-lg">
                <Mail className="w-5 h-5 mr-3 text-gold" />
                {EMAIL}
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="bg-accent rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white"
                    placeholder="0400 000 000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white"
                  placeholder="john@example.com.au"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-navy mb-2">Service Required</label>
                  <select
                    id="service"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white"
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="suburb" className="block text-sm font-semibold text-navy mb-2">Suburb / Postcode</label>
                  <input
                    type="text"
                    id="suburb"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white"
                    placeholder="e.g. 2000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">Additional Details (Optional)</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white resize-none"
                  placeholder="Tell us about the property size, specific stains, etc."
                ></textarea>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                {isSubmitting ? 'Processing...' : 'Request Free Quote'}
              </Button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                Your information is kept strictly confidential.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

