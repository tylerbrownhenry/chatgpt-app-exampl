#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
  type Resource,
  type ResourceTemplate,
  type Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { searchProducts } from './logic/product-search.js';
import { searchStores } from './logic/store-search.js';
import { getProductDetail } from './logic/product-detail.js';
import { getStoreDetails } from './logic/store-detail.js';
import type { Product, Store } from './types/index.js';

/**
 * Widget definitions following OpenAI Apps SDK pattern
 */
type ProductWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  responseText: string;
};

const widgets: ProductWidget[] = [
  {
    id: 'product-search',
    title: 'Product Search Results',
    templateUri: 'ui://widget/product-search.html',
    invoking: 'Searching products...',
    invoked: 'Products loaded',
    responseText: 'Product search complete',
  },
  {
    id: 'store-search',
    title: 'Store Search Results',
    templateUri: 'ui://widget/store-search.html',
    invoking: 'Searching stores...',
    invoked: 'Stores loaded',
    responseText: 'Store search complete',
  },
  {
    id: 'product-detail',
    title: 'Product Details',
    templateUri: 'ui://widget/product-detail.html',
    invoking: 'Loading product details...',
    invoked: 'Product details loaded',
    responseText: 'Product details ready',
  },
  {
    id: 'store-detail',
    title: 'Store Details',
    templateUri: 'ui://widget/store-detail.html',
    invoking: 'Loading store details...',
    invoked: 'Store details loaded',
    responseText: 'Store details ready',
  },
];

const widgetsById = new Map<string, ProductWidget>(
  widgets.map(w => [w.id, w])
);
const widgetsByUri = new Map<string, ProductWidget>(
  widgets.map(w => [w.templateUri, w])
);

/**
 * Widget metadata helpers
 */
function widgetDescriptorMeta(widget: ProductWidget) {
  return {
    'openai/outputTemplate': widget.templateUri,
    'openai/toolInvocation/invoking': widget.invoking,
    'openai/toolInvocation/invoked': widget.invoked,
    'openai/widgetAccessible': true,
    'openai/resultCanProduceWidget': true,
  } as const;
}

function widgetInvocationMeta(widget: ProductWidget) {
  return {
    'openai/toolInvocation/invoking': widget.invoking,
    'openai/toolInvocation/invoked': widget.invoked,
  } as const;
}

/**
 * Generate HTML widget for displaying products
 */
function generateProductWidget(products: Product[]): string {
  const productCards = products
    .map(
      product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <a href="${product.url}" target="_blank" class="product-link">View Product</a>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 16px;
      background: #f9fafb;
    }

    .products-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }

    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      background: #e5e7eb;
    }

    .product-info {
      padding: 16px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .product-name {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 8px;
    }

    .product-description {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 16px;
      flex: 1;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }

    .product-price {
      font-size: 24px;
      font-weight: 700;
      color: #059669;
    }

    .product-link {
      padding: 8px 16px;
      background: #3b82f6;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.2s;
    }

    .product-link:hover {
      background: #2563eb;
    }

    @media (max-width: 640px) {
      .products-container {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="products-container">
    ${productCards}
  </div>
</body>
</html>
  `;
}

/**
 * Generate HTML widget for displaying stores
 */
function generateStoresWidget(stores: Store[]): string {
  const storeCards = stores
    .map(
      store => `
    <div class="store-card">
      <img src="${store.logo}" alt="${store.name}" class="store-logo">
      <div class="store-info">
        <h3 class="store-name">${store.name}</h3>
        <div class="store-rating">
          <span class="stars">${'★'.repeat(Math.floor(store.rating))}${'☆'.repeat(5 - Math.floor(store.rating))}</span>
          <span class="rating-text">${store.rating} (${store.reviews} reviews)</span>
        </div>
        <p class="store-description">${store.description}</p>
        <div class="store-details">
          <p><strong>📍</strong> ${store.location}</p>
          <p><strong>📞</strong> ${store.phone}</p>
          <p><strong>🕒</strong> ${store.hours}</p>
        </div>
        <div class="store-categories">
          ${store.categories.map(cat => `<span class="category-badge">${cat}</span>`).join('')}
        </div>
        <a href="${store.url}" target="_blank" class="store-link">Visit Store</a>
      </div>
    </div>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 16px;
      background: #f9fafb;
    }

    .stores-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .store-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .store-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }

    .store-logo {
      width: 100%;
      height: 120px;
      object-fit: cover;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .store-info {
      padding: 20px;
    }

    .store-name {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 8px;
    }

    .store-rating {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .stars {
      color: #fbbf24;
      font-size: 16px;
    }

    .rating-text {
      font-size: 14px;
      color: #6b7280;
    }

    .store-description {
      font-size: 14px;
      color: #4b5563;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .store-details {
      background: #f3f4f6;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 16px;
    }

    .store-details p {
      font-size: 13px;
      color: #374151;
      margin-bottom: 6px;
    }

    .store-details p:last-child {
      margin-bottom: 0;
    }

    .store-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }

    .category-badge {
      background: #dbeafe;
      color: #1e40af;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .store-link {
      display: block;
      text-align: center;
      padding: 10px;
      background: #10b981;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      transition: background 0.2s;
    }

    .store-link:hover {
      background: #059669;
    }
  </style>
</head>
<body>
  <div class="stores-container">
    ${storeCards}
  </div>
</body>
</html>
  `;
}

/**
 * Generate HTML widget for displaying product details
 */
function generateProductDetailWidget(product: Product, store: Store | undefined): string {
  const specsHtml = Object.entries(product.specs || {})
    .map(
      ([key, value]) => `
      <div class="spec-item">
        <span class="spec-label">${key}:</span>
        <span class="spec-value">${value}</span>
      </div>
    `
    )
    .join('');

  const stockBadge = product.inStock
    ? '<span class="stock-badge in-stock">In Stock</span>'
    : '<span class="stock-badge out-of-stock">Out of Stock</span>';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 24px;
      background: #f9fafb;
    }

    .product-detail {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .product-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      padding: 32px;
    }

    .product-image-large {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 12px;
      background: #e5e7eb;
    }

    .product-main-info h1 {
      font-size: 28px;
      color: #111827;
      margin-bottom: 12px;
    }

    .product-brand {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 16px;
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .stars {
      color: #fbbf24;
      font-size: 18px;
    }

    .rating-text {
      font-size: 14px;
      color: #6b7280;
    }

    .stock-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .in-stock {
      background: #d1fae5;
      color: #065f46;
    }

    .out-of-stock {
      background: #fee2e2;
      color: #991b1b;
    }

    .product-price-large {
      font-size: 36px;
      font-weight: 700;
      color: #059669;
      margin-bottom: 16px;
    }

    .product-description-full {
      font-size: 15px;
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .product-actions {
      display: flex;
      gap: 12px;
    }

    .btn {
      flex: 1;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      text-align: center;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: #f3f4f6;
      color: #374151;
    }

    .btn-secondary:hover {
      background: #e5e7eb;
    }

    .product-specs {
      padding: 32px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }

    .specs-title {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 16px;
    }

    .specs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .spec-item {
      background: white;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    .spec-label {
      font-weight: 600;
      color: #374151;
      margin-right: 8px;
    }

    .spec-value {
      color: #6b7280;
    }

    .store-info {
      padding: 24px 32px;
      background: #eff6ff;
      border-top: 1px solid #dbeafe;
    }

    .store-info h3 {
      font-size: 16px;
      color: #1e40af;
      margin-bottom: 8px;
    }

    .store-info p {
      font-size: 14px;
      color: #1e3a8a;
    }

    @media (max-width: 768px) {
      .product-header {
        grid-template-columns: 1fr;
      }

      .product-image-large {
        height: 300px;
      }
    }
  </style>
</head>
<body>
  <div class="product-detail">
    <div class="product-header">
      <div>
        <img src="${product.image}" alt="${product.name}" class="product-image-large">
      </div>
      <div class="product-main-info">
        <h1>${product.name}</h1>
        <p class="product-brand">by ${product.brand}</p>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
        </div>
        ${stockBadge}
        <div class="product-price-large">$${product.price.toFixed(2)}</div>
        <p class="product-description-full">${product.description}</p>
        <div class="product-actions">
          <a href="${product.url}" target="_blank" class="btn btn-primary">Buy Now</a>
          <a href="${store?.url || '#'}" target="_blank" class="btn btn-secondary">Visit Store</a>
        </div>
      </div>
    </div>
    <div class="product-specs">
      <h2 class="specs-title">Specifications</h2>
      <div class="specs-grid">
        ${specsHtml}
      </div>
    </div>
    ${
      store
        ? `
    <div class="store-info">
      <h3>Sold by ${store.name}</h3>
      <p>${store.description}</p>
      <p style="margin-top: 8px;"><strong>Shipping:</strong> ${store.shippingInfo}</p>
      <p><strong>Returns:</strong> ${store.returnPolicy}</p>
    </div>
    `
        : ''
    }
  </div>
</body>
</html>
  `;
}

/**
 * Generate HTML widget for displaying store details
 */
function generateStoreDetailWidget(store: Store, products: Product[]): string {
  const productCards = products
    .map(
      product => `
    <div class="store-product-card">
      <img src="${product.image}" alt="${product.name}" class="store-product-image">
      <div class="store-product-info">
        <h4>${product.name}</h4>
        <p class="store-product-price">$${product.price.toFixed(2)}</p>
        <div class="store-product-rating">
          <span class="stars-small">${'★'.repeat(Math.floor(product.rating))}</span>
          <span class="rating-small">${product.rating}</span>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 24px;
      background: #f9fafb;
    }

    .store-detail {
      max-width: 1200px;
      margin: 0 auto;
    }

    .store-header {
      background: white;
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .store-header-content {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 24px;
      align-items: start;
    }

    .store-logo-large {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .store-main-info h1 {
      font-size: 32px;
      color: #111827;
      margin-bottom: 12px;
    }

    .store-rating-large {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .stars-large {
      color: #fbbf24;
      font-size: 20px;
    }

    .rating-large {
      font-size: 16px;
      color: #111827;
      font-weight: 600;
    }

    .review-count {
      font-size: 14px;
      color: #6b7280;
    }

    .store-description-full {
      font-size: 16px;
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .store-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .info-card {
      background: #f9fafb;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    .info-card h3 {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .info-card p {
      font-size: 15px;
      color: #111827;
    }

    .store-categories-large {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .category-badge-large {
      background: #dbeafe;
      color: #1e40af;
      padding: 6px 16px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 500;
    }

    .visit-store-btn {
      display: inline-block;
      padding: 12px 32px;
      background: #10b981;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
      margin-top: 16px;
    }

    .visit-store-btn:hover {
      background: #059669;
    }

    .products-section {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .products-section h2 {
      font-size: 24px;
      color: #111827;
      margin-bottom: 24px;
    }

    .store-products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }

    .store-product-card {
      background: #f9fafb;
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.2s;
      border: 1px solid #e5e7eb;
    }

    .store-product-card:hover {
      transform: translateY(-4px);
    }

    .store-product-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
      background: #e5e7eb;
    }

    .store-product-info {
      padding: 12px;
    }

    .store-product-info h4 {
      font-size: 14px;
      color: #111827;
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .store-product-price {
      font-size: 18px;
      font-weight: 700;
      color: #059669;
      margin-bottom: 6px;
    }

    .store-product-rating {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .stars-small {
      color: #fbbf24;
      font-size: 12px;
    }

    .rating-small {
      font-size: 12px;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .store-header-content {
        grid-template-columns: 1fr;
      }

      .store-logo-large {
        margin: 0 auto;
      }
    }
  </style>
</head>
<body>
  <div class="store-detail">
    <div class="store-header">
      <div class="store-header-content">
        <img src="${store.logo}" alt="${store.name}" class="store-logo-large">
        <div class="store-main-info">
          <h1>${store.name}</h1>
          <div class="store-rating-large">
            <span class="stars-large">${'★'.repeat(Math.floor(store.rating))}${'☆'.repeat(5 - Math.floor(store.rating))}</span>
            <span class="rating-large">${store.rating}</span>
            <span class="review-count">(${store.reviews} reviews)</span>
          </div>
          <p class="store-description-full">${store.description}</p>
          <div class="store-categories-large">
            ${store.categories.map(cat => `<span class="category-badge-large">${cat}</span>`).join('')}
          </div>
          <a href="${store.url}" target="_blank" class="visit-store-btn">Visit Store Website</a>
        </div>
      </div>
      <div class="store-info-grid">
        <div class="info-card">
          <h3>📍 Location</h3>
          <p>${store.location}</p>
        </div>
        <div class="info-card">
          <h3>📞 Contact</h3>
          <p>${store.phone}</p>
          <p>${store.email}</p>
        </div>
        <div class="info-card">
          <h3>🕒 Hours</h3>
          <p>${store.hours}</p>
        </div>
        <div class="info-card">
          <h3>📦 Shipping</h3>
          <p>${store.shippingInfo}</p>
        </div>
        <div class="info-card">
          <h3>🔄 Returns</h3>
          <p>${store.returnPolicy}</p>
        </div>
      </div>
    </div>

    <div class="products-section">
      <h2>Products from ${store.name} (${products.length})</h2>
      <div class="store-products-grid">
        ${productCards}
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// Create and configure the MCP server
const server = new Server(
  {
    name: 'product-search-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

/**
 * Tool definitions
 */
const tools: Tool[] = [
  {
    name: 'search_products',
    title: 'Search Products',
    description: 'Search for products and display results with images, prices, and links. Returns paginated results with facets and sorting options.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query for products',
        },
        page: {
          type: 'number',
          description: 'Page number for pagination (default: 1)',
        },
        page_size: {
          type: 'number',
          description: 'Number of results per page (default: 16)',
        },
      },
      required: ['query'],
    },
    _meta: widgetDescriptorMeta(widgetsById.get('product-search')!),
  },
  {
    name: 'search_stores',
    title: 'Search Stores',
    description: 'Search for stores and display their information',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query for stores',
        },
      },
      required: [],
    },
    _meta: widgetDescriptorMeta(widgetsById.get('store-search')!),
  },
  {
    name: 'get_product_detail',
    title: 'Get Product Details',
    description: 'Get detailed information about a specific product',
    inputSchema: {
      type: 'object',
      properties: {
        product_id: {
          type: 'number',
          description: 'The ID of the product',
        },
      },
      required: ['product_id'],
    },
    _meta: widgetDescriptorMeta(widgetsById.get('product-detail')!),
  },
  {
    name: 'get_store_details',
    title: 'Get Store Details',
    description: 'Get detailed information about a specific store',
    inputSchema: {
      type: 'object',
      properties: {
        store_id: {
          type: 'number',
          description: 'The ID of the store',
        },
      },
      required: ['store_id'],
    },
    _meta: widgetDescriptorMeta(widgetsById.get('store-detail')!),
  },
];

/**
 * Resource definitions
 */
const resources: Resource[] = widgets.map(widget => ({
  uri: widget.templateUri,
  name: widget.title,
  description: `${widget.title} widget markup`,
  mimeType: 'text/html',
  _meta: widgetDescriptorMeta(widget),
}));

const resourceTemplates: ResourceTemplate[] = widgets.map(widget => ({
  uriTemplate: widget.templateUri,
  name: widget.title,
  description: `${widget.title} widget markup`,
  mimeType: 'text/html',
  _meta: widgetDescriptorMeta(widget),
}));

// Handle resource listing
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources,
}));

// Handle resource template listing
server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({
  resourceTemplates,
}));

// Handle resource reading
server.setRequestHandler(ReadResourceRequestSchema, async request => {
  const widget = widgetsByUri.get(request.params.uri);
  if (!widget) {
    throw new Error(`Unknown resource: ${request.params.uri}`);
  }

  // Generate HTML based on widget type
  let html: string;
  switch (widget.id) {
    case 'product-search':
      html = generateProductWidget([]);
      break;
    case 'store-search':
      html = generateStoresWidget([]);
      break;
    case 'product-detail':
      html = generateProductDetailWidget(
        {
          id: 0,
          storeId: 0,
          name: '',
          price: 0,
          image: '',
          url: '',
          description: '',
          rating: 0,
          reviews: 0,
          inStock: true,
          category: '',
          brand: '',
          specs: {},
        },
        {
          id: 0,
          name: '',
          logo: '',
          url: '',
          rating: 0,
          reviews: 0,
          description: '',
          location: '',
          phone: '',
          email: '',
          hours: '',
          categories: [],
          shippingInfo: '',
          returnPolicy: '',
        }
      );
      break;
    case 'store-detail':
      html = generateStoreDetailWidget(
        {
          id: 0,
          name: '',
          logo: '',
          url: '',
          rating: 0,
          reviews: 0,
          description: '',
          location: '',
          phone: '',
          email: '',
          hours: '',
          categories: [],
          shippingInfo: '',
          returnPolicy: '',
        },
        []
      );
      break;
    default:
      throw new Error(`Unknown widget: ${widget.id}`);
  }

  return {
    contents: [
      {
        uri: widget.templateUri,
        mimeType: 'text/html',
        text: html,
        _meta: widgetDescriptorMeta(widget),
      },
    ],
  };
});

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async request => {
  const toolName = request.params.name;

  if (toolName === 'search_products') {
    const widget = widgetsById.get('product-search')!;
    const query = (request.params.arguments?.query as string) || '';
    const page = (request.params.arguments?.page as number) || 1;
    const pageSize = (request.params.arguments?.page_size as number) || 16;
    
    const searchResult = searchProducts(query, page, pageSize);

    return {
      content: [
        {
          type: 'text',
          text: widget.responseText,
        },
      ],
      structuredContent: searchResult,
      _meta: widgetInvocationMeta(widget),
    };
  }

  if (toolName === 'search_stores') {
    const widget = widgetsById.get('store-search')!;
    const query = (request.params.arguments?.query as string) || '';
    const stores = searchStores(query);

    return {
      content: [
        {
          type: 'text',
          text: widget.responseText,
        },
      ],
      structuredContent: {
        query,
        stores: stores.map(s => ({
          id: s.id,
          name: s.name,
          logo: s.logo,
          rating: s.rating,
          reviews: s.reviews,
          location: s.location,
          categories: s.categories,
        })),
      },
      _meta: widgetInvocationMeta(widget),
    };
  }

  if (toolName === 'get_product_detail') {
    const widget = widgetsById.get('product-detail')!;
    const productId = request.params.arguments?.product_id as number | undefined;
    
    if (!productId) {
      throw new Error('product_id is required');
    }

    try {
      const { product, store } = getProductDetail(productId);

      // Build comprehensive response matching Total Wine API structure
      const detailedProduct: any = {
        id: String(product.id),
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        rating: product.rating,
        customerReviewsCount: product.reviews,
        inStock: product.inStock,
        brand: product.brand,
        category: product.category,
        specs: product.specs,
      };

      // Add extended fields if available
      if (product.brand_info) {
        detailedProduct.brand = product.brand_info;
      }
      if (product.categories) {
        detailedProduct.categories = product.categories;
      }
      if (product.customerAverageRating !== undefined) {
        detailedProduct.customerAverageRating = product.customerAverageRating;
      }
      if (product.images) {
        detailedProduct.images = product.images;
      }
      if (product.location) {
        detailedProduct.location = product.location;
      }
      if (product.bay) {
        detailedProduct.bay = product.bay;
      }
      if (product.metaDescription) {
        detailedProduct.metaDescription = product.metaDescription;
      }
      if (product.productPageTitle) {
        detailedProduct.productPageTitle = product.productPageTitle;
      }
      if (product.productUrl) {
        detailedProduct.productUrl = product.productUrl;
      }
      if (product.canonicalUrl) {
        detailedProduct.canonicalUrl = product.canonicalUrl;
      }
      if (product.packageDescription) {
        detailedProduct.packageDescription = product.packageDescription;
      }
      if (product.priceInfo) {
        detailedProduct.price = product.priceInfo;
      }
      if (product.review) {
        detailedProduct.review = product.review;
      }
      if (product.shoppingOptions) {
        detailedProduct.shoppingOptions = product.shoppingOptions;
      }
      if (product.skuId) {
        detailedProduct.skuId = product.skuId;
      }
      if (product.stockLevel) {
        detailedProduct.stockLevel = product.stockLevel;
      }
      if (product.stockMessages) {
        detailedProduct.stockMessages = product.stockMessages;
      }
      if (store?.id) {
        detailedProduct.storeId = String(store.id);
      }
      if (product.transactional !== undefined) {
        detailedProduct.transactional = product.transactional;
      }
      if (product.salesStrategy) {
        detailedProduct.salesStrategy = product.salesStrategy;
      }
      if (product.department) {
        detailedProduct.department = product.department;
      }
      if (product.directType) {
        detailedProduct.directType = product.directType;
      }
      if (product.itemCharacteristics) {
        detailedProduct.itemCharacteristics = product.itemCharacteristics;
      }
      if (product.skus) {
        detailedProduct.skus = product.skus;
      }
      if (product.breadCrumbs) {
        detailedProduct.breadCrumbs = product.breadCrumbs;
      }
      if (product.packageValue) {
        detailedProduct.packageValue = product.packageValue;
      }
      if (product.alcoholPercentage !== undefined) {
        detailedProduct.alcoholPercentage = product.alcoholPercentage;
      }

      return {
        content: [
          {
            type: 'text',
            text: widget.responseText,
          },
        ],
        structuredContent: detailedProduct,
        _meta: widgetInvocationMeta(widget),
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: error instanceof Error ? error.message : 'Unknown error occurred',
          },
        ],
        isError: true,
      };
    }
  }

  if (toolName === 'get_store_details') {
    const widget = widgetsById.get('store-detail')!;
    const storeId = request.params.arguments?.store_id as number | undefined;
    
    if (!storeId) {
      throw new Error('store_id is required');
    }

    try {
      const { store, products } = getStoreDetails(storeId);

      return {
        content: [
          {
            type: 'text',
            text: widget.responseText,
          },
        ],
        structuredContent: {
          store: {
            id: store.id,
            name: store.name,
            logo: store.logo,
            rating: store.rating,
            reviews: store.reviews,
            description: store.description,
            location: store.location,
            phone: store.phone,
            email: store.email,
            hours: store.hours,
            categories: store.categories,
            shippingInfo: store.shippingInfo,
            returnPolicy: store.returnPolicy,
          },
          products: products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
            rating: p.rating,
            inStock: p.inStock,
          })),
        },
        _meta: widgetInvocationMeta(widget),
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: error instanceof Error ? error.message : 'Unknown error occurred',
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${toolName}`);
});

// Start the server
async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Product Search MCP server running on stdio');
}

main().catch(error => {
  console.error('Server error:', error);
  process.exit(1);
});
