@echo off
REM BlackCryptoNews - Quick Start Script (Windows)
REM This script will set up everything for you

echo.
echo ========================================
echo    BlackCryptoNews - Quick Start
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo Error: Please run this script from the blackcryptonews directory
    echo    cd blackcryptonews
    echo    quick-start.bat
    exit /b 1
)

echo Step 1: Cleaning old files...
if exist .next rmdir /s /q .next
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
echo Done!
echo.

echo Step 2: Installing dependencies...
call npm install
echo Done!
echo.

echo Step 3: Checking for API key...
if not exist ".env.local" (
    if exist ".env.local.example" (
        echo Creating .env.local file...
        copy .env.local.example .env.local
        echo.
        echo IMPORTANT: You need to add your OpenAI API key!
        echo    1. Get your key from: https://platform.openai.com/api-keys
        echo    2. Open .env.local and add your key
        echo    3. Run 'npm run dev' to start the server
        echo.
    ) else (
        echo Warning: .env.local.example not found
    )
) else (
    echo .env.local already exists
    echo.
)

echo Step 4: Building the project...
call npm run build
if %ERRORLEVEL% EQU 0 (
    echo Build successful!
    echo.
    echo ========================================
    echo    Setup Complete!
    echo ========================================
    echo.
    echo Next steps:
    echo    1. Add your API key to .env.local (if not done)
    echo    2. Run: npm run dev
    echo    3. Open: http://localhost:3000
    echo.
    echo Ready to launch!
) else (
    echo Build failed. Please check the error messages above.
    exit /b 1
)

pause
