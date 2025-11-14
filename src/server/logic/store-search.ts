/**
 * Store Search Logic
 */

import { mockStores } from '../data/stores.js';
import type { Store } from '../types/index.js';

/**
 * Search stores based on query
 * @param query - Search query (optional)
 * @returns Array of matching stores
 */
export function searchStores(query: string | null | undefined): Store[] {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return mockStores;
  }

  const lowerQuery = query.toLowerCase().trim();
  const results = mockStores.filter(store =>
    store.name.toLowerCase().includes(lowerQuery) ||
    store.description.toLowerCase().includes(lowerQuery) ||
    store.categories.some(cat => cat.toLowerCase().includes(lowerQuery)) ||
    store.location.toLowerCase().includes(lowerQuery)
  );

  return results.length > 0 ? results : mockStores;
}
