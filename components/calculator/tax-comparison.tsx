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