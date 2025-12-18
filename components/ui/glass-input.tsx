'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              // Base styles
              'w-full rounded-xl',
              'bg-white/70 backdrop-blur-xl backdrop-saturate-[180%]',
              'border border-white/30',
              'px-4 py-3',
              icon && 'pl-12',

              // Focus state
              'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
              'transition-all duration-200',

              // Placeholder
              'placeholder:text-slate-400',

              // Error state
              error && 'border-red-500/50 focus:ring-red-500/50',

              className
            )}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';
