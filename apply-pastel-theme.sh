#!/bin/bash

# Apply Pastel Blue Theme
echo "Applying Pastel Blue Theme..."

# SeverityScale.tsx
sed -i 's/#374151, #6b7280/#dbeafe, #93c5fd/g' src/components/ui/SeverityScale.tsx
sed -i 's/text-gray-200 font-medium bg-gray-800/text-blue-300 font-medium bg-gray-700/g' src/components/ui/SeverityScale.tsx

# AnalysisView.tsx
sed -i 's/bg-gray-800 text-gray-200/bg-gray-700 text-blue-300/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-gray-700 to-gray-600 text-gray-200/from-blue-100 to-blue-200 text-blue-800/g' src/components/provider/AnalysisView.tsx
sed -i 's/border-gray-500/border-blue-300/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-gray-700 text-gray-200/bg-blue-100 text-blue-800/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-gray-800\/30 to-gray-700\/30/from-blue-100\/20 to-blue-200\/20/g' src/components/provider/AnalysisView.tsx
sed -i 's/border-gray-600\/50/border-blue-300\/50/g' src/components/provider/AnalysisView.tsx
sed -i 's/hover:border-gray-500\/70/hover:border-blue-400\/70/g' src/components/provider/AnalysisView.tsx
sed -i 's/hover:shadow-gray-500\/20/hover:shadow-blue-300\/20/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-gray-600 to-gray-500/from-blue-300 to-blue-400/g' src/components/provider/AnalysisView.tsx
sed -i 's/text-gray-300 hover:text-gray-200/text-blue-300 hover:text-blue-200/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-gray-700\/50 text-gray-200/bg-blue-200\/30 text-blue-300/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-gray-800\/40 border-gray-600\/50/bg-blue-100\/20 border-blue-300\/50/g' src/components/provider/AnalysisView.tsx
sed -i 's/hover:bg-gray-700\/50/hover:bg-blue-200\/30/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-gray-700 to-gray-600 text-gray-200/from-green-200 to-emerald-200 text-green-800/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-gray-700\/50 text-gray-400/bg-green-200\/30 text-green-300/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-gray-400/bg-green-400/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-gray-500/bg-blue-300/g' src/components/provider/AnalysisView.tsx

# ProviderDashboard.tsx
sed -i 's/from-gray-700 to-gray-800/from-blue-200 to-blue-300/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-gray-800\/40/bg-blue-200\/30/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/border-gray-600\/50/border-blue-300\/50/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/text-gray-200/text-blue-300/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 border border-gray-500/from-blue-200 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-blue-800 border border-blue-300/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 border border-gray-500/from-green-200 to-emerald-200 hover:from-green-300 hover:to-emerald-300 text-green-800 border border-green-300/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-gray-400/bg-green-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-gray-400/bg-blue-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-gray-700\/50 text-gray-200/bg-green-200\/30 text-green-300/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-gray-700\/50 text-gray-200/bg-yellow-200\/30 text-yellow-300/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-gray-700\/50 text-gray-200/bg-blue-200\/30 text-blue-300/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-gray-700\/50 text-gray-200/bg-gray-200\/30 text-gray-300/g' src/components/provider/ProviderDashboard.tsx

echo "✅ Pastel Blue theme applied successfully!"
echo "Visit http://localhost:3000/test-severity to see the changes"

