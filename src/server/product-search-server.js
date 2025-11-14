#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Mock product database - replace with real API calls
const mockProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    url: "https://example.com/products/headphones",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    url: "https://example.com/products/smartwatch",
    description: "Feature-rich smartwatch with health tracking"
  },
  {
    id: 3,
    name: "Laptop Stand Aluminum",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    url: "https://example.com/products/laptop-stand",
    description: "Ergonomic aluminum laptop stand"
  },
  {
    id: 4,
    name: "Mechanical Keyboard RGB",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    url: "https://example.com/products/keyboard",
    description: "RGB mechanical gaming keyboard"
  },
  {
    id: 5,
    name: "4K Webcam",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1593376893114-1aed528d80cf?w=400",
    url: "https://example.com/products/webcam",
    description: "Professional 4K webcam for streaming"
  },
  {
    id: 6,
    name: "USB-C Hub Adapter",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400",
    url: "https://example.com/products/usb-hub",
    description: "Multi-port USB-C hub with HDMI"
  },
  {
    id: 7,
    name: "Wireless Mouse",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
    url: "https://example.com/products/mouse",
    description: "Ergonomic wireless mouse"
  },
  {
    id: 8,
    name: "Phone Stand Wireless Charger",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1591290619762-d2c9f9b5b5d3?w=400",
    url: "https://example.com/products/phone-charger",
    description: "2-in-1 phone stand with wireless charging"
  }
];

/**
 * Search products based on query
 * In a real implementation, this would call an external API
 */
function searchProducts(query) {
  const lowerQuery = query.toLowerCase();
  const results = mockProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  );

  return results.length > 0 ? results : mockProducts.slice(0, 6);
}

/**
 * Generate HTML widget for displaying products
 */
function generateProductWidget(products) {
  const productCards = products.map(product => `
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
  `).join('');

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
        description: 'Search for products and display results with images, prices, and links. Returns a visual grid of products matching the search query.',
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
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'search_products') {
    const query = request.params.arguments?.query || '';
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

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Product Search MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
