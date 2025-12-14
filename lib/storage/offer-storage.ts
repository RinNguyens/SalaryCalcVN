import type { OfferComparison, JobOffer } from '@/types/job-offer';

const STORAGE_KEY = 'salarycalc-offer-comparisons';
const OFFERS_KEY = 'salarycalc-job-offers';

export function saveOfferComparison(comparison: OfferComparison): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = getOfferComparisons();
    const updated = [comparison, ...existing].slice(0, 50); // Keep only 50 most recent
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save offer comparison:', error);
  }
}

export function getOfferComparisons(): OfferComparison[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      expiresAt: item.expiresAt ? new Date(item.expiresAt) : undefined,
    }));
  } catch (error) {
    console.error('Failed to get offer comparisons:', error);
    return [];
  }
}

export function deleteOfferComparison(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = getOfferComparisons();
    const updated = existing.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to delete offer comparison:', error);
  }
}

export function saveJobOffers(offers: JobOffer[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(OFFERS_KEY, JSON.stringify(offers));
  } catch (error) {
    console.error('Failed to save job offers:', error);
  }
}

export function getJobOffers(): JobOffer[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(OFFERS_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      expiresAt: item.expiresAt ? new Date(item.expiresAt) : undefined,
    }));
  } catch (error) {
    console.error('Failed to get job offers:', error);
    return [];
  }
}

export function exportOfferComparison(comparison: OfferComparison): string {
  const exportData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    comparison: {
      ...comparison,
      offers: comparison.offers.map(offer => ({
        ...offer,
        // Convert dates to strings for JSON serialization
        createdAt: offer.createdAt.toISOString(),
        expiresAt: offer.expiresAt?.toISOString(),
      })),
    },
  };

  return JSON.stringify(exportData, null, 2);
}

export function importOfferComparison(jsonString: string): OfferComparison | null {
  try {
    const importData = JSON.parse(jsonString);

    // Basic validation
    if (!importData.comparison || !importData.comparison.offers) {
      throw new Error('Invalid comparison format');
    }

    // Convert date strings back to Date objects
    const comparison = {
      ...importData.comparison,
      createdAt: new Date(importData.comparison.createdAt),
      updatedAt: new Date(importData.comparison.updatedAt),
      expiresAt: importData.comparison.expiresAt
        ? new Date(importData.comparison.expiresAt)
        : undefined,
      offers: importData.comparison.offers.map((offer: any) => ({
        ...offer,
        createdAt: new Date(offer.createdAt),
        expiresAt: offer.expiresAt ? new Date(offer.expiresAt) : undefined,
      })),
    };

    return comparison;
  } catch (error) {
    console.error('Failed to import offer comparison:', error);
    return null;
  }
}