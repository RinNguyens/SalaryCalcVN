// Tax Settlement Types for Vietnamese Tax Declaration

// Personal Information
export interface TaxSettlementPersonalInfo {
  fullName: string;
  taxCode: string; // MST - 10 digits
  year: number; // Tax year (2026)
  dependentCount: number;
}

// Income Source (supports multiple employers)
export interface IncomeSource {
  id: string; // UUID
  companyName: string;
  companyTaxCode?: string; // Optional MST of employer

  // Work period
  periodFrom: string; // "YYYY-MM" format
  periodTo: string; // "YYYY-MM" format
  monthsWorked: number; // Calculated from period

  // Income components (monthly or annual totals)
  basicSalary: number; // Monthly basic salary
  allowances: number; // Total allowances for the period
  bonus: number; // Total bonuses for the period
  otherIncome: number; // Other taxable income

  // Deductions already made by employer
  insurancePaid: number; // Total insurance employee paid
  taxWithheld: number; // Total tax withheld by employer
}

// Dependent Information
export interface TaxSettlementDependent {
  id: string; // UUID
  name: string;
  taxCode: string; // MST of dependent
  relationship: 'child' | 'spouse' | 'parent' | 'sibling' | 'other';
  birthDate?: string; // For validation (YYYY-MM-DD)
  registeredFrom: string; // "YYYY-MM-DD"
  registeredTo?: string; // "YYYY-MM-DD" or undefined if still registered
  monthsRegistered: number; // Number of months registered in the tax year
}

// Tax Bracket Breakdown (reuse from existing but defined here for completeness)
export interface TaxBracketBreakdown {
  tier: number; // 1-5 for 2026
  from: number;
  to: number | null; // null for top bracket
  rate: number; // 5, 10, 20, 30, 35
  taxableAmount: number; // Amount in this bracket
  taxAmount: number; // Tax for this bracket
}

// Deduction Breakdown
export interface DeductionBreakdown {
  personal: number;
  dependents: number;
  insurance: number;
  total: number;
}

// Tax Calculation Result
export interface TaxSettlementCalculation {
  // Aggregated totals
  totalIncome: number;
  totalInsurancePaid: number;
  totalDeductions: number;

  // Calculated amounts
  taxableIncome: number;
  calculatedTax: number; // Tax owed based on calculation
  paidTax: number; // Tax already withheld

  // Settlement result
  settlementAmount: number; // Positive = refund, Negative = owe
  settlementType: 'refund' | 'payment' | 'even';

  // Breakdowns
  taxBreakdown: TaxBracketBreakdown[];
  deductionBreakdown: DeductionBreakdown;

  // Monthly breakdown for visualization (optional)
  monthlyBreakdown?: {
    month: string; // "YYYY-MM"
    income: number;
    insurance: number;
    tax: number;
  }[];
}

// Complete Settlement
export interface TaxSettlement {
  id: string; // UUID
  year: number;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
  status: 'draft' | 'completed';

  // Data
  personalInfo: TaxSettlementPersonalInfo;
  incomeSources: IncomeSource[];
  dependents: TaxSettlementDependent[];

  // Calculation (null if draft)
  calculation: TaxSettlementCalculation | null;

  // Metadata
  notes?: string;
}

// History/List item (lightweight for list views)
export interface TaxSettlementSummary {
  id: string;
  year: number;
  fullName: string;
  taxCode: string;
  createdAt: number;
  updatedAt: number;
  settlementAmount: number;
  settlementType: 'refund' | 'payment' | 'even';
  status: 'draft' | 'completed';
}

// Backup/Export format
export interface TaxSettlementBackup {
  version: string; // Backup format version
  exportedAt: string; // ISO date string
  settlements: TaxSettlement[];
}
