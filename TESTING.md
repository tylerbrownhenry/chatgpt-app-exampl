# Testing Guide

This project uses Jest for testing. The test suite covers all business logic functions.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are organized in the `__tests__/` directory, mirroring the source structure:

```
__tests__/
├── product-search.test.js      # Tests for product search logic
├── store-search.test.js         # Tests for store search logic
├── product-detail.test.js       # Tests for product detail retrieval
└── store-detail.test.js         # Tests for store detail retrieval
```

## Test Coverage

The test suite includes:

### Product Search Tests (product-search.test.js)
- ✅ Searching by product name
- ✅ Searching by description
- ✅ Searching by category
- ✅ Searching by brand
- ✅ Case-insensitive search
- ✅ Empty query handling
- ✅ No matches handling
- ✅ Null/undefined query handling
- ✅ Whitespace handling

### Store Search Tests (store-search.test.js)
- ✅ Returning all stores when no query
- ✅ Searching by store name
- ✅ Searching by description
- ✅ Searching by category
- ✅ Searching by location
- ✅ Case-insensitive search
- ✅ No matches handling
- ✅ Null/undefined query handling

### Product Detail Tests (product-detail.test.js)
- ✅ Retrieving product by ID
- ✅ String ID handling
- ✅ Correct store association
- ✅ Invalid ID error handling
- ✅ Null/undefined ID error handling
- ✅ Non-numeric ID error handling
- ✅ Negative ID error handling
- ✅ All product properties present
- ✅ All store properties present

### Store Detail Tests (store-detail.test.js)
- ✅ Retrieving store by ID
- ✅ String ID handling
- ✅ Correct product filtering
- ✅ Product count validation
- ✅ Invalid ID error handling
- ✅ Null/undefined ID error handling
- ✅ Non-numeric ID error handling
- ✅ All store properties present
- ✅ All product properties present

## Coverage Goals

The project maintains high test coverage:

- **Branches**: 70%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

## Writing New Tests

When adding new features, follow these guidelines:

1. **Create a new test file** in `__tests__/` matching your module name
2. **Use descriptive test names** that explain what is being tested
3. **Test edge cases** including null, undefined, empty strings, etc.
4. **Test error conditions** to ensure proper error messages
5. **Test happy paths** to ensure correct functionality

### Example Test Structure

```javascript
import { describe, test, expect } from '@jest/globals';
import { myFunction } from '../src/server/logic/my-module.js';

describe('myFunction', () => {
  test('should do something correctly', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });

  test('should handle errors', () => {
    expect(() => myFunction(null)).toThrow('Error message');
  });
});
```

## ES Modules

This project uses ES modules. Jest is configured to handle them via:

- `node --experimental-vm-modules` flag in test scripts
- Proper Jest configuration in `jest.config.js`

## Debugging Tests

To debug a specific test:

```bash
# Run a single test file
node --experimental-vm-modules node_modules/jest/bin/jest.js __tests__/product-search.test.js

# Run tests matching a pattern
node --experimental-vm-modules node_modules/jest/bin/jest.js --testNamePattern="should return products"
```

## CI/CD Integration

To integrate with CI/CD pipelines, use:

```bash
npm test -- --ci --coverage --maxWorkers=2
```

This ensures:
- Tests run in CI mode
- Coverage is collected
- Optimal resource usage
