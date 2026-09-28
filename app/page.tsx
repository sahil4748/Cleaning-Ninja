import type { Metadata } from 'next'
import { Instrument_Serif, Manrope } from 'next/font/google'
import Homepage from '@/components/homepage/Homepage'
import './homepage.css'

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--home-serif', display: 'swap' })
const sans = Manrope({ subsets: ['latin'], variable: '--home-sans', display: 'swap' })
const description = 'Cleaning services across major Australian cities, with a simple quote-first process.'
export const metadata: Metadata = {
  title: { absolute: 'Cleaning Ninja — Bring your space back to calm' },
  description, keywords: ['Cleaning Ninja', 'cleaning services Australia'],
  alternates: { canonical: '/' },
  openGraph: { title: 'Cleaning Ninja — Bring your space back to calm', description, url: '/', images: [{ url: '/homepage/hero-desktop.jpg', width: 1920, height: 1264, alt: 'Illustrative home interior' }] },
  twitter: { card: 'summary_large_image', title: 'Cleaning Ninja', description, images: ['/homepage/hero-desktop.jpg'] },
}
export default function HomePage() {
  return <div className={`${serif.variable} ${sans.variable}`}><Homepage /></div>
}
