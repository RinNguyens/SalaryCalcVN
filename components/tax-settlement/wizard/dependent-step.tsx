'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/shared/glass-card';
import { Button } from '@/components/ui/button';
import type { TaxSettlementDependent } from '@/types/tax-settlement';
import DependentCard from '../dependents/dependent-card';
import DependentForm from '../dependents/dependent-form';
import { Plus, ArrowLeft, Calculator, Users } from 'lucide-react';

interface DependentStepProps {
  dependents: TaxSettlementDependent[];
  year: number;
  onAdd: (dependent: TaxSettlementDependent) => void;
  onUpdate: (id: string, updates: Partial<TaxSettlementDependent>) => void;
  onDelete: (id: string) => void;
  onCalculate: () => void;
  onBack: () => void;
}

export default function DependentStep({
  dependents,
  year,
  onAdd,
  onUpdate,
  onDelete,
  onCalculate,
  onBack,
}: DependentStepProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingDependent, setEditingDependent] = useState<TaxSettlementDependent | undefined>();

  const handleEdit = (dependent: TaxSettlementDependent) => {
    setEditingDependent(dependent);
    setShowForm(true);
  };

  const handleFormSubmit = (dependent: TaxSettlementDependent) => {
    if (editingDependent) {
      onUpdate(dependent.id, dependent);
    } else {
      onAdd(dependent);
    }
    setEditingDependent(undefined);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingDependent(undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard variant="strong" className="p-6 md:p-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Bước 3: Người phụ thuộc
            </h2>
          </div>
          <p className="text-black/70 ml-7">
            Thêm thông tin người phụ thuộc đã đăng ký (tùy chọn)
          </p>
        </div>

        {/* Dependents List */}
        <div className="space-y-4 mb-6">
          <AnimatePresence>
            {dependents.map((dependent) => (
              <DependentCard
                key={dependent.id}
                dependent={dependent}
                onEdit={() => handleEdit(dependent)}
                onDelete={() => onDelete(dependent.id)}
              />
            ))}
          </AnimatePresence>

          {dependents.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-black/10 rounded-lg">
              <Users className="h-12 w-12 text-black/30 mx-auto mb-4" />
              <p className="text-black/50 mb-2">
                Chưa có người phụ thuộc nào
              </p>
              <p className="text-sm text-black/40">
                Bạn có thể bỏ qua bước này nếu không có người phụ thuộc
              </p>
            </div>
          )}
        </div>

        {/* Add Dependent Button */}
        <Button
          onClick={() => setShowForm(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white mb-6"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Thêm người phụ thuộc
        </Button>

        {/* Dependent Form Dialog */}
        <DependentForm
          open={showForm}
          onOpenChange={handleFormClose}
          onSubmit={handleFormSubmit}
          year={year}
          initialData={editingDependent}
        />

        {/* Actions */}
        <div className="flex justify-between gap-4 pt-4 border-t border-black/10">
          <Button
            variant="outline"
            size="lg"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>

          <Button
            size="lg"
            onClick={onCalculate}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Tính toán quyết toán
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
