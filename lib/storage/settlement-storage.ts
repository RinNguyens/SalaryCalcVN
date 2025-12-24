import type { TaxSettlement, TaxSettlementBackup } from '@/types/tax-settlement';

const STORAGE_KEY = 'salarylens_tax_settlements';
const MAX_SETTLEMENTS = 50;

/**
 * Save a tax settlement to localStorage
 * @param settlement - Settlement to save
 */
export function saveSettlement(settlement: TaxSettlement): void {
  try {
    const existing = getSettlements();

    // Check if settlement with same ID exists
    const index = existing.findIndex((s) => s.id === settlement.id);

    let updated: TaxSettlement[];
    if (index !== -1) {
      // Update existing settlement
      updated = [...existing];
      updated[index] = {
        ...settlement,
        updatedAt: Date.now(),
      };
    } else {
      // Add new settlement at the beginning
      const newSettlement = {
        ...settlement,
        createdAt: settlement.createdAt || Date.now(),
        updatedAt: Date.now(),
      };
      updated = [newSettlement, ...existing].slice(0, MAX_SETTLEMENTS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save settlement:', error);
    throw new Error('Không thể lưu quyết toán thuế. Vui lòng thử lại.');
  }
}

/**
 * Get all saved settlements from localStorage
 * @returns Array of settlements sorted by updatedAt (newest first)
 */
export function getSettlements(): TaxSettlement[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const settlements = JSON.parse(data) as TaxSettlement[];
    return settlements.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (error) {
    console.error('Failed to load settlements:', error);
    return [];
  }
}

/**
 * Get a specific settlement by ID
 * @param id - Settlement ID
 * @returns Settlement or null if not found
 */
export function getSettlementById(id: string): TaxSettlement | null {
  const settlements = getSettlements();
  return settlements.find((s) => s.id === id) || null;
}

/**
 * Update an existing settlement
 * @param id - Settlement ID
 * @param updates - Partial settlement updates
 */
export function updateSettlement(
  id: string,
  updates: Partial<TaxSettlement>
): void {
  try {
    const settlements = getSettlements();
    const index = settlements.findIndex((s) => s.id === id);

    if (index === -1) {
      console.warn(`Settlement with ID "${id}" not found`);
      return;
    }

    settlements[index] = {
      ...settlements[index],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settlements));
  } catch (error) {
    console.error('Failed to update settlement:', error);
    throw new Error('Không thể cập nhật quyết toán thuế. Vui lòng thử lại.');
  }
}

/**
 * Delete a settlement by ID
 * @param id - Settlement ID to delete
 */
export function deleteSettlement(id: string): void {
  try {
    const settlements = getSettlements();
    const filtered = settlements.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete settlement:', error);
    throw new Error('Không thể xóa quyết toán thuế. Vui lòng thử lại.');
  }
}

/**
 * Clear all saved settlements
 */
export function clearSettlements(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear settlements:', error);
    throw new Error('Không thể xóa tất cả quyết toán thuế. Vui lòng thử lại.');
  }
}

/**
 * Export all settlements as JSON string for backup
 * @returns JSON string of backup data
 */
export function exportSettlements(): string {
  const settlements = getSettlements();
  const backup: TaxSettlementBackup = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    settlements,
  };
  return JSON.stringify(backup, null, 2);
}

/**
 * Import settlements from JSON backup
 * @param jsonString - JSON backup string
 * @returns true if successful, false otherwise
 */
export function importSettlements(jsonString: string): boolean {
  try {
    const backup = JSON.parse(jsonString) as TaxSettlementBackup;

    // Validate backup format
    if (!backup.version || backup.version !== '1.0') {
      throw new Error('Incompatible backup version');
    }

    if (!Array.isArray(backup.settlements)) {
      throw new Error('Invalid backup format');
    }

    // Merge with existing settlements (avoid duplicates)
    const existing = getSettlements();
    const existingIds = new Set(existing.map((s) => s.id));

    const newSettlements = backup.settlements.filter(
      (s) => !existingIds.has(s.id)
    );

    const merged = [...existing, ...newSettlements].slice(0, MAX_SETTLEMENTS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return true;
  } catch (error) {
    console.error('Failed to import settlements:', error);
    return false;
  }
}

/**
 * Download settlements as JSON file
 */
export function downloadBackup(): void {
  try {
    const json = exportSettlements();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tax-settlements-backup-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download backup:', error);
    throw new Error('Không thể tải xuống bản sao lưu. Vui lòng thử lại.');
  }
}

/**
 * Get storage usage statistics
 * @returns Object with settlement count and estimated size
 */
export function getSettlementStats() {
  const settlements = getSettlements();
  const dataSize = localStorage.getItem(STORAGE_KEY)?.length || 0;

  return {
    count: settlements.length,
    maxCount: MAX_SETTLEMENTS,
    estimatedSizeKB: Math.round(dataSize / 1024),
    completedCount: settlements.filter((s) => s.status === 'completed').length,
    draftCount: settlements.filter((s) => s.status === 'draft').length,
  };
}

/**
 * Get settlements by year
 * @param year - Tax year
 * @returns Array of settlements for the specified year
 */
export function getSettlementsByYear(year: number): TaxSettlement[] {
  const settlements = getSettlements();
  return settlements.filter((s) => s.year === year);
}

/**
 * Get settlements by status
 * @param status - Settlement status
 * @returns Array of settlements with the specified status
 */
export function getSettlementsByStatus(
  status: 'draft' | 'completed'
): TaxSettlement[] {
  const settlements = getSettlements();
  return settlements.filter((s) => s.status === status);
}
