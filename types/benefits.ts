export interface BenefitsPackage {
  health: {
    insurance: boolean;
    coverage: 'self' | 'self+spouse' | 'family';
    value: number;
  };
  dental: {
    coverage: boolean;
    value: number;
  };
  vision: {
    coverage: boolean;
    value: number;
  };
  meals: {
    lunch: boolean;
    dinner: boolean;
    value: number;
    daysPerWeek: number;
  };
  transport: {
    parking: boolean;
    shuttle: boolean;
    allowance: number;
  };
  phone: {
    allowance: number;
    provided: boolean;
  };
  internet: {
    allowance: number;
    provided: boolean;
  };
  wellness: {
    gym: boolean;
    value: number;
    activities: string[];
  };
  equipment: {
    laptop: boolean;
    monitor: boolean;
    homeOffice: boolean;
    budget: number;
  };
  other: {
    name: string;
    value: number;
  }[];
}