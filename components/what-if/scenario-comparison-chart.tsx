'use client';

import { GlassCard } from '@/components/shared/glass-card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/lib/calculations/gross-to-net';
import type { WhatIfVariation, SalaryInput, SalaryResult } from '@/types/salary';
import { calculateNetFromGross } from '@/lib/calculations/gross-to-net';

interface ScenarioComparisonChartProps {
  baseInput: SalaryInput;
  baseResult: SalaryResult;
  variations: WhatIfVariation[];
}

export function ScenarioComparisonChart({
  baseInput,
  baseResult,
  variations,
}: ScenarioComparisonChartProps) {
  // Prepare data for chart
  const chartData = [
    {
      name: 'Base',
      gross: baseResult.gross,
      insurance: baseResult.insurance.total,
      tax: baseResult.tax.tax,
      net: baseResult.net,
      color: '#8b5cf6', // purple-500
    },
    ...variations.map((v) => ({
      name: v.label.replace('Variation ', 'V'),
      gross: v.result.gross,
      insurance: v.result.insurance.total,
      tax: v.result.tax.tax,
      net: v.result.net,
      color: v.color,
    })),
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-black font-semibold mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <p className="text-purple-300">
              Gross: {formatCurrency(data.gross)}
            </p>
            <p className="text-blue-300">
              Insurance: {formatCurrency(data.insurance)}
            </p>
            <p className="text-orange-300">Tax: {formatCurrency(data.tax)}</p>
            <p className="text-green-300 font-semibold">
              Net: {formatCurrency(data.net)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard className="p-6" id="scenario-comparison-chart">
      <h3 className="text-lg font-semibold text-black mb-4">
        Scenario Comparison
      </h3>

      <ResponsiveContainer width="100%" aspect={1.5}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="name"
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) =>
              `${(value / 1_000_000).toFixed(0)}M`
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ color: 'white' }}
            iconType="circle"
          />
          <Bar
            dataKey="gross"
            name="Gross"
            fill="#8b5cf6"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="insurance"
            name="Insurance"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="tax"
            name="Tax"
            fill="#f59e0b"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="net"
            name="Net"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center">
          <p className="text-black/70 text-xs mb-1">Base Net</p>
          <p className="text-black font-mono text-sm">
            {formatCurrency(baseResult.net)}
          </p>
        </div>
        {variations.length > 0 && (
          <>
            <div className="text-center">
              <p className="text-black/70 text-xs mb-1">Highest Net</p>
              <p className="text-green-400 font-mono text-sm">
                {formatCurrency(
                  Math.max(
                    baseResult.net,
                    ...variations.map((v) => v.result.net)
                  )
                )}
              </p>
            </div>
            <div className="text-center">
              <p className="text-black/70 text-xs mb-1">Lowest Net</p>
              <p className="text-orange-400 font-mono text-sm">
                {formatCurrency(
                  Math.min(
                    baseResult.net,
                    ...variations.map((v) => v.result.net)
                  )
                )}
              </p>
            </div>
            <div className="text-center">
              <p className="text-black/70 text-xs mb-1">Difference</p>
              <p className="text-black font-mono text-sm">
                {formatCurrency(
                  Math.max(
                    baseResult.net,
                    ...variations.map((v) => v.result.net)
                  ) -
                    Math.min(
                      baseResult.net,
                      ...variations.map((v) => v.result.net)
                    )
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </GlassCard>
  );
}
