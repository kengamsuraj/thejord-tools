# Deployment Notes

## 2025-01-12 - Initial Production Release

### Features Deployed
- ✅ 9 Developer Tools (JSON, Base64, RegEx, Hash, URL, Markdown, Color, Lorem, Diff)
- ✅ About Page with mission, tech stack, roadmap
- ✅ Contact Page with form and FAQ
- ✅ Blog System with first post "Lancio di THEJORD.IT"
- ✅ Updated sitemap.xml (13 total URLs)
- ✅ Full navigation with all pages linked

### Infrastructure
- **Server**: Proxmox (192.168.1.200)
- **K3s Cluster**: LXC 102 (192.168.1.212)
- **Ingress**: Cloudflare Tunnel → NodePort 30700
- **Domain**: https://thejord.it
- **SSL**: Cloudflare managed

### Deployment Process
1. Build production bundle locally: `npm run build`
2. Create tarball with dist + config files
3. Copy to Proxmox: `scp tarball root@192.168.1.200:/tmp/`
4. Extract and build Docker image on Proxmox
5. Import image to K3s via `pct push` and `ctr import`
6. Restart deployment: `kubectl rollout restart deployment/thejord -n thejord`

### Issues Fixed

#### .dockerignore Fix
**Problem**: `.dockerignore` was excluding `dist/` folder, causing Docker build to fail.

**Solution**: Commented out `dist` line in `.dockerignore`
```
# dist folder is needed for Docker build
# dist
```

#### Monaco Editor Loading Display
**Issue**: Monaco Editor shows "Loading..." overlay even after loading completes.

**Status**: Known cosmetic issue. Editor is fully functional despite loading overlay.

**Workaround**: None required - functionality not affected.

**Future Fix**: Will be addressed in Next.js migration (SSR/SSG).

### Security Headers
Current configuration (nginx.conf):
- ✅ CSP with `unsafe-inline` and `unsafe-eval` (required for React/Vite)
- ✅ HSTS (1 year)
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-Content-Type-Options: nosniff
- ✅ Cross-Origin-Embedder-Policy: require-corp
- ✅ Cross-Origin-Opener-Policy: same-origin
- ✅ Cross-Origin-Resource-Policy: same-origin

**Security Score**: 9/10

### Performance
- **Bundle Size**: 448.96 KB JS (131.01 KB gzipped)
- **CSS**: 29.15 KB (5.49 KB gzipped)
- **Total Pages**: 13 URLs in sitemap
- **Gzip**: Enabled for all text assets

### SEO Status
- **Current Score**: 6.5/10 (SPA limitation)
- **Meta Tags**: Complete (title, description, keywords, OG, Twitter)
- **Sitemap**: Updated with all pages
- **robots.txt**: Configured
- **Schema.org**: JSON-LD structured data

**Target**: 9/10 (after Next.js SSR/SSG migration)

### Known Limitations
1. **SPA Rendering**: Client-side only, limits SEO
2. **Monaco Editor Loading**: Cosmetic loading overlay remains visible
3. **No Backend**: All tools are client-side only (as designed)

### Next Steps
See [ROADMAP-COMPLETE.md](./ROADMAP-COMPLETE.md) for detailed plan:
- Phase 2: Testing & CI/CD (Weeks 1-2)
- Phase 3: Next.js Migration (Weeks 3-4)
- Phase 4: Backend & Features (Weeks 5-6)
- Phase 5: Advanced Tools (Weeks 7-8)

### Deployment Commands Quick Reference

```bash
# Build locally
npm run build

# Create deployment tarball
tar -czf deploy.tar.gz dist/ nginx.conf .dockerignore Dockerfile

# Copy to Proxmox
scp deploy.tar.gz root@192.168.1.200:/tmp/

# SSH to Proxmox and build
ssh root@192.168.1.200
cd /root/thejord-project
tar -xzf /tmp/deploy.tar.gz
docker build -t thejord:latest .
docker save thejord:latest | gzip > /tmp/thejord.tar.gz

# Import to K3s (via pct from Proxmox)
pct push 102 /tmp/thejord.tar.gz /tmp/thejord.tar.gz
pct exec 102 -- bash -c 'cd /tmp && gunzip thejord.tar.gz && ctr --namespace k8s.io images import thejord.tar'

# Restart deployment
pct exec 102 -- bash -c '/usr/local/bin/kubectl rollout restart deployment/thejord -n thejord'

# Verify
pct exec 102 -- bash -c '/usr/local/bin/kubectl get pods -n thejord'
```

### Monitoring

```bash
# Check pod status
kubectl get pods -n thejord

# Check logs
kubectl logs -n thejord deployment/thejord --tail=50

# Check service
kubectl get svc -n thejord

# Test endpoint
curl -I https://thejord.it
```

### Rollback Procedure

If deployment fails:

```bash
# List previous deployments
kubectl rollout history deployment/thejord -n thejord

# Rollback to previous version
kubectl rollout undo deployment/thejord -n thejord

# Or rollback to specific revision
kubectl rollout undo deployment/thejord -n thejord --to-revision=N
```

---

## Production URLs

- Homepage: https://thejord.it
- About: https://thejord.it/about
- Contact: https://thejord.it/contact
- Blog: https://thejord.it/blog
- Blog Post: https://thejord.it/blog/lancio-thejord-it
- Tools: /json-formatter, /base64, /regex-tester, /hash-generator, /url-tool, /markdown, /color, /lorem, /diff

---

**Status**: ✅ All systems operational
**Last Updated**: 2025-01-12
**Next Review**: Before Next.js migration
