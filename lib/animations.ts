// Framer Motion Animation Presets for Apple Liquid Glass Design

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const glassHover = {
  hover: {
    y: -4,
    scale: 1.01,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Easing curves
export const easings = {
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  spring: { type: 'spring', stiffness: 300, damping: 20 },
};
