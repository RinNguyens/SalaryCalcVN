import type { SalaryEstimateRequest, SalaryEstimate } from '@/types/salary-estimator';

const STORAGE_KEY = 'salarylens-estimations';

export interface SavedEstimation {
  id: string;
  request: SalaryEstimateRequest;
  result: SalaryEstimate;
  createdAt: Date;
}

export function saveEstimation(request: SalaryEstimateRequest, result: SalaryEstimate): void {
  if (typeof window === 'undefined') return;

  try {
    const estimations = getEstimations();
    const newEstimation: SavedEstimation = {
      id: Date.now().toString(),
      request,
      result,
      createdAt: new Date(),
    };

    // Keep only the 50 most recent estimations
    const updated = [newEstimation, ...estimations].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save estimation:', error);
  }
}

export function getEstimations(): SavedEstimation[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));
  } catch (error) {
    console.error('Failed to get estimations:', error);
    return [];
  }
}

export function deleteEstimation(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const estimations = getEstimations();
    const updated = estimations.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to delete estimation:', error);
  }
}

export function exportEstimation(estimation: SavedEstimation): string {
  const exportData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    estimation: {
      ...estimation,
      createdAt: estimation.createdAt.toISOString(),
    },
  };

  return JSON.stringify(exportData, null, 2);
}

export function getEstimationStats() {
  const estimations = getEstimations();

  const totalEstimations = estimations.length;
  const averageSalary = estimations.length > 0
    ? estimations.reduce((sum, e) => sum + e.result.baseSalary.median, 0) / estimations.length
    : 0;

  const topSkills = new Map<string, number>();
  estimations.forEach(estimation => {
    estimation.request.skills.forEach(skill => {
      topSkills.set(skill.name, (topSkills.get(skill.name) || 0) + 1);
    });
  });

  return {
    totalEstimations,
    averageSalary,
    topSkills: Array.from(topSkills.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count })),
  };
}