'use client';

import { GlassCard } from '@/components/shared/glass-card';
import { AnimatedNumber } from '@/components/shared/animated-number';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  TrendingUp,
  PieChart,
  PiggyBank,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Target,
  DollarSign,
  Award,
  Calculator,
  RefreshCw,
  BadgeDollarSign
} from 'lucide-react';
import type { EnhancedAnnualCompensation } from '@/lib/calculations/enhanced-annual-compensation';
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
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';

interface EnhancedAnnualResultCardProps {
  result: EnhancedAnnualCompensation;
}

const COLORS = {
  salary: '#10b981',
  month13: '#3b82f6',
  tet: '#ef4444',
  kpi: '#f59e0b',
  quarterly: '#8b5cf6',
  project: '#06b6d4',
  commission: '#f97316',
  tax: '#dc2626',
  net: '#059669',
};

export function EnhancedAnnualResultCard({ result }: EnhancedAnnualResultCardProps) {
  const effectiveTaxRate = ((result.totalGrossYearly - result.totalNetYearly) / result.totalGrossYearly) * 100;

  // Prepare monthly chart data
  const monthlyChartData = result.monthlyBreakdown.map(month => ({
    month: `T${month.month}`,
    gross: month.gross / 1000000, // Convert to millions
    net: month.net / 1000000,
    tax: month.tax / 1000000,
    taxBracket: month.taxBracket,
  }));

  // Prepare tax optimization chart data
  const taxOptimizationData = [
    { name: 'Chiến lược hiện tại', tax: result.monthlyBreakdown.reduce((sum, m) => sum + m.tax, 0) / 1000000 },
    ...result.taxOptimization.alternativeStrategies.map(s => ({
      name: s.name,
      tax: s.totalTax / 1000000,
      savings: s.savings / 1000000,
    })),
  ];

  return (
    <div className="space-y-6">
      {/* Main Summary Card */}
      <GlassCard variant="strong" className="p-6" glow>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-black" />
            <h3 className="text-lg font-semibold text-black">
              Phân Tích Thu Nhập Năm 2026
            </h3>
          </div>
          <Badge variant="secondary" className="bg-white/20">
            {result.taxOptimization.currentStrategy}
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Gross Yearly */}
          <div className="text-center">
            <p className="text-black/70 text-sm mb-2">Tổng Gross Năm</p>
            <div className="text-3xl font-bold text-black">
              <AnimatedNumber
                value={result.totalGrossYearly}
                formatFn={formatCurrency}
              />
            </div>
            <p className="text-black/60 text-xs mt-1">
              TB: {formatCurrency(result.averageMonthlyGross)}/tháng
            </p>
          </div>

          {/* Net Yearly */}
          <div className="text-center">
            <p className="text-black/70 text-sm mb-2">Thực Nhận (Net)</p>
            <div className="text-3xl font-bold text-green-600">
              <AnimatedNumber
                value={result.totalNetYearly}
                formatFn={formatCurrency}
              />
            </div>
            <p className="text-black/60 text-xs mt-1">
              TB: {formatCurrency(result.averageMonthlyNet)}/tháng
            </p>
          </div>

          {/* Total Tax */}
          <div className="text-center">
            <p className="text-black/70 text-sm mb-2">Tổng Thuế Năm</p>
            <div className="text-3xl font-bold text-red-600">
              <AnimatedNumber
                value={result.totalTaxYearly}
                formatFn={formatCurrency}
              />
            </div>
            <p className="text-black/60 text-xs mt-1">
              Tỷ lệ: {effectiveTaxRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
          <TabsTrigger value="monthly">Theo Tháng</TabsTrigger>
          <TabsTrigger value="tax">Thuế & Tối Ưu</TabsTrigger>
          <TabsTrigger value="reconciliation">Quyết Toán</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Income Breakdown */}
            <GlassCard variant="default" className="p-6">
              <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Phân Bổ Thu Nhập
              </h4>

              <ResponsiveContainer width="100%" aspect={2}>
                <BarChart
                  data={result.breakdown}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: 'black', fontSize: 11 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis
                    tick={{ fill: 'black' }}
                    tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'black' }}
                    formatter={(value: number | undefined) => [formatCurrency(value || 0), 'VND']}
                  />
                  <Bar dataKey="gross" radius={[8, 8, 0, 0]}>
                    {result.breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Bonus Legend */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {result.breakdown.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: Object.values(COLORS)[index % Object.values(COLORS).length] }}
                    ></div>
                    <span className="text-black/70">{item.label}</span>
                    <span className="font-semibold text-black">
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Tax Efficiency Score */}
            <GlassCard variant="default" className="p-6">
              <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Hiệu Suất Thuế
              </h4>

              <div className="space-y-4">
                {/* Tax Rate Meter */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-black/70">Tỷ lệ thuế hiệu dụng</span>
                    <span className="font-semibold">{effectiveTaxRate.toFixed(1)}%</span>
                  </div>
                  <Progress
                    value={effectiveTaxRate}
                    className={`h-3 ${
                      effectiveTaxRate < 10 ? '[&>div]:bg-green-500' :
                      effectiveTaxRate < 15 ? '[&>div]:bg-yellow-500' :
                      effectiveTaxRate < 20 ? '[&>div]:bg-orange-500' :
                      '[&>div]:bg-red-500'
                    }`}
                  />
                </div>

                {/* Tax Efficiency Analysis */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Phân Tích Hiệu Suất</span>
                  </div>
                  <p className="text-xs text-blue-800">
                    {effectiveTaxRate < 10 && 'Tỷ lệ thuế rất thấp, bạn đang tận dụng tối đa các khoản giảm trừ'}
                    {effectiveTaxRate >= 10 && effectiveTaxRate < 15 && 'Tỷ lệ thuế thấp, tối ưu cho mức thu nhập của bạn'}
                    {effectiveTaxRate >= 15 && effectiveTaxRate < 20 && 'Tỷ lệ thuế hợp lý, phù hợp với mức thu nhập trung bình'}
                    {effectiveTaxRate >= 20 && 'Tỷ lệ thuế cao, cân nhắc các khoản giảm trừ thuế có thể'}
                  </p>
                </div>

                {/* Monthly vs Yearly Tax Rate */}
                <Card className="p-3">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-black/60">Thuế hàng tháng</p>
                      <p className="text-sm font-semibold">
                        {result.yearEndReconciliation.monthlyVsYearly.monthlyTaxRate.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-black/60">Thuế theo năm</p>
                      <p className="text-sm font-semibold">
                        {result.yearEndReconciliation.monthlyVsYearly.yearlyTaxRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </GlassCard>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <BadgeDollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-black">
                {formatCurrency(result.totalNetYearly / 12)}
              </p>
              <p className="text-xs text-black/60">Net trung bình/tháng</p>
            </Card>

            <Card className="p-4 text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-black">
                {result.breakdown.length - 1}
              </p>
              <p className="text-xs text-black/60">Loại thưởng đã nhận</p>
            </Card>

            <Card className="p-4 text-center">
              <Calculator className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-black">
                {Math.max(...result.monthlyBreakdown.map(m => m.taxBracket))}
              </p>
              <p className="text-xs text-black/60">Bậc thuế cao nhất</p>
            </Card>

            <Card className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-black">
                {((result.totalNetYearly - result.regularNetYearly) / result.regularNetYearly * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-black/60">Tăng thu nhập từ thưởng</p>
            </Card>
          </div>
        </TabsContent>

        {/* Monthly Breakdown Tab */}
        <TabsContent value="monthly" className="space-y-6">
          <GlassCard variant="default" className="p-6">
            <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Chi Tiết Theo Tháng
            </h4>

            <ResponsiveContainer width="100%" aspect={2}>
              <AreaChart
                data={monthlyChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" tick={{ fill: 'black' }} />
                <YAxis
                  tick={{ fill: 'black' }}
                  tickFormatter={(value) => `${value}M`}
                />
                <Tooltip
                  contentStyle={{
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'black' }}
                  formatter={(value: number | undefined, name: string | undefined) => [
                    formatCurrency((value || 0) * 1000000),
                    name === 'Thu nhập Gross' ? 'Thu nhập Gross' : (name === 'Thực nhận' ? 'Thực nhận' : 'Thuế')
                  ]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="gross"
                  stackId="1"
                  stroke={COLORS.salary}
                  fill={COLORS.salary}
                  fillOpacity={0.6}
                  name="Thu nhập Gross"
                />
                <Area
                  type="monotone"
                  dataKey="tax"
                  stackId="2"
                  stroke={COLORS.tax}
                  fill={COLORS.tax}
                  fillOpacity={0.8}
                  name="Thuế"
                />
                <Area
                  type="monotone"
                  dataKey="net"
                  stroke={COLORS.net}
                  fill={COLORS.net}
                  name="Thực nhận"
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Monthly Details Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-3 text-black">Tháng</th>
                    <th className="text-right py-2 px-3 text-black">Gross</th>
                    <th className="text-right py-2 px-3 text-black">Thuế</th>
                    <th className="text-right py-2 px-3 text-black">Net</th>
                    <th className="text-center py-2 px-3 text-black">Bậc thuế</th>
                    <th className="text-left py-2 px-3 text-black">Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {result.monthlyBreakdown.map((month) => (
                    <tr key={month.month} className="border-b border-white/10">
                      <td className="py-2 px-3 font-medium text-black">T{month.month}</td>
                      <td className="py-2 px-3 text-right text-black">
                        {formatCurrency(month.gross)}
                      </td>
                      <td className="py-2 px-3 text-right text-red-600">
                        {formatCurrency(month.tax)}
                      </td>
                      <td className="py-2 px-3 text-right text-green-600">
                        {formatCurrency(month.net)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <Badge variant={month.taxBracket === 0 ? "secondary" :
                                       month.taxBracket <= 2 ? "default" :
                                       month.taxBracket === 3 ? "secondary" :
                                       "destructive"}
                                className="text-xs">
                          {month.taxBracket === 0 ? '0%' :
                           month.taxBracket === 1 ? '5%' :
                           month.taxBracket === 2 ? '10%' :
                           month.taxBracket === 3 ? '20%' :
                           month.taxBracket === 4 ? '30%' : '35%'}
                        </Badge>
                      </td>
                      <td className="py-2 px-3 text-black/70 text-xs">
                        {month.bonuses.length > 0 && (
                          <div>
                            {month.bonuses.map((bonus, idx) => (
                              <div key={idx}>{bonus.type}</div>
                            ))}
                          </div>
                        )}
                        {month.bonuses.length === 0 && 'Lương thường'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Tax Optimization Tab */}
        <TabsContent value="tax" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Current vs Alternative Strategies */}
            <GlassCard variant="default" className="p-6">
              <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                So Sánh Chiến Lược Thuế
              </h4>

              <ResponsiveContainer width="100%" aspect={1.5}>
                <BarChart data={taxOptimizationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" tick={{ fill: 'black', fontSize: 11 }} />
                  <YAxis
                    tick={{ fill: 'black' }}
                    tickFormatter={(value) => `${value}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'black' }}
                    formatter={(value: number | undefined) => [formatCurrency((value || 0) * 1000000), 'VND']}
                  />
                  <Bar dataKey="tax" radius={[8, 8, 0, 0]}>
                    {taxOptimizationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.name === 'Chiến lược hiện tại' ? COLORS.tax : COLORS.net}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Strategy Recommendations */}
              <Alert className="mt-4">
                <Target className="h-4 w-4" />
                <AlertDescription>
                  <strong>Khuyến nghị:</strong> {result.taxOptimization.optimalStrategy.recommendation}
                </AlertDescription>
              </Alert>

              {result.taxOptimization.optimalStrategy.potentialSavings > 0 && (
                <Card className="mt-4 p-4 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-900">
                      Tiết kiệm tiềm năng với chiến lược tối ưu:
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(result.taxOptimization.optimalStrategy.potentialSavings)}
                    </span>
                  </div>
                </Card>
              )}
            </GlassCard>

            {/* Tax Bracket Analysis */}
            <GlassCard variant="default" className="p-6">
              <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Phân Tích Bậc Thuế
              </h4>

              <div className="space-y-4">
                {/* Tax Bracket Distribution */}
                {(() => {
                  const allBrackets = [...new Set(result.monthlyBreakdown.map(m => m.taxBracket))];
                  const minBracket = Math.min(...allBrackets.filter(b => b > 0), 0);
                  const maxBracket = Math.max(...allBrackets);

                  return allBrackets.map(bracket => {
                    const monthsInBracket = result.monthlyBreakdown.filter(m => m.taxBracket === bracket);
                    const monthNumbers = monthsInBracket.map(m => `T${m.month}`).sort();
                    const isLowest = bracket > 0 && bracket === minBracket;
                    const isHighest = bracket === maxBracket && bracket > 0;

                    const bracketInfo = {
                      0: { rate: '0%', color: 'bg-gray-100', label: 'Miễn thuế' },
                      1: { rate: '5%', color: 'bg-green-100', label: 'Bậc 1' },
                      2: { rate: '10%', color: 'bg-blue-100', label: 'Bậc 2' },
                      3: { rate: '20%', color: 'bg-yellow-100', label: 'Bậc 3' },
                      4: { rate: '30%', color: 'bg-orange-100', label: 'Bậc 4' },
                      5: { rate: '35%', color: 'bg-red-100', label: 'Bậc 5' },
                    }[bracket];

                    if (!bracketInfo) return null;

                    return (
                      <div key={bracket} className={`flex items-center justify-between p-3 rounded-lg bg-white/50 ${
                        isLowest ? 'ring-2 ring-green-300' : ''
                      } ${isHighest ? 'ring-2 ring-red-300' : ''}`}>
                        <div className="flex items-center gap-3">
                          <div className={`px-2 py-1 rounded text-xs font-medium ${bracketInfo.color} relative`}>
                            {bracketInfo.label}
                            {isLowest && (
                              <span className="absolute -top-1 -right-1 text-green-600" title="Thấp nhất">
                                ↓
                              </span>
                            )}
                            {isHighest && (
                              <span className="absolute -top-1 -right-1 text-red-600" title="Cao nhất">
                                ↑
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="text-sm text-black/70">
                              {monthsInBracket.length} tháng
                            </span>
                            {monthNumbers.length > 0 && (
                              <span className="text-xs text-black/50 ml-1">
                                ({monthNumbers.join(', ')})
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{bracketInfo.rate}</span>
                          {isLowest && (
                            <span className="block text-xs text-green-600">Thấp nhất</span>
                          )}
                          {isHighest && (
                            <span className="block text-xs text-red-600">Cao nhất</span>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}

                {/* Tax Insights */}
                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Chiến lược tối ưu:</strong> Chia thưởng đều đặn giúp giữ ở bậc thuế thấp và tiết kiệm đến 20% thuế.
                  </AlertDescription>
                </Alert>
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        {/* Year-End Reconciliation Tab */}
        <TabsContent value="reconciliation" className="space-y-6">
          <GlassCard variant="default" className="p-6">
            <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Quyết Toán Thuế Cuối Năm
            </h4>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Tax Payment Summary */}
              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Tóm Tắt Thuế</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-black/70">Thuế đã hàng tháng:</span>
                    <span className="font-medium text-lg">
                      {formatCurrency(result.yearEndReconciliation.taxPaidMonthly)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black/70">Thuế phải nộp năm:</span>
                    <span className="font-medium text-lg">
                      {formatCurrency(result.yearEndReconciliation.taxDueYearly)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {result.yearEndReconciliation.taxRefund > 0 ? 'Được hoàn thuế:' : 'Phải nộp thêm:'}
                    </span>
                    <span className={`font-bold text-lg ${
                      result.yearEndReconciliation.taxRefund > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(Math.abs(result.yearEndReconciliation.taxRefund))}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Reconciliation Status */}
              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {result.yearEndReconciliation.taxRefund > 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    Trạng Thái Quyết Toán
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.yearEndReconciliation.taxRefund > 500000 ? (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>Tin vui!</strong> Bạn sẽ được hoàn thuế. Chuẩn bị hồ sơ quyết toán vào tháng 3-4 năm sau.
                      </AlertDescription>
                    </Alert>
                  ) : result.yearEndReconciliation.taxRefund < -500000 ? (
                    <Alert className="border-red-200 bg-red-50">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Lưu ý:</strong> Bạn cần nộp thêm thuế khi quyết toán. Hãy chuẩn bị trước.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Khoản thuế đã khớp gần đúng với thuế phải nộp năm.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Tax Rate Comparison */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-black mb-3">So Sánh Tỷ Lệ Thuế</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-black/70">Tỷ lệ theo tháng:</span>
                        <span className="font-medium">
                          {result.yearEndReconciliation.monthlyVsYearly.monthlyTaxRate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-black/70">Tỷ lệ theo năm:</span>
                        <span className="font-medium">
                          {result.yearEndReconciliation.monthlyVsYearly.yearlyTaxRate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-black/70">Chênh lệch:</span>
                        <span className={
                          result.yearEndReconciliation.monthlyVsYearly.difference > 0 ? 'text-red-600' : 'text-green-600'
                        }>
                          {Math.abs(result.yearEndReconciliation.monthlyVsYearly.difference).toFixed(1)}%
                          {result.yearEndReconciliation.monthlyVsYearly.difference > 0 ? ' (thuế cao hơn)' : ' (thuế thấp hơn)'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Steps */}
            <Alert className="mt-6">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Các bước tiếp theo:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Lưu lại bảng kê lương các tháng trong năm</li>
                  <li>Tập hợp các chứng từ giảm trừ (nếu có)</li>
                  <li>Đăng ký quyết toán thuế qua mạng hoặc trực tiếp tại cơ quan thuế</li>
                  <li>Nộp hồ sơ trước ngày 30/4 năm sau</li>
                </ul>
              </AlertDescription>
            </Alert>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}