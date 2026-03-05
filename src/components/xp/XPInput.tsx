import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface XPInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const XPInput = forwardRef<HTMLInputElement, XPInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'xp-input w-full font-sans text-foreground',
          className
        )}
        {...props}
      />
    );
  }
);

XPInput.displayName = 'XPInput';
