import { calculateNetFromGross } from './gross-to-net';
import { calculateInsurance } from './insurance-calculator';
import { calculateTax, calculateDeductions } from './tax-calculator';
import type { SalaryInput, AnnualCompensation, BonusInput, SalaryResult } from '@/types/salary';
import { getDeductions } from '@/lib/constants/tax-brackets';

/**
 * Calculate monthly compensation with bonuses
 */
export function calculateAnnualCompensation(
  monthlyInput: SalaryInput,
  bonuses: BonusInput
): AnnualCompensation {
  // Calculate base monthly salary
  const monthlyResult = calculateNetFromGross(monthlyInput);

  // 12 months regular salary
  const regularGrossYearly = monthlyResult.gross * 12;
  const regularNetYearly = monthlyResult.net * 12;

  // Calculate Month 13 salary (subject to insurance and regular tax)
  const month13Gross = bonuses.month13Salary || monthlyResult.gross;
  const month13Insurance = calculateInsurance(month13Gross, monthlyInput.region);

  // Get deductions for the appropriate year (default to current year)
  const deductionRates = getDeductions(monthlyInput.year);
  const month13Deductions = deductionRates.PERSONAL + (monthlyInput.dependents * deductionRates.DEPENDENT);

  const month13TaxableIncome = Math.max(
    0,
    month13Gross - month13Insurance.total - month13Deductions
  );
  const month13Tax = calculateTax(month13TaxableIncome);
  const month13Net = month13Gross - month13Insurance.total - month13Tax.tax;

  // Calculate KPI bonus (flat 10% tax, no insurance)
  const kpiGross = bonuses.kpiBonus || 0;
  const kpiTax = Math.round(kpiGross * 0.1);
  const kpiNet = kpiGross - kpiTax;

  // Calculate performance bonus (regular tax calculation)
  const performanceGross = bonuses.performanceBonus || 0;
  const performanceTax = Math.round(performanceGross * 0.1); // Simplified to 10%
  const performanceNet = performanceGross - performanceTax;

  // Calculate other bonus (regular tax calculation)
  const otherGross = bonuses.otherBonus || 0;
  const otherTax = Math.round(otherGross * 0.1); // Simplified to 10%
  const otherNet = otherGross - otherTax;

  // Total calculations
  const totalOtherGross = performanceGross + otherGross;
  const totalOtherTax = performanceTax + otherTax;
  const totalOtherNet = performanceNet + otherNet;

  const totalGrossYearly = regularGrossYearly + month13Gross + kpiGross + totalOtherGross;
  const totalNetYearly = regularNetYearly + month13Net + kpiNet + totalOtherNet;
  const totalTaxYearly = (monthlyResult.tax.tax * 12) + month13Tax.tax + kpiTax + totalOtherTax;
  const totalInsuranceYearly = (monthlyResult.insurance.total * 12) + month13Insurance.total;

  // Average monthly (including bonuses)
  const averageMonthlyGross = totalGrossYearly / 12;
  const averageMonthlyNet = totalNetYearly / 12;

  // Create breakdown
  const breakdown = [
    {
      label: 'Lương tháng (12 tháng)',
      gross: regularGrossYearly,
      net: regularNetYearly,
      percentage: (regularGrossYearly / totalGrossYearly) * 100,
    },
    {
      label: 'Tháng 13',
      gross: month13Gross,
      net: month13Net,
      percentage: (month13Gross / totalGrossYearly) * 100,
    },
    {
      label: 'Thưởng KPI',
      gross: kpiGross,
      net: kpiNet,
      percentage: (kpiGross / totalGrossYearly) * 100,
    },
    {
      label: 'Thưởng khác',
      gross: totalOtherGross,
      net: totalOtherNet,
      percentage: (totalOtherGross / totalGrossYearly) * 100,
    },
  ].filter(item => item.gross > 0);

  // Financial advice (50-30-20 rule)
  const financialAdvice = {
    savings50: Math.round(totalNetYearly * 0.5),
    savings30: Math.round(totalNetYearly * 0.3),
    savings20: Math.round(totalNetYearly * 0.2),
  };

  return {
    monthlyGross: monthlyResult.gross,
    monthlyNet: monthlyResult.net,
    regularGrossYearly,
    regularNetYearly,
    month13: {
      gross: month13Gross,
      net: month13Net,
      tax: month13Tax.tax,
      insurance: month13Insurance.total,
    },
    kpiBonus: {
      gross: kpiGross,
      net: kpiNet,
      tax: kpiTax,
    },
    otherBonuses: {
      performance: {
        gross: performanceGross,
        net: performanceNet,
        tax: performanceTax,
      },
      other: {
        gross: otherGross,
        net: otherNet,
        tax: otherTax,
      },
      total: {
        gross: totalOtherGross,
        net: totalOtherNet,
        tax: totalOtherTax,
      },
    },
    totalGrossYearly,
    totalNetYearly,
    totalTaxYearly,
    totalInsuranceYearly,
    averageMonthlyGross,
    averageMonthlyNet,
    breakdown,
    financialAdvice,
  };
}

/**
 * Calculate effective tax rate
 */
export function calculateEffectiveTaxRate(gross: number, net: number): number {
  if (gross === 0) return 0;
  return ((gross - net) / gross) * 100;
}

/**
 * Calculate savings potential
 */
export function calculateSavingsPotential(
  netIncome: number,
  savingsRate: number
): {
  monthly: number;
  yearly: number;
  fiveYear: number;
  tenYear: number;
} {
  const monthlySavings = netIncome * (savingsRate / 100);
  const yearlySavings = monthlySavings * 12;

  // Assuming 5% annual return on investments
  const fiveYearFutureValue = yearlySavings * ((Math.pow(1.05, 5) - 1) / 0.05);
  const tenYearFutureValue = yearlySavings * ((Math.pow(1.05, 10) - 1) / 0.05);

  return {
    monthly: Math.round(monthlySavings),
    yearly: Math.round(yearlySavings),
    fiveYear: Math.round(fiveYearFutureValue),
    tenYear: Math.round(tenYearFutureValue),
  };
}

/**
 * Generate financial insights
 */
export function generateFinancialInsights(compensation: AnnualCompensation): {
  taxEfficiency: string;
  savingsPotential: string;
  bonusDistribution: string;
  recommendations: string[];
} {
  const effectiveTaxRate = calculateEffectiveTaxRate(
    compensation.totalGrossYearly,
    compensation.totalNetYearly
  );

  // Tax efficiency insight
  let taxEfficiency = '';
  if (effectiveTaxRate < 10) {
    taxEfficiency = 'Tỷ lệ thuế rất thấp, bạn đang tận dụng tối đa các khoản giảm trừ';
  } else if (effectiveTaxRate < 15) {
    taxEfficiency = 'Tỷ lệ thuế thấp, tối ưu cho mức thu nhập của bạn';
  } else if (effectiveTaxRate < 20) {
    taxEfficiency = 'Tỷ lệ thuế hợp lý, phù hợp với mức thu nhập trung bình';
  } else {
    taxEfficiency = 'Tỷ lệ thuế cao, cân nhắc các khoản giảm trừ thuế có thể';
  }

  // Bonus distribution insight
  const bonusPercentage = ((compensation.totalGrossYearly - compensation.regularGrossYearly) / compensation.totalGrossYearly) * 100;
  let bonusDistribution = '';
  if (bonusPercentage === 0) {
    bonusDistribution = 'Chưa có thưởng/bonus trong năm';
  } else if (bonusPercentage < 10) {
    bonusDistribution = `Thưởng chiếm ${bonusPercentage.toFixed(1)}% tổng thu nhập`;
  } else if (bonusPercentage < 20) {
    bonusDistribution = `Thưởng chiếm ${bonusPercentage.toFixed(1)}% tổng thu nhập - mức tốt`;
  } else {
    bonusDistribution = `Thưởng chiếm ${bonusPercentage.toFixed(1)}% tổng thu nhập - mức rất tốt`;
  }

  // Savings potential
  const savingsPotential = `Với thu nhập năm ${formatCurrency(compensation.totalNetYearly)}, tiết kiệm 20% sẽ có ${formatCurrency(compensation.financialAdvice.savings20)}/năm`;

  // Recommendations
  const recommendations = [];

  if (effectiveTaxRate > 20) {
    recommendations.push('Cân nhắc các khoản đóng góp quỹ hưu trí tự nguyện để giảm thuế');
  }

  if (bonusPercentage === 0) {
    recommendations.push('Đàm phán về chính sách thưởng và KPI hàng năm');
  }

  if (compensation.financialAdvice.savings50 > 100000000) {
    recommendations.push('Cân nhắc đầu tư diversified portfolio thay vì chỉ tiết kiệm');
  }

  recommendations.push('Xây dựng quỹ khẩn cấp tương đương 3-6 tháng chi tiêu');
  recommendations.push('Đánh giá lại bảo hiểm nhân thọ và sức khỏe');

  return {
    taxEfficiency,
    savingsPotential,
    bonusDistribution,
    recommendations,
  };
}

/**
 * Format currency helper
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
}