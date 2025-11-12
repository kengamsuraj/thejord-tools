#!/bin/bash

# THEJORD.IT - Deployment Script for K3s
# Usage: ./deploy.sh [build|deploy|rollback]

set -e

# Configuration
IMAGE_NAME="thejord"
IMAGE_TAG="${IMAGE_TAG:-latest}"
NAMESPACE="thejord"
DEPLOYMENT_NAME="thejord"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

echo_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

echo_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Build Docker image
build_image() {
    echo_info "Building Docker image..."
    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
    echo_info "Docker image built successfully: ${IMAGE_NAME}:${IMAGE_TAG}"
}

# Import image to K3s
import_to_k3s() {
    echo_info "Importing image to K3s..."
    docker save ${IMAGE_NAME}:${IMAGE_TAG} | sudo k3s ctr images import -
    echo_info "Image imported to K3s successfully"
}

# Deploy to K3s
deploy_to_k3s() {
    echo_info "Deploying to K3s cluster..."

    # Create namespace if it doesn't exist
    kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

    # Apply deployment
    kubectl apply -f k8s-deployment.yaml

    echo_info "Waiting for deployment to be ready..."
    kubectl rollout status deployment/${DEPLOYMENT_NAME} -n ${NAMESPACE} --timeout=300s

    echo_info "Deployment completed successfully!"
    echo_info "Checking pods status..."
    kubectl get pods -n ${NAMESPACE}

    echo_info "Service details:"
    kubectl get svc -n ${NAMESPACE}

    echo_info "Ingress details:"
    kubectl get ingress -n ${NAMESPACE}
}

# Rollback deployment
rollback_deployment() {
    echo_warn "Rolling back deployment..."
    kubectl rollout undo deployment/${DEPLOYMENT_NAME} -n ${NAMESPACE}
    kubectl rollout status deployment/${DEPLOYMENT_NAME} -n ${NAMESPACE}
    echo_info "Rollback completed"
}

# Show logs
show_logs() {
    echo_info "Showing recent logs..."
    kubectl logs -n ${NAMESPACE} -l app=${DEPLOYMENT_NAME} --tail=100
}

# Main script
case "${1:-deploy}" in
    build)
        build_image
        ;;
    import)
        import_to_k3s
        ;;
    deploy)
        build_image
        import_to_k3s
        deploy_to_k3s
        ;;
    rollback)
        rollback_deployment
        ;;
    logs)
        show_logs
        ;;
    *)
        echo "Usage: $0 {build|import|deploy|rollback|logs}"
        echo ""
        echo "Commands:"
        echo "  build     - Build Docker image only"
        echo "  import    - Import Docker image to K3s"
        echo "  deploy    - Build, import, and deploy to K3s (default)"
        echo "  rollback  - Rollback to previous deployment"
        echo "  logs      - Show recent logs"
        exit 1
        ;;
esac

echo_info "Done!"
