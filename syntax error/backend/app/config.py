"""
SnowyCare AI Healthcare Platform - Configuration Module
Safely loads NVIDIA API credentials and backend settings from environment variables.
"""

import os
from pathlib import Path
from pydantic import BaseModel

# Attempt to load .env file if python-dotenv is installed
try:
    from dotenv import load_dotenv
    env_path = Path(__file__).resolve().parent.parent / ".env"
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)
    else:
        # Check current working directory
        load_dotenv()
except ImportError:
    pass


class Settings(BaseModel):
    app_name: str = "SnowyCare Clinical AI Agent"
    version: str = "2.0.0"
    
    # NVIDIA API Configuration
    nvidia_api_key: str = os.getenv("NVIDIA_API_KEY", "").strip()
    nvidia_endpoint: str = os.getenv(
        "NVIDIA_ENDPOINT", 
        "https://integrate.api.nvidia.com/v1/chat/completions"
    ).strip()
    nvidia_model: str = os.getenv(
        "NVIDIA_MODEL", 
        "minimaxai/minimax-m3.1-flash"
    ).strip()

    # Server Configuration
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", "8001"))
    
    # CORS Origins (Permit frontend communication)
    cors_origins: list = [
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:8001",
        "http://127.0.0.1:8001",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "*"
    ]

    @property
    def is_api_key_configured(self) -> bool:
        return bool(self.nvidia_api_key and not self.nvidia_api_key.startswith("nvapi-your-"))

    @property
    def masked_api_key(self) -> str:
        if not self.nvidia_api_key:
            return "NOT_CONFIGURED"
        if len(self.nvidia_api_key) <= 8:
            return "***"
        return f"{self.nvidia_api_key[:6]}...{self.nvidia_api_key[-4:]}"


settings = Settings()
