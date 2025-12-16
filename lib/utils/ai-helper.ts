import type { SalaryResult, CalculatorResult } from '@/types/salary';

/**
 * Convert SalaryResult to CalculatorResult format for AI Assistant
 */
export function convertToCalculatorResult(
  salaryResult: SalaryResult,
  dependents: number
): CalculatorResult {
  return {
    gross: salaryResult.gross,
    net: salaryResult.net,
    tax: salaryResult.monthlyBreakdown.tax,
    insurance: salaryResult.monthlyBreakdown.insurance,
    dependents: dependents,
    taxableIncome: salaryResult.monthlyBreakdown.taxableIncome,
    taxTier: salaryResult.tax.bracket,
    effectiveRate: salaryResult.tax.effectiveRate,
    // Optional 2026 comparison - you can calculate this based on your tax rules
    tax2026: undefined,
    savings2026: undefined,
    breakdown: {
      bhxh: salaryResult.insurance.bhxh,
      bhyt: salaryResult.insurance.bhyt,
      bhtn: salaryResult.insurance.bhtn,
      personalDeduction: salaryResult.deductions.personal,
      dependentDeduction: salaryResult.deductions.dependents,
    },
  };
}
