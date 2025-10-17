#!/bin/bash

# Apply Charcoal Theme
echo "Applying Charcoal Theme..."

# SeverityScale.tsx
sed -i 's/#dbeafe, #93c5fd/#374151, #6b7280/g' src/components/ui/SeverityScale.tsx
sed -i 's/text-blue-300 font-medium bg-gray-700/text-gray-200 font-medium bg-gray-800/g' src/components/ui/SeverityScale.tsx

# AnalysisView.tsx
sed -i 's/bg-gray-700 text-blue-300/bg-gray-800 text-gray-200/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-blue-100 to-blue-200 text-blue-800/from-gray-700 to-gray-600 text-gray-200/g' src/components/provider/AnalysisView.tsx
sed -i 's/border-blue-300/border-gray-500/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-blue-100 text-blue-800/bg-gray-700 text-gray-200/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-blue-100\/20 to-blue-200\/20/from-gray-800\/30 to-gray-700\/30/g' src/components/provider/AnalysisView.tsx
sed -i 's/border-blue-300\/50/border-gray-600\/50/g' src/components/provider/AnalysisView.tsx
sed -i 's/hover:border-blue-400\/70/hover:border-gray-500\/70/g' src/components/provider/AnalysisView.tsx
sed -i 's/hover:shadow-blue-300\/20/hover:shadow-gray-500\/20/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-blue-300 to-blue-400/from-gray-600 to-gray-500/g' src/components/provider/AnalysisView.tsx
sed -i 's/text-blue-300 hover:text-blue-200/text-gray-300 hover:text-gray-200/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-blue-200\/30 text-blue-300/bg-gray-700\/50 text-gray-200/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-blue-100\/20 border-blue-300\/50/bg-gray-800\/40 border-gray-600\/50/g' src/components/provider/AnalysisView.tsx
sed -i 's/hover:bg-blue-200\/30/hover:bg-gray-700\/50/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-green-200 to-emerald-200/from-gray-700 to-gray-600/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-green-200\/30 text-green-300/bg-gray-700\/50 text-gray-400/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-green-400/bg-gray-400/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-blue-300/bg-gray-500/g' src/components/provider/AnalysisView.tsx

# ProviderDashboard.tsx
sed -i 's/from-blue-200 to-blue-300/from-gray-700 to-gray-800/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-blue-200\/30/bg-gray-800\/40/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/border-blue-300\/50/border-gray-600\/50/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/text-blue-300/text-gray-200/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-purple-200 to-purple-300/from-gray-700 to-gray-800/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-purple-200\/30/bg-gray-800\/40/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/border-purple-300\/50/border-gray-600\/50/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/text-purple-300/text-gray-200/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-green-200 to-green-300/from-gray-700 to-gray-800/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-green-200\/30/bg-gray-800\/40/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/border-green-300\/50/border-gray-600\/50/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/text-green-300/text-gray-200/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-orange-200 to-orange-300/from-gray-700 to-gray-800/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-orange-200\/30/bg-gray-800\/40/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/border-orange-300\/50/border-gray-600\/50/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/text-orange-300/text-gray-200/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-gray-200 to-gray-300/from-gray-700 to-gray-800/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-gray-200\/30/bg-gray-800\/40/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/border-gray-300\/50/border-gray-600\/50/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/text-gray-300/text-gray-200/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-blue-200 to-purple-200/from-gray-700 to-gray-600/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-green-200 to-emerald-200/from-gray-700 to-gray-600/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-green-400/bg-gray-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-blue-400/bg-gray-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-green-200\/30 text-green-300/bg-gray-700\/50 text-gray-200/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-yellow-200\/30 text-yellow-300/bg-gray-700\/50 text-gray-200/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-blue-200\/30 text-blue-300/bg-gray-700\/50 text-gray-200/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-gray-200\/30 text-gray-300/bg-gray-700\/50 text-gray-200/g' src/components/provider/ProviderDashboard.tsx

echo "✅ Charcoal theme applied successfully!"
echo "Visit http://localhost:3000/test-severity to see the changes"

