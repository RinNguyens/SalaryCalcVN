/**
 * Feature Roadmap & Implementation Tracking for SalaryLens
 * Based on priority matrix from advanced features document
 */

export interface FeatureDefinition {
  id: string;
  name: string;
  category: string;
  priority: 'must-have' | 'high' | 'medium' | 'low';
  complexity: 'low' | 'medium' | 'high' | 'very-high';
  estimatedWeeks: number;
  dependencies: string[];
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold';
  description: string;
  value: string;
  implementationNotes?: string;
}

export const FEATURE_ROADMAP: FeatureDefinition[] = [
  // MUST-HAVE (MVP+) - Immediate Implementation
  {
    id: 'job-offer-comparison',
    name: 'Job Offer Comparison Tool',
    category: 'Career Development',
    priority: 'must-have',
    complexity: 'medium',
    estimatedWeeks: 3,
    dependencies: [],
    status: 'planned',
    description: 'Compare multiple job offers with total compensation analysis',
    value: 'Critical decision-making tool for job seekers',
  },
  {
    id: 'skill-based-estimator',
    name: 'Skill-Based Salary Estimator',
    category: 'Career Development',
    priority: 'must-have',
    complexity: 'high',
    estimatedWeeks: 4,
    dependencies: ['salary-database'],
    status: 'planned',
    description: 'Estimate salary based on skills, experience, and market data',
    value: 'Career decision-making, upskilling motivation',
  },
  {
    id: 'anonymous-salary-sharing',
    name: 'Anonymous Salary Sharing Platform',
    category: 'Community',
    priority: 'must-have',
    complexity: 'high',
    estimatedWeeks: 5,
    dependencies: ['user-auth'],
    status: 'planned',
    description: 'Crowdsourced salary data with company insights',
    value: 'Network effects, viral growth potential',
  },
  {
    id: 'premium-tier',
    name: 'Premium Subscription Tier',
    category: 'Monetization',
    priority: 'must-have',
    complexity: 'medium',
    estimatedWeeks: 2,
    dependencies: ['payment-integration'],
    status: 'planned',
    description: 'Freemium model with premium features at 99K/month',
    value: 'Direct revenue generation',
  },

  // HIGH PRIORITY (v2.0)
  {
    id: 'budget-planner',
    name: 'Personal Budget Planner',
    category: 'Financial Planning',
    priority: 'high',
    complexity: 'medium',
    estimatedWeeks: 3,
    dependencies: [],
    status: 'planned',
    description: 'Category-based budgeting with expense tracking',
    value: 'Helps users manage money better, increases engagement',
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator & Debt Management',
    category: 'Financial Planning',
    priority: 'high',
    complexity: 'medium',
    estimatedWeeks: 2,
    dependencies: [],
    status: 'planned',
    description: 'Mortgage, auto loan, and debt consolidation calculators',
    value: 'Major life decisions support (buying house, car)',
  },
  {
    id: 'tax-optimization',
    name: 'Tax Optimization Advisor',
    category: 'Tax & Compliance',
    priority: 'high',
    complexity: 'medium',
    estimatedWeeks: 2,
    dependencies: [],
    status: 'planned',
    description: 'Legal tax reduction strategies and what-if scenarios',
    value: 'Immediate money savings for users',
  },
  {
    id: 'benefits-calculator',
    name: 'Benefits Valuation Calculator',
    category: 'Compensation',
    priority: 'high',
    complexity: 'low',
    estimatedWeeks: 1,
    dependencies: [],
    status: 'planned',
    description: 'Calculate total value of benefits package',
    value: 'Better job offer evaluation',
  },
  {
    id: 'payslip-ocr',
    name: 'Payslip OCR Scanner',
    category: 'Integration',
    priority: 'high',
    complexity: 'medium',
    estimatedWeeks: 3,
    dependencies: [],
    status: 'planned',
    description: 'Scan payslips to auto-import salary data',
    value: 'Convenience and accuracy improvement',
  },

  // Supporting Features
  {
    id: 'salary-database',
    name: 'Salary Database Infrastructure',
    category: 'Infrastructure',
    priority: 'high',
    complexity: 'high',
    estimatedWeeks: 2,
    dependencies: [],
    status: 'planned',
    description: 'Database schema and APIs for salary data storage',
    value: 'Foundation for multiple features',
  },
  {
    id: 'user-auth',
    name: 'User Authentication System',
    category: 'Infrastructure',
    priority: 'high',
    complexity: 'medium',
    estimatedWeeks: 2,
    dependencies: [],
    status: 'planned',
    description: 'Secure authentication for personalized features',
    value: 'Required for saving and sharing features',
  },
  {
    id: 'payment-integration',
    name: 'Payment Integration',
    category: 'Monetization',
    priority: 'high',
    complexity: 'medium',
    estimatedWeeks: 2,
    dependencies: [],
    status: 'planned',
    description: 'Stripe/VNPay integration for premium subscriptions',
    value: 'Enables monetization',
  },
];

// Helper functions
export function getFeaturesByPriority(priority: FeatureDefinition['priority']) {
  return FEATURE_ROADMAP.filter(f => f.priority === priority);
}

export function getFeaturesByCategory(category: string) {
  return FEATURE_ROADMAP.filter(f => f.category === category);
}

export function getFeature(id: string) {
  return FEATURE_ROADMAP.find(f => f.id === id);
}

export function getImplementationQueue(weeks: number = 12) {
  // Sort by priority (must-have > high > medium > low)
  // Then by complexity (low > medium > high > very-high)
  // Return features that can be completed within given weeks
  const sorted = [...FEATURE_ROADMAP].sort((a, b) => {
    const priorityOrder = { 'must-have': 4, 'high': 3, 'medium': 2, 'low': 1 };
    const complexityOrder = { 'low': 1, 'medium': 2, 'high': 3, 'very-high': 4 };

    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    return complexityOrder[a.complexity] - complexityOrder[b.complexity];
  });

  let totalWeeks = 0;
  const queue: FeatureDefinition[] = [];

  for (const feature of sorted) {
    if (totalWeeks + feature.estimatedWeeks <= weeks) {
      queue.push(feature);
      totalWeeks += feature.estimatedWeeks;
    }
  }

  return queue;
}