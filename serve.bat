@echo off
title SnowyCare Localhost Server ❄️🐻‍❄️
echo Starting SnowyCare on http://localhost:8000 ...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
