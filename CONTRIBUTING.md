# Contributing to The Jord

First off, thank you for considering contributing to The Jord! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Security](#security)
- [Style Guide](#style-guide)

---

## 📜 Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code:

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive criticism
- Prioritize community well-being

---

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** - Descriptive and specific
- **Steps to reproduce** - Detailed steps
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Screenshots** - If applicable
- **Environment** - Browser, OS, version

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Include:

- **Clear title** - Use a descriptive title
- **Description** - Detailed explanation
- **Use case** - Why is this needed?
- **Examples** - Show similar features elsewhere

### Adding New Tools

Want to add a new developer tool? Great! Please:

1. Open an issue first to discuss
2. Follow existing tool structure
3. Include tests
4. Update documentation

---

## 💻 Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Setup

```bash
# 1. Fork and clone
git clone https://github.com/YOUR-USERNAME/thejord-tools.git
cd thejord-tools

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env.local

# 4. Start development server
npm run dev

# 5. Open http://localhost:5173
```

### Project Structure

```
the-jord-project/
├── src/
│   ├── components/     # Reusable React components
│   ├── lib/            # Utility functions
│   ├── pages/          # Tool pages
│   ├── App.tsx         # Main app router
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── docs/               # Documentation
└── tests/              # Test files (to be added)
```

---

## 🔄 Pull Request Process

### Before Submitting

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where needed

3. **Test your changes**
   ```bash
   npm run lint
   npm run build
   # npm test (when available)
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   Use conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation
   - `style:` Formatting
   - `refactor:` Code restructuring
   - `test:` Adding tests
   - `chore:` Maintenance

### Submitting PR

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request on GitHub**
   - Clear title describing the change
   - Description explaining what and why
   - Reference related issues (#123)
   - Include screenshots if UI changes

3. **Code Review**
   - Respond to feedback
   - Make requested changes
   - Keep discussion respectful

4. **Merge**
   - Maintainer will merge when approved
   - Branch will be deleted

---

## 🔒 Security

### Important Security Rules

**NEVER commit:**
- ❌ API keys or secrets
- ❌ Passwords or credentials
- ❌ Private SSH keys
- ❌ .env files (except .env.example)
- ❌ IP addresses or server details

**Always:**
- ✅ Use environment variables
- ✅ Update .env.example with new vars
- ✅ Run `npm audit` before PR
- ✅ Sanitize user inputs
- ✅ Escape HTML output

### Reporting Security Issues

Found a security vulnerability? **DO NOT open a public issue!**

Email: admin@thejord.it or use [GitHub Security Advisories](https://github.com/USERNAME/thejord-tools/security/advisories/new)

---

## 🎨 Style Guide

### TypeScript

```typescript
// ✅ Good
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Bad
function calc(x: any): any {
  return x.reduce((a: any, b: any) => a + b.price, 0);
}
```

### React Components

```typescript
// ✅ Good - Functional component with TypeScript
interface Props {
  title: string;
  count: number;
}

export default function ToolCard({ title, count }: Props) {
  return (
    <div className="tool-card">
      <h3>{title}</h3>
      <span>{count}</span>
    </div>
  );
}

// ❌ Bad - No types
export default function ToolCard(props) {
  return <div>{props.title}</div>;
}
```

### Code Organization

```typescript
// ✅ Good - Clear structure
// 1. Imports
import { useState } from 'react';
import { formatJson } from '@/lib/json-utils';

// 2. Types
interface JsonData {
  content: string;
  isValid: boolean;
}

// 3. Component
export default function JsonFormatter() {
  // 4. State
  const [data, setData] = useState<JsonData>({...});

  // 5. Handlers
  const handleFormat = () => {...};

  // 6. Render
  return <div>...</div>;
}
```

### Naming Conventions

- **Components:** PascalCase (`JsonFormatter`)
- **Files:** PascalCase for components (`JsonFormatter.tsx`)
- **Functions:** camelCase (`formatJson`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes:** kebab-case (`tool-card`)

### Comments

```typescript
// ✅ Good - Explains WHY
// Use Set for O(1) lookup instead of array.includes()
const uniqueItems = new Set(items);

// ❌ Bad - Explains WHAT (obvious)
// Create a new Set
const uniqueItems = new Set(items);
```

### Testing (when implemented)

```typescript
describe('formatJson', () => {
  it('should format valid JSON', () => {
    const input = '{"name":"test"}';
    const expected = '{\n  "name": "test"\n}';
    expect(formatJson(input)).toBe(expected);
  });

  it('should handle invalid JSON', () => {
    const input = '{invalid}';
    expect(() => formatJson(input)).toThrow();
  });
});
```

---

## 🧪 Testing Guidelines

### Unit Tests
- Test individual functions
- Mock external dependencies
- Cover edge cases

### Integration Tests
- Test component interactions
- Simulate user actions
- Verify tool functionality

### E2E Tests (future)
- Test complete user flows
- Verify production-like scenarios

---

## 📝 Documentation

### Code Documentation

```typescript
/**
 * Formats JSON string with proper indentation
 * @param json - Raw JSON string to format
 * @param indent - Number of spaces for indentation (default: 2)
 * @returns Formatted JSON string
 * @throws {SyntaxError} If JSON is invalid
 */
export function formatJson(json: string, indent: number = 2): string {
  return JSON.stringify(JSON.parse(json), null, indent);
}
```

### Update Documentation

When adding features, update:
- [ ] README.md (if user-facing)
- [ ] Code comments
- [ ] .env.example (if new env vars)
- [ ] CHANGELOG.md (future)

---

## ❓ Questions?

- Open a [Discussion](https://github.com/USERNAME/thejord-tools/discussions)
- Check existing [Issues](https://github.com/USERNAME/thejord-tools/issues)
- Read [Documentation](./docs/)

---

## 🎖️ Recognition

Contributors will be:
- Listed in README.md
- Credited in release notes
- Appreciated with GitHub reactions! ❤️

---

**Thank you for contributing! 🚀**
