import { HTMLAttributes, ElementType, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type CardSurface = 'light' | 'dark' | 'ivory' | 'cream' | 'surface-muted' | 'charcoal'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Surface tone. Default: `light`. */
  surface?: CardSurface
  /** Padding scale. Default: `md`. */
  padding?: CardPadding
  /** If true, card has a hover state (border shifts to champagne). No lift, no scale. */
  interactive?: boolean
  /** Legacy prop — accepted for backward compatibility, maps to `interactive`. */
  hoverable?: boolean
  /** Render as a different tag (e.g., `'article'`). */
  as?: ElementType
}

const surfaceClass: Record<CardSurface, string> = {
  // Recovery palette aliases
  cream: 'bg-cream border border-border text-charcoal',
  'surface-muted': 'bg-surface-muted border border-border text-charcoal',
  charcoal: 'bg-charcoal border border-border-dark text-cream',
  // Legacy
  light: 'bg-surface-muted border border-border text-charcoal',
  dark: 'bg-charcoal-soft border border-border-dark text-cream',
  ivory: 'bg-cream border border-border text-charcoal',
}

const paddingClass: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-5 sm:p-6',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-10',
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      surface = 'light',
      padding = 'md',
      interactive = false,
      hoverable = false,
      as,
      children,
      ...props
    },
    ref,
  ) => {
    const Tag = (as ?? 'div') as ElementType
    const isInteractive = interactive || hoverable
    return (
      <Tag
        ref={ref}
        className={cn(
          'rounded-[4px] transition-colors duration-200',
          surfaceClass[surface],
          paddingClass[padding],
          isInteractive && 'hover:border-olive',
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Card.displayName = 'Card'

export default Card
