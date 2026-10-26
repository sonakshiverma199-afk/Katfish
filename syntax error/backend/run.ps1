param (
    [int]$Port = 8001
)

Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host " ❄️ SnowyCare FastAPI Backend Server" -ForegroundColor Magenta
Write-Host " Model: minimaxai/minimax-m3.1-flash (NVIDIA API)" -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir

# Check Python installation
$pythonCmd = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCmd) {
    Write-Host "[!] Python is not detected in your PATH." -ForegroundColor Red
    Write-Host "Please install Python 3.10+ from https://www.python.org/downloads/ and ensure 'Add Python to PATH' is checked." -ForegroundColor Yellow
    exit 1
}

# Ensure .env exists
$envFile = Join-Path $scriptDir ".env"
$envExample = Join-Path $scriptDir ".env.example"
if (-not (Test-Path $envFile) -and (Test-Path $envExample)) {
    Write-Host "[INFO] Creating .env from .env.example..." -ForegroundColor Gray
    Copy-Item $envExample $envFile
    Write-Host "[ACTION REQUIRED] Please edit backend\.env and add your NVIDIA_API_KEY!" -ForegroundColor Yellow
}

Write-Host "[INFO] Installing / verifying dependencies..." -ForegroundColor Gray
& python -m pip install -r (Join-Path $scriptDir "requirements.txt")

Write-Host "[INFO] Starting FastAPI server on http://localhost:${Port} ..." -ForegroundColor Green
Write-Host "Interactive Swagger Docs: http://localhost:${Port}/docs" -ForegroundColor Cyan

Set-Location $projectRoot
& python -m uvicorn backend.app.main:app --host 0.0.0.0 --port $Port --reload
