import type { JobOffer, ComparisonResult, UserPriorities } from '@/types/job-offer';

export function calculateOfferComparison(
  offers: JobOffer[],
  priorities: UserPriorities
): ComparisonResult {
  // Calculate scores for each offer
  const scoredOffers = offers.map(offer => ({
    offer,
    scores: calculateOfferScores(offer, priorities),
  }));

  // Sort by total score for overall ranking
  const overallRanking = scoredOffers
    .map(({ offer, scores }) => ({
      offer,
      score: scores.total,
      rank: 0, // Will be set below
      breakdown: scores,
    }))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

  // Create category rankings
  const compensationRanking = createCategoryRanking(scoredOffers, 'financial');
  const workLifeBalanceRanking = createCategoryRanking(scoredOffers, 'workLifeBalance');
  const benefitsRanking = createCategoryRanking(scoredOffers, 'benefits');
  const growthRanking = createCategoryRanking(scoredOffers, 'career');

  // Generate insights
  const insights = generateInsights(scoredOffers, priorities);

  // Determine recommendations
  const bestOverall = overallRanking[0].offer;
  const alternatives = overallRanking.slice(1, 3).map(r => r.offer);

  return {
    offers,
    rankings: {
      overall: overallRanking,
      byCategory: {
        compensation: compensationRanking,
        workLifeBalance: workLifeBalanceRanking,
        benefits: benefitsRanking,
        growth: growthRanking,
      },
    },
    insights,
    recommendation: {
      bestOverall,
      alternatives,
      reasoning: generateReasoning(bestOverall, alternatives, priorities),
    },
  };
}

function calculateOfferScores(offer: JobOffer, priorities: UserPriorities) {
  // Normalize priorities (1-10 scale to 0-1)
  const normalizedPriorities = {
    salary: normalizePriority(priorities.salary),
    bonuses: normalizePriority(priorities.bonuses),
    benefits: normalizePriority(priorities.benefits),
    workLifeBalance: normalizePriority(priorities.workLifeBalance),
    career: normalizePriority(priorities.career),
    commute: normalizePriority(priorities.commute),
  };

  // Calculate component scores (0-100 scale)
  const financialScore = calculateFinancialScore(offer);
  const benefitsScore = calculateBenefitsScore(offer);
  const workLifeScore = calculateWorkLifeScore(offer);
  const careerScore = calculateCareerScore(offer);

  // Calculate weighted total
  const total =
    financialScore * normalizedPriorities.salary +
    benefitsScore * normalizedPriorities.benefits +
    workLifeScore * normalizedPriorities.workLifeBalance +
    careerScore * normalizedPriorities.career;

  return {
    total,
    financial: financialScore,
    benefits: benefitsScore,
    workLifeBalance: workLifeScore,
    career: careerScore,
  };
}

function normalizePriority(priority: number): number {
  return priority / 10;
}

function calculateFinancialScore(offer: JobOffer): number {
  // Calculate total annual compensation
  const baseAnnual = offer.baseSalary * 12;
  const bonusAnnual = offer.bonuses.performance +
                    (offer.bonuses.signing || 0) +
                    (offer.bonuses['13thMonth'] || 0);
  const equityAnnual = offer.bonuses.stock?.value || 0;

  // Subtract commute costs
  const netCommuteCost = offer.commute.cost.monthly * 12 *
                        (1 - offer.workLife.remote.daysPerWeek / 5);

  const totalAnnual = baseAnnual + bonusAnnual + equityAnnual - netCommuteCost;

  // Score based on total compensation (scaled to 0-100)
  // Assuming 500M VND/year as a top score
  const score = Math.min((totalAnnual / 500000000) * 100, 100);

  return score;
}

function calculateBenefitsScore(offer: JobOffer): number {
  let benefitsValue = 0;

  // Health insurance value
  benefitsValue += offer.benefits.healthInsurance.value * 12;

  // Meal allowance
  const mealMultiplier = offer.benefits.mealAllowance.frequency === 'daily' ? 22 : 1;
  benefitsValue += offer.benefits.mealAllowance.value * mealMultiplier * 12;

  // Other benefits
  benefitsValue += (offer.benefits.transport.value +
                   offer.benefits.phone +
                   offer.benefits.internet +
                   offer.benefits.gym) * 12;

  // Score based on benefits value (scaled to 0-100)
  // Assuming 100M VND/year in benefits as a top score
  const score = Math.min((benefitsValue / 100000000) * 100, 100);

  return score;
}

function calculateWorkLifeScore(offer: JobOffer): number {
  let score = 50; // Base score

  // Working days (fewer is better)
  if (offer.workLife.workingDays <= 4) score += 20;
  else if (offer.workLife.workingDays === 5) score += 10;

  // Working hours (fewer is better)
  if (offer.workLife.workingHours <= 7) score += 15;
  else if (offer.workLife.workingHours <= 8) score += 10;
  else if (offer.workLife.workingHours <= 9) score += 5;

  // Remote work days
  score += offer.workLife.remote.daysPerWeek * 8;

  // Leave days
  if (offer.workLife.leaveDays.annual >= 20) score += 15;
  else if (offer.workLife.leaveDays.annual >= 15) score += 10;
  else if (offer.workLife.leaveDays.annual >= 12) score += 5;

  // Overtime (simplified - not captured in current data structure)

  return Math.min(score, 100);
}

function calculateCareerScore(offer: JobOffer): number {
  let score = 50; // Base score

  // Team size (medium-sized teams often offer better growth)
  if (offer.culture.teamSize >= 5 && offer.culture.teamSize <= 20) score += 15;
  else if (offer.culture.teamSize > 20 && offer.culture.teamSize <= 50) score += 10;
  else if (offer.culture.teamSize > 50) score += 5;

  // Company size (growth potential)
  if (offer.culture.companySize.includes('startup') ||
      offer.culture.companySize.includes('初创')) {
    score += 20;
  } else if (offer.culture.workEnvironment === 'startup') {
    score += 15;
  }

  // Equity/stock presence indicates growth potential
  if (offer.bonuses.stock) score += 20;

  // Training budget
  if (offer.benefits.learning.budget > 0) score += 10;

  return Math.min(score, 100);
}

function createCategoryRanking(
  scoredOffers: { offer: JobOffer; scores: any }[],
  category: keyof any
) {
  return scoredOffers
    .map(({ offer, scores }) => ({
      offer,
      score: scores[category],
      rank: 0,
      breakdown: scores,
    }))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
}

function generateInsights(
  scoredOffers: { offer: JobOffer; scores: any }[],
  priorities: UserPriorities
): string[] {
  const insights: string[] = [];

  // Find best and worst in each category
  const sortedByFinancial = [...scoredOffers].sort((a, b) =>
    b.scores.financial - a.scores.financial);
  const sortedByWLB = [...scoredOffers].sort((a, b) =>
    b.scores.workLifeBalance - a.scores.workLifeBalance);

  // Financial insights
  const financialDiff = sortedByFinancial[0].scores.financial -
                       sortedByFinancial[sortedByFinancial.length - 1].scores.financial;
  if (financialDiff > 30) {
    insights.push(
      `${sortedByFinancial[0].offer.companyName} trả cao hơn ${Math.round(financialDiff)}% về mặt tài chính so với ${sortedByFinancial[sortedByFinancial.length - 1].offer.companyName}`
    );
  }

  // Work-life balance insights
  const bestWLB = sortedByWLB[0];
  if (bestWLB.scores.workLifeBalance > 80) {
    insights.push(
      `${bestWLB.offer.companyName} có chính sách work-life balance tốt nhất với ${bestWLB.offer.workLife.remote.daysPerWeek} ngày làm việc từ xa/tuần`
    );
  }

  // Remote work insights
  const remoteOffers = scoredOffers.filter(s => s.offer.workLife.remote.daysPerWeek > 0);
  if (remoteOffers.length > 0) {
    const avgRemoteDays = remoteOffers.reduce((sum, s) =>
      sum + s.offer.workLife.remote.daysPerWeek, 0) / remoteOffers.length;
    insights.push(
      `Trung bình các công ty cho phép ${avgRemoteDays.toFixed(1)} ngày làm việc từ xa mỗi tuần`
    );
  }

  // Benefits insights
  const bestBenefits = [...scoredOffers].sort((a, b) =>
    b.scores.benefits - a.scores.benefits)[0];
  if (bestBenefits.scores.benefits > 70) {
    insights.push(
      `${bestBenefits.offer.companyName} có gói phúc lợi hấp dẫn nhất`
    );
  }

  // Priority-based insights
  if (priorities.workLifeBalance >= 8) {
    insights.push(
      'Ưu tiên của bạn là work-life balance. Hãy cân nhắc kỹ các yếu tố: số ngày làm việc, giờ làm việc, và số ngày remote.'
    );
  }

  return insights;
}

function generateReasoning(
  bestOffer: JobOffer,
  alternatives: JobOffer[],
  priorities: UserPriorities
): string {
  const reasoning: string[] = [];

  reasoning.push(
    `${bestOffer.companyName} là lựa chọn tốt nhất vì:`
  );

  // Add specific reasons based on what the offer excels at
  if (priorities.salary >= 8) {
    reasoning.push(
      `- Thu nhập hấp dẫn với tổng thu nhập năm dự kiến ${(bestOffer.baseSalary * 12 + bestOffer.bonuses.performance).toLocaleString('vi-VN')} đ`
    );
  }

  if (priorities.workLifeBalance >= 8 && bestOffer.workLife.remote.daysPerWeek > 0) {
    reasoning.push(
      `- Linh hoạt với ${bestOffer.workLife.remote.daysPerWeek} ngày làm việc từ xa mỗi tuần`
    );
  }

  if (bestOffer.bonuses.stock) {
    reasoning.push(
      `- Có cổ phiếu/ESOP thể hiện tiềm năng tăng trưởng dài hạn`
    );
  }

  if (alternatives.length > 0) {
    reasoning.push('\nCác lựa chọn khác cũng có ưu điểm:');
    alternatives.forEach(alt => {
      if (alt.workLife.remote.daysPerWeek > bestOffer.workLife.remote.daysPerWeek) {
        reasoning.push(
          `- ${alt.companyName}: Linh hoạt hơn về làm việc từ xa`
        );
      }
      if (alt.benefits.healthInsurance.value > bestOffer.benefits.healthInsurance.value) {
        reasoning.push(
          `- ${alt.companyName}: Gói bảo hiểm tốt hơn`
        );
      }
    });
  }

  return reasoning.join('\n');
}