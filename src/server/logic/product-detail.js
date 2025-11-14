/**
 * Product Detail Logic
 */

import { mockProducts } from '../data/products.js';
import { mockStores } from '../data/stores.js';

/**
 * Get product details by ID
 * @param {number|string} productId - Product ID
 * @returns {Object} Object containing product and store information
 * @throws {Error} If product not found
 */
export function getProductDetail(productId) {
  if (productId === null || productId === undefined) {
    throw new Error('Product ID is required');
  }

  const id = parseInt(productId);

  if (isNaN(id)) {
    throw new Error(`Invalid product ID: ${productId}`);
  }

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  // Get the store information
  const store = mockStores.find(s => s.id === product.storeId);

  return { product, store };
}
