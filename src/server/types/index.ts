/**
 * Type Definitions for Product Search App
 */

/**
 * Product specifications
 */
export interface ProductSpecs {
  [key: string]: string;
}

/**
 * Brand information
 */
export interface Brand {
  id: string;
  name: string;
  departmentCode: string;
}

/**
 * Category information
 */
export interface Category {
  id: string;
  name: string;
  type: string;
}

/**
 * Product image
 */
export interface ProductImage {
  imageType: string;
  mobileOptimizedUrl: string;
  thumbnailUrl: string;
  url: string;
  zoomImageUrl: string;
  isPrimaryImage: boolean;
}

/**
 * Price information
 */
export interface PriceInfo {
  price: number;
  type: string;
  toolTip?: string;
}

/**
 * Shopping option
 */
export interface ShoppingOption {
  eligible: boolean;
  location: string;
  message: string[];
  type: string;
  selected: boolean;
}

/**
 * Stock level
 */
export interface StockLevel {
  stock: number;
  message: string[];
}

/**
 * Stock message per shopping method
 */
export interface StockMethodMessage {
  shoppingMethod: string;
  stockMessage: string;
  addToCartMessage: string;
  addToCartStatus: boolean;
  nearbyStores?: boolean;
}

/**
 * Stock messages
 */
export interface StockMessages {
  messages: StockMethodMessage[];
  digitalTransactional: boolean;
  digitalInventoryQuantity: number;
  digitalSpecialOrder: boolean;
  digitalLongTermOOS: boolean;
  digitalShortTermOOS: boolean;
  digitalLimitedStock: boolean;
  digitalInStock: boolean;
  digitalStoreQuantity: number;
  digitalDeliveryEligible: boolean;
  shippingTransactional: boolean;
  shippingInventoryQuantity: number;
  shippingSpecialOrder: boolean;
  shippingLongTermOOS: boolean;
  shippingLimitedStock: boolean;
  shippingInStock: boolean;
  shippingStoreQuantity: number;
}

/**
 * Sales strategy
 */
export interface SalesStrategy {
  name: string;
  type: string;
}

/**
 * Item characteristic
 */
export interface ItemCharacteristic {
  attributeName: string;
  value: string;
  type: string;
  categoryId: string;
}

/**
 * SKU option
 */
export interface SkuOption {
  type: string;
  value: string;
}

/**
 * SKU information
 */
export interface Sku {
  skuId: string;
  options: SkuOption[];
  url: string;
}

/**
 * Breadcrumb
 */
export interface Breadcrumb {
  name: string;
  url?: string;
}

/**
 * Product interface
 */
export interface Product {
  id: number;
  storeId: number;
  name: string;
  price: number;
  image: string;
  url: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  category: string;
  brand: string;
  specs: ProductSpecs;
  // Extended fields matching Total Wine API
  brand_info?: Brand;
  categories?: Category[];
  customerAverageRating?: number;
  customerReviewsCount?: number;
  images?: ProductImage[];
  location?: string;
  bay?: string;
  metaDescription?: string;
  productPageTitle?: string;
  productUrl?: string;
  canonicalUrl?: string;
  packageDescription?: string;
  priceInfo?: PriceInfo[];
  review?: string;
  shoppingOptions?: ShoppingOption[];
  skuId?: string;
  stockLevel?: StockLevel[];
  stockMessages?: StockMessages;
  transactional?: boolean;
  salesStrategy?: SalesStrategy;
  department?: string;
  directType?: string;
  itemCharacteristics?: ItemCharacteristic[];
  skus?: Sku[];
  breadCrumbs?: Breadcrumb[];
  packageValue?: string;
  alcoholPercentage?: number;
}

/**
 * Store interface
 */
export interface Store {
  id: number;
  name: string;
  logo: string;
  url: string;
  description: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  email: string;
  hours: string;
  categories: string[];
  shippingInfo: string;
  returnPolicy: string;
}

/**
 * Product detail result
 */
export interface ProductDetailResult {
  product: Product;
  store: Store | undefined;
}

/**
 * Store detail result
 */
export interface StoreDetailResult {
  store: Store;
  products: Product[];
}

/**
 * Search pagination
 */
export interface SearchPagination {
  page: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
}

/**
 * Facet value
 */
export interface FacetValue {
  id: string;
  name: string;
  count: number;
  selected: boolean;
  priority: number;
}

/**
 * Search facet
 */
export interface SearchFacet {
  id: string;
  name: string;
  multiSelect: boolean;
  priority: number;
  values: FacetValue[];
}

/**
 * Sort option
 */
export interface SortOption {
  id: string;
  name: string;
  selected: boolean;
}

/**
 * Product search result
 */
export interface ProductSearchResult {
  searchText: string;
  pagination: SearchPagination;
  facets: SearchFacet[];
  sorts: SortOption[];
  redirectionUrl: string;
  products: Product[];
  allStoresCount: number;
  autoCorrect: Record<string, any>;
  searchAllStores: boolean;
  isRelaxed: boolean;
}

/**
 * MCP Tool Schema
 */
export interface ToolSchema {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  };
}

/**
 * MCP Tool Response Content
 */
export interface ToolResponseContent {
  type: string;
  text: string;
}

/**
 * MCP Tool Response
 */
export interface ToolResponse {
  content: ToolResponseContent[];
  _meta?: {
    'openai/outputTemplate'?: string;
  };
}
