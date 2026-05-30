'use client'

import {
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react'
import { cn } from '@/lib/utils'

/**
 * Accessible accordion built on native <button> + ARIA — not <details>.
 * Headless behaviour; styling is opinionated to blueprint.
 *
 * Modes:
 *  - `single` (default) — only one item open at a time
 *  - `multi`            — any number of items can be open
 *
 * Usage:
 *   <Accordion>
 *     <AccordionItem id="q1" question="What's included?">
 *       Answer body...
 *     </AccordionItem>
 *   </Accordion>
 */

type AccordionMode = 'single' | 'multi'
type AccordionSurface = 'light' | 'dark'

interface AccordionContextValue {
  open: Set<string>
  toggle: (id: string) => void
  surface: AccordionSurface
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordionContext() {
  const ctx = useContext(AccordionContext)
  if (!ctx) {
    throw new Error('AccordionItem must be used inside <Accordion>.')
  }
  return ctx
}

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  mode?: AccordionMode
  surface?: AccordionSurface
  /** IDs that should be open on first render. */
  defaultOpen?: string[]
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    { className, mode = 'single', surface = 'light', defaultOpen = [], children, ...props },
    ref,
  ) => {
    const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen))

    const value = useMemo<AccordionContextValue>(
      () => ({
        open,
        surface,
        toggle: (id: string) => {
          setOpen((prev) => {
            const next = new Set(prev)
            if (next.has(id)) {
              next.delete(id)
              return next
            }
            if (mode === 'single') {
              return new Set([id])
            }
            next.add(id)
            return next
          })
        },
      }),
      [open, mode, surface],
    )

    return (
      <AccordionContext.Provider value={value}>
        <div
          ref={ref}
          className={cn('flex flex-col', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  },
)
Accordion.displayName = 'Accordion'

interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Stable id used to track open/closed state. */
  id?: string
  question: ReactNode
  children: ReactNode
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, id, question, children, ...props }, ref) => {
    const generatedId = useId()
    const itemId = id ?? `acc-${generatedId}`
    const triggerId = `${itemId}-trigger`
    const panelId = `${itemId}-panel`
    const { open, toggle, surface } = useAccordionContext()
    const isOpen = open.has(itemId)
    const isDark = surface === 'dark'

    return (
      <div
        ref={ref}
        className={cn(
          'border-b',
          isDark ? 'border-line-dark' : 'border-line',
          className,
        )}
        {...props}
      >
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggle(itemId)}
          className={cn(
            'group flex w-full items-center justify-between gap-6 py-6 text-left',
            'font-body text-[17px] sm:text-[18px] leading-[1.4]',
            isDark ? 'text-bone' : 'text-ink',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4',
            isDark ? 'focus-visible:ring-bone focus-visible:ring-offset-graphite' : 'focus-visible:ring-ink focus-visible:ring-offset-ivory',
          )}
        >
          <span className="font-medium">{question}</span>
          <span
            aria-hidden="true"
            className={cn(
              'inline-flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-200',
              isOpen && 'rotate-180',
              isDark ? 'text-bone' : 'text-ink',
            )}
          >
            <svg viewBox="0 0 14 8" className="h-2 w-3.5">
              <path
                d="M1 1L7 7L13 1"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          hidden={!isOpen}
          className={cn(
            'pb-6 pr-12 font-body text-[15px] sm:text-[16px] leading-[1.6]',
            isDark ? 'text-bone/80' : 'text-ink/80',
          )}
        >
          {children}
        </div>
      </div>
    )
  },
)
AccordionItem.displayName = 'AccordionItem'

export default Accordion
