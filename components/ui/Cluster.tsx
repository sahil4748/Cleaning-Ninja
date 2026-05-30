import { HTMLAttributes, ElementType, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ClusterGap = '0' | '1' | '2' | '3' | '4' | '6' | '8' | '10' | '12'
type ClusterAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
type ClusterJustify = 'start' | 'center' | 'end' | 'between' | 'around'

interface ClusterProps extends HTMLAttributes<HTMLDivElement> {
  /** Horizontal gap in 4px units. Default: 4 (16px). */
  gap?: ClusterGap
  /** Cross-axis alignment. Default: center. */
  align?: ClusterAlign
  /** Main-axis distribution. Default: start. */
  justify?: ClusterJustify
  /** Whether items wrap to the next line. Default: true. */
  wrap?: boolean
  /** Render as a specific tag. */
  as?: ElementType
}

const gapClass: Record<ClusterGap, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
}

const alignClass: Record<ClusterAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

const justifyClass: Record<ClusterJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
}

const Cluster = forwardRef<HTMLDivElement, ClusterProps>(
  (
    {
      className,
      gap = '4',
      align = 'center',
      justify = 'start',
      wrap = true,
      as,
      children,
      ...props
    },
    ref,
  ) => {
    const Tag = (as ?? 'div') as ElementType
    return (
      <Tag
        ref={ref}
        className={cn(
          'flex',
          wrap ? 'flex-wrap' : 'flex-nowrap',
          gapClass[gap],
          alignClass[align],
          justifyClass[justify],
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Cluster.displayName = 'Cluster'

export default Cluster
