/**
 * Product Detail Logic
 */

import { mockProducts } from '../data/products.js';
import { mockStores } from '../data/stores.js';
import type { ProductDetailResult } from '../types/index.js';

/**
 * Get product details by ID
 * @param productId - Product ID
 * @returns Object containing product and store information
 * @throws Error if product not found
 */
export function getProductDetail(productId: number | string | null | undefined): ProductDetailResult {
  if (productId === null || productId === undefined) {
    throw new Error('Product ID is required');
  }

  const id = parseInt(String(productId));

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
