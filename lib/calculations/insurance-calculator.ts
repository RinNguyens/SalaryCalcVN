import {
  INSURANCE_RATES,
  INSURANCE_CAPS,
  MINIMUM_WAGE,
} from '@/lib/constants/tax-brackets';
import type { Region, InsuranceBreakdown } from '@/types/salary';

/**
 * Calculate insurance contributions with proper capping
 */
export function calculateInsurance(
  grossSalary: number,
  region: Region
): InsuranceBreakdown {
  // Cap for BHXH and BHYT (same cap)
  const bhxhBhytCap = INSURANCE_CAPS.BHXH_BHYT;
  const bhxhBhytBase = Math.min(grossSalary, bhxhBhytCap);

  // Cap for BHTN (varies by region)
  const bhtnCap = INSURANCE_CAPS.BHTN[region];
  const bhtnBase = Math.min(grossSalary, bhtnCap);

  // Minimum wage check
  const minWage = MINIMUM_WAGE[region];
  const effectiveBhxhBhytBase = Math.max(bhxhBhytBase, minWage);
  const effectiveBhtnBase = Math.max(bhtnBase, minWage);

  // Calculate each component
  const bhxh = Math.round(effectiveBhxhBhytBase * INSURANCE_RATES.EMPLOYEE.BHXH);
  const bhyt = Math.round(effectiveBhxhBhytBase * INSURANCE_RATES.EMPLOYEE.BHYT);
  const bhtn = Math.round(effectiveBhtnBase * INSURANCE_RATES.EMPLOYEE.BHTN);

  const total = bhxh + bhyt + bhtn;

  return {
    bhxh,
    bhyt,
    bhtn,
    total,
    cappedSalary: effectiveBhxhBhytBase,
    originalSalary: grossSalary,
  };
}

/**
 * Calculate employer's insurance contribution (for reference)
 */
export function calculateEmployerInsurance(
  grossSalary: number,
  region: Region
): InsuranceBreakdown {
  const bhxhBhytCap = INSURANCE_CAPS.BHXH_BHYT;
  const bhxhBhytBase = Math.min(grossSalary, bhxhBhytCap);

  const bhtnCap = INSURANCE_CAPS.BHTN[region];
  const bhtnBase = Math.min(grossSalary, bhtnCap);

  const minWage = MINIMUM_WAGE[region];
  const effectiveBhxhBhytBase = Math.max(bhxhBhytBase, minWage);
  const effectiveBhtnBase = Math.max(bhtnBase, minWage);

  const bhxh = Math.round(effectiveBhxhBhytBase * INSURANCE_RATES.EMPLOYER.BHXH);
  const bhyt = Math.round(effectiveBhxhBhytBase * INSURANCE_RATES.EMPLOYER.BHYT);
  const bhtn = Math.round(effectiveBhtnBase * INSURANCE_RATES.EMPLOYER.BHTN);
  const bhtnld = Math.round(effectiveBhxhBhytBase * INSURANCE_RATES.EMPLOYER.BHTNLD);

  const total = bhxh + bhyt + bhtn + bhtnld;

  return {
    bhxh: bhxh + bhtnld,
    bhyt,
    bhtn,
    total,
    cappedSalary: effectiveBhxhBhytBase,
    originalSalary: grossSalary,
  };
}
