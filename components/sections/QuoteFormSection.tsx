'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ShieldCheck, Clock, Lock } from 'lucide-react'

type FormData = {
  fullName: string
  email: string
  phone: string
  serviceType: string
  message: string
}

export default function QuoteFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form Submitted:', data)
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
  }

  return (
    <section id="quote" className="w-full bg-cream py-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <span className="font-body text-sm font-semibold text-olive-500 uppercase tracking-widest mb-4">
              GET IN TOUCH
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-olive-900 mb-6 leading-tight">
              Get Your Free Quote
            </h2>
            <p className="font-body text-lg text-beige-700 mb-10 leading-relaxed max-w-md">
              Fill out the form and our team will get back to you within 2 hours with a transparent, no-obligation quote.
            </p>

            {/* Trust Badges */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-olive-100 rounded-full flex items-center justify-center text-olive-700 transition-transform group-hover:scale-110">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-body text-base font-medium text-beige-700">No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-olive-100 rounded-full flex items-center justify-center text-olive-700 transition-transform group-hover:scale-110">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="font-body text-base font-medium text-beige-700">Fast Response</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-olive-100 rounded-full flex items-center justify-center text-olive-700 transition-transform group-hover:scale-110">
                  <Lock className="w-6 h-6" />
                </div>
                <span className="font-body text-base font-medium text-beige-700">Secure & Private</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white border border-beige-300 rounded-2xl p-8 shadow-xl relative"
          >
            {isSuccess ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center text-olive-700 mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-olive-900 mb-4">Thank You!</h3>
                <p className="font-body text-beige-700 mb-8">
                  Your quote request has been received. We'll be in touch within 2 hours.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-olive-700 font-semibold hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-olive-900 mb-1">Full Name</label>
                  <input
                    {...register("fullName", { required: "Full name is required" })}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName 
                        ? 'border-[#C45B4A] focus:ring-[#C45B4A]/10' 
                        : 'border-beige-500 focus:border-olive-500 focus:ring-olive-100'
                    }`}
                  />
                  {errors.fullName && <p className="text-[#C45B4A] text-xs mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-olive-900 mb-1">Email</label>
                  <input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.email 
                        ? 'border-[#C45B4A] focus:ring-[#C45B4A]/10' 
                        : 'border-beige-500 focus:border-olive-500 focus:ring-olive-100'
                    }`}
                  />
                  {errors.email && <p className="text-[#C45B4A] text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-olive-900 mb-1">Phone</label>
                  <input
                    {...register("phone", { 
                      required: "Phone number is required",
                      pattern: {
                        value: /^(?:\+61|0)4\d{8}$/,
                        message: "Invalid Australian mobile number"
                      }
                    })}
                    type="tel"
                    placeholder="04XX XXX XXX"
                    className={`w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.phone 
                        ? 'border-[#C45B4A] focus:ring-[#C45B4A]/10' 
                        : 'border-beige-500 focus:border-olive-500 focus:ring-olive-100'
                    }`}
                  />
                  {errors.phone && <p className="text-[#C45B4A] text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Service Type */}
                <div className="relative">
                  <label className="block text-sm font-medium text-olive-900 mb-1">Service Type</label>
                  <select
                    {...register("serviceType", { required: "Please select a service" })}
                    className={`w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all appearance-none ${
                      errors.serviceType 
                        ? 'border-[#C45B4A] focus:ring-[#C45B4A]/10' 
                        : 'border-beige-500 focus:border-olive-500 focus:ring-olive-100'
                    }`}
                  >
                    <option value="">Select a service</option>
                    <option value="carpet">Carpet Cleaning</option>
                    <option value="lease">End of Lease Cleaning</option>
                    <option value="upholstery">Upholstery Cleaning</option>
                    <option value="commercial">Commercial Cleaning</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.serviceType && <p className="text-[#C45B4A] text-xs mt-1">{errors.serviceType.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-olive-900 mb-1">Message</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Tell us about your cleaning needs"
                    className="w-full px-4 py-3 rounded-lg border border-beige-500 focus:border-olive-500 focus:ring-olive-100 focus:ring-2 focus:outline-none bg-white transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-olive-700 text-white font-body font-semibold py-4 rounded-lg shadow-lg hover:bg-olive-900 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? 'Processing...' : 'Get My Quote'}
                </motion.button>

                <p className="text-center text-sm text-beige-700 mt-6">
                  Need immediate assistance? <br className="sm:hidden" />
                  Call us: <a href="tel:180064652" className="text-olive-700 font-bold hover:underline">1800-NINJA</a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
