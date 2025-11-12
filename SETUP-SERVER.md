# 🖥️ SETUP SERVER K3S PER THEJORD.IT

Guida completa per configurare il server Proxmox/K3s per il deployment di thejord.it

---

## 📋 Prerequisiti

### Hardware Minimo Raccomandato
- **CPU:** 2 core
- **RAM:** 2GB (minimo), 4GB (consigliato)
- **Disco:** 20GB
- **Network:** Connessione internet stabile

### Software
- Sistema operativo: Ubuntu 20.04/22.04 LTS (o Debian)
- Accesso root o sudo
- Porta 22 (SSH) accessibile

---

## 🚀 PARTE 1: Setup Iniziale del Server

### 1.1 Connettiti al Server Proxmox

```bash
# Da Windows (PowerShell o Git Bash)
ssh root@IP-DEL-TUO-SERVER

# Oppure usa PuTTY con:
# Host: IP-DEL-TUO-SERVER
# Port: 22
# Username: root
```

### 1.2 Aggiorna il Sistema

```bash
# Update packages
apt update && apt upgrade -y

# Installa utility essenziali
apt install -y curl wget git nano
```

### 1.3 Configura Hostname (Opzionale)

```bash
# Imposta un hostname riconoscibile
hostnamectl set-hostname k3s-thejord

# Verifica
hostname
```

---

## 🐳 PARTE 2: Installazione Docker

### 2.1 Installa Docker

```bash
# Rimuovi vecchie versioni (se presenti)
apt remove -y docker docker-engine docker.io containerd runc

# Installa dipendenze
apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Aggiungi repository Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installa Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io

# Avvia e abilita Docker
systemctl start docker
systemctl enable docker

# Verifica installazione
docker --version
docker run hello-world
```

### 2.2 Configura Docker (Opzionale)

```bash
# Aggiungi utente al gruppo docker (se non usi root)
usermod -aG docker $USER

# Ricarica gruppi
newgrp docker
```

---

## ☸️ PARTE 3: Installazione K3s

### 3.1 Installa K3s

```bash
# Installazione standard K3s (include Traefik di default)
curl -sfL https://get.k3s.io | sh -

# Oppure, se vuoi disabilitare Traefik per usarne uno custom:
# curl -sfL https://get.k3s.io | sh -s - --disable traefik

# Attendi che si avvii (circa 30 secondi)
sleep 30

# Verifica installazione
k3s --version
kubectl version
```

### 3.2 Verifica che K3s Funzioni

```bash
# Controlla i nodi
kubectl get nodes

# Output atteso:
# NAME          STATUS   ROLES                  AGE   VERSION
# k3s-thejord   Ready    control-plane,master   1m    v1.28.x+k3s1

# Controlla i pod di sistema
kubectl get pods -A

# Verifica che Traefik sia attivo
kubectl get pods -n kube-system | grep traefik
```

### 3.3 Configura kubectl (Opzionale - per accesso remoto)

```bash
# Copia la configurazione di kubectl
cat /etc/rancher/k3s/k3s.yaml

# Salva questo output, lo userai per configurare kubectl sul tuo PC
```

**Per usare kubectl dal tuo PC Windows:**

1. Installa kubectl: https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/
2. Crea file: `C:\Users\domen\.kube\config`
3. Copia il contenuto di `/etc/rancher/k3s/k3s.yaml` nel file
4. Modifica `server: https://127.0.0.1:6443` con `server: https://IP-TUO-SERVER:6443`

---

## 🔐 PARTE 4: Installazione cert-manager (SSL Automatico)

### 4.1 Installa cert-manager

```bash
# Installa cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Attendi che sia pronto (circa 1 minuto)
kubectl wait --for=condition=available --timeout=300s deployment/cert-manager -n cert-manager
kubectl wait --for=condition=available --timeout=300s deployment/cert-manager-webhook -n cert-manager
kubectl wait --for=condition=available --timeout=300s deployment/cert-manager-cainjector -n cert-manager

# Verifica
kubectl get pods -n cert-manager
```

### 4.2 Crea ClusterIssuer per Let's Encrypt

```bash
# IMPORTANTE: Sostituisci admin@thejord.it con la tua email!
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

# Verifica
kubectl get clusterissuer
```

---

## 🌐 PARTE 5: Configurazione DNS

### 5.1 Ottieni l'IP Pubblico del Server

```bash
# Trova l'IP pubblico
curl ifconfig.me

# Oppure
curl icanhazip.com

# Annota questo IP!
```

### 5.2 Configura il Record DNS

Vai al pannello di controllo del tuo provider DNS (es. Cloudflare, GoDaddy, etc.) e crea:

```
Tipo: A
Nome: @  (oppure thejord.it)
Valore: IP-PUBBLICO-DEL-SERVER
TTL: Auto o 300
```

**Se usi un sottodominio:**
```
Tipo: A
Nome: www
Valore: IP-PUBBLICO-DEL-SERVER
TTL: Auto o 300
```

### 5.3 Verifica DNS (dal tuo PC)

```bash
# Su Windows (PowerShell)
nslookup thejord.it

# Deve restituire l'IP del tuo server
```

**NOTA:** La propagazione DNS può richiedere da 5 minuti a 48 ore.

---

## 🔥 PARTE 6: Configurazione Firewall

### 6.1 Firewall sul Server

```bash
# Se usi UFW (Ubuntu Firewall)
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 6443/tcp  # Kubernetes API (opzionale, solo se accesso remoto)
ufw enable

# Verifica
ufw status
```

### 6.2 Firewall Proxmox

Se il server è dietro Proxmox, assicurati che le porte siano aperte anche lì:

**Nel pannello Proxmox:**
1. Vai su Datacenter → Firewall → Options
2. Abilita Firewall
3. Aggiungi regole per porte 80, 443

**Oppure via CLI su Proxmox:**
```bash
# Sul nodo Proxmox (non nella VM)
pct exec <VM-ID> -- iptables -A INPUT -p tcp --dport 80 -j ACCEPT
pct exec <VM-ID> -- iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

### 6.3 Port Forwarding (se dietro NAT)

Se il server è dietro un router/firewall, configura port forwarding:

```
80 (esterno) → IP-SERVER:80 (interno)
443 (esterno) → IP-SERVER:443 (interno)
```

---

## 🔑 PARTE 7: Configurazione SSH Keys (Accesso Senza Password)

### 7.1 Genera Chiave SSH (sul tuo PC Windows)

```powershell
# PowerShell
ssh-keygen -t ed25519 -C "thejord-deploy"

# Salva in: C:\Users\domen\.ssh\id_ed25519_thejord
# Lascia password vuota per accesso automatico
```

### 7.2 Copia Chiave sul Server

```powershell
# Da Windows PowerShell
type C:\Users\domen\.ssh\id_ed25519_thejord.pub | ssh root@IP-SERVER "cat >> ~/.ssh/authorized_keys"

# Oppure usa ssh-copy-id (se disponibile)
ssh-copy-id -i C:\Users\domen\.ssh\id_ed25519_thejord.pub root@IP-SERVER
```

### 7.3 Configura SSH Config (Opzionale)

Crea file: `C:\Users\domen\.ssh\config`

```
Host thejord-k3s
    HostName IP-DEL-SERVER
    User root
    IdentityFile C:\Users\domen\.ssh\id_ed25519_thejord
```

Ora puoi connetterti con:
```bash
ssh thejord-k3s
```

---

## ✅ PARTE 8: Verifica Finale

### 8.1 Checklist Completa

Verifica che tutto sia pronto:

```bash
# Sul server K3s
kubectl get nodes                        # Deve mostrare 1 nodo Ready
kubectl get pods -A                      # Tutti i pod Running
kubectl get pods -n kube-system | grep traefik  # Traefik attivo
kubectl get pods -n cert-manager         # cert-manager attivo
kubectl get clusterissuer                # letsencrypt-prod presente
docker --version                         # Docker installato
```

### 8.2 Test Deployment di Prova

```bash
# Crea un deployment di test
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort

# Verifica
kubectl get pods
kubectl get svc

# Pulisci test
kubectl delete deployment nginx
kubectl delete svc nginx
```

---

## 🎯 PARTE 9: Prepara per Deployment THEJORD.IT

### 9.1 Crea .env.deploy.local sul tuo PC

Nel progetto thejord, crea file `.env.deploy.local`:

```bash
K3S_HOST=IP-DEL-TUO-SERVER  # o hostname
K3S_USER=root
NAMESPACE=thejord
DOMAIN=thejord.it
LETSENCRYPT_EMAIL=tua-email@esempio.com
```

### 9.2 Test Connessione SSH

```bash
# Dal tuo PC (nella cartella del progetto)
ssh root@IP-SERVER "echo 'Connessione OK!'"

# Se funziona, sei pronto!
```

---

## 🚀 PARTE 10: DEPLOYMENT!

Ora sei pronto per deployare thejord.it!

### 10.1 Verifica Prerequisiti

```bash
cd "C:\Users\domen\OneDrive\Documenti\Python Projects\the-jord-project"
./check-ready.sh
```

### 10.2 Deploy

```bash
./remote-deploy.sh
```

### 10.3 Verifica Deployment

```bash
# Sul server (o dal PC se kubectl è configurato)
kubectl get all -n thejord
kubectl get ingress -n thejord
kubectl get certificate -n thejord
```

### 10.4 Accedi al Sito

Apri browser: **https://thejord.it**

---

## 🐛 Troubleshooting

### Problema: K3s non parte

```bash
# Controlla logs
journalctl -u k3s -n 50

# Restart
systemctl restart k3s
```

### Problema: Traefik non funziona

```bash
# Verifica Traefik
kubectl get pods -n kube-system | grep traefik
kubectl logs -n kube-system -l app=traefik

# Restart Traefik
kubectl rollout restart deployment/traefik -n kube-system
```

### Problema: Certificato SSL non si genera

```bash
# Verifica cert-manager
kubectl get pods -n cert-manager
kubectl logs -n cert-manager deployment/cert-manager

# Controlla il certificate
kubectl describe certificate thejord-tls -n thejord

# Verifica DNS
nslookup thejord.it

# Il dominio DEVE puntare al server per Let's Encrypt!
```

### Problema: Port 80/443 non raggiungibili

```bash
# Verifica firewall
ufw status

# Test porte
netstat -tulpn | grep :80
netstat -tulpn | grep :443

# Test da esterno (sul tuo PC)
telnet IP-SERVER 80
telnet IP-SERVER 443
```

---

## 📊 Monitoring (Opzionale)

### Installa K9s (Kubernetes CLI UI)

```bash
# Sul server
curl -sS https://webinstall.dev/k9s | bash

# Avvia
k9s

# Naviga con frecce, ? per help, Ctrl+C per uscire
```

---

## 🎉 Setup Completato!

Ora hai:
- ✅ Server Proxmox/K3s configurato
- ✅ Docker installato
- ✅ K3s funzionante
- ✅ Traefik ingress attivo
- ✅ cert-manager per SSL automatico
- ✅ Firewall configurato
- ✅ DNS puntato al server
- ✅ SSH keys configurate

**SEI PRONTO PER IL DEPLOYMENT!**

Esegui:
```bash
cd "C:\Users\domen\OneDrive\Documenti\Python Projects\the-jord-project"
./remote-deploy.sh
```

E il tuo sito sarà LIVE su **https://thejord.it**! 🚀
