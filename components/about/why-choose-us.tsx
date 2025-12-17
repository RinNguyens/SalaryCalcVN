'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import {
  CheckCircle,
  DollarSign,
  Smile,
  BarChart3,
  Lock,
  RefreshCw,
  Sparkles
} from 'lucide-react';

const reasons = [
  {
    icon: CheckCircle,
    title: 'Chính xác 100%',
    description: 'Công thức tính theo luật mới nhất (2026). Kiểm tra kỹ lưỡng bởi chuyên gia. Cập nhật liên tục.',
    color: 'from-green-500 to-emerald-500',
    features: [
      'Theo luật thuế TNCN 2026',
      'Biểu thuế 5 bậc mới nhất',
      'Giảm trừ 15.5M/6.2M chính xác',
    ],
  },
  {
    icon: DollarSign,
    title: 'Miễn phí mãi mãi',
    description: 'Không phí ẩn, không thu phí. Không giới hạn số lần tính. Không cần đăng ký.',
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Tính không giới hạn',
      'Không cần tạo tài khoản',
      'Không quảng cáo phiền nhiễu',
    ],
  },
  {
    icon: Smile,
    title: 'Giao diện đẹp & Dễ dùng',
    description: 'Glass morphism UI hiện đại. 3 bước là xong. Mobile-friendly cho mọi thiết bị.',
    color: 'from-purple-500 to-pink-500',
    features: [
      'UI/UX hiện đại 2024',
      'Responsive mọi màn hình',
      'Tốc độ tải nhanh',
    ],
  },
  {
    icon: BarChart3,
    title: 'Giải thích chi tiết',
    description: 'Phân tích từng khoản trừ. Biểu thuế lũy tiến theo bậc. Export PDF miễn phí.',
    color: 'from-orange-500 to-red-500',
    features: [
      'Breakdown từng khoản',
      'Visualization đẹp mắt',
      'Export PDF/Excel',
    ],
  },
  {
    icon: Lock,
    title: 'Bảo mật tuyệt đối',
    description: 'Không lưu dữ liệu cá nhân. Không chia sẻ với bên thứ 3. Privacy-first approach.',
    color: 'from-indigo-500 to-purple-500',
    features: [
      'Không tracking cá nhân',
      'Tính toán local',
      'GDPR compliant',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Cập nhật liên tục',
    description: 'Theo luật thuế mới nhất. Thêm tính năng mới thường xuyên. Lắng nghe feedback từ users.',
    color: 'from-yellow-500 to-orange-500',
    features: [
      'Cập nhật kịp thời',
      'Thêm features mới',
      'Support responsive',
    ],
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🏆 Tại sao chọn SalaryLens?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            6 lý do khiến chúng tôi khác biệt và được tin tưởng bởi 50,000+ người dùng
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard
                variant="strong"
                className="p-6 h-full hover:scale-105 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className={`p-4 rounded-xl bg-gradient-to-br ${reason.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <reason.icon className="h-8 w-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-white/80 leading-relaxed mb-4">
                  {reason.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {reason.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <GlassCard variant="strong" className="p-8 max-w-2xl mx-auto">
            <p className="text-xl text-white mb-4">
              <strong>Đã đủ thuyết phục chưa?</strong> 😊
            </p>
            <p className="text-white/80 mb-6">
              Tham gia 50,000+ người lao động đang tin tưởng SalaryLens
            </p>
            <a
              href="/calculator"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-purple-600 font-bold text-lg hover:bg-white/90 transition-colors"
            >
              Bắt đầu tính lương ngay
              <Sparkles className="h-5 w-5" />
            </a>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}