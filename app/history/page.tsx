'use client';

import { motion } from 'framer-motion';
import { HistoryList } from '@/components/history/history-list';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 md:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/calculator">
            <Button
              variant="outline"
              className="mb-4 gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại calculator
            </Button>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Lịch sử tính toán
          </h1>
          <p className="text-white/80">
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
