import { Metadata } from 'next'
import NotFoundContent from '@/components/sections/NotFoundContent'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Cleaning Ninja',
  description: "This page went ninja-vanish! Let's get you back on track with Sydney, Melbourne and Brisbane's premier flat-rate home cleaning team.",
  alternates: { canonical: '/404' },
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return <NotFoundContent />
}
