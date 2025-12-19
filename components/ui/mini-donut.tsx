'use client';

import { PieChart, Pie, Cell } from 'recharts';

interface MiniDonutProps {
  data: number[];
  colors?: string[];
}

export function MiniDonut({
  data,
  colors = ['#8b5cf6', '#ec4899']
}: MiniDonutProps) {
  const chartData = data.map((value, index) => ({
    value,
    name: `Segment ${index + 1}`,
  }));

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12">
        <PieChart width={48} height={48}>
          <Pie
            data={chartData}
            dataKey="value"
            innerRadius={14}
            outerRadius={20}
            startAngle={90}
            endAngle={-270}
            animationDuration={1000}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="flex-1">
        <div className="text-xs text-black/60 mb-1">Completion</div>
        <div className="text-sm font-bold text-black">{data[0]}%</div>
      </div>
    </div>
  );
}