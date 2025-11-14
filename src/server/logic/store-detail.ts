/**
 * Store Detail Logic
 */

import { mockStores } from '../data/stores.js';
import { mockProducts } from '../data/products.js';
import type { StoreDetailResult } from '../types/index.js';

/**
 * Get store details by store number
 * @param storeNumber - Store number (e.g., "401", "402")
 * @returns Object containing store and products information
 * @throws Error if store not found
 */
export function getStoreDetails(storeNumber: number | string | null | undefined): StoreDetailResult {
  if (storeNumber === null || storeNumber === undefined) {
    throw new Error('Store number is required');
  }

  const storeNum = String(storeNumber);

  const store = mockStores.find(s => s.storeNumber === storeNum);

  if (!store) {
    throw new Error(`Store with number ${storeNumber} not found`);
  }

  // Get products from this store (using storeId field from products)
  // For now, return all products since the product storeId doesn't map to storeNumber yet
  const storeProducts = mockProducts;

  return { store, products: storeProducts };
}
