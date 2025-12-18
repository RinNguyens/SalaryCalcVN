import { describe, it, expect } from 'vitest'
import { generateSalaryInsights, generateNegotiationTips, getInsightColor, getInsightBgColor } from '../salary-insights'
import type { SalaryResult, AnnualCompensation } from '@/types/salary'

describe('generateSalaryInsights', () => {
  const mockSalaryResult: SalaryResult = {
    gross: 20_000_000,
    net: 15_000_000,
    insurance: {
      bhxh: 1_600_000,
      bhyt: 300_000,
      bhtn: 200_000,
      total: 2_100_000,
      cappedSalary: 20_000_000,
      originalSalary: 20_000_000,
    },
    tax: {
      taxableIncome: 6_900_000,
      tax: 345_000,
      bracket: 1,
      effectiveRate: 0.01725,
      marginalRate: 0.05,
    },
    deductions: {
      personal: 11_000_000,
      dependents: 0,
      total: 11_000_000,
    },
    monthlyBreakdown: {
      gross: 20_000_000,
      insurance: 2_100_000,
      taxableIncome: 6_900_000,
      tax: 345_000,
      net: 15_000_000,
    },
    yearlyProjection: {
      grossYearly: 240_000_000,
      netYearly: 180_000_000,
      totalTax: 4_140_000,
      totalInsurance: 25_200_000,
    },
  }

  it('should generate insights for low salary', () => {
    const insights = generateSalaryInsights(mockSalaryResult)

    expect(insights).toBeInstanceOf(Array)
    expect(insights.length).toBeGreaterThan(0)

    // Should have benchmark insight for low salary
    const benchmarkInsight = insights.find(i => i.category === 'benchmark')
    expect(benchmarkInsight).toBeDefined()
    expect(benchmarkInsight?.title).toContain('khởi điểm')
  })

  it('should generate insights for high salary', () => {
    const highSalaryResult: SalaryResult = {
      ...mockSalaryResult,
      gross: 60_000_000,
      net: 40_000_000,
      tax: {
        ...mockSalaryResult.tax,
        bracket: 5,
        tax: 5_000_000,
        effectiveRate: 0.083,
        marginalRate: 0.25,
      },
    }

    const insights = generateSalaryInsights(highSalaryResult)

    // Should have tax insight for high bracket
    const taxInsight = insights.find(i => i.category === 'tax' && i.type === 'warning')
    expect(taxInsight).toBeDefined()
  })

  it('should generate insights with annual compensation', () => {
    const mockAnnualComp: AnnualCompensation = {
      monthlyGross: 20_000_000,
      monthlyNet: 15_000_000,
      regularGrossYearly: 240_000_000,
      regularNetYearly: 180_000_000,
      month13: {
        gross: 20_000_000,
        net: 15_000_000,
        tax: 345_000,
        insurance: 2_100_000,
      },
      kpiBonus: {
        gross: 0,
        net: 0,
        tax: 0,
      },
      otherBonuses: {
        performance: { gross: 0, net: 0, tax: 0 },
        other: { gross: 0, net: 0, tax: 0 },
        total: { gross: 0, net: 0, tax: 0 },
      },
      totalGrossYearly: 260_000_000,
      totalNetYearly: 195_000_000,
      totalTaxYearly: 4_485_000,
      totalInsuranceYearly: 27_300_000,
      averageMonthlyGross: 21_666_667,
      averageMonthlyNet: 16_250_000,
      breakdown: [],
      financialAdvice: {
        savings50: 97_500_000,
        savings30: 58_500_000,
        savings20: 39_000_000,
      },
    }

    const insights = generateSalaryInsights(mockSalaryResult, mockAnnualComp)

    // Should have financial insights
    const financialInsight = insights.find(i => i.category === 'financial')
    expect(financialInsight).toBeDefined()
  })

  it('should sort insights by priority', () => {
    const insights = generateSalaryInsights(mockSalaryResult)

    // Check that warnings come first
    const hasWarning = insights.some(i => i.type === 'warning')
    if (hasWarning) {
      const firstWarningIndex = insights.findIndex(i => i.type === 'warning')
      const firstPositiveIndex = insights.findIndex(i => i.type === 'positive')
      if (firstPositiveIndex !== -1) {
        expect(firstWarningIndex).toBeLessThan(firstPositiveIndex)
      }
    }
  })
})

describe('generateNegotiationTips', () => {
  it('should generate tips for fresh graduates', () => {
    const tips = generateNegotiationTips(10_000_000, 1)

    expect(tips).toBeInstanceOf(Array)
    expect(tips.length).toBeGreaterThan(0)

    const focusTip = tips.find(t => t.description.includes('học hỏi'))
    expect(focusTip).toBeDefined()
  })

  it('should generate tips for experienced professionals', () => {
    const tips = generateNegotiationTips(25_000_000, 5)

    const confidentTip = tips.find(t => t.title.includes('Đàm phán tự tin'))
    expect(confidentTip).toBeDefined()
  })

  it('should generate warning for underpaid experienced professionals', () => {
    const tips = generateNegotiationTips(15_000_000, 5)

    const warningTip = tips.find(t => t.title.includes('Cân nhắc chuyển việc'))
    expect(warningTip).toBeDefined()
    expect(warningTip?.type).toBe('warning')
  })
})

describe('getInsightColor', () => {
  it('should return correct colors for insight types', () => {
    expect(getInsightColor('positive')).toBe('text-green-600')
    expect(getInsightColor('neutral')).toBe('text-blue-600')
    expect(getInsightColor('warning')).toBe('text-orange-600')
    expect(getInsightColor('info')).toBe('text-slate-600')
  })
})

describe('getInsightBgColor', () => {
  it('should return correct background colors for insight types', () => {
    expect(getInsightBgColor('positive')).toBe('bg-green-50 border-green-200')
    expect(getInsightBgColor('neutral')).toBe('bg-blue-50 border-blue-200')
    expect(getInsightBgColor('warning')).toBe('bg-orange-50 border-orange-200')
    expect(getInsightBgColor('info')).toBe('bg-slate-50 border-slate-200')
  })
})