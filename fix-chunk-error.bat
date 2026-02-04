@echo off
REM BlackCryptoNews - ChunkLoadError Fix Script (Windows)
REM This script completely resets the project to fix chunk loading issues

echo.
echo ================================
echo   Fixing ChunkLoadError...
echo ================================
echo.

if not exist "package.json" (
    echo Error: Please run this script from the blackcryptonews directory
    exit /b 1
)

echo Step 1: Removing all build artifacts...
if exist .next rmdir /s /q .next
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /q package-lock.json
if exist .vercel rmdir /s /q .vercel
if exist out rmdir /s /q out
echo Done!
echo.

echo Step 2: Clearing npm cache...
call npm cache clean --force
echo Done!
echo.

echo Step 3: Fresh install...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Install failed!
    exit /b 1
)
echo Done!
echo.

echo Step 4: Building from scratch...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    exit /b 1
)
echo Done!
echo.

echo ================================
echo   ChunkLoadError should be fixed!
echo ================================
echo.
echo Next steps:
echo   1. Run: npm run dev
echo   2. Open: http://localhost:3000
echo   3. Hard refresh browser: Ctrl+Shift+R
echo   4. Check console (F12) for errors
echo.
echo If you still see ChunkLoadError:
echo   - Clear browser cache completely
echo   - Try incognito/private window
echo   - Try different browser
echo.
echo Ready to test!
echo.

pause
