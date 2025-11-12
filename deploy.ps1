# THEJORD.IT - Deployment Script for K3s (Windows PowerShell)
# Usage: .\deploy.ps1 [build|deploy|rollback|logs]

param(
    [Parameter(Position=0)]
    [ValidateSet("build", "import", "deploy", "rollback", "logs")]
    [string]$Action = "deploy"
)

# Configuration
$IMAGE_NAME = "thejord"
$IMAGE_TAG = if ($env:IMAGE_TAG) { $env:IMAGE_TAG } else { "latest" }
$NAMESPACE = "thejord"
$DEPLOYMENT_NAME = "thejord"

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Warn {
    param([string]$Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Build-Image {
    Write-Info "Building Docker image..."
    docker build -t "${IMAGE_NAME}:${IMAGE_TAG}" .
    if ($LASTEXITCODE -eq 0) {
        Write-Info "Docker image built successfully: ${IMAGE_NAME}:${IMAGE_TAG}"
    } else {
        Write-Error-Custom "Docker build failed"
        exit 1
    }
}

function Import-ToK3s {
    Write-Info "Exporting Docker image..."
    docker save "${IMAGE_NAME}:${IMAGE_TAG}" | Out-File -FilePath ".\${IMAGE_NAME}.tar" -Encoding byte

    Write-Info "Copying image to K3s server..."
    # Modify this with your K3s server details
    # scp ".\${IMAGE_NAME}.tar" user@k3s-server:/tmp/

    Write-Info "Importing image to K3s..."
    # ssh user@k3s-server "sudo k3s ctr images import /tmp/${IMAGE_NAME}.tar"

    Write-Warn "Please manually copy ${IMAGE_NAME}.tar to your K3s server and import it:"
    Write-Host "  scp ${IMAGE_NAME}.tar user@k3s-server:/tmp/" -ForegroundColor Cyan
    Write-Host "  ssh user@k3s-server 'sudo k3s ctr images import /tmp/${IMAGE_NAME}.tar'" -ForegroundColor Cyan

    Write-Info "Image export completed"
}

function Deploy-ToK3s {
    Write-Info "Deploying to K3s cluster..."

    # Create namespace if it doesn't exist
    kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

    # Apply deployment
    kubectl apply -f k8s-deployment.yaml

    Write-Info "Waiting for deployment to be ready..."
    kubectl rollout status deployment/$DEPLOYMENT_NAME -n $NAMESPACE --timeout=300s

    if ($LASTEXITCODE -eq 0) {
        Write-Info "Deployment completed successfully!"
        Write-Info "Checking pods status..."
        kubectl get pods -n $NAMESPACE

        Write-Info "Service details:"
        kubectl get svc -n $NAMESPACE

        Write-Info "Ingress details:"
        kubectl get ingress -n $NAMESPACE
    } else {
        Write-Error-Custom "Deployment failed"
        exit 1
    }
}

function Rollback-Deployment {
    Write-Warn "Rolling back deployment..."
    kubectl rollout undo deployment/$DEPLOYMENT_NAME -n $NAMESPACE
    kubectl rollout status deployment/$DEPLOYMENT_NAME -n $NAMESPACE

    if ($LASTEXITCODE -eq 0) {
        Write-Info "Rollback completed"
    } else {
        Write-Error-Custom "Rollback failed"
        exit 1
    }
}

function Show-Logs {
    Write-Info "Showing recent logs..."
    kubectl logs -n $NAMESPACE -l app=$DEPLOYMENT_NAME --tail=100
}

# Main script execution
switch ($Action) {
    "build" {
        Build-Image
    }
    "import" {
        Import-ToK3s
    }
    "deploy" {
        Build-Image
        Deploy-ToK3s
    }
    "rollback" {
        Rollback-Deployment
    }
    "logs" {
        Show-Logs
    }
    default {
        Write-Host "Usage: .\deploy.ps1 {build|import|deploy|rollback|logs}"
        Write-Host ""
        Write-Host "Commands:"
        Write-Host "  build     - Build Docker image only"
        Write-Host "  import    - Export Docker image for K3s"
        Write-Host "  deploy    - Build and deploy to K3s (default)"
        Write-Host "  rollback  - Rollback to previous deployment"
        Write-Host "  logs      - Show recent logs"
        exit 1
    }
}

Write-Info "Done!"
