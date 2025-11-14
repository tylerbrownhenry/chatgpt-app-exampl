/**
 * Server Module Exports
 * Central export file for all server functions to enable testing
 */

export { mockProducts } from './data/products.js';
export { mockStores } from './data/stores.js';
export { searchProducts } from './logic/product-search.js';
export { searchStores } from './logic/store-search.js';
export { getProductDetail } from './logic/product-detail.js';
export { getStoreDetails } from './logic/store-detail.js';
export type * from './types/index.js';
