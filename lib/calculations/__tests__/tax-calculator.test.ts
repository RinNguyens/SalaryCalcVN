import { describe, it, expect } from 'vitest'
import { calculateTax, calculateDeductions } from '../tax-calculator'

describe('calculateTax', () => {
  it('should return zero for non-taxable income', () => {
    const result = calculateTax(0)

    expect(result.tax).toBe(0)
    expect(result.bracket).toBe(0)
    expect(result.effectiveRate).toBe(0)
    expect(result.marginalRate).toBe(0)
  })

  it('should calculate tax for bracket 1 correctly (≤ 5 million)', () => {
    const result = calculateTax(5_000_000)

    expect(result.tax).toBe(5_000_000 * 0.05) // 250,000
    expect(result.bracket).toBe(1)
    expect(result.marginalRate).toBe(0.05)
    expect(result.effectiveRate).toBe(0.05)
  })

  it('should calculate tax for bracket 2 correctly (5-10 million)', () => {
    const result = calculateTax(7_000_000)

    // Using quick formula: 7M * 10% - 250K
    const expected = 7_000_000 * 0.10 - 250_000
    expect(result.tax).toBe(expected)
    expect(result.bracket).toBe(2)
    expect(result.marginalRate).toBe(0.10)
  })

  it('should calculate tax for bracket 3 correctly (10-18 million)', () => {
    const result = calculateTax(15_000_000)

    // Using quick formula: 15M * 15% - 750K
    const expected = 15_000_000 * 0.15 - 750_000
    expect(result.tax).toBe(expected)
    expect(result.bracket).toBe(3)
    expect(result.marginalRate).toBe(0.15)
  })

  it('should calculate tax for bracket 4 correctly (18-32 million)', () => {
    const result = calculateTax(25_000_000)

    // Using quick formula: 25M * 20% - 1.65M
    const expected = 25_000_000 * 0.20 - 1_650_000
    expect(result.tax).toBe(expected)
    expect(result.bracket).toBe(4)
    expect(result.marginalRate).toBe(0.20)
  })

  it('should calculate tax for bracket 5 correctly (32-52 million)', () => {
    const result = calculateTax(40_000_000)

    // Using quick formula: 40M * 25% - 3.25M
    const expected = 40_000_000 * 0.25 - 3_250_000
    expect(result.tax).toBe(expected)
    expect(result.bracket).toBe(5)
    expect(result.marginalRate).toBe(0.25)
  })

  it('should calculate tax for bracket 6 correctly (52-80 million)', () => {
    const result = calculateTax(60_000_000)

    // Using quick formula: 60M * 30% - 5.85M
    const expected = 60_000_000 * 0.30 - 5_850_000
    expect(result.tax).toBe(expected)
    expect(result.bracket).toBe(6)
    expect(result.marginalRate).toBe(0.30)
  })

  it('should calculate tax for bracket 7 correctly (> 80 million)', () => {
    const result = calculateTax(100_000_000)

    // Using quick formula: 100M * 35% - 9.85M
    const expected = 100_000_000 * 0.35 - 9_850_000
    expect(result.tax).toBe(expected)
    expect(result.bracket).toBe(7)
    expect(result.marginalRate).toBe(0.35)
  })

  it('should calculate effective rate correctly', () => {
    const result = calculateTax(10_000_000)

    // Tax should be: 10M * 10% - 250K = 750K
    // Effective rate: 750K / 10M = 7.5%
    expect(result.effectiveRate).toBe(0.075)
  })

  it('should handle edge cases at bracket boundaries', () => {
    // Test exact boundaries
    const bracket1 = calculateTax(5_000_000)
    const bracket2 = calculateTax(5_000_001)

    expect(bracket1.bracket).toBe(1)
    expect(bracket2.bracket).toBe(2)
    expect(bracket2.tax).toBeGreaterThan(bracket1.tax)
  })
})

describe('calculateDeductions', () => {
  it('should calculate personal deduction correctly', () => {
    const result = calculateDeductions(0)

    expect(result.personal).toBe(11_000_000)
    expect(result.dependents).toBe(0)
    expect(result.total).toBe(11_000_000)
  })

  it('should calculate dependent deductions correctly', () => {
    const result = calculateDeductions(2)

    expect(result.personal).toBe(11_000_000)
    expect(result.dependents).toBe(2 * 4_400_000)
    expect(result.total).toBe(11_000_000 + 2 * 4_400_000)
  })

  it('should handle zero dependents', () => {
    const result = calculateDeductions(0)

    expect(result.total).toBe(11_000_000)
  })

  it('should handle multiple dependents', () => {
    for (let i = 0; i <= 5; i++) {
      const result = calculateDeductions(i)
      expect(result.total).toBe(11_000_000 + i * 4_400_000)
    }
  })
})