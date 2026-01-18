@echo off
REM Zoom Clone - Quick Start Script for Windows

echo.
echo ================================
echo  Zoom Clone - Quick Start
echo ================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

REM Start Backend
echo [1/2] Starting Backend Server on port 8000...
start "Zoom Clone - Backend" cmd /k "cd Backend && npm install && npm start"
timeout /t 3

REM Start Frontend
echo [2/2] Starting Frontend on port 3001...
start "Zoom Clone - Frontend" cmd /k "cd Frontend && npm install && npm start"

echo.
echo ================================
echo  Services Starting...
echo ================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3001
echo.
echo The frontend will open automatically in your browser.
echo If not, visit http://localhost:3001 manually.
echo.
echo Press Ctrl+C in each window to stop services.
echo.
pause
