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
