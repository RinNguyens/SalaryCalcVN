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

// Tax tiers for 2026 (5 tiers) - Official Law
const TAX_TIERS_2026 = [
  {
    tier: 1,
    min: 0,
    max: 10_000_000,
    rate: 0.05,
    color: '#10b981',
    name: 'Bậc 1',
    description: 'Thu nhập ≤ 10 triệu'
  },
  {
    tier: 2,
    min: 10_000_000,
    max: 30_000_000,
    rate: 0.10,
    color: '#3b82f6',
    name: 'Bậc 2',
    description: 'Thu nhập 10-30 triệu'
  },
  {
    tier: 3,
    min: 30_000_000,
    max: 50_000_000,
    rate: 0.20,
    color: '#8b5cf6',
    name: 'Bậc 3',
    description: 'Thu nhập 30-50 triệu'
  },
  {
    tier: 4,
    min: 50_000_000,
    max: 100_000_000,
    rate: 0.30,
    color: '#f59e0b',
    name: 'Bậc 4',
    description: 'Thu nhập 50-100 triệu'
  },
  {
    tier: 5,
    min: 100_000_000,
    max: Infinity,
    rate: 0.35,
    color: '#ef4444',
    name: 'Bậc 5',
    description: 'Thu nhập > 100 triệu'
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
    <GlassCard variant="strong" className={`p-3 sm:p-6 ${className}`}>
      {/* Header */}
      <div
        className="flex items-center justify-between mb-4 sm:mb-6 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
          </div>
          <div>
            <h3 className="text-sm sm:text-lg font-bold text-black group-hover:text-yellow-400 transition-colors">
              Phân tích thuế theo bậc lũy tiến
            </h3>
            <p className="text-xs sm:text-sm text-black/60">
              Biểu thuế 5 bậc năm 2026 (mới)
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-black/60 group-hover:text-black/80 transition-colors" />
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
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
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
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
          <div className="mb-4 sm:mb-6">
            <TaxVisualization taxPerTier={taxPerTier} totalTax={totalTax} />
          </div>
        )}

        {/* Explanation */}
        <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
          <div className="flex gap-2 sm:gap-3">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm text-black/80 mb-1 sm:mb-2">
                <strong className="text-black">Thuế lũy tiến là gì?</strong>
              </p>
              <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
                Thuế TNCN được tính theo từng bậc. Thu nhập càng cao, phần vượt mức
                mới bị đánh thuế cao hơn. Ví dụ: Thu nhập 15M sẽ chịu 5% cho 5M đầu,
                10% cho 5M tiếp theo, và 15% cho 5M cuối cùng.
              </p>
            </div>
          </div>
        </div>

        {/* 2026 Benefit Note */}
        {calculateSavings2026(taxableIncome) > 0 && (
          <div className="p-2 sm:p-3 rounded-lg bg-green-500/10 border border-green-400/30">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600">
              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
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
          p-2 sm:p-4 rounded-lg border-2 transition-all duration-300
          ${isActive
            ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:scale-[1.01]'
            : 'bg-white/5 border-white/10 opacity-50'
          }
        `}
      >
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          {/* Tier Info */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-black text-xs sm:text-sm shadow-lg"
              style={{ backgroundColor: tier.color }}
            >
              {tier.tier}
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-black">
                {tier.name}: {(tier.rate * 100).toFixed(0)}%
              </div>
              <div className="text-[10px] sm:text-xs text-black/60">
                {formatRange(tier.min, tier.max)}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="text-right">
            {isActive ? (
              <>
                <div className="text-xs sm:text-base font-bold text-black break-words">
                  {formatCurrency(tier.amount, true)}
                </div>
                <div className="text-[10px] sm:text-xs text-black/60 hidden sm:block">
                  trên {formatCurrency(tier.incomeInTier, true)}
                </div>
              </>
            ) : (
              <div className="text-[10px] sm:text-xs text-black/40 font-medium">
                Chưa đạt
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
            <div className="mt-1 text-xs text-black/50 text-right">
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
    <div className="p-3 sm:p-6 rounded-lg bg-white/5 border border-white/10">
      <h4 className="text-xs sm:text-sm font-bold text-black mb-3 sm:mb-4 flex items-center gap-2">
        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
        Phân bổ thuế theo bậc
      </h4>

      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8">
        {/* Donut Chart */}
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 flex-shrink-0">
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
            <div className="text-[10px] sm:text-xs text-black/60 mb-1">Tổng thuế</div>
            <div className="text-sm sm:text-xl font-bold text-black">
              {formatCurrency(totalTax, true)}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2 sm:space-y-3 w-full">
          {activeTiers.map((tier) => {
            const percentage = (tier.amount / totalTax) * 100;
            return (
              <div key={tier.tier} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: tier.color }}
                  />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-black">
                      {tier.name}
                    </div>
                    <div className="text-[10px] sm:text-xs text-black/60">
                      {percentage.toFixed(1)}% tổng thuế
                    </div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-bold text-black text-right flex-shrink-0">
                  {formatCurrency(tier.amount, true)}
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
    <div className="p-2 sm:p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
        <div className={`p-1 sm:p-1.5 rounded-md bg-gradient-to-br ${colorMap[color]}`}>
          {icon}
        </div>
        <span className="text-[10px] sm:text-xs text-black/60">{label}</span>
      </div>
      <div className="text-sm sm:text-lg font-bold text-black break-words">
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
  // Savings from both increased deductions AND tax reform
  const tax2025 = calculateTax7Tier(taxableIncome + 6_400_000); // Add back old deductions
  const tax2026 = calculateTax5Tier(taxableIncome);

  return Math.max(0, Math.round(tax2025 - tax2026));
}

function calculateTax7Tier(income: number): number {
  // Old 7-tier system
  if (income <= 5_000_000) return income * 0.05;
  if (income <= 10_000_000) return income * 0.10 - 250_000;
  if (income <= 18_000_000) return income * 0.15 - 750_000;
  if (income <= 32_000_000) return income * 0.20 - 1_650_000;
  if (income <= 52_000_000) return income * 0.25 - 3_250_000;
  if (income <= 80_000_000) return income * 0.30 - 5_850_000;
  return income * 0.35 - 9_850_000;
}

function calculateTax5Tier(income: number): number {
  // New 5-tier system (2026)
  if (income <= 10_000_000) return income * 0.05;
  if (income <= 30_000_000) return income * 0.10 - 500_000;
  if (income <= 50_000_000) return income * 0.20 - 3_500_000;
  if (income <= 100_000_000) return income * 0.30 - 8_500_000;
  return income * 0.35 - 13_500_000;
}