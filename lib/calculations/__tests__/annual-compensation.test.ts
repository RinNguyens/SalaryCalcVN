import { describe, it, expect } from 'vitest'
import { calculateAnnualCompensation, calculateEffectiveTaxRate, calculateSavingsPotential } from '../annual-compensation'

describe('calculateAnnualCompensation', () => {
  it('should calculate annual compensation correctly with basic input', () => {
    const result = calculateAnnualCompensation(
      {
        salary: 20_000_000,
        dependents: 0,
        region: 'I',
      },
      {
        month13Salary: 20_000_000,
        kpiBonus: 5_000_000,
        performanceBonus: 3_000_000,
        otherBonus: 2_000_000,
      }
    )

    expect(result.monthlyGross).toBe(20_000_000)
    expect(result.regularGrossYearly).toBe(240_000_000)
    expect(result.month13.gross).toBe(20_000_000)
    expect(result.kpiBonus.gross).toBe(5_000_000)
    expect(result.otherBonuses.total.gross).toBe(5_000_000)
    expect(result.totalGrossYearly).toBe(270_000_000)
  })

  it('should calculate taxes correctly for month 13', () => {
    const result = calculateAnnualCompensation(
      {
        salary: 20_000_000,
        dependents: 0,
        region: 'I',
      },
      {
        month13Salary: 20_000_000,
      }
    )

    expect(result.month13.insurance).toBeGreaterThan(0)
    expect(result.month13.tax).toBeGreaterThan(0)
    expect(result.month13.net).toBeLessThan(result.month13.gross)
  })

  it('should calculate KPI bonus tax correctly (10%)', () => {
    const result = calculateAnnualCompensation(
      {
        salary: 20_000_000,
        dependents: 0,
        region: 'I',
      },
      {
        kpiBonus: 10_000_000,
      }
    )

    expect(result.kpiBonus.tax).toBe(1_000_000) // 10% of 10M
    expect(result.kpiBonus.net).toBe(9_000_000)
  })

  it('should calculate other bonuses tax correctly', () => {
    const result = calculateAnnualCompensation(
      {
        salary: 20_000_000,
        dependents: 0,
        region: 'I',
      },
      {
        performanceBonus: 10_000_000,
        otherBonus: 5_000_000,
      }
    )

    expect(result.otherBonuses.performance.tax).toBe(1_000_000) // 10% of 10M
    expect(result.otherBonuses.other.tax).toBe(500_000) // 10% of 5M
    expect(result.otherBonuses.total.tax).toBe(1_500_000)
  })

  it('should handle zero bonuses correctly', () => {
    const result = calculateAnnualCompensation(
      {
        salary: 20_000_000,
        dependents: 0,
        region: 'I',
      },
      {}
    )

    expect(result.month13.gross).toBe(20_000_000) // Default to monthly salary
    expect(result.kpiBonus.gross).toBe(0)
    expect(result.otherBonuses.total.gross).toBe(0)
  })

  it('should calculate average monthly correctly', () => {
    const result = calculateAnnualCompensation(
      {
        salary: 20_000_000,
        dependents: 0,
        region: 'I',
      },
      {
        month13Salary: 20_000_000,
        kpiBonus: 12_000_000, // 1 month equivalent
      }
    )

    // Total: 12*20M + 20M (month13) + 12M (KPI) = 272M
    // Average: 272M / 12 = ~22.67M
    expect(result.averageMonthlyGross).toBeCloseTo(22_666_667, -3)
  })

  it('should create correct breakdown', () => {
    const result = calculateAnnualCompensation(
      {
        salary: 20_000_000,
        dependents: 0,
        region: 'I',
      },
      {
        month13Salary: 20_000_000,
        kpiBonus: 5_000_000,
        performanceBonus: 3_000_000,
      }
    )

    expect(result.breakdown).toHaveLength(4) // Regular + Month13 + KPI + Other
    expect(result.breakdown[0].label).toBe('Lương tháng (12 tháng)')
    expect(result.breakdown[1].label).toBe('Tháng 13')
    expect(result.breakdown[2].label).toBe('Thưởng KPI')
    expect(result.breakdown[3].label).toBe('Thưởng khác')

    // Check percentages sum to 100
    const totalPercentage = result.breakdown.reduce((sum, item) => sum + item.percentage, 0)
    expect(totalPercentage).toBeCloseTo(100, 0)
  })

  it('should calculate financial advice correctly (50-30-20 rule)', () => {
    const result = calculateAnnualCompensation(
      {
        salary: 20_000_000,
        dependents: 0,
        region: 'I',
      },
      {}
    )

    const totalNet = result.totalNetYearly
    expect(result.financialAdvice.savings50).toBe(Math.round(totalNet * 0.5))
    expect(result.financialAdvice.savings30).toBe(Math.round(totalNet * 0.3))
    expect(result.financialAdvice.savings20).toBe(Math.round(totalNet * 0.2))
  })
})

describe('calculateEffectiveTaxRate', () => {
  it('should calculate effective tax rate correctly', () => {
    expect(calculateEffectiveTaxRate(100_000_000, 80_000_000)).toBe(20)
    expect(calculateEffectiveTaxRate(50_000_000, 40_000_000)).toBe(20)
    expect(calculateEffectiveTaxRate(20_000_000, 15_000_000)).toBe(25)
  })

  it('should handle zero gross salary', () => {
    expect(calculateEffectiveTaxRate(0, 0)).toBe(0)
  })
})

describe('calculateSavingsPotential', () => {
  it('should calculate savings potential correctly', () => {
    const result = calculateSavingsPotential(20_000_000, 20)

    expect(result.monthly).toBe(4_000_000) // 20% of 20M
    expect(result.yearly).toBe(48_000_000) // 4M * 12
    expect(result.fiveYear).toBeGreaterThan(result.yearly * 5) // With compound interest
    expect(result.tenYear).toBeGreaterThan(result.fiveYear * 2)
  })

  it('should handle zero savings rate', () => {
    const result = calculateSavingsPotential(20_000_000, 0)

    expect(result.monthly).toBe(0)
    expect(result.yearly).toBe(0)
    expect(result.fiveYear).toBe(0)
    expect(result.tenYear).toBe(0)
  })

  it('should handle zero net income', () => {
    const result = calculateSavingsPotential(0, 20)

    expect(result.monthly).toBe(0)
    expect(result.yearly).toBe(0)
  })
})