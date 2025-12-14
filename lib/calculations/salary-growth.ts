import { calculateNetFromGross } from './gross-to-net';
import type { SalaryGrowthInput, SalaryGrowthProjection, SalaryInsight } from '@/types/salary';

/**
 * Calculate salary growth projections
 */
export function calculateSalaryGrowth(input: SalaryGrowthInput): SalaryGrowthProjection {
  const {
    currentSalary,
    annualRaise = 8, // Default 8% annual raise
    targetYears = 5,
    yearsOfExperience,
    dependents,
    region,
  } = input;

  const currentYear = new Date().getFullYear();
  const projections = [];
  let currentGross = currentSalary;

  // Calculate current year's net
  const currentResult = calculateNetFromGross({
    salary: currentSalary,
    dependents,
    region,
  });

  // Generate projections for each year
  for (let year = 0; year <= targetYears; year++) {
    const yearGross = year === 0 ? currentSalary : currentGross;
    const yearResult = calculateNetFromGross({
      salary: yearGross,
      dependents,
      region,
    });

    const raise = year === 0 ? 0 : annualRaise;
    const cumulativeRaise = year === 0 ? 0 : Math.pow(1 + annualRaise / 100, year) - 1;

    projections.push({
      year: currentYear + year,
      gross: Math.round(yearGross),
      net: Math.round(yearResult.net),
      raise,
      cumulativeRaise: Math.round(cumulativeRaise * 10000) / 100, // Round to 2 decimal places
      age: yearsOfExperience + year + 22, // Assuming start working at 22
    });

    // Calculate next year's gross
    if (year < targetYears) {
      currentGross = currentGross * (1 + annualRaise / 100);
    }
  }

  // Calculate total growth
  const finalProjection = projections[projections.length - 1];
  const totalGrowth = {
    gross: finalProjection.gross - projections[0].gross,
    net: finalProjection.net - projections[0].net,
    percentage: ((finalProjection.gross - projections[0].gross) / projections[0].gross) * 100,
  };

  // Calculate average annual growth
  const averageAnnualGrowth = {
    gross: totalGrowth.gross / targetYears,
    net: totalGrowth.net / targetYears,
    percentage: annualRaise,
  };

  // Generate insights
  const insights = generateGrowthInsights(input, projections, totalGrowth);

  return {
    currentYear: {
      year: projections[0].year,
      gross: projections[0].gross,
      net: projections[0].net,
      age: projections[0].age,
    },
    projections: projections.slice(1), // Exclude current year from projections
    insights,
    totalGrowth,
    averageAnnualGrowth,
  };
}

/**
 * Generate growth insights
 */
function generateGrowthInsights(
  input: SalaryGrowthInput,
  projections: any[],
  totalGrowth: any
): SalaryInsight[] {
  const insights: SalaryInsight[] = [];
  const { currentSalary, yearsOfExperience, industry, position } = input;

  // Growth rate insight
  if ((input.annualRaise || 8) >= 10) {
    insights.push({
      type: 'positive',
      category: 'growth',
      title: 'Tăng trưởng xuất sắc',
      description: `Tốc độ tăng lương ${(input.annualRaise || 8)}%/năm rất cao, vượt xa mặt bằng chung`,
      recommendation: 'Tiếp tục phát triển kỹ năng và đàm phán để duy trì đà tăng trưởng',
      icon: '📈',
    });
  } else if ((input.annualRaise || 8) >= 6) {
    insights.push({
      type: 'positive',
      category: 'growth',
      title: 'Tăng trưởng tốt',
      description: `Tốc độ tăng lương ${(input.annualRaise || 8)}%/năm nằm trong khung mong muốn`,
      recommendation: 'Cân nhắc các kỹ năng mới để tăng tốc độ tăng trưởng',
      icon: '📊',
    });
  } else {
    insights.push({
      type: 'warning',
      category: 'growth',
      title: 'Tăng trưởng cần cải thiện',
      description: `Tốc độ tăng lương ${(input.annualRaise || 8)}%/năm khá thấp`,
      recommendation: 'Nâng cao kỹ năng, chứng chỉ, hoặc cân nhắc chuyển việc',
      icon: '⚠️',
    });
  }

  // Experience-based insight
  if (yearsOfExperience < 2 && currentSalary > 15000000) {
    insights.push({
      type: 'positive',
      category: 'benchmark',
      title: 'Khởi đầu tốt',
      description: 'Mức lương khởi điểm cao cho người mới',
      recommendation: 'Tập trung xây dựng nền tảng kinh nghiệm vững chắc',
      icon: '🎯',
    });
  } else if (yearsOfExperience > 5 && currentSalary < 30000000) {
    insights.push({
      type: 'warning',
      category: 'benchmark',
      title: 'Cần xem xét lại',
      description: 'Mức lương có thể chưa tương xứng với kinh nghiệm',
      recommendation: 'Đánh giá lại giá trị thị trường và cân nhắc đàm phán lại',
      icon: '💼',
    });
  }

  // Future value insight
  const futureSalary = projections[projections.length - 1].gross;
  if (totalGrowth.percentage > 50) {
    insights.push({
      type: 'positive',
      category: 'financial',
      title: 'Tiềm năng tài chính lớn',
      description: `Thu nhập sẽ tăng ${totalGrowth.percentage.toFixed(0)}% trong ${projections.length - 1} năm`,
      recommendation: 'Lập kế hoạch đầu tư sớm để tối đa hóa lợi ích compound interest',
      icon: '💰',
      value: totalGrowth.percentage,
    });
  }

  // Tax optimization insight
  if (futureSalary > 50000000) {
    insights.push({
      type: 'info',
      category: 'tax',
      title: 'Lưu ý thuế',
      description: 'Khi thu nhập tăng, bạn sẽ ở bậc thuế cao hơn',
      recommendation: 'Khám phá các phương pháp giảm thuế hợp pháp: quỹ hưu trí, bảo hiểm...',
      icon: '📝',
    });
  }

  // Career milestone insight
  const targetAge = projections[projections.length - 1].age;
  if (targetAge >= 30 && targetAge < 35) {
    insights.push({
      type: 'neutral',
      category: 'growth',
      title: 'Cột mốc sự nghiệp',
      description: `Bạn sẽ ở độ tuổi ${targetAge} với mức lương ${formatCurrency(futureSalary)}`,
      recommendation: 'Đây là thời điểm vàng để chuyển sang vị trí quản lý hoặc chuyên gia',
      icon: '🏆',
    });
  }

  return insights;
}

/**
 * Format currency helper
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate compound growth
 */
export function calculateCompoundGrowth(
  principal: number,
  rate: number,
  years: number
): number {
  return principal * Math.pow(1 + rate / 100, years);
}

/**
 * Calculate retirement savings projection
 */
export function calculateRetirementProjection(
  currentAge: number,
  retirementAge: number,
  currentSalary: number,
  savingsRate: number,
  annualReturn: number = 7
): {
  monthlyContribution: number;
  totalSaved: number;
  projection: { age: number; amount: number }[];
} {
  const yearsToRetirement = retirementAge - currentAge;
  const monthlyContribution = currentSalary * (savingsRate / 100);

  const projection = [];
  let amount = 0;

  for (let age = currentAge; age <= retirementAge; age++) {
    if (age > currentAge) {
      amount = amount * (1 + annualReturn / 100) + (monthlyContribution * 12);
    }
    projection.push({
      age,
      amount: Math.round(amount),
    });
  }

  return {
    monthlyContribution: Math.round(monthlyContribution),
    totalSaved: Math.round(amount),
    projection,
  };
}

/**
 * Market benchmark comparison (simplified)
 */
export function getMarketBenchmark(
  position: string,
  experience: number
): {
  minSalary: number;
  maxSalary: number;
  medianSalary: number;
} {
  // Simplified benchmark data - in real app, this would come from a database
  const benchmarks: Record<string, { min: number; max: number; median: number }> = {
    junior: {
      min: 8000000,
      max: 15000000,
      median: 11000000,
    },
    mid: {
      min: 15000000,
      max: 25000000,
      median: 20000000,
    },
    senior: {
      min: 25000000,
      max: 40000000,
      median: 32000000,
    },
    lead: {
      min: 35000000,
      max: 60000000,
      median: 45000000,
    },
    manager: {
      min: 40000000,
      max: 80000000,
      median: 55000000,
    },
  };

  let level = 'junior';
  if (experience >= 8) level = 'manager';
  else if (experience >= 6) level = 'lead';
  else if (experience >= 4) level = 'senior';
  else if (experience >= 2) level = 'mid';

  const benchmark = benchmarks[level] || benchmarks.junior;

  return {
    minSalary: benchmark.min,
    maxSalary: benchmark.max,
    medianSalary: benchmark.median,
  };
}