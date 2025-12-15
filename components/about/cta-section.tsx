'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard variant="strong" className="p-12 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <Calculator className="h-16 w-16 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sẵn sàng tính lương của bạn?
            </h2>

            {/* Description */}
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Tham gia <strong className="text-white">50,000+</strong> người lao động đang sử dụng SalaryCalc VN
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Users className="h-5 w-5" />
                <span>50K+ Users</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <TrendingUp className="h-5 w-5" />
                <span>99.9% Accurate</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Calculator className="h-5 w-5" />
                <span>100% Free</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6 font-bold"
                >
                  Bắt đầu tính lương
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/blog">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 font-bold"
                >
                  Đọc hướng dẫn
                </Button>
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-white/70 text-sm">
                ✨ Miễn phí 100% • ✅ Chính xác tuyệt đối • 🔒 Bảo mật an toàn
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}