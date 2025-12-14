/**
 * Types for Job Offer Comparison feature
 */

export interface JobOffer {
  id: string;
  companyName: string;
  position: string;
  location: string;
  baseSalary: number;          // Gross monthly salary
  currency: 'VND' | 'USD';

  // Bonuses & Equity
  bonuses: {
    performance: number;      // Annual performance bonus
    signing?: number;         // One-time signing bonus
    '13thMonth'?: number;     // 13th month salary
    stock?: {
      type: 'ESOP' | 'RSU' | 'Stock Options';
      value: number;         // Annual vesting value
      vesting: string;      // e.g., "4 years with 1-year cliff"
      strikePrice?: number;  // For stock options
    };
  };

  // Benefits (monthly value)
  benefits: {
    healthInsurance: {
      value: number;
      coverage: 'self' | 'self+spouse' | 'family';
      notes?: string;
    };
    mealAllowance: {
      value: number;
      frequency: 'daily' | 'monthly';
    };
    transport: {
      value: number;
      type: 'allowance' | 'shuttle' | 'parking';
    };
    phone: number;
    internet: number;
    gym: number;
    learning: {
      budget: number;        // Annual budget
      approved: boolean;
    };
    other: {
      description: string;
      value: number;
    }[];
  };

  // Work-Life Balance
  workLife: {
    workingDays: number;     // Days per week
    workingHours: number;    // Hours per day
    overtime: {
      frequency: 'rare' | 'sometimes' | 'often' | 'always';
      paid: boolean;
      rate?: number;        // Overtime multiplier
    };
    leaveDays: {
      annual: number;
      sick: number;
      personal: number;
      maternity: number;
      paternity: number;
    };
    remote: {
      daysPerWeek: number;
      flexibility: 'fixed' | 'flexible' | 'fully-remote';
      wfhStipend?: number;
    };
  };

  // Commute Information
  commute: {
    distance: number;       // km one way
    time: number;          // minutes one way
    cost: {
      monthly: number;
      breakdown: {
        fuel: number;
        parking: number;
        public: number;
      };
    };
    remoteDaysPerWeek: number; // If hybrid
  };

  // Career Growth
  career: {
    reviewCycle: string;    // e.g., "Every 6 months"
    promotionTrack: 'fast' | 'normal' | 'slow';
    trainingOpportunities: string[];
    careerPath: string[];
  };

  // Company Culture
  culture: {
    teamSize: number;
    companySize: string;
    industry: string;
    workEnvironment: 'startup' | 'corporate' | 'agency' | 'remote-first';
    dressCode: 'formal' | 'business-casual' | 'casual';
  };

  // Dates
  createdAt: Date;
  expiresAt?: Date;        // Offer expiration
}

export interface OfferComparison {
  id: string;
  userId?: string;         // null for anonymous
  offers: JobOffer[];
  userPriorities: UserPriorities;
  createdAt: Date;
  updatedAt: Date;
  isShared: boolean;
  shareToken?: string;
}

export interface UserPriorities {
  salary: number;          // 1-10 weighting
  bonuses: number;
  benefits: number;
  workLifeBalance: number;
  career: number;
  commute: number;
}

export interface ComparisonResult {
  offers: JobOffer[];
  rankings: {
    overall: JobOfferRanking[];
    byCategory: {
      compensation: JobOfferRanking[];
      workLifeBalance: JobOfferRanking[];
      benefits: JobOfferRanking[];
      growth: JobOfferRanking[];
    };
  };
  insights: string[];
  recommendation: {
    bestOverall: JobOffer;
    alternatives: JobOffer[];
    reasoning: string;
  };
}

export interface JobOfferRanking {
  offer: JobOffer;
  score: number;
  rank: number;
  breakdown: Record<string, number>;
}

export interface BenefitDefaults {
  healthInsurance: {
    self: number;
    spouse: number;
    family: number;
  };
  mealAllowance: {
    daily: number;
    monthly: number;
  };
  transport: {
    parking: number;
    fuel: number;
    public: number;
  };
  phone: number;
  internet: number;
  gym: number;
}

// Form types
export interface OfferFormData extends Omit<JobOffer, 'id' | 'createdAt'> {
  // Additional form-specific fields
  offerStatus: 'considering' | 'accepted' | 'rejected' | 'expired';
  notes?: string;
}

// API Response types
export interface CreateComparisonResponse {
  comparisonId: string;
  shareToken?: string;
}

export interface GetComparisonResponse extends OfferComparison {
  result?: ComparisonResult;
}