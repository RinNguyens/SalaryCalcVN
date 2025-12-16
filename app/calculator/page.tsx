'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { History, Calculator, Calendar, TrendingUp } from 'lucide-react';
import { SalaryInputForm } from '@/components/calculator/salary-input-form';
import { ResultCard } from '@/components/calculator/result-card';
import { TaxChart } from '@/components/calculator/tax-chart';
import { SalaryBreakdownChart } from '@/components/calculator/salary-breakdown-chart';
import { InsuranceBreakdown } from '@/components/calculator/insurance-breakdown';
import { ResultSkeleton } from '@/components/shared/result-skeleton';
import { TaxBreakdown } from '@/components/calculator/tax-breakdown';
import { TaxComparison } from '@/components/calculator/tax-comparison';
import { InteractiveTaxSlider } from '@/components/calculator/interactive-tax-slider';
import { AnnualInputForm } from '@/components/annual-compensation/annual-input-form';
import { AnnualResultCard } from '@/components/annual-compensation/annual-result-card';
import { GrowthInputForm } from '@/components/salary-growth/growth-input-form';
import { GrowthResultCard } from '@/components/salary-growth/growth-result-card';
import { calculateNetFromGross } from '@/lib/calculations/gross-to-net';
import { calculateGrossFromNet } from '@/lib/calculations/net-to-gross';
import { calculateAnnualCompensation } from '@/lib/calculations/annual-compensation';
import { calculateSalaryGrowth } from '@/lib/calculations/salary-growth';
import { saveCalculation } from '@/lib/storage/local-storage';
import { generateSalaryInsights } from '@/lib/insights/salary-insights';
import { AIAssistant } from '@/components/calculator/ai-assistant';
import { convertToCalculatorResult } from '@/lib/utils/ai-helper';
import type { SalaryResult, AnnualCompensation, SalaryGrowthProjection, BonusInput, SalaryGrowthInput } from '@/types/salary';
import type { SalaryFormValues } from '@/lib/validators/salary-schema';

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState('monthly');
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [annualResult, setAnnualResult] = useState<AnnualCompensation | null>(null);
  const [growthResult, setGrowthResult] = useState<SalaryGrowthProjection | null>(null);
  const [mode, setMode] = useState<'gross-to-net' | 'net-to-gross'>('gross-to-net');
  const [isCalculating, setIsCalculating] = useState(false);
  const [lastInput, setLastInput] = useState<SalaryFormValues | null>(null);

  const handleCalculate = async (
    values: SalaryFormValues,
    calculationMode: 'gross-to-net' | 'net-to-gross'
  ) => {
    setIsCalculating(true);
    setMode(calculationMode);
    setLastInput(values);

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newResult =
      calculationMode === 'gross-to-net'
        ? calculateNetFromGross(values)
        : calculateGrossFromNet(values);

    setResult(newResult);

    // Auto-save to history
    saveCalculation(values, newResult, calculationMode);

    setIsCalculating(false);
  };

  const handleAnnualCalculate = async (bonuses: BonusInput) => {
    if (!lastInput) return;

    setIsCalculating(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const newAnnualResult = calculateAnnualCompensation(lastInput, bonuses);
    setAnnualResult(newAnnualResult);

    setIsCalculating(false);
  };

  const handleGrowthCalculate = async (input: SalaryGrowthInput) => {
    setIsCalculating(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const newGrowthResult = calculateSalaryGrowth(input);
    setGrowthResult(newGrowthResult);

    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 md:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            y: [0, -80, 0],
            x: [0, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-end mb-4">
            <Link href="/history">
              <Button
                variant="outline"
                className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <History className="h-4 w-4" />
                Lịch sử
              </Button>
            </Link>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Salary<span className="text-yellow-300">Calc</span> VN
          </h1>
          <p className="text-white/80 text-lg md:text-xl">
            Công cụ tính lương Gross ↔ Net chính xác cho Việt Nam
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="monthly" className="gap-2">
              <Calculator className="h-4 w-4" />
              Lương tháng
            </TabsTrigger>
            <TabsTrigger value="annual" className="gap-2">
              <Calendar className="h-4 w-4" />
              Thu nhập năm
            </TabsTrigger>
            <TabsTrigger value="growth" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Tăng trưởng
            </TabsTrigger>
          </TabsList>

          {/* Monthly Calculation Tab */}
          <TabsContent value="monthly">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <SalaryInputForm
                  onCalculate={handleCalculate}
                  isLoading={isCalculating}
                />
              </motion.div>

              <AnimatePresence mode="wait">
                {isCalculating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ResultSkeleton />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key={`result-${mode}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ResultCard result={result} mode={mode} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center"
                  >
                    <div className="glass-subtle rounded-2xl p-8 text-center">
                      <p className="text-white/70 text-lg">
                        Nhập thông tin và nhấn tính toán để xem kết quả
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Charts Section */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 space-y-6"
                >
                  {/* Charts Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <TaxChart result={result} />
                    <SalaryBreakdownChart result={result} />
                  </div>

                  {/* Tax Breakdown */}
                  <TaxBreakdown
                    taxableIncome={result.monthlyBreakdown.taxableIncome}
                    totalTax={result.monthlyBreakdown.tax}
                  />

                  {/* Tax Comparison (only show if there are savings) */}
                  <TaxComparison taxableIncome={result.monthlyBreakdown.taxableIncome} />

                  {/* Insurance Breakdown */}
                  <InsuranceBreakdown result={result} />

                  {/* AI Assistant */}
                  {lastInput && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <AIAssistant
                        result={convertToCalculatorResult(result, lastInput.dependents)}
                        variant="panel"
                        className="h-[600px]"
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Annual Compensation Tab */}
          <TabsContent value="annual">
            {result ? (
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AnnualInputForm
                    monthlySalary={result.gross}
                    dependents={lastInput?.dependents || 0}
                    region={lastInput?.region || 'I'}
                    onCalculate={handleAnnualCalculate}
                    isLoading={isCalculating}
                  />
                </motion.div>

                <AnimatePresence>
                  {annualResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <AnnualResultCard result={annualResult} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-subtle rounded-2xl p-12 text-center"
              >
                <Calendar className="h-16 w-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/70 text-lg">
                  Vui lòng tính lương tháng trước để xem thu nhập năm
                </p>
              </motion.div>
            )}
          </TabsContent>

          {/* Salary Growth Tab */}
          <TabsContent value="growth">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GrowthInputForm
                  onCalculate={handleGrowthCalculate}
                  isLoading={isCalculating}
                  defaultValues={lastInput ? {
                    currentSalary: result?.gross || lastInput.salary,
                    dependents: lastInput.dependents,
                    region: lastInput.region,
                  } : undefined}
                />
              </motion.div>

              <AnimatePresence>
                {growthResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GrowthResultCard projection={growthResult} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <motion.div
          className="mt-12 text-center text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>
            Tính toán theo quy định thuế TNCN và bảo hiểm 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}
