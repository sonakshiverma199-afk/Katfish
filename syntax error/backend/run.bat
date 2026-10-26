@echo off
title SnowyCare FastAPI Backend - NVIDIA AI Agent (MiniMax M3.1 Flash)
echo ====================================================================
echo  SnowyCare FastAPI Backend Server
echo  Model: minimaxai/minimax-m3.1-flash (NVIDIA API)
echo ====================================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not detected in your PATH.
    echo Please install Python 3.10+ from https://www.python.org/downloads/
    echo and ensure "Add Python to PATH" is checked during installation.
    echo.
    pause
    exit /b 1
)

REM Check if .env exists, if not copy from .env.example
if not exist "%~dp0.env" (
    echo [INFO] Creating .env file from .env.example...
    copy "%~dp0.env.example" "%~dp0.env"
    echo [ACTION REQUIRED] Please edit backend\.env and add your NVIDIA_API_KEY!
    echo.
)

echo [INFO] Installing / verifying dependencies...
python -m pip install -r "%~dp0requirements.txt"
echo.

echo [INFO] Starting FastAPI server on http://localhost:8001 ...
echo API Documentation available at http://localhost:8001/docs
echo.
cd /d "%~dp0.."
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8001 --reload

pause
