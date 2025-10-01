#!/bin/bash

echo "🚀 Deploying with video upload fixes..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "🔍 To monitor logs:"
echo "1. Go to Vercel dashboard"
echo "2. Click on your project"
echo "3. Go to Functions tab"
echo "4. Click 'View Function Logs'"
echo ""
echo "🧪 To test video upload:"
echo "1. Go to your deployed app"
echo "2. Fill out the form"
echo "3. Upload a video for expressions"
echo "4. Check the logs for detailed error messages"