@echo off
REM Akanbi Farm Hub - Development Setup Script (Windows)
REM This script helps you get started quickly

echo.
echo 🌾 Welcome to Akanbi Farm Hub Setup!
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
node -v
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)

echo ✅ npm detected
npm -v
echo.

REM Install root dependencies
echo 📦 Installing frontend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo ✅ Frontend dependencies installed
echo.

REM Install function dependencies
echo 📦 Installing backend dependencies...
cd netlify\functions
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    cd ..\..
    pause
    exit /b 1
)

cd ..\..
echo ✅ Backend dependencies installed
echo.

REM Check for .env file
if not exist .env (
    echo ⚠️  No .env file found
    echo 📝 Creating .env from .env.example...
    copy .env.example .env
    echo ✅ Created .env file
    echo.
    echo ⚠️  IMPORTANT: Edit .env file with your credentials before running!
    echo.
) else (
    echo ✅ .env file exists
)

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Edit .env file with your Google Sheets and Twilio credentials
echo 2. Run 'npm run dev' to start the development server
echo 3. Or run 'netlify dev' to test with backend functions
echo.
echo 📚 For detailed instructions, see:
echo    - README.md (comprehensive guide)
echo    - QUICKSTART.md (30-minute setup)
echo    - SETUP_CHECKLIST.md (step-by-step)
echo.
echo Good luck! 🚀
echo.
pause
