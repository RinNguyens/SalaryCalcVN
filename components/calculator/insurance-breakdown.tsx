'use client';

import { GlassCard } from '@/components/shared/glass-card';
import { Progress } from '@/components/ui/progress';
import type { SalaryResult } from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';
import { Shield, Heart, Briefcase, Info } from 'lucide-react';

interface InsuranceBreakdownProps {
  result: SalaryResult;
}

export function InsuranceBreakdown({ result }: InsuranceBreakdownProps) {
  const insuranceItems = [
    {
      name: 'BHXH - Bảo hiểm xã hội',
      value: result.insurance.bhxh,
      percentage: 8,
      icon: Shield,
      color: 'bg-blue-500',
      description: 'Bảo hiểm hưu trí, tử tuất',
    },
    {
      name: 'BHYT - Bảo hiểm y tế',
      value: result.insurance.bhyt,
      percentage: 1.5,
      icon: Heart,
      color: 'bg-red-500',
      description: 'Chi phí khám chữa bệnh',
    },
    {
      name: 'BHTN - Bảo hiểm thất nghiệp',
      value: result.insurance.bhtn,
      percentage: 1,
      icon: Briefcase,
      color: 'bg-orange-500',
      description: 'Hỗ trợ khi mất việc làm',
    },
  ];

  const cappedSalary = result.insurance.cappedSalary;
  const isCapped = result.gross > cappedSalary;

  return (
    <GlassCard variant="default" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          Chi tiết bảo hiểm
        </h3>
        <div className="text-right">
          <p className="text-xs text-white/70">Tổng cộng</p>
          <p className="text-lg font-bold text-white">
            {formatCurrency(result.insurance.total)}
          </p>
        </div>
      </div>

      {isCapped && (
        <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-200">
              <p className="font-semibold mb-1">Lương vượt trần đóng bảo hiểm</p>
              <p>
                Lương tính BH: {formatCurrency(cappedSalary)} (trần: 46.8M cho BHXH/BHYT)
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {insuranceItems.map((item, index) => {
          const Icon = item.icon;
          const progressValue = (item.value / result.insurance.total) * 100;

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${item.color} bg-opacity-20`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-white/60">{item.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">
                    {formatCurrency(item.value)}
                  </p>
                  <p className="text-xs text-white/60">{item.percentage}%</p>
                </div>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/70 mb-1">Lương tính BH</p>
            <p className="text-white font-semibold">
              {formatCurrency(cappedSalary)}
            </p>
          </div>
          <div>
            <p className="text-white/70 mb-1">Tổng đóng/tháng</p>
            <p className="text-white font-semibold">
              {formatCurrency(result.insurance.total)}
            </p>
          </div>
          <div>
            <p className="text-white/70 mb-1">Tổng đóng/năm</p>
            <p className="text-white font-semibold">
              {formatCurrency(result.insurance.total * 12)}
            </p>
          </div>
          <div>
            <p className="text-white/70 mb-1">Tỷ lệ/Gross</p>
            <p className="text-white font-semibold">
              {((result.insurance.total / result.gross) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
