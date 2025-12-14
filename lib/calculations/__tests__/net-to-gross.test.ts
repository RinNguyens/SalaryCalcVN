import { describe, it, expect } from 'vitest'
import { calculateGrossFromNet } from '../net-to-gross'
import { calculateNetFromGross } from '../gross-to-net'

describe('calculateGrossFromNet', () => {
  it('should calculate gross from net correctly', () => {
    // First calculate net from a known gross
    const originalGross = 20_000_000
    const netResult = calculateNetFromGross({
      salary: originalGross,
      dependents: 0,
      region: 'I',
    })

    // Now calculate gross back from that net
    const grossResult = calculateGrossFromNet({
      salary: netResult.net,
      dependents: 0,
      region: 'I',
    })

    // Should be very close to original (within tolerance)
    expect(Math.abs(grossResult.gross - originalGross)).toBeLessThan(1000)
  })

  it('should work with different numbers of dependents', () => {
    const targetNet = 15_000_000
    const dependents = 2

    const result = calculateGrossFromNet({
      salary: targetNet,
      dependents,
      region: 'I',
    })

    // Verify that the calculated gross produces the target net
    const verification = calculateNetFromGross({
      salary: result.gross,
      dependents,
      region: 'I',
    })

    expect(Math.abs(verification.net - targetNet)).toBeLessThan(1000)
  })

  it('should work across different regions', () => {
    const targetNet = 15_000_000

    for (const region of ['I', 'II', 'III', 'IV'] as const) {
      const result = calculateGrossFromNet({
        salary: targetNet,
        dependents: 0,
        region,
      })

      const verification = calculateNetFromGross({
        salary: result.gross,
        dependents: 0,
        region,
      })

      expect(Math.abs(verification.net - targetNet)).toBeLessThan(1000)
    }
  })

  it('should handle low salaries correctly', () => {
    const targetNet = 5_000_000

    const result = calculateGrossFromNet({
      salary: targetNet,
      dependents: 0,
      region: 'I',
    })

    expect(result.gross).toBeGreaterThan(targetNet)
    expect(result.net).toBeCloseTo(targetNet, -3) // Within 1000
  })

  it('should handle high salaries correctly', () => {
    const targetNet = 50_000_000

    const result = calculateGrossFromNet({
      salary: targetNet,
      dependents: 0,
      region: 'I',
    })

    const verification = calculateNetFromGross({
      salary: result.gross,
      dependents: 0,
      region: 'I',
    })

    expect(Math.abs(verification.net - targetNet)).toBeLessThan(1000)
  })

  it('should include all required fields in result', () => {
    const result = calculateGrossFromNet({
      salary: 15_000_000,
      dependents: 1,
      region: 'II',
    })

    expect(result).toHaveProperty('gross')
    expect(result).toHaveProperty('net')
    expect(result).toHaveProperty('insurance')
    expect(result).toHaveProperty('tax')
    expect(result).toHaveProperty('deductions')
    expect(result).toHaveProperty('monthlyBreakdown')
    expect(result).toHaveProperty('yearlyProjection')

    expect(result.insurance).toHaveProperty('bhxh')
    expect(result.insurance).toHaveProperty('bhyt')
    expect(result.insurance).toHaveProperty('bhtn')
    expect(result.insurance).toHaveProperty('total')

    expect(result.tax).toHaveProperty('taxableIncome')
    expect(result.tax).toHaveProperty('tax')
    expect(result.tax).toHaveProperty('bracket')
  })
})