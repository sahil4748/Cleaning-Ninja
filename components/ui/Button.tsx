import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Blueprint button variants (the ONLY allowed variants):
 * - `primary-light`  → ink bg on light surface
 * - `primary-dark`   → bone bg on dark surface
 * - `secondary-light` → outlined ink on light
 * - `secondary-dark`  → outlined bone on dark
 * - `quiet-link`     → text with bottom border, inline editorial CTA
 *
 * Legacy aliases retained for backward compatibility ONLY (carpet-cleaning page,
 * services index page). They are mapped to the closest blueprint variant.
 * Remove in Phase 2 when those pages are rewritten.
 */
type BlueprintVariant =
  | 'primary-light'
  | 'primary-dark'
  | 'secondary-light'
  | 'secondary-dark'
  | 'quiet-link'

type LegacyVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

type ButtonVariant = BlueprintVariant | LegacyVariant
type ButtonSize = 'sm' | 'md' | 'lg'

// Polymorphic-friendly prop surface. When the consumer passes `as={Link}` (or
// any anchor-like element), they need `href` etc. to be accepted. Phase 1 keeps
// this pragmatic — we intersect with the subset of anchor attributes most
// commonly forwarded, instead of pulling in a full polymorphic types library.
interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    Pick<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      'href' | 'target' | 'rel' | 'download'
    > {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Render as a different element (e.g., `Link` for a Next.js link). */
  as?: ElementType
  /** Native button `type`. Defaults to `button` for `as` undefined; ignored otherwise. */
  type?: 'button' | 'submit' | 'reset'
}

// Map legacy variants → blueprint variants. Removed in Phase 2.
const legacyMap: Record<LegacyVariant, BlueprintVariant> = {
  primary: 'primary-light',
  secondary: 'primary-light',
  outline: 'secondary-light',
  ghost: 'quiet-link',
}

const variantClass: Record<BlueprintVariant, string> = {
  // PRIMARY — solid olive on cream. No shadow, no gradient, no scale.
  'primary-light':
    'bg-olive text-cream border border-olive hover:bg-olive-deep hover:border-olive-deep transition-colors duration-200',
  // PRIMARY — solid cream on charcoal. Hover shifts to olive.
  'primary-dark':
    'bg-cream text-charcoal border border-cream hover:bg-olive hover:text-cream hover:border-olive transition-colors duration-200',
  // SECONDARY — outlined charcoal on cream. Hover fills charcoal.
  'secondary-light':
    'bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-cream transition-colors duration-200',
  // SECONDARY — outlined cream on charcoal. Hover fills cream.
  'secondary-dark':
    'bg-transparent text-cream border border-cream hover:bg-cream hover:text-charcoal transition-colors duration-200',
  // QUIET LINK — inline editorial CTA. Underline shifts to olive on hover.
  'quiet-link':
    'bg-transparent text-charcoal border-0 border-b border-charcoal rounded-none px-0 hover:text-olive-deep hover:border-olive-deep transition-colors duration-200',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-10 px-5 text-[14px]',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-13 sm:h-14 px-7 sm:px-8 text-[15px]',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary-light', size = 'lg', as, children, ...props }, ref) => {
    // Resolve legacy variant to blueprint variant
    const resolved: BlueprintVariant =
      variant in legacyMap
        ? legacyMap[variant as LegacyVariant]
        : (variant as BlueprintVariant)

    const isQuiet = resolved === 'quiet-link'

    const Tag = (as ?? 'button') as ElementType

    return (
      <Tag
        ref={ref}
        className={cn(
          // Base
          'inline-flex items-center justify-center gap-2 font-body font-medium tracking-[0.01em] leading-none cursor-pointer',
          'rounded-[4px]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-olive',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          // Variant
          variantClass[resolved],
          // Size — quiet links ignore height/padding (inline)
          isQuiet ? 'h-auto py-1 text-[15px]' : sizeClass[size],
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Button.displayName = 'Button'

export default Button
