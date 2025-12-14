import { describe, it, expect } from 'vitest'
import { calculateInsurance, calculateEmployerInsurance } from '../insurance-calculator'
import type { Region } from '@/types/salary'

describe('calculateInsurance', () => {
  it('should calculate insurance correctly for normal salary', () => {
    const result = calculateInsurance(20_000_000, 'I')

    expect(result.bhxh).toBe(Math.round(20_000_000 * 0.08))
    expect(result.bhyt).toBe(Math.round(20_000_000 * 0.015))
    expect(result.bhtn).toBe(Math.round(20_000_000 * 0.01))
    expect(result.total).toBe(result.bhxh + result.bhyt + result.bhtn)
    expect(result.originalSalary).toBe(20_000_000)
  })

  it('should apply insurance caps for high salaries', () => {
    const highSalary = 100_000_000
    const result = calculateInsurance(highSalary, 'I')

    const maxBase = 46_800_000 // 20 * salary base
    const expectedMaxBhxh = Math.round(maxBase * 0.08)
    const expectedMaxBhyt = Math.round(maxBase * 0.015)

    expect(result.bhxh).toBe(expectedMaxBhxh)
    expect(result.bhyt).toBe(expectedMaxBhyt)
    expect(result.cappedSalary).toBe(maxBase)
  })

  it('should apply minimum wage for low salaries', () => {
    const lowSalary = 3_000_000
    const result = calculateInsurance(lowSalary, 'I')

    const minWageI = 4_960_000
    const expectedBhxh = Math.round(minWageI * 0.08)
    const expectedBhyt = Math.round(minWageI * 0.015)

    expect(result.bhxh).toBe(expectedBhxh)
    expect(result.bhyt).toBe(expectedBhyt)
    expect(result.cappedSalary).toBe(minWageI)
  })

  it('should handle different regions for BHTN', () => {
    const salary = 50_000_000

    const regionI = calculateInsurance(salary, 'I')
    const regionII = calculateInsurance(salary, 'II')
    const regionIII = calculateInsurance(salary, 'III')
    const regionIV = calculateInsurance(salary, 'IV')

    // BHTN caps vary by region
    expect(regionI.bhtn).toBeGreaterThan(0)
    expect(regionII.bhtn).toBeGreaterThan(0)
    expect(regionIII.bhtn).toBeGreaterThan(0)
    expect(regionIV.bhtn).toBeGreaterThan(0)

    // BHXH and BHYT should be the same across regions
    expect(regionI.bhxh).toBe(regionII.bhxh)
    expect(regionII.bhxh).toBe(regionIII.bhxh)
    expect(regionIII.bhxh).toBe(regionIV.bhxh)
  })

  it('should return correct total rate', () => {
    const result = calculateInsurance(20_000_000, 'I')
    const expectedTotal = result.bhxh + result.bhyt + result.bhtn
    expect(result.total).toBe(expectedTotal)
  })
})

describe('calculateEmployerInsurance', () => {
  it('should calculate employer contribution correctly', () => {
    const result = calculateEmployerInsurance(20_000_000, 'I')

    // Employer rates are higher
    expect(result.bhxh).toBe(Math.round(20_000_000 * 0.17))
    expect(result.bhyt).toBe(Math.round(20_000_000 * 0.03))
    expect(result.bhtn).toBe(Math.round(20_000_000 * 0.01))
    expect(result.total).toBe(result.bhxh + result.bhyt + result.bhtn + Math.round(20_000_000 * 0.005))
  })

  it('should be higher than employee contribution', () => {
    const salary = 20_000_000
    const region = 'I' as Region

    const employee = calculateInsurance(salary, region)
    const employer = calculateEmployerInsurance(salary, region)

    expect(employer.total).toBeGreaterThan(employee.total)
    expect(employer.bhxh).toBeGreaterThan(employee.bhxh)
    expect(employer.bhyt).toBeGreaterThan(employee.bhyt)
  })
})