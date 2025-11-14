#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { searchProducts } from './logic/product-search.js';
import { searchStores } from './logic/store-search.js';
import { getProductDetail } from './logic/product-detail.js';
import { getStoreDetails } from './logic/store-detail.js';
import type { Product, Store } from './types/index.js';

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
      tools: {},
    },
  }
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_products',
        description:
          'Search for products and display results with images, prices, and links. Returns a visual grid of products matching the search query.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query for products (e.g., "headphones", "laptop", "keyboard")',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'search_stores',
        description:
          'Search for stores and display their information including location, hours, contact details, and categories. Returns a visual grid of stores.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description:
                'Search query for stores (e.g., "gaming", "electronics", "tech") or leave empty to show all stores',
            },
          },
          required: [],
        },
      },
      {
        name: 'get_product_detail',
        description:
          'Get detailed information about a specific product including specifications, ratings, availability, and store information. Returns a detailed product page.',
        inputSchema: {
          type: 'object',
          properties: {
            product_id: {
              type: 'number',
              description: 'The ID of the product to get details for (1-8)',
            },
          },
          required: ['product_id'],
        },
      },
      {
        name: 'get_store_details',
        description:
          'Get detailed information about a specific store including all products, contact information, hours, and policies. Returns a detailed store page.',
        inputSchema: {
          type: 'object',
          properties: {
            store_id: {
              type: 'number',
              description: 'The ID of the store to get details for (1-3)',
            },
          },
          required: ['store_id'],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async request => {
  if (request.params.name === 'search_products') {
    const query = (request.params.arguments?.query as string) || '';
    const products = searchProducts(query);
    const widget = generateProductWidget(products);

    return {
      content: [
        {
          type: 'text',
          text: `Found ${products.length} product(s) matching "${query}":`,
        },
      ],
      _meta: {
        'openai/outputTemplate': widget,
      },
    };
  }

  if (request.params.name === 'search_stores') {
    const query = (request.params.arguments?.query as string) || '';
    const stores = searchStores(query);
    const widget = generateStoresWidget(stores);

    return {
      content: [
        {
          type: 'text',
          text: query
            ? `Found ${stores.length} store(s) matching "${query}":`
            : `Showing ${stores.length} available store(s):`,
        },
      ],
      _meta: {
        'openai/outputTemplate': widget,
      },
    };
  }

  if (request.params.name === 'get_product_detail') {
    const productId = request.params.arguments?.product_id as number | undefined;
    if (!productId) {
      throw new Error('product_id is required');
    }

    try {
      const { product, store } = getProductDetail(productId);
      const widget = generateProductDetailWidget(product, store);

      return {
        content: [
          {
            type: 'text',
            text: `Product Details: ${product.name} - $${product.price.toFixed(2)}`,
          },
        ],
        _meta: {
          'openai/outputTemplate': widget,
        },
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: error instanceof Error ? error.message : 'Unknown error occurred',
          },
        ],
      };
    }
  }

  if (request.params.name === 'get_store_details') {
    const storeId = request.params.arguments?.store_id as number | undefined;
    if (!storeId) {
      throw new Error('store_id is required');
    }

    try {
      const { store, products } = getStoreDetails(storeId);
      const widget = generateStoreDetailWidget(store, products);

      return {
        content: [
          {
            type: 'text',
            text: `Store Details: ${store.name} - ${products.length} products available`,
          },
        ],
        _meta: {
          'openai/outputTemplate': widget,
        },
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: error instanceof Error ? error.message : 'Unknown error occurred',
          },
        ],
      };
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
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
