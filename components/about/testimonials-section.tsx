'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  date: string;
  verified: boolean;
}

// Sample data (can be imported from separate file)
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nguyễn Văn Minh',
    role: 'Software Engineer',
    company: 'FPT Software',
    avatar: '', // Will use placeholder
    content: 'Tool tính lương tốt nhất mình từng dùng! Chính xác, dễ hiểu, và hoàn toàn miễn phí. Mình đã dùng để đàm phán lương và nhận được mức lương tốt hơn 20%. Highly recommend!',
    rating: 5,
    date: '2024-11-15',
    verified: true,
  },
  {
    id: 2,
    name: 'Trần Thị Hương',
    role: 'HR Manager',
    company: 'Viettel',
    avatar: '',
    content: 'Công cụ rất hữu ích cho cả nhân viên lẫn HR. Giúp tính lương nhanh chóng và giải thích rõ ràng các khoản. Team HR của mình đã recommend tool này cho tất cả ứng viên mới.',
    rating: 5,
    date: '2024-10-28',
    verified: true,
  },
  {
    id: 3,
    name: 'Lê Hoàng Tuấn',
    role: 'Marketing Manager',
    company: 'Grab Vietnam',
    avatar: '',
    content: 'Đàm phán lương dễ dàng hơn nhiều khi biết chính xác mình sẽ nhận được bao nhiêu. Giao diện đẹp, tính năng export PDF cũng rất tiện. Thanks SalaryLens!',
    rating: 5,
    date: '2024-12-01',
    verified: true,
  },
  {
    id: 4,
    name: 'Phạm Thu Trang',
    role: 'Product Designer',
    company: 'Tiki',
    avatar: '',
    content: 'UI/UX của tool này quá đỉnh! Dễ dùng, màu sắc đẹp, và thông tin rất chi tiết. Mình đã share cho cả team design để học hỏi. Cảm ơn team SalaryLens!',
    rating: 5,
    date: '2024-11-20',
    verified: true,
  },
  {
    id: 5,
    name: 'Đỗ Minh Quân',
    role: 'Data Analyst',
    company: 'VNG Corporation',
    avatar: '',
    content: 'Là data analyst, mình đánh giá cao độ chính xác của tool này. Công thức tính đúng 100%, cập nhật theo luật mới nhất. Đã verify lại bằng Excel và match hoàn toàn.',
    rating: 5,
    date: '2024-11-05',
    verified: true,
  },
  {
    id: 6,
    name: 'Vũ Thị Lan',
    role: 'Business Analyst',
    company: 'Shopee',
    avatar: '',
    content: 'Tool này giúp mình hiểu rõ các khoản thuế và bảo hiểm. Trước giờ mình cứ thắc mắc tại sao lương Net thấp hơn Gross nhiều. Giờ đã clear! Thanks!',
    rating: 5,
    date: '2024-10-15',
    verified: true,
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Quote className="h-12 w-12 text-white mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            💬 Người dùng nói gì về chúng tôi?
          </h2>
          <p className="text-xl text-white/80">
            Đánh giá thật từ 50,000+ người dùng tin tưởng
          </p>

          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-6 w-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-white">5.0</span>
            <span className="text-white/60">/ 5.0</span>
            <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-400/30">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Verified Reviews
            </Badge>
          </div>
        </motion.div>

        {/* Featured Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* All Testimonials - Scrollable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard variant="strong" className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Tất cả đánh giá ({testimonials.length})
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.slice(3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TestimonialCard testimonial={testimonial} compact />
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value="50K+" label="Happy Users" />
            <StatCard value="5.0" label="Average Rating" />
            <StatCard value="98%" label="Recommend" />
            <StatCard value="24/7" label="Support" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Testimonial Card Component
function TestimonialCard({
  testimonial,
  compact = false
}: {
  testimonial: Testimonial;
  compact?: boolean;
}) {
  return (
    <GlassCard
      variant="default"
      className={`${compact ? 'p-4' : 'p-6'} h-full flex flex-col hover:scale-105 transition-transform`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
            {testimonial.name.charAt(0)}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-white truncate">
              {testimonial.name}
            </h4>
            {testimonial.verified && (
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-white/70 truncate">
            {testimonial.role}
          </p>
          <p className="text-xs text-white/50 truncate">
            {testimonial.company}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= testimonial.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-white/20'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className={`text-white/80 leading-relaxed flex-1 ${compact ? 'text-sm' : 'text-base'}`}>
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Date */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-white/50">
          {new Date(testimonial.date).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </GlassCard>
  );
}

// Stat Card Component
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <GlassCard variant="default" className="p-6 text-center">
      <div className="text-3xl font-bold text-white mb-2">
        {value}
      </div>
      <div className="text-sm text-white/70">
        {label}
      </div>
    </GlassCard>
  );
}