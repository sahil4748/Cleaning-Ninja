import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ContainerWidth = 'editorial' | 'wide' | 'narrow' | 'prose' | 'full'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Max width.
   * - `editorial` (default): 1280px — standard section content
   * - `wide`: 1440px — full-bleed-feel sections with edge padding (aligns with Header)
   * - `narrow`: 960px — focused editorial blocks
   * - `prose`: 720px — long-form reading
   * - `full`: no max — used by frame-scrub Hero etc.
   */
  width?: ContainerWidth
  /** Render the inner element as a 12-col grid. Default: false. */
  grid?: boolean
}

const widthClass: Record<ContainerWidth, string> = {
  editorial: 'max-w-7xl', /* 1280px */
  wide: 'max-w-[1440px]', /* 1440px — locks with Header */
  narrow: 'max-w-5xl',    /* 1024px */
  prose: 'max-w-3xl',     /* 768px */
  full: 'max-w-none',
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, width = 'editorial', grid = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20',
          widthClass[width],
          grid && 'grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-5 lg:grid-cols-12 lg:gap-6',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Container.displayName = 'Container'

export default Container
