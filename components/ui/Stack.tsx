import { HTMLAttributes, ElementType, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type StackGap = '0' | '1' | '2' | '3' | '4' | '6' | '8' | '10' | '12' | '16' | '20' | '24'
type StackAlign = 'start' | 'center' | 'end' | 'stretch'

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Vertical gap in 4px units (Tailwind spacing scale). Default: 4 (16px). */
  gap?: StackGap
  /** Cross-axis alignment. */
  align?: StackAlign
  /** Render as a specific tag. Defaults to `div`. */
  as?: ElementType
}

const gapClass: Record<StackGap, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
  '16': 'gap-16',
  '20': 'gap-20',
  '24': 'gap-24',
}

const alignClass: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap = '4', align = 'stretch', as, children, ...props }, ref) => {
    const Tag = (as ?? 'div') as ElementType
    return (
      <Tag
        ref={ref}
        className={cn('flex flex-col', gapClass[gap], alignClass[align], className)}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Stack.displayName = 'Stack'

export default Stack
