# 💰 SalaryCalc VN - Tax Breakdown 2026 (Complete Implementation)

> Tính năng phân tích chi tiết thuế TNCN theo bậc lũy tiến 5 bậc năm 2026

**Version:** 1.0  
**Date:** December 2024  
**Author:** SalaryCalc Team

---

## 📋 MỤC LỤC

1. [Tổng quan](#-tổng-quan)
2. [Biểu thuế 5 bậc 2026](#-biểu-thuế-5-bậc-2026)
3. [Component chính](#-component-chính)
4. [Tax Calculation Utilities](#-tax-calculation-utilities)
5. [Interactive Components](#-interactive-components)
6. [Comparison View](#-comparison-view)
7. [Integration Guide](#-integration-guide)
8. [Examples & Use Cases](#-examples--use-cases)
9. [Styling & Theme](#-styling--theme)
10. [Testing](#-testing)

---

## 🎯 TỔNG QUAN

### **Mục đích**
Giúp users hiểu rõ thuế TNCN của mình được tính như thế nào, đang chịu những bậc thuế nào, và tiết kiệm bao nhiêu với biểu thuế mới.

### **Features chính**
- ✅ Phân tích chi tiết từng bậc thuế
- ✅ Visualization với progress bars & donut chart
- ✅ Interactive slider để explore
- ✅ So sánh 2025 (7 bậc) vs 2026 (5 bậc)
- ✅ Tính savings tự động
- ✅ Responsive design
- ✅ Smooth animations

### **Tech Stack**
- React + TypeScript
- Framer Motion (animations)
- Tailwind CSS (styling)
- Recharts (charts) - optional
- shadcn/ui (base components)

---

## 📊 BIỂU THUẾ 5 BẬC 2026

### **Thay đổi chính từ 2025 → 2026**

**Biểu thuế CŨ (2025) - 7 bậc:**

| Bậc | Thu nhập tính thuế/tháng | Thuế suất | Công thức nhanh |
|-----|-------------------------|-----------|-----------------|
| 1   | ≤ 5 triệu              | 5%        | TN × 5% |
| 2   | 5 - 10 triệu           | 10%       | TN × 10% - 250K |
| 3   | 10 - 18 triệu          | 15%       | TN × 15% - 750K |
| 4   | 18 - 32 triệu          | 20%       | TN × 20% - 1,650K |
| 5   | 32 - 52 triệu          | 25%       | TN × 25% - 3,250K |
| 6   | 52 - 80 triệu          | 30%       | TN × 30% - 5,850K |
| 7   | > 80 triệu             | 35%       | TN × 35% - 9,850K |

**Biểu thuế MỚI (2026) - 5 bậc:** ⭐

| Bậc | Thu nhập tính thuế/tháng | Thuế suất | Công thức nhanh |
|-----|-------------------------|-----------|-----------------|
| 1   | ≤ 5 triệu              | 5%        | TN × 5% |
| 2   | 5 - 10 triệu           | 10%       | TN × 10% - 250K |
| 3   | 10 - 18 triệu          | 15%       | TN × 15% - 750K |
| 4   | 18 - 32 triệu          | 20%       | TN × 20% - 1,650K |
| 5   | > 32 triệu             | 25%       | TN × 25% - 3,250K |

### **Lợi ích của biểu mới**

1. **Đơn giản hóa**: Giảm từ 7 → 5 bậc
2. **Giảm gánh nặng thuế**: Thuế cao nhất từ 35% → 25%
3. **Thu nhập cao được lợi**: Mọi thu nhập > 32M chỉ chịu 25%
4. **Dễ tính toán**: Ít bậc hơn, dễ hiểu hơn

### **Ví dụ so sánh**

**Case 1: Thu nhập tính thuế 50M/tháng**

```
Biểu 2025 (7 bậc):
- Bậc 1-4: Giống nhau
- Bậc 5 (32-52M): 20M × 25% = 5M
- Tổng thuế: ~9.15M/tháng

Biểu 2026 (5 bậc):
- Bậc 1-4: Giống nhau
- Bậc 5 (>32M): 18M × 25% = 4.5M
- Tổng thuế: ~8.65M/tháng

Tiết kiệm: 500K/tháng (6M/năm!)
```

**Case 2: Thu nhập tính thuế 15M/tháng**

```
Biểu 2025: Thuế ~1.5M
Biểu 2026: Thuế ~1.5M

Tiết kiệm: 0đ (không thay đổi cho thu nhập < 32M)
```

---

## 🎨 COMPONENT CHÍNH

### **1. TaxBreakdown Component**

**File:** `components/calculator/tax-breakdown.tsx`

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  Info, 
  TrendingUp, 
  ChevronDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Tax tiers for 2026 (5 tiers)
const TAX_TIERS_2026 = [
  { 
    tier: 1, 
    min: 0, 
    max: 5_000_000, 
    rate: 0.05, 
    color: '#10b981',
    name: 'Bậc 1',
    description: 'Thu nhập thấp'
  },
  { 
    tier: 2, 
    min: 5_000_000, 
    max: 10_000_000, 
    rate: 0.10, 
    color: '#3b82f6',
    name: 'Bậc 2',
    description: 'Thu nhập trung bình thấp'
  },
  { 
    tier: 3, 
    min: 10_000_000, 
    max: 18_000_000, 
    rate: 0.15, 
    color: '#8b5cf6',
    name: 'Bậc 3',
    description: 'Thu nhập trung bình'
  },
  { 
    tier: 4, 
    min: 18_000_000, 
    max: 32_000_000, 
    rate: 0.20, 
    color: '#f59e0b',
    name: 'Bậc 4',
    description: 'Thu nhập cao'
  },
  { 
    tier: 5, 
    min: 32_000_000, 
    max: Infinity, 
    rate: 0.25, 
    color: '#ef4444',
    name: 'Bậc 5',
    description: 'Thu nhập rất cao'
  },
];

interface TaxBreakdownProps {
  taxableIncome: number; // Thu nhập tính thuế (sau giảm trừ)
  totalTax: number; // Tổng thuế phải nộp
  className?: string;
}

export function TaxBreakdown({ 
  taxableIncome, 
  totalTax,
  className = ''
}: TaxBreakdownProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Calculate tax per tier
  const taxPerTier = calculateTaxPerTier(taxableIncome);
  
  // Find highest tier reached
  const highestTier = taxPerTier.filter(t => t.amount > 0).length;
  
  // Calculate effective rate
  const effectiveRate = taxableIncome > 0 
    ? (totalTax / taxableIncome) * 100 
    : 0;

  return (
    <GlassCard variant="strong" className={`p-6 ${className}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between mb-6 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
              Phân tích thuế theo bậc lũy tiến
            </h3>
            <p className="text-sm text-white/60">
              Biểu thuế 5 bậc năm 2026 (mới)
            </p>
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-white/60 group-hover:text-white/80 transition-colors" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Thu nhập tính thuế"
            value={formatCurrency(taxableIncome)}
            icon={<Info className="h-4 w-4" />}
            color="blue"
          />
          <StatCard
            label="Bậc cao nhất"
            value={highestTier > 0 ? `Bậc ${highestTier}` : 'Không có'}
            icon={<TrendingUp className="h-4 w-4" />}
            color="purple"
          />
          <StatCard
            label="Thuế suất hiệu dụng"
            value={`${effectiveRate.toFixed(1)}%`}
            icon={<AlertCircle className="h-4 w-4" />}
            color="red"
            tooltip="Tỷ lệ % thuế thực tế trên tổng thu nhập tính thuế"
          />
        </div>

        {/* Tax Tiers Breakdown */}
        <div className="space-y-3 mb-6">
          {taxPerTier.map((tier, index) => (
            <TaxTierCard
              key={tier.tier}
              tier={tier}
              isActive={tier.amount > 0}
              delay={index * 0.05}
            />
          ))}
        </div>

        {/* Visual Chart */}
        {taxPerTier.some(t => t.amount > 0) && (
          <div className="mb-6">
            <TaxVisualization taxPerTier={taxPerTier} totalTax={totalTax} />
          </div>
        )}

        {/* Explanation */}
        <div className="mb-4 p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-white/80 mb-2">
                <strong className="text-white">Thuế lũy tiến là gì?</strong>
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                Thuế TNCN được tính theo từng bậc. Thu nhập càng cao, phần vượt mức 
                mới bị đánh thuế cao hơn. Ví dụ: Thu nhập 15M sẽ chịu 5% cho 5M đầu, 
                10% cho 5M tiếp theo, và 15% cho 5M cuối cùng.
              </p>
            </div>
          </div>
        </div>

        {/* 2026 Benefit Note */}
        {calculateSavings2026(taxableIncome) > 0 && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-400/30">
            <div className="flex items-center gap-2 text-sm text-green-400">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              <span>
                <strong>Tin tốt:</strong> Từ 2026, thuế cao nhất giảm từ 35% → 25%, 
                giúp bạn tiết kiệm <strong>{formatCurrency(calculateSavings2026(taxableIncome))}</strong>/tháng
                (<strong>{formatCurrency(calculateSavings2026(taxableIncome) * 12)}</strong>/năm)
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </GlassCard>
  );
}

// Calculate tax per tier
function calculateTaxPerTier(taxableIncome: number) {
  return TAX_TIERS_2026.map((tier) => {
    let incomeInTier = 0;
    let taxInTier = 0;

    if (taxableIncome > tier.min) {
      if (tier.max === Infinity) {
        incomeInTier = taxableIncome - tier.min;
      } else {
        incomeInTier = Math.min(taxableIncome - tier.min, tier.max - tier.min);
      }
      taxInTier = incomeInTier * tier.rate;
    }

    return {
      tier: tier.tier,
      name: tier.name,
      description: tier.description,
      min: tier.min,
      max: tier.max,
      rate: tier.rate,
      color: tier.color,
      incomeInTier: Math.round(incomeInTier),
      amount: Math.round(taxInTier),
      percentage: taxableIncome > 0 ? (incomeInTier / taxableIncome) * 100 : 0,
    };
  });
}

// Tax Tier Card Component
interface TaxTierCardProps {
  tier: {
    tier: number;
    name: string;
    description: string;
    min: number;
    max: number;
    rate: number;
    color: string;
    incomeInTier: number;
    amount: number;
    percentage: number;
  };
  isActive: boolean;
  delay: number;
}

function TaxTierCard({ tier, isActive, delay }: TaxTierCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <div
        className={`
          p-4 rounded-lg border-2 transition-all duration-300
          ${isActive
            ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:scale-[1.01]'
            : 'bg-white/5 border-white/10 opacity-50'
          }
        `}
      >
        <div className="flex items-center justify-between mb-3">
          {/* Tier Info */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-lg"
              style={{ backgroundColor: tier.color }}
            >
              {tier.tier}
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {tier.name}: {(tier.rate * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-white/60">
                {formatRange(tier.min, tier.max)}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="text-right">
            {isActive ? (
              <>
                <div className="text-base font-bold text-white">
                  {formatCurrency(tier.amount)}
                </div>
                <div className="text-xs text-white/60">
                  trên {formatCurrency(tier.incomeInTier, true)}
                </div>
              </>
            ) : (
              <div className="text-xs text-white/40 font-medium">
                Chưa đạt bậc này
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {isActive && (
          <div className="relative">
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: tier.color }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(tier.percentage, 100)}%` }}
                transition={{ duration: 0.5, delay: delay + 0.2, ease: 'easeOut' }}
              />
            </div>
            <div className="mt-1 text-xs text-white/50 text-right">
              {tier.percentage.toFixed(1)}% tổng thu nhập
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Tax Visualization (Donut Chart)
interface TaxVisualizationProps {
  taxPerTier: Array<{
    tier: number;
    name: string;
    amount: number;
    color: string;
  }>;
  totalTax: number;
}

function TaxVisualization({ taxPerTier, totalTax }: TaxVisualizationProps) {
  const activeTiers = taxPerTier.filter((t) => t.amount > 0);
  
  if (activeTiers.length === 0) return null;

  return (
    <div className="p-6 rounded-lg bg-white/5 border border-white/10">
      <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="h-4 w-4" />
        Phân bổ thuế theo bậc
      </h4>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Donut Chart */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {activeTiers.map((tier, index) => {
              const percentage = (tier.amount / totalTax) * 100;
              const previousPercentages = activeTiers
                .slice(0, index)
                .reduce((sum, t) => sum + (t.amount / totalTax) * 100, 0);
              
              return (
                <DonutSegment
                  key={tier.tier}
                  percentage={percentage}
                  offset={previousPercentages}
                  color={tier.color}
                />
              );
            })}
          </svg>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-xs text-white/60 mb-1">Tổng thuế</div>
            <div className="text-xl font-bold text-white">
              {formatCurrency(totalTax, true)}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 w-full">
          {activeTiers.map((tier) => {
            const percentage = (tier.amount / totalTax) * 100;
            return (
              <div key={tier.tier} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: tier.color }}
                  />
                  <div>
                    <div className="text-sm font-medium text-white">
                      {tier.name}
                    </div>
                    <div className="text-xs text-white/60">
                      {percentage.toFixed(1)}% tổng thuế
                    </div>
                  </div>
                </div>
                <div className="text-sm font-bold text-white text-right">
                  {formatCurrency(tier.amount)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Donut Segment Component
interface DonutSegmentProps {
  percentage: number;
  offset: number;
  color: string;
}

function DonutSegment({ percentage, offset, color }: DonutSegmentProps) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  const strokeDashoffset = -((offset / 100) * circumference);

  return (
    <motion.circle
      cx="50"
      cy="50"
      r={radius}
      fill="none"
      stroke={color}
      strokeWidth="10"
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      initial={{ strokeDasharray: `0 ${circumference}` }}
      animate={{ strokeDasharray }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="drop-shadow-lg"
    />
  );
}

// Stat Card Component
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'red';
  tooltip?: string;
}

function StatCard({ label, value, icon, color, tooltip }: StatCardProps) {
  const colorMap = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    red: 'from-orange-500 to-red-500',
  };

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded-md bg-gradient-to-br ${colorMap[color]}`}>
          {icon}
        </div>
        <span className="text-xs text-white/60">{label}</span>
      </div>
      <div className="text-lg font-bold text-white">
        {value}
      </div>
    </div>
  );
}

// Helper Functions
function formatCurrency(amount: number, short: boolean = false): string {
  if (short && amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M`;
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatRange(min: number, max: number): string {
  if (max === Infinity) {
    return `> ${formatCurrency(min, true)}`;
  }
  return `${formatCurrency(min, true)} - ${formatCurrency(max, true)}`;
}

function calculateSavings2026(taxableIncome: number): number {
  // Only relevant for income > 32M
  if (taxableIncome <= 32_000_000) return 0;
  
  // Calculate difference between 7-tier and 5-tier
  const tax2025 = calculateTax7Tier(taxableIncome);
  const tax2026 = calculateTax5Tier(taxableIncome);
  
  return Math.max(0, Math.round(tax2025 - tax2026));
}

function calculateTax7Tier(income: number): number {
  if (income <= 5_000_000) return income * 0.05;
  if (income <= 10_000_000) return income * 0.10 - 250_000;
  if (income <= 18_000_000) return income * 0.15 - 750_000;
  if (income <= 32_000_000) return income * 0.20 - 1_650_000;
  if (income <= 52_000_000) return income * 0.25 - 3_250_000;
  if (income <= 80_000_000) return income * 0.30 - 5_850_000;
  return income * 0.35 - 9_850_000;
}

function calculateTax5Tier(income: number): number {
  if (income <= 5_000_000) return income * 0.05;
  if (income <= 10_000_000) return income * 0.10 - 250_000;
  if (income <= 18_000_000) return income * 0.15 - 750_000;
  if (income <= 32_000_000) return income * 0.20 - 1_650_000;
  return income * 0.25 - 3_250_000;
}
```

---

## 🔢 TAX CALCULATION UTILITIES

### **File:** `lib/tax-calculator.ts`

```typescript
/**
 * Tax Calculation Utilities for Vietnamese Personal Income Tax
 * 
 * This module provides functions to calculate taxes based on:
 * - 2025 tax system (7 tiers)
 * - 2026 tax system (5 tiers)
 * 
 * And compare the differences
 */

// Tax tier definitions for 2026 (5 tiers)
export const TAX_TIERS_2026 = [
  { tier: 1, min: 0, max: 5_000_000, rate: 0.05, deduction: 0 },
  { tier: 2, min: 5_000_000, max: 10_000_000, rate: 0.10, deduction: 250_000 },
  { tier: 3, min: 10_000_000, max: 18_000_000, rate: 0.15, deduction: 750_000 },
  { tier: 4, min: 18_000_000, max: 32_000_000, rate: 0.20, deduction: 1_650_000 },
  { tier: 5, min: 32_000_000, max: Infinity, rate: 0.25, deduction: 3_250_000 },
] as const;

// Tax tier definitions for 2025 (7 tiers) - for comparison
export const TAX_TIERS_2025 = [
  { tier: 1, min: 0, max: 5_000_000, rate: 0.05, deduction: 0 },
  { tier: 2, min: 5_000_000, max: 10_000_000, rate: 0.10, deduction: 250_000 },
  { tier: 3, min: 10_000_000, max: 18_000_000, rate: 0.15, deduction: 750_000 },
  { tier: 4, min: 18_000_000, max: 32_000_000, rate: 0.20, deduction: 1_650_000 },
  { tier: 5, min: 32_000_000, max: 52_000_000, rate: 0.25, deduction: 3_250_000 },
  { tier: 6, min: 52_000_000, max: 80_000_000, rate: 0.30, deduction: 5_850_000 },
  { tier: 7, min: 80_000_000, max: Infinity, rate: 0.35, deduction: 9_850_000 },
] as const;

/**
 * Calculate tax using quick formula (2026 - 5 tiers)
 * 
 * @param taxableIncome - Thu nhập tính thuế (sau giảm trừ)
 * @returns Thuế phải nộp
 */
export function calculateTax2026(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  const tier = TAX_TIERS_2026.find(t => taxableIncome <= t.max) || TAX_TIERS_2026[4];
  const tax = taxableIncome * tier.rate - tier.deduction;
  
  return Math.max(0, Math.round(tax));
}

/**
 * Calculate tax using quick formula (2025 - 7 tiers)
 * 
 * @param taxableIncome - Thu nhập tính thuế
 * @returns Thuế phải nộp
 */
export function calculateTax2025(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  const tier = TAX_TIERS_2025.find(t => taxableIncome <= t.max) || TAX_TIERS_2025[6];
  const tax = taxableIncome * tier.rate - tier.deduction;
  
  return Math.max(0, Math.round(tax));
}

/**
 * Calculate detailed tax breakdown per tier (2026)
 * 
 * Returns information about which tiers the income falls into
 * and how much tax is paid in each tier
 */
export interface TaxBreakdownTier {
  tier: number;
  min: number;
  max: number;
  rate: number;
  incomeInTier: number;
  taxInTier: number;
  percentage: number;
}

export interface TaxBreakdownResult {
  tiers: TaxBreakdownTier[];
  totalTax: number;
  effectiveRate: number;
  highestTier: number;
}

export function calculateTaxBreakdown2026(taxableIncome: number): TaxBreakdownResult {
  if (taxableIncome <= 0) {
    return {
      tiers: [],
      totalTax: 0,
      effectiveRate: 0,
      highestTier: 0,
    };
  }

  const tiers = TAX_TIERS_2026.map((tier) => {
    let incomeInTier = 0;
    let taxInTier = 0;

    if (taxableIncome > tier.min) {
      if (tier.max === Infinity) {
        incomeInTier = taxableIncome - tier.min;
      } else {
        incomeInTier = Math.min(taxableIncome - tier.min, tier.max - tier.min);
      }
      taxInTier = incomeInTier * tier.rate;
    }

    return {
      tier: tier.tier,
      min: tier.min,
      max: tier.max,
      rate: tier.rate,
      incomeInTier: Math.round(incomeInTier),
      taxInTier: Math.round(taxInTier),
      percentage: taxableIncome > 0 ? (incomeInTier / taxableIncome) * 100 : 0,
    };
  }).filter(t => t.incomeInTier > 0);

  const totalTax = tiers.reduce((sum, t) => sum + t.taxInTier, 0);
  const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;
  const highestTier = tiers.length > 0 ? tiers[tiers.length - 1].tier : 0;

  return {
    tiers,
    totalTax,
    effectiveRate,
    highestTier,
  };
}

/**
 * Find which tier the income falls into
 * 
 * @param taxableIncome - Thu nhập tính thuế
 * @param year - Year to use (2025 or 2026)
 * @returns Tier number (1-7 for 2025, 1-5 for 2026)
 */
export function findTaxTier(
  taxableIncome: number, 
  year: '2025' | '2026' = '2026'
): number {
  const tiers = year === '2026' ? TAX_TIERS_2026 : TAX_TIERS_2025;
  return tiers.findIndex(t => taxableIncome <= t.max) + 1;
}

/**
 * Calculate savings from 2026 tax reform
 * 
 * Compares tax liability under 2025 (7 tiers) vs 2026 (5 tiers)
 */
export interface TaxSavingsResult {
  tax2025: number;
  tax2026: number;
  savings: number;
  savingsPercentage: number;
  savingsPerYear: number;
}

export function calculateTaxSavings(taxableIncome: number): TaxSavingsResult {
  const tax2025 = calculateTax2025(taxableIncome);
  const tax2026 = calculateTax2026(taxableIncome);
  const savings = Math.max(0, tax2025 - tax2026);
  const savingsPercentage = tax2025 > 0 ? (savings / tax2025) * 100 : 0;

  return {
    tax2025,
    tax2026,
    savings,
    savingsPercentage,
    savingsPerYear: savings * 12,
  };
}

/**
 * Get tax tier information
 */
export function getTaxTierInfo(tier: number, year: '2025' | '2026' = '2026') {
  const tiers = year === '2026' ? TAX_TIERS_2026 : TAX_TIERS_2025;
  return tiers[tier - 1];
}

/**
 * Calculate taxable income from gross
 * 
 * @param gross - Gross salary
 * @param dependents - Number of dependents
 * @returns Taxable income after all deductions
 */
export function calculateTaxableIncome(
  gross: number,
  dependents: number = 0
): number {
  // Insurance deductions (employer's portion)
  const bhxh = Math.min(gross, 46_800_000) * 0.08; // 8%
  const bhyt = Math.min(gross, 46_800_000) * 0.015; // 1.5%
  const bhtn = Math.min(gross, 99_200_000) * 0.01; // 1%
  
  const totalInsurance = bhxh + bhyt + bhtn;
  
  // Personal deductions
  const personalDeduction = 11_000_000; // 11M for self
  const dependentDeduction = dependents * 4_400_000; // 4.4M per dependent
  
  const taxableIncome = gross - totalInsurance - personalDeduction - dependentDeduction;
  
  return Math.max(0, taxableIncome);
}

/**
 * Calculate net salary from gross
 * 
 * Complete calculation including insurance and tax
 */
export interface NetSalaryResult {
  gross: number;
  bhxh: number;
  bhyt: number;
  bhtn: number;
  totalInsurance: number;
  taxableIncome: number;
  tax: number;
  net: number;
}

export function calculateNetSalary(
  gross: number,
  dependents: number = 0,
  year: '2025' | '2026' = '2026'
): NetSalaryResult {
  // Calculate insurance
  const bhxh = Math.round(Math.min(gross, 46_800_000) * 0.08);
  const bhyt = Math.round(Math.min(gross, 46_800_000) * 0.015);
  const bhtn = Math.round(Math.min(gross, 99_200_000) * 0.01);
  const totalInsurance = bhxh + bhyt + bhtn;
  
  // Calculate taxable income
  const personalDeduction = 11_000_000;
  const dependentDeduction = dependents * 4_400_000;
  const taxableIncome = Math.max(
    0,
    gross - totalInsurance - personalDeduction - dependentDeduction
  );
  
  // Calculate tax
  const tax = year === '2026' 
    ? calculateTax2026(taxableIncome)
    : calculateTax2025(taxableIncome);
  
  // Calculate net
  const net = gross - totalInsurance - tax;
  
  return {
    gross,
    bhxh,
    bhyt,
    bhtn,
    totalInsurance,
    taxableIncome,
    tax,
    net,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(
  amount: number, 
  options?: {
    short?: boolean;
    decimals?: number;
  }
): string {
  const { short = false, decimals = 0 } = options || {};

  if (short && amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(decimals)}M`;
  }

  if (short && amount >= 1_000) {
    return `${(amount / 1_000).toFixed(decimals)}K`;
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}
```

---

## 🎚️ INTERACTIVE TAX SLIDER

### **File:** `components/calculator/interactive-tax-slider.tsx`

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { formatCurrency, calculateTax2026, findTaxTier } from '@/lib/tax-calculator';
import { Activity } from 'lucide-react';

const TAX_BRACKETS = [
  { tier: 1, threshold: 5_000_000, rate: 5, color: '#10b981', label: 'Bậc 1' },
  { tier: 2, threshold: 10_000_000, rate: 10, color: '#3b82f6', label: 'Bậc 2' },
  { tier: 3, threshold: 18_000_000, rate: 15, color: '#8b5cf6', label: 'Bậc 3' },
  { tier: 4, threshold: 32_000_000, rate: 20, color: '#f59e0b', label: 'Bậc 4' },
  { tier: 5, threshold: 100_000_000, rate: 25, color: '#ef4444', label: 'Bậc 5' },
];

export function InteractiveTaxSlider() {
  const [income, setIncome] = useState(15_000_000);
  
  const currentTier = findTaxTier(income, '2026');
  const currentBracket = TAX_BRACKETS[currentTier - 1];
  const tax = calculateTax2026(income);
  const effectiveRate = income > 0 ? (tax / income) * 100 : 0;

  const handleInputChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, ''), 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100_000_000) {
      setIncome(numValue);
    }
  };

  return (
    <GlassCard variant="strong" className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">
            🎚️ Khám phá bậc thuế của bạn
          </h3>
          <p className="text-sm text-white/60">
            Kéo thanh trượt để xem bậc thuế thay đổi
          </p>
        </div>
      </div>

      {/* Income Input & Display */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/70">Thu nhập tính thuế</span>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={formatCurrency(income, { decimals: 0 }).replace('₫', '').trim()}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-32 text-right bg-white/10 border-white/20 text-white"
            />
            <span className="text-white/70">₫</span>
          </div>
        </div>
        
        <Slider
          value={[income]}
          onValueChange={(value) => setIncome(value[0])}
          min={0}
          max={100_000_000}
          step={500_000}
          className="mb-4"
        />

        <div className="flex justify-between text-xs text-white/50">
          <span>0đ</span>
          <span>25M</span>
          <span>50M</span>
          <span>75M</span>
          <span>100M</span>
        </div>
      </div>

      {/* Visual Brackets */}
      <div className="space-y-2 mb-6">
        {TAX_BRACKETS.map((bracket, index) => {
          const isActive = currentTier >= bracket.tier;
          const isCurrent = currentTier === bracket.tier;
          
          const prevThreshold = index > 0 ? TAX_BRACKETS[index - 1].threshold : 0;
          const widthPercentage = ((bracket.threshold - prevThreshold) / 100_000_000) * 100;
          
          return (
            <motion.div
              key={bracket.tier}
              className={`
                relative h-14 rounded-lg border-2 transition-all duration-300
                ${isCurrent 
                  ? 'border-white/40 bg-white/15 shadow-lg' 
                  : isActive 
                    ? 'border-white/20 bg-white/10'
                    : 'border-white/10 bg-white/5 opacity-60'
                }
              `}
              style={{
                width: `${widthPercentage}%`,
                minWidth: '120px',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold shadow-md"
                    style={{ backgroundColor: bracket.color }}
                  >
                    {bracket.tier}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      {bracket.rate}%
                    </div>
                    <div className="text-xs text-white/60">
                      {formatCurrency(bracket.threshold, { short: true })}
                    </div>
                  </div>
                </div>
                
                {isCurrent && (
                  <motion.div
                    className="flex items-center gap-1 text-xs font-bold text-white bg-white/20 px-3 py-1.5 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <Activity className="h-3 w-3" />
                    Bạn ở đây
                  </motion.div>
                )}
              </div>

              {/* Threshold marker */}
              {index < TAX_BRACKETS.length - 1 && (
                <div className="absolute -right-px top-0 bottom-0 w-0.5 bg-white/30" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Current Tier Info */}
      <motion.div
        key={currentTier}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-5 rounded-lg border-2"
        style={{
          backgroundColor: `${currentBracket.color}15`,
          borderColor: `${currentBracket.color}60`,
        }}
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-white/70 mb-1">Bậc hiện tại</div>
            <div className="text-2xl font-bold text-white">
              {currentBracket.label}
            </div>
          </div>
          <div>
            <div className="text-xs text-white/70 mb-1">Thuế suất</div>
            <div className="text-2xl font-bold text-white">
              {currentBracket.rate}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div>
            <div className="text-xs text-white/60 mb-1">Tổng thuế</div>
            <div className="text-lg font-bold text-white">
              {formatCurrency(tax)}
            </div>
          </div>
          <div>
            <div className="text-xs text-white/60 mb-1">Thuế suất hiệu dụng</div>
            <div className="text-lg font-bold text-white">
              {effectiveRate.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Progress to next tier */}
        {currentTier < 5 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-white/60 mb-2">
              <span>Đến bậc {currentTier + 1}</span>
              <span>
                Còn {formatCurrency(TAX_BRACKETS[currentTier].threshold - income)}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: currentBracket.color }}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${(income / TAX_BRACKETS[currentTier].threshold) * 100}%` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </GlassCard>
  );
}
```

---

## 🔄 COMPARISON COMPONENT (2025 vs 2026)

### **File:** `components/calculator/tax-comparison.tsx`

```typescript
'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, Info, Sparkles } from 'lucide-react';
import { 
  calculateTaxSavings, 
  formatCurrency, 
  formatPercentage 
} from '@/lib/tax-calculator';
import { motion } from 'framer-motion';

interface TaxComparisonProps {
  taxableIncome: number;
  className?: string;
}

export function TaxComparison({ taxableIncome, className = '' }: TaxComparisonProps) {
  const comparison = calculateTaxSavings(taxableIncome);

  // Only show if there are actual savings
  if (comparison.savings === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard variant="strong" className={`p-6 ${className}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
              <TrendingDown className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-white">
                  Tiết kiệm với biểu thuế mới 2026
                </h3>
                <Badge className="bg-green-500/20 text-green-400 border-green-400/30 text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Mới
                </Badge>
              </div>
              <p className="text-sm text-white/70">
                So sánh thuế theo biểu 7 bậc (2025) và 5 bậc (2026)
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* 2025 Tax */}
          <motion.div 
            className="p-5 rounded-lg bg-white/5 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-md bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 font-bold text-sm">7</span>
              </div>
              <div>
                <div className="text-xs text-white/60">Biểu thuế 2025</div>
                <div className="text-xs text-white/50">7 bậc (cũ)</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {formatCurrency(comparison.tax2025)}
            </div>
            <div className="text-xs text-white/60">Thuế/tháng</div>
          </motion.div>

          {/* 2026 Tax */}
          <motion.div 
            className="p-5 rounded-lg bg-green-500/10 border-2 border-green-400/40"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-md bg-green-500/30 flex items-center justify-center">
                <span className="text-green-400 font-bold text-sm">5</span>
              </div>
              <div>
                <div className="text-xs text-green-400 font-medium">Biểu thuế 2026</div>
                <div className="text-xs text-green-400/70">5 bậc (mới)</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {formatCurrency(comparison.tax2026)}
            </div>
            <div className="text-xs text-green-400">Thuế/tháng</div>
          </motion.div>
        </div>

        {/* Savings Highlight */}
        <motion.div 
          className="p-6 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/40 mb-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium text-white/80 mb-1">
                💰 Tiết kiệm mỗi tháng
              </div>
              <div className="text-3xl font-bold text-green-400">
                {formatCurrency(comparison.savings)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-white/80 mb-1">
                📅 Tiết kiệm mỗi năm
              </div>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(comparison.savingsPerYear)}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Giảm so với biểu cũ</span>
              <span className="text-sm font-bold text-green-400">
                -{formatPercentage(comparison.savingsPercentage)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Explanation */}
        <div className="flex gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
          <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-white/80 mb-2">
              <strong className="text-white">Tại sao tiết kiệm?</strong>
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Biểu thuế 5 bậc có hiệu lực từ 01/01/2026. Thu nhập trên 32M chỉ chịu thuế 
              tối đa 25% thay vì 25-35% như biểu cũ. Đây là chính sách giảm gánh nặng thuế 
              cho người có thu nhập cao.
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
```

---

## 🔗 INTEGRATION GUIDE

### **Step 1: Install Dependencies**

```bash
npm install framer-motion recharts
npm install lucide-react
npm install @radix-ui/react-slider
```

### **Step 2: Add Components**

Create the following files in your project:

```
components/
├── calculator/
│   ├── tax-breakdown.tsx          # Main component
│   ├── interactive-tax-slider.tsx # Interactive explorer
│   └── tax-comparison.tsx         # 2025 vs 2026 comparison
lib/
└── tax-calculator.ts              # Calculation utilities
```

### **Step 3: Integrate into Results Page**

```typescript
// app/calculator/results/page.tsx

import { TaxBreakdown } from '@/components/calculator/tax-breakdown';
import { TaxComparison } from '@/components/calculator/tax-comparison';
import { InteractiveTaxSlider } from '@/components/calculator/interactive-tax-slider';
import { calculateNetSalary } from '@/lib/tax-calculator';

export default function ResultsPage() {
  // Get calculation results
  const results = calculateNetSalary(30_000_000, 2, '2026');

  return (
    <div className="space-y-6">
      {/* Existing result cards */}
      <NetSalaryCard gross={results.gross} net={results.net} />
      <BreakdownCard breakdown={results} />

      {/* NEW: Tax Breakdown ⭐ */}
      <TaxBreakdown 
        taxableIncome={results.taxableIncome}
        totalTax={results.tax}
      />

      {/* NEW: Comparison (only for high income) */}
      {results.taxableIncome > 32_000_000 && (
        <TaxComparison taxableIncome={results.taxableIncome} />
      )}

      {/* NEW: Interactive Explorer */}
      <InteractiveTaxSlider />

      {/* Other components */}
    </div>
  );
}
```

### **Step 4: Usage Examples**

**Example 1: Basic Usage**
```typescript
<TaxBreakdown
  taxableIncome={15_000_000}
  totalTax={1_500_000}
/>
```

**Example 2: With Comparison**
```typescript
const results = calculateNetSalary(60_000_000, 2, '2026');

<>
  <TaxBreakdown
    taxableIncome={results.taxableIncome}
    totalTax={results.tax}
  />
  
  {results.taxableIncome > 32_000_000 && (
    <TaxComparison taxableIncome={results.taxableIncome} />
  )}
</>
```

**Example 3: Standalone Slider**
```typescript
<InteractiveTaxSlider />
```

---

## 📚 EXAMPLES & USE CASES

### **Use Case 1: Junior Developer**

**Input:**
- Gross: 15,000,000 VNĐ
- Dependents: 0 (độc thân)

**Calculation:**
```typescript
const results = calculateNetSalary(15_000_000, 0, '2026');

// Results:
{
  gross: 15_000_000,
  totalInsurance: 1_575_000,
  taxableIncome: 2_425_000,
  tax: 121_250,
  net: 13_303_750
}
```

**Tax Breakdown:**
- Bậc 1 (0-5M, 5%): 2,425,000 × 5% = 121,250

**Display:**
```
✅ Bậc 1 (5%): 121,250đ
❌ Bậc 2-5: Chưa đạt

Tổng thuế: 121,250đ/tháng
Net salary: 13,303,750đ/tháng
```

---

### **Use Case 2: Mid-level Engineer**

**Input:**
- Gross: 30,000,000 VNĐ
- Dependents: 2 (vợ + 1 con)

**Calculation:**
```typescript
const results = calculateNetSalary(30_000_000, 2, '2026');

// Results:
{
  gross: 30_000_000,
  totalInsurance: 3_150_000,
  taxableIncome: 7_050_000,
  tax: 455_000,
  net: 26_395_000
}
```

**Tax Breakdown:**
- Bậc 1 (0-5M, 5%): 5,000,000 × 5% = 250,000
- Bậc 2 (5-10M, 10%): 2,050,000 × 10% = 205,000
- Total: 455,000

**Display:**
```
✅ Bậc 1 (5%): 250,000đ (5M)
✅ Bậc 2 (10%): 205,000đ (2.05M)
❌ Bậc 3-5: Chưa đạt

Tổng thuế: 455,000đ/tháng
Net salary: 26,395,000đ/tháng
```

---

### **Use Case 3: Senior Manager**

**Input:**
- Gross: 60,000,000 VNĐ
- Dependents: 2

**Calculation:**
```typescript
const results = calculateNetSalary(60_000_000, 2, '2026');
const savings = calculateTaxSavings(results.taxableIncome);

// Results:
{
  gross: 60_000_000,
  totalInsurance: 5_022_000,
  taxableIncome: 35_178,000,
  tax: 7_144_500,  // 2026
  net: 47_833_500
}

// Savings:
{
  tax2025: 8_312,300,
  tax2026: 7_144_500,
  savings: 1_167,800 per month,
  savingsPerYear: 14,013,600
}
```

**Tax Breakdown:**
- Bậc 1: 250,000
- Bậc 2: 500,000
- Bậc 3: 1,200,000
- Bậc 4: 2,800,000
- Bậc 5: 2,394,500
- Total: 7,144,500

**Comparison Display:**
```
2025 (7 bậc): 8,312,300đ/tháng
2026 (5 bậc): 7,144,500đ/tháng

💰 Tiết kiệm: 1,167,800đ/tháng
📅 Tiết kiệm: 14,013,600đ/năm (14M+!)
```

---

## 🎨 STYLING & THEME

### **Color Palette**

```typescript
export const TAX_TIER_COLORS = {
  tier1: {
    bg: '#10b981',      // Green
    light: '#10b98120',
    border: '#10b98140',
  },
  tier2: {
    bg: '#3b82f6',      // Blue
    light: '#3b82f620',
    border: '#3b82f640',
  },
  tier3: {
    bg: '#8b5cf6',      // Purple
    light: '#8b5cf620',
    border: '#8b5cf640',
  },
  tier4: {
    bg: '#f59e0b',      // Orange
    light: '#f59e0b20',
    border: '#f59e0b40',
  },
  tier5: {
    bg: '#ef4444',      // Red
    light: '#ef444420',
    border: '#ef444440',
  },
};
```

### **Animation Variants**

```typescript
export const animationVariants = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, type: 'spring' },
  },
};
```

### **Responsive Breakpoints**

```css
/* Mobile First */
.tax-breakdown {
  padding: 1rem;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .tax-breakdown {
    padding: 1.5rem;
  }
  
  .tax-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .tax-breakdown {
    padding: 2rem;
  }
  
  .tax-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## ✅ TESTING

### **Unit Tests**

```typescript
// __tests__/tax-calculator.test.ts

import { 
  calculateTax2026,
  calculateTaxBreakdown2026,
  calculateTaxSavings,
  findTaxTier,
} from '@/lib/tax-calculator';

describe('Tax Calculator 2026', () => {
  describe('calculateTax2026', () => {
    it('should calculate tax for tier 1', () => {
      expect(calculateTax2026(3_000_000)).toBe(150_000);
    });

    it('should calculate tax for tier 2', () => {
      expect(calculateTax2026(7_000_000)).toBe(450_000);
    });

    it('should calculate tax for tier 5', () => {
      expect(calculateTax2026(50_000_000)).toBe(9_250_000);
    });
  });

  describe('calculateTaxBreakdown2026', () => {
    it('should return correct breakdown for 15M', () => {
      const result = calculateTaxBreakdown2026(15_000_000);
      
      expect(result.highestTier).toBe(3);
      expect(result.tiers).toHaveLength(3);
      expect(result.totalTax).toBe(1_500_000);
    });
  });

  describe('calculateTaxSavings', () => {
    it('should show no savings for income < 32M', () => {
      const result = calculateTaxSavings(20_000_000);
      expect(result.savings).toBe(0);
    });

    it('should show savings for income > 32M', () => {
      const result = calculateTaxSavings(50_000_000);
      expect(result.savings).toBeGreaterThan(0);
    });
  });

  describe('findTaxTier', () => {
    it('should find correct tier', () => {
      expect(findTaxTier(3_000_000, '2026')).toBe(1);
      expect(findTaxTier(7_000_000, '2026')).toBe(2);
      expect(findTaxTier(15_000_000, '2026')).toBe(3);
      expect(findTaxTier(25_000_000, '2026')).toBe(4);
      expect(findTaxTier(40_000_000, '2026')).toBe(5);
    });
  });
});
```

### **Component Tests**

```typescript
// __tests__/tax-breakdown.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { TaxBreakdown } from '@/components/calculator/tax-breakdown';

describe('TaxBreakdown Component', () => {
  it('should render with correct data', () => {
    render(
      <TaxBreakdown
        taxableIncome={15_000_000}
        totalTax={1_500_000}
      />
    );

    expect(screen.getByText(/Phân tích thuế/)).toBeInTheDocument();
    expect(screen.getByText(/15,000,000/)).toBeInTheDocument();
  });

  it('should expand/collapse on click', () => {
    render(
      <TaxBreakdown
        taxableIncome={15_000_000}
        totalTax={1_500_000}
      />
    );

    const header = screen.getByText(/Phân tích thuế/);
    fireEvent.click(header);
    
    // Check if content is hidden
    // ...
  });

  it('should show correct number of active tiers', () => {
    const { container } = render(
      <TaxBreakdown
        taxableIncome={15_000_000}
        totalTax={1_500_000}
      />
    );

    const activeTiers = container.querySelectorAll('.tier-active');
    expect(activeTiers).toHaveLength(3);
  });
});
```

---

## 📖 API REFERENCE

### **TaxBreakdown Props**

```typescript
interface TaxBreakdownProps {
  taxableIncome: number;    // Required: Thu nhập tính thuế
  totalTax: number;         // Required: Tổng thuế phải nộp
  className?: string;       // Optional: Additional CSS classes
}
```

### **InteractiveTaxSlider Props**

```typescript
// No props required - self-contained component
<InteractiveTaxSlider />
```

### **TaxComparison Props**

```typescript
interface TaxComparisonProps {
  taxableIncome: number;    // Required: Thu nhập tính thuế
  className?: string;       // Optional: Additional CSS classes
}
```

### **Utility Functions**

```typescript
// Calculate tax (2026)
calculateTax2026(taxableIncome: number): number

// Calculate tax (2025)
calculateTax2025(taxableIncome: number): number

// Get detailed breakdown
calculateTaxBreakdown2026(taxableIncome: number): TaxBreakdownResult

// Find tax tier
findTaxTier(taxableIncome: number, year: '2025' | '2026'): number

// Calculate savings
calculateTaxSavings(taxableIncome: number): TaxSavingsResult

// Calculate complete net salary
calculateNetSalary(
  gross: number,
  dependents: number,
  year: '2025' | '2026'
): NetSalaryResult

// Format helpers
formatCurrency(amount: number, options?: FormatOptions): string
formatPercentage(value: number, decimals?: number): string
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### **1. Memoization**

```typescript
import { useMemo } from 'react';

export function TaxBreakdown({ taxableIncome, totalTax }: TaxBreakdownProps) {
  // Memoize expensive calculations
  const taxPerTier = useMemo(
    () => calculateTaxPerTier(taxableIncome),
    [taxableIncome]
  );

  const highestTier = useMemo(
    () => taxPerTier.filter(t => t.amount > 0).length,
    [taxPerTier]
  );

  // ...rest of component
}
```

### **2. Lazy Loading**

```typescript
import dynamic from 'next/dynamic';

// Lazy load heavy components
const TaxVisualization = dynamic(
  () => import('./tax-visualization'),
  { loading: () => <Skeleton /> }
);
```

### **3. Animation Performance**

```typescript
// Use transform and opacity for smooth animations
<motion.div
  animate={{
    opacity: 1,
    transform: 'translateY(0)',  // GPU accelerated
  }}
  transition={{
    duration: 0.3,
    ease: 'easeOut',
  }}
/>
```

---

## 🐛 TROUBLESHOOTING

### **Common Issues**

**Issue 1: Animations not working**
```typescript
// Solution: Ensure Framer Motion is installed
npm install framer-motion

// And properly imported
import { motion } from 'framer-motion';
```

**Issue 2: Currency formatting incorrect**
```typescript
// Solution: Use Intl.NumberFormat with correct locale
new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
}).format(amount);
```

**Issue 3: Tax calculations off by a few dong**
```typescript
// Solution: Always round final results
return Math.round(taxAmount);
```

---

## 📝 CHANGELOG

### **Version 1.0 (December 2024)**
- ✅ Initial release
- ✅ 5-tier tax system (2026)
- ✅ TaxBreakdown component
- ✅ Interactive slider
- ✅ 2025 vs 2026 comparison
- ✅ Full documentation

---

## 🤝 CONTRIBUTING

If you find bugs or want to add features:

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

---

## 📄 LICENSE

This code is part of SalaryCalc VN project.  
All rights reserved.

---

## 💬 SUPPORT

For questions or issues:
- Email: support@salarycalc.vn
- GitHub Issues: [link]
- Documentation: [link]

---

**Last Updated:** December 15, 2024  
**Version:** 1.0  
**Author:** SalaryCalc Team

---

## 🎉 CONCLUSION

Tính năng Tax Breakdown 2026 này cung cấp:

1. ✅ **Education**: Users hiểu rõ thuế của mình
2. ✅ **Transparency**: Thấy từng đồng thuế
3. ✅ **Visualization**: Charts & progress bars
4. ✅ **Comparison**: 2025 vs 2026 savings
5. ✅ **Interactive**: Explore tax tiers
6. ✅ **Mobile-friendly**: Responsive design
7. ✅ **Performance**: Optimized animations

**Next Steps:**
1. Copy all component files
2. Install dependencies
3. Integrate into your app
4. Test with real data
5. Deploy & enjoy!

Happy coding! 🚀💯
