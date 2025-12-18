'use client';

import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils/format-currency';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GlassCard } from '@/components/shared/glass-card';
import {
  Trophy,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Heart,
  Target,
  Star
} from 'lucide-react';
import type { ComparisonResult } from '@/types/job-offer';

interface ComparisonResultsProps {
  result: ComparisonResult;
}

export function ComparisonResults({ result }: ComparisonResultsProps) {
  const { rankings, recommendation } = result;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-400';
    if (score >= 60) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1 as const,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Overall Winner */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6 border-2 border-yellow-400/30">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <div>
              <h2 className="text-2xl font-bold text-black">
                Lựa chọn tốt nhất
              </h2>
              <p className="text-black/70">
                Dựa trên phân tích toàn diện
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-subtle rounded-xl p-6">
              <h3 className="text-xl font-semibold text-black mb-2">
                {recommendation.bestOverall.companyName}
              </h3>
              <p className="text-black/80 mb-4">{recommendation.bestOverall.position}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Điểm tổng hợp</span>
                  <span className="text-black font-semibold">
                    {rankings.overall[0].score.toFixed(1)}/100
                  </span>
                </div>
                <Progress
                  value={rankings.overall[0].score}
                  className="h-2"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-black font-semibold">Điểm mạnh nổi bật:</h4>
              {recommendation.reasoning.split('\n').slice(1, 4).map((point, index) => (
                point && (
                  <p key={index} className="text-black/80 text-sm flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    {point.replace(/^- /, '')}
                  </p>
                )
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Detailed Comparison Table */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-black mb-6">
            So sánh chi tiết
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-black font-semibold p-3">Công ty</th>
                  <th className="text-center text-black font-semibold p-3">Tổng điểm</th>
                  <th className="text-center text-black font-semibold p-3">
                    <DollarSign className="h-4 w-4 inline" />
                    {' '}
                    Tài chính
                  </th>
                  <th className="text-center text-black font-semibold p-3">
                    <Heart className="h-4 w-4 inline" />
                    {' '}
                    Phúc lợi
                  </th>
                  <th className="text-center text-black font-semibold p-3">
                    <Clock className="h-4 w-4 inline" />
                    {' '}
                    WLB
                  </th>
                  <th className="text-center text-black font-semibold p-3">
                    <TrendingUp className="h-4 w-4 inline" />
                    {' '}
                    Sự nghiệp
                  </th>
                </tr>
              </thead>
              <tbody>
                {rankings.overall.map((ranking) => (
                  <tr
                    key={ranking.offer.id}
                    className={`border-b border-white/10 hover:bg-white/5 transition-colors ${
                      ranking.rank === 1 ? 'bg-yellow-400/10' : ''
                    }`}
                  >
                    <td className="p-3">
                      <div>
                        <div className="text-black font-medium flex items-center gap-2">
                          {ranking.offer.companyName}
                          {ranking.rank === 1 && (
                            <Badge className="bg-yellow-400 text-slate-900 text-xs">
                              #1
                            </Badge>
                          )}
                        </div>
                        <div className="text-black/60 text-sm">
                          {formatCurrency(ranking.offer.baseSalary, ranking.offer.currency)}/tháng
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-semibold ${getScoreColor(ranking.score)}`}>
                        {ranking.score.toFixed(1)}
                      </div>
                      <Progress
                        value={ranking.score}
                        className="h-1 mt-1"
                      />
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-semibold ${getScoreColor(ranking.breakdown.financial)}`}>
                        {ranking.breakdown.financial.toFixed(1)}
                      </div>
                      <Progress
                        value={ranking.breakdown.financial}
                        className="h-1 mt-1"
                      />
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-semibold ${getScoreColor(ranking.breakdown.benefits)}`}>
                        {ranking.breakdown.benefits.toFixed(1)}
                      </div>
                      <Progress
                        value={ranking.breakdown.benefits}
                        className="h-1 mt-1"
                      />
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-semibold ${getScoreColor(ranking.breakdown.workLifeBalance)}`}>
                        {ranking.breakdown.workLifeBalance.toFixed(1)}
                      </div>
                      <Progress
                        value={ranking.breakdown.workLifeBalance}
                        className="h-1 mt-1"
                      />
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-semibold ${getScoreColor(ranking.breakdown.career)}`}>
                        {ranking.breakdown.career.toFixed(1)}
                      </div>
                      <Progress
                        value={ranking.breakdown.career}
                        className="h-1 mt-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>

      {/* Category Winners */}
      <motion.div variants={itemVariants}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CategoryWinnerCard
            title="Thu nhập tốt nhất"
            icon={<DollarSign className="h-5 w-5" />}
            winner={rankings.byCategory.compensation[0]}
            color="green"
          />
          <CategoryWinnerCard
            title="Phúc lợi tốt nhất"
            icon={<Heart className="h-5 w-5" />}
            winner={rankings.byCategory.benefits[0]}
            color="blue"
          />
          <CategoryWinnerCard
            title="Work-Life Balance"
            icon={<Clock className="h-5 w-5" />}
            winner={rankings.byCategory.workLifeBalance[0]}
            color="purple"
          />
          <CategoryWinnerCard
            title="Phát triển sự nghiệp"
            icon={<TrendingUp className="h-5 w-5" />}
            winner={rankings.byCategory.growth[0]}
            color="orange"
          />
        </div>
      </motion.div>

      {/* Alternatives */}
      {recommendation.alternatives.length > 0 && (
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-black mb-4">
              Các lựa chọn thay thế đáng cân nhắc
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendation.alternatives.map((alt, index) => (
                <div key={alt.id} className="glass-subtle rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-black font-medium">{alt.companyName}</h4>
                    <Badge variant="outline" className="bg-white/10 text-black">
                      #{rankings.overall.find(r => r.offer.id === alt.id)?.rank}
                    </Badge>
                  </div>
                  <p className="text-black/60 text-sm mb-2">{alt.position}</p>
                  <div className="flex items-center gap-4 text-sm text-black/70">
                    <span>{formatCurrency(alt.baseSalary, alt.currency)}/tháng</span>
                    <span>{alt.workLife.remote.daysPerWeek} ngày remote</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}
    </motion.div>
  );
}

interface CategoryWinnerCardProps {
  title: string;
  icon: React.ReactNode;
  winner: any;
  color: string;
}

function CategoryWinnerCard({ title, icon, winner, color }: CategoryWinnerCardProps) {
  const colorClasses = {
    green: 'from-green-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
  };

  return (
    <GlassCard className={`p-4 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]}/20`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-black/80">{icon}</div>
        <h4 className="text-black font-semibold">{title}</h4>
      </div>
      <div>
        <p className="text-black font-medium">{winner.offer.companyName}</p>
        <p className="text-black/70 text-sm">{winner.score.toFixed(1)} điểm</p>
      </div>
    </GlassCard>
  );
}