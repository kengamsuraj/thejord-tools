# 🧪 Testing Documentation

## Overview

THEJORD.IT utilizes a comprehensive testing strategy combining **unit tests** (Vitest) and **end-to-end tests** (Playwright) to ensure reliability and quality.

## Test Statistics

- ✅ **82 Total Tests** (61 unit + 21 E2E)
- ✅ **100% Pass Rate**
- ✅ **12+ File Formats** tested in Base64 Tool
- ✅ **CI/CD Integration** via GitHub Actions

---

## Unit Testing (Vitest)

### Setup

```bash
npm install
```

### Running Unit Tests

```bash
# Run all tests once
npm run test:run

# Run tests in watch mode (auto-reload on file changes)
npm test

# Run tests with coverage report
npm run test:coverage
```

### Test Files

- `src/test/Base64Tool.test.tsx` - 61 tests covering:
  - Text encoding/decoding
  - File upload and detection
  - Error handling
  - UI interactions
  - All declared file formats

- `src/test/SmokeTests.test.tsx` - Basic smoke tests for all tools

### Coverage

Current unit test coverage focuses on the **Base64 Tool** with comprehensive testing of:
- ✅ Encode/decode functionality
- ✅ File type detection (50+ formats)
- ✅ Error states
- ✅ User interactions
- ✅ Edge cases

---

## End-to-End Testing (Playwright)

### Setup

Install Playwright browsers:

```bash
npx playwright install
```

### Running E2E Tests

```bash
# Run all E2E tests
npx playwright test

# Run specific test file
npx playwright test e2e/json-formatter.spec.ts
npx playwright test e2e/base64-file-detection.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific test by line number
npx playwright test e2e/json-formatter.spec.ts:15

# View HTML test report
npx playwright show-report
```

### Test Files

#### 1. JSON Formatter E2E (`e2e/json-formatter.spec.ts`) - 5 tests

- ✅ Monaco editor loading
- ✅ JSON formatting
- ✅ JSON minification
- ✅ Invalid JSON error handling
- ✅ Copy to clipboard functionality

#### 2. Base64 File Detection E2E (`e2e/base64-file-detection.spec.ts`) - 16 tests

**Image Formats:**
- ✅ PNG Image
- ✅ JPEG Image
- ✅ GIF Image
- ✅ BMP Image
- ✅ WebP Image

**Document Formats:**
- ✅ PDF Document
- ✅ ZIP Archive

**Audio Formats:**
- ✅ MP3 Audio (ID3 tag)

**Video Formats:**
- ✅ MP4 Video

**Archive Formats:**
- ✅ RAR Archive
- ✅ GZIP Archive
- ✅ 7-Zip Archive

**Text & Binary:**
- ✅ Plain Text detection
- ✅ Unknown binary file detection

**Error Handling:**
- ✅ Invalid Base64 handling
- ✅ Data URL format support

### E2E Test Strategy

Playwright tests simulate real user interactions:
1. Navigate to tool page
2. Input data via Monaco editor or file upload
3. Click action buttons
4. Verify output correctness
5. Check error states

---

## File Format Testing

### Supported Formats in Base64 Tool

The Base64 Tool includes **magic byte detection** for 50+ file formats:

#### Images
JPEG, PNG, GIF (87a/89a), BMP, TIFF, WebP, JPEG 2000

#### Documents
PDF, ZIP/Office, MS Word (old format)

#### Archives
RAR, GZIP, BZIP2, 7-Zip

#### Audio
MP3 (ID3/frame), FLAC, OGG, WAV

#### Video
MP4, WebM, FLV

#### Executables
Windows EXE, Linux ELF

#### Text Formats
XML, JSON, HTML, CSV, Plain Text

### Magic Bytes Implementation

File detection is performed in `src/lib/file-detection.ts` using:
- **Magic byte signatures** for binary formats
- **Content analysis** for text formats
- **Confidence scoring** (high/medium/low)

---

## CI/CD Integration

Tests run automatically on every push via GitHub Actions:

```yaml
- name: Run Unit Tests
  run: npm run test:run

- name: Run E2E Tests
  run: npx playwright test
```

---

## Adding New Tests

### Unit Test Template

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/my-tool');
  });

  test('should do something', async ({ page }) => {
    await page.click('button');
    await expect(page.locator('.result')).toHaveText('Success');
  });
});
```

---

## Troubleshooting

### Common Issues

**Issue**: `Error: Playwright Test did not expect...`
- **Cause**: Vitest trying to run Playwright files
- **Fix**: Ensure `vitest.config.ts` excludes E2E directory:
  ```typescript
  exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**']
  ```

**Issue**: Monaco Editor tests timeout
- **Cause**: `.fill()` doesn't work with Monaco's hidden textarea
- **Fix**: Use `keyboard.insertText()` instead:
  ```typescript
  await page.keyboard.insertText('{"test": true}');
  ```

**Issue**: Base64 file detection fails
- **Cause**: Invalid Base64 encoding or wrong magic bytes
- **Fix**: Generate proper Base64 with Node.js:
  ```bash
  node -e "console.log(Buffer.from([0x89, 0x50, 0x4E, 0x47]).toString('base64'))"
  ```

---

## Test Performance

- **Unit Tests**: ~10 seconds
- **E2E Tests**: ~20 seconds
- **Total**: ~30 seconds

---

## Future Improvements

- [ ] Increase unit test coverage to 80%+
- [ ] Add E2E tests for remaining tools (7 tools)
- [ ] Performance testing with Lighthouse
- [ ] Visual regression testing
- [ ] Accessibility testing (a11y)
- [ ] Cross-browser testing (Firefox, Safari, Edge)

---

## References

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
