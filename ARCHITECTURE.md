# Project Architecture

This document describes the component-based architecture of the Product Search App.

## Directory Structure

```
chatgpt-app-exampl/
├── src/
│   └── server/
│       ├── data/                        # Data layer
│       │   ├── products.js              # Product data (mock)
│       │   └── stores.js                # Store data (mock)
│       ├── logic/                       # Business logic layer
│       │   ├── product-search.js        # Product search logic
│       │   ├── store-search.js          # Store search logic
│       │   ├── product-detail.js        # Product detail logic
│       │   └── store-detail.js          # Store detail logic
│       ├── index.js                     # Module exports
│       ├── product-logic.js             # Legacy file (can be removed)
│       ├── config.js                    # Configuration
│       ├── api-integrations.js          # API integration examples
│       └── product-search-server.js     # Main MCP server
├── __tests__/                           # Test files
│   ├── product-search.test.js
│   ├── store-search.test.js
│   ├── product-detail.test.js
│   └── store-detail.test.js
├── package.json
├── jest.config.js                       # Jest configuration
├── README.md
├── TESTING.md                           # Testing guide
├── ARCHITECTURE.md                      # This file
├── MCP_SETUP.md
└── QUICKSTART.md
```

## Architecture Layers

### 1. Data Layer (`src/server/data/`)

**Purpose**: Centralize all data sources

**Files**:
- `products.js` - Mock product database
- `stores.js` - Mock store database

**Responsibilities**:
- Export data structures
- Can be replaced with API calls in production
- Single source of truth for data

**Example**:
```javascript
// products.js
export const mockProducts = [
  { id: 1, name: "Product", ... }
];
```

### 2. Logic Layer (`src/server/logic/`)

**Purpose**: Implement business logic independently of the server

**Files**:
- `product-search.js` - Search products by query
- `store-search.js` - Search stores by query
- `product-detail.js` - Get product details by ID
- `store-detail.js` - Get store details by ID

**Responsibilities**:
- Pure functions
- Easily testable
- No dependencies on MCP server
- Clear input/output contracts

**Example**:
```javascript
// product-search.js
import { mockProducts } from '../data/products.js';

export function searchProducts(query) {
  // Business logic here
  return results;
}
```

### 3. Server Layer (`src/server/`)

**Purpose**: MCP server implementation and tool handlers

**Files**:
- `product-search-server.js` - Main MCP server
- `index.js` - Module exports for testing

**Responsibilities**:
- MCP protocol implementation
- Tool registration and handling
- Widget generation
- Server lifecycle management

## Design Principles

### 1. Separation of Concerns

Each layer has a specific responsibility:
- **Data**: Provide data
- **Logic**: Process data
- **Server**: Handle MCP protocol

### 2. Testability

- Logic functions are pure and easily testable
- No tight coupling to MCP server
- Clear dependencies

### 3. Modularity

- Each feature in its own file
- Easy to add, modify, or remove features
- Clear module boundaries

### 4. Reusability

- Logic functions can be used elsewhere
- Data can be swapped out
- Widget generators are self-contained

## Data Flow

```
ChatGPT Request
      ↓
MCP Server (product-search-server.js)
      ↓
Logic Layer (product-search.js)
      ↓
Data Layer (products.js)
      ↓
Logic Layer (processes data)
      ↓
Widget Generator (generates HTML)
      ↓
MCP Response with Widget
      ↓
ChatGPT Display
```

## Adding New Features

### Adding a New Tool

1. **Create data** (if needed) in `src/server/data/`
2. **Create logic** in `src/server/logic/`
3. **Add tool** to MCP server in `product-search-server.js`
4. **Create tests** in `__tests__/`
5. **Export** from `src/server/index.js`

### Example: Adding Product Comparison

```javascript
// 1. Data (use existing products.js)

// 2. Logic: src/server/logic/product-comparison.js
export function compareProducts(productIds) {
  // Comparison logic
}

// 3. Add tool in product-search-server.js
{
  name: 'compare_products',
  description: 'Compare multiple products',
  inputSchema: { ... }
}

// 4. Create __tests__/product-comparison.test.js

// 5. Export from src/server/index.js
export { compareProducts } from './logic/product-comparison.js';
```

## Testing Strategy

### Unit Tests

- Test each logic function independently
- Mock data layer if needed
- Test edge cases and error conditions

### Integration Tests (Future)

- Test MCP server tool handlers
- Test end-to-end flows
- Test widget generation

## Future Improvements

### Planned Enhancements

1. **Widget Layer**
   - Extract widget generators to `src/server/widgets/`
   - Reusable widget components
   - Template system

2. **Tool Handlers Layer**
   - Extract tool handlers to `src/server/tools/`
   - One file per tool
   - Easier to maintain

3. **API Integration**
   - Replace mock data with real APIs
   - Add caching layer
   - Error handling and retries

4. **Validation Layer**
   - Input validation
   - Schema validation
   - Type checking

### Proposed Structure

```
src/server/
├── data/
├── logic/
├── widgets/
│   ├── product-grid.js
│   ├── product-detail.js
│   ├── store-grid.js
│   └── store-detail.js
├── tools/
│   ├── search-products.js
│   ├── search-stores.js
│   ├── get-product-detail.js
│   └── get-store-details.js
├── utils/
│   ├── validation.js
│   └── formatting.js
└── index.js
```

## Performance Considerations

### Current Implementation

- In-memory data (fast)
- Synchronous operations
- No caching needed

### Future Optimizations

- Add caching for API calls
- Implement pagination
- Use streaming for large datasets
- Add database connection pooling

## Security Considerations

1. **Input Validation**
   - Validate all user inputs
   - Sanitize search queries
   - Validate IDs

2. **Error Handling**
   - Don't leak sensitive information
   - Log errors securely
   - Return user-friendly messages

3. **API Keys**
   - Use environment variables
   - Never commit secrets
   - Rotate keys regularly

## Deployment

### Development

```bash
npm install
npm test
npm run server:node
```

### Production

- Replace mock data with real APIs
- Add environment configuration
- Enable logging
- Add monitoring
- Implement rate limiting

## Conclusion

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Easy testing
- ✅ Scalability
- ✅ Maintainability
- ✅ Flexibility

The modular design allows for easy feature additions and modifications without affecting existing functionality.
