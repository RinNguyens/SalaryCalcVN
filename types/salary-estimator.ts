export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  yearsExperience: number;
  isPrimary: boolean;
}

export enum SkillCategory {
  PROGRAMMING = 'programming',
  FRAMEWORK = 'framework',
  DATABASE = 'database',
  CLOUD = 'cloud',
  DEVOPS = 'devops',
  DESIGN = 'design',
  SOFT_SKILLS = 'soft_skills',
  MANAGEMENT = 'management',
  DOMAIN = 'domain',
  CERTIFICATION = 'certification',
}

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export interface EducationLevel {
  type: 'high_school' | 'bachelor' | 'master' | 'phd' | 'professional';
  field: string;
  school: string;
  gpa?: number;
}

export interface WorkExperience {
  title: string;
  company: string;
  industry: string;
  level: ExperienceLevel;
  years: number;
  achievements: string[];
}

export enum ExperienceLevel {
  INTERN = 'intern',
  JUNIOR = 'junior',
  MID_LEVEL = 'mid_level',
  SENIOR = 'senior',
  LEAD = 'lead',
  MANAGER = 'manager',
  DIRECTOR = 'director',
  VP = 'vp',
  C_LEVEL = 'c_level',
}

export interface SalaryEstimateRequest {
  skills: Skill[];
  experience: {
    totalYears: number;
    relevantYears: number;
    managementYears: number;
    overseasYears: number;
  };
  education: EducationLevel[];
  workHistory: WorkExperience[];
  location: LocationData;
  preferences: WorkPreferences;
}

export interface LocationData {
  city: string;
  country: string;
  region: string;
  remoteWorkPreference: RemotePreference;
}

export enum RemotePreference {
  ONSITE = 'onsite',
  HYBRID = 'hybrid',
  REMOTE = 'remote',
  FLEXIBLE = 'flexible',
}

export interface WorkPreferences {
  workType: 'full_time' | 'contract' | 'freelance' | 'part_time';
  companySize: CompanySize;
  industry: string[];
  workLifeBalancePriority: number; // 1-10
  careerGrowthPriority: number; // 1-10
  salaryNegotiable: boolean;
}

export enum CompanySize {
  STARTUP = 'startup', // 1-50
  SMALL = 'small', // 51-200
  MEDIUM = 'medium', // 201-1000
  LARGE = 'large', // 1001-10000
  ENTERPRISE = 'enterprise', // 10000+
}

export interface MarketDataPoint {
  skill: string;
  category: SkillCategory;
  averageSalary: number;
  salaryRange: {
    min: number;
    max: number;
    median: number;
  };
  demand: DemandLevel;
  growth: GrowthRate;
  locations: {
    [city: string]: number; // salary multiplier
  };
  lastUpdated: Date;
}

export enum DemandLevel {
  VERY_LOW = 'very_low',
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
}

export enum GrowthRate {
  DECLINING = 'declining',
  STABLE = 'stable',
  GROWING = 'growing',
  RAPID_GROWTH = 'rapid_growth',
}

export interface SalaryEstimate {
  baseSalary: {
    min: number;
    median: number;
    max: number;
    confidence: number; // 0-100
  };
  totalCompensation: {
    min: number;
    median: number;
    max: number;
  };
  breakdown: {
    baseSalary: number;
    bonus: number;
    equity: number;
    benefits: number;
  };
  marketPosition: MarketPosition;
  skills: {
    highDemand: string[];
    improvement: {
      skill: string;
      potentialIncrease: number;
      timeToAchieve: string;
    }[];
  };
  careerPath: {
    nextRole: string;
    timeframe: string;
    salaryIncrease: number;
  };
  negotiationTips: string[];
}

export interface MarketPosition {
  percentile: number; // 0-100
  comparison: string;
  category: 'below_average' | 'average' | 'above_average' | 'top_quartile';
}

export interface SkillSuggestion {
  skill: string;
  category: SkillCategory;
  demand: DemandLevel;
  salaryImpact: {
    current: number;
    potential: number;
    increase: number;
    percentage: number;
  };
  learningResources: {
    type: 'course' | 'certification' | 'book' | 'tutorial';
    title: string;
    provider: string;
    duration: string;
    cost: number;
  }[];
  difficulty: 'easy' | 'medium' | 'hard';
  timeToMaster: string;
}

// Predefined skill database
export const SKILL_DATABASE = {
  // Programming Languages
  programming: [
    { id: 'javascript', name: 'JavaScript', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.GROWING },
    { id: 'python', name: 'Python', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.RAPID_GROWTH },
    { id: 'java', name: 'Java', demand: DemandLevel.HIGH, growth: GrowthRate.STABLE },
    { id: 'typescript', name: 'TypeScript', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.RAPID_GROWTH },
    { id: 'csharp', name: 'C#', demand: DemandLevel.HIGH, growth: GrowthRate.STABLE },
    { id: 'cpp', name: 'C++', demand: DemandLevel.MODERATE, growth: GrowthRate.STABLE },
    { id: 'go', name: 'Go', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'rust', name: 'Rust', demand: DemandLevel.MODERATE, growth: GrowthRate.RAPID_GROWTH },
    { id: 'php', name: 'PHP', demand: DemandLevel.MODERATE, growth: GrowthRate.STABLE },
    { id: 'ruby', name: 'Ruby', demand: DemandLevel.LOW, growth: GrowthRate.DECLINING },
    { id: 'swift', name: 'Swift', demand: DemandLevel.MODERATE, growth: GrowthRate.GROWING },
    { id: 'kotlin', name: 'Kotlin', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'dart', name: 'Dart', demand: DemandLevel.MODERATE, growth: GrowthRate.GROWING },
  ],

  // Frameworks
  framework: [
    { id: 'react', name: 'React', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.GROWING },
    { id: 'vue', name: 'Vue.js', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'angular', name: 'Angular', demand: DemandLevel.HIGH, growth: GrowthRate.STABLE },
    { id: 'nodejs', name: 'Node.js', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.GROWING },
    { id: 'django', name: 'Django', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'flask', name: 'Flask', demand: DemandLevel.MODERATE, growth: GrowthRate.STABLE },
    { id: 'spring', name: 'Spring Boot', demand: DemandLevel.HIGH, growth: GrowthRate.STABLE },
    { id: 'dotnet', name: '.NET', demand: DemandLevel.HIGH, growth: GrowthRate.STABLE },
    { id: 'laravel', name: 'Laravel', demand: DemandLevel.MODERATE, growth: GrowthRate.GROWING },
    { id: 'rails', name: 'Ruby on Rails', demand: DemandLevel.LOW, growth: GrowthRate.DECLINING },
    { id: 'nextjs', name: 'Next.js', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.RAPID_GROWTH },
    { id: 'nuxt', name: 'Nuxt.js', demand: DemandLevel.MODERATE, growth: GrowthRate.GROWING },
    { id: 'flutter', name: 'Flutter', demand: DemandLevel.HIGH, growth: GrowthRate.RAPID_GROWTH },
    { id: 'react-native', name: 'React Native', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'svelte', name: 'Svelte', demand: DemandLevel.MODERATE, growth: GrowthRate.RAPID_GROWTH },
  ],

  // Cloud & DevOps
  cloud: [
    { id: 'aws', name: 'AWS', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.GROWING },
    { id: 'azure', name: 'Azure', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'gcp', name: 'Google Cloud', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'docker', name: 'Docker', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.STABLE },
    { id: 'kubernetes', name: 'Kubernetes', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.GROWING },
    { id: 'terraform', name: 'Terraform', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'jenkins', name: 'Jenkins', demand: DemandLevel.MODERATE, growth: GrowthRate.STABLE },
    { id: 'github-actions', name: 'GitHub Actions', demand: DemandLevel.HIGH, growth: GrowthRate.RAPID_GROWTH },
    { id: 'gitlab-ci', name: 'GitLab CI', demand: DemandLevel.MODERATE, growth: GrowthRate.GROWING },
  ],

  // Databases
  database: [
    { id: 'postgresql', name: 'PostgreSQL', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'mysql', name: 'MySQL', demand: DemandLevel.HIGH, growth: GrowthRate.STABLE },
    { id: 'mongodb', name: 'MongoDB', demand: DemandLevel.HIGH, growth: GrowthRate.STABLE },
    { id: 'redis', name: 'Redis', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'elasticsearch', name: 'Elasticsearch', demand: DemandLevel.MODERATE, growth: GrowthRate.GROWING },
    { id: 'oracle', name: 'Oracle', demand: DemandLevel.MODERATE, growth: GrowthRate.STABLE },
    { id: 'sqlserver', name: 'SQL Server', demand: DemandLevel.MODERATE, growth: GrowthRate.STABLE },
    { id: 'dynamodb', name: 'DynamoDB', demand: DemandLevel.MODERATE, growth: GrowthRate.GROWING },
    { id: 'cassandra', name: 'Cassandra', demand: DemandLevel.LOW, growth: GrowthRate.STABLE },
  ],

  // Soft Skills
  soft_skills: [
    { id: 'leadership', name: 'Leadership', demand: DemandLevel.HIGH, growth: GrowthRate.STABLE },
    { id: 'communication', name: 'Communication', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.STABLE },
    { id: 'teamwork', name: 'Teamwork', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.STABLE },
    { id: 'problem-solving', name: 'Problem Solving', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.STABLE },
    { id: 'project-management', name: 'Project Management', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'agile-scrum', name: 'Agile/Scrum', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.STABLE },
    { id: 'english', name: 'English', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.STABLE },
    { id: 'presentation', name: 'Presentation', demand: DemandLevel.HIGH, growth: GrowthRate.STABLE },
  ],

  // Certifications
  certification: [
    { id: 'aws-solutions-architect', name: 'AWS Solutions Architect', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'aws-devops', name: 'AWS DevOps Engineer', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'gcp-architect', name: 'Google Cloud Architect', demand: DemandLevel.MODERATE, growth: GrowthRate.GROWING },
    { id: 'azure-administrator', name: 'Azure Administrator', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'pmp', name: 'PMP', demand: DemandLevel.HIGH, growth: GrowthRate.STABLE },
    { id: 'cisa', name: 'CISA', demand: DemandLevel.MODERATE, growth: GrowthRate.STABLE },
    { id: 'cism', name: 'CISM', demand: DemandLevel.MODERATE, growth: GrowthRate.STABLE },
    { id: 'ciSSP', name: 'CISSP', demand: DemandLevel.HIGH, growth: GrowthRate.GROWING },
    { id: 'ielts', name: 'IELTS', demand: DemandLevel.VERY_HIGH, growth: GrowthRate.STABLE },
    { id: 'toeic', name: 'TOEIC', demand: DemandLevel.HIGH, growth: GrowthRate.STABLE },
  ],
} as const;

// Location multipliers for Vietnam
export const VIETNAM_LOCATION_MULTIPLIERS = {
  'Ho Chi Minh': 1.25,
  'Hanoi': 1.20,
  'Da Nang': 1.00,
  'Can Tho': 0.90,
  'Hai Phong': 0.95,
  'Bien Hoa': 0.95,
  'Nha Trang': 0.90,
  'Other': 0.85,
} as const;

// Industry multipliers
export const INDUSTRY_MULTIPLIERS = {
  'tech': 1.20,
  'finance': 1.15,
  'ecommerce': 1.25,
  'fintech': 1.30,
  'consulting': 1.15,
  'manufacturing': 0.90,
  'education': 0.85,
  'healthcare': 0.95,
  'government': 0.80,
  'startup': 0.95,
  'other': 1.00,
} as const;