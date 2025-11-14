/**
 * Store Detail Logic Tests
 */

import { describe, test, expect } from '@jest/globals';
import { getStoreDetails } from '../src/server/logic/store-detail.js';
import type { StoreDetailResult } from '../src/server/types/index.js';

describe('getStoreDetails', () => {
  test('should return store and products for valid ID', () => {
    const result = getStoreDetails(1);

    expect(result).toHaveProperty('store');
    expect(result).toHaveProperty('products');
    expect(result.store.id).toBe(1);
    expect(result.store.name).toBe('Tech Haven Electronics');
    expect(Array.isArray(result.products)).toBe(true);
    expect(result.products.length).toBeGreaterThan(0);
  });

  test('should work with string ID', () => {
    const result = getStoreDetails('2');

    expect(result.store.id).toBe(2);
    expect(result.store.name).toBe('Smart Gadgets Pro');
  });

  test('should return only products from the specified store', () => {
    const result = getStoreDetails(1);

    result.products.forEach(product => {
      expect(product.storeId).toBe(1);
    });
  });

  test('should return correct number of products per store', () => {
    const store1 = getStoreDetails(1);
    const store2 = getStoreDetails(2);
    const store3 = getStoreDetails(3);

    // Store 1 has products with IDs: 1, 3, 6 (3 products)
    expect(store1.products.length).toBe(3);

    // Store 2 has products with IDs: 2, 5, 8 (3 products)
    expect(store2.products.length).toBe(3);

    // Store 3 has products with IDs: 4, 7 (2 products)
    expect(store3.products.length).toBe(2);
  });

  test('should throw error for invalid store ID', () => {
    expect(() => getStoreDetails(999)).toThrow('Store with ID 999 not found');
  });

  test('should throw error for null store ID', () => {
    expect(() => getStoreDetails(null)).toThrow('Store ID is required');
  });

  test('should throw error for undefined store ID', () => {
    expect(() => getStoreDetails(undefined)).toThrow('Store ID is required');
  });

  test('should throw error for non-numeric store ID', () => {
    expect(() => getStoreDetails('invalid')).toThrow('Invalid store ID: invalid');
  });

  test('should throw error for negative store ID', () => {
    expect(() => getStoreDetails(-1)).toThrow('Store with ID -1 not found');
  });

  test('should throw error for zero store ID', () => {
    expect(() => getStoreDetails(0)).toThrow('Store with ID 0 not found');
  });

  test('should include all store properties', () => {
    const result = getStoreDetails(1);

    expect(result.store).toHaveProperty('id');
    expect(result.store).toHaveProperty('name');
    expect(result.store).toHaveProperty('description');
    expect(result.store).toHaveProperty('rating');
    expect(result.store).toHaveProperty('reviews');
    expect(result.store).toHaveProperty('location');
    expect(result.store).toHaveProperty('phone');
    expect(result.store).toHaveProperty('email');
    expect(result.store).toHaveProperty('hours');
    expect(result.store).toHaveProperty('categories');
    expect(result.store).toHaveProperty('shippingInfo');
    expect(result.store).toHaveProperty('returnPolicy');
  });

  test('should return products with all required properties', () => {
    const result = getStoreDetails(1);

    result.products.forEach(product => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('storeId');
      expect(product.storeId).toBe(1);
    });
  });

  test('should handle all valid store IDs (1-3)', () => {
    for (let id = 1; id <= 3; id++) {
      const result = getStoreDetails(id);
      expect(result.store.id).toBe(id);
      expect(result.products.length).toBeGreaterThan(0);
    }
  });

  test('should return products in consistent order', () => {
    const result1 = getStoreDetails(1);
    const result2 = getStoreDetails(1);

    expect(result1.products).toEqual(result2.products);
  });
});
