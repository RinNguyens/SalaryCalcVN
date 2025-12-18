'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/shared/glass-card';
import { SkillForm } from '@/components/salary-estimator/skill-form';
import { ExperienceForm } from '@/components/salary-estimator/experience-form';
import { LocationForm } from '@/components/salary-estimator/location-form';
import { SalaryResults } from '@/components/salary-estimator/salary-results';
import { calculateSalaryEstimate } from '@/lib/calculations/salary-estimation';
import { saveEstimation } from '@/lib/storage/salary-estimator-storage';
import type { SalaryEstimateRequest, SalaryEstimate } from '@/types/salary-estimator';
import { RemotePreference, CompanySize } from '@/types/salary-estimator';
import {
  Code,
  TrendingUp,
  MapPin,
  Briefcase,
  Calculator,
  Target,
  Sparkles
} from 'lucide-react';

export default function SalaryEstimatorPage() {
  const [activeTab, setActiveTab] = useState('skills');
  const [formData, setFormData] = useState<Partial<SalaryEstimateRequest>>({});
  const [estimate, setEstimate] = useState<SalaryEstimate | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSkillsUpdate = (skills: any) => {
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleExperienceUpdate = (experience: any) => {
    setFormData(prev => ({ ...prev, experience }));
  };

  const handleLocationUpdate = (location: any) => {
    setFormData(prev => ({ ...prev, location, preferences: location.preferences }));
  };

  const handleCalculate = async () => {
    if (!formData.skills || formData.skills.length === 0) {
      alert('Vui lòng nhập ít nhất một kỹ năng');
      return;
    }

    setIsCalculating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const request: SalaryEstimateRequest = {
        skills: formData.skills,
        experience: formData.experience || {
          totalYears: 0,
          relevantYears: 0,
          managementYears: 0,
          overseasYears: 0,
        },
        education: formData.education || [],
        workHistory: formData.workHistory || [],
        location: formData.location || {
          city: 'Ho Chi Minh',
          country: 'Vietnam',
          region: 'South',
          remoteWorkPreference: RemotePreference.HYBRID,
        },
        preferences: formData.preferences || {
          workType: 'full_time',
          companySize: CompanySize.MEDIUM,
          industry: ['tech'],
          workLifeBalancePriority: 7,
          careerGrowthPriority: 8,
          salaryNegotiable: true,
        },
      };

      const result = calculateSalaryEstimate(request);
      setEstimate(result);
      setActiveTab('results');

      // Save estimation
      saveEstimation(request, result);
    } catch (error) {
      console.error('Error calculating salary:', error);
      alert('Có lỗi xảy ra khi tính toán. Vui lòng thử lại.');
    }

    setIsCalculating(false);
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
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
            Ước tính<span className="text-yellow-300"> Lương</span>
          </h1>
          <p className="text-black/80 text-lg md:text-xl">
            Tính lương dựa trên kỹ năng, kinh nghiệm và thị trường
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            {[
              { id: 'skills', label: 'Kỹ năng', icon: Code },
              { id: 'experience', label: 'Kinh nghiệm', icon: Briefcase },
              { id: 'location', label: 'Địa điểm', icon: MapPin },
              { id: 'results', label: 'Kết quả', icon: Target },
            ].map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <motion.div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    activeTab === step.id
                      ? 'bg-white/20 text-black'
                      : 'bg-white/10 text-black/60'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (step.id !== 'results' || estimate) {
                      setActiveTab(step.id);
                    }
                  }}
                >
                  <step.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{step.label}</span>
                </motion.div>
                {index < 3 && (
                  <div className="hidden sm:block text-black/40">→</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="skills">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <SkillForm
                skills={formData.skills || []}
                onUpdate={handleSkillsUpdate}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="experience">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <ExperienceForm
                data={formData}
                onUpdate={handleExperienceUpdate}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="location">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <LocationForm
                data={formData}
                onUpdate={handleLocationUpdate}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="results">
            {estimate ? (
              <SalaryResults estimate={estimate} formData={formData} />
            ) : (
              <motion.div
                className="glass-subtle rounded-2xl p-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Calculator className="h-16 w-16 text-black/50 mx-auto mb-4" />
                <p className="text-black/70 text-lg">
                  Vui lòng hoàn thành thông tin để nhận kết quả ước tính lương
                </p>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        {activeTab !== 'results' && (
          <motion.div
            className="flex justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {activeTab !== 'skills' && (
              <Button
                variant="outline"
                onClick={() => {
                  const tabs = ['skills', 'experience', 'location'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex > 0) {
                    setActiveTab(tabs[currentIndex - 1]);
                  }
                }}
                className="bg-white/10 border-white/20 text-black hover:bg-white/20"
              >
                Quay lại
              </Button>
            )}

            {activeTab === 'location' ? (
              <Button
                onClick={handleCalculate}
                disabled={isCalculating}
                className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 min-w-[150px]"
              >
                {isCalculating ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Đang tính...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Ước tính lương
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const tabs = ['skills', 'experience', 'location'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1]);
                  }
                }}
                className="gap-2 bg-white/20 border-white/30 text-black hover:bg-white/30"
              >
                Tiếp tục
                <TrendingUp className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        )}

        {/* Info Card */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="p-6 inline-block">
            <p className="text-black/80 text-sm">
              <span className="font-semibold">💡 Mẹo:</span> Càng nhiều kỹ năng và chi tiết bạn cung cấp,
              kết quả ước tính càng chính xác
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}