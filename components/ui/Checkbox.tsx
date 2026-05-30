'use client'

import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

type CheckboxSurface = 'light' | 'dark'

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** Visible label. */
  label: ReactNode
  /** Optional helper text. */
  helper?: ReactNode
  surface?: CheckboxSurface
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, id, label, helper, surface = 'light', ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? `checkbox-${generatedId}`
    const helperId = `${inputId}-helper`
    const isDark = surface === 'dark'

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn(
            'group flex cursor-pointer items-start gap-3',
            isDark ? 'text-bone' : 'text-ink',
            className,
          )}
        >
          <span
            className={cn(
              'relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] border transition-colors duration-150',
              isDark ? 'border-line-dark bg-transparent' : 'border-line bg-transparent',
              'group-has-[input:checked]:bg-ink group-has-[input:checked]:border-ink',
              isDark && 'group-has-[input:checked]:bg-bone group-has-[input:checked]:border-bone',
              'group-has-[input:focus-visible]:outline-2 group-has-[input:focus-visible]:outline-offset-2 group-has-[input:focus-visible]:outline-olive',
            )}
            aria-hidden="true"
          >
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              className="sr-only"
              aria-describedby={helper ? helperId : undefined}
              {...props}
            />
            <svg
              viewBox="0 0 14 12"
              className={cn(
                'pointer-events-none h-3 w-3.5 opacity-0 transition-opacity duration-150',
                'group-has-[input:checked]:opacity-100',
                isDark ? 'text-ink' : 'text-bone',
              )}
            >
              <path
                d="M1 6L5 10L13 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
          <span className="font-body text-[15px] leading-[1.5]">{label}</span>
        </label>
        {helper ? (
          <span
            id={helperId}
            className={cn(
              'ml-8 font-body text-[13px] leading-[1.4]',
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

Checkbox.displayName = 'Checkbox'

export default Checkbox
