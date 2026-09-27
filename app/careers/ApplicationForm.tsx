'use client'

import { LEAD_UNAVAILABLE_MESSAGE } from '@/lib/platform/lead-client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { COVERAGE } from '@/content/coverage'

const ApplicationSchema = z.object({
  fullName: z.string().trim().min(2, 'Tell us your name.'),
  email: z.string().email('A working email address.'),
  phone: z.string().trim().min(8, 'A working AU phone number.'),
  city: z.string().trim().min(1, 'Pick the city you work in.'),
  experience: z.string().trim().min(1, 'Pick a band.'),
  about: z.string().trim().min(20, 'A couple of sentences about you.'),
})

type ApplicationData = z.infer<typeof ApplicationSchema>

export function ApplicationForm() {
  const [submissionError, setSubmissionError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationData>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: { fullName: '', email: '', phone: '', city: '', experience: '', about: '' },
  })

  const onSubmit = async (_data: ApplicationData) => {
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
          label="Full name"
          placeholder="Jane Singh"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="jane@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Phone"
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
        label="Experience"
        placeholder="How long have you cleaned professionally?"
        error={errors.experience?.message}
        {...register('experience')}
      >
        <option value="<1">Less than a year</option>
        <option value="1-2">1-2 years</option>
        <option value="3-5">3-5 years</option>
        <option value="5+">5+ years</option>
      </Select>

      <Textarea
        label="A few lines about you"
        placeholder="What you specialise in. What you like about cleaning work. The kinds of bookings you'd take."
        rows={5}
        error={errors.about?.message}
        {...register('about')}
      />

      {submissionError && <p role="alert">{submissionError}</p>}
      <Button type="submit" variant="primary-light" size="lg" disabled={submitting}>
        {submitting ? 'Sending...' : 'Submit application'}
        <Send className="h-4 w-4 ml-1" />
      </Button>
    </form>
  )
}
