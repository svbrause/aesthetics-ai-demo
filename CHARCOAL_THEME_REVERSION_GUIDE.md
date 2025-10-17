# Charcoal Theme - Reversion Guide

This document contains all the changes made to implement the charcoal/black/grey theme. This is an alternative to the pastel blue theme for comparison.

## Theme Overview

The charcoal theme uses:

- **Primary**: Charcoal/black backgrounds (`bg-gray-800`, `bg-gray-900`)
- **Secondary**: Medium grey accents (`bg-gray-700`, `bg-gray-600`)
- **Text**: Light grey/white text (`text-gray-200`, `text-white`)
- **Borders**: Subtle grey borders (`border-gray-600`, `border-gray-500`)
- **Accents**: Silver/light grey highlights (`bg-gray-400`, `text-gray-300`)

## Files Modified

### 1. `/src/components/ui/SeverityScale.tsx`

**Changes Made:**

- Severity scale gradient: `#dbeafe, #93c5fd` → `#374151, #6b7280` (charcoal to medium grey)
- Severity labels: `text-blue-300 bg-gray-700 border-gray-600` → `text-gray-200 bg-gray-800 border-gray-600`

**To Revert:**

```tsx
// Line 57: Change gradient back to pastel blue
style={{
  background: "linear-gradient(to right, #dbeafe, #93c5fd)",
}}

// Line 73: Change label styling back to pastel blue
className={`${labelSizeClasses[size]} text-blue-300 font-medium bg-gray-700 px-2 py-1 rounded-md shadow-sm border border-gray-600`}
```

### 2. `/src/components/provider/AnalysisView.tsx`

**Changes Made:**

- Header pills: `bg-gray-700 text-blue-300 border-gray-600` → `bg-gray-800 text-gray-200 border-gray-600`
- Action buttons: `from-blue-100 to-blue-200 text-blue-800` → `from-gray-700 to-gray-600 text-gray-200`
- Disabled buttons: `from-blue-100 to-blue-200 text-blue-500` → `from-gray-700 to-gray-600 text-gray-400`
- Selected area buttons: `bg-blue-100 text-blue-800 border-blue-300` → `bg-gray-700 text-gray-200 border-gray-500`
- Card backgrounds: `from-blue-100/20 to-blue-200/20 border-blue-300/50` → `from-gray-800/30 to-gray-700/30 border-gray-600/50`
- Card hover effects: `hover:border-blue-400/70` → `hover:border-gray-500/70`
- Card shadows: `hover:shadow-blue-300/20` → `hover:shadow-gray-500/20`
- Area header gradient: `from-blue-300 to-blue-400` → `from-gray-600 to-gray-500`
- Link colors: `text-blue-300 hover:text-blue-200` → `text-gray-300 hover:text-gray-200`
- Filter/sort buttons: `bg-blue-200/30 text-blue-300` → `bg-gray-700/50 text-gray-200`
- Shortlist items: `bg-blue-100/20 border-blue-300/50` → `bg-gray-800/40 border-gray-600/50`
- Treatment buttons: `from-green-200 to-emerald-200 text-green-800` → `from-gray-700 to-gray-600 text-gray-200`
- Status indicators: `bg-green-400` → `bg-gray-400`
- Vertical separator: `bg-blue-300` → `bg-gray-500`

**To Revert:**

```tsx
// Header pills (line 1799)
<div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-blue-300 border border-gray-600">

// Action buttons (multiple lines)
className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 hover:from-blue-200 hover:to-blue-300 border border-blue-300"

// Selected area buttons
className="bg-blue-100 text-blue-800 border-blue-300 shadow-sm"

// Card backgrounds (lines 900, 1842)
className="p-3 bg-gradient-to-r from-blue-100/20 to-blue-200/20 border-blue-300/50 hover:border-blue-400/70 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-300/20 group"

// Area header gradient (line 1772)
<div className="w-1 h-6 bg-gradient-to-b from-blue-300 to-blue-400 rounded-full"></div>

// Link colors (lines 521, 1361)
className="text-xs text-blue-300 hover:text-blue-200 transition-colors"
```

### 3. `/src/components/provider/ProviderDashboard.tsx`

**Changes Made:**

- Color scheme gradients: All gradients changed from `-200/-300` to `-700/-800`
- Color scheme backgrounds: All backgrounds changed from `-200/30` to `-800/40`
- Color scheme borders: All borders changed from `-300/50` to `-600/50`
- Color scheme text: All text changed from `-300` to `-200`
- Action buttons: `from-blue-200 to-purple-200` → `from-gray-700 to-gray-600`
- Add patient buttons: `from-green-200 to-emerald-200` → `from-gray-700 to-gray-600`
- Status indicators: `bg-green-400` → `bg-gray-400`, `bg-blue-400` → `bg-gray-400`
- Status badges: All status badges updated to charcoal colors

**To Revert:**

```tsx
// Color scheme (lines 222-254)
case "blue":
  return {
    gradient: "from-blue-200 to-blue-300",
    bg: "bg-blue-200/30",
    border: "border-blue-300/50",
    text: "text-blue-300",
  };

// Action buttons (lines 328, 337)
className="text-xs flex items-center gap-2 bg-gradient-to-r from-blue-200 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-blue-800 border border-blue-300"

// Status indicators (lines 295, 410)
<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
<div className="absolute top-2 right-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />

// Status badges (lines 358-364)
case "patient-reviewed":
  return "bg-green-200/30 text-green-300 border-green-300/50";
case "provider-only":
  return "bg-yellow-200/30 text-yellow-300 border-yellow-300/50";
case "joint-review":
  return "bg-blue-200/30 text-blue-300 border-blue-300/50";
default:
  return "bg-gray-200/30 text-gray-300 border-gray-300/50";
```

## Color Mapping Reference

| Element            | Pastel Blue Theme                   | Charcoal Theme                      |
| ------------------ | ----------------------------------- | ----------------------------------- |
| Severity Scale     | `#dbeafe` to `#93c5fd`              | `#374151` to `#6b7280`              |
| Severity Labels    | `text-blue-300 bg-gray-700`         | `text-gray-200 bg-gray-800`         |
| Action Buttons     | `from-blue-100 to-blue-200`         | `from-gray-700 to-gray-600`         |
| Selected States    | `bg-blue-100`                       | `bg-gray-700`                       |
| Card Backgrounds   | `from-blue-100/20 to-blue-200/20`   | `from-gray-800/30 to-gray-700/30`   |
| Area Headers       | `from-blue-300 to-blue-400`         | `from-gray-600 to-gray-500`         |
| Links              | `text-blue-300`                     | `text-gray-300`                     |
| Filter Buttons     | `bg-blue-200/30 text-blue-300`      | `bg-gray-700/50 text-gray-200`      |
| Shortlist Items    | `bg-blue-100/20 border-blue-300/50` | `bg-gray-800/40 border-gray-600/50` |
| Treatment Buttons  | `from-green-200 to-emerald-200`     | `from-gray-700 to-gray-600`         |
| Status Indicators  | `bg-green-400`                      | `bg-gray-400`                       |
| Vertical Separator | `bg-blue-300`                       | `bg-gray-500`                       |

## Quick Theme Switch Commands

### Switch to Charcoal Theme:

```bash
# Apply charcoal theme
./apply-charcoal-theme.sh
```

### Switch to Pastel Blue Theme:

```bash
# Apply pastel blue theme
./apply-pastel-theme.sh
```

### Switch to Original Theme:

```bash
# Revert to original colors
./revert-to-original.sh
```

## Notes

- The charcoal theme provides a more monochromatic, professional look
- Better contrast and readability in some contexts
- More subtle and understated than the pastel theme
- All interactive elements remain fully functional
- Easy to switch between themes using the provided scripts

