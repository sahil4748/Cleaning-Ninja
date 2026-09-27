import { SITE_URL } from '@/lib/site-config'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import SiteShell from '@/components/layout/SiteShell'
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
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
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
    index: false,
    follow: false,
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
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
