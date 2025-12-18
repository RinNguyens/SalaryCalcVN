'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/shared/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { calculateNetFromGross, formatCurrency } from '@/lib/calculations/gross-to-net';
import { Plus, X, Calculator } from 'lucide-react';
import type { SalaryResult, Region } from '@/types/salary';
import { REGIONS } from '@/lib/constants/tax-brackets';

interface SalaryComparison {
  gross: number;
  region: Region;
  dependents: number;
}

export function ComparisonTable() {
  const [salaries, setSalaries] = useState<SalaryComparison[]>([
    { gross: 20_000_000, region: 'I', dependents: 0 },
    { gross: 30_000_000, region: 'I', dependents: 0 },
  ]);
  const [results, setResults] = useState<SalaryResult[]>([]);

  const handleAddSalary = () => {
    if (salaries.length < 5) {
      setSalaries([...salaries, { gross: 25_000_000, region: 'I', dependents: 0 }]);
    }
  };

  const handleRemoveSalary = (index: number) => {
    if (salaries.length > 2) {
      setSalaries(salaries.filter((_, i) => i !== index));
      if (results.length > 0) {
        setResults(results.filter((_, i) => i !== index));
      }
    }
  };

  const handleUpdateSalary = (
    index: number,
    field: keyof SalaryComparison,
    value: number | Region
  ) => {
    const newSalaries = [...salaries];
    newSalaries[index] = { ...newSalaries[index], [field]: value };
    setSalaries(newSalaries);
  };

  const handleCalculate = () => {
    const newResults = salaries.map((salary) =>
      calculateNetFromGross({
        salary: salary.gross,
        dependents: salary.dependents,
        region: salary.region,
      })
    );
    setResults(newResults);
  };

  return (
    <GlassCard className="p-6">
      <h2 className="text-2xl font-bold text-black mb-6">So sánh mức lương</h2>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        {salaries.map((salary, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <Input
                type="number"
                value={salary.gross}
                onChange={(e) =>
                  handleUpdateSalary(index, 'gross', Number(e.target.value))
                }
                placeholder="Lương Gross"
                className="bg-white/10 border-white/20 text-black placeholder:text-black/50"
              />
            </div>
            <div className="md:col-span-3">
              <Select
                value={salary.region}
                onValueChange={(value) =>
                  handleUpdateSalary(index, 'region', value as Region)
                }
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <Input
                type="number"
                value={salary.dependents}
                onChange={(e) =>
                  handleUpdateSalary(index, 'dependents', Number(e.target.value))
                }
                placeholder="Số người phụ thuộc"
                className="bg-white/10 border-white/20 text-black placeholder:text-black/50"
              />
            </div>
            <div className="md:col-span-1 flex items-center">
              {salaries.length > 2 && (
                <Button
                  onClick={() => handleRemoveSalary(index)}
                  variant="ghost"
                  size="icon"
                  className="text-black hover:text-red-600 hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          onClick={handleAddSalary}
          disabled={salaries.length >= 5}
          variant="outline"
          className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20"
        >
          <Plus className="h-4 w-4" />
          Thêm mức lương
        </Button>
        <Button
          onClick={handleCalculate}
          className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500"
        >
          <Calculator className="h-4 w-4" />
          So sánh
        </Button>
      </div>

      {/* Results Table */}
      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-black text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-2 sticky left-0 bg-gradient-to-r from-purple-600/50 to-transparent">
                  Mục
                </th>
                {results.map((_, i) => (
                  <th key={i} className="text-right py-3 px-2 whitespace-nowrap">
                    Lương {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-3 px-2 font-semibold sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
                  Gross
                </td>
                {results.map((r, i) => (
                  <td key={i} className="text-right font-mono py-3 px-2">
                    {formatCurrency(r.gross)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10 bg-white/5">
                <td className="py-3 px-2 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
                  BHXH
                </td>
                {results.map((r, i) => (
                  <td key={i} className="text-right font-mono py-3 px-2">
                    {formatCurrency(r.insurance.bhxh)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10 bg-white/5">
                <td className="py-3 px-2 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
                  BHYT
                </td>
                {results.map((r, i) => (
                  <td key={i} className="text-right font-mono py-3 px-2">
                    {formatCurrency(r.insurance.bhyt)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10 bg-white/5">
                <td className="py-3 px-2 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
                  BHTN
                </td>
                {results.map((r, i) => (
                  <td key={i} className="text-right font-mono py-3 px-2">
                    {formatCurrency(r.insurance.bhtn)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-2 font-semibold sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
                  Tổng BH
                </td>
                {results.map((r, i) => (
                  <td key={i} className="text-right font-mono py-3 px-2 text-blue-400">
                    {formatCurrency(r.insurance.total)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-2 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
                  Thuế TNCN
                </td>
                {results.map((r, i) => (
                  <td key={i} className="text-right font-mono py-3 px-2 text-orange-400">
                    {formatCurrency(r.tax.tax)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-2 text-xs text-black/70 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
                  Thuế suất
                </td>
                {results.map((r, i) => (
                  <td key={i} className="text-right py-3 px-2 text-xs text-black/70">
                    {(r.tax.effectiveRate * 100).toFixed(2)}%
                  </td>
                ))}
              </tr>
              <tr className="font-bold border-t-2 border-white/30">
                <td className="py-3 px-2 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
                  Net
                </td>
                {results.map((r, i) => (
                  <td key={i} className="text-right font-mono py-3 px-2 text-green-400 text-lg">
                    {formatCurrency(r.net)}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-3 px-2 text-xs text-black/70 sticky left-0 bg-gradient-to-r from-purple-600/30 to-transparent">
                  % của Gross
                </td>
                {results.map((r, i) => (
                  <td key={i} className="text-right py-3 px-2 text-xs text-black/70">
                    {((r.net / r.gross) * 100).toFixed(1)}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </GlassCard>
  );
}
