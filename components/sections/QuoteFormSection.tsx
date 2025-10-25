'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Sparkles, Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SERVICES, PHONE_NUMBER, PHONE_LINK, EMAIL } from '@/lib/constants'

export default function QuoteFormSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    suburb: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', service: '', suburb: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="quote" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-16 h-16 text-gold" />
          </motion.div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-navy mb-6">
            Get Your Free Quote in 60 Seconds
          </h2>
          <p className="text-xl text-navy/70 max-w-2xl mx-auto">
            No obligation • Free quotes • Same-day response guaranteed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Phone Card */}
            <a
              href={PHONE_LINK}
              className="block bg-gradient-gold rounded-2xl p-6 shadow-gold hover:shadow-gold-lg transition-all transform hover:scale-105 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Phone className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <p className="text-navy/70 text-sm font-medium">Call Us Now</p>
                  <p className="text-2xl font-bold text-navy">{PHONE_NUMBER}</p>
                </div>
              </div>
            </a>

            {/* Email Card */}
            <div className="bg-accent rounded-2xl p-6 shadow-elegant border border-gold/20">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <p className="text-navy/70 text-sm font-medium">Email Us</p>
                  <p className="text-lg font-semibold text-navy">{EMAIL}</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-primary text-white rounded-2xl p-6 shadow-elegant">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium">Service Areas</p>
                  <p className="text-lg font-semibold">All Major Cities</p>
                </div>
              </div>
              <p className="text-white/80 text-sm">
                Sydney • Melbourne • Brisbane • Perth • Adelaide • Canberra
              </p>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-2xl p-6 shadow-elegant border-2 border-gold/20">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <p className="text-navy/70 text-sm font-medium">Business Hours</p>
                  <p className="text-lg font-semibold text-navy">7 Days a Week</p>
                  <p className="text-sm text-navy/60">7:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quote Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-accent rounded-3xl p-8 shadow-royal border border-gold/20 relative">
              {/* Success Message Overlay */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-gradient-gold rounded-3xl flex items-center justify-center z-20"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      <CheckCircle2 className="w-24 h-24 text-navy mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-navy mb-2">Quote Received!</h3>
                    <p className="text-navy/80">We'll contact you within 24 hours</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-navy font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                      className="w-full px-4 py-4 border-2 border-gold/20 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-navy font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@email.com.au"
                      className="w-full px-4 py-4 border-2 border-gold/20 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Phone & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-navy font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="04XX XXX XXX"
                      className="w-full px-4 py-4 border-2 border-gold/20 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-navy font-semibold mb-2">
                      Service Type *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gold/20 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all outline-none bg-white"
                    >
                      <option value="">Choose your service</option>
                      {SERVICES.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Suburb */}
                <div>
                  <label className="block text-navy font-semibold mb-2">
                    Suburb/Postcode *
                  </label>
                  <input
                    type="text"
                    name="suburb"
                    value={formData.suburb}
                    onChange={handleChange}
                    required
                    placeholder="Enter your suburb or postcode"
                    className="w-full px-4 py-4 border-2 border-gold/20 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all outline-none bg-white"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-navy font-semibold mb-2">
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your cleaning needs..."
                    className="w-full px-4 py-4 border-2 border-gold/20 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all outline-none bg-white resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-lg py-6 shadow-gold-lg"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-3 border-navy border-t-transparent rounded-full"
                      />
                      <span className="ml-2">Sending...</span>
                    </>
                  ) : (
                    <>
                      Get My Free Quote
                      <Sparkles className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-navy/60">
                  🔒 Your information is secure and will never be shared
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
