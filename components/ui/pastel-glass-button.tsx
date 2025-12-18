'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PastelGlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function PastelGlassButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className,
  disabled,
  ...props
}: PastelGlassButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-black border-transparent hover:opacity-90 shadow-lg',
    secondary: 'bg-white/80 text-slate-900 border-slate-200 hover:bg-slate-50',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 text-black border-transparent hover:opacity-90',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-black border-transparent hover:opacity-90',
    ghost: 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    icon: 'p-2',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      className={cn(
        // Base styles
        'relative rounded-2xl font-semibold',
        'backdrop-blur-xl',
        'border shadow-glass',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',

        // Variant & Size
        variants[variant],
        sizes[size],

        // Icon spacing
        icon && 'flex items-center gap-2 justify-center',

        className
      )}
      {...props}
    >
      {/* Content */}
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
      ) : (
        <>
          {icon}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
}
