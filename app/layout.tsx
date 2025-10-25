import type { Metadata } from 'next'
import './globals.css'
import CNHeader from '@/components/CNHeader'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/layout/FloatingCTA'

export const metadata: Metadata = {
  title: 'Cleaning Ninja | Premium Cleaning Services Australia',
  description: 'Fair dinkum professional cleaning services across Australia. Carpet, upholstery, tile & grout cleaning with 100% satisfaction guarantee.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <CNHeader />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  )
}
