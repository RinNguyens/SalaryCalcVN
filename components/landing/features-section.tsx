'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { VideoDemoModal } from '@/components/demo/video-demo-modal';
import {
  Calculator,
  TrendingUp,
  PieChart,
  Calendar,
  BarChart3,
  Target,
  ArrowRight,
  Check,
  Play
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    id: 'gross-to-net',
    icon: Calculator,
    emoji: '🧮',
    title: 'Tính Gross → Net',
    subtitle: 'Lương thực nhận',
    description: 'Tính chính xác lương Net từ Gross, bao gồm thuế TNCN và bảo hiểm bắt buộc',
    highlights: [
      'Tự động tính BHXH, BHYT, BHTN',
      'Áp dụng đúng 7 bậc thuế lũy tiến',
      'Tính giảm trừ gia cảnh chính xác',
    ],
    color: 'from-blue-500 to-cyan-500',
    action: '/calculator?mode=gross-to-net',
  },
  {
    id: 'net-to-gross',
    icon: TrendingUp,
    emoji: '💰',
    title: 'Tính Net → Gross',
    subtitle: 'Đàm phán lương',
    description: 'Tính Gross cần đàm phán để đạt mức lương Net mong muốn',
    highlights: [
      'Tính ngược từ Net về Gross',
      'Chuẩn bị cho phỏng vấn',
      'Đàm phán offer chính xác',
    ],
    color: 'from-green-500 to-emerald-500',
    action: '/calculator?mode=net-to-gross',
  },
  {
    id: 'breakdown',
    icon: PieChart,
    emoji: '📊',
    title: 'Phân tích chi tiết',
    subtitle: 'Breakdown',
    description: 'Xem chi tiết từng khoản: BHXH, BHYT, BHTN, thuế TNCN, giảm trừ',
    highlights: [
      'Charts trực quan',
      'Breakdown từng khoản',
      'Export PDF báo cáo',
    ],
    color: 'from-purple-500 to-pink-500',
    action: '/calculator?tab=breakdown',
  },
  {
    id: 'annual',
    icon: Calendar,
    emoji: '📅',
    title: 'Thu nhập cả năm',
    subtitle: 'Annual Package',
    description: 'Tính tổng package: 12 tháng + tháng 13 + thưởng KPI',
    highlights: [
      'Tháng 13, KPI, Performance bonus',
      'Trung bình thu nhập/tháng',
      'Khuyến nghị tài chính 50-30-20',
    ],
    color: 'from-orange-500 to-red-500',
    action: '/calculator?tab=annual',
    badge: 'Mới',
  },
  {
    id: 'growth',
    icon: BarChart3,
    emoji: '📈',
    title: 'Dự đoán tăng lương',
    subtitle: 'Career Projection',
    description: 'Dự đoán lương 1-10 năm tới với AI insights',
    highlights: [
      'Projection timeline 1-10 năm',
      'Smart insights & recommendations',
      'So sánh với thị trường',
    ],
    color: 'from-indigo-500 to-purple-500',
    action: '/calculator?tab=growth',
    badge: 'Mới',
  },
  {
    id: 'compare',
    icon: Target,
    emoji: '🎯',
    title: 'So sánh offers',
    subtitle: 'Job Comparison',
    description: 'So sánh nhiều job offers để chọn tốt nhất',
    highlights: [
      'Side-by-side comparison',
      'Total compensation analysis',
      'Decision matrix với scoring',
    ],
    color: 'from-teal-500 to-cyan-500',
    action: '/job-offer-comparison',
    badge: 'Sắp ra mắt',
  },
];

export function FeaturesSection() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            ✨ Tính năng chính
          </h2>
        </motion.div>

        {/* Features Grid */}
        <GlassCard variant="strong" className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="lg"
              className="
                bg-gradient-to-r from-purple-600 to-pink-600
                hover:from-purple-700 hover:to-pink-700
                text-white font-bold text-lg
                px-8 py-6
                shadow-2xl
              "
              asChild
            >
              <Link href="/calculator">
                🚀 Bắt đầu tính toán
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsDemoOpen(true)}
              className="
                border-white/30
                hover:bg-white/10
                font-semibold
                group
                px-8 py-6
              "
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Xem demo
            </Button>
          </motion.div>
        </GlassCard>

        {/* Trust Badge */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-sm">
            ✓ Tính toán theo quy định thuế TNCN và bảo hiểm 2026
          </p>
        </motion.div>

        {/* Video Modal */}
        <VideoDemoModal
          isOpen={isDemoOpen}
          onClose={() => setIsDemoOpen(false)}
          videoUrl="/videos/salary-calc-demo.mp4"
          title="SalaryCalc VN - Demo Overview"
          description="Tìm hiểu cách sử dụng công cụ tính lương trong 2 phút"
          thumbnail="/videos/demo-thumbnail.jpg"
          autoPlay
        />
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  return (
    <motion.a
      href={feature.action}
      className="
        group relative block h-full
        p-6 rounded-2xl
        bg-white/5 backdrop-blur-sm
        border-2 border-white/10
        hover:border-white/30
        hover:bg-white/10
        transition-all duration-300
        cursor-pointer
        overflow-hidden
      "
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient Overlay on Hover */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-10
        bg-gradient-to-br ${feature.color}
        transition-opacity duration-300
      `} />

      {/* Badge */}
      {feature.badge && (
        <div className="absolute top-4 right-4">
          <span className={`
            px-3 py-1 rounded-full text-xs font-bold
            bg-gradient-to-r ${feature.color} text-white
            shadow-lg
          `}>
            {feature.badge}
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="relative mb-4">
        <div className={`
          w-16 h-16 rounded-2xl
          bg-gradient-to-br ${feature.color}
          flex items-center justify-center
          text-4xl
          shadow-lg
          group-hover:scale-110 group-hover:rotate-3
          transition-all duration-300
        `}>
          {feature.emoji}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-xl font-bold text-white mb-1">
        {feature.title}
      </h4>

      {/* Subtitle */}
      <p className="text-sm text-white/60 mb-3 font-medium">
        {feature.subtitle}
      </p>

      {/* Description */}
      <p className="text-white/80 text-sm mb-4 leading-relaxed">
        {feature.description}
      </p>

      {/* Highlights */}
      <ul className="space-y-2 mb-4">
        {feature.highlights.map((highlight, idx) => (
          <li key={idx} className="flex items-start gap-2 text-xs text-white/70">
            <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {/* Arrow Icon */}
      <div className="flex items-center text-white/60 group-hover:text-white text-sm font-medium">
        Tìm hiểu thêm
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.a>
  );
}