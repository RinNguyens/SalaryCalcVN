'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/shared/glass-card';
import { Button } from '@/components/ui/button';
import type { TaxSettlement } from '@/types/tax-settlement';
import { formatCurrency, getSettlementSummary } from '@/lib/calculations/tax-settlement';
import { Save, Download, RotateCcw, CheckCircle, XCircle, MinusCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ResultsStepProps {
  settlement: TaxSettlement;
  onSave: () => void;
  onReset: () => void;
}

export default function ResultsStep({
  settlement,
  onSave,
  onReset,
}: ResultsStepProps) {
  const calc = settlement.calculation;

  if (!calc) {
    return (
      <GlassCard variant="strong" className="p-8 text-center">
        <p className="text-black/70">Đang tải kết quả...</p>
      </GlassCard>
    );
  }

  const handleSave = () => {
    onSave();
    toast.success('Đã lưu quyết toán thành công!');
  };

  const handleExportPDF = () => {
    toast.info('Tính năng export PDF đang được phát triển');
  };

  const SettlementIcon =
    calc.settlementType === 'refund'
      ? CheckCircle
      : calc.settlementType === 'payment'
      ? XCircle
      : MinusCircle;

  const settlementColor =
    calc.settlementType === 'refund'
      ? 'text-green-600'
      : calc.settlementType === 'payment'
      ? 'text-red-600'
      : 'text-blue-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard variant="strong" className="p-6 md:p-8">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Kết quả quyết toán
            </h2>
          </div>
        </div>

        {/* Settlement Amount Card */}
        <div className="mb-8">
          <GlassCard variant="subtle" className="p-6 text-center border-2 border-purple-200">
            <SettlementIcon className={`h-16 w-16 mx-auto mb-4 ${settlementColor}`} />
            <h3 className="text-lg font-semibold text-black/70 mb-2">
              {calc.settlementType === 'refund'
                ? 'Được hoàn thuế'
                : calc.settlementType === 'payment'
                ? 'Phải nộp thêm'
                : 'Đã quyết toán chính xác'}
            </h3>
            <p className={`text-4xl md:text-5xl font-bold ${settlementColor}`}>
              {formatCurrency(Math.abs(calc.settlementAmount))}
            </p>
          </GlassCard>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/50 rounded-lg p-4">
            <p className="text-sm text-black/60 mb-1">Tổng thu nhập</p>
            <p className="text-lg font-semibold text-black">
              {formatCurrency(calc.totalIncome)}
            </p>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <p className="text-sm text-black/60 mb-1">Giảm trừ</p>
            <p className="text-lg font-semibold text-black">
              {formatCurrency(calc.totalDeductions)}
            </p>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <p className="text-sm text-black/60 mb-1">Thuế phải nộp</p>
            <p className="text-lg font-semibold text-orange-600">
              {formatCurrency(calc.calculatedTax)}
            </p>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <p className="text-sm text-black/60 mb-1">Thuế đã khấu trừ</p>
            <p className="text-lg font-semibold text-blue-600">
              {formatCurrency(calc.paidTax)}
            </p>
          </div>
        </div>

        {/* Tax Breakdown */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-black mb-4">Chi tiết thuế</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-100">
                  <th className="p-3 text-left">Bậc thuế</th>
                  <th className="p-3 text-right">Thu nhập tính thuế</th>
                  <th className="p-3 text-right">Thuế suất</th>
                  <th className="p-3 text-right">Thuế phải nộp</th>
                </tr>
              </thead>
              <tbody>
                {calc.taxBreakdown.map((bracket) => (
                  <tr key={bracket.tier} className="border-b border-black/10">
                    <td className="p-3">Bậc {bracket.tier}</td>
                    <td className="p-3 text-right">
                      {formatCurrency(bracket.taxableAmount)}
                    </td>
                    <td className="p-3 text-right">{bracket.rate}%</td>
                    <td className="p-3 text-right font-semibold">
                      {formatCurrency(bracket.taxAmount)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-purple-50 font-semibold">
                  <td className="p-3" colSpan={3}>Tổng thuế</td>
                  <td className="p-3 text-right">{formatCurrency(calc.calculatedTax)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Deduction Breakdown */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-black mb-4">Chi tiết giảm trừ</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-3 bg-white/50 rounded">
              <span className="text-black/70">Giảm trừ bản thân</span>
              <span className="font-semibold">
                {formatCurrency(calc.deductionBreakdown.personal)}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-white/50 rounded">
              <span className="text-black/70">Giảm trừ người phụ thuộc</span>
              <span className="font-semibold">
                {formatCurrency(calc.deductionBreakdown.dependents)}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-white/50 rounded">
              <span className="text-black/70">Bảo hiểm</span>
              <span className="font-semibold">
                {formatCurrency(calc.deductionBreakdown.insurance)}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-purple-100 rounded font-semibold">
              <span>Tổng giảm trừ</span>
              <span>{formatCurrency(calc.deductionBreakdown.total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            size="lg"
          >
            <Save className="mr-2 h-5 w-5" />
            Lưu quyết toán
          </Button>
          <Button
            onClick={handleExportPDF}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Xuất PDF
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Quyết toán mới
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
