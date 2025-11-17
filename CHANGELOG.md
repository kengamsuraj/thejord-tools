# Changelog

All notable changes to THEJORD.IT will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-11-17

### Added

#### 🕐 Cron Expression Builder
- **Visual builder interface** with 5 cron fields (minute, hour, day of month, month, day of week)
- **Direct text input mode** with real-time validation
- **Pattern library** with 12 pre-configured common schedules
- **Human-readable descriptions** for cron expressions
- **Next 5 executions calculator** to preview schedule
- **Special characters guide** and format reference table
- **Copy to clipboard** functionality
- **32 unit tests** covering all cron utilities
- **14 E2E tests** for user interactions

#### 📋 JSON Schema Converter
- **JSON to JSON Schema** conversion (Draft 2020-12 and Draft 07)
- **Automatic type detection** (string, number, integer, boolean, array, object, null)
- **Format detection** for email, URI, UUID, date-time, date, time, IPv4, IPv6
- **Configurable options**: schema title, make fields required, add format hints, version selection
- **Nested objects and arrays support** with full recursion
- **Circular reference detection** and handling
- **Copy and download** generated schema
- **Monaco editor integration** for both input and output
- **25 unit tests** for schema generation logic

#### Documentation & Content
- **Cron Expression Builder blog post** with real-world examples and best practices
- **JSON Schema Converter blog post** with API documentation workflows
- **CHANGELOG.md** to track all changes

### Changed
- **Homepage** now displays 11 tools (added Cron Builder and JSON Schema Converter)
- **About page** updated with Phase 2 marked as completed (82 tests)
- **Privacy policy** clarified Google Analytics usage while maintaining client-side tool processing

### Fixed
- **TypeScript compilation errors** in cron-utils (unused variables removed)
- **Privacy section** on About page now accurately reflects GA4 usage

### Technical
- **118 unit tests passing** (93 existing + 57 new)
- **35 E2E tests** (21 existing + 14 new)
- **CI/CD pipeline** automatically runs tests before deployment
- **100% client-side processing** for all tool data

## [1.1.0] - 2025-11-15

### Added
- **GitHub Actions CI/CD pipeline** with automated testing and deployment
- **Test infrastructure** with Vitest and Playwright
- **61 unit tests** for Base64 Tool (comprehensive file format detection)
- **21 E2E tests** (JSON Formatter + Base64 file detection)
- **Cloudflare Email Routing** for admin@thejord.it
- **Google Analytics 4** integration with cookie consent banner

### Changed
- **Documentation structure** reorganized (root, docs/, .github/)
- **Testing documentation** moved to docs/TESTING.md with comprehensive guides
- **About page** with transparent privacy information

### Fixed
- **Monaco Editor input** in E2E tests (keyboard.insertText method)
- **DNS configuration** for email routing

## [1.0.0] - 2025-11-14

### Added
- **JSON Formatter** with Monaco Editor, validation, minify, and conversions
- **Base64 Encoder/Decoder** with file type detection (12+ formats)
- **RegEx Tester** with 30+ pre-built patterns
- **Hash Generator** (MD5, SHA-1, SHA-256, SHA-512)
- **URL Encoder/Decoder**
- **Markdown to HTML Converter** with live preview
- **Color Picker & Converter** (HEX/RGB/HSL/CMYK)
- **Lorem Ipsum Generator**
- **Text Diff Checker**
- **Blog system** with Markdown-based posts
- **Contact page** with functional form
- **SEO optimization** (meta tags, Open Graph, Schema.org)
- **Security hardening** (CSP, HSTS, Permissions-Policy)
- **Docker deployment** with Kubernetes (K3s) support
- **Cloudflare Tunnel** integration

### Technical
- React 18.2.0 + TypeScript 5.2.2
- Vite 4.5.0 build system
- Tailwind CSS 3.3.5
- Nginx web server
- Full documentation suite

---

## Release Notes

### Version 1.2.0 Highlights

This release adds two powerful new developer tools based on community feedback:

**Cron Expression Builder**: No more guessing cron syntax! Build schedules visually, validate in real-time, and see exactly when your jobs will run.

**JSON Schema Converter**: Instantly generate JSON Schema from your data. Perfect for API documentation, OpenAPI specs, and data validation.

Both tools maintain our commitment to privacy (100% client-side processing) and quality (comprehensive test coverage).

**Stats:**
- 2 new tools
- 2 new blog posts
- 57 new tests
- 2,000+ lines of code
- 100% test pass rate

### Version 1.1.0 Highlights

Established robust testing infrastructure and CI/CD automation:
- Automated deployments on every push
- 82 total tests ensure quality
- Email functionality for user contact
- Transparent analytics with user consent

### Version 1.0.0 Highlights

Initial release with 9 essential developer tools, modern tech stack, and production-ready deployment on K3s with Cloudflare Tunnel.

---

[1.2.0]: https://github.com/thejord-it/thejord-tools/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/thejord-it/thejord-tools/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/thejord-it/thejord-tools/releases/tag/v1.0.0
