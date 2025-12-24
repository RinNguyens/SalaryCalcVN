'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { formatCurrency, calculateTax2026, findTaxTier } from '@/lib/tax-calculator';
import { Activity } from 'lucide-react';

const TAX_BRACKETS = [
  { tier: 1, threshold: 10_000_000, rate: 5, color: '#10b981', label: 'Bậc 1' },
  { tier: 2, threshold: 30_000_000, rate: 10, color: '#3b82f6', label: 'Bậc 2' },
  { tier: 3, threshold: 50_000_000, rate: 20, color: '#8b5cf6', label: 'Bậc 3' },
  { tier: 4, threshold: 100_000_000, rate: 30, color: '#f59e0b', label: 'Bậc 4' },
  { tier: 5, threshold: 200_000_000, rate: 35, color: '#ef4444', label: 'Bậc 5' },
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
          <Activity className="h-5 w-5 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-black">
            🎚️ Khám phá bậc thuế của bạn
          </h3>
          <p className="text-sm text-black/60">
            Kéo thanh trượt để xem bậc thuế thay đổi
          </p>
        </div>
      </div>

      {/* Income Input & Display */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-black/70">Thu nhập tính thuế</span>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={formatCurrency(income, { decimals: 0 }).replace('₫', '').trim()}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-32 text-right bg-white/10 border-white/20 text-black"
            />
            <span className="text-black/70">₫</span>
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

        <div className="flex justify-between text-xs text-black/50">
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
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              whileHover={isCurrent ? { y: -1 } : {}}
            >
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-black text-xs font-bold shadow-md"
                    style={{ backgroundColor: bracket.color }}
                  >
                    {bracket.tier}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">
                      {bracket.rate}%
                    </div>
                    <div className="text-xs text-black/60">
                      {formatCurrency(bracket.threshold, { short: true })}
                    </div>
                  </div>
                </div>

                {isCurrent && (
                  <motion.div
                    className="flex items-center gap-1 text-xs font-bold text-black bg-white/20 px-3 py-1.5 rounded-full"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
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
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="p-5 rounded-lg border-2"
        style={{
          backgroundColor: `${currentBracket.color}15`,
          borderColor: `${currentBracket.color}60`,
        }}
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-black/70 mb-1">Bậc hiện tại</div>
            <div className="text-2xl font-bold text-black">
              {currentBracket.label}
            </div>
          </div>
          <div>
            <div className="text-xs text-black/70 mb-1">Thuế suất</div>
            <div className="text-2xl font-bold text-black">
              {currentBracket.rate}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div>
            <div className="text-xs text-black/60 mb-1">Tổng thuế</div>
            <div className="text-lg font-bold text-black">
              {formatCurrency(tax)}
            </div>
          </div>
          <div>
            <div className="text-xs text-black/60 mb-1">Thuế suất hiệu dụng</div>
            <div className="text-lg font-bold text-black">
              {effectiveRate.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Progress to next tier */}
        {currentTier < 5 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-black/60 mb-2">
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