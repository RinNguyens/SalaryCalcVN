import { calculateNetFromGross } from './gross-to-net';
import { calculateGrossFromNet } from './net-to-gross';
import { calculateInsurance } from './insurance-calculator';
import { calculateTax, calculateDeductions } from './tax-calculator';
import type { SalaryInput, AnnualCompensation, SalaryResult, BonusInput } from '@/types/salary';
import { getDeductions, TAX_BRACKETS_2026 } from '@/lib/constants/tax-brackets';

// Enhanced bonus interface
export interface EnhancedBonusInput {
  // Basic bonuses
  month13Salary?: number;
  tetBonus?: number;
  kpiBonus?: number;
  performanceBonus?: number;

  // Additional bonuses from tax guide
  quarterlyBonus?: number;
  projectBonus?: number;
  salesCommission?: number;

  // Distribution strategy
  distributionStrategy: 'even' | 'concentrated' | 'quarterly';
}

export interface EnhancedAnnualCompensation extends AnnualCompensation {
  // Enhanced breakdown
  enhancedBonuses: {
    tet: { gross: number; net: number; tax: number; month?: number };
    quarterly: { gross: number; net: number; tax: number; months: number[] };
    project: { gross: number; net: number; tax: number; month?: number };
    commission: { gross: number; net: number; tax: number };
  };

  // Tax optimization analysis
  taxOptimization: {
    currentStrategy: string;
    alternativeStrategies: Array<{
      name: string;
      totalTax: number;
      savings: number;
      description: string;
    }>;
    optimalStrategy: {
      name: string;
      potentialSavings: number;
      recommendation: string;
    };
  };

  // Year-end reconciliation
  yearEndReconciliation: {
    taxPaidMonthly: number;
    taxDueYearly: number;
    taxRefund: number;
    effectiveTaxRate: number;
    monthlyVsYearly: {
      monthlyTaxRate: number;
      yearlyTaxRate: number;
      difference: number;
    };
  };

  // Monthly breakdown (all 12 months)
  monthlyBreakdown: Array<{
    month: number;
    gross: number;
    bonuses: Array<{
      type: string;
      amount: number;
      tax: number;
    }>;
    net: number;
    tax: number;
    taxBracket: number;
  }>;
}

/**
 * Calculate enhanced annual compensation with tax optimization analysis
 */
export function calculateEnhancedAnnualCompensation(
  monthlyInput: SalaryInput,
  enhancedBonuses: EnhancedBonusInput
): EnhancedAnnualCompensation {
  // Calculate base monthly salary
  const monthlyResult = calculateNetFromGross(monthlyInput);
  const baseMonthlyGross = monthlyResult.gross;
  const baseMonthlyNet = monthlyResult.net;

  // 12 months regular salary
  const regularGrossYearly = baseMonthlyGross * 12;
  const regularNetYearly = baseMonthlyNet * 12;

  // Calculate all bonuses
  const bonuses = {
    month13: enhancedBonuses.month13Salary || baseMonthlyGross,
    tet: enhancedBonuses.tetBonus || 0,
    kpi: enhancedBonuses.kpiBonus || 0,
    performance: enhancedBonuses.performanceBonus || 0,
    quarterly: enhancedBonuses.quarterlyBonus || 0,
    project: enhancedBonuses.projectBonus || 0,
    commission: enhancedBonuses.salesCommission || 0,
  };

  // Total bonus amount
  const totalBonuses = Object.values(bonuses).reduce((sum, bonus) => sum + bonus, 0);

  // Create monthly breakdown based on distribution strategy
  const monthlyBreakdown = createMonthlyBreakdown(
    monthlyInput,
    baseMonthlyGross,
    bonuses,
    enhancedBonuses.distributionStrategy
  );

  // Calculate yearly totals from monthly breakdown
  const yearEndReconciliation = calculateYearEndReconciliation(
    monthlyBreakdown,
    monthlyInput
  );

  // Calculate tax optimization strategies
  const taxOptimization = analyzeTaxOptimization(
    monthlyInput,
    baseMonthlyGross,
    bonuses,
    enhancedBonuses.distributionStrategy
  );

  // Create enhanced breakdown
  const enhancedBreakdown = createEnhancedBreakdown(bonuses, monthlyBreakdown);

  // Total calculations
  const totalGrossYearly = regularGrossYearly + totalBonuses;
  const totalNetYearly = monthlyBreakdown.reduce((sum, month) => sum + month.net, 0);
  const totalTaxYearly = monthlyBreakdown.reduce((sum, month) => sum + month.tax, 0);
  const totalInsuranceYearly = monthlyBreakdown.reduce((sum, month) => {
    const insurance = calculateInsurance(month.gross, monthlyInput.region);
    return sum + insurance.total;
  }, 0);

  // Average monthly
  const averageMonthlyGross = totalGrossYearly / 12;
  const averageMonthlyNet = totalNetYearly / 12;

  // Create standard breakdown for compatibility
  const breakdown = [
    {
      label: 'Lương tháng (12 tháng)',
      gross: regularGrossYearly,
      net: regularNetYearly,
      percentage: (regularGrossYearly / totalGrossYearly) * 100,
    },
    {
      label: 'Lương tháng 13',
      gross: bonuses.month13,
      net: enhancedBreakdown.month13.net,
      percentage: (bonuses.month13 / totalGrossYearly) * 100,
    },
    ...(bonuses.tet > 0 ? [{
      label: 'Thưởng Tết',
      gross: bonuses.tet,
      net: enhancedBreakdown.tet.net,
      percentage: (bonuses.tet / totalGrossYearly) * 100,
    }] : []),
    ...(bonuses.kpi > 0 ? [{
      label: 'Thưởng KPI',
      gross: bonuses.kpi,
      net: enhancedBreakdown.kpi.net,
      percentage: (bonuses.kpi / totalGrossYearly) * 100,
    }] : []),
    ...((bonuses.performance + bonuses.quarterly + bonuses.project + bonuses.commission) > 0 ? [{
      label: 'Thưởng khác',
      gross: bonuses.performance + bonuses.quarterly + bonuses.project + bonuses.commission,
      net: enhancedBreakdown.performance.net + enhancedBreakdown.quarterly.net +
           enhancedBreakdown.project.net + enhancedBreakdown.commission.net,
      percentage: ((bonuses.performance + bonuses.quarterly + bonuses.project + bonuses.commission) / totalGrossYearly) * 100,
    }] : []),
  ].filter(item => item.gross > 0);

  // Financial advice
  const financialAdvice = {
    savings50: Math.round(totalNetYearly * 0.5),
    savings30: Math.round(totalNetYearly * 0.3),
    savings20: Math.round(totalNetYearly * 0.2),
  };

  return {
    monthlyGross: baseMonthlyGross,
    monthlyNet: baseMonthlyNet,
    regularGrossYearly,
    regularNetYearly,
    month13: {
      gross: bonuses.month13,
      net: enhancedBreakdown.month13.net,
      tax: enhancedBreakdown.month13.tax,
      insurance: calculateInsurance(bonuses.month13, monthlyInput.region).total,
    },
    kpiBonus: {
      gross: bonuses.kpi,
      net: enhancedBreakdown.kpi.net,
      tax: enhancedBreakdown.kpi.tax,
    },
    otherBonuses: {
      performance: {
        gross: bonuses.performance,
        net: enhancedBreakdown.performance.net,
        tax: enhancedBreakdown.performance.tax,
      },
      other: {
        gross: bonuses.quarterly + bonuses.project + bonuses.commission,
        net: enhancedBreakdown.quarterly.net + enhancedBreakdown.project.net + enhancedBreakdown.commission.net,
        tax: enhancedBreakdown.quarterly.tax + enhancedBreakdown.project.tax + enhancedBreakdown.commission.tax,
      },
      total: {
        gross: bonuses.performance + bonuses.quarterly + bonuses.project + bonuses.commission,
        net: enhancedBreakdown.performance.net + enhancedBreakdown.quarterly.net +
             enhancedBreakdown.project.net + enhancedBreakdown.commission.net,
        tax: enhancedBreakdown.performance.tax + enhancedBreakdown.quarterly.tax +
             enhancedBreakdown.project.tax + enhancedBreakdown.commission.tax,
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
    // Enhanced features
    enhancedBonuses: enhancedBreakdown,
    taxOptimization,
    yearEndReconciliation,
    monthlyBreakdown,
  };
}

/**
 * Create monthly breakdown based on distribution strategy
 */
function createMonthlyBreakdown(
  monthlyInput: SalaryInput,
  baseMonthlyGross: number,
  bonuses: Record<string, number>,
  strategy: 'even' | 'concentrated' | 'quarterly'
) {
  const monthlyBreakdown: Array<{
    month: number;
    gross: number;
    bonuses: Array<{
      type: string;
      amount: number;
      tax: number;
    }>;
    net: number;
    tax: number;
    taxBracket: number;
  }> = [];

  // Initialize 12 months with base salary
  for (let month = 1; month <= 12; month++) {
    monthlyBreakdown.push({
      month,
      gross: baseMonthlyGross,
      bonuses: [],
      net: 0,
      tax: 0,
      taxBracket: 0,
    });
  }

  // Distribute bonuses based on strategy
  switch (strategy) {
    case 'even':
      // Distribute all bonuses evenly across 12 months
      const totalEvenBonuses = Object.values(bonuses).reduce((sum, b) => sum + b, 0);
      const evenBonusPerMonth = totalEvenBonuses / 12;
      monthlyBreakdown.forEach(month => {
        month.gross += evenBonusPerMonth;
        if (evenBonusPerMonth > 0) {
          month.bonuses.push({
            type: 'Thương đều',
            amount: evenBonusPerMonth,
            tax: 0, // Will be calculated
          });
        }
      });
      break;

    case 'concentrated':
      // All bonuses in December
      monthlyBreakdown[11].gross += bonuses.tet + bonuses.kpi + bonuses.performance +
                                   bonuses.quarterly + bonuses.project + bonuses.commission;

      // Month 13 is separate calculation
      if (bonuses.month13 > 0) {
        monthlyBreakdown[11].gross += bonuses.month13;
        monthlyBreakdown[11].bonuses.push({
          type: 'Lương tháng 13',
          amount: bonuses.month13,
          tax: 0,
        });
      }

      if (bonuses.tet > 0) {
        monthlyBreakdown[11].bonuses.push({
          type: 'Thưởng Tết',
          amount: bonuses.tet,
          tax: 0,
        });
      }
      // Add other bonuses to December...
      break;

    case 'quarterly':
      // Distribute quarterly bonuses
      const quarterlyTotal = bonuses.quarterly + bonuses.kpi + bonuses.performance;
      const quarterlyAmount = quarterlyTotal / 4;
      [2, 5, 8, 11].forEach((monthIndex) => {
        if (quarterlyAmount > 0) {
          monthlyBreakdown[monthIndex - 1].gross += quarterlyAmount;
          monthlyBreakdown[monthIndex - 1].bonuses.push({
            type: 'Thưởng Quý',
            amount: quarterlyAmount,
            tax: 0,
          });
        }
      });

      // Project bonus in month 6 (mid-year)
      if (bonuses.project > 0) {
        monthlyBreakdown[5].gross += bonuses.project;
        monthlyBreakdown[5].bonuses.push({
          type: 'Thưởng Dự Án',
          amount: bonuses.project,
          tax: 0,
        });
      }

      // Tet bonus in January
      if (bonuses.tet > 0) {
        monthlyBreakdown[0].gross += bonuses.tet;
        monthlyBreakdown[0].bonuses.push({
          type: 'Thưởng Tết',
          amount: bonuses.tet,
          tax: 0,
        });
      }

      // Month 13 in December
      if (bonuses.month13 > 0) {
        monthlyBreakdown[11].gross += bonuses.month13;
        monthlyBreakdown[11].bonuses.push({
          type: 'Lương tháng 13',
          amount: bonuses.month13,
          tax: 0,
        });
      }

      // Commission distributed across all months
      if (bonuses.commission > 0) {
        const commissionPerMonth = bonuses.commission / 12;
        monthlyBreakdown.forEach(month => {
          month.gross += commissionPerMonth;
          if (commissionPerMonth > 0) {
            month.bonuses.push({
              type: 'Hoa hồng',
              amount: commissionPerMonth,
              tax: 0,
            });
          }
        });
      }
      break;
  }

  // Calculate net and tax for each month
  monthlyBreakdown.forEach(month => {
    const monthResult = calculateNetFromGross({
      salary: month.gross,
      dependents: monthlyInput.dependents,
      region: monthlyInput.region,
    });
    month.net = monthResult.net;
    month.tax = monthResult.tax.tax;
    month.taxBracket = monthResult.tax.bracket;

    // Calculate tax for each bonus
    month.bonuses.forEach(bonus => {
      const bonusResult = calculateNetFromGross({
        salary: bonus.amount,
        dependents: 0, // No deductions for bonuses
        region: monthlyInput.region,
      });
      bonus.tax = bonusResult.tax.tax;
    });
  });

  return monthlyBreakdown;
}

/**
 * Calculate year-end reconciliation
 */
function calculateYearEndReconciliation(
  monthlyBreakdown: any[],
  monthlyInput: SalaryInput
) {
  const taxPaidMonthly = monthlyBreakdown.reduce((sum, month) => sum + month.tax, 0);

  // Calculate yearly tax properly
  const totalGrossYearly = monthlyBreakdown.reduce((sum, month) => sum + month.gross, 0);
  const totalInsuranceYearly = monthlyBreakdown.reduce((sum, month) => {
    const insurance = calculateInsurance(month.gross, monthlyInput.region);
    return sum + insurance.total;
  }, 0);

  const deductionRates = getDeductions(2026);
  const totalDeductionsYearly = (deductionRates.PERSONAL + (monthlyInput.dependents * deductionRates.DEPENDENT)) * 12;

  const yearlyTaxableIncome = Math.max(0, totalGrossYearly - totalInsuranceYearly - totalDeductionsYearly);
  const taxDueYearly = calculateTax(yearlyTaxableIncome).tax;

  const taxRefund = taxPaidMonthly - taxDueYearly; // Positive = refund, Negative = owe more

  return {
    taxPaidMonthly,
    taxDueYearly,
    taxRefund,
    effectiveTaxRate: totalGrossYearly > 0 ? (taxDueYearly / totalGrossYearly) * 100 : 0,
    monthlyVsYearly: {
      monthlyTaxRate: totalGrossYearly > 0 ? (taxPaidMonthly / totalGrossYearly) * 100 : 0,
      yearlyTaxRate: totalGrossYearly > 0 ? (taxDueYearly / totalGrossYearly) * 100 : 0,
      difference: taxPaidMonthly - taxDueYearly,
    },
  };
}

/**
 * Analyze tax optimization strategies
 */
function analyzeTaxOptimization(
  monthlyInput: SalaryInput,
  baseMonthlyGross: number,
  bonuses: Record<string, number>,
  currentStrategy: 'even' | 'concentrated' | 'quarterly'
) {
  const strategies = ['even', 'concentrated', 'quarterly'] as const;
  const results = [];

  for (const strategy of strategies) {
    const breakdown = createMonthlyBreakdown(monthlyInput, baseMonthlyGross, bonuses, strategy);
    const totalTax = breakdown.reduce((sum, month) => sum + month.tax, 0);

    results.push({
      name: strategy === 'even' ? 'Phân bổ đều' :
            strategy === 'concentrated' ? 'Tập trung' : 'Theo quý',
      totalTax,
      savings: 0, // Will be calculated
      description: strategy === 'even' ? 'Th lowest tax option' :
                   strategy === 'concentrated' ? 'All bonuses in December' :
                   'Balanced approach',
    });
  }

  // Calculate savings relative to worst option
  const maxTax = Math.max(...results.map(r => r.totalTax));
  results.forEach(result => {
    result.savings = maxTax - result.totalTax;
  });

  const currentResult = results.find(r =>
    r.name === (currentStrategy === 'even' ? 'Phân bổ đều' :
               currentStrategy === 'concentrated' ? 'Tập trung' : 'Theo quý')
  );

  const optimal = results.reduce((best, current) =>
    current.totalTax < best.totalTax ? current : best
  );

  return {
    currentStrategy: currentResult?.name || 'Unknown',
    alternativeStrategies: results.filter(r => r.name !== currentResult?.name),
    optimalStrategy: {
      name: optimal.name,
      potentialSavings: optimal.savings,
      recommendation: optimal.name === 'Phân bổ đều'
        ? 'Chia đều thưởng sang 12 tháng để tiết kiệm thuế tối đa'
        : optimal.name === 'Theo quý'
        ? 'Chia thưởng theo quý để cân bằng giữa thuế và cash flow'
        : 'Tập trung thưởng vào tháng 12 (không khuyến nghị)',
    },
  };
}

/**
 * Create enhanced bonus breakdown
 */
function createEnhancedBreakdown(bonuses: Record<string, number>, monthlyBreakdown: Array<{
    month: number;
    gross: number;
    bonuses: Array<{
      type: string;
      amount: number;
      tax: number;
    }>;
    net: number;
    tax: number;
    taxBracket: number;
  }>) {
  // Find month 13 calculation
  const month13Calc = monthlyBreakdown.find(m =>
    m.bonuses.some(b => b.type === 'Lương tháng 13')
  );

  return {
    month13: {
      gross: bonuses.month13,
      net: month13Calc ? month13Calc.net - calculateNetFromGross({ salary: monthlyBreakdown[0].gross - (bonuses.month13 || 0), dependents: 0, region: 'I' }).net : 0,
      tax: month13Calc?.bonuses.find(b => b.type === 'Lương tháng 13')?.tax || 0,
    },
    tet: {
      gross: bonuses.tet,
      net: 0, // Will calculate based on monthly breakdown
      tax: 0,
      month: 1, // Usually January
    },
    quarterly: {
      gross: bonuses.quarterly + bonuses.kpi + bonuses.performance,
      net: 0,
      tax: 0,
      months: [3, 6, 9, 12],
    },
    project: {
      gross: bonuses.project,
      net: 0,
      tax: 0,
      month: 6, // Usually mid-year
    },
    commission: {
      gross: bonuses.commission,
      net: 0,
      tax: 0,
    },
    kpi: {
      gross: bonuses.kpi,
      net: 0,
      tax: 0,
    },
    performance: {
      gross: bonuses.performance,
      net: 0,
      tax: 0,
    },
  };
}

/**
 * Generate tax insights for 2026
 */
export function generateTaxInsights2026(enhancedResult: EnhancedAnnualCompensation) {
  const insights = [];

  // Tax bracket analysis
  const highestTaxBracket = Math.max(...enhancedResult.monthlyBreakdown.map(m => m.taxBracket));
  if (highestTaxBracket >= 4) {
    insights.push({
      type: 'warning' as const,
      title: 'Thuế Suất Cao',
      description: `Bạn đã đạt bậc thuế ${highestTaxBracket} (30-35%), cân nhắc chia thưởng để giảm thuế`,
      recommendation: 'Chia thưởng theo quý hoặc đều đặn để tránh nhảy bậc thuế',
    });
  }

  // Bonus optimization
  if (enhancedResult.taxOptimization.optimalStrategy.potentialSavings > 1000000) {
    insights.push({
      type: 'info' as const,
      title: 'Tiết Kiệm Thuế Tiềm Năng',
      description: `Có thể tiết kiệm ${formatCurrency(enhancedResult.taxOptimization.optimalStrategy.potentialSavings)} bằng cách thay đổi chiến lược phân phối thưởng`,
      recommendation: enhancedResult.taxOptimization.optimalStrategy.recommendation,
    });
  }

  // Year-end reconciliation
  if (enhancedResult.yearEndReconciliation.taxRefund > 500000) {
    insights.push({
      type: 'positive' as const,
      title: 'Hoàn Thuế Cuối Năm',
      description: `Bạn sẽ được hoàn thuế ${formatCurrency(enhancedResult.yearEndReconciliation.taxRefund)} khi quyết toán`,
      recommendation: 'Chuẩn bị hồ sơ quyết toán thuế tháng 3-4 năm sau',
    });
  }

  return insights;
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