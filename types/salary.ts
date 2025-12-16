export type Region = 'I' | 'II' | 'III' | 'IV';

export interface SalaryInput {
  salary: number;
  dependents: number;
  region: Region;
  exemptions?: number;
  year?: number; // Tax year for deduction calculations
}

export interface InsuranceBreakdown {
  bhxh: number;
  bhyt: number;
  bhtn: number;
  total: number;
  cappedSalary: number;
  originalSalary: number;
}

export interface TaxBreakdown {
  taxableIncome: number;
  tax: number;
  bracket: number;
  effectiveRate: number;
  marginalRate: number;
}

export interface DeductionBreakdown {
  personal: number;
  dependents: number;
  total: number;
}

export interface SalaryResult {
  gross: number;
  net: number;
  insurance: InsuranceBreakdown;
  tax: TaxBreakdown;
  deductions: DeductionBreakdown;
  monthlyBreakdown: {
    gross: number;
    insurance: number;
    taxableIncome: number;
    tax: number;
    net: number;
  };
  yearlyProjection: {
    grossYearly: number;
    netYearly: number;
    totalTax: number;
    totalInsurance: number;
  };
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  input: SalaryInput;
  result: SalaryResult;
  mode: 'gross-to-net' | 'net-to-gross';
}

// What-If Analysis types
export interface WhatIfVariation {
  id: string;
  label: string;
  input: SalaryInput;
  result: SalaryResult;
  color: string;
}

export interface WhatIfScenario {
  id: string;
  name: string;
  baseInput: SalaryInput;
  variations: WhatIfVariation[];
  timestamp: number;
}

// Comparison types
export interface SalaryComparison {
  gross: number;
  region: Region;
  dependents: number;
  exemptions?: number;
}

export interface ComparisonSet {
  id: string;
  name: string;
  salaries: SalaryComparison[];
  results: SalaryResult[];
  timestamp: number;
}

// History filter and sort types
export interface HistoryFilters {
  mode?: 'gross-to-net' | 'net-to-gross' | 'all';
  region?: Region | 'all';
  dateRange?: {
    start: number;
    end: number;
  };
  salaryRange?: {
    min: number;
    max: number;
  };
  searchQuery?: string;
}

export type HistorySortField = 'timestamp' | 'gross' | 'net' | 'tax';
export type HistorySortOrder = 'asc' | 'desc';

export interface HistoryStats {
  total: number;
  grossAvg: number;
  netAvg: number;
  byMode: Record<'gross-to-net' | 'net-to-gross', number>;
  byRegion: Record<Region, number>;
}

// Annual Compensation types
export interface BonusInput {
  month13Salary?: number; // Lương tháng 13
  kpiBonus?: number; // Thưởng KPI
  performanceBonus?: number; // Thưởng hiệu suất
  otherBonus?: number; // Thưởng khác
}

export interface AnnualCompensation {
  monthlyGross: number;
  monthlyNet: number;

  // 12 months regular
  regularGrossYearly: number;
  regularNetYearly: number;

  // Bonuses
  month13: {
    gross: number;
    net: number;
    tax: number;
    insurance: number;
  };

  kpiBonus: {
    gross: number;
    net: number;
    tax: number;
  };

  otherBonuses: {
    performance: {
      gross: number;
      net: number;
      tax: number;
    };
    other: {
      gross: number;
      net: number;
      tax: number;
    };
    total: {
      gross: number;
      net: number;
      tax: number;
    };
  };

  // Total
  totalGrossYearly: number;
  totalNetYearly: number;
  totalTaxYearly: number;
  totalInsuranceYearly: number;

  // Averages
  averageMonthlyGross: number;
  averageMonthlyNet: number;

  // Breakdown
  breakdown: {
    label: string;
    gross: number;
    net: number;
    percentage: number;
  }[];

  // Financial advice
  financialAdvice: {
    savings50: number;
    savings30: number;
    savings20: number;
  };
}

// Salary Growth types
export interface SalaryGrowthInput {
  currentSalary: number;
  yearsOfExperience: number;
  industry?: string;
  position?: string;
  annualRaise?: number; // % tăng lương hàng năm
  targetYears?: number; // Số năm dự đoán
  dependents: number;
  region: Region;
}

export interface SalaryGrowthProjection {
  currentYear: {
    year: number;
    gross: number;
    net: number;
    age?: number;
  };

  projections: Array<{
    year: number;
    gross: number;
    net: number;
    raise: number; // % tăng so với năm trước
    cumulativeRaise: number; // % tăng so với năm đầu
    age?: number;
  }>;

  insights: SalaryInsight[];

  // Summary
  totalGrowth: {
    gross: number;
    net: number;
    percentage: number;
  };

  averageAnnualGrowth: {
    gross: number;
    net: number;
    percentage: number;
  };
}

export interface SalaryInsight {
  type: 'positive' | 'neutral' | 'warning' | 'info';
  category: 'tax' | 'insurance' | 'growth' | 'benchmark' | 'financial';
  title: string;
  description: string;
  recommendation?: string;
  icon?: string;
  value?: number; // For numerical insights
}

// Market benchmark data
export interface MarketBenchmark {
  position: string;
  experience: string;
  industry: string;
  minSalary: number;
  maxSalary: number;
  medianSalary: number;
  location: string;
  dataPoints: number;
  lastUpdated: string;
}

export interface BenchmarkComparison {
  userSalary: number;
  percentile: number;
  marketPosition: 'below-average' | 'average' | 'above-average';
  gapToMedian: number;
  recommendations: string[];
}

// AI Assistant types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface CalculatorResult {
  // Basic salary info
  gross: number;
  net: number;
  tax: number;
  insurance: number;

  // Deductions
  dependents: number;
  taxableIncome: number;

  // Tax details
  taxTier: number;
  effectiveRate: number;

  // 2026 comparison
  tax2026?: number;
  savings2026?: number;

  // Breakdown
  breakdown: {
    bhxh: number;
    bhyt: number;
    bhtn: number;
    personalDeduction: number;
    dependentDeduction: number;
  };
}
