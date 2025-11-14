# Linting and Code Quality Guide

This project uses ESLint and Prettier to maintain code quality and consistency.

## Tools

### ESLint
- **Purpose**: Static code analysis for identifying problems
- **TypeScript Support**: Full TypeScript ESLint integration
- **Plugins**: Jest rules, TypeScript-specific rules

### Prettier
- **Purpose**: Code formatting and style consistency
- **Integration**: Works with ESLint via eslint-config-prettier
- **Auto-formatting**: Formats code on save (with IDE setup)

## Quick Start

### Run Linter
```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix

# Check with zero warnings (strict mode)
npm run lint:check
```

### Run Formatter
```bash
# Format all code
npm run format

# Check formatting without changes
npm run format:check
```

### Combined Quality Checks
```bash
# Run all quality checks
npm run lint && npm run format:check && npm run typecheck && npm test
```

## ESLint Configuration

### Enabled Rules

#### TypeScript Rules
- ✅ **@typescript-eslint/no-explicit-any**: Disallow `any` type
- ✅ **@typescript-eslint/no-unused-vars**: Catch unused variables
- ✅ **@typescript-eslint/consistent-type-imports**: Use `import type` for types
- ⚠️ **@typescript-eslint/no-non-null-assertion**: Warn on `!` assertions

#### General Rules
- ✅ **no-console**: Warn on console (except error/warn)
- ✅ **prefer-const**: Use const for variables that don't change
- ✅ **no-var**: Disallow var, use let/const
- ✅ **eqeqeq**: Require === instead of ==
- ✅ **curly**: Require braces for all control statements

#### Jest Rules
- ✅ **jest/expect-expect**: Ensure tests have assertions
- ✅ **jest/no-focused-tests**: Prevent .only in tests
- ✅ **jest/valid-expect**: Validate expect usage

### Rule Overrides

**Test Files** (`__tests__/**/*.ts`, `*.test.ts`):
- Allows `any` type
- Allows console statements

**JavaScript Config Files** (`*.js`, `*.cjs`):
- Allows require() statements

## Prettier Configuration

### Settings
```json
{
  "semi": true,              // Semicolons at end of statements
  "trailingComma": "es5",    // Trailing commas where valid in ES5
  "singleQuote": true,       // Use single quotes
  "printWidth": 100,         // Max line length
  "tabWidth": 2,             // 2 spaces for indentation
  "arrowParens": "avoid"     // Omit parens when possible
}
```

### What Prettier Formats
- Line length
- Quote style
- Semicolons
- Trailing commas
- Indentation
- Bracket spacing

## IDE Integration

### VS Code

1. **Install Extensions:**
   - ESLint (dbaeumer.vscode-eslint)
   - Prettier (esbenp.prettier-vscode)

2. **Settings (`.vscode/settings.json`):**
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript", "javascript"]
}
```

### WebStorm/IntelliJ

1. **ESLint**: Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
   - Check "Automatic ESLint configuration"
   - Check "Run eslint --fix on save"

2. **Prettier**: Settings → Languages & Frameworks → JavaScript → Prettier
   - Check "On save"
   - Check "On code reformat"

## Common Linting Issues

### Issue: "Unexpected any"
```typescript
// ❌ Bad
function process(data: any) { }

// ✅ Good
function process(data: unknown) { }
function process<T>(data: T) { }
```

### Issue: "Missing return type"
```typescript
// ✅ TypeScript infers return type (allowed)
export function getName() {
  return "Product";
}

// ✅ Explicit return type (also fine)
export function getName(): string {
  return "Product";
}
```

### Issue: "Unexpected console statement"
```typescript
// ❌ Bad
console.log('debug info');

// ✅ Good - use console.error for errors
console.error('Error occurred:', error);

// ✅ Good - use console.warn for warnings
console.warn('Deprecated feature');
```

### Issue: "Use type import"
```typescript
// ❌ Bad
import { Product } from './types/index.js';

// ✅ Good
import type { Product } from './types/index.js';
```

### Issue: "Prefer const"
```typescript
// ❌ Bad
let name = 'Product';

// ✅ Good
const name = 'Product';
```

## Ignoring Rules

### Inline Comments

**Disable for one line:**
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = getLegacyData();
```

**Disable for block:**
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
function legacyCode() {
  const x: any = something();
}
/* eslint-enable @typescript-eslint/no-explicit-any */
```

### When to Ignore

✅ **Good Reasons:**
- Legacy code that can't be updated immediately
- External library types that are incorrect
- Specific edge cases with good justification

❌ **Bad Reasons:**
- "It's easier this way"
- Avoiding proper typing
- Silencing all warnings

## Pre-commit Hooks (Optional)

To automatically lint and format before commits, you can use Husky:

### Install Husky
```bash
npm install --save-dev husky lint-staged
npx husky install
```

### Configure
Add to `package.json`:
```json
{
  "lint-staged": {
    "*.ts": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{md,json}": [
      "prettier --write"
    ]
  }
}
```

### Add Hook
```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint:check
      - run: npm run format:check
      - run: npm run typecheck
      - run: npm test
```

## Customizing Rules

### Disable a Rule
In `.eslintrc.cjs`:
```javascript
rules: {
  '@typescript-eslint/no-explicit-any': 'off', // Disable
}
```

### Change Severity
```javascript
rules: {
  'no-console': 'warn',  // warning
  'no-debugger': 'error', // error
}
```

### Add New Plugin
```bash
npm install --save-dev eslint-plugin-import
```

Update `.eslintrc.cjs`:
```javascript
plugins: [
  '@typescript-eslint',
  'jest',
  'import', // New plugin
],
```

## Best Practices

### 1. Fix Lint Errors Before Committing
```bash
npm run lint:fix && npm run format
git add .
git commit -m "Fix linting issues"
```

### 2. Run Quality Checks Locally
Before pushing, run:
```bash
npm run lint:check && npm run typecheck && npm test
```

### 3. Keep Rules Consistent
- Discuss rule changes with team
- Document exceptions
- Update configuration in one place

### 4. Use Auto-fix When Possible
Many issues can be auto-fixed:
```bash
npm run lint:fix
npm run format
```

### 5. Understand Rules
Before disabling a rule, understand why it exists. Rules are there to:
- Catch bugs
- Enforce best practices
- Maintain consistency
- Improve code quality

## Metrics

### Current Code Quality
Run these to check project health:

```bash
# Count linting errors
npm run lint 2>&1 | grep "error" | wc -l

# Count warnings
npm run lint 2>&1 | grep "warning" | wc -l

# Check test coverage
npm run test:coverage
```

### Goals
- 🎯 Zero linting errors
- 🎯 Zero linting warnings
- 🎯 100% formatted files
- 🎯 80%+ test coverage

## Troubleshooting

### "Parsing error: Cannot find module"
**Solution**: Run `npm install` to ensure all dependencies are installed

### "Unable to resolve path to module"
**Solution**: Check import paths end with `.js` for ESM compatibility

### ESLint and Prettier Conflict
**Solution**: Ensure `eslint-config-prettier` is last in extends array

### Slow Linting
**Solution**:
- Use `.eslintignore` to exclude unnecessary files
- Lint only changed files in development
- Use ESLint cache: `eslint --cache`

## Summary

This project maintains high code quality through:

✅ **ESLint** - Static analysis and error detection
✅ **Prettier** - Consistent formatting
✅ **TypeScript** - Type safety
✅ **Jest** - Test validation
✅ **Strict Rules** - Best practices enforced

Run `npm run lint:fix && npm run format` regularly to maintain clean code!
