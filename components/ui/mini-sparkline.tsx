'use client';

import { LineChart, Line } from 'recharts';

interface MiniSparklineProps {
  data: number[];
  color?: string;
}

export function MiniSparkline({ data, color = '#10b981' }: MiniSparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <LineChart width={100} height={40} data={chartData}>
      <Line
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={2}
        dot={false}
        animationDuration={1000}
      />
    </LineChart>
  );
}