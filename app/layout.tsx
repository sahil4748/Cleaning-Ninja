import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileStickyCta from '@/components/layout/MobileStickyCta'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { LenisProvider } from '@/components/motion/LenisProvider'
import { SparkleCursor } from '@/components/motion/SparkleCursor'
import { PageLoader } from '@/components/motion/PageLoader'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/lib/schema'

/*
 * Display: Plus Jakarta Sans Variable.
 *   The plan locks Satoshi Variable. Plus Jakarta Sans is the open-source
 *   geometric sans Google Fonts hosts that lands closest to Satoshi's optical
 *   sizing. Swap to next/font/local + Satoshi-Variable.woff2 in production
 *   without changing any consumer code — the --font-display CSS variable is
 *   the only contract.
 */
const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cleaningninja.com.au'),
  title: {
    default: 'Cleaning Ninja — Flat-Rate Cleaning Services',
    template: '%s | Cleaning Ninja',
  },
  description:
    'Flat-rate cleaning services from $129 across Sydney, Melbourne, Brisbane, Perth, Adelaide and the Gold Coast. Regular home cleans, move-out cleaning, carpet, upholstery, tile and grout, and leather care.',
  keywords: [
    'cleaning service Australia',
    'end of lease cleaning Sydney',
    'bond cleaning Brisbane',
    'house cleaning Melbourne',
    'carpet cleaning Perth',
    'NDIS cleaning provider',
    'professional cleaners',
    'Airbnb cleaning Gold Coast',
    'eco-friendly cleaning Adelaide',
    'flat rate cleaning',
  ],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://cleaningninja.com.au',
    siteName: 'Cleaning Ninja',
    title: 'Cleaning Ninja — Flat-Rate Cleaning Services',
    description:
      'Flat-rate cleaning services from $129 across six Australian cities.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cleaning Ninja — Flat-rate cleaning services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Ninja — Flat-Rate Cleaning Services',
    description:
      'Flat-rate cleaning services from $129 across six Australian cities.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU" className={`${display.variable} ${inter.variable}`}>
      <body className="bg-cream text-charcoal font-body antialiased">
        <JsonLd data={organizationSchema()} />
        <MotionProvider>
          <LenisProvider>
            <PageLoader />
            <SparkleCursor />
            <Header />
            <main className="pt-16 lg:pt-20 pb-24 lg:pb-0">{children}</main>
            <Footer />
            <MobileStickyCta />
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
