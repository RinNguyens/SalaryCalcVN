'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/shared/glass-card';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Lightbulb
} from 'lucide-react';
import type { ComparisonResult, UserPriorities } from '@/types/job-offer';

interface ComparisonInsightsProps {
  result: ComparisonResult;
  priorities: UserPriorities;
  onPrioritiesChange: (priorities: UserPriorities) => void;
}

export function ComparisonInsights({ result, priorities, onPrioritiesChange }: ComparisonInsightsProps) {
  const insights = result.insights;

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

  const handlePriorityChange = (key: keyof UserPriorities, value: number[]) => {
    onPrioritiesChange({
      ...priorities,
      [key]: value[0],
    });
  };

  const getPriorityLabel = (key: keyof UserPriorities) => {
    const labels = {
      salary: 'Lương',
      bonuses: 'Thưởng',
      benefits: 'Phúc lợi',
      workLifeBalance: 'Work-Life Balance',
      career: 'Sự nghiệp',
      commute: 'Di chuyển',
    };
    return labels[key];
  };

  const getPriorityIcon = (key: keyof UserPriorities) => {
    const icons = {
      salary: '💰',
      bonuses: '🎁',
      benefits: '🏥',
      workLifeBalance: '⚖️',
      career: '📈',
      commute: '🚗',
    };
    return icons[key];
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Priority Settings */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-black mb-6">
            Điều chỉnh ưu tiên của bạn
          </h3>
          <p className="text-black/70 mb-6">
            Thay đổi trọng số để xem kết quả phù hợp hơn với nhu cầu của bạn
          </p>

          <div className="space-y-6">
            {Object.entries(priorities).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-black flex items-center gap-2">
                    <span className="text-xl">{getPriorityIcon(key as keyof UserPriorities)}</span>
                    {getPriorityLabel(key as keyof UserPriorities)}
                  </Label>
                  <Badge variant="outline" className="bg-white/10 text-black">
                    {value}/10
                  </Badge>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={(newValue) => handlePriorityChange(key as keyof UserPriorities, newValue)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 glass-subtle rounded-xl">
            <p className="text-black/70 text-sm">
              💡 Mẹo: Đặt mức độ ưu tiên cao hơn cho những yếu tố quan trọng nhất với bạn lúc này.
              Ví dụ: Nếu bạn có gia đình, work-life balance có thể quan trọng hơn lương.
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Key Insights */}
      {insights.length > 0 && (
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-black mb-6 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              Insights quan trọng
            </h3>

            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl flex items-start gap-3 ${
                    insight.includes('cao hơn') || insight.includes('tốt nhất')
                      ? 'bg-green-500/20 border border-green-500/30'
                      : insight.includes('trung bình')
                      ? 'bg-blue-500/20 border border-blue-500/30'
                      : 'glass-subtle'
                  }`}
                >
                  {insight.includes('cao hơn') || insight.includes('tốt nhất') ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : insight.includes('Ưu tiên') ? (
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  ) : (
                    <Target className="h-5 w-5 text-blue-400 mt-0.5" />
                  )}
                  <p className="text-black/90">{insight}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Score Breakdown */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-black mb-6">
            Phân tích điểm số
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {result.rankings.overall.map((ranking: any) => (
              <div key={ranking.offer.id} className="glass-subtle rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-black font-medium">{ranking.offer.companyName}</h4>
                  <Badge className={ranking.rank === 1 ? 'bg-yellow-400 text-slate-900' : 'bg-white/10 text-black'}>
                    #{ranking.rank}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <ScoreBar
                    label="Tài chính"
                    score={ranking.breakdown.financial}
                    color="green"
                  />
                  <ScoreBar
                    label="Phúc lợi"
                    score={ranking.breakdown.benefits}
                    color="blue"
                  />
                  <ScoreBar
                    label="WLB"
                    score={ranking.breakdown.workLifeBalance}
                    color="purple"
                  />
                  <ScoreBar
                    label="Sự nghiệp"
                    score={ranking.breakdown.career}
                    color="orange"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Recommendation Summary */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-yellow-400" />
            <h3 className="text-xl font-semibold text-black">
              Lời khuyên cuối cùng
            </h3>
          </div>

          <div className="prose prose-invert max-w-none">
            {result.recommendation.reasoning.split('\n').map((paragraph, index) => (
              paragraph && (
                <p key={index} className="text-black/90 mb-2">
                  {paragraph}
                </p>
              )
            ))}
          </div>

          <div className="mt-6 p-4 glass-subtle rounded-xl">
            <p className="text-black/70 text-sm">
              📝 Lưu ý: Đây chỉ là phân tích dựa trên số liệu. Hãy xem xét các yếu tố khác như văn hóa công ty,
              cơ hội học hỏi, và định hướng phát triển cá nhân trước khi ra quyết định cuối cùng.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

interface ScoreBarProps {
  label: string;
  score: number;
  color: string;
}

function ScoreBar({ label, score, color }: ScoreBarProps) {
  const colorClasses = {
    green: 'bg-green-400',
    blue: 'bg-blue-400',
    purple: 'bg-purple-400',
    orange: 'bg-orange-400',
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-black/70">{label}</span>
        <span className="text-black font-medium">{score.toFixed(1)}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${colorClasses[color as keyof typeof colorClasses]}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}