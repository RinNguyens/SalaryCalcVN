'use client';

import { GlassCard } from '@/components/shared/glass-card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { SalaryResult } from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';

interface TaxChartProps {
  result: SalaryResult;
}

const COLORS = {
  net: '#10b981',
  insurance: '#3b82f6',
  tax: '#f59e0b',
};

export function TaxChart({ result }: TaxChartProps) {
  const data = [
    { name: 'Lương thực nhận', value: result.net, color: COLORS.net },
    { name: 'Bảo hiểm', value: result.insurance.total, color: COLORS.insurance },
    { name: 'Thuế TNCN', value: result.tax.tax, color: COLORS.tax },
  ];

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    if (
      cx === undefined ||
      cy === undefined ||
      midAngle === undefined ||
      innerRadius === undefined ||
      outerRadius === undefined ||
      percent === undefined
    ) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <GlassCard variant="default" className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Phân bổ lương Gross
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
            }}
          />
          <Legend
            formatter={(value) => <span className="text-white">{value}</span>}
            wrapperStyle={{ paddingTop: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div>
          <p className="text-xs text-white/70">Net</p>
          <p className="text-sm font-semibold text-white">
            {((result.net / result.gross) * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-1"></div>
          <p className="text-xs text-white/70">Bảo hiểm</p>
          <p className="text-sm font-semibold text-white">
            {((result.insurance.total / result.gross) * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1"></div>
          <p className="text-xs text-white/70">Thuế</p>
          <p className="text-sm font-semibold text-white">
            {((result.tax.tax / result.gross) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
