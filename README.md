# Product Search App

A ChatGPT app built with the OpenAI Apps SDK that searches for products and displays results with images, prices, and links in a beautiful grid layout.

## Features

- **Product Search**: Search for products using natural language queries
- **Visual Results**: Displays products in a responsive grid with images
- **Product Details**: Shows product name, description, price, and direct link
- **Responsive Design**: Works great on desktop and mobile devices

## Prerequisites

- Node.js 18 or higher
- npm or pnpm
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

## Running the App

### Step 1: Start the MCP Server

Run the product search server:

```bash
npm run server:node
```

The server will run on stdio and wait for MCP protocol messages.

### Step 2: Expose with ngrok (for testing with ChatGPT)

In a new terminal, expose your local server using ngrok:

```bash
ngrok http 4444
```

Note the public URL provided by ngrok (e.g., `https://abc123.ngrok.io`).

### Step 3: Connect to ChatGPT

1. Open ChatGPT and go to Settings
2. Navigate to "Connectors" or "Custom Apps"
3. Add a new connector with your ngrok URL
4. Save the configuration

### Step 4: Test in ChatGPT

Try these example prompts in ChatGPT:

- "Search for headphones"
- "Find me a laptop stand"
- "Show me keyboards"
- "Search for wireless products"

## Project Structure

```
chatgpt-app-exampl/
├── src/
│   └── server/
│       └── product-search-server.js  # MCP server with product search tool
├── package.json                       # Project dependencies
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

## How It Works

This app uses the Model Context Protocol (MCP) to integrate with ChatGPT:

1. **MCP Server**: The server exposes a `search_products` tool that ChatGPT can call
2. **Product Search**: When called, it searches a product database (currently mock data)
3. **UI Widget**: Results are rendered as an HTML widget with embedded CSS
4. **Display**: ChatGPT displays the interactive product grid inline with the conversation

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
