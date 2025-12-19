'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { History, Calculator, Calendar, TrendingUp, BarChart3, PiggyBank, Target, Zap, Type } from 'lucide-react';
import { PastelGlassCard } from '@/components/ui/pastel-glass-card';
import { PastelGlassButton } from '@/components/ui/pastel-glass-button';
import { SalaryInputForm } from '@/components/calculator/salary-input-form';
import { ResultCard } from '@/components/calculator/result-card';
import { TaxChart } from '@/components/calculator/tax-chart';
import { SalaryBreakdownChart } from '@/components/calculator/salary-breakdown-chart';
import { InsuranceBreakdown } from '@/components/calculator/insurance-breakdown';
import { ResultSkeleton } from '@/components/shared/result-skeleton';
import { TaxBreakdown } from '@/components/calculator/tax-breakdown';
import { TaxComparison } from '@/components/calculator/tax-comparison';
import { AnnualInputForm } from '@/components/annual-compensation/annual-input-form';
import { AnnualResultCard } from '@/components/annual-compensation/annual-result-card';
import { GrowthInputForm } from '@/components/salary-growth/growth-input-form';
import { GrowthResultCard } from '@/components/salary-growth/growth-result-card';
import { calculateNetFromGross } from '@/lib/calculations/gross-to-net';
import { calculateGrossFromNet } from '@/lib/calculations/net-to-gross';
import { calculateAnnualCompensation } from '@/lib/calculations/annual-compensation';
import { calculateSalaryGrowth } from '@/lib/calculations/salary-growth';
import { saveCalculation } from '@/lib/storage/local-storage';
import { AIAssistant } from '@/components/calculator/ai-assistant';
import { convertToCalculatorResult } from '@/lib/utils/ai-helper';
import type { SalaryResult, AnnualCompensation, SalaryGrowthProjection, BonusInput, SalaryGrowthInput } from '@/types/salary';
import type { SalaryFormValues } from '@/lib/validators/salary-schema';
import { BackgroundElements } from '@/components/ui/background-elements';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import {
  trackSalaryCalculation,
  trackTaxCalculation,
  trackFeatureUsage,
  trackUserInteraction,
  trackFormSubmission,
  trackHistoryAccess
} from '@/lib/analytics';

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

    // Track salary calculation
    trackSalaryCalculation(
      calculationMode === 'gross-to-net' ? values.salary : newResult.gross,
      calculationMode === 'gross-to-net' ? newResult.net : values.salary,
      values.region
    );

    // Track tax calculation details
    trackTaxCalculation(
      newResult.monthlyBreakdown.tax,
      newResult.insurance.bhxh,
      newResult.insurance.bhyt,
      newResult.insurance.bhtn
    );

    // Track calculation mode
    trackFeatureUsage('calculator', calculationMode);

    // Track form submission success
    trackFormSubmission('salary_calculation', true);

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

    // Track annual compensation calculation
    trackFeatureUsage('annual_compensation', 'calculate_annual');

    // Track bonuses calculation
    const totalBonuses = (bonuses.month13Salary || 0) + (bonuses.kpiBonus || 0) + (bonuses.performanceBonus || 0) + (bonuses.otherBonus || 0);
    if (totalBonuses > 0) {
      trackFeatureUsage('bonus_calculation', 'include_bonuses');
    }

    setIsCalculating(false);
  };

  const handleGrowthCalculate = async (input: SalaryGrowthInput) => {
    setIsCalculating(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const newGrowthResult = calculateSalaryGrowth(input);
    setGrowthResult(newGrowthResult);

    // Track salary growth calculation
    trackFeatureUsage('salary_growth', 'calculate_growth_projection');

    // Track growth calculation
    trackUserInteraction(`projection_${input.yearsOfExperience}_years`, 'growth_calculator');

    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundElements />
      <div className="max-w-7xl mx-auto relative z-10 p-4 md:p-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-end gap-3 mb-4">

            <Link href="/history" onClick={() => trackHistoryAccess()}>
              <PastelGlassButton
                variant="secondary"
                size="sm"
                icon={<History className="h-4 w-4" />}
              >
                Lịch sử
              </PastelGlassButton>
            </Link>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Tia Sáng Tài Chính
          </h1>
          <p className="text-slate-700 text-lg md:text-xl">
            Hiểu rõ thu nhập, tối ưu tài chính
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            trackFeatureUsage('calculator', `tab_switch_to_${value}`);
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl p-1">
            <TabsTrigger
              value="monthly"
              className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=inactive]:text-black transition-all"
            >
              <Calculator className="h-4 w-4" />
              Lương tháng
            </TabsTrigger>
            <TabsTrigger
              value="annual"
              className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=inactive]:text-black transition-all"
            >
              <Calendar className="h-4 w-4" />
              Thu nhập năm
            </TabsTrigger>
            <TabsTrigger
              value="growth"
              className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=inactive]:text-black transition-all"
            >
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
                <PastelGlassCard glow="blue">
                  <SalaryInputForm
                    onCalculate={handleCalculate}
                    isLoading={isCalculating}
                  />
                </PastelGlassCard>
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
                    <PastelGlassCard>
                      <ResultSkeleton />
                    </PastelGlassCard>
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
                    <PastelGlassCard className="text-center p-8">
                      <div className="space-y-6">
                        {/* Icon Grid */}
                        <div className="flex justify-center gap-4 mb-6">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="p-3 bg-purple-100 rounded-full"
                          >
                            <Calculator className="h-6 w-6 text-purple-600" />
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="p-3 bg-blue-100 rounded-full"
                          >
                            <BarChart3 className="h-6 w-6 text-blue-600" />
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="p-3 bg-green-100 rounded-full"
                          >
                            <PiggyBank className="h-6 w-6 text-green-600" />
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="p-3 bg-yellow-100 rounded-full"
                          >
                            <Target className="h-6 w-6 text-yellow-600" />
                          </motion.div>
                        </div>

                        {/* Typewriter Effect */}
                        <div className="h-8 flex items-center justify-center">
                          <TypewriterEffect
                            words={[
                              { text: "Nhập thông tin và nhấn tính toán để xem kết quả" },
                              { text: "Tính toán lương Gross, Net và các loại thuế" },
                              { text: "Tối ưu hóa thu nhập của bạn ngay hôm nay" },
                              { text: "Công cụ tính lương chính xác nhất Việt Nam" }
                            ]}
                            className="text-xl font-medium"
                            isOn={false}
                          />
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Zap className="h-4 w-4 text-purple-600" />
                              <span className="text-black/60">Nhanh chóng</span>
                            </div>
                            <p className="text-black font-semibold">Tính trong 0.3s</p>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-lg"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <TrendingUp className="h-4 w-4 text-blue-600" />
                              <span className="text-black/60">Chính xác</span>
                            </div>
                            <p className="text-black font-semibold">99.9% độ chính xác</p>
                          </motion.div>
                        </div>
                      </div>
                    </PastelGlassCard>
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
                  {/* {lastInput && (
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
                  )} */}
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
                  <PastelGlassCard glow="purple">
                    <AnnualInputForm
                      monthlySalary={result.gross}
                      dependents={lastInput?.dependents || 0}
                      region={lastInput?.region || 'I'}
                      onCalculate={handleAnnualCalculate}
                      isLoading={isCalculating}
                    />
                  </PastelGlassCard>
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
              >
                <PastelGlassCard className="p-12 flex items-center justify-center flex-col">
                  <Calendar className="h-16 w-16 text-black/40 mx-auto mb-4" />
                  <div className="text-black/60 text-lg">
                    <TypewriterEffect
                      words={[
                        { text: "Vui lòng tính lương tháng trước để xem thu nhập năm" },
                        { text: "Tính lương tháng để tiếp tục tính thu nhập năm" },
                        { text: "Chuyển sang tab Lương tháng để bắt đầu" }
                      ]}
                      isOn={false}
                    />
                  </div>
                </PastelGlassCard>
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
                <PastelGlassCard glow="pink">
                  <GrowthInputForm
                    onCalculate={handleGrowthCalculate}
                    isLoading={isCalculating}
                    defaultValues={lastInput ? {
                      currentSalary: result?.gross || lastInput.salary,
                      dependents: lastInput.dependents,
                      region: lastInput.region,
                    } : undefined}
                  />
                </PastelGlassCard>
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
          className="mt-12 text-center text-dark-muted-text text-sm"
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
