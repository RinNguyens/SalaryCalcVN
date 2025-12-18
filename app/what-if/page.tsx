'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Download, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScenarioBuilder } from '@/components/what-if/scenario-builder';
import { ScenarioComparisonChart } from '@/components/what-if/scenario-comparison-chart';
import { ScenarioSummaryTable } from '@/components/what-if/scenario-summary-table';
import { calculateNetFromGross } from '@/lib/calculations/gross-to-net';
import { saveScenario } from '@/lib/storage/scenario-storage';
import { toast } from 'sonner';
import type { SalaryInput, SalaryResult, WhatIfVariation } from '@/types/salary';

export default function WhatIfPage() {
  const [baseInput, setBaseInput] = useState<SalaryInput>({
    salary: 30_000_000,
    dependents: 0,
    region: 'I',
    exemptions: 0,
  });

  const [baseResult, setBaseResult] = useState<SalaryResult | null>(null);
  const [variations, setVariations] = useState<WhatIfVariation[]>([]);

  const handleBaseScenarioChange = (input: SalaryInput) => {
    setBaseInput(input);
    const result = calculateNetFromGross(input);
    setBaseResult(result);
  };

  const handleVariationsChange = (newVariations: WhatIfVariation[]) => {
    setVariations(newVariations);
  };

  const handleSaveScenario = () => {
    if (!baseResult) {
      toast.error('Please create a scenario first');
      return;
    }

    const scenario = {
      id: crypto.randomUUID(),
      name: `Scenario - ${new Date().toLocaleDateString('vi-VN')}`,
      baseInput,
      variations,
      timestamp: Date.now(),
    };

    saveScenario(scenario);
    toast.success('Scenario saved successfully!');
  };

  const handleExport = () => {
    toast.info('Export feature coming soon!');
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/calculator">
              <Button
                variant="outline"
                className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Calculator
              </Button>
            </Link>

            <div className="flex gap-2">
              <Button
                onClick={handleSaveScenario}
                variant="outline"
                className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20"
                disabled={!baseResult}
              >
                <Save className="h-4 w-4" />
                Save Scenario
              </Button>
              <Button
                onClick={handleExport}
                variant="outline"
                className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20"
                disabled={!baseResult}
              >
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
              What-If Analysis
            </h1>
            <p className="text-black/80 text-lg">
              Compare different salary scenarios and see how changes affect your take-home pay
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Scenario Builder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ScenarioBuilder
              onBaseScenarioChange={handleBaseScenarioChange}
              onVariationsChange={handleVariationsChange}
            />
          </motion.div>

          {/* Charts and Tables */}
          {baseResult && (
            <>
              {/* Comparison Chart */}
              {variations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ScenarioComparisonChart
                    baseInput={baseInput}
                    baseResult={baseResult}
                    variations={variations}
                  />
                </motion.div>
              )}

              {/* Summary Table */}
              {variations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <ScenarioSummaryTable
                    baseResult={baseResult}
                    variations={variations}
                  />
                </motion.div>
              )}

              {/* Help Text */}
              {variations.length === 0 && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-black/70 text-lg">
                    Add variations using the &quot;Add Variation&quot; button to start comparing scenarios
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
