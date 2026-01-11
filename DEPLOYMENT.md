# LogicLoom Deployment Guide

## Production Deployment (Vercel)

LogicLoom is architected for deployment on **Vercel**, which provides the best support for Next.js features like Server Actions, Image Optimization, and API Routes.

### 1. Prerequisites
- GitHub Repository (Private recommended)
- Vercel Account
- Supabase Account

### 2. Initial Setup

1. **Push to GitHub**
   Ensure your latest code is pushed to your repository.
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main

```

2. **Import to Vercel**
* Go to [Vercel Dashboard](https://vercel.com/dashboard)
* Click **"Add New..."** -> **"Project"**
* Import your `LogicLoom` repository
* Framework Preset: **Next.js** (Auto-detected)


3. **Configure Environment Variables**
In the Vercel deployment screen, add the following variables (copy values from your local `.env` or Supabase):
| Name | Value Source |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase > Settings > API |


4. **Deploy**
* Click **"Deploy"**
* Wait for the build to complete (approx. 1-2 minutes)



---

## Supabase Configuration

### 1. Database Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to **SQL Editor**
4. Paste the content of `db/schema.sql` from this repository
5. Run the query to set up tables and security policies

### 2. Connect to LogicLoom

Ensure the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in your Vercel Project Settings.

---

## Maintenance & Monitoring

### Production Updates

Vercel automatically deploys every time you push to the `main` branch.

1. Make changes locally
2. Test with `npm run dev`
3. Push to GitHub: `git push origin main`
4. Vercel detects the push and redeploys automatically

### Environment Variables

If you need to add new secrets (e.g., Stripe keys in the future):

1. Go to Vercel Project Settings > **Environment Variables**
2. Add the new key-value pair
3. Redeploy the latest commit for changes to take effect

### Troubleshooting

* **Build Logs:** Check the "Deployments" tab in Vercel to see build errors.
* **Runtime Logs:** Check the "Logs" tab in Vercel for server-side errors during execution.

---

## Security Checklist


* [x] `.env` files are excluded from Git (`.gitignore`)
* [x] Environment variables uses `NEXT_PUBLIC_` prefix only for non-sensitive data
* [x] Security headers are configured in `next.config.mjs`
