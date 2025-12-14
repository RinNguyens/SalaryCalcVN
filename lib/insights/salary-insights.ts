import type { SalaryResult, AnnualCompensation, SalaryInsight } from '@/types/salary';
import { INSURANCE_CAPS, TAX_BRACKETS } from '@/lib/constants/tax-brackets';

/**
 * Generate comprehensive salary insights
 */
export function generateSalaryInsights(
  salaryResult: SalaryResult,
  annualCompensation?: AnnualCompensation
): SalaryInsight[] {
  const insights: SalaryInsight[] = [];

  // Tax insights
  insights.push(...generateTaxInsights(salaryResult));

  // Insurance insights
  insights.push(...generateInsuranceInsights(salaryResult));

  // Financial health insights
  if (annualCompensation) {
    insights.push(...generateFinancialInsights(annualCompensation));
  }

  // General advice
  insights.push(...generateGeneralAdvice(salaryResult));

  return insights.sort((a, b) => {
    const priority = { warning: 0, info: 1, neutral: 2, positive: 3 };
    return priority[a.type] - priority[b.type];
  });
}

/**
 * Generate tax-related insights
 */
function generateTaxInsights(result: SalaryResult): SalaryInsight[] {
  const insights: SalaryInsight[] = [];
  const { tax } = result;

  // Tax bracket analysis
  if (tax.bracket === 1) {
    insights.push({
      type: 'positive',
      category: 'tax',
      title: 'Thuế suất thấp nhất',
      description: `Bạn đang ở bậc thuế 1 với thuế suất ${tax.marginalRate * 100}%`,
      recommendation: 'Tận dụng các khoản giảm trừ để tối ưu thuế',
      icon: '✅',
    });
  } else if (tax.bracket >= 5) {
    insights.push({
      type: 'warning',
      category: 'tax',
      title: 'Thuế suất cao',
      description: `Bạn đang ở bậc thuế ${tax.bracket} với thuế suất ${tax.marginalRate * 100}%`,
      recommendation: 'Cân nhắc các khoản đóng góp quỹ hưu trí tự nguyện để giảm thuế',
      icon: '📊',
      value: tax.marginalRate * 100,
    });
  }

  // Effective tax rate
  const effectiveRate = (result.gross > 0) ? ((result.gross - result.net) / result.gross) * 100 : 0;

  if (effectiveRate < 10) {
    insights.push({
      type: 'positive',
      category: 'tax',
      title: 'Tối ưu thuế tốt',
      description: `Tỷ lệ thuế hiệu dụng chỉ ${effectiveRate.toFixed(1)}%`,
      recommendation: 'Tiếp tục duy trì các khoản giảm trừ hiện tại',
      icon: '💡',
    });
  } else if (effectiveRate > 25) {
    insights.push({
      type: 'info',
      category: 'tax',
      title: 'Gánh nặng thuế',
      description: `Tỷ lệ thuế hiệu dụng ${effectiveRate.toFixed(1)}% khá cao`,
      recommendation: 'Khám phá các phương pháp giảm thuế hợp pháp',
      icon: '💰',
      value: effectiveRate,
    });
  }

  return insights;
}

/**
 * Generate insurance-related insights
 */
function generateInsuranceInsights(result: SalaryResult): SalaryInsight[] {
  const insights: SalaryInsight[] = [];
  const { insurance } = result;

  // Insurance cap check
  if (result.gross >= INSURANCE_CAPS.BHXH_BHYT) {
    insights.push({
      type: 'info',
      category: 'insurance',
      title: 'Đã đạt trần bảo hiểm',
      description: `Mức lương đã vượt trần BHXH/BHYT (${formatCurrency(INSURANCE_CAPS.BHXH_BHYT)})`,
      recommendation: 'Phần thu nhập vượt trần không đóng BHXH, cân nhắc các kênh đầu tư khác',
      icon: '🛡️',
    });
  }

  // Insurance percentage
  const insuranceRate = (result.gross > 0) ? (insurance.total / result.gross) * 100 : 0;

  if (insuranceRate > 10) {
    insights.push({
      type: 'neutral',
      category: 'insurance',
      title: 'Đóng bảo hiểm đầy đủ',
      description: `Đóng ${insuranceRate.toFixed(1)}% lương cho bảo hiểm`,
      recommendation: 'Kiểm tra và đảm bảo các quyền lợi BHXH, BHYT',
      icon: '📋',
    });
  }

  return insights;
}

/**
 * Generate financial health insights
 */
function generateFinancialInsights(comp: AnnualCompensation): SalaryInsight[] {
  const insights: SalaryInsight[] = [];

  // Total income assessment
  if (comp.totalNetYearly > 500000000) {
    insights.push({
      type: 'positive',
      category: 'financial',
      title: 'Thu nhập cao',
      description: `Thu nhập năm ${formatCurrency(comp.totalNetYearly)}`,
      recommendation: 'Cân nhắc đầu tư diversified portfolio, bất động sản',
      icon: '🏆',
    });
  } else if (comp.totalNetYearly > 300000000) {
    insights.push({
      type: 'positive',
      category: 'financial',
      title: 'Thu nhập tốt',
      description: `Thu nhập năm ${formatCurrency(comp.totalNetYearly)}`,
      recommendation: 'Xây dựng quỹ đầu tư và quỹ hưu trí sớm',
      icon: '📈',
    });
  } else if (comp.totalNetYearly < 150000000) {
    insights.push({
      type: 'warning',
      category: 'financial',
      title: 'Cần cải thiện thu nhập',
      description: `Thu nhập năm ${formatCurrency(comp.totalNetYearly)}`,
      recommendation: 'Nâng cao kỹ năng, tìm kiếm cơ hội tăng thu nhập',
      icon: '📊',
    });
  }

  // Bonus impact
  const bonusImpact = ((comp.totalGrossYearly - comp.regularGrossYearly) / comp.totalGrossYearly) * 100;

  if (bonusImpact > 20) {
    insights.push({
      type: 'positive',
      category: 'financial',
      title: 'Bonus hấp dẫn',
      description: `Thưởng và bonus chiếm ${bonusImpact.toFixed(0)}% tổng thu nhập`,
      recommendation: 'Đàm phán để tối đaiza các khoản thưởng hiệu suất',
      icon: '🎁',
      value: bonusImpact,
    });
  } else if (bonusImpact === 0) {
    insights.push({
      type: 'info',
      category: 'financial',
      title: 'Chưa có bonus',
      description: 'Chưa có khoản thưởng hoặc bonus trong năm',
      recommendation: 'Thảo luận về chính sách thưởng với công ty',
      icon: '💭',
    });
  }

  // Savings potential
  const savings20Monthly = comp.financialAdvice.savings20 / 12;
  if (savings20Monthly > 10000000) {
    insights.push({
      type: 'positive',
      category: 'financial',
      title: 'Tiết kiệm tốt',
      description: `Có thể tiết kiệm ${formatCurrency(savings20Monthly)}/tháng (20%)`,
      recommendation: 'Bắt đầu đầu tư sớm để hưởng lãi kép',
      icon: '💎',
    });
  }

  return insights;
}

/**
 * Generate general career advice
 */
function generateGeneralAdvice(result: SalaryResult): SalaryInsight[] {
  const insights: SalaryInsight[] = [];

  // Salary level assessment
  if (result.gross >= 50000000) {
    insights.push({
      type: 'neutral',
      category: 'benchmark',
      title: 'Mức lương cao',
      description: 'Bạn thuộc top thu nhập ở Việt Nam',
      recommendation: 'Cân nhắc vai trò quản lý hoặc chuyển sang lĩnh vực chuyên sâu',
      icon: '🌟',
    });
  } else if (result.gross >= 30000000) {
    insights.push({
      type: 'positive',
      category: 'benchmark',
      title: 'Mức lương tốt',
      description: 'Thu nhập tốt so với mặt bằng chung',
      recommendation: 'Tiếp tục phát triển để đạt vị trí cao hơn',
      icon: '✨',
    });
  } else if (result.gross < 10000000) {
    insights.push({
      type: 'warning',
      category: 'benchmark',
      title: 'Mức lương khởi điểm',
      description: 'Mức lương phù hợp cho người mới đi làm',
      recommendation: 'Tập trung tích lũy kinh nghiệm 2-3 năm đầu',
      icon: '🚀',
    });
  }

  return insights;
}

/**
 * Generate negotiation tips
 */
export function generateNegotiationTips(
  currentSalary: number,
  yearsOfExperience: number,
  industry?: string
): SalaryInsight[] {
  const tips: SalaryInsight[] = [];

  tips.push({
    type: 'info',
    category: 'benchmark',
    title: 'Nghiên cứu thị trường',
    description: 'Tìm hiểu mức lương cho vị trí tương đương',
    recommendation: 'Sử dụng các trang như VietnamWorks, TopCV để tham khảo',
    icon: '🔍',
  });

  if (yearsOfExperience < 2) {
    tips.push({
      type: 'neutral',
      category: 'growth',
      title: 'Tập trung vào học hỏi',
      description: 'Ưu tiên cơ hội học hỏi hơn lương cao',
      recommendation: 'Xây dựng portfolio và chứng chỉ chuyên ngành liên quan',
      icon: '📚',
    });
  } else {
    tips.push({
      type: 'positive',
      category: 'growth',
      title: 'Đàm phán tự tin',
      description: 'Với kinh nghiệm, bạn có vị thế đàm phán tốt hơn',
      recommendation: 'Chuẩn bị các thành tích và đóng góp cụ thể',
      icon: '💪',
    });
  }

  if (currentSalary < 20000000 && yearsOfExperience > 3) {
    tips.push({
      type: 'warning',
      category: 'benchmark',
      title: 'Cân nhắc chuyển việc',
      description: 'Lương có thể chưa tương xứng với kinh nghiệm',
      recommendation: 'Chủ động tìm kiếm cơ hội tốt hơn',
      icon: '🔄',
    });
  }

  return tips;
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
 * Get insight color based on type
 */
export function getInsightColor(type: SalaryInsight['type']): string {
  const colors = {
    positive: 'text-green-600',
    neutral: 'text-blue-600',
    warning: 'text-orange-600',
    info: 'text-gray-600',
  };
  return colors[type] || colors.neutral;
}

/**
 * Get insight background color
 */
export function getInsightBgColor(type: SalaryInsight['type']): string {
  const colors = {
    positive: 'bg-green-50 border-green-200',
    neutral: 'bg-blue-50 border-blue-200',
    warning: 'bg-orange-50 border-orange-200',
    info: 'bg-gray-50 border-gray-200',
  };
  return colors[type] || colors.neutral;
}