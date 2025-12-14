'use client';

import { GlassCard } from '@/components/shared/glass-card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/calculations/gross-to-net';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import type { WhatIfVariation, SalaryResult } from '@/types/salary';

interface ScenarioSummaryTableProps {
  baseResult: SalaryResult;
  variations: WhatIfVariation[];
}

export function ScenarioSummaryTable({
  baseResult,
  variations,
}: ScenarioSummaryTableProps) {
  const allScenarios = [
    { label: 'Base', result: baseResult, color: '#8b5cf6' },
    ...variations.map((v) => ({
      label: v.label,
      result: v.result,
      color: v.color,
    })),
  ];

  const getDifferenceIndicator = (value: number, baseValue: number) => {
    const diff = value - baseValue;
    const percentDiff = ((diff / baseValue) * 100).toFixed(1);

    if (Math.abs(diff) < 1000) {
      return (
        <span className="flex items-center gap-1 text-white/60">
          <Minus className="h-3 w-3" />
          <span className="text-xs">0%</span>
        </span>
      );
    }

    if (diff > 0) {
      return (
        <span className="flex items-center gap-1 text-green-400">
          <ArrowUp className="h-3 w-3" />
          <span className="text-xs">+{percentDiff}%</span>
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1 text-red-400">
        <ArrowDown className="h-3 w-3" />
        <span className="text-xs">{percentDiff}%</span>
      </span>
    );
  };

  return (
    <GlassCard className="p-6 overflow-x-auto">
      <h3 className="text-lg font-semibold text-white mb-4">
        Detailed Comparison
      </h3>

      <table className="w-full text-sm text-white">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left py-3 px-2 sticky left-0 bg-gradient-to-r from-purple-600/50 to-transparent">
              Metric
            </th>
            {allScenarios.map((scenario, index) => (
              <th
                key={index}
                className="text-right py-3 px-2 whitespace-nowrap"
              >
                <div className="flex items-center justify-end gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: scenario.color }}
                  />
                  {scenario.label}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Gross Salary */}
          <tr className="border-b border-white/10">
            <td className="py-3 px-2 font-semibold sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
              Gross Salary
            </td>
            {allScenarios.map((scenario, index) => (
              <td key={index} className="text-right font-mono py-3 px-2">
                <div>{formatCurrency(scenario.result.gross)}</div>
                {index > 0 && (
                  <div className="mt-1">
                    {getDifferenceIndicator(
                      scenario.result.gross,
                      baseResult.gross
                    )}
                  </div>
                )}
              </td>
            ))}
          </tr>

          {/* Insurance */}
          <tr className="border-b border-white/10 bg-white/5">
            <td className="py-3 px-2 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
              Total Insurance
            </td>
            {allScenarios.map((scenario, index) => (
              <td key={index} className="text-right font-mono py-3 px-2">
                <div className="text-blue-300">
                  {formatCurrency(scenario.result.insurance.total)}
                </div>
                {index > 0 && (
                  <div className="mt-1">
                    {getDifferenceIndicator(
                      scenario.result.insurance.total,
                      baseResult.insurance.total
                    )}
                  </div>
                )}
              </td>
            ))}
          </tr>

          {/* Tax */}
          <tr className="border-b border-white/10 bg-white/5">
            <td className="py-3 px-2 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
              Income Tax
            </td>
            {allScenarios.map((scenario, index) => (
              <td key={index} className="text-right font-mono py-3 px-2">
                <div className="text-orange-300">
                  {formatCurrency(scenario.result.tax.tax)}
                </div>
                {index > 0 && (
                  <div className="mt-1">
                    {getDifferenceIndicator(
                      scenario.result.tax.tax,
                      baseResult.tax.tax
                    )}
                  </div>
                )}
              </td>
            ))}
          </tr>

          {/* Net Salary */}
          <tr className="border-b border-white/10 font-bold">
            <td className="py-3 px-2 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
              Net Salary
            </td>
            {allScenarios.map((scenario, index) => (
              <td key={index} className="text-right font-mono py-3 px-2">
                <div className="text-green-400 text-base">
                  {formatCurrency(scenario.result.net)}
                </div>
                {index > 0 && (
                  <div className="mt-1">
                    {getDifferenceIndicator(
                      scenario.result.net,
                      baseResult.net
                    )}
                  </div>
                )}
              </td>
            ))}
          </tr>

          <tr className="h-4" />

          {/* Effective Tax Rate */}
          <tr className="border-b border-white/10">
            <td className="py-3 px-2 text-white/70 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
              Effective Tax Rate
            </td>
            {allScenarios.map((scenario, index) => (
              <td
                key={index}
                className="text-right py-3 px-2 text-white/90 font-mono"
              >
                {(scenario.result.tax.effectiveRate * 100).toFixed(2)}%
              </td>
            ))}
          </tr>

          {/* Take-Home Percentage */}
          <tr className="border-b border-white/10">
            <td className="py-3 px-2 text-white/70 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
              Take-Home %
            </td>
            {allScenarios.map((scenario, index) => (
              <td
                key={index}
                className="text-right py-3 px-2 text-white/90 font-mono"
              >
                {((scenario.result.net / scenario.result.gross) * 100).toFixed(
                  1
                )}
                %
              </td>
            ))}
          </tr>

          {/* Tax Bracket */}
          <tr className="border-b border-white/10">
            <td className="py-3 px-2 text-white/70 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
              Tax Bracket
            </td>
            {allScenarios.map((scenario, index) => (
              <td key={index} className="text-right py-3 px-2">
                <Badge variant="outline" className="bg-white/10 border-white/20">
                  Bracket {scenario.result.tax.bracket}
                </Badge>
              </td>
            ))}
          </tr>

          <tr className="h-4" />

          {/* Yearly Projection */}
          <tr className="border-t-2 border-white/30">
            <td className="py-3 px-2 font-semibold sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
              Net/Year
            </td>
            {allScenarios.map((scenario, index) => (
              <td key={index} className="text-right font-mono py-3 px-2">
                <div className="text-green-400">
                  {formatCurrency(scenario.result.yearlyProjection.netYearly)}
                </div>
                {index > 0 && (
                  <div className="mt-1">
                    {getDifferenceIndicator(
                      scenario.result.yearlyProjection.netYearly,
                      baseResult.yearlyProjection.netYearly
                    )}
                  </div>
                )}
              </td>
            ))}
          </tr>

          <tr className="border-b border-white/10">
            <td className="py-3 px-2 text-white/70 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
              Tax/Year
            </td>
            {allScenarios.map((scenario, index) => (
              <td
                key={index}
                className="text-right font-mono py-3 px-2 text-white/90"
              >
                {formatCurrency(scenario.result.yearlyProjection.totalTax)}
              </td>
            ))}
          </tr>

          <tr className="border-b border-white/10">
            <td className="py-3 px-2 text-white/70 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
              Insurance/Year
            </td>
            {allScenarios.map((scenario, index) => (
              <td
                key={index}
                className="text-right font-mono py-3 px-2 text-white/90"
              >
                {formatCurrency(scenario.result.yearlyProjection.totalInsurance)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </GlassCard>
  );
}
