'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import { SERVICES } from '@/lib/constants'

interface QuoteFormData {
  serviceType: string
  propertyType: string
  suburb: string
  email: string
  phone: string
  message?: string
}

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuoteFormData>()

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Quote request sent! We\'ll contact you within 24 hours.')
        reset()
      } else {
        toast.error('Failed to send. Please try again or call us.')
      }
    } catch (error) {
      toast.error('Something went wrong. Please call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-navy font-medium mb-2">Service Type *</label>
          <select
            {...register('serviceType', { required: 'Please select a service' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">Choose your service</option>
            {SERVICES.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
          {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>}
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Property Type *</label>
          <select
            {...register('propertyType', { required: 'Please select property type' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">Choose property type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="office">Office</option>
          </select>
          {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType.message}</p>}
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Suburb/Postcode *</label>
          <input
            type="text"
            {...register('suburb', { required: 'Please enter your suburb' })}
            placeholder="Enter your suburb or postcode"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          />
          {errors.suburb && <p className="text-red-500 text-sm mt-1">{errors.suburb.message}</p>}
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Email Address *</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter your email',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
            })}
            placeholder="your@email.com.au"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Phone Number *</label>
          <input
            type="tel"
            {...register('phone', { required: 'Please enter your phone number' })}
            placeholder="04XX XXX XXX"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-navy font-medium mb-2">Special Requirements (Optional)</label>
          <textarea
            {...register('message')}
            rows={4}
            placeholder="Tell us any specific requirements..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting ? 'Sending...' : 'Get My Free Quote'}
      </Button>

      <p className="text-center text-sm text-navy-light">
        No obligation • Free quotes • Same-day response
      </p>
    </form>
  )
}
