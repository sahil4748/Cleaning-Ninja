import { HTMLAttributes, ElementType, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type CaptionTone = 'ink-muted' | 'bone-muted'

interface CaptionProps extends HTMLAttributes<HTMLElement> {
  tone?: CaptionTone
  as?: ElementType
}

const toneClass: Record<CaptionTone, string> = {
  'ink-muted': 'text-ink/60',
  'bone-muted': 'text-bone/60',
}

const Caption = forwardRef<HTMLElement, CaptionProps>(
  ({ className, tone = 'ink-muted', as, children, ...props }, ref) => {
    const Tag = (as ?? 'span') as ElementType
    return (
      <Tag
        ref={ref}
        className={cn(
          'font-body text-[13px] leading-[1.4] font-normal',
          toneClass[tone],
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Caption.displayName = 'Caption'

export default Caption
