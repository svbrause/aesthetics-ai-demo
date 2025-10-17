# Pastel Blue Theme - Reversion Guide

This document contains all the changes made to implement the pastel blue theme. To revert to the original colors, simply reverse these changes.

## Files Modified

### 1. `/src/components/ui/SeverityScale.tsx`

**Changes Made:**

- Severity scale gradient: `#3b82f6, #1e40af` → `#dbeafe, #93c5fd`
- Severity labels: `text-blue-700 bg-blue-50 border-blue-200` → `text-blue-300 bg-gray-700 border-gray-600`

**To Revert:**

```tsx
// Line 57: Change gradient back
style={{
  background: "linear-gradient(to right, #3b82f6, #1e40af)",
}}

// Line 73: Change label styling back
className={`${labelSizeClasses[size]} text-blue-700 font-medium bg-blue-50 px-2 py-1 rounded-md shadow-sm border border-blue-200`}
```

### 2. `/src/components/provider/AnalysisView.tsx`

**Changes Made:**

- Header pills: `bg-blue-50 text-blue-700 border-blue-200` → `bg-gray-700 text-blue-300 border-gray-600`
- Action buttons: `from-cyan-600 to-blue-600` → `from-blue-100 to-blue-200` with `text-blue-800 border-blue-300`
- Disabled buttons: `from-cyan-600 to-blue-600` → `from-blue-100 to-blue-200` with `text-blue-500`
- Selected area buttons: `bg-cyan-500/25` → `bg-blue-100` with `text-blue-800 border-blue-300`
- Card backgrounds: `from-blue-900/30 to-cyan-900/30 border-blue-700/50` → `from-blue-100/20 to-blue-200/20 border-blue-300/50`
- Card hover effects: `hover:border-blue-600/70` → `hover:border-blue-400/70`
- Card shadows: `hover:shadow-blue-500/20` → `hover:shadow-blue-300/20`
- Area header gradient: `from-blue-400 to-cyan-500` → `from-blue-300 to-blue-400`
- Link colors: `text-blue-400 hover:text-blue-300` → `text-blue-300 hover:text-blue-200`

**To Revert:**

```tsx
// Header pills (line 1799)
<div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">

// Action buttons (multiple lines)
className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"

// Disabled buttons
className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-not-allowed"

// Selected area buttons
className="bg-cyan-500/25 text-white border-cyan-400/40 shadow-md backdrop-blur-md"

// Card backgrounds (lines 900, 1842)
className="p-3 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-700/50 hover:border-blue-600/70 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20 group"

// Area header gradient (line 1772)
<div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full"></div>

// Link colors (lines 521, 1361)
className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
```

## Color Mapping Reference

| Element            | Original                            | Pastel Theme                        |
| ------------------ | ----------------------------------- | ----------------------------------- |
| Severity Scale     | `#3b82f6` to `#1e40af`              | `#dbeafe` to `#93c5fd`              |
| Severity Labels    | `text-blue-700 bg-blue-50`          | `text-blue-300 bg-gray-700`         |
| Action Buttons     | `from-cyan-600 to-blue-600`         | `from-blue-100 to-blue-200`         |
| Selected States    | `bg-cyan-500/25`                    | `bg-blue-100`                       |
| Card Backgrounds   | `from-blue-900/30 to-cyan-900/30`   | `from-blue-100/20 to-blue-200/20`   |
| Area Headers       | `from-blue-400 to-cyan-500`         | `from-blue-300 to-blue-400`         |
| Links              | `text-blue-400`                     | `text-blue-300`                     |
| Filter Buttons     | `bg-cyan-500/20 text-cyan-400`      | `bg-blue-200/30 text-blue-300`      |
| Shortlist Items    | `bg-gray-700/30 border-gray-600/50` | `bg-blue-100/20 border-blue-300/50` |
| Treatment Buttons  | `from-green-600 to-emerald-600`     | `from-green-200 to-emerald-200`     |
| Status Indicators  | `bg-green-500`                      | `bg-green-400`                      |
| Vertical Separator | `bg-gray-600`                       | `bg-blue-300`                       |
| Area Headers       | `from-cyan-400 to-blue-500`         | `from-blue-300 to-blue-400`         |

## Quick Revert Commands

To quickly revert all changes, run these search and replace operations:

```bash
# In SeverityScale.tsx
sed -i 's/#dbeafe, #93c5fd/#3b82f6, #1e40af/g' src/components/ui/SeverityScale.tsx
sed -i 's/text-blue-300 font-medium bg-gray-700/text-blue-700 font-medium bg-blue-50/g' src/components/ui/SeverityScale.tsx
sed -i 's/border-gray-600/border-blue-200/g' src/components/ui/SeverityScale.tsx

# In AnalysisView.tsx
sed -i 's/bg-gray-700 text-blue-300 border-gray-600/bg-blue-50 text-blue-700 border-blue-200/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-blue-100 to-blue-200 text-blue-800/from-cyan-600 to-blue-600 text-white/g' src/components/provider/AnalysisView.tsx
sed -i 's/border-blue-300/border-cyan-400/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-blue-100 text-blue-800/bg-cyan-500\/25 text-white/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-blue-100\/20 to-blue-200\/20/from-blue-900\/30 to-cyan-900\/30/g' src/components/provider/AnalysisView.tsx
sed -i 's/border-blue-300\/50/border-blue-700\/50/g' src/components/provider/AnalysisView.tsx
sed -i 's/hover:border-blue-400\/70/hover:border-blue-600\/70/g' src/components/provider/AnalysisView.tsx
sed -i 's/hover:shadow-blue-300\/20/hover:shadow-blue-500\/20/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-blue-300 to-blue-400/from-blue-400 to-cyan-500/g' src/components/provider/AnalysisView.tsx
sed -i 's/text-blue-300 hover:text-blue-200/text-blue-400 hover:text-blue-300/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-blue-200\/30 text-blue-300/bg-cyan-500\/20 text-cyan-400/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-blue-100\/20 border-blue-300\/50/bg-gray-700\/30 border-gray-600\/50/g' src/components/provider/AnalysisView.tsx
sed -i 's/hover:bg-blue-200\/30/hover:bg-gray-700\/50/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-green-200 to-emerald-200/from-green-600 to-emerald-600/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-green-200\/30 text-green-300/bg-green-600\/20 text-green-400/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-green-400/bg-green-500/g' src/components/provider/AnalysisView.tsx
sed -i 's/bg-blue-300/bg-gray-600/g' src/components/provider/AnalysisView.tsx
sed -i 's/from-blue-300 to-blue-400/from-cyan-400 to-blue-500/g' src/components/provider/AnalysisView.tsx

# In ProviderDashboard.tsx
sed -i 's/from-blue-200 to-blue-300/from-blue-600 to-blue-800/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-blue-200\/30/bg-blue-600\/20/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/border-blue-300\/50/border-blue-500\/50/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/text-blue-300/text-blue-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-purple-200 to-purple-300/from-purple-600 to-purple-800/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-purple-200\/30/bg-purple-600\/20/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/border-purple-300\/50/border-purple-500\/50/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/text-purple-300/text-purple-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-green-200 to-green-300/from-green-600 to-green-800/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-green-200\/30/bg-green-600\/20/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/border-green-300\/50/border-green-500\/50/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/text-green-300/text-green-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-orange-200 to-orange-300/from-orange-600 to-orange-800/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-orange-200\/30/bg-orange-600\/20/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/border-orange-300\/50/border-orange-500\/50/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/text-orange-300/text-orange-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-gray-200 to-gray-300/from-gray-600 to-gray-800/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-gray-200\/30/bg-gray-600\/20/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/border-gray-300\/50/border-gray-500\/50/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/text-gray-300/text-gray-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-blue-200 to-purple-200/from-blue-600 to-purple-600/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/from-green-200 to-emerald-200/from-green-600 to-emerald-600/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-green-400/bg-green-500/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-blue-400/bg-blue-500/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-green-200\/30 text-green-300/bg-green-500\/20 text-green-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-yellow-200\/30 text-yellow-300/bg-yellow-500\/20 text-yellow-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-blue-200\/30 text-blue-300/bg-blue-500\/20 text-blue-400/g' src/components/provider/ProviderDashboard.tsx
sed -i 's/bg-gray-200\/30 text-gray-300/bg-gray-500\/20 text-gray-400/g' src/components/provider/ProviderDashboard.tsx
```

## Notes

- The pastel theme maintains the same functionality and layout
- All interactive elements remain fully functional
- The theme is more subtle and medical-appropriate
- Colors are easier on the eyes and less "techy"
- All changes are contained within the two main component files

### 3. `/src/components/provider/ProviderDashboard.tsx`

**Changes Made:**

- Color scheme gradients: All gradients changed from `-600/-800` to `-200/-300`
- Color scheme backgrounds: All backgrounds changed from `-600/20` to `-200/30`
- Color scheme borders: All borders changed from `-500/50` to `-300/50`
- Color scheme text: All text changed from `-400` to `-300`
- Action buttons: `from-blue-600 to-purple-600` → `from-blue-200 to-purple-200` with `text-blue-800 border-blue-300`
- Add patient buttons: `from-green-600 to-emerald-600` → `from-green-200 to-emerald-200` with `text-green-800 border-green-300`
- Status indicators: `bg-green-500` → `bg-green-400`, `bg-blue-500` → `bg-blue-400`
- Status badges: All status badges updated to pastel colors

**To Revert:**

```tsx
// Color scheme (lines 222-254)
case "blue":
  return {
    gradient: "from-blue-600 to-blue-800",
    bg: "bg-blue-600/20",
    border: "border-blue-500/50",
    text: "text-blue-400",
  };

// Action buttons (lines 328, 337)
className="text-xs flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"

// Status indicators (lines 295, 410)
<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
<div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />

// Status badges (lines 358-364)
case "patient-reviewed":
  return "bg-green-500/20 text-green-400 border-green-500/50";
case "provider-only":
  return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
case "joint-review":
  return "bg-blue-500/20 text-blue-400 border-blue-500/50";
default:
  return "bg-gray-500/20 text-gray-400 border-gray-500/50";
```

## Additional Pastel Theme Elements

### AnalysisView Component Extensions

**Changes Made:**

- Filter/sort button active states: `bg-cyan-500/20 text-cyan-400` → `bg-blue-200/30 text-blue-300`
- Shortlist item backgrounds: `bg-gray-700/30 border-gray-600/50` → `bg-blue-100/20 border-blue-300/50`
- Shortlist hover states: `hover:bg-gray-700/50` → `hover:bg-blue-200/30`
- Treatment plan buttons: `bg-green-600/20 text-green-400` → `bg-green-200/30 text-green-300`
- Treatment plan gradients: `from-green-600 to-emerald-600` → `from-green-200 to-emerald-200` with `text-green-800 border-green-300`
- Status indicators: `bg-green-500` → `bg-green-400`
- Vertical separator: `bg-gray-600` → `bg-blue-300`
- Area header gradient: `from-cyan-400 to-blue-500` → `from-blue-300 to-blue-400`

**To Revert:**

```tsx
// Filter/sort buttons (lines 488, 499, 1330, 1341)
className={`text-gray-400 hover:text-gray-200 p-2 ${
  showFilters ? "bg-cyan-500/20 text-cyan-400" : ""
}`}

// Shortlist items (lines 1051, 2009)
className="p-3 rounded-lg border transition-all duration-200 bg-gray-700/30 border-gray-600/50 hover:border-gray-500/70"

// Treatment plan buttons (lines 1091, 2049)
className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
  isInPlan
    ? "bg-green-600/20 text-green-400 cursor-not-allowed"
    : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
}`}

// Status indicators (lines 1278, 2238)
<div className="w-2 h-2 bg-green-500 rounded-full"></div>

// Vertical separator (line 509)
<div className="h-6 w-px bg-gray-600 mx-4 mt-6"></div>

// Area header gradient (line 1616)
className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"
```
