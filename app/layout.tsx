import { SITE_URL } from '@/lib/site-config'
import type { Metadata, Viewport } from 'next'
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
    default: 'Cleaning Ninja — Carpet & Upholstery Cleaning',
    template: '%s | Cleaning Ninja',
  },
  description:
    'Order, restored. Carpet, upholstery, rug, leather, tile and commercial cleaning, with selected packages and a free personalised quote.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#06768D' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Cleaning Ninja',
    title: 'Cleaning Ninja — Carpet & Upholstery Cleaning',
    description:
      'Order, restored. Carpet, upholstery, rug, leather, tile and commercial cleaning, with selected packages and a free personalised quote.',
    images: [
      {
        url: '/og-logo-card-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Cleaning Ninja',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Ninja — Carpet & Upholstery Cleaning',
    description:
      'Order, restored. Carpet, upholstery, rug, leather, tile and commercial cleaning, with selected packages and a free personalised quote.',
    images: ['/og-logo-card-1200x630.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#06768D',
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
