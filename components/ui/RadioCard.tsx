'use client'

import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

type RadioCardSurface = 'light' | 'dark'

interface RadioCardProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** Visible label inside the card. */
  label: ReactNode
  /** Optional secondary line below the label. */
  description?: ReactNode
  /** Optional icon node rendered above the label. */
  icon?: ReactNode
  surface?: RadioCardSurface
}

/**
 * Visual radio tile used by the quote flow. The native input is visually hidden
 * but remains keyboard-accessible. Selected state shifts border to champagne
 * and uses ink/bone background contrast — no shadow, no scale.
 */
const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  (
    {
      className,
      id,
      label,
      description,
      icon,
      surface = 'light',
      checked,
      defaultChecked,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? `radiocard-${generatedId}`
    const isDark = surface === 'dark'

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'group relative block cursor-pointer rounded-[4px] border p-5 sm:p-6',
          'transition-colors duration-200',
          isDark
            ? 'border-line-dark bg-graphite-soft text-bone hover:border-champagne'
            : 'border-line bg-bone-soft text-ink hover:border-champagne',
          // Selected state (the data attribute is driven by :has on the input)
          'has-[input:checked]:border-champagne',
          isDark
            ? 'has-[input:checked]:bg-graphite has-[input:checked]:text-bone'
            : 'has-[input:checked]:bg-ink has-[input:checked]:text-bone',
          'has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-olive',
          className,
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="radio"
          checked={checked}
          defaultChecked={defaultChecked}
          className="sr-only"
          {...props}
        />
        <div className="flex flex-col gap-3">
          {icon ? <span aria-hidden="true">{icon}</span> : null}
          <span className="font-body text-[16px] font-medium leading-[1.3]">{label}</span>
          {description ? (
            <span className="font-body text-[13px] leading-[1.4] opacity-70">
              {description}
            </span>
          ) : null}
        </div>
      </label>
    )
  },
)

RadioCard.displayName = 'RadioCard'

export default RadioCard
