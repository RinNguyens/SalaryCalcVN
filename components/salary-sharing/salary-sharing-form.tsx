'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  Users,
  TrendingUp,
  Award,
  Target,
  CheckCircle2,
  AlertCircle,
  Lock,
  Mail,
  Linkedin,
  FileText,
  Clock,
  Heart,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GlassCard } from '@/components/shared/glass-card';
import { formatCurrency } from '@/lib/utils/format-currency';
import type { SalaryShareForm } from '@/types/salary-sharing';
import {
  INDUSTRY_CATEGORIES,
  COMPANY_SIZE_CATEGORIES,
  POSITION_LEVELS,
  EDUCATION_LEVELS,
  COMMON_TECHNICAL_SKILLS,
  COMMON_SOFT_SKILLS,
  COMMON_LANGUAGES,
} from '@/types/salary-sharing';

const salaryShareSchema = z.object({
  // Step 1: Company & Position
  companyIndustry: z.string().min(1, 'Industry is required'),
  companySize: z.string().min(1, 'Company size is required'),
  companyLocation: z.string().min(1, 'Location is required'),
  companyType: z.enum(['local', 'multinational', 'startup', 'government']),
  positionTitle: z.string().min(1, 'Position title is required'),
  positionLevel: z.string().min(1, 'Position level is required'),
  positionDepartment: z.string().min(1, 'Department is required'),
  positionField: z.string().min(1, 'Field is required'),

  // Step 2: Compensation
  baseSalary: z.number().min(1000000, 'Base salary must be at least 1M VND'),
  performanceBonus: z.number().min(0),
  signingBonus: z.number().min(0),
  thirteenthMonth: z.number().min(0),
  otherBonuses: z.number().min(0),
  healthInsurance: z.number().min(0),
  mealAllowance: z.number().min(0),
  transportAllowance: z.number().min(0),
  phoneAllowance: z.number().min(0),
  internetAllowance: z.number().min(0),
  gymAllowance: z.number().min(0),
  learningBudget: z.number().min(0),
  otherBenefits: z.number().min(0),

  // Step 3: Experience
  totalExperience: z.number().min(0).max(50),
  relevantExperience: z.number().min(0).max(50),
  managementExperience: z.number().min(0).max(50),
  companyExperience: z.number().min(0).max(50),
  educationLevel: z.enum(['high_school', 'bachelor', 'master', 'phd', 'professional']),
  educationField: z.string().min(1, 'Education field is required'),
  hasRelevantDegree: z.boolean(),

  // Step 4: Skills
  technicalSkills: z.array(z.string()),
  softSkills: z.array(z.string()),
  languages: z.array(z.string()),
  certifications: z.array(z.string()),

  // Step 5: Work Details
  workingDaysPerWeek: z.number().min(1).max(7).default(5),
  workingHoursPerDay: z.number().min(1).max(16).default(8),
  remoteDaysPerWeek: z.number().min(0).max(7).default(0),
  overtimeFrequency: z.enum(['rare', 'sometimes', 'often', 'always']),
  overtimePaid: z.boolean(),
  lastPromotion: z.string().optional(),
  nextPromotionExpected: z.string().optional(),
  reviewCycle: z.string().optional(),
  trainingOpportunities: z.boolean(),
  careerProgression: z.enum(['fast', 'normal', 'slow', 'stagnant']),

  // Step 6: Satisfaction
  overallSatisfaction: z.number().min(1).max(10),
  salarySatisfaction: z.number().min(1).max(10),
  workLifeBalanceSatisfaction: z.number().min(1).max(10),
  benefitsSatisfaction: z.number().min(1).max(10),
  cultureSatisfaction: z.number().min(1).max(10),
  growthSatisfaction: z.number().min(1).max(10),

  // Step 7: Sharing
  isPublicShare: z.boolean(),
  shareInComparisons: z.boolean(),
  shareInStatistics: z.boolean(),
  allowContact: z.boolean(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
  verificationMethod: z.enum(['email', 'linkedin', 'paystub', 'none']),
});

type FormData = z.infer<typeof salaryShareSchema>;

interface SalarySharingFormProps {
  onSubmit: (data: SalaryShareForm) => void;
  onCancel?: () => void;
}

export function SalarySharingForm({ onSubmit, onCancel }: SalarySharingFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTechnicalSkills, setSelectedTechnicalSkills] = useState<string[]>([]);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(salaryShareSchema),
    defaultValues: {
      companyType: 'local',
      baseSalary: 0,
      performanceBonus: 0,
      signingBonus: 0,
      thirteenthMonth: 0,
      otherBonuses: 0,
      healthInsurance: 0,
      mealAllowance: 0,
      transportAllowance: 0,
      phoneAllowance: 0,
      internetAllowance: 0,
      gymAllowance: 0,
      learningBudget: 0,
      otherBenefits: 0,
      totalExperience: 0,
      relevantExperience: 0,
      managementExperience: 0,
      companyExperience: 0,
      hasRelevantDegree: true,
      technicalSkills: [],
      softSkills: [],
      languages: [],
      certifications: [],
      workingDaysPerWeek: 5,
      workingHoursPerDay: 8,
      remoteDaysPerWeek: 0,
      overtimeFrequency: 'rare',
      overtimePaid: false,
      lastPromotion: '',
      nextPromotionExpected: '',
      reviewCycle: '',
      trainingOpportunities: false,
      careerProgression: 'normal',
      overallSatisfaction: 5,
      salarySatisfaction: 5,
      workLifeBalanceSatisfaction: 5,
      benefitsSatisfaction: 5,
      cultureSatisfaction: 5,
      growthSatisfaction: 5,
      isPublicShare: true,
      shareInComparisons: true,
      shareInStatistics: true,
      allowContact: false,
      contactEmail: '',
      agreeToTerms: false,
      verificationMethod: 'email',
    },
  });

  const totalCompensation =
    form.watch('baseSalary') +
    form.watch('performanceBonus') / 12 +
    form.watch('healthInsurance') +
    form.watch('mealAllowance') +
    form.watch('transportAllowance') +
    form.watch('phoneAllowance') +
    form.watch('internetAllowance') +
    form.watch('gymAllowance') +
    (form.watch('learningBudget') / 12);

  const steps = [
    {
      id: 'company',
      title: 'Company & Position',
      icon: Users,
      description: 'Tell us about your company and role',
    },
    {
      id: 'compensation',
      title: 'Compensation',
      icon: TrendingUp,
      description: 'Share your salary and benefits',
    },
    {
      id: 'experience',
      title: 'Experience',
      icon: Award,
      description: 'Your background and education',
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: Target,
      description: 'Your technical and soft skills',
    },
    {
      id: 'work',
      title: 'Work Details',
      icon: Clock,
      description: 'Your work arrangement and career',
    },
    {
      id: 'satisfaction',
      title: 'Satisfaction',
      icon: Heart,
      description: 'How satisfied are you?',
    },
    {
      id: 'sharing',
      title: 'Sharing',
      icon: Shield,
      description: 'Privacy and verification settings',
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (data: FormData) => {
    if (currentStep === steps.length - 1) {
      onSubmit(data as SalaryShareForm);
    } else {
      nextStep();
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 100 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.2 } },
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Company & Position
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Company Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyIndustry">Industry *</Label>
                <Controller
                  name="companyIndustry"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRY_CATEGORIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="companySize">Company Size *</Label>
                <Controller
                  name="companySize"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPANY_SIZE_CATEGORIES.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="companyLocation">Location *</Label>
                <Input
                  id="companyLocation"
                  {...form.register('companyLocation')}
                  placeholder="e.g., Ho Chi Minh City"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="companyType">Company Type *</Label>
                <Controller
                  name="companyType"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Company</SelectItem>
                        <SelectItem value="multinational">Multinational</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="government">Government/Public</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <Separator className="bg-white/20" />

            <h3 className="text-xl font-semibold text-white mb-4">Position Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="positionTitle">Position Title *</Label>
                <Input
                  id="positionTitle"
                  {...form.register('positionTitle')}
                  placeholder="e.g., Senior Software Engineer"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="positionLevel">Level *</Label>
                <Controller
                  name="positionLevel"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {POSITION_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="positionDepartment">Department *</Label>
                <Input
                  id="positionDepartment"
                  {...form.register('positionDepartment')}
                  placeholder="e.g., Engineering"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="positionField">Field *</Label>
                <Input
                  id="positionField"
                  {...form.register('positionField')}
                  placeholder="e.g., Software Development"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>
            </div>
          </div>
        );

      case 1: // Compensation
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Base Salary</h3>

            <div>
              <Label htmlFor="baseSalary">Monthly Base Salary (VND) *</Label>
              <Input
                id="baseSalary"
                type="number"
                {...form.register('baseSalary', { valueAsNumber: true })}
                placeholder="0"
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
              />
              {form.watch('baseSalary') > 0 && (
                <p className="text-white/60 text-sm mt-1">
                  {formatCurrency(form.watch('baseSalary'))}
                </p>
              )}
            </div>

            <Separator className="bg-white/20" />

            <h3 className="text-xl font-semibold text-white mb-4">Bonuses (Annual)</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="performanceBonus">Performance Bonus</Label>
                <Input
                  id="performanceBonus"
                  type="number"
                  {...form.register('performanceBonus', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="signingBonus">Signing Bonus</Label>
                <Input
                  id="signingBonus"
                  type="number"
                  {...form.register('signingBonus', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="thirteenthMonth">13th Month Salary</Label>
                <Input
                  id="thirteenthMonth"
                  type="number"
                  {...form.register('thirteenthMonth', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="otherBonuses">Other Bonuses</Label>
                <Input
                  id="otherBonuses"
                  type="number"
                  {...form.register('otherBonuses', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>
            </div>

            <Separator className="bg-white/20" />

            <h3 className="text-xl font-semibold text-white mb-4">Benefits (Monthly)</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="healthInsurance">Health Insurance</Label>
                <Input
                  id="healthInsurance"
                  type="number"
                  {...form.register('healthInsurance', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="mealAllowance">Meal Allowance</Label>
                <Input
                  id="mealAllowance"
                  type="number"
                  {...form.register('mealAllowance', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="transportAllowance">Transport Allowance</Label>
                <Input
                  id="transportAllowance"
                  type="number"
                  {...form.register('transportAllowance', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="phoneAllowance">Phone Allowance</Label>
                <Input
                  id="phoneAllowance"
                  type="number"
                  {...form.register('phoneAllowance', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="internetAllowance">Internet Allowance</Label>
                <Input
                  id="internetAllowance"
                  type="number"
                  {...form.register('internetAllowance', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="gymAllowance">Gym/Sports Allowance</Label>
                <Input
                  id="gymAllowance"
                  type="number"
                  {...form.register('gymAllowance', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="learningBudget">Learning Budget (Annual)</Label>
                <Input
                  id="learningBudget"
                  type="number"
                  {...form.register('learningBudget', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="otherBenefits">Other Benefits</Label>
                <Input
                  id="otherBenefits"
                  type="number"
                  {...form.register('otherBenefits', { valueAsNumber: true })}
                  placeholder="0"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>
            </div>

            <GlassCard className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
              <h4 className="text-lg font-semibold text-white mb-2">Total Monthly Compensation</h4>
              <p className="text-3xl font-bold text-green-300">
                {formatCurrency(totalCompensation)}
              </p>
              <p className="text-white/60 text-sm mt-1">
                Base + Average Monthly Bonuses + Benefits
              </p>
            </GlassCard>
          </div>
        );

      case 2: // Experience
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Work Experience</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalExperience">Total Years of Experience</Label>
                <Controller
                  name="totalExperience"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Slider
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-white/60">
                        <span>0</span>
                        <span className="text-white font-semibold">{field.value} years</span>
                        <span>50</span>
                      </div>
                    </div>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="relevantExperience">Relevant Years of Experience</Label>
                <Controller
                  name="relevantExperience"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Slider
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-white/60">
                        <span>0</span>
                        <span className="text-white font-semibold">{field.value} years</span>
                        <span>50</span>
                      </div>
                    </div>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="managementExperience">Management Experience</Label>
                <Controller
                  name="managementExperience"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Slider
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-white/60">
                        <span>0</span>
                        <span className="text-white font-semibold">{field.value} years</span>
                        <span>50</span>
                      </div>
                    </div>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="companyExperience">Years at Current Company</Label>
                <Controller
                  name="companyExperience"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Slider
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-white/60">
                        <span>0</span>
                        <span className="text-white font-semibold">{field.value} years</span>
                        <span>50</span>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>

            <Separator className="bg-white/20" />

            <h3 className="text-xl font-semibold text-white mb-4">Education</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="educationLevel">Highest Education Level</Label>
                <Controller
                  name="educationLevel"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {EDUCATION_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="educationField">Field of Study</Label>
                <Input
                  id="educationField"
                  {...form.register('educationField')}
                  placeholder="e.g., Computer Science"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Controller
                name="hasRelevantDegree"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label className="text-white">
                My degree is relevant to my current position
              </Label>
            </div>
          </div>
        );

      case 3: // Skills
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>

            <div className="flex flex-wrap gap-2">
              {COMMON_TECHNICAL_SKILLS.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedTechnicalSkills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedTechnicalSkills.includes(skill)
                      ? "bg-blue-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  onClick={() => {
                    setSelectedTechnicalSkills((prev) =>
                      prev.includes(skill)
                        ? prev.filter((s) => s !== skill)
                        : [...prev, skill]
                    );
                    form.setValue(
                      'technicalSkills',
                      selectedTechnicalSkills.includes(skill)
                        ? selectedTechnicalSkills.filter((s) => s !== skill)
                        : [...selectedTechnicalSkills, skill]
                    );
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <Separator className="bg-white/20" />

            <h3 className="text-xl font-semibold text-white mb-4">Soft Skills</h3>

            <div className="flex flex-wrap gap-2">
              {COMMON_SOFT_SKILLS.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSoftSkills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedSoftSkills.includes(skill)
                      ? "bg-green-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  onClick={() => {
                    setSelectedSoftSkills((prev) =>
                      prev.includes(skill)
                        ? prev.filter((s) => s !== skill)
                        : [...prev, skill]
                    );
                    form.setValue(
                      'softSkills',
                      selectedSoftSkills.includes(skill)
                        ? selectedSoftSkills.filter((s) => s !== skill)
                        : [...selectedSoftSkills, skill]
                    );
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <Separator className="bg-white/20" />

            <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>

            <div className="flex flex-wrap gap-2">
              {COMMON_LANGUAGES.map((language) => (
                <Badge
                  key={language}
                  variant={selectedLanguages.includes(language) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedLanguages.includes(language)
                      ? "bg-purple-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  onClick={() => {
                    setSelectedLanguages((prev) =>
                      prev.includes(language)
                        ? prev.filter((l) => l !== language)
                        : [...prev, language]
                    );
                    form.setValue(
                      'languages',
                      selectedLanguages.includes(language)
                        ? selectedLanguages.filter((l) => l !== language)
                        : [...selectedLanguages, language]
                    );
                  }}
                >
                  {language}
                </Badge>
              ))}
            </div>

            <Separator className="bg-white/20" />

            <h3 className="text-xl font-semibold text-white mb-4">Certifications</h3>

            <div>
              <Label htmlFor="certifications">Professional Certifications</Label>
              <Textarea
                id="certifications"
                placeholder="List your professional certifications (one per line)"
                className="bg-white/10 border-white/20 text-white placeholder-white/50 mt-2"
                rows={4}
                onChange={(e) => {
                  const certifications = e.target.value
                    .split('\n')
                    .filter((cert) => cert.trim() !== '');
                  form.setValue('certifications', certifications);
                }}
              />
            </div>
          </div>
        );

      case 4: // Work Details
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Work Arrangement</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workingDaysPerWeek">Working Days per Week</Label>
                <Controller
                  name="workingDaysPerWeek"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day} day{day > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="workingHoursPerDay">Working Hours per Day</Label>
                <Controller
                  name="workingHoursPerDay"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 16 }, (_, i) => i + 1).map((hour) => (
                          <SelectItem key={hour} value={hour.toString()}>
                            {hour} hour{hour > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="remoteDaysPerWeek">Remote Days per Week</Label>
                <Controller
                  name="remoteDaysPerWeek"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day} day{day > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="overtimeFrequency">Overtime Frequency</Label>
                <Controller
                  name="overtimeFrequency"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rare">Rarely</SelectItem>
                        <SelectItem value="sometimes">Sometimes</SelectItem>
                        <SelectItem value="often">Often</SelectItem>
                        <SelectItem value="always">Always</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Controller
                name="overtimePaid"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label className="text-white">
                Overtime is paid
              </Label>
            </div>

            <Separator className="bg-white/20" />

            <h3 className="text-xl font-semibold text-white mb-4">Career Growth</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastPromotion">Last Promotion</Label>
                <Input
                  id="lastPromotion"
                  {...form.register('lastPromotion')}
                  placeholder="e.g., 6 months ago"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="nextPromotionExpected">Expected Next Promotion</Label>
                <Input
                  id="nextPromotionExpected"
                  {...form.register('nextPromotionExpected')}
                  placeholder="e.g., in 1 year"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="reviewCycle">Performance Review Cycle</Label>
                <Input
                  id="reviewCycle"
                  {...form.register('reviewCycle')}
                  placeholder="e.g., Every 6 months"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div>
                <Label htmlFor="careerProgression">Career Progression</Label>
                <Controller
                  name="careerProgression"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select progression" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fast">Fast Track</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="slow">Slow</SelectItem>
                        <SelectItem value="stagnant">Stagnant</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Controller
                name="trainingOpportunities"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label className="text-white">
                Company provides training opportunities
              </Label>
            </div>
          </div>
        );

      case 5: // Satisfaction
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Job Satisfaction (1-10)</h3>

            <div className="space-y-4">
              {[
                { field: 'overallSatisfaction', label: 'Overall Satisfaction', icon: Heart },
                { field: 'salarySatisfaction', label: 'Salary Satisfaction', icon: DollarSign },
                { field: 'workLifeBalanceSatisfaction', label: 'Work-Life Balance', icon: Clock },
                { field: 'benefitsSatisfaction', label: 'Benefits', icon: Shield },
                { field: 'cultureSatisfaction', label: 'Company Culture', icon: Users },
                { field: 'growthSatisfaction', label: 'Career Growth', icon: TrendingUp },
              ].map(({ field, label, icon: Icon }) => (
                <div key={field} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-white/60" />
                    <Label className="text-white">{label}</Label>
                  </div>
                  <Controller
                    name={field as keyof FormData}
                    control={form.control}
                    render={({ field: controllerField }) => (
                      <div className="space-y-2">
                        <Slider
                          value={[controllerField.value]}
                          onValueChange={(value) => controllerField.onChange(value[0])}
                          max={10}
                          min={1}
                          step={1}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-sm text-white/60">
                          <span>1</span>
                          <span className="text-white font-semibold">{controllerField.value}</span>
                          <span>10</span>
                        </div>
                      </div>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 6: // Sharing & Privacy
        return (
          <div className="space-y-6">
            <GlassCard className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-blue-300 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Privacy & Anonymity</h3>
                  <p className="text-white/80 text-sm">
                    Your identity will be completely anonymous. We only store aggregated data
                    for salary comparison purposes. Personal information is never shared.
                  </p>
                </div>
              </div>
            </GlassCard>

            <h3 className="text-xl font-semibold text-white mb-4">Sharing Settings</h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Controller
                  name="isPublicShare"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <Label className="text-white">Make my salary data public</Label>
                  <p className="text-white/60 text-sm">
                    Others can see my anonymized salary data in comparisons
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Controller
                  name="shareInComparisons"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <Label className="text-white">Include in salary comparisons</Label>
                  <p className="text-white/60 text-sm">
                    My data can be used for anonymous salary comparisons
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Controller
                  name="shareInStatistics"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <Label className="text-white">Include in statistics</Label>
                  <p className="text-white/60 text-sm">
                    My anonymized data contributes to industry statistics
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Controller
                  name="allowContact"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <Label className="text-white">Allow anonymous contact</Label>
                  <p className="text-white/60 text-sm">
                    Others can send messages through our anonymous system
                  </p>
                </div>
              </div>

              {form.watch('allowContact') && (
                <div className="ml-6 mt-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    {...form.register('contactEmail')}
                    placeholder="your@email.com"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                </div>
              )}
            </div>

            <Separator className="bg-white/20" />

            <h3 className="text-xl font-semibold text-white mb-4">Verification (Optional)</h3>

            <p className="text-white/80 text-sm mb-4">
              Verification helps ensure data accuracy. You can choose to verify your salary data
              to increase credibility in the community.
            </p>

            <Controller
              name="verificationMethod"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select verification method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      <div className="flex items-center gap-2">
                        <EyeOff className="h-4 w-4" />
                        No verification (completely anonymous)
                      </div>
                    </SelectItem>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email verification
                      </div>
                    </SelectItem>
                    <SelectItem value="linkedin">
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn verification
                      </div>
                    </SelectItem>
                    <SelectItem value="paystub">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Paystub verification (private)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {form.watch('verificationMethod') === 'email' && (
              <div className="ml-6 mt-2">
                <Label htmlFor="verificationEmail">Verification Email</Label>
                <Input
                  id="verificationEmail"
                  type="email"
                  placeholder="Enter work email for verification"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>
            )}

            <Separator className="bg-white/20" />

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Controller
                  name="agreeToTerms"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <Label className="text-white">I agree to the terms and conditions</Label>
                  <p className="text-white/60 text-sm">
                    I confirm that the information provided is accurate and true.
                    I understand that false submissions may be removed.
                  </p>
                </div>
              </div>
            </div>

            {form.formState.errors.agreeToTerms && (
              <div className="flex items-center gap-2 text-red-300 text-sm">
                <AlertCircle className="h-4 w-4" />
                {form.formState.errors.agreeToTerms.message}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-white/60 text-sm">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-white/60 text-sm">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
      </div>

      {/* Step Header */}
      <div className="mb-8 text-center">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/10 rounded-full">
              {React.createElement(steps[currentStep].icon, {
                className: "h-8 w-8 text-white",
              })}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-white/60">
            {steps[currentStep].description}
          </p>
        </motion.div>
      </div>

      {/* Form Content */}
      <GlassCard className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              {renderStep()}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Submit Salary Data
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </GlassCard>

      {/* Privacy Notice */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 text-white/60 mt-0.5" />
          <div>
            <h4 className="text-white font-semibold mb-1">Your Privacy Matters</h4>
            <p className="text-white/60 text-sm">
              All personal information is anonymized before sharing. We never share your name,
              email, or any identifiable information. Data is used solely for salary comparison
              and market research purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}