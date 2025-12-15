import { TAX_BRACKETS_2025, TAX_BRACKETS_2026, getDeductions } from '@/lib/constants/tax-brackets';
import type { TaxBreakdown, DeductionBreakdown } from '@/types/salary';

/**
 * Calculate personal income tax using progressive brackets
 */
export function calculateTax(taxableIncome: number, year?: number): TaxBreakdown {
  if (taxableIncome <= 0) {
    return {
      taxableIncome: 0,
      tax: 0,
      bracket: 0,
      effectiveRate: 0,
      marginalRate: 0,
    };
  }

  // Select tax brackets based on year
  const currentYear = year || new Date().getFullYear();
  const selectedTAX_BRACKETS = currentYear >= 2026 ? TAX_BRACKETS_2026 : TAX_BRACKETS_2025;

  const bracketIndex = selectedTAX_BRACKETS.findIndex(
    (bracket) => taxableIncome <= bracket.max
  );

  const bracket = selectedTAX_BRACKETS[bracketIndex];

  // Use quick calculation formula
  const tax = Math.round(taxableIncome * bracket.rate - bracket.deduction);

  const effectiveRate = tax / taxableIncome;

  return {
    taxableIncome,
    tax: Math.max(0, tax),
    bracket: bracketIndex + 1,
    effectiveRate,
    marginalRate: bracket.rate,
  };
}

/**
 * Calculate deductions based on dependents
 */
export function calculateDeductions(dependents: number, year?: number): DeductionBreakdown {
  const deductionRates = getDeductions(year);
  const personal = deductionRates.PERSONAL;
  const dependentDeduction = dependents * deductionRates.DEPENDENT;

  return {
    personal,
    dependents: dependentDeduction,
    total: personal + dependentDeduction,
  };
}

/**
 * Calculate deductions for a specific year
 */
export function calculateDeductionsForYear(dependents: number, year: number): DeductionBreakdown {
  const deductionRates = getDeductions(year);
  const personal = deductionRates.PERSONAL;
  const dependentDeduction = dependents * deductionRates.DEPENDENT;

  return {
    personal,
    dependents: dependentDeduction,
    total: personal + dependentDeduction,
  };
}
