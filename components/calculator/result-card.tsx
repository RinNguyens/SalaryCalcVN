'use client';

import { GlassCard } from '@/components/shared/glass-card';
import { AnimatedNumber } from '@/components/shared/animated-number';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExportButton } from '@/components/calculator/export-button';
import type { SalaryResult } from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';
import { Wallet, Shield, Receipt, Users } from 'lucide-react';

interface ResultCardProps {
  result: SalaryResult;
  mode: 'gross-to-net' | 'net-to-gross';
}

export function ResultCard({ result, mode }: ResultCardProps) {
  return (
    <div className="space-y-4">
      {/* Main Result */}
      <GlassCard variant="default" className="p-6" glow>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-black" />
            <h3 className="text-lg font-semibold text-black">
              {mode === 'gross-to-net' ? 'Lương thực nhận' : 'Lương Gross'}
            </h3>
            <Badge variant='completed'>
              {mode === 'gross-to-net' ? 'Net' : 'Gross'}
            </Badge>
          </div>

          <div className="flex justify-end items-center">
            <ExportButton result={result} mode={mode} />
          </div>
        </div>

        <div className="text-center py-6">
          <div className="text-5xl font-bold text-green-600">
            <AnimatedNumber
              value={mode === 'gross-to-net' ? result.net : result.gross}
              formatFn={(val) => formatCurrency(val)}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <Shield className="h-4 w-4 text-indigo-300 mx-auto mb-1" />
            <p className="text-xs text-black/70">Bảo hiểm</p>
            <p className="text-sm font-semibold text-black">
              {formatCurrency(result.insurance.total)}
            </p>
          </div>
          <div className="text-center">
            <Receipt className="h-4 w-4 text-orange-300 mx-auto mb-1" />
            <p className="text-xs text-black/70">Thuế</p>
            <p className="text-sm font-semibold text-black">
              {formatCurrency(result.tax.tax)}
            </p>
          </div>
          <div className="text-center">
            <Users className="h-4 w-4 text-purple-300 mx-auto mb-1" />
            <p className="text-xs text-black/70">Giảm trừ</p>
            <p className="text-sm font-semibold text-black">
              {formatCurrency(result.deductions.total)}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Detailed Breakdown */}
      <GlassCard variant="default" className="p-6">
        <h4 className="text-md font-semibold text-black mb-4">
          Chi tiết tính toán
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between text-black">
            <span>Lương Gross</span>
            <span className="font-mono">{formatCurrency(result.gross)}</span>
          </div>

          <Separator className="bg-white/20" />

          {/* Insurance breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-black/90">
              <span>BHXH (8%)</span>
              <span>-{formatCurrency(result.insurance.bhxh)}</span>
            </div>
            <div className="flex justify-between text-black/90">
              <span>BHYT (1.5%)</span>
              <span>-{formatCurrency(result.insurance.bhyt)}</span>
            </div>
            <div className="flex justify-between text-black/90">
              <span>BHTN (1%)</span>
              <span>-{formatCurrency(result.insurance.bhtn)}</span>
            </div>
          </div>

          <Separator className="bg-white/20" />

          <div className="flex justify-between text-black">
            <span>Thuế TNCN (Bậc {result.tax.bracket})</span>
            <span>-{formatCurrency(result.tax.tax)}</span>
          </div>

          <div className="flex justify-between text-black/80 text-sm">
            <span>Thuế suất hiệu dụng</span>
            <span>{(result.tax.effectiveRate * 100).toFixed(2)}%</span>
          </div>

          <Separator className="bg-white/20" />

          <div className="flex justify-between text-black font-bold">
            <span>Lương Net</span>
            <span className="text-lg text-green-600">
              {formatCurrency(result.net)}
            </span>
          </div>
        </div>

        {/* Yearly Projection */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <h5 className="text-sm font-semibold text-black mb-3">
            Dự đoán cả năm (12 tháng)
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-black/90">
              <span>Gross/năm</span>
              <span>{formatCurrency(result.yearlyProjection.grossYearly)}</span>
            </div>
            <div className="flex justify-between text-black/90">
              <span>Net/năm</span>
              <span className="text-green-600 font-semibold">
                {formatCurrency(result.yearlyProjection.netYearly)}
              </span>
            </div>
            <div className="flex justify-between text-black/70 text-xs">
              <span>Tổng thuế/năm</span>
              <span>{formatCurrency(result.yearlyProjection.totalTax)}</span>
            </div>
            <div className="flex justify-between text-black/70 text-xs">
              <span>Tổng bảo hiểm/năm</span>
              <span>
                {formatCurrency(result.yearlyProjection.totalInsurance)}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
