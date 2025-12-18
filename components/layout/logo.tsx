'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { width: 80, height: 30, iconSize: 24, fontSize: 12 },
    md: { width: 140, height: 40, iconSize: 32, fontSize: 16 },
    lg: { width: 180, height: 50, iconSize: 40, fontSize: 20 },
  };

  const { iconSize, fontSize } = sizes[size];

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon */}
      <div className="relative" style={{ width: iconSize, height: iconSize }}>
        {/* Back circle */}
        <motion.div
          className="absolute w-full h-full rounded-full bg-gradient-to-br from-purple-500/60 to-violet-600/40 blur-sm"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.7, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Middle circle */}
        <motion.div
          className="absolute left-1/4 w-full h-full rounded-full bg-gradient-to-br from-pink-500/70 to-rose-600/50 blur-sm"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.8, 0.7],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />

        {/* Front circle with symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4/5 h-4/5 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-lg">
            <span className="text-black font-bold" style={{ fontSize: fontSize * 0.8 }}>
              🛡️
            </span>
          </div>
        </div>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-0.5">
            <span
              className="font-bold text-black"
              style={{ fontSize }}
            >
              Salary
            </span>
            <span
              className="font-normal text-black/90"
              style={{ fontSize: fontSize * 0.95 }}
            >
              Lens
            </span>
          </div>
          <span
            className="text-black/70 font-medium tracking-wider"
            style={{ fontSize: fontSize * 0.5 }}
          >
            VIETNAM
          </span>
        </div>
      )}
    </motion.div>
  );
}