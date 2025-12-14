/**
 * Zod schemas for Job Offer Comparison validation
 */

import { z } from 'zod';
import type { JobOffer, UserPriorities } from '@/types/job-offer';

// Base schemas
const moneySchema = z.number().min(0, 'Giá trị không thể âm');
const positiveIntegerSchema = z.number().int().min(0, 'Phải là số nguyên dương');

// Stock/Equity schema
const stockSchema = z.object({
  type: z.enum(['ESOP', 'RSU', 'Stock Options']),
  value: moneySchema,
  vesting: z.string(),
  strikePrice: moneySchema.optional(),
}).optional();

// Benefits schema
const benefitsSchema = z.object({
  healthInsurance: z.object({
    value: moneySchema.default(0),
    coverage: z.enum(['self', 'self+spouse', 'family']),
    notes: z.string().optional(),
  }),
  mealAllowance: z.object({
    value: moneySchema.default(0),
    frequency: z.enum(['daily', 'monthly']).default('monthly'),
  }),
  transport: z.object({
    value: moneySchema.default(0),
    type: z.enum(['allowance', 'shuttle', 'parking']),
  }),
  phone: moneySchema.default(0),
  internet: moneySchema.default(0),
  gym: moneySchema.default(0),
  learning: z.object({
    budget: moneySchema.default(0),
    approved: z.boolean().default(false),
  }),
  other: z.array(z.object({
    description: z.string(),
    value: moneySchema,
  })).default([]),
});

// Work-Life Balance schema
const workLifeSchema = z.object({
  workingDays: positiveIntegerSchema.default(5),
  workingHours: positiveIntegerSchema.default(8),
  overtime: z.object({
    frequency: z.enum(['rare', 'sometimes', 'often', 'always']),
    paid: z.boolean().default(false),
    rate: z.number().min(1).max(3).optional(),
  }),
  leaveDays: z.object({
    annual: positiveIntegerSchema.default(12),
    sick: positiveIntegerSchema.default(12),
    personal: positiveIntegerSchema.default(2),
    maternity: positiveIntegerSchema.default(6),
    paternity: positiveIntegerSchema.default(14),
  }),
  remote: z.object({
    daysPerWeek: positiveIntegerSchema.default(0),
    flexibility: z.enum(['fixed', 'flexible', 'fully-remote']),
    wfhStipend: moneySchema.optional(),
  }),
});

// Commute schema
const commuteSchema = z.object({
  distance: z.number().min(0),
  time: positiveIntegerSchema,
  cost: z.object({
    monthly: moneySchema.default(0),
    breakdown: z.object({
      fuel: moneySchema.default(0),
      parking: moneySchema.default(0),
      public: moneySchema.default(0),
    }),
  }),
  remoteDaysPerWeek: positiveIntegerSchema.default(0),
});

// Career schema
const careerSchema = z.object({
  reviewCycle: z.string(),
  promotionTrack: z.enum(['fast', 'normal', 'slow']),
  trainingOpportunities: z.array(z.string()).default([]),
  careerPath: z.array(z.string()).default([]),
});

// Culture schema
const cultureSchema = z.object({
  teamSize: positiveIntegerSchema,
  companySize: z.string(),
  industry: z.string(),
  workEnvironment: z.enum(['startup', 'corporate', 'agency', 'remote-first']),
  dressCode: z.enum(['formal', 'business-casual', 'casual']),
});

// Main JobOffer form schema
export const jobOfferFormSchema = z.object({
  // Basic info
  companyName: z.string().min(1, 'Tên công ty không được để trống'),
  position: z.string().min(1, 'Vị trí không được để trống'),
  location: z.string().min(1, 'Địa điểm không được để trống'),
  baseSalary: moneySchema,
  currency: z.enum(['VND', 'USD']).default('VND'),

  // Bonuses
  bonuses: z.object({
    performance: moneySchema.default(0),
    signing: moneySchema.optional(),
    '13thMonth': moneySchema.optional(),
    stock: stockSchema,
  }),

  // Benefits
  benefits: benefitsSchema,

  // Work-Life Balance
  workLife: workLifeSchema,

  // Commute
  commute: commuteSchema,

  // Career
  career: careerSchema,

  // Culture
  culture: cultureSchema,

  // Additional info
  offerStatus: z.enum(['considering', 'accepted', 'rejected', 'expired']).default('considering'),
  notes: z.string().optional(),
  expiresAt: z.date().optional(),
});

// Comparison priorities schema
export const comparisonPrioritiesSchema = z.object({
  salary: z.number().min(1).max(10).default(8),
  bonuses: z.number().min(1).max(10).default(7),
  benefits: z.number().min(1).max(10).default(6),
  workLifeBalance: z.number().min(1).max(10).default(8),
  career: z.number().min(1).max(10).default(7),
  commute: z.number().min(1).max(10).default(5),
});

// Create comparison schema
export const createComparisonSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  offers: z.array(jobOfferFormSchema).min(2, 'Cần ít nhất 2 offer để so sánh'),
  priorities: comparisonPrioritiesSchema,
  isPublic: z.boolean().default(false),
});

// Anonymous salary share schema
export const salaryShareSchema = z.object({
  // Company info (anonymized)
  companyIndustry: z.string().min(1, 'Ngành công ty không được để trống'),
  companySize: z.string().min(1, 'Quy mô công ty không được để trống'),
  companyLocation: z.string().min(1, 'Địa điểm không được để trống'),

  // Position info
  position: z.string().min(1, 'Vị trí không được để trống'),
  department: z.string().optional(),

  // Compensation
  baseSalary: moneySchema,
  bonuses: moneySchema.default(0),
  benefits: moneySchema.default(0),

  // Experience
  totalExperience: positiveIntegerSchema,
  relevantExperience: positiveIntegerSchema,
  educationLevel: z.enum(['High School', 'Bachelor', 'Master', 'PhD', 'Other']),

  // Skills and certifications
  skills: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),

  // Work details
  workingDaysPerWeek: z.number().min(1).max(7).default(5),
  remoteDaysPerWeek: z.number().min(0).max(7).default(0),

  // Verification
  email: z.string().email('Email không hợp lệ').optional(),
  agreeToTerms: z.boolean().refine(val => val === true, 'Phải đồng ý với điều khoản'),

  // Additional context
  notes: z.string().max(500, 'Ghi chú không quá 500 ký tự').optional(),
});

// Type exports
export type JobOfferFormValues = z.infer<typeof jobOfferFormSchema>;
export type ComparisonPrioritiesValues = z.infer<typeof comparisonPrioritiesSchema>;
export type CreateComparisonValues = z.infer<typeof createComparisonSchema>;
export type SalaryShareValues = z.infer<typeof salaryShareSchema>;

// Validation helpers
export function validateJobOffer(data: unknown): Omit<JobOffer, 'id' | 'createdAt'> {
  return jobOfferFormSchema.parse(data);
}

export function validateComparison(data: unknown) {
  return createComparisonSchema.parse(data);
}

export function validateSalaryShare(data: unknown) {
  return salaryShareSchema.parse(data);
}