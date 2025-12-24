'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { GlassCard } from '@/components/shared/glass-card';
import type {
  TaxSettlement,
  TaxSettlementPersonalInfo,
  IncomeSource,
  TaxSettlementDependent,
} from '@/types/tax-settlement';
import { calculateTaxSettlement } from '@/lib/calculations/tax-settlement';
import { saveSettlement } from '@/lib/storage/settlement-storage';
import { FileText, User, Briefcase, Users, Calculator } from 'lucide-react';

// Step components (to be created)
import PersonalInfoStep from '@/components/tax-settlement/wizard/personal-info-step';
import IncomeStep from '@/components/tax-settlement/wizard/income-step';
import DependentStep from '@/components/tax-settlement/wizard/dependent-step';
import ResultsStep from '@/components/tax-settlement/wizard/results-step';

const STEPS = [
  {
    id: 'personal-info',
    label: 'Thông tin cá nhân',
    icon: User,
    description: 'Nhập thông tin cơ bản',
  },
  {
    id: 'income',
    label: 'Thu nhập',
    icon: Briefcase,
    description: 'Thêm nguồn thu nhập',
  },
  {
    id: 'dependents',
    label: 'Người phụ thuộc',
    icon: Users,
    description: 'Đăng ký người phụ thuộc',
  },
  {
    id: 'results',
    label: 'Kết quả',
    icon: Calculator,
    description: 'Xem kết quả quyết toán',
  },
];

export default function TaxSettlementPage() {
  const [activeTab, setActiveTab] = useState('personal-info');
  const [settlement, setSettlement] = useState<Partial<TaxSettlement>>({
    id: crypto.randomUUID(),
    year: 2026,
    incomeSources: [],
    dependents: [],
    status: 'draft',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  // Tab enablement logic
  const isTabEnabled = (tabId: string): boolean => {
    switch (tabId) {
      case 'personal-info':
        return true; // Always enabled
      case 'income':
        return !!settlement.personalInfo;
      case 'dependents':
        return (
          !!settlement.personalInfo && (settlement.incomeSources?.length ?? 0) > 0
        );
      case 'results':
        return !!settlement.calculation;
      default:
        return false;
    }
  };

  // Get next enabled tab
  const getNextEnabledTab = (currentTab: string): string => {
    const tabs = STEPS.map((s) => s.id);
    const currentIndex = tabs.indexOf(currentTab);

    for (let i = currentIndex + 1; i < tabs.length; i++) {
      if (isTabEnabled(tabs[i])) {
        return tabs[i];
      }
    }
    return currentTab;
  };

  // Get previous enabled tab
  const getPreviousEnabledTab = (currentTab: string): string => {
    const tabs = STEPS.map((s) => s.id);
    const currentIndex = tabs.indexOf(currentTab);

    for (let i = currentIndex - 1; i >= 0; i--) {
      if (isTabEnabled(tabs[i])) {
        return tabs[i];
      }
    }
    return currentTab;
  };

  // Update handlers
  const handlePersonalInfoUpdate = (info: TaxSettlementPersonalInfo) => {
    setSettlement((prev) => ({
      ...prev,
      personalInfo: info,
      updatedAt: Date.now(),
    }));
  };

  const handleIncomeSourceAdd = (source: IncomeSource) => {
    setSettlement((prev) => ({
      ...prev,
      incomeSources: [...(prev.incomeSources || []), source],
      updatedAt: Date.now(),
    }));
  };

  const handleIncomeSourceUpdate = (id: string, updates: Partial<IncomeSource>) => {
    setSettlement((prev) => ({
      ...prev,
      incomeSources: (prev.incomeSources || []).map((source) =>
        source.id === id ? { ...source, ...updates } : source
      ),
      updatedAt: Date.now(),
    }));
  };

  const handleIncomeSourceDelete = (id: string) => {
    setSettlement((prev) => ({
      ...prev,
      incomeSources: (prev.incomeSources || []).filter((source) => source.id !== id),
      updatedAt: Date.now(),
    }));
  };

  const handleDependentAdd = (dependent: TaxSettlementDependent) => {
    setSettlement((prev) => ({
      ...prev,
      dependents: [...(prev.dependents || []), dependent],
      updatedAt: Date.now(),
    }));
  };

  const handleDependentUpdate = (
    id: string,
    updates: Partial<TaxSettlementDependent>
  ) => {
    setSettlement((prev) => ({
      ...prev,
      dependents: (prev.dependents || []).map((dep) =>
        dep.id === id ? { ...dep, ...updates } : dep
      ),
      updatedAt: Date.now(),
    }));
  };

  const handleDependentDelete = (id: string) => {
    setSettlement((prev) => ({
      ...prev,
      dependents: (prev.dependents || []).filter((dep) => dep.id !== id),
      updatedAt: Date.now(),
    }));
  };

  const handleCalculate = () => {
    if (!settlement.personalInfo || !settlement.incomeSources) return;

    const result = calculateTaxSettlement(
      settlement.incomeSources,
      settlement.dependents || [],
      settlement.personalInfo.year
    );

    setSettlement((prev) => ({
      ...prev,
      calculation: result,
      status: 'completed',
      updatedAt: Date.now(),
    }));

    setActiveTab('results');
  };

  const handleSave = () => {
    if (!settlement.id || !settlement.personalInfo) return;

    const completeSettlement: TaxSettlement = {
      id: settlement.id,
      year: settlement.personalInfo.year,
      createdAt: settlement.createdAt || Date.now(),
      updatedAt: Date.now(),
      status: settlement.status || 'draft',
      personalInfo: settlement.personalInfo,
      incomeSources: settlement.incomeSources || [],
      dependents: settlement.dependents || [],
      calculation: settlement.calculation || null,
    };

    saveSettlement(completeSettlement);
  };

  const handleReset = () => {
    setSettlement({
      id: crypto.randomUUID(),
      year: 2026,
      incomeSources: [],
      dependents: [],
      status: 'draft',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    setActiveTab('personal-info');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-12 w-12 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Quyết Toán Thuế TNCN
            </h1>
          </div>
          <p className="text-lg text-black/70">
            Tính toán quyết toán thuế thu nhập cá nhân năm 2026
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div variants={itemVariants} className="mb-8">
          <GlassCard variant="subtle" className="p-6">
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isCurrent = activeTab === step.id;
                const isEnabled = isTabEnabled(step.id);
                const isCompleted = STEPS.findIndex((s) => s.id === activeTab) > index;

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <button
                      onClick={() => isEnabled && setActiveTab(step.id)}
                      disabled={!isEnabled}
                      className={`flex flex-col items-center gap-2 flex-1 transition-all ${
                        isEnabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                          isCurrent
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 text-white scale-110'
                            : isCompleted
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'bg-white/50 border-black/20 text-black/50'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-sm font-semibold ${
                            isCurrent ? 'text-purple-600' : 'text-black/70'
                          }`}
                        >
                          {step.label}
                        </div>
                        <div className="text-xs text-black/50 hidden md:block">
                          {step.description}
                        </div>
                      </div>
                    </button>
                    {index < STEPS.length - 1 && (
                      <div className="flex-1 h-0.5 bg-black/10 mx-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Wizard Content */}
        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <AnimatePresence mode="wait">
              <TabsContent value="personal-info" key="personal-info">
                <PersonalInfoStep
                  data={settlement.personalInfo}
                  onUpdate={handlePersonalInfoUpdate}
                  onNext={() => setActiveTab('income')}
                />
              </TabsContent>

              <TabsContent value="income" key="income">
                <IncomeStep
                  sources={settlement.incomeSources || []}
                  onAdd={handleIncomeSourceAdd}
                  onUpdate={handleIncomeSourceUpdate}
                  onDelete={handleIncomeSourceDelete}
                  onCalculate={handleCalculate}
                  onNext={() => setActiveTab('dependents')}
                  onBack={() => setActiveTab('personal-info')}
                />
              </TabsContent>

              <TabsContent value="dependents" key="dependents">
                <DependentStep
                  dependents={settlement.dependents || []}
                  year={settlement.personalInfo?.year || 2026}
                  onAdd={handleDependentAdd}
                  onUpdate={handleDependentUpdate}
                  onDelete={handleDependentDelete}
                  onCalculate={handleCalculate}
                  onBack={() => setActiveTab('income')}
                />
              </TabsContent>

              <TabsContent value="results" key="results">
                <ResultsStep
                  settlement={settlement as TaxSettlement}
                  onSave={handleSave}
                  onReset={handleReset}
                />
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}
