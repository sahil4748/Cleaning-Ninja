'use client'

import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import MobileStickyCta from './MobileStickyCta'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { LenisProvider } from '@/components/motion/LenisProvider'
import { SparkleCursor } from '@/components/motion/SparkleCursor'
import { PageLoader } from '@/components/motion/PageLoader'

export default function LegacyShell({ children }: { children: ReactNode }) {
  return <MotionProvider><LenisProvider>
    <PageLoader /><SparkleCursor /><Header />
    <main className="pt-16 lg:pt-20 pb-24 lg:pb-0">{children}</main>
    <Footer /><MobileStickyCta />
  </LenisProvider></MotionProvider>
}
