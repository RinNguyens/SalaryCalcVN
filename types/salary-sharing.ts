/**
 * Types for Anonymous Salary Sharing Platform
 */

export interface SalaryShare {
  id: string;
  shareToken: string;

  // Basic info (anonymized)
  anonymousId: string;      // Random identifier for user privacy

  // Company & Position (anonymized)
  companyInfo: {
    industry: string;
    size: string;
    location: string;
    type: 'local' | 'multinational' | 'startup' | 'government';
  };

  position: {
    title: string;
    level: string;
    department: string;
    field: string;
  };

  // Compensation (all VND, monthly)
  compensation: {
    baseSalary: number;
    bonuses: {
      performance: number;
      signing: number;
      '13thMonth': number;
      other: number;
    };
    benefits: {
      healthInsurance: number;
      mealAllowance: number;
      transport: number;
      phone: number;
      internet: number;
      gym: number;
      learning: number;
      other: number;
    };
    totalCompensation: number;
  };

  // Experience & Education
  experience: {
    totalYears: number;
    relevantYears: number;
    managementYears: number;
    companyYears: number;
  };

  education: {
    level: 'high_school' | 'bachelor' | 'master' | 'phd' | 'professional';
    field: string;
    hasRelevantDegree: boolean;
  };

  // Skills & Certifications
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
    certifications: string[];
  };

  // Work Details
  workDetails: {
    workingDaysPerWeek: number;
    workingHoursPerDay: number;
    remoteDaysPerWeek: number;
    overtimeFrequency: 'rare' | 'sometimes' | 'often' | 'always';
    overtimePaid: boolean;
  };

  // Career Growth
  career: {
    lastPromotion: string;
    nextPromotionExpected: string;
    reviewCycle: string;
    trainingOpportunities: boolean;
    careerProgression: 'fast' | 'normal' | 'slow' | 'stagnant';
  };

  // Job Satisfaction
  satisfaction: {
    overall: number;         // 1-10
    salary: number;          // 1-10
    workLifeBalance: number; // 1-10
    benefits: number;        // 1-10
    culture: number;         // 1-10
    growth: number;          // 1-10
  };

  // Verification
  verification: {
    status: 'pending' | 'verified' | 'flagged';
    method: 'email' | 'linkedin' | 'paystub' | 'none';
    verifiedAt?: Date;
    flagReason?: string;
  };

  // Metadata
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    ipAddress: string;
    userAgent: string;
    source: string;         // How they found the platform
  };

  // Sharing settings
  sharing: {
    isPublic: boolean;
    shareInComparisons: boolean;
    shareInStatistics: boolean;
    allowContact: boolean;
    contactEmail?: string;
  };
}

export interface SalaryShareForm {
  // Step 1: Company & Position
  companyIndustry: string;
  companySize: string;
  companyLocation: string;
  companyType: 'local' | 'multinational' | 'startup' | 'government';
  positionTitle: string;
  positionLevel: string;
  positionDepartment: string;
  positionField: string;

  // Step 2: Compensation
  baseSalary: number;
  performanceBonus: number;
  signingBonus: number;
  thirteenthMonth: number;
  otherBonuses: number;
  healthInsurance: number;
  mealAllowance: number;
  transportAllowance: number;
  phoneAllowance: number;
  internetAllowance: number;
  gymAllowance: number;
  learningBudget: number;
  otherBenefits: number;

  // Step 3: Experience
  totalExperience: number;
  relevantExperience: number;
  managementExperience: number;
  companyExperience: number;
  educationLevel: 'high_school' | 'bachelor' | 'master' | 'phd' | 'professional';
  educationField: string;
  hasRelevantDegree: boolean;

  // Step 4: Skills
  technicalSkills: string[];
  softSkills: string[];
  languages: string[];
  certifications: string[];

  // Step 5: Work Details
  workingDaysPerWeek: number;
  workingHoursPerDay: number;
  remoteDaysPerWeek: number;
  overtimeFrequency: 'rare' | 'sometimes' | 'often' | 'always';
  overtimePaid: boolean;
  lastPromotion: string;
  nextPromotionExpected: string;
  reviewCycle: string;
  trainingOpportunities: boolean;
  careerProgression: 'fast' | 'normal' | 'slow' | 'stagnant';

  // Step 6: Satisfaction
  overallSatisfaction: number;
  salarySatisfaction: number;
  workLifeBalanceSatisfaction: number;
  benefitsSatisfaction: number;
  cultureSatisfaction: number;
  growthSatisfaction: number;

  // Step 7: Sharing
  isPublicShare: boolean;
  shareInComparisons: boolean;
  shareInStatistics: boolean;
  allowContact: boolean;
  contactEmail?: string;
  agreeToTerms: boolean;
  verificationMethod: 'email' | 'linkedin' | 'paystub' | 'none';
}

export interface SalaryStatistics {
  totalShares: number;
  verifiedShares: number;

  // By position
  positionStats: Record<string, {
    count: number;
    averageSalary: number;
    medianSalary: number;
    minSalary: number;
    maxSalary: number;
    salaryRange: string;
  }>;

  // By industry
  industryStats: Record<string, {
    count: number;
    averageSalary: number;
    medianSalary: number;
    topPositions: Array<{ position: string; salary: number }>;
  }>;

  // By location
  locationStats: Record<string, {
    count: number;
    averageSalary: number;
    medianSalary: number;
    costOfLivingIndex: number;
    realWageIndex: number;
  }>;

  // By experience
  experienceStats: Record<string, {
    count: number;
    averageSalary: number;
    salaryGrowth: number;
    promotionTime: number;
  }>;

  // By company size
  companySizeStats: Record<string, {
    count: number;
    averageSalary: number;
    benefitsValue: number;
    workLifeBalance: number;
  }>;

  // Benefits statistics
  benefitsStats: {
    averageBenefitsValue: number;
    benefitsBreakdown: Record<string, number>;
    benefitsPercentage: number;
  };

  // Satisfaction statistics
  satisfactionStats: {
    overallAverage: number;
    salaryAverage: number;
    workLifeBalanceAverage: number;
    factors: Record<string, number>;
  };
}

export interface SalaryComparison {
  userProfile: Partial<SalaryShare>;
  comparableProfiles: Array<{
    profile: SalaryShare;
    similarity: number;
    differences: string[];
  }>;

  marketPosition: {
    percentile: number;
    aboveAverage: boolean;
    marketRate: number;
    difference: number;
    differencePercentage: number;
  };

  recommendations: {
    negotiationTips: string[];
    skillImprovements: string[];
    careerMoves: string[];
  };

  insights: {
    industryTrends: string[];
    locationAnalysis: string;
    experienceValue: string;
    benefitsAnalysis: string;
  };
}

export interface ShareVerification {
  id: string;
  shareId: string;
  method: 'email' | 'linkedin' | 'paystub';
  status: 'pending' | 'verified' | 'rejected';
  token: string;
  sentAt: Date;
  verifiedAt?: Date;
  details: {
    email?: string;
    linkedinProfile?: string;
    documents?: string[];
  };
}

// Industry categories for classification
export const INDUSTRY_CATEGORIES = [
  'Technology/IT',
  'Finance/Banking',
  'E-commerce/Retail',
  'Manufacturing',
  'Healthcare/Pharma',
  'Education',
  'Consulting',
  'Real Estate',
  'Hospitality/Tourism',
  'Media/Marketing',
  'Logistics/Transport',
  'Government/Public Sector',
  'Energy/Utilities',
  'Agriculture',
  'Construction',
  'Legal',
  'Telecommunications',
  'Automotive',
  'Aerospace',
  'Other'
] as const;

// Company size categories
export const COMPANY_SIZE_CATEGORIES = [
  'Startup (<10)',
  'Small (10-50)',
  'Medium (50-250)',
  'Large (250-1000)',
  'Enterprise (1000+)',
  'Giant (5000+)'
] as const;

// Position levels
export const POSITION_LEVELS = [
  'Intern/Trainee',
  'Junior/Entry Level',
  'Mid-Level (2-5 years)',
  'Senior (5-8 years)',
  'Lead/Principal',
  'Manager/Team Lead',
  'Senior Manager',
  'Director',
  'VP/Head',
  'C-Level/Executive'
] as const;

// Education levels
export const EDUCATION_LEVELS = [
  { value: 'high_school', label: 'High School' },
  { value: 'bachelor', label: 'Bachelor\'s Degree' },
  { value: 'master', label: 'Master\'s Degree' },
  { value: 'phd', label: 'PhD/Doctorate' },
  { value: 'professional', label: 'Professional Certification' }
] as const;

// Common technical skills
export const COMMON_TECHNICAL_SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++',
  'React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Spring',
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
  'SQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Elasticsearch',
  'Machine Learning', 'Data Science', 'AI', 'DevOps', 'CI/CD',
  'Mobile Development', 'Web Development', 'Backend', 'Frontend',
  'UI/UX Design', 'Product Management', 'Agile/Scrum'
] as const;

// Common soft skills
export const COMMON_SOFT_SKILLS = [
  'Leadership', 'Communication', 'Teamwork', 'Problem Solving',
  'Project Management', 'Time Management', 'Critical Thinking',
  'Creativity', 'Adaptability', 'Conflict Resolution',
  'Public Speaking', 'Negotiation', 'Mentoring', 'Decision Making',
  'Strategic Planning', 'Analytical Skills', 'Research Skills'
] as const;

// Common languages
export const COMMON_LANGUAGES = [
  'Vietnamese', 'English', 'Japanese', 'Korean', 'Chinese',
  'French', 'German', 'Spanish', 'Russian', 'Thai'
] as const;