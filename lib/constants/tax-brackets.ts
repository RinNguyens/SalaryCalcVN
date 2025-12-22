export const TAX_BRACKETS_2025 = [
  {
    max: 5_000_000,
    rate: 0.05,
    deduction: 0,
    label: 'Bậc 1: ≤5 triệu'
  },
  {
    max: 10_000_000,
    rate: 0.10,
    deduction: 250_000,
    label: 'Bậc 2: 5-10 triệu'
  },
  {
    max: 18_000_000,
    rate: 0.15,
    deduction: 750_000,
    label: 'Bậc 3: 10-18 triệu'
  },
  {
    max: 32_000_000,
    rate: 0.20,
    deduction: 1_650_000,
    label: 'Bậc 4: 18-32 triệu'
  },
  {
    max: 52_000_000,
    rate: 0.25,
    deduction: 3_250_000,
    label: 'Bậc 5: 32-52 triệu'
  },
  {
    max: 80_000_000,
    rate: 0.30,
    deduction: 5_850_000,
    label: 'Bậc 6: 52-80 triệu'
  },
  {
    max: Infinity,
    rate: 0.35,
    deduction: 9_850_000,
    label: 'Bậc 7: >80 triệu'
  },
] as const;

export const TAX_BRACKETS_2026 = [
  {
    max: 10_000_000,
    rate: 0.05,
    deduction: 0,
    label: 'Bậc 1: ≤10 triệu'
  },
  {
    max: 30_000_000,
    rate: 0.10,
    deduction: 500_000,
    label: 'Bậc 2: 10-30 triệu'
  },
  {
    max: 60_000_000,
    rate: 0.20,
    deduction: 3_500_000,
    label: 'Bậc 3: 30-60 triệu'
  },
  {
    max: 100_000_000,
    rate: 0.30,
    deduction: 9_500_000,
    label: 'Bậc 4: 60-100 triệu'
  },
  {
    max: Infinity,
    rate: 0.35,
    deduction: 14_500_000,
    label: 'Bậc 5: >100 triệu'
  },
] as const;

// Default to 2025 brackets for backward compatibility
export const TAX_BRACKETS = TAX_BRACKETS_2025;

export const DEDUCTIONS = {
  CURRENT: {
    PERSONAL: 11_000_000, // Current rate (2025)
    DEPENDENT: 4_400_000, // Current rate (2025)
  },
  FROM_2026: {
    PERSONAL: 15_500_000, // New rate from 2026
    DEPENDENT: 6_200_000, // New rate from 2026
  }
} as const;

// Helper function to get deduction rates based on year
export function getDeductions(year?: number): {
  PERSONAL: number;
  DEPENDENT: number;
} {
  // If no year specified, use current year
  const currentYear = year || new Date().getFullYear();

  // Apply 2026 rates from January 1, 2026
  if (currentYear >= 2026) {
    return DEDUCTIONS.FROM_2026;
  }

  return DEDUCTIONS.CURRENT;
}

export const INSURANCE_RATES = {
  EMPLOYEE: {
    BHXH: 0.08,
    BHYT: 0.015,
    BHTN: 0.01,
    TOTAL: 0.105,
  },
  EMPLOYER: {
    BHXH: 0.17,
    BHYT: 0.03,
    BHTN: 0.01,
    BHTNLD: 0.005,
    TOTAL: 0.215,
  },
} as const;

export const SALARY_BASE = 2_340_000; // Mức lương cơ sở từ 1/7/2024

export const INSURANCE_CAPS = {
  BHXH_BHYT: 20 * SALARY_BASE, // 46,800,000
  BHTN: {
    I: 99_200_000,
    II: 88_200_000,
    III: 77_200_000,
    IV: 69_000_000,
  },
} as const;

export const MINIMUM_WAGE = {
  I: 4_960_000,
  II: 4_410_000,
  III: 3_860_000,
  IV: 3_450_000,
} as const;

export const REGIONS = [
  {
    value: 'I' as const,
    label: 'Vùng I - HN, HCM',
    minWage: 4_960_000,
  },
  {
    value: 'II' as const,
    label: 'Vùng II - Đô thị lớn',
    minWage: 4_410_000,
  },
  {
    value: 'III' as const,
    label: 'Vùng III - Tỉnh thành',
    minWage: 3_860_000,
  },
  {
    value: 'IV' as const,
    label: 'Vùng IV - Nông thôn',
    minWage: 3_450_000,
  },
] as const;
