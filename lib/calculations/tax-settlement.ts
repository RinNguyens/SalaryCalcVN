import { TAX_BRACKETS_2026, getDeductions } from '@/lib/constants/tax-brackets';
import type {
  IncomeSource,
  TaxSettlementDependent,
  TaxSettlementCalculation,
  TaxBracketBreakdown,
} from '@/types/tax-settlement';

/**
 * Calculate tax settlement for annual income
 * Aggregates income from multiple sources, calculates tax, and determines settlement amount
 */
export function calculateTaxSettlement(
  incomeSources: IncomeSource[],
  dependents: TaxSettlementDependent[],
  year: number
): TaxSettlementCalculation {
  // Step 1: Aggregate total income from all sources
  const totalIncome = incomeSources.reduce((sum, source) => {
    const monthlyIncome = source.basicSalary;
    const annualRegular = monthlyIncome * source.monthsWorked;
    const annualTotal =
      annualRegular + source.allowances + source.bonus + source.otherIncome;
    return sum + annualTotal;
  }, 0);

  // Step 2: Aggregate insurance paid
  const totalInsurancePaid = incomeSources.reduce(
    (sum, source) => sum + source.insurancePaid,
    0
  );

  // Step 3: Calculate deductions
  const deductions = getDeductions(year);
  const personalDeduction = deductions.PERSONAL * 12; // Full year

  // Calculate dependent deduction based on registration months
  const dependentDeduction = dependents.reduce((sum, dep) => {
    return sum + deductions.DEPENDENT * dep.monthsRegistered;
  }, 0);

  const totalDeductions =
    totalInsurancePaid + personalDeduction + dependentDeduction;

  // Step 4: Calculate taxable income
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);

  // Step 5: Calculate tax using annual progressive brackets
  const monthlyTaxableIncome = taxableIncome / 12;
  const { totalTax: monthlyTax, breakdown } = calculateProgressiveTax(
    monthlyTaxableIncome
  );
  const calculatedTax = Math.round(monthlyTax * 12);

  // Step 6: Aggregate tax already withheld
  const paidTax = incomeSources.reduce(
    (sum, source) => sum + source.taxWithheld,
    0
  );

  // Step 7: Calculate settlement
  const settlementAmount = paidTax - calculatedTax;
  const settlementType =
    settlementAmount > 100 ? 'refund' : settlementAmount < -100 ? 'payment' : 'even';

  return {
    totalIncome,
    totalInsurancePaid,
    totalDeductions,
    taxableIncome,
    calculatedTax,
    paidTax,
    settlementAmount,
    settlementType,
    taxBreakdown: breakdown,
    deductionBreakdown: {
      personal: personalDeduction,
      dependents: dependentDeduction,
      insurance: totalInsurancePaid,
      total: totalDeductions,
    },
  };
}

/**
 * Calculate progressive tax based on 2026 tax brackets
 * Uses the monthly taxable income to determine tax
 */
function calculateProgressiveTax(monthlyTaxableIncome: number): {
  totalTax: number;
  breakdown: TaxBracketBreakdown[];
} {
  if (monthlyTaxableIncome <= 0) {
    return { totalTax: 0, breakdown: [] };
  }

  const brackets = TAX_BRACKETS_2026;
  let totalTax = 0;
  const breakdown: TaxBracketBreakdown[] = [];
  let remainingIncome = monthlyTaxableIncome;
  let previousMax = 0;

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];

    if (remainingIncome <= 0) break;

    // Calculate taxable amount in this bracket
    const bracketRange = bracket.max - previousMax;
    const taxableInBracket =
      bracket.max === Infinity
        ? remainingIncome
        : Math.min(remainingIncome, bracketRange);

    if (taxableInBracket > 0) {
      const taxInBracket = taxableInBracket * bracket.rate;
      totalTax += taxInBracket;

      breakdown.push({
        tier: i + 1,
        from: previousMax,
        to: bracket.max === Infinity ? null : bracket.max,
        rate: bracket.rate * 100, // Convert to percentage
        taxableAmount: taxableInBracket,
        taxAmount: taxInBracket,
      });

      remainingIncome -= taxableInBracket;
    }

    previousMax = bracket.max === Infinity ? previousMax : bracket.max;
  }

  return { totalTax, breakdown };
}

/**
 * Calculate progressive tax using quick formula (alternative method)
 * This uses the deduction field from tax brackets for faster calculation
 */
export function calculateProgressiveTaxQuick(
  monthlyTaxableIncome: number
): number {
  if (monthlyTaxableIncome <= 0) return 0;

  const brackets = TAX_BRACKETS_2026;

  // Find the appropriate bracket
  const bracketIndex = brackets.findIndex(
    (bracket) => monthlyTaxableIncome <= bracket.max
  );

  if (bracketIndex === -1) return 0;

  const bracket = brackets[bracketIndex];

  // Use quick calculation formula: tax = income * rate - deduction
  return Math.max(
    0,
    Math.round(monthlyTaxableIncome * bracket.rate - bracket.deduction)
  );
}

/**
 * Estimate monthly tax breakdown for visualization
 * Distributes income across months based on work periods
 */
export function createMonthlyBreakdown(
  incomeSources: IncomeSource[],
  year: number
): Array<{ month: string; income: number; insurance: number; tax: number }> {
  const months: Array<{ month: string; income: number; insurance: number; tax: number }> =
    [];

  for (let m = 1; m <= 12; m++) {
    const monthKey = `${year}-${String(m).padStart(2, '0')}`;

    // Sum income for this month from all sources
    const income = incomeSources.reduce((sum, source) => {
      if (isMonthInRange(monthKey, source.periodFrom, source.periodTo)) {
        return sum + source.basicSalary;
      }
      return sum;
    }, 0);

    // Estimate monthly insurance (total / months worked)
    const insurance = incomeSources.reduce((sum, source) => {
      if (isMonthInRange(monthKey, source.periodFrom, source.periodTo)) {
        return sum + source.insurancePaid / source.monthsWorked;
      }
      return sum;
    }, 0);

    // Estimate monthly tax
    const tax = incomeSources.reduce((sum, source) => {
      if (isMonthInRange(monthKey, source.periodFrom, source.periodTo)) {
        return sum + source.taxWithheld / source.monthsWorked;
      }
      return sum;
    }, 0);

    months.push({ month: monthKey, income, insurance, tax });
  }

  return months;
}

/**
 * Check if a month is within a period range
 */
function isMonthInRange(
  month: string,
  periodFrom: string,
  periodTo: string
): boolean {
  return month >= periodFrom && month <= periodTo;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate effective tax rate
 */
export function calculateEffectiveTaxRate(
  totalIncome: number,
  calculatedTax: number
): number {
  if (totalIncome <= 0) return 0;
  return (calculatedTax / totalIncome) * 100;
}

/**
 * Get settlement summary text
 */
export function getSettlementSummary(settlementAmount: number, settlementType: string): string {
  if (settlementType === 'refund') {
    return `Được hoàn: ${formatCurrency(settlementAmount)}`;
  } else if (settlementType === 'payment') {
    return `Phải nộp thêm: ${formatCurrency(Math.abs(settlementAmount))}`;
  } else {
    return 'Đã quyết toán chính xác';
  }
}
