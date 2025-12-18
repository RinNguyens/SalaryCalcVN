'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/utils/format-currency';
import type { SalaryShare } from '@/types/salary-sharing';

interface SalaryComparisonChartProps {
  shares: SalaryShare[];
  type: 'position' | 'industry' | 'location' | 'experience' | 'benefits';
}

export function SalaryComparisonChart({ shares, type }: SalaryComparisonChartProps) {
  const chartData = useMemo(() => {
    switch (type) {
      case 'position':
        return getPositionData(shares);
      case 'industry':
        return getIndustryData(shares);
      case 'location':
        return getLocationData(shares);
      case 'experience':
        return getExperienceData(shares);
      case 'benefits':
        return getBenefitsData(shares);
      default:
        return [];
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shares, type]);

  function getPositionData(shares: SalaryShare[]) {
    const positionMap = new Map<string, { count: number; total: number; data: number[] }>();

    shares.forEach(share => {
      const position = share.position.title;
      if (!positionMap.has(position)) {
        positionMap.set(position, { count: 0, total: 0, data: [] });
      }
      const pos = positionMap.get(position)!;
      pos.count++;
      pos.total += share.compensation.totalCompensation;
      pos.data.push(share.compensation.totalCompensation);
    });

    return Array.from(positionMap.entries())
      .map(([position, stats]) => ({
        name: position,
        average: Math.round(stats.total / stats.count),
        median: Math.round(stats.data.sort((a, b) => a - b)[Math.floor(stats.data.length / 2)]),
        count: stats.count,
        maxSalary: Math.max(...stats.data),
      }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 10);
  }

  function getIndustryData(shares: SalaryShare[]) {
    const industryMap = new Map<string, { count: number; total: number; data: number[] }>();

    shares.forEach(share => {
      const industry = share.companyInfo.industry;
      if (!industryMap.has(industry)) {
        industryMap.set(industry, { count: 0, total: 0, data: [] });
      }
      const ind = industryMap.get(industry)!;
      ind.count++;
      ind.total += share.compensation.totalCompensation;
      ind.data.push(share.compensation.totalCompensation);
    });

    return Array.from(industryMap.entries())
      .map(([industry, stats]) => ({
        name: industry,
        average: Math.round(stats.total / stats.count),
        median: Math.round(stats.data.sort((a, b) => a - b)[Math.floor(stats.data.length / 2)]),
        count: stats.count,
        percentage: Math.round((stats.count / shares.length) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }

  function getLocationData(shares: SalaryShare[]) {
    const locationMap = new Map<string, { count: number; total: number; data: number[] }>();

    shares.forEach(share => {
      const location = share.companyInfo.location;
      if (!locationMap.has(location)) {
        locationMap.set(location, { count: 0, total: 0, data: [] });
      }
      const loc = locationMap.get(location)!;
      loc.count++;
      loc.total += share.compensation.totalCompensation;
      loc.data.push(share.compensation.totalCompensation);
    });

    return Array.from(locationMap.entries())
      .map(([location, stats]) => ({
        name: location,
        average: Math.round(stats.total / stats.count),
        median: Math.round(stats.data.sort((a, b) => a - b)[Math.floor(stats.data.length / 2)]),
        count: stats.count,
      }))
      .sort((a, b) => b.average - a.average);
  }

  function getExperienceData(shares: SalaryShare[]) {
    const ranges = [
      { range: '0-1 years', min: 0, max: 1, data: [] as number[] },
      { range: '1-3 years', min: 1, max: 3, data: [] as number[] },
      { range: '3-5 years', min: 3, max: 5, data: [] as number[] },
      { range: '5-10 years', min: 5, max: 10, data: [] as number[] },
      { range: '10+ years', min: 10, max: 100, data: [] as number[] },
    ];

    shares.forEach(share => {
      const exp = share.experience.totalYears;
      const range = ranges.find(r => exp >= r.min && exp < r.max);
      if (range) {
        range.data.push(share.compensation.totalCompensation);
      }
    });

    return ranges
      .filter(r => r.data.length > 0)
      .map(r => ({
        name: r.range,
        average: Math.round(r.data.reduce((a, b) => a + b, 0) / r.data.length),
        count: r.data.length,
      }));
  }

  function getBenefitsData(shares: SalaryShare[]) {
    const benefitsMap = new Map<string, number>();

    shares.forEach(share => {
      Object.entries(share.compensation.benefits).forEach(([benefit, value]) => {
        benefitsMap.set(benefit, (benefitsMap.get(benefit) || 0) + value);
      });
    });

    return Array.from(benefitsMap.entries())
      .map(([benefit, total]) => ({
        name: formatBenefitName(benefit),
        value: Math.round(total / shares.length),
      }))
      .sort((a, b) => b.value - a.value);
  }

  function formatBenefitName(benefit: string): string {
    const nameMap: Record<string, string> = {
      healthInsurance: 'Health Insurance',
      mealAllowance: 'Meal Allowance',
      transport: 'Transport',
      phone: 'Phone',
      internet: 'Internet',
      gym: 'Gym',
      learning: 'Learning & Development',
      other: 'Other Benefits',
    };
    return nameMap[benefit] || benefit;
  }

  const renderChart = () => {
    const maxValue = Math.max(...chartData.map(d => 'average' in d ? d.average : ('value' in d ? d.value : 0)));

    switch (type) {
      case 'position':
      case 'location':
        return (
          <div className="space-y-4">
            {chartData.slice(0, 8).map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-black text-sm font-medium">{item.name}</span>
                  <span className="text-black font-bold">
                    {formatCurrency('average' in item ? item.average : 0)}
                  </span>
                </div>
                <Progress
                  value={('average' in item ? item.average : 0) / maxValue * 100}
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-black/60">
                  <span>{'count' in item ? item.count : 0} data points</span>
                  {'maxSalary' in item && (
                    <span>Max: {formatCurrency(item.maxSalary as number)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'industry':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {chartData.slice(0, 4).map((item, index) => (
                <div key={index} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-2">
                    <div className="text-2xl font-bold text-black">
                      {String('percentage' in item ? item.percentage : 0)}%
                    </div>
                  </div>
                  <p className="text-black text-sm font-medium">{item.name}</p>
                  <p className="text-black/60 text-xs">{'count' in item ? item.count : 0} shares</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {chartData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-black text-sm">{item.name}</span>
                  <span className="text-black font-semibold">
                    {formatCurrency('average' in item ? item.average : 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            {chartData.map((item, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-black font-medium">{item.name}</span>
                  <span className="text-green-300 font-bold">
                    {formatCurrency('average' in item ? item.average : 0)}
                  </span>
                </div>
                <Progress
                  value={('average' in item ? item.average : 0) / maxValue * 100}
                  className="h-3 mb-2"
                />
                <p className="text-black/60 text-sm">{'count' in item ? item.count : 0} professionals</p>
              </div>
            ))}
          </div>
        );

      case 'benefits':
        return (
          <div className="space-y-4">
            {chartData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-black text-sm">{item.name}</span>
                  <span className="text-yellow-300 font-bold">
                    {formatCurrency('value' in item ? item.value : 0)}/month
                  </span>
                </div>
                <Progress
                  value={('value' in item ? item.value : 0) / maxValue * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const getChartTitle = () => {
    switch (type) {
      case 'position':
        return 'Average Salary by Position';
      case 'industry':
        return 'Salary Distribution by Industry';
      case 'location':
        return 'Average Salary by Location';
      case 'experience':
        return 'Salary vs Experience';
      case 'benefits':
        return 'Average Benefits Value';
      default:
        return 'Salary Analysis';
    }
  };

  const getChartDescription = () => {
    switch (type) {
      case 'position':
        return 'Top paying positions based on user submissions';
      case 'industry':
        return 'Salary distribution across different industries';
      case 'location':
        return 'Average salaries in different cities/regions';
      case 'experience':
        return 'How salary increases with experience';
      case 'benefits':
        return 'Average monthly value of different benefits';
      default:
        return '';
    }
  };

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-black flex items-center justify-between">
          {getChartTitle()}
          <Badge variant="outline" className="bg-white/10 text-black border-white/20">
            {shares.length} data points
          </Badge>
        </CardTitle>
        <p className="text-black/60 text-sm">{getChartDescription()}</p>
      </CardHeader>
      <CardContent>
        {shares.length > 0 ? (
          renderChart()
        ) : (
          <div className="flex items-center justify-center h-64 text-black/40">
            No data available for this view
          </div>
        )}
      </CardContent>
    </Card>
  );
}