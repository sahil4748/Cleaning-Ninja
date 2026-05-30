'use client'

import { InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

type InputSurface = 'light' | 'dark'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label rendered above the field in eyebrow style. Always visible (never placeholder-only). */
  label: string
  /** Helper text shown below the field when no error. */
  helper?: string
  /** Error message shown below the field. Triggers error styling. */
  error?: string
  /** Surface tone. Default: `light`. */
  surface?: InputSurface
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, label, helper, error, surface = 'light', ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? `input-${generatedId}`
    const helperId = `${inputId}-helper`
    const errorId = `${inputId}-error`

    const isDark = surface === 'dark'

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className={cn(
            'font-body text-[12px] font-medium uppercase tracking-[0.14em] leading-none',
            isDark ? 'text-bone' : 'text-ink',
          )}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : helper ? helperId : undefined}
          className={cn(
            'h-13 sm:h-14 w-full bg-transparent px-0 py-3',
            'font-body text-[16px] leading-none',
            isDark ? 'text-bone placeholder:text-bone/40' : 'text-ink placeholder:text-ink/40',
            // Bottom-border only
            'border-0 border-b',
            isDark ? 'border-line-dark' : 'border-line',
            'focus:outline-none',
            // Focus thickens border
            isDark
              ? 'focus:border-b-[1.5px] focus:border-bone'
              : 'focus:border-b-[1.5px] focus:border-ink',
            // Error state
            error && '!border-error focus:!border-error',
            'transition-colors duration-150',
            className,
          )}
          {...props}
        />
        {error ? (
          <span
            id={errorId}
            role="alert"
            className="font-body text-[13px] leading-[1.4] text-error"
          >
            {error}
          </span>
        ) : helper ? (
          <span
            id={helperId}
            className={cn(
              'font-body text-[13px] leading-[1.4]',
              isDark ? 'text-bone/60' : 'text-ink/60',
            )}
          >
            {helper}
          </span>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
