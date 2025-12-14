'use client';

import { motion } from 'framer-motion';
import { ComparisonTable } from '@/components/comparison/comparison-table';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 md:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            y: [0, -80, 0],
            x: [0, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            So sánh mức lương
          </h1>
          <p className="text-white/80">
            So sánh nhiều mức lương để tìm mức tối ưu
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ComparisonTable />
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <div className="glass-subtle rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              💡 Mẹo sử dụng
            </h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>• So sánh tối đa 5 mức lương cùng lúc</li>
              <li>• Thay đổi vùng và số người phụ thuộc cho mỗi mức lương</li>
              <li>• Bảng kết quả hiển thị chi tiết breakdown cho từng mức</li>
              <li>• Cuộn ngang để xem tất cả các cột trên mobile</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
