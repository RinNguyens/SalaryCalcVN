import type { CalculationHistory, SalaryInput, SalaryResult } from '@/types/salary';

const STORAGE_KEY = 'salary_calc_history';
const MAX_HISTORY = 50;

export function saveCalculation(
  input: SalaryInput,
  result: SalaryResult,
  mode: 'gross-to-net' | 'net-to-gross'
) {
  const existing = getHistory();

  const newEntry: CalculationHistory = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    input,
    result,
    mode,
  };

  const updated = [newEntry, ...existing].slice(0, MAX_HISTORY);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save calculation:', error);
  }
}

export function getHistory(): CalculationHistory[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteHistory(id: string) {
  const existing = getHistory();
  const filtered = existing.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getHistoryById(id: string): CalculationHistory | null {
  const history = getHistory();
  return history.find((item) => item.id === id) || null;
}
