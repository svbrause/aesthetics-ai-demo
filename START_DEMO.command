#!/bin/bash

echo "🚀 Starting Aesthetics AI Demo..."
echo "📱 This will open in your browser at http://localhost:3000"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org"
    echo "   Then run this script again."
    read -p "Press Enter to exit..."
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not available. Please install Node.js from https://nodejs.org"
    read -p "Press Enter to exit..."
    exit 1
fi

echo "✅ Node.js found. Installing dependencies..."
npm install

echo "✅ Starting the demo server..."
echo "🌐 Opening browser in 3 seconds..."
sleep 3

# Open browser
open http://localhost:3000

# Start the server
npm start
