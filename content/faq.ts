/**
 * Cleaning Ninja — FAQ.
 *
 * Optimised for featured snippets via FAQPage JSON-LD schema. Each Q is a
 * single search query; each A is the shortest correct answer that still
 * sounds like a human.
 */

export interface FaqItem {
  question: string
  answer: string
}

export const FAQS: FaqItem[] = [
  {
    question: 'How much does a cleaning ninja booking actually cost?',
    answer:
      'Flat-rate, no surprises. Regular cleans from $129 (1 bed/1 bath) to $359 (5 bed/3 bath). End-of-lease from $295 to $875+. Prices vary by city — Melbourne and Brisbane sit ~15% under Sydney; Adelaide ~20% under. Every quote on this website is a real booking price, not a guess.',
  },
  {
    question: 'What is included in an end-of-lease clean?',
    answer:
      'We work through a room-by-room move-out checklist covering kitchens, bathrooms, living areas, bedrooms, floors, skirting boards, tracks, cupboards, and other agreed items.',
  },
  {
    question: 'Can I cancel or reschedule?',
    answer:
      'You can reschedule or cancel 24+ hours before the booked time with no fee. Inside 24 hours, cancellation fees may apply under the booking terms.',
  },
  {
    question: 'Do you bring your own supplies?',
    answer:
      'Yes. The cleaner brings the standard products and equipment needed for the booked service. If your home needs a specific product, add it in the booking notes.',
  },
  {
    question: 'Will it be the same cleaner each time?',
    answer:
      'For regular bookings, yes — we assign your dedicated cleaner and they stay with you. If they\'re sick or on leave, we send a backup from your local team (and you\'re notified ahead).',
  },
  {
    question: 'Do you take NDIS bookings?',
    answer:
      'NDIS and support-cleaning requests can be sent through the contact form. The team will confirm the booking requirements before accepting the job.',
  },
  {
    question: 'What\'s your ABN?',
    answer:
      'ABN 12 345 678 901. Verified live against the Australian Business Register — you can check it yourself at abr.business.gov.au.',
  },
  {
    question: 'Do you clean Airbnb / short-stays?',
    answer:
      'Yes. Short-stay cleans can be booked for changeovers between guests. Add the check-out and check-in times in the booking notes so the team can confirm availability.',
  },
]
