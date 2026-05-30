'use client'

import { TextareaHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

type TextareaSurface = 'light' | 'dark'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  helper?: string
  error?: string
  surface?: TextareaSurface
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      id,
      label,
      helper,
      error,
      surface = 'light',
      rows = 5,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const taId = id ?? `textarea-${generatedId}`
    const helperId = `${taId}-helper`
    const errorId = `${taId}-error`
    const isDark = surface === 'dark'

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={taId}
          className={cn(
            'font-body text-[12px] font-medium uppercase tracking-[0.14em] leading-none',
            isDark ? 'text-bone' : 'text-ink',
          )}
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={taId}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : helper ? helperId : undefined}
          className={cn(
            'w-full resize-none bg-transparent px-0 py-3',
            'font-body text-[16px] leading-[1.6]',
            isDark ? 'text-bone placeholder:text-bone/40' : 'text-ink placeholder:text-ink/40',
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

Textarea.displayName = 'Textarea'

export default Textarea
