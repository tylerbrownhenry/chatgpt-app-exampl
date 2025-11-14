/**
 * Store Search Logic
 */

import { mockStores } from '../data/stores.js';
import type { StoreSearchResult } from '../types/index.js';

/**
 * Search stores based on query
 * @param query - Search query (optional)
 * @returns Store search result with pagination and metadata
 */
export function searchStores(query: string | null | undefined): StoreSearchResult {
  let filteredStores = mockStores;

  if (query && typeof query === 'string' && query.trim() !== '') {
    const lowerQuery = query.toLowerCase().trim();
    filteredStores = mockStores.filter(store =>
      store.name.toLowerCase().includes(lowerQuery) ||
      store.city.toLowerCase().includes(lowerQuery) ||
      store.state.toLowerCase().includes(lowerQuery) ||
      store.stateShort.toLowerCase().includes(lowerQuery) ||
      store.address1.toLowerCase().includes(lowerQuery) ||
      store.address2.toLowerCase().includes(lowerQuery)
    );
  }

  // Calculate state counts
  const stateCounts = new Map<string, { state: string; stateIsoCode: string; count: number }>();
  
  mockStores.forEach(store => {
    const existing = stateCounts.get(store.stateShort);
    if (existing) {
      existing.count++;
    } else {
      stateCounts.set(store.stateShort, {
        state: store.state,
        stateIsoCode: store.stateIsoCode,
        count: 1
      });
    }
  });

  const states = Array.from(stateCounts.values()).map(s => ({
    stateIsoCode: s.stateIsoCode,
    state: s.state,
    count: s.count,
    selected: filteredStores.some(store => store.stateIsoCode === s.stateIsoCode)
  }));

  // Use first store's location as geolocation reference, or default values
  const firstStore = filteredStores[0] || mockStores[0];
  
  if (!firstStore) {
    throw new Error('No stores available');
  }

  return {
    pagination: {
      currentPage: 0,
      pageSize: 40,
      totalPages: Math.ceil(filteredStores.length / 40),
      totalResults: filteredStores.length
    },
    metadata: {
      geolocation: {
        latitude: firstStore.latitude,
        longitude: firstStore.longitude,
        state: firstStore.state,
        stateIsoCode: firstStore.stateShort
      },
      states: states
    },
    stores: filteredStores
  };
}
