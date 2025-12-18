'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface DarkTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const DarkTextarea = forwardRef<HTMLTextAreaElement, DarkTextareaProps>(
  ({ className, label, error, required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-slate-900">
            {label} {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <textarea
          className={cn(
            // Base styles
            'w-full rounded-2xl resize-none',
            'bg-white/60 backdrop-blur-sm',
            'border border-slate-300',
            'text-slate-900 placeholder-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-600',
            'transition-all duration-200',
            'px-4 py-4',

            // Error state
            error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500/50',

            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

DarkTextarea.displayName = 'DarkTextarea';