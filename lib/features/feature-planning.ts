/**
 * Feature Planning & Progress Tracking
 */

import { FEATURE_ROADMAP, FeatureDefinition } from './feature-roadmap';
import { getImplementationQueue } from './feature-roadmap';

export interface SprintPlan {
  sprint: number;
  duration: number; // weeks
  features: {
    planned: string[];
    inProgress: string[];
    completed: string[];
  };
  notes?: string;
}

export interface ImplementationProgress {
  currentSprint: number;
  completedFeatures: string[];
  blockers: string[];
  upcomingFeatures: string[];
}

// 3-month implementation plan (12 weeks)
export const IMPLEMENTATION_PLAN: SprintPlan[] = [
  // Sprint 1: Foundation (Weeks 1-3)
  {
    sprint: 1,
    duration: 3,
    features: {
      planned: ['user-auth', 'salary-database', 'job-offer-comparison'],
      inProgress: [],
      completed: []
    },
    notes: 'Focus on core infrastructure and first high-value feature'
  },

  // Sprint 2: Comparison Tool (Weeks 4-6)
  {
    sprint: 2,
    duration: 3,
    features: {
      planned: ['budget-planner', 'benefits-calculator'],
      inProgress: ['job-offer-comparison'],
      completed: []
    },
    notes: 'Complete job comparison and add budgeting features'
  },

  // Sprint 3: Community Features (Weeks 7-9)
  {
    sprint: 3,
    duration: 3,
    features: {
      planned: ['anonymous-salary-sharing', 'skill-based-estimator'],
      inProgress: ['budget-planner', 'benefits-calculator'],
      completed: ['job-offer-comparison']
    },
    notes: 'Launch community and data-driven features'
  },

  // Sprint 4: Monetization (Weeks 10-12)
  {
    sprint: 4,
    duration: 3,
    features: {
      planned: ['tax-optimization', 'loan-calculator'],
      inProgress: ['anonymous-salary-sharing', 'payment-integration'],
      completed: ['budget-planner', 'benefits-calculator']
    },
    notes: 'Implement payment system and optimization tools'
  }
];

// Next 30 days implementation queue
export const NEXT_30_DAYS = getImplementationQueue(6);

// Feature dependencies
export const FEATURE_DEPENDENCIES = {
  'job-offer-comparison': ['user-auth', 'salary-database'],
  'anonymous-salary-sharing': ['user-auth', 'salary-database'],
  'skill-based-estimator': ['salary-database'],
  'premium-tier': ['payment-integration', 'user-auth'],
  'budget-planner': [],
  'loan-calculator': [],
  'tax-optimization': [],
  'benefits-calculator': [],
  'payslip-ocr': [],
  'user-auth': [],
  'salary-database': [],
  'payment-integration': []
};

// Implementation checklist for each feature
export const IMPLEMENTATION_CHECKLIST = {
  'job-offer-comparison': [
    'Create data models and types',
    'Build offer input form',
    'Create comparison table component',
    'Implement benefits calculator',
    'Add visualization charts',
    'Create export functionality',
    'Write unit tests',
    'Add documentation'
  ],
  'user-auth': [
    'Choose auth provider (Supabase/Auth0)',
    'Set up authentication pages',
    'Implement login/signup forms',
    'Add social login options',
    'Create user profile management',
    'Implement session handling',
    'Add role-based access'
  ],
  'salary-database': [
    'Design database schema',
    'Set up API routes',
    'Create data access layer',
    'Implement caching strategy',
    'Add data validation',
    'Create migration scripts'
  ]
};

// Resource allocation
export const RESOURCE_ALLOCATION = {
  developers: 2,
  designers: 1,
  weekCapacity: 40, // hours per developer
  totalWeeks: 12,
  totalHours: 960
};

// Risk assessment
export const IMPLEMENTATION_RISKS = [
  {
    feature: 'skill-based-estimator',
    risk: 'Market data availability',
    mitigation: 'Start with manual data, build scraper later',
    probability: 'Medium'
  },
  {
    feature: 'anonymous-salary-sharing',
    risk: 'Low initial participation',
    mitigation: 'Seed with public data, incentify sharing',
    probability: 'High'
  },
  {
    feature: 'payslip-ocr',
    risk: 'OCR accuracy issues',
    mitigation: 'Multiple OCR providers, manual correction',
    probability: 'Medium'
  }
];

// Success metrics for each feature
export const SUCCESS_METRICS = {
  'job-offer-comparison': {
    adoption: '30% of active users',
    engagement: '5+ minutes per session',
    satisfaction: '4.5+ star rating',
    sharing: '10% of comparisons shared'
  },
  'anonymous-salary-sharing': {
    dataPoints: '1000+ submissions in 3 months',
    retention: '60% monthly active return',
    quality: '80% verified submissions',
    coverage: 'Top 50 companies in Vietnam'
  },
  'premium-tier': {
    conversion: '5% free to premium',
    retention: '80% monthly retention',
    revenue: '500K VND/month milestone in 3 months',
    ltv: '100K VND average lifetime value'
  }
};

// Helper functions
export function getCurrentSprint(): SprintPlan {
  // This would be dynamic in a real app
  return IMPLEMENTATION_PLAN[0];
}

export function getUpcomingFeatures(count: number = 5): FeatureDefinition[] {
  const current = getCurrentSprint();
  const allPlanned = IMPLEMENTATION_PLAN.flatMap(s => s.features.planned);
  return allPlanned.slice(0, count).map(id => FEATURE_ROADMAP.find(f => f.id === id)!);
}

export function calculateProgress(): ImplementationProgress {
  const totalFeatures = FEATURE_ROADMAP.length;
  const completed = FEATURE_ROADMAP.filter(f => f.status === 'completed').length;
  const inProgress = FEATURE_ROADMAP.filter(f => f.status === 'in-progress');

  return {
    currentSprint: 1,
    completedFeatures: inProgress.map(f => f.id),
    blockers: [],
    upcomingFeatures: getUpcomingFeatures(5).map(f => f.id)
  };
}