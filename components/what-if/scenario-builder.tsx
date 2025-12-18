'use client';

import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { GlassCard } from '@/components/shared/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, X, Sparkles } from 'lucide-react';
import { calculateNetFromGross, formatCurrency } from '@/lib/calculations/gross-to-net';
import { REGIONS } from '@/lib/constants/tax-brackets';
import { getScenarioColor } from '@/lib/utils/color-generator';
import type { SalaryInput, WhatIfVariation, Region } from '@/types/salary';

interface ScenarioBuilderProps {
  onBaseScenarioChange: (input: SalaryInput) => void;
  onVariationsChange: (variations: WhatIfVariation[]) => void;
}

export function ScenarioBuilder({
  onBaseScenarioChange,
  onVariationsChange,
}: ScenarioBuilderProps) {
  // Base scenario state
  const [baseScenario, setBaseScenario] = useState<SalaryInput>({
    salary: 30_000_000,
    dependents: 0,
    region: 'I',
    exemptions: 0,
  });

  // Variations state
  const [variations, setVariations] = useState<
    Array<{
      id: string;
      label: string;
      salaryMultiplier: number;
      dependentsAdjustment: number;
      regionOverride?: Region;
    }>
  >([]);

  // Debounced calculation
  const debouncedUpdate = useDebouncedCallback(() => {
    // Calculate base scenario
    onBaseScenarioChange(baseScenario);

    // Calculate variations
    const calculatedVariations: WhatIfVariation[] = variations.map((v, index) => {
      const adjustedSalary = Math.round(
        baseScenario.salary * v.salaryMultiplier
      );
      const adjustedDependents = Math.max(
        0,
        baseScenario.dependents + v.dependentsAdjustment
      );

      const input: SalaryInput = {
        salary: adjustedSalary,
        dependents: adjustedDependents,
        region: v.regionOverride || baseScenario.region,
        exemptions: baseScenario.exemptions,
      };

      const result = calculateNetFromGross(input);

      return {
        id: v.id,
        label: v.label,
        input,
        result,
        color: getScenarioColor(index + 1), // +1 because base is 0
      };
    });

    onVariationsChange(calculatedVariations);
  }, 300);

  // Trigger updates when base scenario or variations change
  useEffect(() => {
    debouncedUpdate();
  }, [baseScenario, variations, debouncedUpdate]);

  const handleAddVariation = () => {
    if (variations.length >= 4) return;

    const newVariation = {
      id: crypto.randomUUID(),
      label: `Variation ${variations.length + 1}`,
      salaryMultiplier: 1.0 + (variations.length + 1) * 0.1,
      dependentsAdjustment: 0,
    };

    setVariations([...variations, newVariation]);
  };

  const handleRemoveVariation = (id: string) => {
    setVariations(variations.filter((v) => v.id !== id));
  };

  const handleVariationSalaryChange = (id: string, value: number) => {
    setVariations(
      variations.map((v) =>
        v.id === id ? { ...v, salaryMultiplier: value } : v
      )
    );
  };

  const handleVariationDependentsChange = (id: string, value: number) => {
    setVariations(
      variations.map((v) =>
        v.id === id ? { ...v, dependentsAdjustment: value } : v
      )
    );
  };

  const handleVariationRegionChange = (id: string, region?: Region) => {
    setVariations(
      variations.map((v) =>
        v.id === id ? { ...v, regionOverride: region } : v
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Base Scenario */}
      <GlassCard variant="strong" className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-black">Base Scenario</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-black">Gross Salary (VND)</Label>
            <Input
              type="number"
              value={baseScenario.salary}
              onChange={(e) =>
                setBaseScenario({
                  ...baseScenario,
                  salary: Number(e.target.value),
                })
              }
              className="bg-white/10 border-white/20 text-black"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-black">Dependents</Label>
            <Input
              type="number"
              value={baseScenario.dependents}
              onChange={(e) =>
                setBaseScenario({
                  ...baseScenario,
                  dependents: Number(e.target.value),
                })
              }
              className="bg-white/10 border-white/20 text-black"
              min={0}
              max={10}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-black">Region</Label>
            <Select
              value={baseScenario.region}
              onValueChange={(value: Region) =>
                setBaseScenario({ ...baseScenario, region: value })
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

          <div className="space-y-2">
            <Label className="text-black">Tax Exemptions (VND)</Label>
            <Input
              type="number"
              value={baseScenario.exemptions || 0}
              onChange={(e) =>
                setBaseScenario({
                  ...baseScenario,
                  exemptions: Number(e.target.value),
                })
              }
              className="bg-white/10 border-white/20 text-black"
              min={0}
            />
          </div>
        </div>
      </GlassCard>

      {/* Variations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black">Variations</h3>
          <Button
            onClick={handleAddVariation}
            disabled={variations.length >= 4}
            variant="outline"
            size="sm"
            className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20"
          >
            <Plus className="h-4 w-4" />
            Add Variation (Max 4)
          </Button>
        </div>

        {variations.length === 0 && (
          <GlassCard className="p-8 text-center">
            <p className="text-black/70 text-sm">
              No variations yet. Click &quot;Add Variation&quot; to compare different scenarios.
            </p>
          </GlassCard>
        )}

        {variations.map((variation, index) => {
          const estimatedSalary = Math.round(
            baseScenario.salary * variation.salaryMultiplier
          );
          const estimatedDependents = Math.max(
            0,
            baseScenario.dependents + variation.dependentsAdjustment
          );

          return (
            <GlassCard
              key={variation.id}
              className="p-6"
              style={{
                borderLeftWidth: '4px',
                borderLeftColor: getScenarioColor(index + 1),
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getScenarioColor(index + 1) }}
                  />
                  <h4 className="font-semibold text-black">{variation.label}</h4>
                </div>
                <Button
                  onClick={() => handleRemoveVariation(variation.id)}
                  variant="ghost"
                  size="icon"
                  className="text-black hover:text-red-400 hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Salary Multiplier */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-black text-sm">
                      Salary Adjustment
                    </Label>
                    <span className="text-black/80 text-sm font-mono">
                      {(variation.salaryMultiplier * 100).toFixed(0)}% (
                      {formatCurrency(estimatedSalary)})
                    </span>
                  </div>
                  <Slider
                    value={[variation.salaryMultiplier]}
                    onValueChange={([value]) =>
                      handleVariationSalaryChange(variation.id, value)
                    }
                    min={0.5}
                    max={1.5}
                    step={0.05}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-black/60">
                    <span>50%</span>
                    <span>100%</span>
                    <span>150%</span>
                  </div>
                </div>

                {/* Dependents Adjustment */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-black text-sm">
                      Dependents Adjustment
                    </Label>
                    <span className="text-black/80 text-sm font-mono">
                      {variation.dependentsAdjustment >= 0 ? '+' : ''}
                      {variation.dependentsAdjustment} ({estimatedDependents} total)
                    </span>
                  </div>
                  <Slider
                    value={[variation.dependentsAdjustment]}
                    onValueChange={([value]) =>
                      handleVariationDependentsChange(variation.id, value)
                    }
                    min={-baseScenario.dependents}
                    max={10 - baseScenario.dependents}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Region Override */}
                <div className="space-y-2">
                  <Label className="text-black text-sm">Region Override (Optional)</Label>
                  <div className="flex gap-2">
                    <Select
                      value={variation.regionOverride || baseScenario.region}
                      onValueChange={(value: Region) =>
                        handleVariationRegionChange(variation.id, value)
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
                    {variation.regionOverride && (
                      <Button
                        onClick={() =>
                          handleVariationRegionChange(variation.id, undefined)
                        }
                        variant="outline"
                        size="icon"
                        className="bg-white/10 border-white/20 text-black hover:bg-white/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
