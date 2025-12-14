import { describe, it, expect } from 'vitest'
import { calculateSalaryGrowth, calculateCompoundGrowth, calculateRetirementProjection, getMarketBenchmark } from '../salary-growth'

describe('calculateSalaryGrowth', () => {
  it('should calculate salary growth projection correctly', () => {
    const result = calculateSalaryGrowth({
      currentSalary: 20_000_000,
      yearsOfExperience: 3,
      annualRaise: 10,
      targetYears: 5,
      dependents: 0,
      region: 'I',
    })

    expect(result.currentYear.gross).toBe(20_000_000)
    expect(result.currentYear.net).toBeLessThan(20_000_000)
    expect(result.projections).toHaveLength(5)

    // Check first year projection
    expect(result.projections[0].gross).toBe(22_000_000) // 20M * 1.1
    expect(result.projections[0].raise).toBe(10)
    expect(result.projections[0].cumulativeRaise).toBe(10)

    // Check final year projection
    expect(result.projections[4].gross).toBeCloseTo(32_210_200, -3) // 20M * 1.1^5
    expect(result.totalGrowth.percentage).toBeCloseTo(61, 0)
  })

  it('should calculate with different raise rates', () => {
    const result5 = calculateSalaryGrowth({
      currentSalary: 20_000_000,
      yearsOfExperience: 3,
      annualRaise: 5,
      targetYears: 5,
      dependents: 0,
      region: 'I',
    })

    const result15 = calculateSalaryGrowth({
      currentSalary: 20_000_000,
      yearsOfExperience: 3,
      annualRaise: 15,
      targetYears: 5,
      dependents: 0,
      region: 'I',
    })

    expect(result5.totalGrowth.percentage).toBeLessThan(result15.totalGrowth.percentage)
    expect(result5.projections[4].gross).toBeLessThan(result15.projections[4].gross)
  })

  it('should calculate insights', () => {
    const result = calculateSalaryGrowth({
      currentSalary: 20_000_000,
      yearsOfExperience: 3,
      annualRaise: 15,
      targetYears: 5,
      dependents: 0,
      region: 'I',
    })

    expect(result.insights).toBeInstanceOf(Array)
    expect(result.inspects.length).toBeGreaterThan(0)

    // Check for high growth insight
    const highGrowthInsight = result.insights.find(i => i.category === 'growth')
    expect(highGrowthInsight).toBeDefined()
    expect(highGrowthInsight?.type).toBe('positive')
  })

  it('should handle zero years of experience', () => {
    const result = calculateSalaryGrowth({
      currentSalary: 15_000_000,
      yearsOfExperience: 0,
      annualRaise: 8,
      targetYears: 5,
      dependents: 0,
      region: 'I',
    })

    expect(result.currentYear.age).toBe(22) // Assuming start at 22
    expect(result.projections[4].age).toBe(27)
  })

  it('should handle default values', () => {
    const result = calculateSalaryGrowth({
      currentSalary: 20_000_000,
      yearsOfExperience: 3,
      dependents: 0,
      region: 'I',
    })

    expect(result.projections).toHaveLength(5) // Default targetYears
    expect(result.projections[0].raise).toBe(8) // Default annualRaise
  })
})

describe('calculateCompoundGrowth', () => {
  it('should calculate compound growth correctly', () => {
    expect(calculateCompoundGrowth(1000, 10, 2)).toBe(1210) // 1000 * 1.1^2
    expect(calculateCompoundGrowth(1000, 5, 3)).toBeCloseTo(1157.63, -2)
  })

  it('should handle zero rate', () => {
    expect(calculateCompoundGrowth(1000, 0, 5)).toBe(1000)
  })

  it('should handle zero years', () => {
    expect(calculateCompoundGrowth(1000, 10, 0)).toBe(1000)
  })
})

describe('calculateRetirementProjection', () => {
  it('should calculate retirement projection correctly', () => {
    const result = calculateRetirementProjection(
      30, // currentAge
      60, // retirementAge
      20_000_000, // currentSalary
      20, // savingsRate
      7 // annualReturn
    )

    expect(result.monthlyContribution).toBe(4_000_000) // 20M * 20%
    expect(result.yearlyContribution).toBe(48_000_000)
    expect(result.projection).toHaveLength(31) // 60 - 30 + 1
    expect(result.totalSaved).toBeGreaterThan(result.yearlyContribution * 30) // With returns
  })

  it('should calculate with different parameters', () => {
    const result10 = calculateRetirementProjection(
      30,
      60,
      20_000_000,
      10, // Lower savings rate
      5 // Lower return
    )

    const result30 = calculateRetirementProjection(
      30,
      60,
      20_000_000,
      30, // Higher savings rate
      10 // Higher return
    )

    expect(result10.monthlyContribution).toBe(2_000_000)
    expect(result30.monthlyContribution).toBe(6_000_000)
    expect(result30.totalSaved).toBeGreaterThan(result10.totalSaved)
  })

  it('should handle immediate retirement', () => {
    const result = calculateRetirementProjection(
      60,
      60,
      20_000_000,
      20,
      7
    )

    expect(result.projection).toHaveLength(1)
    expect(result.totalSaved).toBe(0)
  })
})

describe('getMarketBenchmark', () => {
  it('should return correct benchmarks for experience levels', () => {
    const junior = getMarketBenchmark('developer', 1)
    const mid = getMarketBenchmark('developer', 3)
    const senior = getMarketBenchmark('developer', 5)
    const lead = getMarketBenchmark('developer', 7)
    const manager = getMarketBenchmark('developer', 9)

    expect(junior.medianSalary).toBe(11_000_000)
    expect(mid.medianSalary).toBe(20_000_000)
    expect(senior.medianSalary).toBe(32_000_000)
    expect(lead.medianSalary).toBe(45_000_000)
    expect(manager.medianSalary).toBe(55_000_000)

    // Check progression
    expect(mid.medianSalary).toBeGreaterThan(junior.medianSalary)
    expect(senior.medianSalary).toBeGreaterThan(mid.medianSalary)
  })

  it('should handle very experienced professionals', () => {
    const expert = getMarketBenchmark('developer', 15)

    expect(expert.medianSalary).toBe(55_000_000) // Manager level
  })

  it('should handle zero experience', () => {
    const fresher = getMarketBenchmark('developer', 0)

    expect(fresher.medianSalary).toBe(11_000_000) // Junior level
  })
})