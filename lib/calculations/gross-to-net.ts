import { calculateInsurance } from './insurance-calculator';
import { calculateTax, calculateDeductions } from './tax-calculator';
import type { SalaryInput, SalaryResult } from '@/types/salary';

export function calculateNetFromGross(input: SalaryInput): SalaryResult {
  const { salary: grossSalary, dependents, region, exemptions = 0, year } = input;

  // Step 1: Calculate insurance
  const insurance = calculateInsurance(grossSalary, region);

  // Step 2: Income after insurance
  const incomeAfterInsurance = grossSalary - insurance.total;

  // Step 3: Calculate deductions with year support
  const deductions = calculateDeductions(dependents, year);

  // Step 4: Taxable income
  const taxableIncome = Math.max(
    0,
    incomeAfterInsurance - deductions.total - exemptions
  );

  // Step 5: Calculate tax
  const tax = calculateTax(taxableIncome, year);

  // Step 6: Net salary
  const netSalary = grossSalary - insurance.total - tax.tax;

  // Step 7: Yearly projection
  const yearlyProjection = {
    grossYearly: grossSalary * 12,
    netYearly: netSalary * 12,
    totalTax: tax.tax * 12,
    totalInsurance: insurance.total * 12,
  };

  return {
    gross: grossSalary,
    net: netSalary,
    insurance,
    tax,
    deductions,
    monthlyBreakdown: {
      gross: grossSalary,
      insurance: insurance.total,
      taxableIncome: tax.taxableIncome,
      tax: tax.tax,
      net: netSalary,
    },
    yearlyProjection,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}
