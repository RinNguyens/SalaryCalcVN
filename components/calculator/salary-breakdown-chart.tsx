'use client';

import { GlassCard } from '@/components/shared/glass-card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Custom Tooltip with colored text
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-white/20 rounded-lg p-3 shadow-xl">
        <p className="text-black font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          const colors: Record<string, string> = {
            'Lương Gross': '#8b5cf6',
            'Bảo hiểm': '#3b82f6',
            'Thuế TNCN': '#f59e0b',
            'Lương Net': '#10b981',
          };

          return (
            <p key={index} className="text-sm text-black" style={{ color: colors[entry.dataKey] }}>
              <span className="font-medium text-black">{entry.name}:</span> {formatCurrency(entry.value)}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

import type { SalaryResult } from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';

interface SalaryBreakdownChartProps {
  result: SalaryResult;
}

export function SalaryBreakdownChart({ result }: SalaryBreakdownChartProps) {
  // Define color scheme for consistency
  const chartColors = {
    gross: '#8b5cf6', // Purple
    insurance: '#3b82f6', // Blue
    tax: '#f59e0b', // Orange
    net: '#10b981', // Green
  };

  const data = [
    {
      name: 'Thu nhập',
      'Lương Gross': result.gross,
      'Bảo hiểm': result.insurance.total,
      'Thuế TNCN': result.tax.tax,
      'Lương Net': result.net,
    },
  ];

  return (
    <GlassCard variant="default" className="p-3 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">
        Phân bổ lương Gross
      </h3>

      <div className="w-full h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis
              dataKey="name"
              stroke="rgba(0,0,0,0.3)"
              tick={{ fill: '#000000', fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: '#000000', fontSize: 11 }}
              tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
              width={45}
              stroke="rgba(0,0,0,0.3)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={(value) => (
                <span className="text-black text-xs sm:text-sm">{value}</span>
              )}
              iconType="circle"
              iconSize={8}
            />
            <Bar
              dataKey="Lương Gross"
              fill={chartColors.gross}
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
            <Bar
              dataKey="Bảo hiểm"
              fill={chartColors.insurance}
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
            <Bar
              dataKey="Thuế TNCN"
              fill={chartColors.tax}
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
            <Bar
              dataKey="Lương Net"
              fill={chartColors.net}
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 sm:mt-6 grid grid-cols-2 justify-end gap-2 sm:gap-4">
        <div className="text-center p-2 sm:p-3 bg-white/5 rounded-lg">
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: chartColors.gross }}></div>
            <p className="text-[10px] sm:text-xs text-black/90 font-medium">Lương Gross</p>
          </div>
          <p className="text-xs sm:text-sm font-bold text-black break-words">
            {formatCurrency(result.gross)}
          </p>
          <p className="text-[10px] sm:text-xs text-black/60 mt-1">100%</p>
        </div>
        <div className="text-center p-2 sm:p-3 bg-white/5 rounded-lg">
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: chartColors.insurance }}></div>
            <p className="text-[10px] sm:text-xs text-black/90 font-medium">Bảo hiểm</p>
          </div>
          <p className="text-xs sm:text-sm font-bold text-black break-words">
            {formatCurrency(result.insurance.total)}
          </p>
          <p className="text-[10px] sm:text-xs text-black/60 mt-1">
            {((result.insurance.total / result.gross) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="text-center p-2 sm:p-3 bg-white/5 rounded-lg">
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: chartColors.tax }}></div>
            <p className="text-[10px] sm:text-xs text-black/90 font-medium">Thuế TNCN</p>
          </div>
          <p className="text-xs sm:text-sm font-bold text-black break-words">
            {formatCurrency(result.tax.tax)}
          </p>
          <p className="text-[10px] sm:text-xs text-black/60 mt-1">
            {((result.tax.tax / result.gross) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="text-center p-2 sm:p-3 bg-white/5 rounded-lg">
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: chartColors.net }}></div>
            <p className="text-[10px] sm:text-xs text-black/90 font-medium">Lương Net</p>
          </div>
          <p className="text-xs sm:text-sm font-bold text-green-400 break-words">
            {formatCurrency(result.net)}
          </p>
          <p className="text-[10px] sm:text-xs text-black/60 mt-1">
            {((result.net / result.gross) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
