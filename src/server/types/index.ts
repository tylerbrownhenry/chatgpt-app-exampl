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
 * Store hours for a specific day
 */
export interface StoreHoursDay {
  closedStatus: boolean;
  closingTime: string;
  dayOfWeek: string;
  openingTime: string;
}

/**
 * Store hours structure
 */
export interface StoreHours {
  hasHours: boolean;
  showHours: boolean;
  days?: StoreHoursDay[];
}

/**
 * Store image
 */
export interface StoreImage {
  altText: string;
  imageType: string;
  format: string;
  url: string;
}

/**
 * Service type
 */
export interface ServiceType {
  code: string;
  orderReadyByHours: number;
}

/**
 * Store interface
 */
export interface Store {
  address1: string;
  address2: string;
  beerTastingHours: StoreHours;
  city: string;
  displayMessage: boolean;
  displaySpecialInstructions: boolean;
  genericHeader: Record<string, any>;
  displayWeeklyAd: boolean;
  distance: number;
  formattedDistance: string;
  latitude: number;
  longitude: number;
  growler: boolean;
  humidor: boolean;
  classroom: boolean;
  marketingStatus: string;
  mapImage: string;
  name: string;
  phone: string;
  phoneFormatted: string;
  title: string;
  twmMetaDescription: string;
  regulatoryStore: boolean;
  customerServicePhone: string;
  customerServicePhoneFormatted: string;
  spiritsHours: StoreHours;
  spiritsTastingHours: StoreHours;
  state: string;
  stateShort: string;
  stateIsoCode: string;
  storeHours: StoreHours;
  nextWeekStoreHours: StoreHours;
  storeImages?: StoreImage[];
  storeHeaderImage: Record<string, any>;
  galleryImages?: StoreImage[];
  socialMedia: Record<string, any>[];
  storeNumber: string;
  wineTastingHours: StoreHours;
  wifiAvailable: boolean;
  zip: string;
  spiritsProhibited: boolean;
  hideTotalDiscovery: boolean;
  deliveryEligible: boolean;
  deliveryTipEligible: boolean;
  timeZone: string;
  visitIdAmountThreshold: number;
  loyaltyProgram: string;
  falconLoyaltyProgram: string;
  cmsFallbackExperience: Record<string, any>;
  fulfillmentDelayShipping: boolean;
  fulfillmentDelayISP: boolean;
  futureDeliveryAllowed: boolean;
  curbsideAvailable: boolean;
  giftable: boolean;
  thirdPartyPickupEligible: boolean;
  serviceTypes: ServiceType[];
  enableEngraving: boolean;
}

/**
 * Product detail result
 */
export interface ProductDetailResult {
  product: Product;
  store: Store | undefined;
}

/**
 * Geolocation information
 */
export interface Geolocation {
  latitude: number;
  longitude: number;
  state: string;
  stateIsoCode: string;
}

/**
 * State count information
 */
export interface StateCount {
  stateIsoCode: string;
  state: string;
  count: number;
  selected?: boolean;
}

/**
 * Store search metadata
 */
export interface StoreSearchMetadata {
  geolocation: Geolocation;
  states: StateCount[];
}

/**
 * Store search pagination
 */
export interface StoreSearchPagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
}

/**
 * Store search result
 */
export interface StoreSearchResult {
  pagination: StoreSearchPagination;
  metadata: StoreSearchMetadata;
  stores: Store[];
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
