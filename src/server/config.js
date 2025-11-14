/**
 * Configuration for the product search server
 * Add your API keys and settings here
 */

export const config = {
  // Server settings
  serverName: 'product-search-server',
  serverVersion: '1.0.0',

  // API configuration (add your API details here)
  api: {
    // Example: Amazon Product API
    // amazonAccessKey: process.env.AMAZON_ACCESS_KEY,
    // amazonSecretKey: process.env.AMAZON_SECRET_KEY,
    // amazonAssociateTag: process.env.AMAZON_ASSOCIATE_TAG,

    // Example: eBay API
    // ebayAppId: process.env.EBAY_APP_ID,
    // ebayCertId: process.env.EBAY_CERT_ID,

    // Example: Custom Product API
    // apiKey: process.env.PRODUCT_API_KEY,
    // apiUrl: process.env.PRODUCT_API_URL || 'https://api.example.com',
  },

  // Search settings
  search: {
    maxResults: 12,  // Maximum number of products to return
    defaultQuery: '', // Default query if none provided
  },

  // Display settings
  display: {
    currency: '$',
    imageWidth: 400,
    imageHeight: 200,
  }
};
