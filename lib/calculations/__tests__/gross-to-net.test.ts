import { describe, it, expect } from 'vitest'
import { calculateNetFromGross, formatCurrency } from '../gross-to-net'

describe('calculateNetFromGross', () => {
  it('should calculate net salary correctly for basic case', () => {
    const result = calculateNetFromGross({
      salary: 20_000_000,
      dependents: 0,
      region: 'I',
    })

    expect(result.gross).toBe(20_000_000)
    expect(result.insurance.total).toBeGreaterThan(0)
    expect(result.tax.tax).toBeGreaterThanOrEqual(0)
    expect(result.net).toBeLessThan(result.gross)
    expect(result.net).toBeGreaterThan(0)
  })

  it('should apply insurance caps correctly', () => {
    const highSalary = calculateNetFromGross({
      salary: 100_000_000,
      dependents: 0,
      region: 'I',
    })

    // Insurance should be capped
    const expectedMaxInsurance = Math.round(46_800_000 * 0.105) // Max base * 10.5%
    expect(highSalary.insurance.total).toBeLessThanOrEqual(expectedMaxInsurance)
  })

  it('should apply dependent deductions correctly', () => {
    const withoutDependents = calculateNetFromGross({
      salary: 30_000_000,
      dependents: 0,
      region: 'I',
    })

    const withDependents = calculateNetFromGross({
      salary: 30_000_000,
      dependents: 2,
      region: 'I',
    })

    expect(withDependents.net).toBeGreaterThan(withoutDependents.net)
    expect(withDependents.deductions.dependents).toBe(2 * 4_400_000)
  })

  it('should handle minimum salary correctly', () => {
    const result = calculateNetFromGross({
      salary: 5_000_000,
      dependents: 0,
      region: 'I',
    })

    expect(result.gross).toBe(5_000_000)
    expect(result.net).toBeGreaterThan(0)
    // Insurance should be calculated on minimum wage if below
    expect(result.insurance.cappedSalary).toBeGreaterThanOrEqual(4_960_000)
  })

  it('should calculate tax correctly for different brackets', () => {
    // Test different tax brackets
    const bracket1 = calculateNetFromGross({
      salary: 10_000_000,
      dependents: 0,
      region: 'I',
    })

    const bracket2 = calculateNetFromGross({
      salary: 20_000_000,
      dependents: 0,
      region: 'I',
    })

    expect(bracket2.tax.tax).toBeGreaterThan(bracket1.tax.tax)
    expect(bracket2.tax.bracket).toBeGreaterThan(bracket1.tax.bracket)
  })

  it('should calculate yearly projections correctly', () => {
    const result = calculateNetFromGross({
      salary: 20_000_000,
      dependents: 0,
      region: 'I',
    })

    expect(result.yearlyProjection.grossYearly).toBe(20_000_000 * 12)
    expect(result.yearlyProjection.netYearly).toBe(result.net * 12)
    expect(result.yearlyProjection.totalTax).toBe(result.tax.tax * 12)
    expect(result.yearlyProjection.totalInsurance).toBe(result.insurance.total * 12)
  })

  it('should handle exemptions correctly', () => {
    const withExemptions = calculateNetFromGross({
      salary: 20_000_000,
      dependents: 0,
      region: 'I',
      exemptions: 1_000_000,
    })

    const withoutExemptions = calculateNetFromGross({
      salary: 20_000_000,
      dependents: 0,
      region: 'I',
      exemptions: 0,
    })

    expect(withExemptions.net).toBeGreaterThan(withoutExemptions.net)
  })
})

describe('formatCurrency', () => {
  it('should format numbers as VND currency', () => {
    expect(formatCurrency(1000000)).toBe('₫1,000,000')
    expect(formatCurrency(0)).toBe('₫0')
    expect(formatCurrency(1234.56)).toBe('₫1,235')
    expect(formatCurrency(999999999)).toBe('₫999,999,999')
  })
})