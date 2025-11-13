# Self-hosted GitHub Runner Setup per THEJORD.IT

Guida completa per installare un GitHub Runner self-hosted che permette deploy automatico su K3s.

---

## 🎯 Architettura

```
GitHub Cloud → Self-hosted Runner (LXC Container) → K3s (192.168.1.212)
                      ↓
              Esegue CI/CD workflow
              Build + Deploy automatico
```

**Vantaggi:**
- ✅ Nessuna porta esposta all'esterno
- ✅ Deploy completamente automatico
- ✅ Runner può accedere a K3s direttamente (stessa rete)

---

## 📦 Step 1: Crea Container LXC per Runner

### Opzione A: Via GUI Proxmox

1. **Proxmox Web UI** → **Create CT** (Container)
2. **Configurazione:**
   - **CT ID**: 105 (o quello che preferisci)
   - **Hostname**: `github-runner`
   - **Template**: Ubuntu 22.04 (o Debian 12)
   - **Root Password**: (imposta password)
   - **Disk**: 8 GB (sufficiente)
   - **CPU**: 2 cores
   - **RAM**: 2048 MB (2GB)
   - **Network**: Bridge vmbr0, DHCP o IP statico (es: 192.168.1.215)
   - **Start at boot**: ✅ Yes

3. **Start container**

---

### Opzione B: Via CLI (SSH su Proxmox)

```bash
# SSH su Proxmox
ssh root@192.168.1.200

# Download template Ubuntu 22.04 (se non presente)
pveam update
pveam download local ubuntu-22.04-standard_22.04-1_amd64.tar.zst

# Crea container GitHub Runner
pct create 105 \
  local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst \
  --hostname github-runner \
  --cores 2 \
  --memory 2048 \
  --swap 512 \
  --net0 name=eth0,bridge=vmbr0,ip=192.168.1.215/24,gw=192.168.1.254 \
  --rootfs local-lvm:8 \
  --password <YOUR_PASSWORD> \
  --start 1 \
  --onboot 1

# Avvia container
pct start 105
```

---

## 🔐 Step 2: Configura Accesso SSH al Container

```bash
# SSH su Proxmox
ssh root@192.168.1.200

# Copia chiave SSH nel container runner
pct exec 105 -- bash -c 'mkdir -p /root/.ssh && chmod 700 /root/.ssh'
cat ~/.ssh/authorized_keys | pct exec 105 -- tee -a /root/.ssh/authorized_keys
pct exec 105 -- chmod 600 /root/.ssh/authorized_keys

# Test connessione (dal tuo PC)
ssh root@192.168.1.215  # (usa l'IP che hai assegnato)
```

---

## ⚙️ Step 3: Installa Dipendenze nel Container

```bash
# SSH nel container runner
ssh root@192.168.1.215

# Update sistema
apt update && apt upgrade -y

# Installa dipendenze per GitHub Runner
apt install -y \
  curl \
  git \
  jq \
  wget \
  tar \
  docker.io \
  kubectl

# Abilita e avvia Docker
systemctl enable docker
systemctl start docker

# Verifica installazioni
docker --version
kubectl version --client
git --version
```

---

## 🏃 Step 4: Installa GitHub Actions Runner

### 4.1 Ottieni Token di Registrazione da GitHub

1. Vai su: **https://github.com/thejord-it/thejord-tools/settings/actions/runners/new**
2. Copia i comandi mostrati (specifici per il tuo repo)

**Esempio comandi** (usa quelli veri da GitHub):

```bash
# SSH nel container runner
ssh root@192.168.1.215

# Crea directory per runner
mkdir -p /opt/actions-runner && cd /opt/actions-runner

# Download runner (verifica ultima versione su GitHub)
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz

# Estrai
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# Configura runner (usa il token da GitHub)
./config.sh --url https://github.com/thejord-it/thejord-tools \
  --token <YOUR_REGISTRATION_TOKEN_FROM_GITHUB> \
  --name proxmox-runner \
  --labels self-hosted,linux,x64,proxmox \
  --work _work

# Installa come servizio systemd
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
```

---

## ✅ Step 5: Verifica Runner Attivo

1. Vai su: **https://github.com/thejord-it/thejord-tools/settings/actions/runners**
2. Dovresti vedere: **proxmox-runner** con stato **🟢 Idle**

---

## 🔧 Step 6: Configura Accesso Runner → K3s

Il runner deve poter accedere a K3s per fare deploy.

```bash
# SSH nel container runner
ssh root@192.168.1.215

# Copia chiave SSH per accesso a K3s
ssh-keygen -t ed25519 -C "github-runner" -f /root/.ssh/id_ed25519 -N ""

# Copia chiave pubblica su K3s
ssh-copy-id -i /root/.ssh/id_ed25519.pub root@192.168.1.212

# Test connessione
ssh -i /root/.ssh/id_ed25519 root@192.168.1.212 "kubectl version --short"
```

**Output atteso:**
```
Client Version: v1.28.x
Kustomize Version: v5.x.x
Server Version: v1.28.x
```

---

## 🛠️ Step 7: Aggiorna Workflow GitHub Actions

Il workflow deve usare `runs-on: self-hosted` invece di `ubuntu-latest`.

**File già pronto:** `.github/workflows/deploy.yml`

Verrà aggiornato nel prossimo commit per usare il runner self-hosted.

---

## 🚀 Step 8: Test Deploy

```bash
# Trigger workflow
git commit --allow-empty -m "ci: test self-hosted runner deploy"
git push origin main

# Monitora su GitHub
# https://github.com/thejord-it/thejord-tools/actions
```

---

## 🔍 Troubleshooting

### Runner non appare su GitHub

```bash
# SSH nel container runner
ssh root@192.168.1.215

# Check servizio
sudo ./svc.sh status

# Check logs
journalctl -u actions.runner.thejord-it-thejord-tools.proxmox-runner -f
```

### Deploy fallisce

```bash
# Check connessione runner → K3s
ssh root@192.168.1.215
ssh root@192.168.1.212 "kubectl get nodes"

# Check Docker nel runner
docker ps
docker images
```

### Restart servizio runner

```bash
ssh root@192.168.1.215
cd /opt/actions-runner
sudo ./svc.sh restart
```

---

## 📊 Monitoring

### Check runner status

```bash
ssh root@192.168.1.215
cd /opt/actions-runner
sudo ./svc.sh status
```

### Check risorse container

```bash
# Su Proxmox
ssh root@192.168.1.200
pct status 105
pct config 105
```

---

## 🔐 Security Best Practices

1. ✅ **Runner container separato** - Isolamento da K3s
2. ✅ **No root in workflow** - Runner esegue come utente dedicato
3. ✅ **Chiavi SSH separate** - Runner ha propria chiave per K3s
4. ✅ **Firewall Proxmox** - Runner solo outbound, no inbound dall'esterno
5. ✅ **Auto-updates** - Abilita unattended-upgrades nel container

---

## 📝 Configurazione Completa

### Container Specs
- **ID**: 105
- **Hostname**: github-runner
- **IP**: 192.168.1.215 (o DHCP)
- **RAM**: 2GB
- **CPU**: 2 cores
- **Disk**: 8GB

### Network Access
- ✅ Runner → Internet (per GitHub API)
- ✅ Runner → K3s (192.168.1.212:22)
- ✅ Runner → GitHub Container Registry
- ❌ Internet → Runner (nessuna porta in ingresso)

---

**🎉 Setup completato!** Il runner ora esegue i workflow GitHub Actions automaticamente.
