# Gold Theme Test Guide

This guide explains how to use the new gold theme test version of the provider patient page.

## What's New

I've created a test version of the provider patient page with a black, gray, and gold color scheme that can be easily reverted back to the original colors.

## Files Created/Modified

### New Files:

- `src/app/test-gold-theme/page.tsx` - Test page with gold theme applied
- `src/components/ThemeToggle.tsx` - Theme switching component
- `GOLD_THEME_GUIDE.md` - This guide

### Modified Files:

- `src/app/globals.css` - Added gold theme CSS variables and overrides
- `src/contexts/ThemeContext.tsx` - Added gold theme support and theme switching
- `src/app/provider/patient/[id]/page.tsx` - Added theme toggle button

## How to Test

### Option 1: Test Page (Recommended)

1. Navigate to `/test-gold-theme` in your browser
2. You'll see the patient detail page with the gold theme applied
3. Use the theme toggle button in the top-right corner to switch between themes:
   - **Dark** - Original dark theme
   - **Light** - Light theme
   - **Gold** - New black/gray/gold theme

### Option 2: Main Provider Page

1. Navigate to `/provider/patient/1001` (or any patient ID)
2. Use the theme toggle button in the top-right corner to switch themes
3. The theme will persist across page refreshes (stored in localStorage)

## Gold Theme Colors

The gold theme uses the following color palette:

- **Background**: Pure black (#000000)
- **Cards**: Dark gray with transparency (rgba(31, 31, 31, 0.8))
- **Text Primary**: White (#ffffff)
- **Text Secondary**: Light gray (#d4d4d4)
- **Text Muted**: Medium gray (#a3a3a3)
- **Accent**: Gold (#d4af37)
- **Accent Hover**: Darker gold (#b8941f)
- **Borders**: Gray with transparency (rgba(120, 120, 120, 0.3))

## Reverting to Original Colors

The theme system is designed to be easily revertible:

1. **Automatic Revert**: When you navigate away from the test page, it automatically reverts to the dark theme
2. **Theme Toggle**: Use the theme toggle button to switch back to "Dark" theme
3. **localStorage**: The theme preference is saved, so you can refresh the page and it will remember your choice
4. **Manual Revert**: You can clear localStorage or modify the ThemeContext to default to dark theme

## Technical Details

### CSS Variables

The gold theme uses CSS custom properties defined in `globals.css`:

```css
.gold-theme {
  --background: #000000;
  --foreground: #ffffff;
  --card-bg: rgba(31, 31, 31, 0.8);
  --card-border: rgba(120, 120, 120, 0.3);
  --accent: #d4af37;
  --accent-hover: #b8941f;
  /* ... more variables */
}
```

### Theme Context

The `ThemeContext` now supports three themes:

- `"dark"` - Original dark theme
- `"light"` - Light theme
- `"gold"` - New gold theme

### Theme Toggle

The `ThemeToggle` component cycles through all three themes when clicked.

## Testing Checklist

- [ ] Navigate to `/test-gold-theme` and verify gold theme is applied
- [ ] Use theme toggle to switch between all three themes
- [ ] Verify theme persists on page refresh
- [ ] Navigate away and back to verify auto-revert works
- [ ] Test on `/provider/patient/1001` with theme toggle
- [ ] Verify all UI elements (buttons, cards, text) use gold colors appropriately
- [ ] Check that the theme can be easily reverted to original colors

## Notes

- The gold theme maintains the same layout and functionality as the original
- All interactive elements (buttons, hover states, etc.) use the gold color scheme
- The theme is applied using CSS classes, making it easy to remove or modify
- The original dark theme remains unchanged and is the default
