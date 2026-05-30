'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Send } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import { COVERAGE } from '@/content/coverage'

const ApplicationSchema = z.object({
  fullName: z.string().min(2, 'Tell us your name.'),
  email: z.string().email('A working email address.'),
  phone: z.string().min(8, 'A working AU phone number.'),
  city: z.string().min(1, 'Pick the city you work in.'),
  experience: z.string().min(1, 'Pick a band.'),
  about: z.string().min(20, 'A couple of sentences about you.'),
})

type ApplicationData = z.infer<typeof ApplicationSchema>

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationData>({
    resolver: zodResolver(ApplicationSchema),
  })

  const onSubmit = async (_data: ApplicationData) => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setSubmitting(false)
    reset()
  }

  if (submitted) {
    return (
      <div className="bg-cream border border-olive rounded-[4px] p-8 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-olive-pale mb-6">
          <CheckCircle className="h-7 w-7 text-olive-deep" />
        </div>
        <Heading as="h3" variant="h3" className="mb-3 text-charcoal">
          Application received.
        </Heading>
        <Body variant="body" className="text-charcoal/70 max-w-md mx-auto" measure>
          Grace or one of the regional leads will be in touch within two
          business days. If your application progresses we'll send a Working
          With Children Check link and a federal police clearance request next.
        </Body>
        <Button
          type="button"
          variant="quiet-link"
          onClick={() => setSubmitted(false)}
          className="mt-6"
        >
          Submit another
        </Button>
      </div>
    )
  }

  return (
    <form
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

      <Button type="submit" variant="primary-light" size="lg" disabled={submitting}>
        {submitting ? 'Sending...' : 'Submit application'}
        <Send className="h-4 w-4 ml-1" />
      </Button>
    </form>
  )
}
