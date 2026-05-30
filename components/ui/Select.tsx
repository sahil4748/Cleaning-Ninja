'use client'

import { SelectHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

type SelectSurface = 'light' | 'dark'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  helper?: string
  error?: string
  surface?: SelectSurface
  /** Options can be passed via children, or use this convenience prop. */
  options?: Array<{ value: string; label: string }>
  /** Placeholder text shown when no value selected. */
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      id,
      label,
      helper,
      error,
      surface = 'light',
      options,
      placeholder,
      children,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const selectId = id ?? `select-${generatedId}`
    const helperId = `${selectId}-helper`
    const errorId = `${selectId}-error`
    const isDark = surface === 'dark'

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={selectId}
          className={cn(
            'font-body text-[12px] font-medium uppercase tracking-[0.14em] leading-none',
            isDark ? 'text-bone' : 'text-ink',
          )}
        >
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : helper ? helperId : undefined}
            className={cn(
              'h-13 sm:h-14 w-full appearance-none bg-transparent pl-0 pr-8 py-3',
              'font-body text-[16px] leading-none',
              isDark ? 'text-bone' : 'text-ink',
              'border-0 border-b',
              isDark ? 'border-line-dark' : 'border-line',
              'focus:outline-none',
              isDark
                ? 'focus:border-b-[1.5px] focus:border-bone'
                : 'focus:border-b-[1.5px] focus:border-ink',
              error && '!border-error focus:!border-error',
              'transition-colors duration-150',
              className,
            )}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            ) : null}
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 8"
            className={cn(
              'pointer-events-none absolute right-0 top-1/2 h-2 w-3 -translate-y-1/2',
              isDark ? 'text-bone' : 'text-ink',
            )}
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
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

Select.displayName = 'Select'

export default Select
