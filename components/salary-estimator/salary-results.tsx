'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GlassCard } from '@/components/shared/glass-card';
import {
  DollarSign,
  TrendingUp,
  Target,
  Award,
  BookOpen,
  Lightbulb,
  Briefcase,
  Download,
  Share2,
  ArrowRight
} from 'lucide-react';
import { formatCurrency, formatFullCurrency } from '@/lib/utils/format-currency';
import type { SalaryEstimate, SalaryEstimateRequest } from '@/types/salary-estimator';

interface SalaryResultsProps {
  estimate: SalaryEstimate;
  formData: Partial<SalaryEstimateRequest>;
}

export function SalaryResults({ estimate, formData }: SalaryResultsProps) {
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

  const getMarketPositionColor = (category: string) => {
    switch (category) {
      case 'top_quartile': return 'text-green-400';
      case 'above_average': return 'text-blue-400';
      case 'average': return 'text-yellow-400';
      case 'below_average': return 'text-red-400';
      default: return 'text-black';
    }
  };

  const getMarketPositionLabel = (category: string) => {
    switch (category) {
      case 'top_quartile': return 'Top 25%';
      case 'above_average': return 'Trên trung bình';
      case 'average': return 'Trung bình';
      case 'below_average': return 'Dưới trung bình';
      default: return category;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Main Salary Card */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">
              Lương ước tính của bạn
            </h2>
            <p className="text-black/70">
              Dựa trên kỹ năng, kinh nghiệm và thị trường hiện tại
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-black/60 mb-2">Lương cơ bản (hàng tháng)</p>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-yellow-300">
                  {formatCurrency(estimate.baseSalary.median)}
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="text-black/70">
                    Min: {formatCurrency(estimate.baseSalary.min)}
                  </span>
                  <span className="text-black/70">
                    Max: {formatCurrency(estimate.baseSalary.max)}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-black/60 mb-2">Tổng thu nhập (hàng tháng)</p>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-green-400">
                  {formatCurrency(estimate.totalCompensation.median)}
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="text-black/70">
                    Min: {formatCurrency(estimate.totalCompensation.min)}
                  </span>
                  <span className="text-black/70">
                    Max: {formatCurrency(estimate.totalCompensation.max)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-black/60">Độ tin cậy</span>
              <span className="text-black font-semibold">{estimate.baseSalary.confidence}%</span>
            </div>
            <Progress value={estimate.baseSalary.confidence} className="h-2" />
          </div>
        </GlassCard>
      </motion.div>

      {/* Market Position */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Vị trí trên thị trường
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-black/60 text-sm mb-2">Phân vị</p>
                <p className={`text-3xl font-bold ${getMarketPositionColor(estimate.marketPosition.category)}`}>
                  {estimate.marketPosition.percentile}%
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-black/60 text-sm mb-2">So sánh</p>
                <p className="text-lg font-semibold text-black">
                  {estimate.marketPosition.comparison}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-black/60 text-sm mb-2">Xếp hạng</p>
                <Badge className={getMarketPositionColor(estimate.marketPosition.category)}>
                  {getMarketPositionLabel(estimate.marketPosition.category)}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </GlassCard>
      </motion.div>

      {/* Compensation Breakdown */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Phân tích tổng thu nhập
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Lương cơ bản', value: estimate.breakdown.baseSalary, color: 'bg-blue-400' },
              { label: 'Thưởng', value: estimate.breakdown.bonus, color: 'bg-green-400' },
              { label: 'Cổ phiếu/ESOP', value: estimate.breakdown.equity, color: 'bg-purple-400' },
              { label: 'Phúc lợi', value: estimate.breakdown.benefits, color: 'bg-yellow-400' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-black/60">{item.label}</span>
                  <span className="text-black font-semibold">
                    {formatCurrency(item.value)}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${item.color}`}
                    style={{
                      width: `${(item.value / estimate.breakdown.baseSalary) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Skills Analysis */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Phân tích kỹ năng
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-black font-medium mb-3">Kỹ năng high-demand</h4>
              <div className="space-y-2">
                {estimate.skills.highDemand.length > 0 ? (
                  estimate.skills.highDemand.map((skill, index) => (
                    <Badge key={index} className="bg-green-500/20 text-green-600 border-green-500/30">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-black/60 text-sm">Không có kỹ năng high-demand</p>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-black font-medium mb-3">Cần cải thiện</h4>
              <div className="space-y-3">
                {estimate.skills.improvement.length > 0 ? (
                  estimate.skills.improvement.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-black/80">{skill.skill}</span>
                      <span className="text-green-400 text-sm">
                        +{skill.potentialIncrease}%
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-black/60 text-sm">Tuyệt vời! Không có đề xuất cải thiện</p>
                )}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Career Path */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
                Lộ trình sự nghiệp
          </h3>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-black font-semibold text-lg">{estimate.careerPath.nextRole}</h4>
                  <p className="text-black/60">Thời gian dự kiến: {estimate.careerPath.timeframe}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">
                    +{estimate.careerPath.salaryIncrease}%
                  </p>
                  <p className="text-black/60 text-sm">tăng lương</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </GlassCard>
      </motion.div>

      {/* Negotiation Tips */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Mẹo đàm phán lương
          </h3>
          <div className="space-y-3">
            {estimate.negotiationTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-black/80">{tip}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Actions */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          <Download className="h-4 w-4" />
          Tải PDF
        </Button>
        <Button
          variant="outline"
          className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20"
        >
          <Share2 className="h-4 w-4" />
          Chia sẻ kết quả
        </Button>
        <Button
          variant="outline"
          className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20"
          onClick={() => window.location.reload()}
        >
          <ArrowRight className="h-4 w-4" />
          Ước tính lại
        </Button>
      </motion.div>
    </motion.div>
  );
}