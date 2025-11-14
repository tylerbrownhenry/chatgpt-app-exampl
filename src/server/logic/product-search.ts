/**
 * Product Search Logic
 */

import { mockProducts } from '../data/products.js';
import type { Product, ProductSearchResult } from '../types/index.js';

/**
 * Search products based on query and return comprehensive result
 * @param query - Search query
 * @param page - Page number (default: 1)
 * @param pageSize - Results per page (default: 16)
 * @returns Comprehensive search result with pagination, facets, and products
 */
export function searchProducts(
  query: string | null | undefined,
  page: number = 1,
  pageSize: number = 16
): ProductSearchResult {
  const searchText = query && typeof query === 'string' ? query.trim() : '';
  
  // Filter products based on query
  let filteredProducts: Product[] = [];
  
  if (searchText === '') {
    filteredProducts = mockProducts;
  } else {
    const lowerQuery = searchText.toLowerCase();
    filteredProducts = mockProducts.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery)
    );
  }

  // Calculate pagination
  const totalResults = filteredProducts.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Build facets from available products
  const departments = new Set<string>();
  const brands = new Set<string>();
  const categories = new Set<string>();
  
  mockProducts.forEach(p => {
    if (p.department) departments.add(p.department);
    if (p.brand) brands.add(p.brand);
    if (p.category) categories.add(p.category);
  });

  const result: ProductSearchResult = {
    searchText,
    pagination: {
      page,
      pageSize,
      totalPages,
      totalResults
    },
    facets: [
      {
        id: 'department',
        name: 'Department',
        multiSelect: false,
        priority: 9999,
        values: Array.from(departments).map((dept, idx) => ({
          id: dept,
          name: dept,
          count: mockProducts.filter(p => p.department === dept).length,
          selected: false,
          priority: idx + 1
        }))
      },
      {
        id: 'brand',
        name: 'Brand',
        multiSelect: true,
        priority: 9998,
        values: Array.from(brands).map((brand, idx) => ({
          id: brand,
          name: brand,
          count: mockProducts.filter(p => p.brand === brand).length,
          selected: false,
          priority: idx + 1
        }))
      },
      {
        id: 'category',
        name: 'Category',
        multiSelect: true,
        priority: 9997,
        values: Array.from(categories).map((cat, idx) => ({
          id: cat,
          name: cat,
          count: mockProducts.filter(p => p.category === cat).length,
          selected: false,
          priority: idx + 1
        }))
      }
    ],
    sorts: [
      { id: 'relevance', name: 'Relevance', selected: true },
      { id: 'expert-ratings', name: 'Expert Ratings', selected: false },
      { id: 'customer-ratings', name: 'Customer Ratings', selected: false },
      { id: 'price-desc', name: 'Price (highest first)', selected: false },
      { id: 'price-asc', name: 'Price (lowest first)', selected: false },
      { id: 'name-asc', name: 'Name (A-Z)', selected: false },
      { id: 'name-desc', name: 'Name (Z-A)', selected: false }
    ],
    redirectionUrl: '',
    products: paginatedProducts,
    allStoresCount: totalResults,
    autoCorrect: {},
    searchAllStores: true,
    isRelaxed: false
  };

  return result;
}
