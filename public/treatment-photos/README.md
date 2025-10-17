# Treatment Photos Directory

This directory contains photos for treatment cards in the aesthetics AI application.

## Directory Structure

```
treatment-photos/
├── botox/           # Botox and neurotoxin treatment photos
├── fillers/         # Injectable filler treatment photos
├── surgical/        # Surgical procedure photos
├── other/           # Other treatment types (laser, peels, etc.)
└── README.md        # This file
```

## How to Add Treatment Photos

1. **Choose the appropriate subdirectory** based on treatment type:

   - `botox/` - For Botox, Dysport, and other neurotoxin treatments
   - `fillers/` - For Juvederm, Restylane, and other injectable fillers
   - `surgical/` - For surgical procedures like blepharoplasty, brow lift
   - `other/` - For laser treatments, chemical peels, microneedling, etc.

2. **Name your files descriptively**:

   - Use lowercase with hyphens: `juvederm-voluma-cheek-enhancement.jpg`
   - Include treatment name and area: `botox-forehead-lines.jpg`
   - Add result type if needed: `lip-filler-volume-increase.jpg`

3. **Image specifications**:

   - **Format**: JPG or PNG
   - **Aspect ratio**: 4:3 or 16:9 works best for the card layout
   - **Resolution**: Minimum 800x600px, recommended 1200x900px or higher
   - **File size**: Keep under 2MB for web performance

4. **Update the treatment data**:
   - Open `src/data/treatmentsData.ts`
   - Find the treatment you want to add a photo for
   - Update the `image` field with the new path:
     ```typescript
     image: "/treatment-photos/fillers/juvederm-voluma-cheek-enhancement.jpg";
     ```

## Example File Structure

```
treatment-photos/
├── botox/
│   ├── botox-forehead-lines.jpg
│   ├── botox-crows-feet.jpg
│   └── botox-brow-lift.jpg
├── fillers/
│   ├── juvederm-voluma-cheeks.jpg
│   ├── restylane-lips.jpg
│   └── tear-trough-filler.jpg
├── surgical/
│   ├── upper-blepharoplasty.jpg
│   ├── lower-blepharoplasty.jpg
│   └── brow-lift-surgical.jpg
└── other/
    ├── laser-skin-resurfacing.jpg
    ├── chemical-peel.jpg
    └── microneedling.jpg
```

## Tips for Good Treatment Photos

- **Consistent lighting**: Use natural or professional lighting
- **Clear results**: Show the treatment outcome clearly
- **Professional quality**: High-resolution, well-composed images
- **Appropriate content**: Ensure photos are suitable for medical/aesthetic context
- **Privacy**: Ensure proper consent and HIPAA compliance if using real patient photos

## Current Treatment Images

The following treatments now use real treatment photos:

- **Botox treatments**: Use neurotoxin photos from `/treatment-photos/botox/`
- **Filler treatments**: Use filler photos from `/treatment-photos/fillers/`
- **Surgical procedures**: Use surgical photos from `/treatment-photos/surgical/`
- **Chemical peels**: Use peel photos from `/treatment-photos/chemical-peels/`
- **Laser treatments**: Use laser photos from `/treatment-photos/laser/`
- **Microneedling**: Use microneedling photos from `/treatment-photos/microneedling/`
- **Skincare**: Use skincare photos from `/treatment-photos/skincare/`
- **Other treatments**: Use other photos from `/treatment-photos/other/`

All treatment photos have been automatically downloaded and organized from the Airtable CSV data.
