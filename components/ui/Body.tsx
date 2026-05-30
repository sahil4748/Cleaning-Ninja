import { HTMLAttributes, ElementType, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type BodyVariant = 'body-l' | 'body' | 'small'
type BodyTone = 'ink' | 'ink-muted' | 'bone' | 'bone-muted'

interface BodyProps extends HTMLAttributes<HTMLElement> {
  /** Default: `body` (16px). */
  variant?: BodyVariant
  /** Colour. Default: `ink`. */
  tone?: BodyTone
  /** Render as a specific tag. Default: `p`. */
  as?: ElementType
  /** Constrain max width for readability (~65ch). */
  measure?: boolean
}

const variantClass: Record<BodyVariant, string> = {
  'body-l': 'text-[17px] sm:text-[18px] leading-[1.6]',
  body: 'text-[16px] leading-[1.6]',
  small: 'text-[14px] leading-[1.55]',
}

const toneClass: Record<BodyTone, string> = {
  ink: 'text-ink',
  'ink-muted': 'text-ink/70',
  bone: 'text-bone',
  'bone-muted': 'text-bone/70',
}

const Body = forwardRef<HTMLElement, BodyProps>(
  (
    {
      className,
      variant = 'body',
      tone = 'ink',
      as,
      measure = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Tag = (as ?? 'p') as ElementType
    return (
      <Tag
        ref={ref}
        className={cn(
          'font-body font-normal',
          variantClass[variant],
          toneClass[tone],
          measure && 'max-w-[65ch]',
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Body.displayName = 'Body'

export default Body
