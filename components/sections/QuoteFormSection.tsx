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

const inputClass = "w-full px-5 py-4 rounded-xl bg-beige-50 border-2 border-transparent focus:outline-none focus:bg-white focus:border-olive-300 focus:ring-4 focus:ring-olive-50 transition-all duration-300 placeholder:text-beige-500 font-body"
const errorInput = "!border-red-300 focus:!ring-red-50"

export default function QuoteFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Form Submitted:', data)
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
  }

  return (
    <section id="quote" className="py-16 md:py-24 lg:py-28 bg-beige-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14 md:mb-16"
        >
          <span className="font-body text-xs md:text-sm font-bold text-olive-700 uppercase tracking-[0.2em] block mb-4">GET IN TOUCH</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-olive-900 mb-5 max-w-2xl leading-tight">Get Your Free Quote</h2>
          <p className="font-body text-beige-700 font-light max-w-lg text-base md:text-lg">
            Fill out the form and our team will get back to you within 2 hours with a transparent, no-obligation quote.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-beige-100 rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden mb-16 max-w-3xl mx-auto"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-olive-50 rounded-bl-full -mr-12 -mt-12 pointer-events-none" />

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-16 relative z-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15, delay: 0.1 }} className="w-20 h-20 bg-olive-50 rounded-full flex items-center justify-center text-olive-700 mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-olive-900 mb-4">Request Received!</h3>
                <p className="font-body text-beige-700 mb-10 font-light max-w-md mx-auto">Our team is reviewing your request and will contact you shortly.</p>
                <button onClick={() => setIsSuccess(false)} className="font-body text-olive-700 font-semibold hover:text-olive-900 transition-colors border-b-2 border-olive-300 hover:border-olive-900 pb-1">
                  Send another request
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <input {...register("fullName", { required: "Full name is required" })} placeholder="Full Name" className={`${inputClass} ${errors.fullName ? errorInput : ''}`} />
                    {errors.fullName && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <input {...register("phone", { required: "Phone number is required", pattern: { value: /^(?:\+61|0)4\d{8}$/, message: "Invalid mobile number" } })} type="tel" placeholder="Mobile Number" className={`${inputClass} ${errors.phone ? errorInput : ''}`} />
                    {errors.phone && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <input {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" } })} type="email" placeholder="Email Address" className={`${inputClass} ${errors.email ? errorInput : ''}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.email.message}</p>}
                </div>

                <div className="relative">
                  <select {...register("serviceType", { required: "Please select a service" })} className={`${inputClass} appearance-none text-beige-900 ${errors.serviceType ? errorInput : ''}`}>
                    <option value="" disabled hidden>Select Service Type</option>
                    <option value="carpet">Carpet Cleaning</option>
                    <option value="lease">End of Lease Cleaning</option>
                    <option value="upholstery">Upholstery Cleaning</option>
                    <option value="commercial">Commercial Cleaning</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-beige-500">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  {errors.serviceType && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.serviceType.message}</p>}
                </div>

                <div>
                  <textarea {...register("message")} rows={4} placeholder="Tell us about your cleaning needs..." className={`${inputClass} resize-none`} />
                </div>

                <motion.button whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.99 }} disabled={isSubmitting} type="submit" className="w-full bg-olive-700 text-white font-body font-bold py-5 rounded-xl shadow-lg shadow-olive-700/20 hover:bg-olive-900 transition-colors duration-300 disabled:opacity-80 disabled:cursor-not-allowed mt-2 flex items-center justify-center text-lg cursor-pointer">
                  {isSubmitting ? (<><Loader2 className="w-6 h-6 mr-3 animate-spin" />Processing...</>) : 'Get My Free Quote'}
                </motion.button>

                <p className="text-center font-body text-sm text-beige-500 mt-4 font-light">
                  Need help now? Call <a href="tel:180064652" className="text-olive-700 font-semibold hover:underline">1800-NINJA</a>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto"
        >
          {[
            { icon: ShieldCheck, text: "No Hidden Fees", desc: "The price we quote is the price you pay." },
            { icon: Clock, text: "Fast Response", desc: "We respond within 2 hours." },
            { icon: Lock, text: "Secure & Private", desc: "Your details are encrypted." }
          ].map((b, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 bg-olive-50 rounded-xl flex items-center justify-center text-olive-700 group-hover:scale-110 group-hover:bg-olive-100 transition-all duration-300 mb-3">
                <b.icon className="w-5 h-5" />
              </div>
              <h4 className="font-display text-base font-bold text-olive-900 mb-1">{b.text}</h4>
              <p className="font-body text-xs text-beige-600 font-light">{b.desc}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
