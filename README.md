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

## Quick Start

Get started in 5 minutes:

```bash
# 1. Clone and install
git clone <your-repo-url>
cd chatgpt-app-exampl
npm install

# 2. Build the project
npm run build

# 3. Test with MCP Inspector (optional)
npx @modelcontextprotocol/inspector node dist/server/product-search-server.js
# Opens at http://127.0.0.1:6274

# 4. Configure in your AI client (see below)
```

## Code Quality & Testing

This project includes comprehensive tooling for code quality:

**Linting and Formatting:**
```bash
npm run lint              # Run ESLint
npm run lint:fix          # Auto-fix linting issues
npm run format            # Format code with Prettier
npm run format:check      # Check formatting
```

**Type Checking:**
```bash
npm run typecheck         # Type check without building
```

**Testing:**
```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

**Combined Quality Check:**
```bash
npm run lint:check && npm run format:check && npm run typecheck && npm test
```

## Running the App

### Option 1: Using with VS Code / GitHub Copilot Chat (Recommended)

This MCP server can be integrated with VS Code and GitHub Copilot Chat.

**Setup:**

1. **Build the project:**
   ```bash
   npm install
   npm run build
   ```

2. **Find your Node.js path:**
   ```bash
   which node  # macOS/Linux
   where node  # Windows
   ```

3. **Configure MCP in VS Code:**
   
   Edit `~/Library/Application Support/Code/User/mcp.json` (macOS) or `%APPDATA%\Code\User\mcp.json` (Windows):
   
   ```json
   {
     "servers": {
       "product-search": {
         "type": "stdio",
         "command": "/full/path/to/node",
         "args": [
           "/full/path/to/chatgpt-app-exampl/dist/server/product-search-server.js"
         ]
       }
     }
   }
   ```
   
   Replace paths with your actual paths from steps above.

4. **Restart VS Code** - The server will be available through Copilot Chat!

### Option 2: Using with ChatGPT Desktop App

**Setup:**

1. **Build the project** (same as above)

2. **Enable Developer Mode:**
   - Open ChatGPT Desktop App
   - Click your profile picture → Settings
   - Navigate to "Developer" tab
   - Toggle "Developer Mode" to ON

3. **Configure MCP Server:**
   
   Edit ChatGPT's MCP config file:
   - **macOS**: `~/Library/Application Support/ChatGPT/config.json`
   - **Windows**: `%APPDATA%\ChatGPT\config.json`
   - **Linux**: `~/.config/ChatGPT/config.json`
   
   Add this configuration:
   ```json
   {
     "mcpServers": {
       "product-search": {
         "command": "node",
         "args": [
           "/full/path/to/chatgpt-app-exampl/dist/server/product-search-server.js"
         ]
       }
     }
   }
   ```

4. **Restart ChatGPT** and start using the tools!

### Option 3: Using with Claude Desktop App

**Setup:**

1. **Build the project** (same as above)

2. **Configure MCP Server:**
   
   Edit Claude's MCP config file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   
   Add this configuration:
   ```json
   {
     "mcpServers": {
       "product-search": {
         "command": "node",
         "args": [
           "/full/path/to/chatgpt-app-exampl/dist/server/product-search-server.js"
         ]
       }
     }
   }
   ```

3. **Restart Claude** and start using the tools!

### Option 4: Using the MCP Inspector

Test and debug your server with the official MCP Inspector:

```bash
# Build first
npm run build

# Start inspector
npx @modelcontextprotocol/inspector node dist/server/product-search-server.js
```

The inspector will open at `http://127.0.0.1:6274` where you can:
- View all available tools
- Test tools interactively
- View requests/responses in real-time
- Debug the server

### Option 5: Development Mode

For development with auto-reload:

```bash
npm run server:dev
```

This uses `tsx` to run TypeScript directly without building.

## Usage Examples

Try these example prompts in your AI chat client:

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

## Architecture

This app follows a clean, modular architecture with clear separation of concerns:

### Layers

1. **Data Layer** (`src/server/data/`) - Centralized data sources (currently mock data)
2. **Logic Layer** (`src/server/logic/`) - Pure business logic functions
3. **Server Layer** (`src/server/product-search-server.js`) - MCP protocol implementation

### Key Principles

- **Separation of Concerns**: Each layer has specific responsibilities
- **Testability**: Pure functions with clear input/output contracts
- **Modularity**: Easy to add, modify, or remove features
- **Reusability**: Logic can be used independently of the MCP server

### Data Flow

```
AI Chat Client (ChatGPT/Claude)
        ↓
MCP Server (product-search-server.js)
        ↓
Logic Layer (searches, filters, transforms)
        ↓
Data Layer (products, stores)
        ↓
Widget Generator (HTML with embedded CSS)
        ↓
Response to AI Client
```

**See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture documentation.**

## Project Structure

```
chatgpt-app-exampl/
├── src/
│   └── server/
│       ├── data/                        # Data layer (mock data)
│       │   ├── products.js
│       │   └── stores.js
│       ├── logic/                       # Business logic
│       │   ├── product-search.js
│       │   ├── store-search.js
│       │   ├── product-detail.js
│       │   └── store-detail.js
│       ├── product-search-server.ts     # Main MCP server
│       └── config.js                    # Configuration
├── __tests__/                           # Jest tests
├── dist/                                # Compiled JavaScript
├── package.json                         # Dependencies
└── README.md                            # This file
```

## How It Works

This app uses the **Model Context Protocol (MCP)** to integrate with AI chat clients:

1. **MCP Server**: Exposes tools that AI clients can discover and call
2. **Tool Invocation**: AI client calls tools based on user queries
3. **Data Processing**: Server searches databases and processes results
4. **Widget Generation**: Results are formatted as interactive HTML widgets with embedded CSS
5. **Display**: AI client renders the widgets inline with the conversation

### What is MCP?

The Model Context Protocol is an open protocol that enables AI assistants to securely connect to data sources and tools. It provides:

- **Standardized communication** between AI systems and external tools
- **Dynamic tool discovery** - clients can discover available tools at runtime
- **Type-safe interfaces** - tools define schemas for their inputs and outputs
- **Multiple transports** - supports stdio, HTTP, and more

### MCP Architecture

```
┌─────────────────┐
│   AI Client     │  (ChatGPT, Claude, etc.)
│  (MCP Client)   │
└────────┬────────┘
         │ MCP Protocol
         │ (JSON-RPC)
┌────────▼────────┐
│   MCP Server    │  (This app)
│                 │
│  ┌───────────┐  │
│  │   Tools   │  │  - search_products
│  └───────────┘  │  - search_stores
│                 │  - get_product_detail
│  ┌───────────┐  │  - get_store_details
│  │  Logic    │  │
│  └───────────┘  │
│                 │
│  ┌───────────┐  │
│  │   Data    │  │
│  └───────────┘  │
└─────────────────┘
```

Learn more: [Model Context Protocol Documentation](https://modelcontextprotocol.io/)

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

The app currently uses mock data in `src/server/data/`:
- `products.js` - Electronics and accessories
- `stores.js` - Store information

To connect to a real API, modify the logic functions in `src/server/logic/`.

### Adding New Tools

1. Add data to `src/server/data/` (if needed)
2. Create logic function in `src/server/logic/`
3. Add tool definition and handler in `product-search-server.ts`
4. Create tests in `__tests__/`

## Troubleshooting

**Server not connecting:**
- Ensure you're running Node.js 18+
- Run `npm install` to install dependencies
- Run `npm run build` to compile TypeScript
- Check your MCP config file has correct absolute paths

**AI client can't find tools:**
- Verify the server path in your MCP config is correct
- Use absolute paths, not relative paths
- Restart your AI client after config changes
- Check the server is actually running (use MCP Inspector to test)

**Tools not working:**
- Open MCP Inspector to test tools directly
- Check server logs for errors
- Verify mock data is loading correctly

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## License

MIT
