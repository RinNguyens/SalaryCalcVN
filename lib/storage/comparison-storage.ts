import type { ComparisonSet } from '@/types/salary';

const STORAGE_KEY = 'salary_calc_comparisons';
const MAX_COMPARISONS = 10;

/**
 * Save a comparison set to localStorage
 * @param comparison - Comparison set to save
 */
export function saveComparison(comparison: ComparisonSet): void {
  try {
    const existing = getComparisons();

    // Check if comparison with same ID exists
    const index = existing.findIndex((c) => c.id === comparison.id);

    let updated: ComparisonSet[];
    if (index !== -1) {
      // Update existing comparison
      updated = [...existing];
      updated[index] = comparison;
    } else {
      // Add new comparison at the beginning
      updated = [comparison, ...existing].slice(0, MAX_COMPARISONS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save comparison:', error);
  }
}

/**
 * Get all saved comparisons from localStorage
 * @returns Array of comparisons sorted by timestamp (newest first)
 */
export function getComparisons(): ComparisonSet[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const comparisons = JSON.parse(data) as ComparisonSet[];
    return comparisons.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Failed to load comparisons:', error);
    return [];
  }
}

/**
 * Get a specific comparison by ID
 * @param id - Comparison ID
 * @returns Comparison set or null if not found
 */
export function getComparisonById(id: string): ComparisonSet | null {
  const comparisons = getComparisons();
  return comparisons.find((c) => c.id === id) || null;
}

/**
 * Update an existing comparison
 * @param id - Comparison ID
 * @param updates - Partial comparison updates
 */
export function updateComparison(
  id: string,
  updates: Partial<ComparisonSet>
): void {
  try {
    const comparisons = getComparisons();
    const index = comparisons.findIndex((c) => c.id === id);

    if (index === -1) {
      console.warn(`Comparison with ID "${id}" not found`);
      return;
    }

    comparisons[index] = {
      ...comparisons[index],
      ...updates,
      id, // Ensure ID doesn't change
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(comparisons));
  } catch (error) {
    console.error('Failed to update comparison:', error);
  }
}

/**
 * Delete a comparison by ID
 * @param id - Comparison ID to delete
 */
export function deleteComparison(id: string): void {
  try {
    const comparisons = getComparisons();
    const filtered = comparisons.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete comparison:', error);
  }
}

/**
 * Clear all saved comparisons
 */
export function clearComparisons(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear comparisons:', error);
  }
}

/**
 * Get storage usage statistics
 * @returns Object with comparison count and estimated size
 */
export function getComparisonStats() {
  const comparisons = getComparisons();
  const dataSize = localStorage.getItem(STORAGE_KEY)?.length || 0;

  return {
    count: comparisons.length,
    maxCount: MAX_COMPARISONS,
    estimatedSizeKB: Math.round(dataSize / 1024),
  };
}
