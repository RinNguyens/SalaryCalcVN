import type {
  SalaryEstimateRequest,
  SalaryEstimate,
  MarketPosition,
  Skill,
  ProficiencyLevel,
  GrowthRate,
  SkillSuggestion,
} from '@/types/salary-estimator';
import { SkillCategory, DemandLevel } from '@/types/salary-estimator';
import { SKILL_DATABASE, VIETNAM_LOCATION_MULTIPLIERS, INDUSTRY_MULTIPLIERS } from '@/types/salary-estimator';

interface SkillScore {
  skill: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  yearsExperience: number;
  baseScore: number;
  experienceBonus: number;
  demandBonus: number;
  totalScore: number;
}

export function calculateSalaryEstimate(request: SalaryEstimateRequest): SalaryEstimate {
  // 1. Calculate base salary from skills
  const skillScores = calculateSkillScores(request.skills);
  const skillsScore = skillScores.reduce((sum, skill) => sum + skill.totalScore, 0);

  // 2. Apply experience multiplier
  const experienceMultiplier = calculateExperienceMultiplier(
    request.experience.totalYears,
    request.experience.managementYears,
    request.experience.overseasYears
  );

  // 3. Apply education bonus
  const educationBonus = calculateEducationBonus(request.education);

  // 4. Apply location multiplier
  const locationMultiplier = VIETNAM_LOCATION_MULTIPLIERS[request.location.city as keyof typeof VIETNAM_LOCATION_MULTIPLIERS] ||
                            VIETNAM_LOCATION_MULTIPLIERS.Other;

  // 5. Apply industry multiplier
  const industryMultiplier = request.preferences.industry.reduce(
    (max, industry) => Math.max(max, INDUSTRY_MULTIPLIERS[industry as keyof typeof INDUSTRY_MULTIPLIERS] || 1.0),
    1.0
  );

  // 6. Apply remote work preference
  const remoteMultiplier = calculateRemoteMultiplier(request.location.remoteWorkPreference);

  // 7. Calculate base salary ranges
  const baseSalary = calculateBaseSalary(
    skillsScore,
    experienceMultiplier,
    educationBonus,
    locationMultiplier,
    industryMultiplier,
    remoteMultiplier
  );

  // 8. Calculate total compensation
  const totalCompensation = calculateTotalCompensation(
    baseSalary,
    request.preferences.companySize,
    request.experience.managementYears
  );

  // 9. Determine market position
  const marketPosition = calculateMarketPosition(
    baseSalary.median,
    request.location.city,
    request.experience.totalYears
  );

  // 10. Generate skill suggestions
  const skillSuggestions = generateSkillSuggestions(
    request.skills,
    request.experience.totalYears
  );

  // 11. Generate career path
  const careerPath = generateCareerPath(
    request.experience.totalYears,
    request.experience.managementYears,
    skillScores
  );

  // 12. Generate negotiation tips
  const negotiationTips = generateNegotiationTips(
    request,
    baseSalary,
    skillScores
  );

  return {
    baseSalary,
    totalCompensation,
    breakdown: {
      baseSalary: baseSalary.median,
      bonus: totalCompensation.median - baseSalary.median,
      equity: request.preferences.companySize === 'startup' ? baseSalary.median * 0.2 : 0,
      benefits: baseSalary.median * 0.15,
    },
    marketPosition,
    skills: {
      highDemand: skillScores
        .filter(s => s.demandBonus > 20)
        .map(s => s.skill),
      improvement: skillSuggestions
        .filter(s => s.salaryImpact.percentage > 15)
        .slice(0, 5)
        .map(s => ({
          skill: s.skill,
          potentialIncrease: s.salaryImpact.increase,
          timeToAchieve: s.timeToMaster,
        })),
    },
    careerPath,
    negotiationTips,
  };
}

function calculateSkillScores(skills: Skill[]): SkillScore[] {
  return skills.map(skill => {
    const skillData = findSkillData(skill.id);
    if (!skillData) {
      return {
        skill: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        yearsExperience: skill.yearsExperience,
        baseScore: 0,
        experienceBonus: 0,
        demandBonus: 0,
        totalScore: 0,
      };
    }

    // Base score by category
    const baseScores = {
      programming: 100,
      framework: 80,
      database: 60,
      cloud: 90,
      devops: 85,
      design: 70,
      soft_skills: 50,
      management: 80,
      domain: 60,
      certification: 40,
    };

    // Proficiency multiplier
    const proficiencyMultipliers = {
      beginner: 0.5,
      intermediate: 0.75,
      advanced: 1.0,
      expert: 1.5,
    };

    // Experience bonus (5% per year up to 10 years)
    const experienceBonus = Math.min(skill.yearsExperience * 0.05, 0.5);

    // Demand bonus
    const demandMultipliers = {
      very_low: -0.2,
      low: 0,
      moderate: 0.1,
      high: 0.2,
      very_high: 0.3,
    };

    const demandBonus = demandMultipliers[skillData.demand];

    const baseScore = baseScores[skill.category] || 50;
    const proficiencyMultiplier = proficiencyMultipliers[skill.proficiency];

    const totalScore = baseScore * proficiencyMultiplier * (1 + experienceBonus) * (1 + demandBonus);

    return {
      skill: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      yearsExperience: skill.yearsExperience,
      baseScore,
      experienceBonus,
      demandBonus,
      totalScore,
    };
  });
}

function findSkillData(skillId: string) {
  for (const category in SKILL_DATABASE) {
    const found = SKILL_DATABASE[category as keyof typeof SKILL_DATABASE].find(
      s => s.id === skillId
    );
    if (found) return found;
  }
  return null;
}

function calculateExperienceMultiplier(
  totalYears: number,
  managementYears: number,
  overseasYears: number
): number {
  let multiplier = 1.0;

  // Base experience multiplier (2% per year)
  multiplier += totalYears * 0.02;

  // Management experience bonus (5% per year)
  multiplier += managementYears * 0.05;

  // Overseas experience bonus (3% per year)
  multiplier += overseasYears * 0.03;

  // Cap at 3x for very experienced professionals
  return Math.min(multiplier, 3.0);
}

function calculateEducationBonus(education: any[]): number {
  let bonus = 0;

  education.forEach(edu => {
    switch (edu.type) {
      case 'bachelor':
        bonus += 0.1;
        break;
      case 'master':
        bonus += 0.15;
        break;
      case 'phd':
        bonus += 0.2;
        break;
      case 'professional':
        bonus += 0.05;
        break;
    }

    // GPA bonus for top performers
    if (edu.gpa && edu.gpa >= 3.5) {
      bonus += 0.05;
    }
  });

  // Cap education bonus at 25%
  return Math.min(bonus, 0.25);
}

function calculateRemoteMultiplier(preference: string): number {
  switch ( preference) {
    case 'remote':
      return 1.1; // Remote jobs often pay more
    case 'hybrid':
      return 1.05;
    case 'flexible':
      return 1.03;
    default:
      return 1.0;
  }
}

function calculateBaseSalary(
  skillsScore: number,
  experienceMultiplier: number,
  educationBonus: number,
  locationMultiplier: number,
  industryMultiplier: number,
  remoteMultiplier: number
) {
  // Base calculation (in VND)
  const baseAmount = 15000000; // 15M VND base
  const skillsAmount = skillsScore * 50000; // 50k per skill point

  const base = (baseAmount + skillsAmount) *
               experienceMultiplier *
               (1 + educationBonus) *
               locationMultiplier *
               industryMultiplier *
               remoteMultiplier;

  // Calculate range (±20%)
  return {
    min: Math.round(base * 0.8),
    median: Math.round(base),
    max: Math.round(base * 1.2),
    confidence: Math.min(50 + skillsScore / 10, 95), // Confidence based on skills
  };
}

function calculateTotalCompensation(
  baseSalary: { min: number; median: number; max: number },
  companySize: string,
  managementYears: number
) {
  // Bonus percentage based on company size and role
  let bonusPercentage = 0.1; // 10% base

  if (companySize === 'startup') {
    bonusPercentage = 0.05; // Lower cash bonus, more equity
  } else if (companySize === 'enterprise') {
    bonusPercentage = 0.15; // Higher bonuses in large companies
  }

  if (managementYears > 0) {
    bonusPercentage += 0.1; // 10% extra for managers
  }

  return {
    min: Math.round(baseSalary.min * (1 + bonusPercentage)),
    median: Math.round(baseSalary.median * (1 + bonusPercentage)),
    max: Math.round(baseSalary.max * (1 + bonusPercentage)),
  };
}

function calculateMarketPosition(
  salary: number,
  city: string,
  totalYears: number
): MarketPosition {
  // Average salaries by experience in Vietnam (approximate)
  const averageSalaries = {
    0: 10000000,    // 0 years
    2: 15000000,    // 2 years
    5: 25000000,    // 5 years
    8: 35000000,    // 8 years
    10: 45000000,   // 10 years
    15: 60000000,   // 15+ years
  };

  const relevantAverage = Object.entries(averageSalaries)
    .reduce((prev, [years, avg]) => {
      const yearDiff = Math.abs(totalYears - parseInt(years));
      const prevDiff = Math.abs(totalYears - prev[0]);
      return yearDiff < prevDiff ? [parseInt(years), avg] : prev;
    }, [0, 10000000])[1];

  const percentile = (salary / relevantAverage) * 50; // Normalize to percentile

  let category: MarketPosition['category'];
  if (percentile < 25) category = 'below_average';
  else if (percentile < 50) category = 'average';
  else if (percentile < 75) category = 'above_average';
  else category = 'top_quartile';

  return {
    percentile: Math.round(percentile),
    comparison: salary > relevantAverage
      ? `${Math.round((salary / relevantAverage - 1) * 100)}% above average`
      : `${Math.round((1 - salary / relevantAverage) * 100)}% below average`,
    category,
  };
}

function generateSkillSuggestions(
  currentSkills: Skill[],
  totalYears: number
): SkillSuggestion[] {
  const suggestions: SkillSuggestion[] = [];
  const currentSkillIds = new Set(currentSkills.map(s => s.id));

  // Find high-demand skills not in current profile
  const highDemandSkills = [
    { id: 'aws', category: SkillCategory.CLOUD, impact: 25 },
    { id: 'kubernetes', category: SkillCategory.CLOUD, impact: 20 },
    { id: 'react', category: SkillCategory.FRAMEWORK, impact: 15 },
    { id: 'nodejs', category: SkillCategory.FRAMEWORK, impact: 15 },
    { id: 'typescript', category: SkillCategory.PROGRAMMING, impact: 10 },
    { id: 'aws-solutions-architect', category: SkillCategory.CERTIFICATION, impact: 20 },
    { id: 'agile-scrum', category: SkillCategory.SOFT_SKILLS, impact: 10 },
    { id: 'leadership', category: SkillCategory.SOFT_SKILLS, impact: 15 },
  ];

  highDemandSkills.forEach(skillData => {
    if (!currentSkillIds.has(skillData.id)) {
      suggestions.push({
        skill: skillData.id,
        category: skillData.category,
        demand: DemandLevel.VERY_HIGH,
        salaryImpact: {
          current: 0,
          potential: skillData.impact,
          increase: skillData.impact,
          percentage: skillData.impact,
        },
        learningResources: getLearningResources(skillData.id),
        difficulty: 'medium',
        timeToMaster: '6-12 months',
      });
    }
  });

  return suggestions.slice(0, 10);
}

function getLearningResources(skillId: string) {
  const resources = {
    aws: [
      { type: 'course' as const, title: 'AWS Certified Solutions Architect', provider: 'Udemy', duration: '40 hours', cost: 2000000 },
      { type: 'certification' as const, title: 'AWS Solutions Architect - Associate', provider: 'Amazon', duration: 'Self-paced', cost: 3000000 },
    ],
    kubernetes: [
      { type: 'course' as const, title: 'Kubernetes for Developers', provider: 'Coursera', duration: '30 hours', cost: 1500000 },
    ],
    react: [
      { type: 'tutorial' as const, title: 'React - The Complete Guide', provider: 'Udemy', duration: '48 hours', cost: 2000000 },
      { type: 'book' as const, title: 'Learning React', provider: "O'Reilly", duration: 'Self-paced', cost: 1000000 },
    ],
    typescript: [
      { type: 'tutorial' as const, title: 'Understanding TypeScript', provider: 'Udemy', duration: '20 hours', cost: 1500000 },
    ],
  };

  return resources[skillId as keyof typeof resources] || [];
}

function generateCareerPath(
  totalYears: number,
  managementYears: number,
  skillScores: SkillScore[]
) {
  if (totalYears < 2) {
    return {
      nextRole: 'Junior Developer',
      timeframe: '1-2 years',
      salaryIncrease: 30,
    };
  } else if (totalYears < 5) {
    return {
      nextRole: 'Mid-level Developer',
      timeframe: '2-3 years',
      salaryIncrease: 40,
    };
  } else if (totalYears < 8) {
    return managementYears > 0
      ? { nextRole: 'Team Lead', timeframe: '1-2 years', salaryIncrease: 35 }
      : { nextRole: 'Senior Developer', timeframe: '2-3 years', salaryIncrease: 30 };
  } else {
    return managementYears > 2
      ? { nextRole: 'Engineering Manager', timeframe: '1-2 years', salaryIncrease: 40 }
      : { nextRole: 'Principal/Staff Engineer', timeframe: '2-3 years', salaryIncrease: 35 };
  }
}

function generateNegotiationTips(
  request: SalaryEstimateRequest,
  baseSalary: any,
  skillScores: SkillScore[]
): string[] {
  const tips: string[] = [];

  // Based on skills
  const highDemandSkills = skillScores.filter(s => s.demandBonus > 0.2);
  if (highDemandSkills.length > 0) {
    tips.push(`Highlight your expertise in ${highDemandSkills.map(s => s.skill).join(', ')} - these are in high demand`);
  }

  // Based on experience
  if (request.experience.overseasYears > 0) {
    tips.push(`Leverage your ${request.experience.overseasYears} years of international experience in negotiations`);
  }

  // Based on location
  if (request.location.city === 'Ho Chi Minh' || request.location.city === 'Hanoi') {
    tips.push(`You're in a high-paying location - ask for salaries in the top 25th percentile`);
  }

  // Based on remote preference
  if (request.location.remoteWorkPreference === 'remote') {
    tips.push('Remote positions often pay 10% more - negotiate accordingly');
  }

  // General tips
  tips.push('Always negotiate - most companies expect a 10-20% counter-offer');
  tips.push('Get competing offers to increase your negotiation power');
  tips.push('Consider total compensation, not just base salary');
  tips.push('Research the company\'s salary bands before negotiating');

  return tips;
}