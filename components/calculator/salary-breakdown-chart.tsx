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
      <div className="bg-black/90 border border-white/20 rounded-lg p-3 shadow-xl">
        <p className="text-black font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          const colors: Record<string, string> = {
            'Lương Gross': '#8b5cf6',
            'Bảo hiểm': '#3b82f6',
            'Thuế TNCN': '#f59e0b',
            'Lương Net': '#10b981',
          };

          return (
            <p key={index} className="text-sm" style={{ color: colors[entry.dataKey] }}>
              <span className="font-medium">{entry.name}:</span> {formatCurrency(entry.value)}
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
    <GlassCard variant="default" className="p-6">
      <h3 className="text-lg font-semibold text-black mb-4">
        Phân bổ lương Gross
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="name"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.8)' }}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.8)' }}
            tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => (
              <span className="text-black text-sm">{value}</span>
            )}
            iconType="circle"
          />
          <Bar
            dataKey="Lương Gross"
            fill={chartColors.gross}
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="Bảo hiểm"
            fill={chartColors.insurance}
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="Thuế TNCN"
            fill={chartColors.tax}
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="Lương Net"
            fill={chartColors.net}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.gross }}></div>
            <p className="text-xs text-black/90 font-medium">Lương Gross</p>
          </div>
          <p className="text-sm font-bold text-black">
            {formatCurrency(result.gross)}
          </p>
          <p className="text-xs text-black/60 mt-1">100%</p>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.insurance }}></div>
            <p className="text-xs text-black/90 font-medium">Bảo hiểm</p>
          </div>
          <p className="text-sm font-bold text-black">
            {formatCurrency(result.insurance.total)}
          </p>
          <p className="text-xs text-black/60 mt-1">
            {((result.insurance.total / result.gross) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.tax }}></div>
            <p className="text-xs text-black/90 font-medium">Thuế TNCN</p>
          </div>
          <p className="text-sm font-bold text-black">
            {formatCurrency(result.tax.tax)}
          </p>
          <p className="text-xs text-black/60 mt-1">
            {((result.tax.tax / result.gross) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.net }}></div>
            <p className="text-xs text-black/90 font-medium">Lương Net</p>
          </div>
          <p className="text-sm font-bold text-green-400">
            {formatCurrency(result.net)}
          </p>
          <p className="text-xs text-black/60 mt-1">
            {((result.net / result.gross) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
