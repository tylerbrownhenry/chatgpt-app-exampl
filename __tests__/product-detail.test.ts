/**
 * Product Detail Logic Tests
 */

import { describe, test, expect } from '@jest/globals';
import { getProductDetail } from '../src/server/logic/product-detail.js';
import type { ProductDetailResult } from '../src/server/types/index.js';

describe('getProductDetail', () => {
  test('should return product and store for valid ID', () => {
    const result = getProductDetail(1);

    expect(result).toHaveProperty('product');
    expect(result).toHaveProperty('store');
    expect(result.product.id).toBe(1);
    expect(result.product.name).toBe('Wireless Bluetooth Headphones');
    expect(result.store).toBeDefined();
    expect(result.store.id).toBe(result.product.storeId);
  });

  test('should work with string ID', () => {
    const result = getProductDetail('2');

    expect(result.product.id).toBe(2);
    expect(result.product.name).toBe('Smart Watch Pro');
  });

  test('should return correct store for product', () => {
    const result = getProductDetail(4);

    expect(result.product.name).toBe('Mechanical Keyboard RGB');
    expect(result.store.name).toBe('Gaming Central');
    expect(result.store.id).toBe(3);
  });

  test('should throw error for invalid product ID', () => {
    expect(() => getProductDetail(999)).toThrow('Product with ID 999 not found');
  });

  test('should throw error for null product ID', () => {
    expect(() => getProductDetail(null)).toThrow('Product ID is required');
  });

  test('should throw error for undefined product ID', () => {
    expect(() => getProductDetail(undefined)).toThrow('Product ID is required');
  });

  test('should throw error for non-numeric product ID', () => {
    expect(() => getProductDetail('invalid')).toThrow('Invalid product ID: invalid');
  });

  test('should throw error for negative product ID', () => {
    expect(() => getProductDetail(-1)).toThrow('Product with ID -1 not found');
  });

  test('should throw error for zero product ID', () => {
    expect(() => getProductDetail(0)).toThrow('Product with ID 0 not found');
  });

  test('should include all product properties', () => {
    const result = getProductDetail(1);

    expect(result.product).toHaveProperty('id');
    expect(result.product).toHaveProperty('name');
    expect(result.product).toHaveProperty('price');
    expect(result.product).toHaveProperty('image');
    expect(result.product).toHaveProperty('description');
    expect(result.product).toHaveProperty('rating');
    expect(result.product).toHaveProperty('reviews');
    expect(result.product).toHaveProperty('inStock');
    expect(result.product).toHaveProperty('category');
    expect(result.product).toHaveProperty('brand');
    expect(result.product).toHaveProperty('specs');
  });

  test('should include all store properties', () => {
    const result = getProductDetail(1);

    expect(result.store).toHaveProperty('id');
    expect(result.store).toHaveProperty('name');
    expect(result.store).toHaveProperty('description');
    expect(result.store).toHaveProperty('rating');
    expect(result.store).toHaveProperty('location');
    expect(result.store).toHaveProperty('phone');
    expect(result.store).toHaveProperty('email');
    expect(result.store).toHaveProperty('hours');
  });

  test('should handle all valid product IDs (1-8)', () => {
    for (let id = 1; id <= 8; id++) {
      const result = getProductDetail(id);
      expect(result.product.id).toBe(id);
      expect(result.store).toBeDefined();
    }
  });
});
