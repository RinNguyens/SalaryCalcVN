'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface DarkInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

export const DarkInput = forwardRef<HTMLInputElement, DarkInputProps>(
  ({ className, type, label, error, icon, required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-slate-900">
            {label} {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              // Base styles
              'w-full rounded-2xl',
              'bg-white/60 backdrop-blur-sm',
              'border border-slate-300',
              'text-slate-900 placeholder-slate-500',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-600',
              'transition-all duration-200',

              // Padding with icon
              icon ? 'pl-12 pr-4 py-4' : 'px-4 py-4',

              // Error state
              error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500/50',

              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

DarkInput.displayName = 'DarkInput';