#!/bin/bash

# BlackCryptoNews - Quick Start Script
# This script will set up everything for you

echo "🚀 BlackCryptoNews - Quick Start"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the blackcryptonews directory"
    echo "   cd blackcryptonews"
    echo "   chmod +x quick-start.sh"
    echo "   ./quick-start.sh"
    exit 1
fi

echo "📦 Step 1: Cleaning old files..."
rm -rf .next node_modules package-lock.json
echo "✅ Clean!"
echo ""

echo "📦 Step 2: Installing dependencies..."
npm install
echo "✅ Dependencies installed!"
echo ""

echo "🔧 Step 3: Checking for API key..."
if [ ! -f ".env.local" ]; then
    if [ -f ".env.local.example" ]; then
        echo "📝 Creating .env.local file..."
        cp .env.local.example .env.local
        echo ""
        echo "⚠️  IMPORTANT: You need to add your OpenAI API key!"
        echo "   1. Get your key from: https://platform.openai.com/api-keys"
        echo "   2. Open .env.local and add your key"
        echo "   3. Run 'npm run dev' to start the server"
        echo ""
    else
        echo "⚠️  Warning: .env.local.example not found"
    fi
else
    echo "✅ .env.local already exists"
    echo ""
fi

echo "🔨 Step 4: Building the project..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Add your API key to .env.local (if not done)"
    echo "   2. Run: npm run dev"
    echo "   3. Open: http://localhost:3000"
    echo ""
    echo "🚀 Ready to launch!"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi
