# LogicLoom Deployment Guide

LogicLoom is standardized for deployment on **Vercel**, the creators of Next.js. This ensures the best performance, easiest setup, and full feature support (Server Components, Image Optimization, etc.).

## 🚀 1. Prerequisites

Before deploying, ensure you have:

1.  A **GitHub account** with the LogicLoom repository pushed.
2.  A **Vercel account** (sign up at [vercel.com](https://vercel.com)).
3.  A **Supabase project** (for the database/auth).

## 🛠️ 2. Deployment Steps

### Step 1: Import to Vercel

1.  Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your `LogicLoom` repository and click **"Import"**.

### Step 2: Configure Environment Variables

In the "Configure Project" screen, expand the **"Environment Variables"** section. Add the following variables (copy them from your Supabase project settings):

| Name | Value Source |
|------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project Settings -> API -> Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Project Settings -> API -> anon public key |

> **Note:** You do not need to change the Build Command or Output Directory. Vercel automatically detects Next.js.

### Step 3: Deploy

1.  Click **"Deploy"**.
2.  Wait for the build to complete (usually < 2 minutes).
3.  Once finished, you will see a preview image. Click it to visit your live site!

## 🔄 3. Updates & CI/CD

Vercel automatically connects to your GitHub repository.

*   **Push to `main`**: Vercel will automatically build and deploy the new version to production.
*   **Pull Requests**: Vercel will create a "Preview Deployment" for every PR, allowing you to test changes before merging.

## ⚠️ 4. Troubleshooting

*   **Build Failed?** Check the "Logs" tab in Vercel. Common issues include missing environment variables or type errors.
*   **Database Issues?** Ensure your Supabase project is active and the URL/Key are correct in the Vercel Project Settings.
