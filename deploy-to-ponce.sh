#!/bin/bash

# Deploy to app.ponce.ai/face/demo-form
echo "🚀 Deploying to app.ponce.ai/face/demo-form..."

# Build the project
echo "📦 Building project..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Your demo form will be available at: https://app.ponce.ai/face/demo-form"
echo ""
echo "📋 Next steps:"
echo "1. Configure custom domain 'app.ponce.ai' in Vercel dashboard"
echo "2. Update DNS settings to point to Vercel"
echo "3. Test the URL: https://app.ponce.ai/face/demo-form"