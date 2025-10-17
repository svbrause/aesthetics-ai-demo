# Demo Form Setup Guide

This guide will help you set up the demo form at `/demo-form` with Airtable integration.

## Features

- **Multi-step form** with progress tracking
- **Vimeo video integration** (https://vimeo.com/910222701)
- **Photo upload functionality** for facial analysis
- **Airtable integration** for form submissions
- **Responsive design** with modern UI components

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Airtable Setup

1. Create a new Airtable base or use an existing one
2. Create a table called "Form Submissions" with the following fields:

   - First Name (Single line text)
   - Last Name (Single line text)
   - Email (Email)
   - Phone (Phone number)
   - Previous Procedures (Long text)
   - Goals (Single line text)
   - Front Photo (Single line text)
   - Left Side Photo (Single line text)
   - Right Side Photo (Single line text)
   - Expressions Video (Single line text)
   - Submission Date (Date)
   - Status (Single select: New, In Progress, Completed)

3. Get your API key from https://airtable.com/create/tokens
4. Get your base ID from the Airtable API documentation

## Form Steps

1. **Video Introduction** - Embedded Vimeo video
2. **Personal Information** - Name, email, phone
3. **Previous Procedures** - Multi-select checkboxes
4. **Your Goals** - Radio button selection
5. **Photo Instructions** - Step-by-step guide with images
6. **Upload Photos** - File upload for photos and video
7. **Review & Submit** - Summary and submission

## Photo Instructions

The form includes detailed photo-taking instructions with images from the "Scanning Guide Photos" folder:

1. Find good lighting
2. Position yourself
3. Neutral expression
4. Look straight ahead
5. Turn to the left
6. Turn to the right
7. Look up slightly

## File Uploads

Users can upload:

- Front-facing neutral expression photo
- Left side profile photo
- Right side profile photo
- Facial expressions video

## Deployment

To deploy to `app.ponce.ai/face/demo-form`:

1. Set up your environment variables in your deployment platform
2. Deploy the Next.js application
3. Configure your domain routing to point to the demo-form page

## Customization

- Modify the form steps in `src/app/demo-form/page.tsx`
- Update the Airtable fields in `src/app/api/demo-form-submit/route.ts`
- Customize the styling in the component files
- Add validation rules as needed

## Troubleshooting

- Ensure all environment variables are set correctly
- Check that the Airtable base and table exist
- Verify that the API key has the correct permissions
- Check the browser console for any JavaScript errors
