'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { PastelGlassCard } from '@/components/ui/pastel-glass-card';

export function ContactHero() {
  const stats = [
    { icon: MessageCircle, label: 'Phản hồi trong', value: '24h' },
    { icon: Mail, label: 'Email hỗ trợ', value: '100+' },
    { icon: Phone, label: 'Tỷ lệ hài lòng', value: '98%' },
  ];

  return (
    <section className="relative text-dark-text overflow-hidden py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <PastelGlassCard className="px-4 py-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-slate-600">Luôn sẵn sàng hỗ trợ bạn</span>
              </div>
            </PastelGlassCard>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-chart-purple via-chart-blue to-chart-pink bg-clip-text text-transparent"
          >
            Liên Hệ Với Chúng Tôi
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-700 mb-12"
          >
            Có câu hỏi, góp ý hoặc cần hỗ trợ? Chúng tôi luôn sẵn sàng lắng nghe!
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <PastelGlassCard key={index} glow="blue" className="p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-indigo-600" />
                <div className="text-3xl font-bold mb-1 text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </PastelGlassCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
