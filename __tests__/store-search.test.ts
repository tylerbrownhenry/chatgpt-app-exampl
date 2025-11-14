/**
 * Store Search Logic Tests
 */

import { describe, test, expect } from '@jest/globals';
import { searchStores } from '../src/server/logic/store-search.js';
import { mockStores } from '../src/server/data/stores.js';
import type { Store } from '../src/server/types/index.js';

describe('searchStores', () => {
  test('should return all stores when no query provided', () => {
    const results = searchStores('');
    expect(results.length).toBe(mockStores.length);
    expect(results).toEqual(mockStores);
  });

  test('should return all stores when query is null or undefined', () => {
    const nullResults = searchStores(null);
    const undefinedResults = searchStores(undefined);

    expect(nullResults).toEqual(mockStores);
    expect(undefinedResults).toEqual(mockStores);
  });

  test('should return stores matching by name', () => {
    const results = searchStores('gaming');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toContain('Gaming');
  });

  test('should return stores matching by description', () => {
    const results = searchStores('premium');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(s => s.description.toLowerCase().includes('premium'))).toBe(true);
  });

  test('should return stores matching by category', () => {
    const results = searchStores('peripherals');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(s => s.categories.includes('Peripherals'))).toBe(true);
  });

  test('should return stores matching by location', () => {
    const results = searchStores('austin');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].location).toContain('Austin');
  });

  test('should be case-insensitive', () => {
    const lowerResults = searchStores('tech');
    const upperResults = searchStores('TECH');
    const mixedResults = searchStores('TeCh');

    expect(lowerResults).toEqual(upperResults);
    expect(lowerResults).toEqual(mixedResults);
  });

  test('should return all stores when no matches found', () => {
    const results = searchStores('nonexistent store xyz123');
    expect(results.length).toBe(mockStores.length);
    expect(results).toEqual(mockStores);
  });

  test('should trim whitespace from query', () => {
    const results = searchStores('  gaming  ');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toContain('Gaming');
  });

  test('should handle whitespace-only query', () => {
    const results = searchStores('   ');
    expect(results.length).toBe(mockStores.length);
  });

  test('should match multiple stores with common category', () => {
    const results = searchStores('accessories');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(store => {
      expect(store.categories.some(cat => cat.toLowerCase().includes('accessories'))).toBe(true);
    });
  });
});
