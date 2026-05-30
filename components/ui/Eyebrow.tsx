import { HTMLAttributes, ElementType, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type EyebrowTone = 'ink' | 'bone' | 'champagne'

interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  /** Colour. Default: `ink` (use on light surfaces). */
  tone?: EyebrowTone
  /** Render as a specific element. Default: `span` — never `h1`-`h6` (eyebrows are visual, not semantic headings). */
  as?: ElementType
  /** Add a champagne underline to the right of the text. */
  withRule?: boolean
}

const toneClass: Record<EyebrowTone, string> = {
  ink: 'text-ink',
  bone: 'text-bone',
  champagne: 'text-champagne',
}

const Eyebrow = forwardRef<HTMLElement, EyebrowProps>(
  ({ className, tone = 'ink', as, withRule = false, children, ...props }, ref) => {
    const Tag = (as ?? 'span') as ElementType
    return (
      <Tag
        ref={ref}
        className={cn(
          'inline-flex items-center gap-3 font-body text-[12px] font-medium uppercase tracking-[0.14em] leading-none',
          toneClass[tone],
          className,
        )}
        {...props}
      >
        {children}
        {withRule ? (
          <span
            aria-hidden="true"
            className={cn(
              'inline-block h-px w-8',
              tone === 'bone' ? 'bg-line-dark' : 'bg-line',
            )}
          />
        ) : null}
      </Tag>
    )
  },
)

Eyebrow.displayName = 'Eyebrow'

export default Eyebrow
