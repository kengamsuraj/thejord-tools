# THEJORD.IT - Developer Tools

Modern, fast, and free tools for developers. A comprehensive suite of online utilities built with React, TypeScript, and Tailwind CSS.

**Live at: [thejord.it](https://thejord.it)**

## Features

- **JSON Formatter** - Format, validate, beautify, minify, and convert JSON
- **Base64 Tool** - Encode and decode Base64 strings
- **RegExp Tester** - Test regular expressions with 30+ curated patterns
- **Hash Generator** - Generate MD5, SHA-1, SHA-256, SHA-512, SHA-3 hashes
- **URL Tool** - Encode and decode URLs and URI components

## Tech Stack

- React 18.2.0
- TypeScript 5.2.2
- Vite 4.5.0
- Tailwind CSS 3.3.5
- Monaco Editor 4.6.0
- crypto-js 4.2.0

## Development

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Docker Deployment

### Build Docker Image

```bash
docker build -t thejord:latest .
```

### Run Docker Container

```bash
docker run -d -p 80:80 --name thejord thejord:latest
```

## K3s Deployment

### Prerequisites

- K3s cluster running on Proxmox
- kubectl configured to access the cluster
- Traefik ingress controller (included with K3s by default)
- cert-manager for SSL certificates (optional)

### Deploy to K3s

1. The domain is already configured as `thejord.it` in `k8s-deployment.yaml`

2. Build and push the Docker image to your registry:
   ```bash
   docker build -t your-registry/thejord:latest .
   docker push your-registry/thejord:latest
   ```

3. Update the image in `k8s-deployment.yaml`:
   ```yaml
   image: your-registry/thejord:latest
   ```

4. Apply the Kubernetes configuration:
   ```bash
   kubectl apply -f k8s-deployment.yaml
   ```

5. Verify deployment:
   ```bash
   kubectl get pods -n thejord
   kubectl get svc -n thejord
   kubectl get ingress -n thejord
   ```

### Local Registry (for K3s)

If you want to use a local registry with K3s:

```bash
# Import image to K3s
docker save thejord:latest | sudo k3s ctr images import -
```

## Features Highlights

### Privacy-First
All processing happens client-side in your browser. No data is sent to any server.

### Fast & Lightweight
Optimized build with code splitting and lazy loading. Minimal bundle size.

### Modern UI
Minimal Dark theme with vibrant accents. Responsive design for all devices.

### SEO Optimized
Proper meta tags, semantic HTML, and performance optimizations for search engine ranking.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
