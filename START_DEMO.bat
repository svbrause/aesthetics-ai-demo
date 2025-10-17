@echo off
echo 🚀 Starting Aesthetics AI Demo...
echo 📱 This will open in your browser at http://localhost:3000
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org
    echo    Then run this script again.
    pause
    exit /b 1
)

echo ✅ Node.js found. Installing dependencies...
call npm install

echo ✅ Starting the demo server...
echo 🌐 Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul

REM Open browser
start http://localhost:3000

REM Start the server
call npm start