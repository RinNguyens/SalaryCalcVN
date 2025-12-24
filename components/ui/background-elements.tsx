'use client';

import { motion } from 'framer-motion';

export function BackgroundElements() {
  // Detect Safari to disable heavy animations
  const isSafari = typeof window !== 'undefined' &&
    /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);

  return (
    <>
      {/* Gradient Orbs - disabled on Safari for performance */}
      {!isSafari && (
        <>
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"
               style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-500 rounded-full blur-3xl opacity-10 animate-pulse"
               style={{ animationDelay: '2s' }} />
        </>
      )}

      {/* Floating Particles - completely disabled for Safari performance */}
      {!isSafari && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </>
  );
}