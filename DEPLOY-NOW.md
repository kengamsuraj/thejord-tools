# 🚀 DEPLOY THEJORD.IT - Guida Rapida

## ✅ Preparazione Completata

Tutti i file sono pronti per il deployment:
- ✅ Build di produzione completato (dist/)
- ✅ Dockerfile ottimizzato
- ✅ Configurazione K3s (k8s-deployment.yaml)
- ✅ Nginx configuration
- ✅ Scripts di deployment

## 🎯 Deployment in 3 Passi

### Metodo 1: Deployment Automatico (CONSIGLIATO)

#### 1. Configura le credenziali
```bash
# Copia il file di configurazione
cp .env.deploy .env.deploy.local

# Modifica con i tuoi dati
nano .env.deploy.local

# Imposta:
# K3S_HOST=il-tuo-server.com (o IP)
# K3S_USER=root (o il tuo user)
```

#### 2. Esegui il deployment
```bash
# Rendi eseguibile lo script
chmod +x remote-deploy.sh

# Carica la configurazione
source .env.deploy.local

# Esegui il deployment!
./remote-deploy.sh
```

#### 3. Verifica
Il sito sarà disponibile su: **https://thejord.it** 🎉

---

### Metodo 2: Deployment Manuale Step-by-Step

#### Step 1: Connettiti al Server K3s
```bash
ssh root@your-k3s-server
```

#### Step 2: Sul server, crea una directory
```bash
mkdir -p /opt/thejord
cd /opt/thejord
```

#### Step 3: Dalla tua macchina, copia i file
```bash
# Dalla cartella del progetto
scp -r dist/ Dockerfile nginx.conf k8s-deployment.yaml root@your-k3s-server:/opt/thejord/
```

#### Step 4: Sul server, build l'immagine
```bash
cd /opt/thejord
docker build -t thejord:latest .
```

#### Step 5: Import in K3s
```bash
docker save thejord:latest | sudo k3s ctr images import -
```

#### Step 6: Deploy su Kubernetes
```bash
kubectl apply -f k8s-deployment.yaml
```

#### Step 7: Verifica lo stato
```bash
# Attendi che i pod siano pronti
kubectl get pods -n thejord -w

# Verifica l'ingress
kubectl get ingress -n thejord

# Controlla i logs
kubectl logs -n thejord -l app=thejord
```

---

## 📋 Requisiti Pre-Deployment

### Sul Server K3s
- [ ] K3s installato e funzionante
- [ ] Docker installato
- [ ] kubectl funzionante
- [ ] Traefik ingress controller attivo (incluso di default in K3s)
- [ ] (Opzionale) cert-manager per SSL automatico

### DNS
- [ ] Dominio `thejord.it` puntato all'IP del server K3s
- [ ] Record A configurato: `thejord.it → [IP-SERVER]`

### Firewall/Port Forwarding
- [ ] Porta 80 (HTTP) aperta e forwarded
- [ ] Porta 443 (HTTPS) aperta e forwarded

---

## 🔧 Installazione cert-manager (per SSL automatico)

Se non hai ancora cert-manager installato:

```bash
# Installa cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Attendi che sia pronto
kubectl wait --for=condition=available --timeout=300s deployment/cert-manager -n cert-manager

# Crea ClusterIssuer per Let's Encrypt
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@thejord.it
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: traefik
EOF
```

---

## 🔍 Verifica Post-Deployment

### 1. Controlla i Pod
```bash
kubectl get pods -n thejord
```
Output atteso:
```
NAME                      READY   STATUS    RESTARTS   AGE
thejord-xxxxxxxxx-xxxxx   1/1     Running   0          30s
thejord-xxxxxxxxx-xxxxx   1/1     Running   0          30s
```

### 2. Controlla l'Ingress
```bash
kubectl get ingress -n thejord
```
Output atteso:
```
NAME              HOSTS         ADDRESS         PORTS     AGE
thejord-ingress   thejord.it    xxx.xxx.xxx.xxx 80, 443   1m
```

### 3. Controlla il Certificato SSL
```bash
kubectl get certificate -n thejord
```
Output atteso:
```
NAME          READY   SECRET        AGE
thejord-tls   True    thejord-tls   2m
```

### 4. Test nel Browser
- Apri: https://thejord.it
- Verifica che il certificato SSL sia valido
- Testa tutti i tool (JSON, Base64, RegExp, Hash, URL)

---

## 🐛 Troubleshooting Rapido

### I pod non partono
```bash
# Vedi i logs
kubectl logs -n thejord -l app=thejord --tail=50

# Descrizione dettagliata
kubectl describe pod -n thejord [nome-pod]
```

### Il sito non è raggiungibile
```bash
# Verifica che l'ingress sia configurato
kubectl describe ingress thejord-ingress -n thejord

# Verifica che Traefik funzioni
kubectl get pods -n kube-system | grep traefik

# Test connettività DNS
nslookup thejord.it
```

### Certificato SSL non funziona
```bash
# Controlla lo stato del certificato
kubectl describe certificate thejord-tls -n thejord

# Vedi i logs di cert-manager
kubectl logs -n cert-manager deployment/cert-manager

# Forza il rinnovo
kubectl delete secret thejord-tls -n thejord
```

---

## 📊 Comandi Utili

### Monitoring
```bash
# Logs in tempo reale
kubectl logs -n thejord -l app=thejord -f

# Status generale
kubectl get all -n thejord

# Eventi recenti
kubectl get events -n thejord --sort-by='.lastTimestamp'
```

### Gestione
```bash
# Restart dell'applicazione
kubectl rollout restart deployment/thejord -n thejord

# Scale up/down
kubectl scale deployment/thejord --replicas=3 -n thejord

# Rollback a versione precedente
kubectl rollout undo deployment/thejord -n thejord
```

### Debugging
```bash
# Entra in un pod
kubectl exec -it -n thejord deployment/thejord -- /bin/sh

# Test interno
kubectl exec -it -n thejord deployment/thejord -- wget -O- http://localhost

# Port forward per test locale
kubectl port-forward -n thejord deployment/thejord 8080:80
# Poi apri: http://localhost:8080
```

---

## 🎉 Deployment Completato!

Una volta deployato con successo:

1. **Testa il sito:** https://thejord.it
2. **Verifica tutti i tool** funzionino correttamente
3. **Controlla le performance** con Google PageSpeed Insights
4. **Monitora i logs** per eventuali errori

### Prossimi Passi
- [ ] Configura Google Analytics (opzionale)
- [ ] Aggiungi sitemap.xml per SEO
- [ ] Configura backup automatici
- [ ] Setup monitoring (Prometheus/Grafana)
- [ ] Aggiungi più tools al sito

---

## 🆘 Hai Bisogno di Aiuto?

Comandi diagnostici completi:
```bash
# Snapshot completo dello stato
kubectl get all,ingress,certificate,secret -n thejord
kubectl describe deployment/thejord -n thejord
kubectl logs -n thejord -l app=thejord --tail=100
kubectl get events -n thejord --sort-by='.lastTimestamp' | tail -20
```

---

## 🔄 Aggiornamenti Futuri

Per deployare una nuova versione:

1. Modifica il codice
2. `npm run build`
3. Ri-esegui `./remote-deploy.sh`

Oppure:
```bash
# Build nuova versione
npm run build

# Update manuale
scp -r dist/* root@your-k3s-server:/opt/thejord/
ssh root@your-k3s-server "cd /opt/thejord && docker build -t thejord:latest . && docker save thejord:latest | sudo k3s ctr images import -"
kubectl rollout restart deployment/thejord -n thejord
```

---

**PRONTO PER IL DEPLOYMENT? 🚀**

Esegui: `./remote-deploy.sh` e il tuo sito sarà online in pochi minuti!
