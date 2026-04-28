'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ShieldCheck, Clock, Lock, Loader2, CheckCircle2 } from 'lucide-react'

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
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Form Submitted:', data)
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
  }

  return (
    <section id="quote" className="w-full bg-white py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            <span className="font-body text-sm md:text-base text-olive-700 uppercase tracking-[0.2em] font-medium block mb-4">
              GET IN TOUCH
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-olive-900 mb-6 leading-tight">
              Get Your Free Quote
            </h2>
            <p className="font-body text-lg md:text-xl text-beige-700 mb-12 leading-relaxed font-light max-w-lg">
              Fill out the form and our team will get back to you within 2 hours with a transparent, no-obligation quote.
            </p>

            {/* Trust Badges */}
            <div className="space-y-8">
              {[
                { icon: ShieldCheck, text: "No Hidden Fees", desc: "The price we quote is the exact price you pay." },
                { icon: Clock, text: "Fast Response", desc: "We guarantee a response within 2 business hours." },
                { icon: Lock, text: "Secure & Private", desc: "Your personal details are encrypted and never shared." }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-start gap-5 group cursor-default">
                  <div className="w-12 h-12 bg-olive-50 rounded-2xl flex items-center justify-center text-olive-700 group-hover:scale-110 group-hover:bg-olive-100 transition-all duration-300 flex-shrink-0">
                    <badge.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold text-olive-900 mb-1">{badge.text}</h4>
                    <p className="font-body text-beige-700 font-light leading-relaxed">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-white border-2 border-beige-50 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-olive-50 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-16 relative z-10"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, delay: 0.1 }}
                    className="w-24 h-24 bg-olive-50 rounded-full flex items-center justify-center text-olive-700 mx-auto mb-8"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <h3 className="font-display text-3xl font-bold text-olive-900 mb-4">Request Received!</h3>
                  <p className="font-body text-lg text-beige-700 mb-10 font-light leading-relaxed">
                    Thank you for reaching out. Our team is reviewing your request and will contact you shortly with your custom quote.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="font-body text-olive-700 font-semibold hover:text-olive-900 transition-colors border-b-2 border-olive-300 hover:border-olive-900 pb-1"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)} 
                  className="space-y-5 relative z-10"
                >
                  {/* Full Name & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <input
                        {...register("fullName", { required: "Full name is required" })}
                        placeholder="Full Name"
                        className={`w-full px-5 py-4 rounded-xl bg-beige-50 border-2 border-transparent focus:outline-none focus:bg-white focus:border-olive-300 focus:ring-4 focus:ring-olive-50 transition-all placeholder:text-beige-500 font-body ${
                          errors.fullName ? '!border-red-300 focus:!ring-red-50' : ''
                        }`}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.fullName.message}</p>}
                    </div>

                    <div>
                      <input
                        {...register("phone", { 
                          required: "Phone number is required",
                          pattern: { value: /^(?:\+61|0)4\d{8}$/, message: "Invalid mobile number" }
                        })}
                        type="tel"
                        placeholder="Mobile Number"
                        className={`w-full px-5 py-4 rounded-xl bg-beige-50 border-2 border-transparent focus:outline-none focus:bg-white focus:border-olive-300 focus:ring-4 focus:ring-olive-50 transition-all placeholder:text-beige-500 font-body ${
                          errors.phone ? '!border-red-300 focus:!ring-red-50' : ''
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.phone.message}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }
                      })}
                      type="email"
                      placeholder="Email Address"
                      className={`w-full px-5 py-4 rounded-xl bg-beige-50 border-2 border-transparent focus:outline-none focus:bg-white focus:border-olive-300 focus:ring-4 focus:ring-olive-50 transition-all placeholder:text-beige-500 font-body ${
                        errors.email ? '!border-red-300 focus:!ring-red-50' : ''
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.email.message}</p>}
                  </div>

                  {/* Service Type */}
                  <div className="relative">
                    <select
                      {...register("serviceType", { required: "Please select a service" })}
                      className={`w-full px-5 py-4 rounded-xl bg-beige-50 border-2 border-transparent focus:outline-none focus:bg-white focus:border-olive-300 focus:ring-4 focus:ring-olive-50 transition-all appearance-none placeholder:text-beige-500 font-body text-beige-900 ${
                        errors.serviceType ? '!border-red-300 focus:!ring-red-50' : ''
                      }`}
                    >
                      <option value="" disabled hidden>Select Service Type</option>
                      <option value="carpet">Carpet Cleaning</option>
                      <option value="lease">End of Lease Cleaning</option>
                      <option value="upholstery">Upholstery Cleaning</option>
                      <option value="commercial">Commercial Cleaning</option>
                      <option value="other">Other</option>
                    </select>
                    {/* Custom Select Arrow */}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-beige-500">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {errors.serviceType && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.serviceType.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Tell us about your space and cleaning needs..."
                      className="w-full px-5 py-4 rounded-xl bg-beige-50 border-2 border-transparent focus:outline-none focus:bg-white focus:border-olive-300 focus:ring-4 focus:ring-olive-50 transition-all resize-none placeholder:text-beige-500 font-body"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-olive-700 text-white font-body font-bold py-5 rounded-xl shadow-lg hover:bg-olive-900 hover:shadow-xl transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed mt-4 flex items-center justify-center text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Get My Free Quote'
                    )}
                  </motion.button>
                  
                  <p className="text-center font-body text-sm text-beige-500 mt-6 font-light">
                    Need immediate assistance? Call <a href="tel:180064652" className="text-olive-700 font-semibold hover:underline">1800-NINJA</a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
