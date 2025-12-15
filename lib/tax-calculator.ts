/**
 * Tax Calculation Utilities for Vietnamese Personal Income Tax
 *
 * This module provides functions to calculate taxes based on:
 * - 2025 tax system (7 tiers)
 * - 2026 tax system (5 tiers)
 *
 * And compare the differences
 */

// Tax tier definitions for 2026 (5 tiers) - Official Law
export const TAX_TIERS_2026 = [
  { tier: 1, min: 0, max: 10_000_000, rate: 0.05, deduction: 0 },
  { tier: 2, min: 10_000_000, max: 30_000_000, rate: 0.10, deduction: 500_000 },
  { tier: 3, min: 30_000_000, max: 50_000_000, rate: 0.20, deduction: 3_500_000 },
  { tier: 4, min: 50_000_000, max: 100_000_000, rate: 0.30, deduction: 8_500_000 },
  { tier: 5, min: 100_000_000, max: Infinity, rate: 0.35, deduction: 13_500_000 },
] as const;

// Tax tier definitions for 2025 (7 tiers) - for comparison
export const TAX_TIERS_2025 = [
  { tier: 1, min: 0, max: 5_000_000, rate: 0.05, deduction: 0 },
  { tier: 2, min: 5_000_000, max: 10_000_000, rate: 0.10, deduction: 250_000 },
  { tier: 3, min: 10_000_000, max: 18_000_000, rate: 0.15, deduction: 750_000 },
  { tier: 4, min: 18_000_000, max: 32_000_000, rate: 0.20, deduction: 1_650_000 },
  { tier: 5, min: 32_000_000, max: 52_000_000, rate: 0.25, deduction: 3_250_000 },
  { tier: 6, min: 52_000_000, max: 80_000_000, rate: 0.30, deduction: 5_850_000 },
  { tier: 7, min: 80_000_000, max: Infinity, rate: 0.35, deduction: 9_850_000 },
] as const;

/**
 * Calculate tax using quick formula (2026 - 5 tiers)
 *
 * @param taxableIncome - Thu nhập tính thuế (sau giảm trừ)
 * @returns Thuế phải nộp
 */
export function calculateTax2026(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  const tier = TAX_TIERS_2026.find(t => taxableIncome <= t.max) || TAX_TIERS_2026[4];
  const tax = taxableIncome * tier.rate - tier.deduction;

  return Math.max(0, Math.round(tax));
}

/**
 * Calculate tax using quick formula (2025 - 7 tiers)
 *
 * @param taxableIncome - Thu nhập tính thuế
 * @returns Thuế phải nộp
 */
export function calculateTax2025(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  const tier = TAX_TIERS_2025.find(t => taxableIncome <= t.max) || TAX_TIERS_2025[6];
  const tax = taxableIncome * tier.rate - tier.deduction;

  return Math.max(0, Math.round(tax));
}

/**
 * Calculate detailed tax breakdown per tier (2026)
 *
 * Returns information about which tiers the income falls into
 * and how much tax is paid in each tier
 */
export interface TaxBreakdownTier {
  tier: number;
  min: number;
  max: number;
  rate: number;
  incomeInTier: number;
  taxInTier: number;
  percentage: number;
}

export interface TaxBreakdownResult {
  tiers: TaxBreakdownTier[];
  totalTax: number;
  effectiveRate: number;
  highestTier: number;
}

export function calculateTaxBreakdown2026(taxableIncome: number): TaxBreakdownResult {
  if (taxableIncome <= 0) {
    return {
      tiers: [],
      totalTax: 0,
      effectiveRate: 0,
      highestTier: 0,
    };
  }

  const tiers = TAX_TIERS_2026.map((tier) => {
    let incomeInTier = 0;
    let taxInTier = 0;

    if (taxableIncome > tier.min) {
      if (tier.max === Infinity) {
        incomeInTier = taxableIncome - tier.min;
      } else {
        incomeInTier = Math.min(taxableIncome - tier.min, tier.max - tier.min);
      }
      taxInTier = incomeInTier * tier.rate;
    }

    return {
      tier: tier.tier,
      min: tier.min,
      max: tier.max,
      rate: tier.rate,
      incomeInTier: Math.round(incomeInTier),
      taxInTier: Math.round(taxInTier),
      percentage: taxableIncome > 0 ? (incomeInTier / taxableIncome) * 100 : 0,
    };
  }).filter(t => t.incomeInTier > 0);

  const totalTax = tiers.reduce((sum, t) => sum + t.taxInTier, 0);
  const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;
  const highestTier = tiers.length > 0 ? tiers[tiers.length - 1].tier : 0;

  return {
    tiers,
    totalTax,
    effectiveRate,
    highestTier,
  };
}

/**
 * Find which tier the income falls into
 *
 * @param taxableIncome - Thu nhập tính thuế
 * @param year - Year to use (2025 or 2026)
 * @returns Tier number (1-7 for 2025, 1-5 for 2026)
 */
export function findTaxTier(
  taxableIncome: number,
  year: '2025' | '2026' = '2026'
): number {
  const tiers = year === '2026' ? TAX_TIERS_2026 : TAX_TIERS_2025;
  return tiers.findIndex(t => taxableIncome <= t.max) + 1;
}

/**
 * Calculate savings from 2026 tax reform
 *
 * Compares tax liability under 2025 (7 tiers) vs 2026 (5 tiers)
 */
export interface TaxSavingsResult {
  tax2025: number;
  tax2026: number;
  savings: number;
  savingsPercentage: number;
  savingsPerYear: number;
}

export function calculateTaxSavings(taxableIncome: number): TaxSavingsResult {
  const tax2025 = calculateTax2025(taxableIncome);
  const tax2026 = calculateTax2026(taxableIncome);
  const savings = Math.max(0, tax2025 - tax2026);
  const savingsPercentage = tax2025 > 0 ? (savings / tax2025) * 100 : 0;

  return {
    tax2025,
    tax2026,
    savings,
    savingsPercentage,
    savingsPerYear: savings * 12,
  };
}

/**
 * Get tax tier information
 */
export function getTaxTierInfo(tier: number, year: '2025' | '2026' = '2026') {
  const tiers = year === '2026' ? TAX_TIERS_2026 : TAX_TIERS_2025;
  return tiers[tier - 1];
}

/**
 * Calculate taxable income from gross
 *
 * @param gross - Gross salary
 * @param dependents - Number of dependents
 * @returns Taxable income after all deductions
 */
export function calculateTaxableIncome(
  gross: number,
  dependents: number = 0,
  year: '2025' | '2026' = '2026'
): number {
  // Insurance deductions (employer's portion)
  const bhxh = Math.min(gross, 46_800_000) * 0.08; // 8%
  const bhyt = Math.min(gross, 46_800_000) * 0.015; // 1.5%
  const bhtn = Math.min(gross, 99_200_000) * 0.01; // 1%

  const totalInsurance = bhxh + bhyt + bhtn;

  // Personal deductions - Updated 2026 values
  const personalDeduction = year === '2026' ? 15_500_000 : 11_000_000;
  const dependentDeduction = dependents * (year === '2026' ? 6_200_000 : 4_400_000);

  const taxableIncome = gross - totalInsurance - personalDeduction - dependentDeduction;

  return Math.max(0, taxableIncome);
}

/**
 * Calculate net salary from gross
 *
 * Complete calculation including insurance and tax
 */
export interface NetSalaryResult {
  gross: number;
  bhxh: number;
  bhyt: number;
  bhtn: number;
  totalInsurance: number;
  taxableIncome: number;
  tax: number;
  net: number;
}

export function calculateNetSalary(
  gross: number,
  dependents: number = 0,
  year: '2025' | '2026' = '2026'
): NetSalaryResult {
  // Calculate insurance
  const bhxh = Math.round(Math.min(gross, 46_800_000) * 0.08);
  const bhyt = Math.round(Math.min(gross, 46_800_000) * 0.015);
  const bhtn = Math.round(Math.min(gross, 99_200_000) * 0.01);
  const totalInsurance = bhxh + bhyt + bhtn;

  // Calculate taxable income with updated deduction amounts
  const personalDeduction = year === '2026' ? 15_500_000 : 11_000_000;
  const dependentDeduction = dependents * (year === '2026' ? 6_200_000 : 4_400_000);
  const taxableIncome = Math.max(
    0,
    gross - totalInsurance - personalDeduction - dependentDeduction
  );

  // Calculate tax
  const tax = year === '2026'
    ? calculateTax2026(taxableIncome)
    : calculateTax2025(taxableIncome);

  // Calculate net
  const net = gross - totalInsurance - tax;

  return {
    gross,
    bhxh,
    bhyt,
    bhtn,
    totalInsurance,
    taxableIncome,
    tax,
    net,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(
  amount: number,
  options?: {
    short?: boolean;
    decimals?: number;
  }
): string {
  const { short = false, decimals = 0 } = options || {};

  if (short && amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(decimals)}M`;
  }

  if (short && amount >= 1_000) {
    return `${(amount / 1_000).toFixed(decimals)}K`;
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}