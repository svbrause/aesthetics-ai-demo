# Treatment Photos Guide

This guide explains how to manually change treatment photos in the aesthetics AI application.

## Overview

Treatment cards now display three types of images:

1. **Before/After Photos** - Side-by-side comparison showing treatment results
2. **Treatment Result Image** - Main treatment demonstration photo
3. **Before/After Images** are displayed when available, otherwise only the treatment result image is shown

## File Locations

### Treatment Data

- **File**: `src/data/treatmentsData.ts`
- **Purpose**: Contains all treatment information including photo paths

### Photo Storage

- **Directory**: `public/treatment-photos/`
- **Structure**: Organized by treatment category (botox, fillers, laser, etc.)

## How to Change Treatment Photos

### 1. Adding Before/After Photos

To add before/after photos to a treatment, edit the treatment object in `src/data/treatmentsData.ts`:

```typescript
{
  id: 1,
  name: "Juvederm Voluma",
  // ... other properties
  beforeAfter: [
    {
      before: "/path/to/before-image.jpg",
      after: "/path/to/after-image.jpg",
      label: "Cheek Volume Restoration"
    }
  ],
  // ... rest of properties
}
```

### 2. Changing Treatment Result Images

To change the main treatment result image, update the `image` property:

```typescript
{
  id: 1,
  name: "Juvederm Voluma",
  // ... other properties
  image: "/treatment-photos/fillers/new-filler-image.jpg",
  // ... rest of properties
}
```

### 3. Photo File Requirements

#### Before/After Photos

- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 400x300 pixels minimum
- **Aspect Ratio**: 4:3 or 16:9 works best
- **Location**: Store in `public/` directory

#### Treatment Result Images

- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 600x400 pixels minimum
- **Aspect Ratio**: 3:2 or 4:3 works best
- **Location**: Store in `public/treatment-photos/[category]/`

## Step-by-Step Instructions

### For Before/After Photos:

1. **Add your photos to the public directory**:

   ```
   public/
   ├── before-treatment-1.jpg
   ├── after-treatment-1.jpg
   ├── before-treatment-2.jpg
   └── after-treatment-2.jpg
   ```

2. **Edit the treatment data**:

   - Open `src/data/treatmentsData.ts`
   - Find the treatment you want to modify
   - Add or update the `beforeAfter` array:

   ```typescript
   beforeAfter: [
     {
       before: "/before-treatment-1.jpg",
       after: "/after-treatment-1.jpg",
       label: "Your Treatment Description",
     },
   ];
   ```

### For Treatment Result Images:

1. **Add your image to the appropriate category folder**:

   ```
   public/treatment-photos/
   ├── botox/
   │   └── new-botox-image.jpg
   ├── fillers/
   │   └── new-filler-image.jpg
   └── laser/
       └── new-laser-image.jpg
   ```

2. **Update the image path**:
   ```typescript
   image: "/treatment-photos/botox/new-botox-image.jpg";
   ```

## Current Treatment Categories

The following categories have dedicated folders in `public/treatment-photos/`:

- `botox/` - Botox and neurotoxin treatments
- `chemical-peels/` - Chemical peel treatments
- `fillers/` - Injectable filler treatments
- `laser/` - Laser treatments
- `microneedling/` - Microneedling treatments
- `other/` - Other treatments (browlift, canthopexy, etc.)
- `skincare/` - Skincare treatments
- `surgical/` - Surgical treatments

## Tips for Best Results

1. **Consistent Lighting**: Use photos with similar lighting conditions for before/after comparisons
2. **Same Angle**: Ensure before and after photos are taken from the same angle
3. **High Quality**: Use high-resolution images for better display quality
4. **File Naming**: Use descriptive names like `botox-before-crows-feet.jpg`
5. **Compression**: Optimize images for web use to improve loading times

## Troubleshooting

### Images Not Displaying

- Check that the file path is correct and starts with `/`
- Ensure the image file exists in the specified location
- Verify the file format is supported (JPG, PNG, WebP)

### Layout Issues

- If before/after photos look distorted, check the aspect ratio
- Ensure images are properly sized (see recommended dimensions above)

### Performance Issues

- Compress large images before adding them
- Consider using WebP format for better compression

## Example: Complete Treatment Update

```typescript
{
  id: 5,
  name: "Laser Skin Resurfacing",
  category: "Laser Treatments",
  area: "face",
  goal: "Skin Rejuvenation",
  price: 800,
  duration: "6-12 months",
  downtime: "7-14 days",
  invasiveness: "Moderate" as const,
  description: "Fractional laser treatment for skin rejuvenation",
  image: "/treatment-photos/laser/laser-resurfacing.jpg",
  beforeAfter: [
    {
      before: "/laser-before-treatment.jpg",
      after: "/laser-after-treatment.jpg",
      label: "Skin Rejuvenation Results"
    }
  ],
  benefits: ["Reduced fine lines", "Improved texture", "Even skin tone"],
  risks: ["Redness", "Swelling", "Temporary darkening"],
  serves: ["Fine Lines", "Uneven Skin Tone"],
}
```

This will display:

- Before/after photos side by side at the top
- Treatment result image below
- All treatment details in the right column below the description
