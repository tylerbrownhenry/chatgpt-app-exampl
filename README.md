# Product Search App

A ChatGPT app built with the OpenAI Apps SDK and TypeScript that searches for products and displays results with images, prices, and links in a beautiful grid layout.

## Features

- **Product Search**: Search for products using natural language queries
- **Store Search**: Find stores by name, category, or type
- **Product Details**: View detailed product information including specs, ratings, and availability
- **Store Details**: Browse complete store information with all products, hours, and policies
- **Visual Results**: Displays everything in responsive, beautiful layouts
- **Rich Information**: Shows images, prices, ratings, reviews, and direct links
- **Responsive Design**: Works great on desktop and mobile devices

## Prerequisites

- Node.js 18 or higher
- npm or pnpm
- TypeScript 5.3 or higher (included in dev dependencies)
- ChatGPT account with Developer Mode enabled
- ngrok (for local testing with ChatGPT)

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd chatgpt-app-exampl
```

2. Install dependencies:
```bash
npm install
```

3. Build the TypeScript code:
```bash
npm run build
```

## Running the App

### Option 1: Using ChatGPT Desktop App with Developer Mode (Recommended)

This is the easiest way to use the app locally without needing ngrok.

**See [MCP_SETUP.md](MCP_SETUP.md) for complete step-by-step instructions.**

Quick summary:
1. Install dependencies: `npm install`
2. Enable Developer Mode in ChatGPT Settings
3. Add this MCP server to your ChatGPT config
4. Restart ChatGPT and start searching!

### Option 2: Using ngrok for Web Testing

If you want to test with ChatGPT web or share your server publicly:

**Step 1:** Run the product search server:

```bash
npm run server:node
```

**Step 2:** In a new terminal, expose your local server using ngrok:

```bash
ngrok http 4444
```

Note the public URL provided by ngrok (e.g., `https://abc123.ngrok.io`).

**Step 3:** Connect to ChatGPT:

1. Open ChatGPT and go to Settings
2. Navigate to "Connectors" or "Custom Apps"
3. Add a new connector with your ngrok URL
4. Save the configuration

### Testing in ChatGPT

Try these example prompts in ChatGPT:

**Product Search:**
- "Search for headphones"
- "Find me a laptop stand"
- "Show me keyboards"
- "Search for wireless products"

**Store Search:**
- "Search for stores"
- "Find gaming stores"
- "Show me electronics stores"

**Product Details:**
- "Get product detail for product ID 1"
- "Show me details for product 4"

**Store Details:**
- "Get store details for store ID 1"
- "Show me details about store 2"

## Documentation

- **[README.md](README.md)** - This file, complete project overview
- **[TYPESCRIPT.md](TYPESCRIPT.md)** - TypeScript migration guide and benefits
- **[MCP_SETUP.md](MCP_SETUP.md)** - Detailed MCP server setup for ChatGPT Developer Mode
- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[TESTING.md](TESTING.md)** - Testing guide with Jest
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architecture documentation
- **[.env.example](.env.example)** - Environment variable template for API keys

## Project Structure

```
chatgpt-app-exampl/
├── src/
│   └── server/
│       ├── product-search-server.js  # MCP server with product search tool
│       ├── api-integrations.js       # Example API integrations (Amazon, eBay, etc.)
│       └── config.js                 # Configuration settings
├── package.json                      # Project dependencies
├── .gitignore                        # Git ignore rules
├── .env.example                      # Environment variables template
├── README.md                         # This file
├── MCP_SETUP.md                      # MCP setup instructions
└── QUICKSTART.md                     # Quick start guide
```

## How It Works

This app uses the Model Context Protocol (MCP) to integrate with ChatGPT:

1. **MCP Server**: The server exposes multiple tools that ChatGPT can call
2. **Data Search**: Tools search product and store databases (currently mock data)
3. **UI Widgets**: Results are rendered as HTML widgets with embedded CSS
4. **Display**: ChatGPT displays the interactive interfaces inline with the conversation

## Available Tools

The MCP server provides four tools:

### 1. search_products
Search for products and display results with images, prices, and links.

**Parameters:**
- `query` (string, required): Search query for products

**Example:** "Search for headphones"

### 2. search_stores
Search for stores and display their information including location, hours, and contact details.

**Parameters:**
- `query` (string, optional): Search query for stores

**Example:** "Find gaming stores" or "Search for stores"

### 3. get_product_detail
Get detailed information about a specific product including specs, ratings, and availability.

**Parameters:**
- `product_id` (number, required): Product ID (1-8)

**Example:** "Get product detail for product ID 1"

### 4. get_store_details
Get detailed information about a specific store including all products and policies.

**Parameters:**
- `store_id` (number, required): Store ID (1-3)

**Example:** "Get store details for store ID 2"

## Customization

### Using a Real Product API

To connect to a real product API (like Amazon, eBay, or your own), modify the `searchProducts` function in `src/server/product-search-server.js`:

```javascript
async function searchProducts(query) {
  // Replace with your API call
  const response = await fetch(`https://api.example.com/search?q=${query}`);
  const data = await response.json();

  // Transform to match expected format
  return data.products.map(p => ({
    id: p.id,
    name: p.title,
    price: p.price,
    image: p.thumbnail,
    url: p.productUrl,
    description: p.description
  }));
}
```

### Styling

The product cards are styled with inline CSS in the `generateProductWidget` function. You can customize:

- Colors and fonts
- Card layout and spacing
- Hover effects
- Responsive breakpoints

## Development

### Mock Data

The app currently uses mock product data defined in `mockProducts`. This includes:

- Electronics (headphones, keyboards, webcams)
- Accessories (stands, hubs, chargers)
- Sample images from Unsplash

### Adding More Tools

To add additional tools, add them to the `ListToolsRequestSchema` handler and implement their logic in the `CallToolRequestSchema` handler.

## Troubleshooting

**Server not connecting:**
- Ensure you're running Node.js 18+
- Check that all dependencies are installed
- Verify the MCP SDK is properly installed

**ChatGPT can't reach the server:**
- Confirm ngrok is running and the URL is correct
- Check that your connector configuration matches the ngrok URL
- Ensure your firewall allows ngrok connections

**Products not displaying:**
- Check the browser console for errors
- Verify the HTML widget is being generated correctly
- Ensure image URLs are accessible

## Resources

- [OpenAI Apps SDK Documentation](https://developers.openai.com/apps-sdk/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Apps SDK Examples](https://github.com/openai/openai-apps-sdk-examples)

## License

MIT

## Next Steps

- [ ] Integrate with a real product API
- [ ] Add filtering options (price range, category)
- [ ] Implement product comparison
- [ ] Add user reviews/ratings
- [ ] Support multiple languages
