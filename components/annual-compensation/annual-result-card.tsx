'use client';

import { GlassCard } from '@/components/shared/glass-card';
import { AnimatedNumber } from '@/components/shared/animated-number';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, PieChart, PiggyBank } from 'lucide-react';
import type { AnnualCompensation } from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

interface AnnualResultCardProps {
  result: AnnualCompensation;
}

const COLORS = {
  salary: '#10b981',
  month13: '#3b82f6',
  kpi: '#f59e0b',
  other: '#8b5cf6',
  'Lương': '#10b981',
  'Tháng': '#3b82f6',
  'Thưởng': '#f59e0b',
  'Thưởng khác': '#8b5cf6',
  'Thưởng KPI': '#f59e0b',
  'Thưởng hiệu suất': '#ef4444',
};

export function AnnualResultCard({ result }: AnnualResultCardProps) {
  const effectiveTaxRate = ((result.totalGrossYearly - result.totalNetYearly) / result.totalGrossYearly) * 100;

  // Prepare chart data
  const chartData = result.breakdown.map((item) => ({
    name: item.label,
    gross: item.gross,
    net: item.net,
    percentage: item.percentage,
  }));

  return (
    <div className="space-y-6">
      {/* Main Summary Card */}
      <GlassCard variant="strong" className="p-6" glow>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-black" />
            <h3 className="text-lg font-semibold text-black">
              Tổng thu nhập năm
            </h3>
          </div>
          <Badge variant="secondary" className="bg-white/20">
            12 tháng + thưởng
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Gross Yearly */}
          <div className="text-center">
            <p className="text-black/70 text-sm mb-2">Tổng Gross</p>
            <div className="text-3xl font-bold text-black">
              <AnimatedNumber
                value={result.totalGrossYearly}
                formatFn={formatCurrency}
              />
            </div>
            <p className="text-black/60 text-xs mt-1">
              Trung bình: {formatCurrency(result.averageMonthlyGross)}/tháng
            </p>
          </div>

          {/* Net Yearly */}
          <div className="text-center">
            <p className="text-black/70 text-sm mb-2">Thực nhận (Net)</p>
            <div className="text-3xl font-bold text-green-400">
              <AnimatedNumber
                value={result.totalNetYearly}
                formatFn={formatCurrency}
              />
            </div>
            <p className="text-black/60 text-xs mt-1">
              Trung bình: {formatCurrency(result.averageMonthlyNet)}/tháng
            </p>
          </div>
        </div>

        {/* Tax Rate */}
        <div className="mt-6">
          <div className="flex justify-between text-black text-sm mb-2">
            <span>Tỷ lệ thuế hiệu dụng</span>
            <span>{effectiveTaxRate.toFixed(1)}%</span>
          </div>
          <Progress value={effectiveTaxRate} className="h-2" />
        </div>
      </GlassCard>

      {/* Breakdown Chart */}
      <GlassCard variant="default" className="p-6">
        <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Phân bổ thu nhập
        </h4>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="name"
              tick={{ fill: 'white', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tick={{ fill: 'white' }}
              tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
              labelStyle={{ color: 'white' }}
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                name === 'gross' ? 'Gross' : 'Net'
              ]}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-black">{value}</span>}
            />
            <Bar dataKey="gross" name="Thu nhập Gross" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => {
                // Find the correct color based on the full label name
                let color = COLORS.salary; // default color

                if (entry.name.includes('Lương tháng')) {
                  color = COLORS['Lương'];
                } else if (entry.name.includes('Tháng 13')) {
                  color = COLORS['Tháng'];
                } else if (entry.name.includes('KPI')) {
                  color = COLORS['Thưởng KPI'];
                } else if (entry.name.includes('hiệu suất')) {
                  color = COLORS['Thưởng hiệu suất'];
                } else if (entry.name.includes('khác')) {
                  color = COLORS['Thưởng khác'];
                }

                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Color Legend */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="w-full h-2 bg-green-500 rounded mb-2"></div>
            <p className="text-xs text-black/70">Lương tháng</p>
          </div>
          <div className="text-center">
            <div className="w-full h-2 bg-blue-500 rounded mb-2"></div>
            <p className="text-xs text-black/70">Tháng 13</p>
          </div>
          <div className="text-center">
            <div className="w-full h-2 bg-orange-500 rounded mb-2"></div>
            <p className="text-xs text-black/70">Thưởng KPI</p>
          </div>
          <div className="text-center">
            <div className="w-full h-2 bg-purple-500 rounded mb-2"></div>
            <p className="text-xs text-black/70">Thưởng khác</p>
          </div>
        </div>
      </GlassCard>

      {/* Detailed Breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Monthly Salary */}
        <GlassCard variant="subtle" className="p-4">
          <h5 className="text-black font-semibold mb-3">Lương tháng (12 tháng)</h5>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-black/70">Gross:</span>
              <span className="text-black">{formatCurrency(result.regularGrossYearly)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-black/70">Net:</span>
              <span className="text-green-400">{formatCurrency(result.regularNetYearly)}</span>
            </div>
          </div>
        </GlassCard>

        {/* Month 13 */}
        {result.month13.gross > 0 && (
          <GlassCard variant="subtle" className="p-4">
            <h5 className="text-black font-semibold mb-3">Tháng 13</h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-black/70">Gross:</span>
                <span className="text-black">{formatCurrency(result.month13.gross)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/70">Thuế:</span>
                <span className="text-orange-400">-{formatCurrency(result.month13.tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/70">Net:</span>
                <span className="text-green-400">{formatCurrency(result.month13.net)}</span>
              </div>
            </div>
          </GlassCard>
        )}

        {/* KPI Bonus */}
        {result.kpiBonus.gross > 0 && (
          <GlassCard variant="subtle" className="p-4">
            <h5 className="text-black font-semibold mb-3">Thưởng KPI</h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-black/70">Gross:</span>
                <span className="text-black">{formatCurrency(result.kpiBonus.gross)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/70">Thuế (10%):</span>
                <span className="text-orange-400">-{formatCurrency(result.kpiBonus.tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/70">Net:</span>
                <span className="text-green-400">{formatCurrency(result.kpiBonus.net)}</span>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Other Bonuses */}
        {result.otherBonuses.total.gross > 0 && (
          <GlassCard variant="subtle" className="p-4">
            <h5 className="text-black font-semibold mb-3">Thưởng khác</h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-black/70">Gross:</span>
                <span className="text-black">{formatCurrency(result.otherBonuses.total.gross)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/70">Thuế (10%):</span>
                <span className="text-orange-400">-{formatCurrency(result.otherBonuses.total.tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/70">Net:</span>
                <span className="text-green-400">{formatCurrency(result.otherBonuses.total.net)}</span>
              </div>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Financial Advice */}
      <GlassCard variant="default" className="p-6">
        <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <PiggyBank className="h-5 w-5" />
          Gợi ý phân tích tài chính (Quy tắc 50-30-20)
        </h4>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-green-500/10 border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-400">50% Nhu cầu thiết yếu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">
                {formatCurrency(result.financialAdvice.savings50)}
              </p>
              <p className="text-xs text-black/60 mt-1">
                {formatCurrency(result.financialAdvice.savings50 / 12)}/tháng
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-400">30% Mong muốn</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">
                {formatCurrency(result.financialAdvice.savings30)}
              </p>
              <p className="text-xs text-black/60 mt-1">
                {formatCurrency(result.financialAdvice.savings30 / 12)}/tháng
              </p>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-purple-400">20% Tiết kiệm & Đầu tư</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">
                {formatCurrency(result.financialAdvice.savings20)}
              </p>
              <p className="text-xs text-black/60 mt-1">
                {formatCurrency(result.financialAdvice.savings20 / 12)}/tháng
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
          <p className="text-sm text-blue-300">
            💡 <strong>Lời khuyên:</strong> Ưu tiên xây dựng quỹ khẩn cấp 3-6 tháng chi tiêu trước khi đầu tư.
            Cân nhắc các kênh đầu tư diversified: chứng chỉ quỹ, bất động sản, vàng...
          </p>
        </div>
      </GlassCard>
    </div>
  );
}