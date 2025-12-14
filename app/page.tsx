'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FeaturesSection } from '@/components/landing/features-section';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { LayoutTextFlip } from '@/components/ui/layout-text-flip';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { BackgroundElements } from '@/components/ui/background-elements';
import { StatsCard } from '@/components/ui/stats-card';
import { UserAvatars } from '@/components/ui/user-avatars';
import {
  ArrowRight,
  Play,
  Star,
  Users,
  Calculator,
  Clock,
  TrendingUp,
  Activity,
  Sparkles
} from 'lucide-react';

export default function Home() {
  // Real user avatars data - using reliable avatar service
  const userReviews = [
    { name: 'Minh Anh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minh-anh&backgroundColor=b6e3f4' },
    { name: 'Hoàng Nam', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hoang-nam&backgroundColor=c0aede' },
    { name: 'Thúy Vy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thuy-vy&backgroundColor=d1d4f9' },
    { name: 'Quốc Bảo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=quoc-bao&backgroundColor=ffd5dc' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
        {/* Background Elements */}
        <BackgroundElements />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-white/10 backdrop-blur-md border border-white/20 mb-6
                       text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">
              #1 Công cụ tính lương tại Việt Nam
            </span>
          </motion.div>

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              Công cụ tính lương{' '}
              <LayoutTextFlip
                words={['miễn phí', 'chính xác', 'nhanh chóng', 'dễ dàng']}
                interval={2000}
                className="inline-block"
                textClassName="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
              />
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Chính xác nhất cho người lao động Việt Nam
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                className="
                  bg-gradient-to-r from-purple-600 to-pink-600
                  hover:from-purple-700 hover:to-pink-700
                  text-white font-bold text-lg
                  px-10 py-6
                  shadow-2xl hover:shadow-purple-500/50
                  group
                  transform hover:scale-105 transition-all duration-300
                "
                asChild
              >
                <Link href="/calculator">
                  🚀 Bắt đầu tính toán
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
                  border-2 border-white/30
                  hover:bg-white/10
                  font-semibold text-lg
                  px-10 py-6
                  transform hover:scale-105 transition-all duration-300
                "
                asChild
              >
                <Link href="/calculator?demo=true">
                  <Play className="mr-2 h-5 w-5" />
                  Xem demo
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <StatsCard
              icon={<Users className="h-6 w-6" />}
              value={50000}
              suffix="+"
              label="Người dùng"
              delay={0.3}
              trend={{ value: "12.5%", positive: true }}
              sparkline={[45, 48, 50, 47, 50, 52, 50]}
            />
            <StatsCard
              icon={<Calculator className="h-6 w-6" />}
              value={250000}
              suffix="+"
              label="Lần tính toán"
              delay={0.4}
              trend={{ value: "23.1%", positive: true }}
              sparkline={[80, 85, 82, 88, 86, 90, 89.3]}
            />
            <StatsCard
              icon={<Clock className="h-6 w-6" />}
              value={99.9}
              suffix="%"
              label="Chính xác"
              delay={0.5}
              donut={[99.9, 0.1]}
            />
          </div>

          {/* Additional Info Bar */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <UserAvatars users={userReviews} count={2500} />
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-400" />
              <span>Live updates</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-yellow-400" />
              <span>#1 Vietnam</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Additional sections can be added here */}
    </div>
  );
}
