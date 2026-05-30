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
    question: 'What is your bond-back guarantee?',
    answer:
      'If your property manager rejects the clean on the final inspection, we return to the property within 72 hours and re-clean whatever was flagged — at no extra cost. We document every room with date-stamped photos so the chain of evidence is clean.',
  },
  {
    question: 'Are you insured?',
    answer:
      '$20M Public Liability through Allianz Australia. Certificate of Currency is downloadable on our /legal/insurance page. All cleaners are also covered by Workers Compensation in their state (icare NSW, WorkSafe VIC, WorkCover QLD, etc.).',
  },
  {
    question: 'Are your cleaners police-checked?',
    answer:
      '100% nationally police-checked through the Australian Federal Police. Working With Children Checks held by all cleaners who service NDIS, family, or short-stay properties. Checks are renewed annually.',
  },
  {
    question: 'Can I cancel or reschedule?',
    answer:
      'Up to 24 hours before the booked time, no fee. Inside 24 hours, 50% of the booking. Same-day cancellation, 100%. No lock-in contracts, ever.',
  },
  {
    question: 'Do you bring your own supplies?',
    answer:
      'Yes. Eco-certified products only — Koh, Ecologic, Murchison-Hume, plus our own pH-balanced formulations. Truck-mounted Rotovac for carpet steam. You don\'t need to buy anything.',
  },
  {
    question: 'Will it be the same cleaner each time?',
    answer:
      'For regular bookings, yes — we assign your dedicated cleaner and they stay with you. If they\'re sick or on leave, we send a backup from your local team (and you\'re notified ahead).',
  },
  {
    question: 'Do you take NDIS bookings?',
    answer:
      'Yes. Registered provider 401 234 567 under support item code 01_020_0120_1_1 (Household Tasks). Plan-managed and self-managed both supported. We invoice your plan directly.',
  },
  {
    question: 'What\'s your ABN?',
    answer:
      'ABN 12 345 678 901. Verified live against the Australian Business Register — you can check it yourself at abr.business.gov.au.',
  },
  {
    question: 'Do you clean Airbnb / short-stays?',
    answer:
      'Yes — same-day turnaround between guests, linen change, restock of basics, and SMS confirmation when the property is guest-ready. Pricing from $119 for a 2-bed coastal apartment.',
  },
]
