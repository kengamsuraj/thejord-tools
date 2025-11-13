# CI/CD Setup per THEJORD.IT

Questa guida spiega come configurare la pipeline CI/CD automatica per deploy su K3s.

## 🎯 Come Funziona

La pipeline GitHub Actions:
1. **Triggera** automaticamente ad ogni push su `main`
2. **Build** del progetto con npm (Vite)
3. **Crea** immagine Docker
4. **Push** su GitHub Container Registry (gratis)
5. **Deploy** automatico su K3s via SSH

## 📋 Prerequisiti

- Repository GitHub del progetto
- Server K3s su Proxmox con accesso SSH
- Credenziali SSH per accedere al server

## ⚙️ Configurazione Secrets

Vai su **GitHub Repository → Settings → Secrets and variables → Actions** e aggiungi:

### 1. `SSH_PRIVATE_KEY`
La chiave privata SSH per accedere al server Proxmox/K3s.

**Come ottenere:**
```bash
# Su Windows (se non esiste già)
ssh-keygen -t ed25519 -C "github-actions@thejord.it" -f ~/.ssh/thejord_deploy

# Copia la chiave PRIVATA (tutto il contenuto)
cat ~/.ssh/thejord_deploy

# Copia la chiave PUBBLICA sul server
ssh-copy-id -i ~/.ssh/thejord_deploy.pub user@your-proxmox-server
```

**Valore da inserire:** Tutto il contenuto del file `~/.ssh/thejord_deploy` (include `-----BEGIN` e `-----END`)

---

### 2. `SSH_HOST`
L'indirizzo IP o hostname del server Proxmox/K3s.

**Esempio:** `192.168.1.100` o `proxmox.example.com`

---

### 3. `SSH_USER`
L'username SSH per accedere al server.

**Esempio:** `root` o `admin` o `your-username`

---

### 4. `SSH_PORT` (Opzionale)
La porta SSH del server. Default: `22`

**Esempio:** `22` (se usa porta standard, puoi omettere)

---

## 🚀 Primo Deploy Manuale

Prima di fare il primo push, configura manualmente il secret per GitHub Container Registry:

```bash
# SSH sul server K3s
ssh user@your-server

# Crea namespace
kubectl create namespace thejord

# Test manuale (opzionale)
echo "YOUR_GITHUB_TOKEN" | sudo k3s ctr images pull --user YOUR_GITHUB_USERNAME ghcr.io/thejord-it/thejord-tools:latest
```

## 🔐 Permessi GitHub Container Registry

1. Vai su **GitHub Repository → Settings → Actions → General**
2. Scorri fino a **Workflow permissions**
3. Seleziona **Read and write permissions**
4. Salva

## ✅ Test Pipeline

Dopo aver configurato i secrets:

1. Fai un commit qualsiasi su `main`:
   ```bash
   git commit --allow-empty -m "test: trigger CI/CD pipeline"
   git push origin main
   ```

2. Vai su **GitHub → Actions tab** e monitora il workflow

3. Se tutto va bene, vedrai:
   - ✅ Build completed
   - ✅ Docker image pushed
   - ✅ Deployment to K3s successful

4. Verifica il sito: https://thejord.it

## 🐛 Troubleshooting

### Errore "Permission denied (publickey)"
- Verifica che la chiave pubblica sia sul server: `cat ~/.ssh/authorized_keys`
- Testa connessione: `ssh -i ~/.ssh/thejord_deploy user@server`

### Errore "kubectl: command not found"
Il workflow usa `kubectl` sul server. Assicurati che sia installato:
```bash
# Su server K3s
ln -s /usr/local/bin/k3s /usr/local/bin/kubectl
```

### Errore "imagePullSecrets"
Verifica che il secret esista:
```bash
kubectl get secrets -n thejord
```

Se manca, il workflow lo crea automaticamente.

### Rollback a versione precedente
```bash
# SSH sul server
ssh user@server

# Lista deployment history
kubectl rollout history deployment/thejord -n thejord

# Rollback
kubectl rollout undo deployment/thejord -n thejord
```

## 📊 Monitoring

Dopo deploy, verifica:

```bash
# Pods status
kubectl get pods -n thejord

# Logs
kubectl logs -n thejord -l app=thejord --tail=100 -f

# Service
kubectl get svc -n thejord

# Ingress
kubectl get ingress -n thejord
```

## 🔄 Deploy Manuale (se necessario)

Per triggerare deploy senza push:

1. Vai su **GitHub → Actions**
2. Seleziona workflow **"Build and Deploy to K3s"**
3. Click **"Run workflow"** → **"Run workflow"**

---

**🎉 Setup completato!** Ogni push su `main` triggera automaticamente build e deploy.
