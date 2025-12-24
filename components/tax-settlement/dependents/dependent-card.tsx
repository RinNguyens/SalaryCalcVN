'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/shared/glass-card';
import { Button } from '@/components/ui/button';
import type { TaxSettlementDependent } from '@/types/tax-settlement';
import { User, Calendar, Edit, Trash2, Hash } from 'lucide-react';

interface DependentCardProps {
  dependent: TaxSettlementDependent;
  onEdit: () => void;
  onDelete: () => void;
}

const RELATIONSHIP_LABELS: Record<string, string> = {
  child: 'Con',
  spouse: 'Vợ/Chồng',
  parent: 'Bố/Mẹ',
  sibling: 'Anh/Chị/Em',
  other: 'Khác',
};

export default function DependentCard({
  dependent,
  onEdit,
  onDelete,
}: DependentCardProps) {
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
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-black">
                {dependent.name}
              </h3>
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">
                {RELATIONSHIP_LABELS[dependent.relationship]}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-black/50" />
                <span className="text-black/70">MST: {dependent.taxCode}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-black/50" />
                <span className="text-black/70">
                  {dependent.monthsRegistered} tháng
                </span>
              </div>
            </div>

            {dependent.registeredFrom && (
              <div className="mt-2 text-xs text-black/50">
                Từ {dependent.registeredFrom}
                {dependent.registeredTo && ` đến ${dependent.registeredTo}`}
              </div>
            )}
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
