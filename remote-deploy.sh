#!/bin/bash

# THEJORD.IT - Remote Deployment Script
# Questo script automatizza il deployment su K3s via SSH

set -e

# Configurazione
K3S_HOST="${K3S_HOST:-your-k3s-server}"
K3S_USER="${K3S_USER:-root}"
REMOTE_DIR="/tmp/thejord-deploy"
IMAGE_NAME="thejord"
IMAGE_TAG="latest"

echo "========================================"
echo "   THEJORD.IT Remote Deployment"
echo "========================================"
echo ""
echo "Target: ${K3S_USER}@${K3S_HOST}"
echo ""

# Colori
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

echo_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

echo_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verifica che il build esista
if [ ! -d "dist" ]; then
    echo_error "Cartella dist non trovata. Esegui 'npm run build' prima."
    exit 1
fi

# Step 1: Crea directory remota
echo_info "Creazione directory remota..."
ssh ${K3S_USER}@${K3S_HOST} "mkdir -p ${REMOTE_DIR}"

# Step 2: Copia i file necessari
echo_info "Copia files di deployment..."
scp -r \
    Dockerfile \
    nginx.conf \
    k8s-deployment.yaml \
    dist \
    ${K3S_USER}@${K3S_HOST}:${REMOTE_DIR}/

# Step 3: Build Docker image sul server
echo_info "Build Docker image sul server K3s..."
ssh ${K3S_USER}@${K3S_HOST} << 'ENDSSH'
cd /tmp/thejord-deploy

# Build immagine
docker build -t thejord:latest .

# Import in K3s
echo "Import immagine in K3s..."
docker save thejord:latest | sudo k3s ctr images import -

echo "Immagine importata con successo!"
ENDSSH

# Step 4: Deploy su K3s
echo_info "Deploy dell'applicazione su K3s..."
ssh ${K3S_USER}@${K3S_HOST} << 'ENDSSH'
cd /tmp/thejord-deploy

# Crea namespace
kubectl create namespace thejord --dry-run=client -o yaml | kubectl apply -f -

# Applica deployment
kubectl apply -f k8s-deployment.yaml

# Attendi che sia pronto
echo "Attendo che il deployment sia pronto..."
kubectl rollout status deployment/thejord -n thejord --timeout=300s

echo ""
echo "========================================"
echo "   Deployment Completato!"
echo "========================================"
echo ""
echo "Pod status:"
kubectl get pods -n thejord

echo ""
echo "Service:"
kubectl get svc -n thejord

echo ""
echo "Ingress:"
kubectl get ingress -n thejord

echo ""
echo "Il sito sarà disponibile su: https://thejord.it"
echo ""
ENDSSH

# Step 5: Pulizia
echo_info "Pulizia file temporanei..."
ssh ${K3S_USER}@${K3S_HOST} "rm -rf ${REMOTE_DIR}"

echo ""
echo_info "Deployment completato con successo!"
echo_info "Sito disponibile su: https://thejord.it"
echo ""
echo "Comandi utili:"
echo "  - Logs: kubectl logs -n thejord -l app=thejord -f"
echo "  - Status: kubectl get all -n thejord"
echo "  - Rollback: kubectl rollout undo deployment/thejord -n thejord"
echo ""
