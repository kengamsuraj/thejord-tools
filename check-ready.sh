#!/bin/bash

# THEJORD.IT - Verifica Prerequisiti per Deployment

echo "========================================"
echo "   THEJORD.IT - Verifica Prerequisiti"
echo "========================================"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

check_ok() {
    echo -e "${GREEN}✓${NC} $1"
}

check_fail() {
    echo -e "${RED}✗${NC} $1"
}

check_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Verifica locale
echo "📋 Verifica Files Locali..."
echo ""

if [ -d "dist" ]; then
    check_ok "Build di produzione presente (dist/)"
else
    check_fail "Build di produzione mancante"
    echo "   Esegui: npm run build"
    exit 1
fi

if [ -f "Dockerfile" ]; then
    check_ok "Dockerfile presente"
else
    check_fail "Dockerfile mancante"
    exit 1
fi

if [ -f "k8s-deployment.yaml" ]; then
    check_ok "Configurazione K8s presente"
else
    check_fail "k8s-deployment.yaml mancante"
    exit 1
fi

echo ""
echo "🔧 Verifica Comandi Locali..."
echo ""

if command -v ssh &> /dev/null; then
    check_ok "SSH disponibile"
else
    check_fail "SSH non trovato"
    exit 1
fi

if command -v scp &> /dev/null; then
    check_ok "SCP disponibile"
else
    check_fail "SCP non trovato"
    exit 1
fi

echo ""
echo "⚙️  Verifica Configurazione..."
echo ""

if [ -f ".env.deploy.local" ]; then
    check_ok "File di configurazione presente"
    source .env.deploy.local

    if [ -z "$K3S_HOST" ] || [ "$K3S_HOST" = "your-k3s-server-ip-or-hostname" ]; then
        check_warn "K3S_HOST non configurato in .env.deploy.local"
        echo "   Modifica .env.deploy.local e imposta K3S_HOST"
    else
        check_ok "K3S_HOST configurato: $K3S_HOST"
    fi

    if [ -z "$K3S_USER" ]; then
        check_warn "K3S_USER non configurato, uso default: root"
        K3S_USER="root"
    else
        check_ok "K3S_USER configurato: $K3S_USER"
    fi
else
    check_warn "File .env.deploy.local non trovato"
    echo "   Crea con: cp .env.deploy .env.deploy.local"
    echo "   Poi modifica i valori"
    echo ""
    read -p "Vuoi inserire manualmente l'host K3s? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Indirizzo K3s (IP o hostname): " K3S_HOST
        read -p "Username SSH (default: root): " K3S_USER
        K3S_USER=${K3S_USER:-root}
    else
        exit 1
    fi
fi

echo ""
echo "🌐 Test Connettività Server K3s..."
echo ""

if ssh -o ConnectTimeout=5 -o BatchMode=yes ${K3S_USER}@${K3S_HOST} "echo 2>&1" &> /dev/null; then
    check_ok "Connessione SSH al server K3s riuscita"
else
    check_fail "Impossibile connettersi a ${K3S_USER}@${K3S_HOST}"
    echo "   Verifica:"
    echo "   - L'indirizzo è corretto"
    echo "   - Le chiavi SSH sono configurate"
    echo "   - Il firewall permette SSH"
    exit 1
fi

echo ""
echo "🐳 Verifica Docker sul Server..."
echo ""

if ssh ${K3S_USER}@${K3S_HOST} "command -v docker" &> /dev/null; then
    check_ok "Docker disponibile sul server"
else
    check_fail "Docker non trovato sul server K3s"
    echo "   Installa Docker sul server"
    exit 1
fi

echo ""
echo "☸️  Verifica K3s sul Server..."
echo ""

if ssh ${K3S_USER}@${K3S_HOST} "command -v k3s" &> /dev/null; then
    check_ok "K3s disponibile sul server"
else
    check_fail "K3s non trovato sul server"
    echo "   Installa K3s: curl -sfL https://get.k3s.io | sh -"
    exit 1
fi

if ssh ${K3S_USER}@${K3S_HOST} "command -v kubectl" &> /dev/null; then
    check_ok "kubectl disponibile sul server"
else
    check_fail "kubectl non trovato sul server"
    exit 1
fi

echo ""
echo "🔍 Verifica Traefik (Ingress Controller)..."
echo ""

if ssh ${K3S_USER}@${K3S_HOST} "kubectl get pods -n kube-system | grep traefik" &> /dev/null; then
    check_ok "Traefik ingress controller attivo"
else
    check_warn "Traefik non trovato (incluso di default in K3s)"
fi

echo ""
echo "🔐 Verifica cert-manager (Opzionale)..."
echo ""

if ssh ${K3S_USER}@${K3S_HOST} "kubectl get pods -n cert-manager" &> /dev/null 2>&1; then
    check_ok "cert-manager installato (certificati SSL automatici)"
else
    check_warn "cert-manager non installato (certificati SSL non automatici)"
    echo "   Installa con: kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml"
fi

echo ""
echo "========================================"
echo "   Riepilogo"
echo "========================================"
echo ""
echo -e "${GREEN}✓ Tutti i prerequisiti sono soddisfatti!${NC}"
echo ""
echo "Pronto per il deployment!"
echo ""
echo "Prossimi passi:"
echo "  1. Verifica che il DNS punti al server:"
echo "     nslookup thejord.it"
echo ""
echo "  2. Esegui il deployment:"
echo "     ./remote-deploy.sh"
echo ""
echo "  3. Il sito sarà disponibile su:"
echo "     https://thejord.it"
echo ""
