import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type DividerTone = 'light' | 'dark'
type DividerOrientation = 'horizontal' | 'vertical'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** `light` for use on light surfaces, `dark` for use on dark surfaces. */
  tone?: DividerTone
  /** Default: horizontal. */
  orientation?: DividerOrientation
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, tone = 'light', orientation = 'horizontal', ...props }, ref) => {
    const colour = tone === 'light' ? 'bg-line' : 'bg-line-dark'
    const dims =
      orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px self-stretch'

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(dims, colour, className)}
        {...props}
      />
    )
  },
)

Divider.displayName = 'Divider'

export default Divider
