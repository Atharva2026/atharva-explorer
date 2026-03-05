import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface XPButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
}

export const XPButton = forwardRef<HTMLButtonElement, XPButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-4 py-1 text-sm',
      lg: 'px-6 py-2 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          variant === 'primary' ? 'xp-button-primary' : 'xp-button',
          sizeClasses[size],
          'font-sans transition-all duration-75',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

XPButton.displayName = 'XPButton';
