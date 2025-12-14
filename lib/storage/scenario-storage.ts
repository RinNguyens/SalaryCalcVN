import type { WhatIfScenario } from '@/types/salary';

const STORAGE_KEY = 'salary_calc_scenarios';
const MAX_SCENARIOS = 20;

/**
 * Save a What-If scenario to localStorage
 * @param scenario - Scenario to save
 */
export function saveScenario(scenario: WhatIfScenario): void {
  try {
    const existing = getScenarios();

    // Check if scenario with same ID exists
    const index = existing.findIndex((s) => s.id === scenario.id);

    let updated: WhatIfScenario[];
    if (index !== -1) {
      // Update existing scenario
      updated = [...existing];
      updated[index] = scenario;
    } else {
      // Add new scenario at the beginning
      updated = [scenario, ...existing].slice(0, MAX_SCENARIOS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save scenario:', error);
  }
}

/**
 * Get all saved scenarios from localStorage
 * @returns Array of scenarios sorted by timestamp (newest first)
 */
export function getScenarios(): WhatIfScenario[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const scenarios = JSON.parse(data) as WhatIfScenario[];
    return scenarios.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Failed to load scenarios:', error);
    return [];
  }
}

/**
 * Get a specific scenario by ID
 * @param id - Scenario ID
 * @returns Scenario or null if not found
 */
export function getScenarioById(id: string): WhatIfScenario | null {
  const scenarios = getScenarios();
  return scenarios.find((s) => s.id === id) || null;
}

/**
 * Update an existing scenario
 * @param id - Scenario ID
 * @param updates - Partial scenario updates
 */
export function updateScenario(
  id: string,
  updates: Partial<WhatIfScenario>
): void {
  try {
    const scenarios = getScenarios();
    const index = scenarios.findIndex((s) => s.id === id);

    if (index === -1) {
      console.warn(`Scenario with ID "${id}" not found`);
      return;
    }

    scenarios[index] = {
      ...scenarios[index],
      ...updates,
      id, // Ensure ID doesn't change
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
  } catch (error) {
    console.error('Failed to update scenario:', error);
  }
}

/**
 * Delete a scenario by ID
 * @param id - Scenario ID to delete
 */
export function deleteScenario(id: string): void {
  try {
    const scenarios = getScenarios();
    const filtered = scenarios.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete scenario:', error);
  }
}

/**
 * Clear all saved scenarios
 */
export function clearScenarios(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear scenarios:', error);
  }
}

/**
 * Get storage usage statistics
 * @returns Object with scenario count and estimated size
 */
export function getScenarioStats() {
  const scenarios = getScenarios();
  const dataSize = localStorage.getItem(STORAGE_KEY)?.length || 0;

  return {
    count: scenarios.length,
    maxCount: MAX_SCENARIOS,
    estimatedSizeKB: Math.round(dataSize / 1024),
  };
}
