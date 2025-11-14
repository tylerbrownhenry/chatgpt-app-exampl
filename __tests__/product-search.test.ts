/**
 * Product Search Logic Tests
 */

import { describe, test, expect } from '@jest/globals';
import { searchProducts } from '../src/server/logic/product-search.js';
import { mockProducts } from '../src/server/data/products.js';
import type { Product } from '../src/server/types/index.js';

describe('searchProducts', () => {
  test('should return products matching the query by name', () => {
    const results = searchProducts('headphones');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toContain('Headphones');
  });

  test('should return products matching the query by description', () => {
    const results = searchProducts('gaming');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(p => p.description.toLowerCase().includes('gaming'))).toBe(true);
  });

  test('should return products matching by category', () => {
    const results = searchProducts('peripherals');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(p => p.category === 'Peripherals')).toBe(true);
  });

  test('should return products matching by brand', () => {
    const results = searchProducts('audiotech');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].brand).toBe('AudioTech');
  });

  test('should be case-insensitive', () => {
    const lowerResults = searchProducts('keyboard');
    const upperResults = searchProducts('KEYBOARD');
    const mixedResults = searchProducts('KeYbOaRd');

    expect(lowerResults).toEqual(upperResults);
    expect(lowerResults).toEqual(mixedResults);
  });

  test('should return default products when query is empty', () => {
    const results = searchProducts('');
    expect(results.length).toBe(6);
    expect(results).toEqual(mockProducts.slice(0, 6));
  });

  test('should return default products when no matches found', () => {
    const results = searchProducts('nonexistent product xyz123');
    expect(results.length).toBe(6);
    expect(results).toEqual(mockProducts.slice(0, 6));
  });

  test('should handle null or undefined query', () => {
    const nullResults = searchProducts(null);
    const undefinedResults = searchProducts(undefined);

    expect(nullResults.length).toBe(6);
    expect(undefinedResults.length).toBe(6);
  });

  test('should handle whitespace-only query', () => {
    const results = searchProducts('   ');
    expect(results.length).toBe(6);
  });

  test('should trim whitespace from query', () => {
    const results = searchProducts('  headphones  ');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toContain('Headphones');
  });

  test('should return all matching products', () => {
    const results = searchProducts('wireless');
    expect(results.length).toBeGreaterThan(1);
    results.forEach(product => {
      const matchesQuery =
        product.name.toLowerCase().includes('wireless') ||
        product.description.toLowerCase().includes('wireless');
      expect(matchesQuery).toBe(true);
    });
  });
});
