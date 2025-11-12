# THEJORD.IT - Guida al Deployment

Guida completa per il deployment di thejord.it su K3s/Proxmox.

## Prerequisiti

- Docker installato localmente
- Accesso SSH al server K3s su Proxmox
- kubectl configurato per accedere al cluster K3s
- Dominio thejord.it configurato e puntato al cluster

## Opzione 1: Deployment Rapido con Script (Linux/Mac)

### 1. Rendi eseguibile lo script

```bash
chmod +x deploy.sh
```

### 2. Esegui il deployment completo

```bash
./deploy.sh deploy
```

Questo script:
- Builderà l'immagine Docker
- La importerà in K3s
- Farà il deploy su Kubernetes

## Opzione 2: Deployment Manuale Passo-Passo

### 1. Build dell'immagine Docker

```bash
# Build dell'applicazione
npm run build

# Build dell'immagine Docker
docker build -t thejord:latest .
```

### 2. Trasferimento immagine a K3s

Ci sono due metodi:

#### Metodo A: Registro Docker Privato (Consigliato)

```bash
# Tag per il tuo registro
docker tag thejord:latest your-registry.com/thejord:latest

# Push al registro
docker push your-registry.com/thejord:latest

# Aggiorna k8s-deployment.yaml con l'immagine del registro
# image: your-registry.com/thejord:latest
```

#### Metodo B: Import Diretto (per test)

```bash
# Salva l'immagine
docker save thejord:latest -o thejord.tar

# Copia sul server K3s
scp thejord.tar user@k3s-server:/tmp/

# Connettiti al server e importa
ssh user@k3s-server
sudo k3s ctr images import /tmp/thejord.tar
```

### 3. Deploy su K3s

```bash
# Crea il namespace
kubectl create namespace thejord

# Applica la configurazione
kubectl apply -f k8s-deployment.yaml

# Verifica lo stato
kubectl get pods -n thejord
kubectl get svc -n thejord
kubectl get ingress -n thejord
```

### 4. Verifica il deployment

```bash
# Controlla i pod
kubectl get pods -n thejord

# Vedi i logs
kubectl logs -n thejord -l app=thejord --tail=100

# Controlla l'ingress
kubectl describe ingress thejord-ingress -n thejord
```

## Opzione 3: Deployment da Windows (PowerShell)

### 1. Esegui lo script PowerShell

```powershell
# Build dell'immagine
.\deploy.ps1 build

# Deploy completo (richiede kubectl configurato)
.\deploy.ps1 deploy
```

## Configurazione DNS

Assicurati che il dominio `thejord.it` punti all'IP del tuo cluster K3s:

```
A record: thejord.it → [IP-PUBBLICO-K3S]
```

## Configurazione SSL/TLS con Let's Encrypt

Il deployment include già la configurazione per cert-manager. Assicurati di avere cert-manager installato:

```bash
# Installa cert-manager (se non già installato)
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Crea ClusterIssuer per Let's Encrypt
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@thejord.it
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: traefik
EOF
```

## Aggiornamenti e Rollback

### Aggiornare l'applicazione

```bash
# Rebuild e redeploy
./deploy.sh deploy

# O manualmente
kubectl rollout restart deployment/thejord -n thejord
```

### Rollback a versione precedente

```bash
# Con lo script
./deploy.sh rollback

# O manualmente
kubectl rollout undo deployment/thejord -n thejord
kubectl rollout status deployment/thejord -n thejord
```

### Vedere lo storico dei deployment

```bash
kubectl rollout history deployment/thejord -n thejord
```

## Monitoring

### Visualizzare i logs in tempo reale

```bash
kubectl logs -n thejord -l app=thejord -f
```

### Controllare lo stato dell'applicazione

```bash
# Status generale
kubectl get all -n thejord

# Dettagli pod
kubectl describe pod -n thejord [POD-NAME]

# Eventi del namespace
kubectl get events -n thejord --sort-by='.lastTimestamp'
```

## Scaling

### Scalare il numero di repliche

```bash
# Scale up a 3 repliche
kubectl scale deployment/thejord --replicas=3 -n thejord

# Verifica
kubectl get pods -n thejord
```

## Troubleshooting

### I pod non partono

```bash
# Controlla i logs
kubectl logs -n thejord -l app=thejord

# Descrizione del pod per eventi
kubectl describe pod -n thejord [POD-NAME]

# Verifica l'immagine
kubectl get pods -n thejord -o jsonpath='{.items[*].spec.containers[*].image}'
```

### L'ingress non funziona

```bash
# Verifica l'ingress
kubectl describe ingress thejord-ingress -n thejord

# Controlla Traefik
kubectl get pods -n kube-system | grep traefik

# Verifica il certificato
kubectl get certificate -n thejord
kubectl describe certificate thejord-tls -n thejord
```

### Problemi di certificato SSL

```bash
# Controlla lo stato del certificato
kubectl describe certificate thejord-tls -n thejord

# Forza il rinnovo
kubectl delete secret thejord-tls -n thejord
kubectl delete certificate thejord-tls -n thejord
kubectl apply -f k8s-deployment.yaml
```

## Pulizia Completa

Per rimuovere completamente l'applicazione:

```bash
kubectl delete -f k8s-deployment.yaml
kubectl delete namespace thejord
```

## Configurazione Proxmox

### Port Forwarding

Assicurati che le porte siano correttamente inoltrate:

- Porta 80 (HTTP) → K3s Load Balancer
- Porta 443 (HTTPS) → K3s Load Balancer

### Firewall

Verifica che il firewall permetta il traffico in ingresso:

```bash
# Su Proxmox/firewall
# Permetti traffico su porte 80 e 443
```

## Performance Tuning

### Risorse raccomandate

Per produzione, considera di aumentare le risorse in `k8s-deployment.yaml`:

```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "200m"
  limits:
    memory: "256Mi"
    cpu: "500m"
```

## Backup e Restore

### Backup della configurazione

```bash
# Backup di tutti i manifest
kubectl get all,ingress,secrets,configmaps -n thejord -o yaml > thejord-backup.yaml
```

### Restore

```bash
kubectl apply -f thejord-backup.yaml
```

## Supporto

Per problemi o domande:
- Controlla i logs: `kubectl logs -n thejord -l app=thejord`
- Verifica lo stato: `kubectl get all -n thejord`
- Controlla gli eventi: `kubectl get events -n thejord`
