/**
 * Local storage for Anonymous Salary Sharing Platform
 * For production, this should be replaced with a proper database
 */

import type { SalaryShare, SalaryShareForm, SalaryStatistics, ShareVerification } from '@/types/salary-sharing';

const STORAGE_KEYS = {
  SALARY_SHARES: 'salary_calc_vn_shares',
  VERIFICATIONS: 'salary_calc_vn_verifications',
  USER_SHARES: 'salary_calc_vn_user_shares',
} as const;

// Generate unique anonymous ID
export function generateAnonymousId(): string {
  return 'anon_' + Math.random().toString(36).substr(2, 9);
}

// Generate share token
export function generateShareToken(): string {
  return 'share_' + Math.random().toString(36).substr(2, 16);
}

// Generate verification token
export function generateVerificationToken(): string {
  return 'verify_' + Math.random().toString(36).substr(2, 20);
}

// Save salary share to local storage
export function saveSalaryShare(data: SalaryShareForm): SalaryShare {
  const shares = getAllSalaryShares();

  const newShare: SalaryShare = {
    id: generateAnonymousId(),
    shareToken: generateShareToken(),
    anonymousId: generateAnonymousId(),
    companyInfo: {
      industry: data.companyIndustry || '',
      size: data.companySize || '',
      location: data.companyLocation || '',
      type: data.companyType || 'local',
    },
    position: {
      title: data.positionTitle || '',
      level: data.positionLevel || '',
      department: data.positionDepartment || '',
      field: data.positionField || '',
    },
    compensation: {
      baseSalary: data.baseSalary || 0,
      bonuses: {
        performance: data.performanceBonus || 0,
        signing: data.signingBonus || 0,
        '13thMonth': data.thirteenthMonth || 0,
        other: data.otherBonuses || 0,
      },
      benefits: {
        healthInsurance: data.healthInsurance || 0,
        mealAllowance: data.mealAllowance || 0,
        transport: data.transportAllowance || 0,
        phone: data.phoneAllowance || 0,
        internet: data.internetAllowance || 0,
        gym: data.gymAllowance || 0,
        learning: data.learningBudget || 0,
        other: data.otherBenefits || 0,
      },
      totalCompensation: calculateTotalCompensation(data),
    },
    experience: {
      totalYears: data.totalExperience || 0,
      relevantYears: data.relevantExperience || 0,
      managementYears: data.managementExperience || 0,
      companyYears: data.companyExperience || 0,
    },
    education: {
      level: data.educationLevel || 'bachelor',
      field: data.educationField || '',
      hasRelevantDegree: data.hasRelevantDegree || false,
    },
    skills: {
      technical: data.technicalSkills || [],
      soft: data.softSkills || [],
      languages: data.languages || [],
      certifications: data.certifications || [],
    },
    workDetails: {
      workingDaysPerWeek: data.workingDaysPerWeek || 5,
      workingHoursPerDay: data.workingHoursPerDay || 8,
      remoteDaysPerWeek: data.remoteDaysPerWeek || 0,
      overtimeFrequency: data.overtimeFrequency || 'rare',
      overtimePaid: data.overtimePaid || false,
    },
    career: {
      lastPromotion: data.lastPromotion || '',
      nextPromotionExpected: data.nextPromotionExpected || '',
      reviewCycle: data.reviewCycle || '',
      trainingOpportunities: data.trainingOpportunities || false,
      careerProgression: data.careerProgression || 'normal',
    },
    satisfaction: {
      overall: data.overallSatisfaction || 5,
      salary: data.salarySatisfaction || 5,
      workLifeBalance: data.workLifeBalanceSatisfaction || 5,
      benefits: data.benefitsSatisfaction || 5,
      culture: data.cultureSatisfaction || 5,
      growth: data.growthSatisfaction || 5,
    },
    verification: {
      status: data.verificationMethod === 'none' ? 'verified' : 'pending',
      method: data.verificationMethod || 'none',
    },
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      ipAddress: 'unknown',
      userAgent: navigator.userAgent,
      source: 'web_form',
    },
    sharing: {
      isPublic: data.isPublicShare || true,
      shareInComparisons: data.shareInComparisons !== false,
      shareInStatistics: data.shareInStatistics !== false,
      allowContact: data.allowContact || false,
      contactEmail: data.contactEmail,
    },
  };

  shares.push(newShare);
  localStorage.setItem(STORAGE_KEYS.SALARY_SHARES, JSON.stringify(shares));

  // Track user shares
  const userShares = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_SHARES) || '[]');
  userShares.push(newShare.id);
  localStorage.setItem(STORAGE_KEYS.USER_SHARES, JSON.stringify(userShares));

  return newShare;
}

// Get all salary shares
export function getAllSalaryShares(): SalaryShare[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SALARY_SHARES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading salary shares:', error);
    return [];
  }
}

// Get verified salary shares
export function getVerifiedSalaryShares(): SalaryShare[] {
  const shares = getAllSalaryShares();
  return shares.filter(share => share.verification.status === 'verified');
}

// Get public salary shares
export function getPublicSalaryShares(): SalaryShare[] {
  const shares = getAllSalaryShares();
  return shares.filter(share =>
    share.sharing.isPublic && share.verification.status === 'verified'
  );
}

// Get salary shares for comparison
export function getSharesForComparison(): SalaryShare[] {
  const shares = getAllSalaryShares();
  return shares.filter(share =>
    share.sharing.shareInComparisons && share.verification.status === 'verified'
  );
}

// Calculate total compensation
function calculateTotalCompensation(data: any): number {
  const base = data.baseSalary || 0;
  const performanceBonus = (data.performanceBonus || 0) / 12;
  const health = data.healthInsurance || 0;
  const meal = data.mealAllowance || 0;
  const transport = data.transportAllowance || 0;
  const phone = data.phoneAllowance || 0;
  const internet = data.internetAllowance || 0;
  const gym = data.gymAllowance || 0;
  const learning = (data.learningBudget || 0) / 12;
  const other = data.otherBenefits || 0;

  return base + performanceBonus + health + meal + transport + phone + internet + gym + learning + other;
}

// Get salary statistics
export function getSalaryStatistics(): SalaryStatistics {
  const shares = getVerifiedSalaryShares();
  const publicShares = getPublicSalaryShares();

  // Position statistics
  const positionStats: Record<string, any> = {};
  shares.forEach(share => {
    const position = share.position.title;
    if (!positionStats[position]) {
      positionStats[position] = {
        count: 0,
        salaries: [],
      };
    }
    positionStats[position].count++;
    positionStats[position].salaries.push(share.compensation.totalCompensation);
  });

  // Calculate position aggregates
  Object.keys(positionStats).forEach(position => {
    const salaries = positionStats[position].salaries.sort((a: number, b: number) => a - b);
    positionStats[position] = {
      count: salaries.length,
      averageSalary: salaries.reduce((a: number, b: number) => a + b, 0) / salaries.length,
      medianSalary: salaries[Math.floor(salaries.length / 2)],
      minSalary: salaries[0],
      maxSalary: salaries[salaries.length - 1],
      salaryRange: `${formatCurrency(salaries[0])} - ${formatCurrency(salaries[salaries.length - 1])}`,
    };
  });

  // Industry statistics
  const industryStats: Record<string, any> = {};
  shares.forEach(share => {
    const industry = share.companyInfo.industry;
    if (!industryStats[industry]) {
      industryStats[industry] = {
        count: 0,
        salaries: [],
        positions: [],
      };
    }
    industryStats[industry].count++;
    industryStats[industry].salaries.push(share.compensation.totalCompensation);
    industryStats[industry].positions.push({
      position: share.position.title,
      salary: share.compensation.totalCompensation,
    });
  });

  // Calculate industry aggregates
  Object.keys(industryStats).forEach(industry => {
    const salaries = industryStats[industry].salaries;
    const positions = industryStats[industry].positions
      .sort((a: any, b: any) => b.salary - a.salary)
      .slice(0, 5);

    industryStats[industry] = {
      count: salaries.length,
      averageSalary: salaries.reduce((a: number, b: number) => a + b, 0) / salaries.length,
      medianSalary: salaries.sort((a: number, b: number) => a - b)[Math.floor(salaries.length / 2)],
      topPositions: positions,
    };
  });

  // Location statistics
  const locationStats: Record<string, any> = {};
  shares.forEach(share => {
    const location = share.companyInfo.location;
    if (!locationStats[location]) {
      locationStats[location] = {
        count: 0,
        salaries: [],
      };
    }
    locationStats[location].count++;
    locationStats[location].salaries.push(share.compensation.totalCompensation);
  });

  // Calculate location aggregates
  Object.keys(locationStats).forEach(location => {
    const salaries = locationStats[location].salaries;
    locationStats[location] = {
      count: salaries.length,
      averageSalary: salaries.reduce((a: number, b: number) => a + b, 0) / salaries.length,
      medianSalary: salaries.sort((a: number, b: number) => a - b)[Math.floor(salaries.length / 2)],
      costOfLivingIndex: getCostOfLivingIndex(location),
      realWageIndex: calculateRealWageIndex(salaries, location),
    };
  });

  // Experience statistics
  const experienceStats: Record<string, any> = {};
  shares.forEach(share => {
    const expRange = getExperienceRange(share.experience.totalYears);
    if (!experienceStats[expRange]) {
      experienceStats[expRange] = {
        count: 0,
        salaries: [],
        promotionTimes: [],
      };
    }
    experienceStats[expRange].count++;
    experienceStats[expRange].salaries.push(share.compensation.totalCompensation);

    if (share.career.lastPromotion) {
      const timeSincePromo = parseTimeToMonths(share.career.lastPromotion);
      experienceStats[expRange].promotionTimes.push(timeSincePromo);
    }
  });

  // Calculate experience aggregates
  Object.keys(experienceStats).forEach(range => {
    const salaries = experienceStats[range].salaries;
    const promotionTimes = experienceStats[range].promotionTimes;

    experienceStats[range] = {
      count: salaries.length,
      averageSalary: salaries.reduce((a: number, b: number) => a + b, 0) / salaries.length,
      salaryGrowth: calculateSalaryGrowth(salaries),
      promotionTime: promotionTimes.length > 0
        ? promotionTimes.reduce((a: number, b: number) => a + b, 0) / promotionTimes.length
        : 0,
    };
  });

  // Company size statistics
  const companySizeStats: Record<string, any> = {};
  shares.forEach(share => {
    const size = share.companyInfo.size;
    if (!companySizeStats[size]) {
      companySizeStats[size] = {
        count: 0,
        salaries: [],
        benefits: [],
        workLifeBalance: [],
      };
    }
    companySizeStats[size].count++;
    companySizeStats[size].salaries.push(share.compensation.totalCompensation);
    companySizeStats[size].benefits.push(calculateBenefitsTotal(share));
    companySizeStats[size].workLifeBalance.push(share.satisfaction.workLifeBalance);
  });

  // Calculate company size aggregates
  Object.keys(companySizeStats).forEach(size => {
    const salaries = companySizeStats[size].salaries;
    const benefits = companySizeStats[size].benefits;
    const workLifeBalance = companySizeStats[size].workLifeBalance;

    companySizeStats[size] = {
      count: salaries.length,
      averageSalary: salaries.reduce((a: number, b: number) => a + b, 0) / salaries.length,
      benefitsValue: benefits.reduce((a: number, b: number) => a + b, 0) / benefits.length,
      workLifeBalance: workLifeBalance.reduce((a: number, b: number) => a + b, 0) / workLifeBalance.length,
    };
  });

  // Benefits statistics
  const benefitsValue = shares.reduce((sum, share) => sum + calculateBenefitsTotal(share), 0) / shares.length;
  const benefitsBreakdown = calculateBenefitsBreakdown(shares);
  const salaryAverage = shares.reduce((sum, share) => sum + share.compensation.baseSalary, 0) / shares.length;

  // Satisfaction statistics
  const satisfactionStats = {
    overallAverage: shares.reduce((sum, share) => sum + share.satisfaction.overall, 0) / shares.length,
    salaryAverage: shares.reduce((sum, share) => sum + share.satisfaction.salary, 0) / shares.length,
    workLifeBalanceAverage: shares.reduce((sum, share) => sum + share.satisfaction.workLifeBalance, 0) / shares.length,
    factors: {
      overall: shares.reduce((sum, share) => sum + share.satisfaction.overall, 0) / shares.length,
      salary: shares.reduce((sum, share) => sum + share.satisfaction.salary, 0) / shares.length,
      workLifeBalance: shares.reduce((sum, share) => sum + share.satisfaction.workLifeBalance, 0) / shares.length,
      benefits: shares.reduce((sum, share) => sum + share.satisfaction.benefits, 0) / shares.length,
      culture: shares.reduce((sum, share) => sum + share.satisfaction.culture, 0) / shares.length,
      growth: shares.reduce((sum, share) => sum + share.satisfaction.growth, 0) / shares.length,
    },
  };

  return {
    totalShares: shares.length,
    verifiedShares: publicShares.length,
    positionStats,
    industryStats,
    locationStats,
    experienceStats,
    companySizeStats,
    benefitsStats: {
      averageBenefitsValue: benefitsValue,
      benefitsBreakdown,
      benefitsPercentage: (benefitsValue / salaryAverage) * 100,
    },
    satisfactionStats,
  };
}

// Helper functions
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getExperienceRange(years: number): string {
  if (years < 1) return '0-1 years';
  if (years < 3) return '1-3 years';
  if (years < 5) return '3-5 years';
  if (years < 10) return '5-10 years';
  return '10+ years';
}

function getCostOfLivingIndex(location: string): number {
  // Simplified cost of living index for Vietnamese cities
  const indices: Record<string, number> = {
    'Ho Chi Minh City': 1.25,
    'Hanoi': 1.20,
    'Da Nang': 1.00,
    'Can Tho': 0.90,
    'Hai Phong': 0.95,
    'Bien Hoa': 0.95,
    'Nha Trang': 0.90,
  };
  return indices[location] || 0.85;
}

function calculateRealWageIndex(salaries: number[], location: string): number {
  const avgSalary = salaries.reduce((a, b) => a + b, 0) / salaries.length;
  const colIndex = getCostOfLivingIndex(location);
  return avgSalary / (colIndex * 20000000); // Normalized to base salary
}

function parseTimeToMonths(timeString: string): number {
  // Simple parser for time strings like "6 months", "1 year", "2 years"
  const match = timeString.match(/(\d+)\s*(year|years|month|months)/);
  if (!match) return 0;

  const value = parseInt(match[1]);
  const unit = match[2];

  return unit.includes('year') ? value * 12 : value;
}

function calculateSalaryGrowth(salaries: number[]): number {
  if (salaries.length < 2) return 0;
  const sorted = salaries.sort((a, b) => a - b);
  return ((sorted[sorted.length - 1] - sorted[0]) / sorted[0]) * 100;
}

function calculateBenefitsTotal(share: SalaryShare): number {
  return Object.values(share.compensation.benefits).reduce((a, b) => a + b, 0);
}

function calculateBenefitsBreakdown(shares: SalaryShare[]): Record<string, number> {
  const breakdown: Record<string, number> = {};

  shares.forEach(share => {
    Object.entries(share.compensation.benefits).forEach(([key, value]) => {
      breakdown[key] = (breakdown[key] || 0) + value;
    });
  });

  // Average values
  Object.keys(breakdown).forEach(key => {
    breakdown[key] = breakdown[key] / shares.length;
  });

  return breakdown;
}

// Create verification record
export function createVerification(shareId: string, method: 'email' | 'linkedin' | 'paystub', details?: any): ShareVerification {
  const verifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.VERIFICATIONS) || '[]');

  const verification: ShareVerification = {
    id: generateAnonymousId(),
    shareId,
    method,
    status: 'pending',
    token: generateVerificationToken(),
    sentAt: new Date(),
    details: details || {},
  };

  verifications.push(verification);
  localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(verifications));

  return verification;
}

// Update verification status
export function updateVerificationStatus(token: string, status: 'verified' | 'rejected'): boolean {
  const verifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.VERIFICATIONS) || '[]');
  const shares = JSON.parse(localStorage.getItem(STORAGE_KEYS.SALARY_SHARES) || '[]');

  const verificationIndex = verifications.findIndex((v: ShareVerification) => v.token === token);
  if (verificationIndex === -1) return false;

  verifications[verificationIndex].status = status;
  verifications[verificationIndex].verifiedAt = new Date();

  // Update share verification status
  const shareIndex = shares.findIndex((s: SalaryShare) => s.id === verifications[verificationIndex].shareId);
  if (shareIndex !== -1) {
    shares[shareIndex].verification.status = status;
    shares[shareIndex].verification.verifiedAt = new Date();
  }

  localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(verifications));
  localStorage.setItem(STORAGE_KEYS.SALARY_SHARES, JSON.stringify(shares));

  return true;
}

// Get user's shares
export function getUserShares(): SalaryShare[] {
  const userShareIds = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_SHARES) || '[]');
  const allShares = getAllSalaryShares();
  return allShares.filter(share => userShareIds.includes(share.id));
}

// Delete user share
export function deleteUserShare(shareId: string): boolean {
  const userShareIds = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_SHARES) || '[]');
  const shares = JSON.parse(localStorage.getItem(STORAGE_KEYS.SALARY_SHARES) || '[]');

  const updatedUserShares = userShareIds.filter((id: string) => id !== shareId);
  const updatedShares = shares.filter((share: SalaryShare) => share.id !== shareId);

  localStorage.setItem(STORAGE_KEYS.USER_SHARES, JSON.stringify(updatedUserShares));
  localStorage.setItem(STORAGE_KEYS.SALARY_SHARES, JSON.stringify(updatedShares));

  return true;
}

// Search salary shares
export function searchSalaryShares(filters: {
  industry?: string;
  location?: string;
  position?: string;
  experienceMin?: number;
  experienceMax?: number;
  companySize?: string;
}): SalaryShare[] {
  let shares = getVerifiedSalaryShares();

  if (filters.industry) {
    shares = shares.filter(share =>
      share.companyInfo.industry.toLowerCase().includes(filters.industry!.toLowerCase())
    );
  }

  if (filters.location) {
    shares = shares.filter(share =>
      share.companyInfo.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  if (filters.position) {
    shares = shares.filter(share =>
      share.position.title.toLowerCase().includes(filters.position!.toLowerCase()) ||
      share.position.field.toLowerCase().includes(filters.position!.toLowerCase())
    );
  }

  if (filters.experienceMin !== undefined) {
    shares = shares.filter(share => share.experience.totalYears >= filters.experienceMin!);
  }

  if (filters.experienceMax !== undefined) {
    shares = shares.filter(share => share.experience.totalYears <= filters.experienceMax!);
  }

  if (filters.companySize) {
    shares = shares.filter(share => share.companyInfo.size === filters.companySize);
  }

  return shares;
}