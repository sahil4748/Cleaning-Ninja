'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { PRIMARY_NAV, BUSINESS } from '@/content/navigation'

/**
 * Charcoal national header. Wide max (1440px), olive accent, magnetic CTA.
 */
export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[30] bg-charcoal text-cream transition-shadow duration-300',
        scrolled && 'shadow-[0_1px_0_0_rgba(245,240,232,0.08)]',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-10 lg:h-20 lg:px-16 xl:px-20">
        <div className="flex items-center justify-start">
          <Link
            href="/"
            aria-label="Cleaning Ninja — home"
            data-magnetic
            className="group inline-flex items-center gap-2.5"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-olive transition-colors duration-200 group-hover:bg-olive-soft lg:h-9 lg:w-9">
              <svg viewBox="0 0 24 24" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 6h14M5 12h14M5 18h7" className="text-cream" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[20px] font-bold leading-none tracking-[-0.02em] text-cream transition-colors duration-200 group-hover:text-olive-soft lg:text-[22px]">
                Cleaning <span className="text-olive group-hover:text-cream transition-colors duration-200">Ninja</span>
              </span>
              <span className="mt-1 hidden font-body text-[9.5px] font-semibold uppercase tracking-[0.18em] text-olive-soft/90 sm:block">
                {BUSINESS.tagline}
              </span>
            </span>
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden items-center justify-center gap-7 lg:flex">
          {PRIMARY_NAV.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'group relative font-body text-[14px] font-medium tracking-[0.01em] transition-colors duration-200',
                  isActive ? 'text-cream' : 'text-cream/75 hover:text-cream',
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -bottom-1.5 left-0 h-px transition-all duration-200',
                    isActive ? 'w-full bg-olive' : 'w-0 bg-olive group-hover:w-full',
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden lg:block">
            <Button
              as={Link}
              href="/book"
              variant="primary-light"
              size="sm"
              data-magnetic
              className="h-10 px-5 text-[14px] bg-olive border-olive text-cream hover:bg-olive-deep hover:border-olive-deep shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-200"
            >
              See my price
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button
              as={Link}
              href="/book"
              variant="primary-light"
              size="sm"
              className="h-9 px-3.5 text-[12px] bg-olive border-olive text-cream hover:bg-olive-deep"
            >
              Quote
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="flex h-10 w-10 items-center justify-center text-cream cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="border-t border-border-dark bg-charcoal lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 py-2 sm:px-8">
          {PRIMARY_NAV.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center justify-between border-b border-border-dark py-4 font-body text-[16px] last:border-b-0',
                  isActive ? 'text-olive' : 'text-cream',
                )}
              >
                <span>{item.label}</span>
                <span aria-hidden="true" className="font-body text-[12px] text-cream/40">→</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
