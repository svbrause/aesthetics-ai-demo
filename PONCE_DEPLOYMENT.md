# 🌐 Deploy to app.ponce.ai/face/demo-form

## Quick Deployment

### Option 1: Automated Script (Recommended)

```bash
# Run the deployment script
./deploy-to-ponce.sh
```

### Option 2: Manual Steps

1. **Build and Deploy:**

   ```bash
   npm run build
   npx vercel --prod
   ```

2. **Configure Domain in Vercel:**

   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to "Settings" → "Domains"
   - Add `app.ponce.ai` as custom domain

3. **DNS Configuration:**
   - Add CNAME record: `app` → `cname.vercel-dns.com`
   - Or use Vercel nameservers if you control the domain

## URL Structure

- **Main URL:** `https://app.ponce.ai/face/demo-form`
- **Redirect:** `https://app.ponce.ai/face` → `/face/demo-form`
- **Local Development:** `http://localhost:3000/face/demo-form`

## File Structure

```
src/app/
├── face/
│   ├── page.tsx              # Redirects to demo-form
│   └── demo-form/
│       └── page.tsx          # Main demo form
└── demo-form/                # Original location (kept for compatibility)
    └── page.tsx
```

## Environment Variables

Make sure these are set in Vercel:

```env
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_API_KEY=your_api_key
```

## Testing

1. **Local Test:**

   ```bash
   npm run dev
   # Visit: http://localhost:3000/face/demo-form
   ```

2. **Production Test:**
   - Visit: `https://app.ponce.ai/face/demo-form`
   - Test form submission
   - Verify Airtable integration

## Troubleshooting

- **Domain not working:** Check DNS propagation (can take 24-48 hours)
- **Build errors:** Run `npm install` and `npm run build`
- **Vercel deployment fails:** Check environment variables are set
- **Form not submitting:** Verify Airtable credentials

## Features

✅ **Responsive Design** - Works on all devices  
✅ **Airtable Integration** - Form submissions saved to database  
✅ **Success Page** - Confirmation after submission  
✅ **Ponce AI Branding** - Consistent with brand identity  
✅ **Photo Upload** - Multiple photo types supported  
✅ **Validation** - Email and phone validation  
✅ **Progress Tracking** - Step-by-step form completion

## Support

If you need help with deployment:

1. Check Vercel dashboard for deployment logs
2. Verify DNS settings are correct
3. Test locally first with `npm run dev`
4. Contact support if issues persist
