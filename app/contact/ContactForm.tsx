'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Send } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import { COVERAGE } from '@/content/coverage'

const ContactSchema = z.object({
  name: z.string().min(2, 'Your name.'),
  email: z.string().email('A working email.'),
  phone: z.string().optional(),
  topic: z.string().min(1, 'Pick the topic.'),
  city: z.string().min(1, 'Pick your city.'),
  message: z.string().min(10, 'Tell us a bit more.'),
})

type ContactData = z.infer<typeof ContactSchema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>({ resolver: zodResolver(ContactSchema) })

  const onSubmit = async (_data: ContactData) => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setSubmitting(false)
    reset()
  }

  if (submitted) {
    return (
      <div className="border border-olive bg-cream rounded-[4px] p-8 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-olive-pale mb-6">
          <CheckCircle className="h-7 w-7 text-olive-deep" />
        </div>
        <Heading as="h3" variant="h3" className="mb-3 text-charcoal">
          Thanks. We'll be in touch.
        </Heading>
        <Body variant="body" className="text-charcoal/70 max-w-md mx-auto" measure>
          We respond within one business day. If your enquiry is bookable, the
          fastest path is the booking flow.
        </Body>
        <Button
          type="button"
          variant="quiet-link"
          onClick={() => setSubmitted(false)}
          className="mt-6"
        >
          Send another
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

      <Button type="submit" variant="primary-light" size="lg" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send enquiry'}
        <Send className="h-4 w-4 ml-1" />
      </Button>
    </form>
  )
}
