import { HTMLAttributes, ElementType, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingVariant =
  | 'display-xxl'
  | 'display-xl'
  | 'display-lg'
  | 'display-l' /* legacy alias for display-lg */
  | 'display-m' /* legacy alias for display-lg */
  | 'h1'
  | 'h2'
  | 'h3'
type HeadingTone = 'ink' | 'bone' | 'olive'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level — separate from visual variant. */
  as?: HeadingLevel
  /** Visual variant. Default: `h2`. */
  variant?: HeadingVariant
  /** Colour. Default: `ink`. */
  tone?: HeadingTone
  /** Optionally apply balanced wrapping for tighter text rags. */
  balance?: boolean
}

/*
 * Variant classes use the clamp()-driven CSS variables from globals.css.
 * Sizing is intrinsic to the variant — sections must not !text-[] override.
 * If a section wants a different size, it should pick a different variant.
 */
const variantClass: Record<HeadingVariant, string> = {
  'display-xxl':
    'font-display font-bold tracking-[-0.035em] leading-[0.95] [font-size:var(--type-display-xxl-size)]',
  'display-xl':
    'font-display font-bold tracking-[-0.03em] leading-[1.0] [font-size:var(--type-display-xl-size)]',
  'display-lg':
    'font-display font-semibold tracking-[-0.025em] leading-[1.05] [font-size:var(--type-display-lg-size)]',
  'display-l':
    'font-display font-semibold tracking-[-0.025em] leading-[1.05] [font-size:var(--type-display-lg-size)]',
  'display-m':
    'font-display font-semibold tracking-[-0.025em] leading-[1.05] [font-size:var(--type-display-lg-size)]',
  h1: 'font-display font-semibold tracking-[-0.02em] leading-[1.1] [font-size:var(--type-h1-size)]',
  h2: 'font-display font-semibold tracking-[-0.015em] leading-[1.15] [font-size:var(--type-h2-size)]',
  h3: 'font-display font-semibold tracking-[-0.01em] leading-[1.3] [font-size:var(--type-h3-size)]',
}

const toneClass: Record<HeadingTone, string> = {
  ink: 'text-charcoal',
  bone: 'text-cream',
  olive: 'text-olive',
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      as = 'h2',
      variant = 'h2',
      tone = 'ink',
      balance = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Tag = as as ElementType
    return (
      <Tag
        ref={ref}
        className={cn(
          variantClass[variant],
          toneClass[tone],
          balance && '[text-wrap:balance]',
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Heading.displayName = 'Heading'

export default Heading
