'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 overflow-hidden group',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2',
          {
            'bg-gradient-gold text-navy hover:shadow-gold-lg transform hover:scale-105 hover:-translate-y-1': variant === 'primary',
            'bg-primary text-white hover:bg-primary-dark': variant === 'secondary',
            'border-2 border-gold text-gold hover:bg-gold hover:text-navy': variant === 'outline',
            'px-4 py-2 text-sm': size === 'sm',
            'px-8 py-4 text-base': size === 'md',
            'px-10 py-5 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {/* Shine effect on hover */}
        <span className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
