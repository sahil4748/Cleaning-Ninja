import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none',
          {
            'bg-gold text-navy hover:bg-gold-light shadow-md shadow-gold/20 hover:shadow-lg hover:shadow-gold/30': variant === 'primary',
            'bg-navy text-white hover:bg-navy-light shadow-md shadow-navy/20 hover:shadow-lg hover:shadow-navy/30': variant === 'secondary',
            'border-2 border-navy/20 text-navy bg-transparent hover:border-navy hover:bg-surface': variant === 'outline',
            'text-navy hover:bg-surface': variant === 'ghost',
            'px-4 py-2.5 text-sm': size === 'sm',
            'px-6 py-3.5 text-base': size === 'md',
            'px-8 py-4.5 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
