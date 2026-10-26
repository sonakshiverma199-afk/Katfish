# SnowyCare AI Healthcare Backend — NVIDIA MiniMax M3.1 Flash Integration

Production-ready FastAPI backend for SnowyCare, integrating **NVIDIA's API** with model **`minimaxai/minimax-m3.1-flash`** for clinical conversational assistance, prescription text extraction, allergy safety verification, and medicine delivery guidance.

---

## 🔒 Security & API Key Handling

- **Never exposed to frontend**: All requests to `https://integrate.api.nvidia.com/v1/chat/completions` originate strictly from this Python backend.
- **Environment Variable**: Reads credentials from `NVIDIA_API_KEY` via environment variable or `.env` file.
- **Zero hardcoding**: API credentials are never committed or hardcoded.

---

## 🚀 Quick Start

### 1. Configure Your NVIDIA API Key
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and set your key from [NVIDIA Build](https://build.nvidia.com):
   ```ini
   NVIDIA_API_KEY=nvapi-your-key-here
   NVIDIA_ENDPOINT=https://integrate.api.nvidia.com/v1/chat/completions
   NVIDIA_MODEL=minimaxai/minimax-m3.1-flash
   PORT=8001
   ```

### 2. Run the Backend Server
- **On Windows (1-Click)**:
  Double-click `run.bat` or run in PowerShell:
  ```powershell
  .\run.ps1
  ```
- **Manual Start**:
  ```bash
  pip install -r requirements.txt
  uvicorn backend.app.main:app --host 0.0.0.0 --port 8001 --reload
  ```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status and active model verification |
| `GET` | `/api/health` | Healthcheck (checks whether `NVIDIA_API_KEY` is configured) |
| `POST` | `/api/chat` | Main conversational AI chat with context injection |
| `POST` | `/api/extract-prescription` | Extracts prescribed medicines & checks user allergies |
| `POST` | `/api/explain-medicine` | Explains medicine indications, side effects & allergies |
| `GET` | `/api/delivery/status` | Real-time courier tracking for active orders |
| `GET` | `/docs` | Interactive Swagger UI API documentation |

---

## 🩺 Guardrails & Medical Governance

1. **Non-Diagnostic**: Clarifies that AI responses are for educational support.
2. **No Independent Dispensing**: Requires clinical verification by licensed pharmacists.
3. **Allergy Safety Scanner**: Cross-checks medications against patient allergies before allowing addition.
