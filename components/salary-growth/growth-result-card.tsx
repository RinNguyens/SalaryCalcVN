'use client';

import { GlassCard } from '@/components/shared/glass-card';
import { AnimatedNumber } from '@/components/shared/animated-number';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Calendar, Award, Target } from 'lucide-react';
import type { SalaryGrowthProjection } from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';
import { getInsightColor, getInsightBgColor } from '@/lib/insights/salary-insights';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface GrowthResultCardProps {
  projection: SalaryGrowthProjection;
}

export function GrowthResultCard({ projection }: GrowthResultCardProps) {
  const { currentYear, projections, totalGrowth, averageAnnualGrowth, insights } = projection;

  // Prepare chart data
  const chartData = [currentYear, ...projections].map((year) => ({
    year: year.year,
    gross: year.gross,
    net: year.net,
    age: year.age,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 p-3 rounded-lg border border-white/20">
          <p className="text-white font-semibold">{`Năm ${label}`}</p>
          {data.age && <p className="text-white/70 text-sm">{`Tuổi: ${data.age}`}</p>}
          <p className="text-green-400">{`Gross: ${formatCurrency(data.gross)}`}</p>
          <p className="text-blue-400">{`Net: ${formatCurrency(data.net)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Current vs Final */}
        <GlassCard variant="strong" className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-white" />
            <h4 className="text-white font-semibold">Dự báo {projections.length} năm</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Hiện tại:</span>
              <span className="text-white">{formatCurrency(currentYear.gross)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Tương lai:</span>
              <span className="text-green-400">
                {formatCurrency(projections[projections.length - 1].gross)}
              </span>
            </div>
            <div className="pt-2 border-t border-white/20">
              <div className="flex justify-between">
                <span className="text-white/70">Tăng trưởng:</span>
                <Badge className={totalGrowth.percentage > 50 ? 'bg-green-500/20' : 'bg-blue-500/20'}>
                  +{totalGrowth.percentage.toFixed(0)}%
                </Badge>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Total Growth */}
        <GlassCard variant="default" className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <h4 className="text-white font-semibold">Tăng trưởng tổng</h4>
          </div>
          <div className="text-center py-2">
            <p className="text-2xl font-bold text-green-400">
              +{formatCurrency(totalGrowth.gross)}
            </p>
            <p className="text-white/60 text-sm mt-1">
              Gross hàng tháng
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg text-blue-400">
              +{formatCurrency(totalGrowth.net)}
            </p>
            <p className="text-white/60 text-sm">
              Net hàng tháng
            </p>
          </div>
        </GlassCard>

        {/* Average Annual Growth */}
        <GlassCard variant="default" className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-blue-400" />
            <h4 className="text-white font-semibold">Trung bình/năm</h4>
          </div>
          <div className="text-center py-2">
            <p className="text-2xl font-bold text-white">
              {averageAnnualGrowth.percentage}%
            </p>
            <p className="text-white/60 text-sm mt-1">
              Tăng trưởng hàng năm
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg text-green-400">
              +{formatCurrency(averageAnnualGrowth.net)}
            </p>
            <p className="text-white/60 text-sm">
              Thêm Net/năm
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Growth Chart */}
      <GlassCard variant="strong" className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Biểu đồ tăng trưởng lương</h4>

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="year"
              tick={{ fill: 'white', fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: 'white' }}
              tickFormatter={(value) => `${value / 1000000}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ color: 'white' }}
            />
            <Area
              type="monotone"
              dataKey="gross"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorGross)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="net"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorNet)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Year-by-Year Breakdown */}
      <GlassCard variant="default" className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Chi tiết theo năm</h4>

        <div className="space-y-3">
          {[currentYear, ...projections].map((year, index) => (
            <Card key={year.year} className={`glass-subtle ${index === 0 ? 'border-white/30' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={index === 0 ? "default" : "secondary"}
                      className={index === 0 ? "bg-white/20" : "bg-white/10"}
                    >
                      {index === 0 ? 'Hiện tại' : `Năm ${index}`}
                    </Badge>
                    <span className="text-white font-mono">{year.year}</span>
                    {year.age && (
                      <span className="text-white/60 text-sm">(Tuổi: {year.age})</span>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-white">
                      {formatCurrency(year.gross)}
                      <span className="text-green-400 ml-2">
                        {index > 0 && `+${(projections[index - 1].raise || 0)}%`}
                      </span>
                    </div>
                    <div className="text-blue-400 text-sm">{formatCurrency(year.net)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </GlassCard>

      {/* Insights */}
      {insights.length > 0 && (
        <GlassCard variant="default" className="p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Gợi ý & Đánh giá
          </h4>

          <div className="space-y-3">
            {insights.map((insight, index) => (
              <Card
                key={index}
                className={`border ${getInsightBgColor(insight.type)}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{insight.icon}</span>
                    <div className="flex-1">
                      <h5 className={`font-semibold ${getInsightColor(insight.type)}`}>
                        {insight.title}
                      </h5>
                      <p className="text-white/80 text-sm mt-1">{insight.description}</p>
                      {insight.recommendation && (
                        <p className="text-white/70 text-xs mt-2 italic">
                          💡 {insight.recommendation}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Career Advice */}
      <GlassCard variant="subtle" className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Lời khuyên phát triển sự nghiệp</h4>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <h5 className="text-blue-400 font-semibold mb-2">Ngắn hạn (1-2 năm)</h5>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Nâng cao kỹ năng chuyên môn</li>
                <li>• Lấy chứng chỉ chuyên ngành liên quan</li>
                <li>• Xây dựng mạng lưới quan hệ</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="p-4">
              <h5 className="text-purple-400 font-semibold mb-2">Dài hạn (3-5 năm)</h5>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Phát triển kỹ năng quản lý</li>
                <li>• Cân nhắc chuyển ngành/địa điểm</li>
                <li>• Xây dựng thương hiệu cá nhân</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg">
          <p className="text-yellow-300 text-sm">
            🎯 <strong>Mục tiêu:</strong> Để đạt được tăng trưởng 10%+/năm, tập trung vào:
            kỹ năng hiếm, vị trí quản lý, hoặc chuyển sang công ty/lĩnh vực có mức lương cao hơn.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}