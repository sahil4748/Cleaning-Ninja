'use client'

import { LEAD_UNAVAILABLE_MESSAGE } from '@/lib/platform/lead-client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { COVERAGE } from '@/content/coverage'

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Your name.'),
  email: z.string().email('A working email.'),
  phone: z.string().optional(),
  topic: z.string().trim().min(1, 'Pick the topic.'),
  city: z.string().trim().min(1, 'Pick your city.'),
  message: z.string().trim().min(10, 'Tell us a bit more.'),
})

type ContactData = z.infer<typeof ContactSchema>

export function ContactForm() {
  const [submissionError, setSubmissionError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({ resolver: zodResolver(ContactSchema), defaultValues: { name: '', email: '', phone: '', topic: '', city: '', message: '' } })

  const onSubmit = async (_data: ContactData) => {
    setSubmitting(true)
    setSubmissionError(LEAD_UNAVAILABLE_MESSAGE)
    setSubmitting(false)
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border border-border rounded-[4px] bg-cream p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Name"
          placeholder="Jane Singh"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="jane@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Phone (optional)"
          type="tel"
          placeholder="04XX XXX XXX"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Select
          label="City"
          placeholder="Choose"
          error={errors.city?.message}
          {...register('city')}
        >
          {COVERAGE.map((c) => (
            <option key={c.slug} value={c.city}>
              {c.city}
            </option>
          ))}
        </Select>
      </div>

      <Select
        label="Topic"
        placeholder="What's the enquiry about?"
        error={errors.topic?.message}
        {...register('topic')}
      >
        <option value="quote">Get a quote</option>
        <option value="booking">Existing booking</option>
        <option value="ndis">NDIS / plan-managed</option>
        <option value="commercial">Commercial / strata</option>
        <option value="other">Other</option>
      </Select>

      <Textarea
        label="Message"
        placeholder="Property size, preferred dates, anything we should know."
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />

      {submissionError && <p role="alert">{submissionError}</p>}
      <Button type="submit" variant="primary-light" size="lg" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send enquiry'}
        <Send className="h-4 w-4 ml-1" />
      </Button>
    </form>
  )
}
