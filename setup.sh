#!/bin/bash

# Akanbi Farm Hub - Development Setup Script
# This script helps you get started quickly

echo "🌾 Welcome to Akanbi Farm Hub Setup!"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install root dependencies
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo "✅ Frontend dependencies installed"
echo ""

# Install function dependencies
echo "📦 Installing backend dependencies..."
cd netlify/functions
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    cd ../..
    exit 1
fi

cd ../..
echo "✅ Backend dependencies installed"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  No .env file found"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ Created .env file"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file with your credentials before running!"
    echo ""
else
    echo "✅ .env file exists"
fi

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your Google Sheets and Twilio credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Or run 'netlify dev' to test with backend functions"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - README.md (comprehensive guide)"
echo "   - QUICKSTART.md (30-minute setup)"
echo "   - SETUP_CHECKLIST.md (step-by-step)"
echo ""
echo "Good luck! 🚀"
