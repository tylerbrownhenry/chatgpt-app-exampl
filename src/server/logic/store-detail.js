/**
 * Store Detail Logic
 */

import { mockStores } from '../data/stores.js';
import { mockProducts } from '../data/products.js';

/**
 * Get store details by ID
 * @param {number|string} storeId - Store ID
 * @returns {Object} Object containing store and products information
 * @throws {Error} If store not found
 */
export function getStoreDetails(storeId) {
  if (storeId === null || storeId === undefined) {
    throw new Error('Store ID is required');
  }

  const id = parseInt(storeId);

  if (isNaN(id)) {
    throw new Error(`Invalid store ID: ${storeId}`);
  }

  const store = mockStores.find(s => s.id === id);

  if (!store) {
    throw new Error(`Store with ID ${storeId} not found`);
  }

  // Get products from this store
  const storeProducts = mockProducts.filter(p => p.storeId === store.id);

  return { store, products: storeProducts };
}
