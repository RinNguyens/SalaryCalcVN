'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className,
  disabled,
  ...props
}: GlassButtonProps) {
  const variants = {
    primary: 'bg-blue-500/80 hover:bg-blue-600/80 text-white border-blue-400/30',
    secondary: 'bg-white/70 hover:bg-white/90 text-gray-900 border-white/30',
    ghost: 'bg-transparent hover:bg-white/10 text-gray-700 border-transparent',
    gradient: 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/80 hover:to-purple-600/80 text-white border-white/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      className={cn(
        // Base styles
        'relative rounded-xl font-semibold',
        'backdrop-blur-xl backdrop-saturate-[180%]',
        'border shadow-lg',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',

        // Variant & Size
        variants[variant],
        sizes[size],

        // Icon spacing
        icon && 'flex items-center gap-2',

        className
      )}
      {...(props as any)}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />

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
