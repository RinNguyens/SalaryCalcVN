'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/shared/glass-card';
import { Button } from '@/components/ui/button';
import type { IncomeSource } from '@/types/tax-settlement';
import IncomeSourceCard from '../income/income-source-card';
import IncomeSourceForm from '../income/income-source-form';
import { Plus, ArrowLeft, ArrowRight, Briefcase } from 'lucide-react';

interface IncomeStepProps {
  sources: IncomeSource[];
  onAdd: (source: IncomeSource) => void;
  onUpdate: (id: string, updates: Partial<IncomeSource>) => void;
  onDelete: (id: string) => void;
  onCalculate: () => void;
  onNext: () => void;
  onBack: () => void;
}

export default function IncomeStep({
  sources,
  onAdd,
  onUpdate,
  onDelete,
  onCalculate,
  onNext,
  onBack,
}: IncomeStepProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingSource, setEditingSource] = useState<IncomeSource | undefined>();

  const handleEdit = (source: IncomeSource) => {
    setEditingSource(source);
    setShowForm(true);
  };

  const handleFormSubmit = (source: IncomeSource) => {
    if (editingSource) {
      onUpdate(source.id, source);
    } else {
      onAdd(source);
    }
    setEditingSource(undefined);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingSource(undefined);
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
              Bước 2: Nguồn thu nhập
            </h2>
          </div>
          <p className="text-black/70 ml-7">
            Thêm thông tin thu nhập từ các công ty bạn đã làm việc trong năm
          </p>
        </div>

        {/* Income Sources List */}
        <div className="space-y-4 mb-6">
          <AnimatePresence>
            {sources.map((source) => (
              <IncomeSourceCard
                key={source.id}
                source={source}
                onEdit={() => handleEdit(source)}
                onDelete={() => onDelete(source.id)}
              />
            ))}
          </AnimatePresence>

          {sources.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-black/10 rounded-lg">
              <Briefcase className="h-12 w-12 text-black/30 mx-auto mb-4" />
              <p className="text-black/50 mb-4">
                Chưa có nguồn thu nhập nào
              </p>
            </div>
          )}
        </div>

        {/* Add Income Button */}
        <Button
          onClick={() => setShowForm(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white mb-6"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Thêm nguồn thu nhập
        </Button>

        {/* Income Source Form Dialog */}
        <IncomeSourceForm
          open={showForm}
          onOpenChange={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={editingSource}
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
            onClick={onNext}
            disabled={sources.length === 0}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Tiếp tục
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
