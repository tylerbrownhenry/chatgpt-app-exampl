/**
 * Product Search Logic
 */

import { mockProducts } from '../data/products.js';
import type { Product } from '../types/index.js';

/**
 * Search products based on query
 * @param query - Search query
 * @returns Array of matching products
 */
export function searchProducts(query: string | null | undefined): Product[] {
  if (!query || typeof query !== 'string') {
    return mockProducts.slice(0, 6);
  }

  const lowerQuery = query.toLowerCase().trim();

  if (lowerQuery === '') {
    return mockProducts.slice(0, 6);
  }

  const results = mockProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery)
  );

  return results.length > 0 ? results : mockProducts.slice(0, 6);
}
