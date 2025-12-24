'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/shared/glass-card';
import { Button } from '@/components/ui/button';
import type { IncomeSource } from '@/types/tax-settlement';
import { Building2, Calendar, DollarSign, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/calculations/tax-settlement';

interface IncomeSourceCardProps {
  source: IncomeSource;
  onEdit: () => void;
  onDelete: () => void;
}

export default function IncomeSourceCard({
  source,
  onEdit,
  onDelete,
}: IncomeSourceCardProps) {
  // Calculate total income
  const totalIncome =
    source.basicSalary * source.monthsWorked +
    source.allowances +
    source.bonus +
    source.otherIncome;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard variant="subtle" className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-black">
                {source.companyName}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Period */}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-black/50" />
                <span className="text-black/70">
                  {source.periodFrom} đến {source.periodTo}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                  {source.monthsWorked} tháng
                </span>
              </div>

              {/* Total Income */}
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-black/50" />
                <span className="text-black/70">Tổng thu nhập:</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(totalIncome)}
                </span>
              </div>
            </div>

            {/* Income Breakdown */}
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-black/50">Lương cơ bản:</span>
                <p className="font-medium text-black">
                  {formatCurrency(source.basicSalary)}/tháng
                </p>
              </div>
              {source.allowances > 0 && (
                <div>
                  <span className="text-black/50">Phụ cấp:</span>
                  <p className="font-medium text-black">
                    {formatCurrency(source.allowances)}
                  </p>
                </div>
              )}
              {source.bonus > 0 && (
                <div>
                  <span className="text-black/50">Thưởng:</span>
                  <p className="font-medium text-black">
                    {formatCurrency(source.bonus)}
                  </p>
                </div>
              )}
              <div>
                <span className="text-black/50">Thuế đã khấu trừ:</span>
                <p className="font-medium text-orange-600">
                  {formatCurrency(source.taxWithheld)}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
