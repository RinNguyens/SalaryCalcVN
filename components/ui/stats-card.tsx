'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { MiniSparkline } from '@/components/ui/mini-sparkline';
import { MiniDonut } from '@/components/ui/mini-donut';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
  sparkline?: number[];
  donut?: number[];
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatsCard({
  icon,
  value,
  suffix = '',
  label,
  delay = 0,
  sparkline,
  donut,
  trend,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="h-full"
    >
      <GlassCard variant="default" className="p-6 text-center h-full">
        <div className="text-purple-400 mb-3 flex justify-center">
          <div className="p-3 rounded-lg bg-white/10">
            {icon}
          </div>
        </div>

        <div className="text-3xl font-bold text-black mb-2">
          <AnimatedCounter end={value} suffix={suffix} />
        </div>

        <div className="text-sm text-black/60 mb-4">{label}</div>

        {trend && (
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            trend.positive
              ? 'bg-green-500/20 text-green-400 border border-green-400/30'
              : 'bg-red-500/20 text-red-400 border border-red-400/30'
          }`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </div>
        )}

        {/* Mini Chart */}
        {sparkline && (
          <div className="mt-4 h-12">
            <MiniSparkline data={sparkline} color={trend?.positive ? '#10b981' : '#ef4444'} />
          </div>
        )}

        {/* Mini Donut */}
        {donut && (
          <div className="mt-4">
            <MiniDonut data={donut} colors={['#8b5cf6', '#ec4899']} />
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}