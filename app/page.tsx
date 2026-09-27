import type { Metadata } from 'next'
import { Instrument_Serif, Manrope } from 'next/font/google'
import Homepage from '@/components/homepage/Homepage'
import './homepage.css'

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--home-serif', display: 'swap' })
const sans = Manrope({ subsets: ['latin'], variable: '--home-sans', display: 'swap' })
const description = 'Cleaning services in Brisbane, with a simple quote-first process.'
export const metadata: Metadata = {
  title: { absolute: 'Cleaning Ninja Brisbane — Bring your space back to calm' },
  description, keywords: ['Cleaning Ninja', 'cleaning services Brisbane'],
  alternates: { canonical: '/' },
  openGraph: { title: 'Cleaning Ninja Brisbane — Bring your space back to calm', description, url: '/', images: [{ url: '/homepage/hero-desktop.jpg', width: 1920, height: 1264, alt: 'Illustrative home interior' }] },
  twitter: { card: 'summary_large_image', title: 'Cleaning Ninja Brisbane', description, images: ['/homepage/hero-desktop.jpg'] },
}
export default function HomePage() {
  return <div className={`${serif.variable} ${sans.variable}`}><Homepage /></div>
}
