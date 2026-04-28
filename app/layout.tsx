import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/layout/FloatingCTA'

export const metadata: Metadata = {
  title: 'Cleaning Ninja | Premium Cleaning Services Australia',
  description: 'Professional carpet, upholstery, and end-of-lease cleaning across Australia. Fully insured, eco-friendly, and trusted by over 5,000 Australian families.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased text-beige-900 bg-beige-50">
        <Header />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  )
}