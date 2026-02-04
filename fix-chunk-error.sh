#!/bin/bash

# BlackCryptoNews - ChunkLoadError Fix Script
# This script completely resets the project to fix chunk loading issues

echo "🔧 Fixing ChunkLoadError..."
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the blackcryptonews directory"
    exit 1
fi

echo "Step 1: Removing all build artifacts..."
rm -rf .next
rm -rf node_modules
rm -rf package-lock.json
rm -rf .vercel
rm -rf out
echo "✅ Cleaned!"
echo ""

echo "Step 2: Clearing npm cache..."
npm cache clean --force
echo "✅ Cache cleared!"
echo ""

echo "Step 3: Fresh install..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Install failed!"
    exit 1
fi
echo "✅ Installed!"
echo ""

echo "Step 4: Building from scratch..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi
echo "✅ Build successful!"
echo ""

echo "================================"
echo "✅ ChunkLoadError should be fixed!"
echo ""
echo "Next steps:"
echo "  1. Run: npm run dev"
echo "  2. Open: http://localhost:3000"
echo "  3. Hard refresh browser: Ctrl+Shift+R"
echo "  4. Check console (F12) for errors"
echo ""
echo "If you still see ChunkLoadError:"
echo "  - Clear browser cache completely"
echo "  - Try incognito/private window"
echo "  - Try different browser"
echo ""
echo "🚀 Ready to test!"
