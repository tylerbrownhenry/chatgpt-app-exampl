# TypeScript Migration Guide

This project has been converted to TypeScript for improved type safety, better IDE support, and enhanced developer experience.

## What Changed

### File Extensions
- `.js` files → `.ts` files
- All source files in `src/` are now TypeScript
- Test files in `__tests__/` are now TypeScript

### Type Definitions
- Added comprehensive type definitions in `src/server/types/index.ts`
- Interfaces for: Product, Store, ProductSpecs, and more
- Strict type checking enabled

### Configuration Files Added
- `tsconfig.json` - TypeScript compiler configuration
- `tsconfig.test.json` - TypeScript configuration for tests
- Updated `jest.config.js` to support TypeScript with ts-jest

### Build Process
- TypeScript compiles to `dist/` directory
- Source maps enabled for debugging
- Declaration files (.d.ts) generated

## Development Workflow

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
# Run server with hot reload (using tsx)
npm run server:dev

# Watch mode for TypeScript compilation
npm run build:watch
```

### Production Build
```bash
# Compile TypeScript to JavaScript
npm run build

# Run compiled server
npm run server:node
```

### Type Checking
```bash
# Check types without emitting files
npm run typecheck
```

### Testing
```bash
# Run tests (Jest with ts-jest)
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Type Definitions

### Product
```typescript
interface Product {
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
```

### Store
```typescript
interface Store {
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
```

### Function Signatures

**searchProducts**
```typescript
function searchProducts(query: string | null | undefined): Product[]
```

**searchStores**
```typescript
function searchStores(query: string | null | undefined): Store[]
```

**getProductDetail**
```typescript
function getProductDetail(productId: number | string | null | undefined): ProductDetailResult
```

**getStoreDetails**
```typescript
function getStoreDetails(storeId: number | string | null | undefined): StoreDetailResult
```

## TypeScript Configuration

### Compiler Options
- **Target**: ES2022
- **Module**: ES2022 (ESM)
- **Strict Mode**: Enabled
- **Source Maps**: Enabled
- **Declaration**: Enabled

### Strict Checks Enabled
- `noImplicitAny`: true
- `strictNullChecks`: true
- `strictFunctionTypes`: true
- `strictBindCallApply`: true
- `noUnusedLocals`: true
- `noUnusedParameters`: true
- `noImplicitReturns`: true
- `noFallthroughCasesInSwitch`: true

## Benefits of TypeScript

### Type Safety
- Catch errors at compile time
- Prevent null/undefined errors
- Ensure correct function arguments

### Better IDE Support
- IntelliSense autocomplete
- Inline documentation
- Refactoring tools
- Go to definition

### Code Quality
- Self-documenting code
- Easier maintenance
- Better collaboration
- Reduced bugs

### Examples

#### Before (JavaScript)
```javascript
export function searchProducts(query) {
  // What type is query? Can it be null?
  const results = mockProducts.filter(p =>
    p.name.includes(query) // Runtime error if query is null
  );
  return results;
}
```

#### After (TypeScript)
```typescript
export function searchProducts(query: string | null | undefined): Product[] {
  // TypeScript knows query might be null
  if (!query || typeof query !== 'string') {
    return mockProducts.slice(0, 6);
  }
  // TypeScript knows query is a string here
  const results = mockProducts.filter(p =>
    p.name.includes(query) // Safe!
  );
  return results;
}
```

## Migration Path for New Code

When adding new features:

1. **Create types first** in `src/server/types/index.ts`
2. **Use types in implementation**
3. **Export types** from module
4. **Write typed tests**

Example:
```typescript
// 1. Define type
export interface NewFeature {
  id: number;
  data: string;
}

// 2. Use in function
export function processFeature(feature: NewFeature): string {
  return feature.data;
}

// 3. Export
export type { NewFeature } from './types/index.js';

// 4. Test with types
import type { NewFeature } from '../src/server/types/index.js';
test('should process feature', () => {
  const feature: NewFeature = { id: 1, data: 'test' };
  expect(processFeature(feature)).toBe('test');
});
```

## Troubleshooting

### Common Issues

**Issue**: Module not found
**Solution**: Ensure imports end with `.js` (not `.ts`) for ESM compatibility

**Issue**: Type errors in tests
**Solution**: Import types explicitly: `import type { Product } from '../types/index.js'`

**Issue**: Build fails
**Solution**: Run `npm run typecheck` to see all type errors

**Issue**: Jest can't find modules
**Solution**: Ensure jest.config.js has correct moduleNameMapper

## IDE Setup

### VS Code
Recommended extensions:
- TypeScript and JavaScript Language Features (built-in)
- ESLint
- Prettier

### WebStorm/IntelliJ
TypeScript support is built-in.

## Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/)

## Summary

The TypeScript migration provides:
- ✅ Complete type safety
- ✅ Better developer experience
- ✅ Fewer runtime errors
- ✅ Improved maintainability
- ✅ All tests passing
- ✅ Same functionality as before

No breaking changes for users - the compiled JavaScript works exactly the same!
