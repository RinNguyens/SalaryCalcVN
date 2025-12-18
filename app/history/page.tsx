'use client';

import { motion } from 'framer-motion';
import { HistoryList } from '@/components/history/history-list';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PastelBackground } from '@/components/layout/pastel-background';
import { PastelGlassButton } from '@/components/ui/pastel-glass-button';

export default function HistoryPage() {
  return (
    <div className="min-h-screen relative">
      <PastelBackground />

      <div className="max-w-5xl mx-auto relative z-10 p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/calculator">
            <PastelGlassButton
              variant="secondary"
              size="sm"
              icon={<ArrowLeft className="h-4 w-4" />}
              className="mb-4"
            >
              Quay lại calculator
            </PastelGlassButton>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-chart-purple via-chart-blue to-chart-pink bg-clip-text text-transparent">
            Lịch sử tính toán
          </h1>
          <p className="text-slate-600">
            Xem lại các tính toán đã thực hiện
          </p>
        </motion.div>

        {/* History List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <HistoryList />
        </motion.div>
      </div>
    </div>
  );
}
