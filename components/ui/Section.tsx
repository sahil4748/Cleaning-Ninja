import { HTMLAttributes, ElementType, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type SectionSpacing = 'tight' | 'default' | 'tall'
type SectionSurface =
  // Recovery palette (preferred)
  | 'cream'
  | 'surface-muted'
  | 'charcoal'
  | 'charcoal-deep'
  | 'olive'
  // Legacy aliases (still rendered correctly via globals.css remapping)
  | 'ivory'
  | 'bone'
  | 'bone-soft'
  | 'graphite'
  | 'graphite-soft'
  | 'ink'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Vertical rhythm.
   * - `tight`: 40px / 24px (mobile)
   * - `default` (default): 120px / 80px (mobile)
   * - `tall`: 160px / 100px (mobile)
   */
  spacing?: SectionSpacing
  /**
   * Background surface token. Text colour is derived automatically.
   */
  surface?: SectionSurface
  /**
   * Render as a specific tag. Defaults to `section`.
   */
  as?: ElementType
}

const spacingClass: Record<SectionSpacing, string> = {
    tight: 'py-10 md:py-16',
    default: 'py-20 md:py-28 lg:py-32',
    tall: 'py-24 md:py-32 lg:py-40',
  }

const surfaceClass: Record<SectionSurface, string> = {
  // Recovery palette
  cream: 'bg-cream text-charcoal',
  'surface-muted': 'bg-surface-muted text-charcoal',
  charcoal: 'bg-charcoal text-cream',
  'charcoal-deep': 'bg-charcoal-deep text-cream',
  olive: 'bg-olive text-cream',
  // Legacy aliases — render with the recovery palette via globals.css token remap
  ivory: 'bg-cream text-charcoal',
  bone: 'bg-cream text-charcoal',
  'bone-soft': 'bg-surface-muted text-charcoal',
  graphite: 'bg-charcoal text-cream',
  'graphite-soft': 'bg-charcoal-soft text-cream',
  ink: 'bg-charcoal text-cream',
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'default', surface = 'ivory', as, children, ...props }, ref) => {
    const Tag = (as ?? 'section') as ElementType
    return (
      <Tag
        ref={ref}
        className={cn(
          'relative w-full',
          spacingClass[spacing],
          surfaceClass[surface],
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Section.displayName = 'Section'

export default Section
