'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PastelGlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'purple' | 'blue' | 'pink' | 'none';
}

export function PastelGlassCard({
  children,
  className,
  hover = true,
  glow = 'none',
}: PastelGlassCardProps) {
  const glowStyles = {
    purple: 'shadow-glow-purple',
    blue: 'shadow-glow-blue',
    pink: 'shadow-glow-pink',
    none: '',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        // Base glass styles - Light theme
        'relative rounded-3xl',
        'bg-white/80 backdrop-blur-xl',
        'border border-white/40',
        'shadow-xl',

        // Hover effect
        hover && 'transition-shadow hover:shadow-3xl',

        // Glow
        glowStyles[glow],

        className
      )}
    >
      {/* Inner subtle gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
