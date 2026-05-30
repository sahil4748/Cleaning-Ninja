'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * Mobile-only sticky bottom CTA. Replaces the previous FloatingCTA.
 *
 * - Mobile and small tablet only. Hidden on lg+.
 * - Appears after the user has scrolled past the fold (~ 600px).
 * - No pulsing animation, no bounce, no badge.
 * - One job: route to /book.
 */
export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 lg:hidden',
        'border-t border-border-dark bg-charcoal/95 backdrop-blur-sm',
        'px-4 py-3',
        'transition-[opacity,transform] duration-300 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-2',
        // Respect iOS safe areas
        '[padding-bottom:max(0.75rem,env(safe-area-inset-bottom))]',
      )}
    >
      <Link
        href="/book"
        tabIndex={visible ? undefined : -1}
        className={cn(
          'flex h-12 w-full items-center justify-center rounded-[4px]',
          'bg-olive-deep text-cream border border-olive-deep',
          'font-body text-[15px] font-medium',
          'transition-colors duration-200',
          'hover:bg-olive hover:border-olive',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal',
        )}
      >
        Build My Quote
      </Link>
    </div>
  )
}
