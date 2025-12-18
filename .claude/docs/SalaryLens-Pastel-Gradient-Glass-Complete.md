# 🎨 SalaryLens - Pastel Gradient Glass Design System

> Color system inspired by modern dashboard aesthetic với pastel gradients & vibrant accents

**Style:** Pastel Glass with Vibrant Accents  
**Inspiration:** Uploaded Dashboard Image  
**Palette:** Purple → Blue → Cyan → Yellow Gradients

---

## 📋 MỤC LỤC

1. [Color Analysis](#-color-analysis)
2. [Complete Color System](#-complete-color-system)
3. [Background Gradients](#-background-gradients)
4. [Glass Components](#-glass-components)
5. [Chart Colors](#-chart-colors)
6. [Implementation](#-implementation)
7. [Examples](#-examples)

---

## 🔍 COLOR ANALYSIS

### **From Uploaded Image:**

```
BACKGROUND GRADIENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Top-Left:      #D4C5F9 (Light Purple/Lavender)
Top-Right:     #C5D9FF (Light Blue)
Bottom-Left:   #E8C5F9 (Light Pink/Purple)
Bottom-Right:  #C5F9F9 (Light Cyan)
Bottom-Far:    #FFF9C5 (Light Yellow)

GRADIENT BLOBS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Purple Blob:   #E879F9 → #C084FC (Magenta to Purple)
Blue Blob:     #60A5FA → #3B82F6 (Light to Medium Blue)

GLASS CARDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Background:    rgba(255, 255, 255, 0.7)
Border:        rgba(255, 255, 255, 0.3)
Shadow:        rgba(0, 0, 0, 0.05)

ACCENT COLORS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pink/Magenta:  #EC4899
Blue:          #3B82F6
Green:         #10B981
Purple:        #A855F7
Red:           #EF4444
Yellow:        #FBBF24

TEXT COLORS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary:       #1F2937 (Gray-800)
Secondary:     #6B7280 (Gray-500)
Muted:         #9CA3AF (Gray-400)
```

---

## 🎨 COMPLETE COLOR SYSTEM

### **Tailwind Config:**

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors (Pastel Base)
        brand: {
          purple: {
            light: '#F3E8FF',    // Lightest
            50: '#FAF5FF',
            100: '#F3E8FF',
            200: '#E9D5FF',
            300: '#D8B4FE',
            400: '#C084FC',
            500: '#A855F7',      // Main Purple
            600: '#9333EA',
            700: '#7E22CE',
            800: '#6B21A8',
            900: '#581C87',
          },
          blue: {
            light: '#DBEAFE',    // Lightest
            50: '#EFF6FF',
            100: '#DBEAFE',
            200: '#BFDBFE',
            300: '#93C5FD',
            400: '#60A5FA',
            500: '#3B82F6',      // Main Blue
            600: '#2563EB',
            700: '#1D4ED8',
            800: '#1E40AF',
            900: '#1E3A8A',
          },
          pink: {
            light: '#FCE7F3',    // Lightest
            50: '#FDF2F8',
            100: '#FCE7F3',
            200: '#FBCFE8',
            300: '#F9A8D4',
            400: '#F472B6',
            500: '#EC4899',      // Main Pink
            600: '#DB2777',
            700: '#BE185D',
            800: '#9D174D',
            900: '#831843',
          },
          cyan: {
            light: '#CFFAFE',    // Lightest
            50: '#ECFEFF',
            100: '#CFFAFE',
            200: '#A5F3FC',
            300: '#67E8F9',
            400: '#22D3EE',
            500: '#06B6D4',      // Main Cyan
            600: '#0891B2',
            700: '#0E7490',
            800: '#155E75',
            900: '#164E63',
          },
          yellow: {
            light: '#FEF3C7',    // Lightest
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',      // Main Yellow
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
            900: '#78350F',
          },
        },

        // Accent Colors (Vibrant)
        accent: {
          magenta: '#E879F9',
          pink: '#EC4899',
          blue: '#3B82F6',
          green: '#10B981',
          purple: '#A855F7',
          orange: '#F97316',
          red: '#EF4444',
          yellow: '#FBBF24',
          cyan: '#06B6D4',
          indigo: '#6366F1',
        },

        // Background Gradients
        bg: {
          'purple-light': '#F3E8FF',
          'blue-light': '#DBEAFE',
          'pink-light': '#FCE7F3',
          'cyan-light': '#CFFAFE',
          'yellow-light': '#FEF3C7',
        },

        // Glass Colors
        glass: {
          white: 'rgba(255, 255, 255, 0.7)',
          'white-border': 'rgba(255, 255, 255, 0.3)',
          dark: 'rgba(0, 0, 0, 0.1)',
          'dark-border': 'rgba(0, 0, 0, 0.05)',
        },
      },

      // Background Images (Gradients)
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-pastel': 'linear-gradient(135deg, #F3E8FF 0%, #DBEAFE 25%, #CFFAFE 50%, #FEF3C7 100%)',
        'gradient-purple-blue': 'linear-gradient(135deg, #F3E8FF 0%, #DBEAFE 100%)',
        'gradient-blue-cyan': 'linear-gradient(135deg, #DBEAFE 0%, #CFFAFE 100%)',
        'gradient-pink-purple': 'linear-gradient(135deg, #FCE7F3 0%, #F3E8FF 100%)',
        'gradient-cyan-yellow': 'linear-gradient(135deg, #CFFAFE 0%, #FEF3C7 100%)',
      },

      // Box Shadows
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-lg': '0 12px 40px 0 rgba(31, 38, 135, 0.1)',
        'glow-purple': '0 0 40px rgba(168, 85, 247, 0.3)',
        'glow-blue': '0 0 40px rgba(59, 130, 246, 0.3)',
        'glow-pink': '0 0 40px rgba(236, 72, 153, 0.3)',
      },

      // Border Radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // Animation
      animation: {
        'blob': 'blob 7s infinite',
        'blob-slow': 'blob 10s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 🌈 BACKGROUND GRADIENTS

### **Main Background Component:**

```typescript
// components/layout/pastel-background.tsx

'use client';

import { motion } from 'framer-motion';

export function PastelBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-light via-brand-blue-light to-brand-cyan-light" />

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-purple-100 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-brand-yellow-100 via-transparent to-transparent" />
      </div>

      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0">
        {/* Purple/Magenta Blob - Bottom Left */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232, 121, 249, 0.4) 0%, rgba(192, 132, 252, 0.2) 50%, transparent 100%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Blue Blob - Top Right */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Cyan Blob - Bottom Right */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(103, 232, 249, 0.15) 50%, transparent 100%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Yellow Blob - Bottom Far Right */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Pink Blob - Top Left */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
            filter: 'blur(45px)',
          }}
        />
      </div>

      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
```

---

## 🧩 GLASS COMPONENTS (Updated)

### **Glass Card:**

```typescript
// components/ui/pastel-glass-card.tsx

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
        // Base glass styles
        'relative rounded-3xl',
        'bg-white/70 backdrop-blur-xl',
        'border border-white/30',
        'shadow-glass',
        
        // Hover effect
        hover && 'transition-shadow hover:shadow-glass-lg',
        
        // Glow
        glowStyles[glow],
        
        className
      )}
    >
      {/* Inner subtle gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
```

---

### **Glass Button:**

```typescript
// components/ui/pastel-glass-button.tsx

'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PastelGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
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
    primary: 'bg-gradient-to-r from-brand-blue-500 to-brand-purple-500 text-white border-white/20 hover:from-brand-blue-600 hover:to-brand-purple-600',
    secondary: 'bg-white/70 text-gray-800 border-white/30 hover:bg-white/90',
    success: 'bg-gradient-to-r from-accent-green to-accent-cyan text-white border-white/20',
    danger: 'bg-gradient-to-r from-accent-red to-accent-pink text-white border-white/20',
    ghost: 'bg-transparent text-gray-700 border-transparent hover:bg-white/30',
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
```

---

## 📊 CHART COLORS

### **Chart Color Palette:**

```typescript
// lib/chart-colors.ts

export const chartColors = {
  // Primary chart colors (from image)
  primary: [
    '#3B82F6',  // Blue
    '#EC4899',  // Pink
    '#10B981',  // Green
    '#A855F7',  // Purple
    '#F59E0B',  // Yellow
    '#EF4444',  // Red
    '#06B6D4',  // Cyan
    '#F97316',  // Orange
  ],

  // Pastel versions
  pastel: [
    '#93C5FD',  // Light Blue
    '#F9A8D4',  // Light Pink
    '#6EE7B7',  // Light Green
    '#C084FC',  // Light Purple
    '#FCD34D',  // Light Yellow
    '#FCA5A5',  // Light Red
    '#67E8F9',  // Light Cyan
    '#FDBA74',  // Light Orange
  ],

  // Gradient pairs
  gradients: {
    blue: ['#60A5FA', '#3B82F6'],
    pink: ['#F472B6', '#EC4899'],
    purple: ['#C084FC', '#A855F7'],
    green: ['#34D399', '#10B981'],
    cyan: ['#22D3EE', '#06B6D4'],
  },
};

// Recharts configuration
export const rechartsConfig = {
  colors: chartColors.primary,
  
  cartesianGrid: {
    stroke: 'rgba(0, 0, 0, 0.05)',
    strokeDasharray: '3 3',
  },
  
  tooltip: {
    contentStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
  },
  
  legend: {
    wrapperStyle: {
      fontSize: '14px',
      fontWeight: 500,
    },
  },
};
```

---

## 🎯 COMPLETE IMPLEMENTATION

### **Updated Layout:**

```typescript
// app/layout.tsx

import { Inter } from 'next/font/google';
import { PastelBackground } from '@/components/layout/pastel-background';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <PastelBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
```

---

### **Homepage Example:**

```typescript
// app/page.tsx

import { PastelGlassCard } from '@/components/ui/pastel-glass-card';
import { PastelGlassButton } from '@/components/ui/pastel-glass-button';
import { Calculator, TrendingUp, PieChart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-brand-purple-600 via-brand-blue-600 to-brand-pink-600 bg-clip-text text-transparent">
            SalaryLens
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Crystal Clear Salary Insights
          </p>
          
          <div className="flex gap-4 justify-center">
            <PastelGlassButton variant="primary" size="lg" icon={<Calculator />}>
              Calculate Salary
            </PastelGlassButton>
            <PastelGlassButton variant="secondary" size="lg">
              Learn More
            </PastelGlassButton>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <PastelGlassCard hover glow="blue">
            <div className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center mb-4">
                <Calculator className="w-7 h-7 text-accent-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Accurate Calculator
              </h3>
              <p className="text-gray-600">
                Calculate gross ↔ net salary with 2026 tax laws
              </p>
            </div>
          </PastelGlassCard>

          <PastelGlassCard hover glow="pink">
            <div className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-accent-pink" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                AI Insights
              </h3>
              <p className="text-gray-600">
                Get smart recommendations for salary optimization
              </p>
            </div>
          </PastelGlassCard>

          <PastelGlassCard hover glow="purple">
            <div className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center mb-4">
                <PieChart className="w-7 h-7 text-accent-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Visual Breakdown
              </h3>
              <p className="text-gray-600">
                Beautiful charts showing your salary composition
              </p>
            </div>
          </PastelGlassCard>
        </div>
      </section>
    </div>
  );
}
```

---

### **Calculator Card Example:**

```typescript
// components/calculator/calculator-card.tsx

import { PastelGlassCard } from '@/components/ui/pastel-glass-card';
import { PastelGlassButton } from '@/components/ui/pastel-glass-button';
import { DollarSign, Users, Calculator } from 'lucide-react';

export function CalculatorCard() {
  return (
    <PastelGlassCard className="max-w-2xl mx-auto" glow="blue">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-purple-100 to-brand-blue-100 text-brand-purple-700 text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            <span>Salary Calculator 2026</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-purple-600 to-brand-blue-600 bg-clip-text text-transparent">
            Calculate Your Salary
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Gross Salary Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gross Salary (Lương Gross)
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <input
                type="number"
                placeholder="30,000,000"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/50 focus:border-brand-blue-500/50 transition-all"
              />
            </div>
          </div>

          {/* Dependents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số người phụ thuộc
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Users className="w-5 h-5" />
              </div>
              <input
                type="number"
                placeholder="0"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand-purple-500/50 focus:border-brand-purple-500/50 transition-all"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <PastelGlassButton 
            variant="primary" 
            size="lg" 
            className="w-full"
            icon={<Calculator />}
          >
            Tính Lương
          </PastelGlassButton>
        </div>
      </div>
    </PastelGlassCard>
  );
}
```

---

## 📊 CHART EXAMPLE

```typescript
// components/charts/pastel-bar-chart.tsx

'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { chartColors, rechartsConfig } from '@/lib/chart-colors';
import { PastelGlassCard } from '@/components/ui/pastel-glass-card';

const data = [
  { name: 'Gross', value: 30000000 },
  { name: 'BHXH', value: 2400000 },
  { name: 'BHYT', value: 450000 },
  { name: 'BHTN', value: 300000 },
  { name: 'Thuế', value: 2100000 },
  { name: 'Net', value: 24750000 },
];

export function PastelBarChart() {
  return (
    <PastelGlassCard>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Salary Breakdown
        </h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid {...rechartsConfig.cartesianGrid} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip {...rechartsConfig.tooltip} />
            <Bar 
              dataKey="value" 
              fill="url(#gradient-blue-purple)"
              radius={[8, 8, 0, 0]}
            />
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient-blue-purple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </PastelGlassCard>
  );
}
```

---

## 🎨 GLOBAL STYLES

```css
/* app/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  
  html {
    @apply antialiased;
    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
  }

  body {
    @apply text-gray-900;
  }
}

@layer utilities {
  /* Glass Utilities */
  .glass-pastel {
    @apply bg-white/70 backdrop-blur-xl border border-white/30 shadow-glass;
  }

  /* Text Gradients */
  .text-gradient-purple-blue {
    @apply bg-gradient-to-r from-brand-purple-600 via-brand-blue-600 to-brand-pink-600 bg-clip-text text-transparent;
  }

  .text-gradient-blue-cyan {
    @apply bg-gradient-to-r from-brand-blue-600 to-brand-cyan-600 bg-clip-text text-transparent;
  }

  /* Custom Scrollbar */
  .scrollbar-pastel::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .scrollbar-pastel::-webkit-scrollbar-track {
    @apply bg-white/30 backdrop-blur-xl rounded-full;
  }

  .scrollbar-pastel::-webkit-scrollbar-thumb {
    @apply bg-brand-blue-400/50 rounded-full hover:bg-brand-blue-500/60;
  }
}
```

---

## ✅ MIGRATION CHECKLIST

```
PHASE 1: Color System
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Update tailwind.config.ts with new colors
□ Add gradient definitions
□ Add shadow utilities
□ Test color variables

PHASE 2: Background
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Create PastelBackground component
□ Add 5 animated blobs
□ Add gradient mesh
□ Test animations

PHASE 3: Components
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Create PastelGlassCard
□ Create PastelGlassButton
□ Create PastelGlassInput
□ Create PastelGlassBadge
□ Test all variants

PHASE 4: Pages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Update Homepage
□ Update Calculator page
□ Update Blog cards
□ Update About page
□ Update Contact form

PHASE 5: Charts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Update chart colors
□ Add gradient fills
□ Style tooltips
□ Test responsiveness

PHASE 6: Polish
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Fine-tune animations
□ Adjust blur levels
□ Mobile optimization
□ Cross-browser testing
□ Deploy!
```

---

## 🎉 FINAL RESULT

```
┌─────────────────────────────────────┐
│  🎨 PASTEL GRADIENT GLASS AESTHETIC │
├─────────────────────────────────────┤
│                                     │
│  Colors:                            │
│  ✨ Soft pastel backgrounds         │
│  ✨ Vibrant accent colors           │
│  ✨ Smooth gradient transitions     │
│  ✨ Frosted glass components        │
│                                     │
│  Effects:                           │
│  ✨ Animated gradient blobs         │
│  ✨ Fluid blob animations           │
│  ✨ Premium glass cards             │
│  ✨ Colorful chart gradients        │
│                                     │
│  User Perception:                   │
│  "This looks like a premium         │
│   modern dashboard! 😍"             │
│                                     │
└─────────────────────────────────────┘
```

---

**Pastel Gradient Glass System Complete! 🎨✨**
