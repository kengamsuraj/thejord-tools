# Security Policy

## 🔒 Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it privately:

- **Email:** admin@thejord.it (to be configured)
- **GitHub:** Use [GitHub Security Advisories](https://github.com/USERNAME/thejord-tools/security/advisories/new)

Please **DO NOT** open a public issue for security vulnerabilities.

### What to include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We aim to respond to security reports within 48 hours.

---

## 🛡️ Security Measures

### Data Privacy
- **All tool processing is client-side** - No data sent to server
- No tracking cookies
- No analytics that identify users
- Privacy-first approach

### Infrastructure Security
- HTTPS enforced (via Cloudflare)
- Security headers (CSP, HSTS, etc.)
- Regular dependency updates
- Automated security audits (npm audit, Dependabot)

### Code Security
- TypeScript strict mode
- ESLint security rules
- Input sanitization (DOMPurify for HTML)
- No eval() or dangerous functions

---

## 🚫 What NOT to Commit

**NEVER commit to Git:**
- ❌ `.env` or `.env.local` files
- ❌ SSH private keys (*.key, *.pem)
- ❌ Database credentials
- ❌ API keys or tokens
- ❌ Server IP addresses (use placeholders)
- ❌ Passwords or secrets
- ❌ Personal information

**Use `.env.example` for templates instead!**

---

## ✅ Secure Configuration

### Environment Variables
Always use environment variables for sensitive data:

```bash
# ❌ WRONG - Hardcoded
const apiKey = "sk-1234567890"

# ✅ CORRECT - Environment variable
const apiKey = process.env.API_KEY
```

### SSH Keys
When setting up deployment:

1. Generate SSH key pair:
   ```bash
   ssh-keygen -t ed25519 -C "github-actions-deploy"
   ```

2. Add public key to server
3. Add private key to GitHub Secrets (NOT in code!)

### Database Connections
```bash
# ❌ WRONG - In code
const db = new Database({
  host: "192.168.1.214",
  password: "mypassword"
})

# ✅ CORRECT - Environment variable
const db = new Database({
  url: process.env.DATABASE_URL
})
```

---

## 🔍 Security Checklist

Before committing code:

- [ ] No hardcoded credentials
- [ ] No IP addresses (use placeholders like `YOUR_SERVER_IP`)
- [ ] No API keys
- [ ] Sensitive files in `.gitignore`
- [ ] `.env.example` updated (without real values)
- [ ] `npm audit` passes
- [ ] ESLint security warnings fixed

---

## 📦 Dependencies

We use automated tools to keep dependencies secure:

- **Dependabot:** Auto-updates vulnerable dependencies
- **npm audit:** Run before every release
- **Snyk:** Continuous monitoring (optional)

### Manual audit:
```bash
npm audit
npm audit fix
```

---

## 🔐 GitHub Secrets

When setting up GitHub Actions, use **Secrets** for:

- `SSH_PRIVATE_KEY` - Deploy key
- `PROXMOX_HOST` - Server address
- `PROXMOX_USER` - SSH username
- `DATABASE_URL` - Database connection string
- Any other credentials

**Never put secrets in workflow files!**

```yaml
# ❌ WRONG
env:
  HOST: 192.168.1.200

# ✅ CORRECT
env:
  HOST: ${{ secrets.PROXMOX_HOST }}
```

---

## 🚨 Security Incidents

If a security incident occurs:

1. **Immediate response:**
   - Rotate compromised credentials
   - Revoke exposed API keys
   - Update GitHub secrets

2. **Investigation:**
   - Review commit history
   - Check access logs
   - Identify scope of breach

3. **Remediation:**
   - Patch vulnerability
   - Deploy fix
   - Notify affected users (if any)

4. **Post-mortem:**
   - Document what happened
   - Update security procedures
   - Prevent recurrence

---

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)

---

## 📋 Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| main    | ✅ Yes             |
| < 1.0   | ❌ No              |

---

**Last updated:** 2025-11-12
