# LogicLoom Deployment Guide

## Production Deployment Checklist

### Pre-Deployment

- [x] All environment variables defined in `.env.example`
- [x] Security headers configured in `next.config.mjs`
- [x] `.gitignore` properly excludes sensitive files
- [x] No hardcoded API keys or secrets in codebase
- [x] TypeScript compilation passes without errors
- [x] ESLint passes all checks: `npm run lint`
- [x] Production build completes successfully: `npm run build`

### GitHub Pages Deployment (Automatic)

LogicLoom is configured for **automatic deployment to GitHub Pages** on every push to `main` branch.

#### How it works:

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
   - Triggers on push to `main` or `master` branch
   - Installs dependencies
   - Builds static export
   - Deploys to GitHub Pages

2. **Repository Configuration**:
   - Built files are automatically served at: `https://jobchta.github.io/LogicLoom/`
   - Base path is set to `/LogicLoom` in `next.config.mjs`
   - Static export enabled via `output: 'export'`

#### Deploy steps:

```bash
# 1. Make your changes
git add .
git commit -m "Production: Your changes here"

# 2. Push to main
git push origin main

# 3. GitHub Actions will automatically build and deploy
# Check deployment status at: https://github.com/jobchta/LogicLoom/actions
```

#### Repository Settings:

1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages**
4. Folder: **/ (root)**

### Supabase Configuration (For Future Features)

#### 1. Create Supabase Project

```bash
# Visit: https://supabase.com/
# Create new project
```

#### 2. Get API Keys

- Project URL: `https://your-project.supabase.co`
- Anon Public Key: Found in Settings → API → Project API keys

#### 3. Set GitHub Secrets

```bash
# Go to: https://github.com/jobchta/LogicLoom/settings/secrets/actions

# Add these secrets:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### 4. Copy Database Schema

```bash
# 1. Go to Supabase Dashboard
# 2. SQL Editor
# 3. Paste content from db/schema.sql
# 4. Run SQL
```

### Vercel Deployment (Alternative to GitHub Pages)

For a more production-ready deployment with backend support:

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import project** from GitHub
3. **Set environment variables** in Project Settings
4. **Deploy** - Vercel will auto-build on push

**Advantages:**
- Supports server-side rendering
- Better performance with edge functions
- Built-in analytics and monitoring
- Automatic SSL certificates
- Better database integration support

### Production Environment Variables

Create `.env.local` (never commit this):

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit with your actual values
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-key
```

### Security Checklist

- [x] No `.env` files in git history
- [x] API keys stored in GitHub Secrets (for CI/CD)
- [x] API keys stored in `.env.local` (for local development)
- [x] Security headers configured
- [x] CORS properly configured
- [x] Input validation on all forms
- [x] XSS protection enabled
- [x] CSRF tokens for state-changing operations

### Performance Optimization

- [x] Static export enabled for fast GitHub Pages delivery
- [x] Image optimization disabled (static export limitation)
- [x] CSS minification enabled
- [x] JavaScript minification enabled
- [x] Compression enabled in `next.config.mjs`
- [x] Browser source maps disabled in production

### Monitoring & Maintenance

1. **GitHub Actions**:
   - Monitor build status at: `https://github.com/jobchta/LogicLoom/actions`
   - Check deployment logs for errors
   - Set up notifications for failed builds

2. **Live Site**:
   - Test at: `https://jobchta.github.io/LogicLoom/`
   - Check console for errors (F12 → Console)
   - Verify all features work

3. **Supabase Monitoring** (if using database):
   - Monitor API usage
   - Check error logs
   - Monitor database size

### Rollback Procedure

If deployment fails:

```bash
# 1. Check recent commits
git log --oneline -5

# 2. Revert to last working commit
git revert <commit-hash>

# 3. Push to trigger redeployment
git push origin main

# 4. Check Actions tab for new build
```

### Common Issues & Solutions

#### Build Fails

```bash
# Check for TypeScript errors
npm run lint

# Clean and rebuild
rm -rf .next out node_modules
npm install
npm run build
```

#### Static Files Not Loading

- Verify `basePath` in `next.config.mjs` matches GitHub repo name
- Check `assetPrefix` is correctly set
- Clear browser cache

#### Environment Variables Not Available

- Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Restart build if secrets were just added
- Check GitHub Secrets are set correctly

#### Supabase Connection Issues

```bash
# Test connection with sample code
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
console.log('Connected:', supabase ? 'Yes' : 'No');
```

## Build & Deployment Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## CI/CD Pipeline (GitHub Actions)

The workflow automatically:

1. **On every push to main**:
   - Checks out code
   - Sets up Node.js 20
   - Installs dependencies with npm ci
   - Builds with Next.js
   - Uploads artifacts
   - Deploys to GitHub Pages

2. **Environment variables provided during build**:
   - Supabase credentials from GitHub Secrets
   - Fallback to placeholder values if not set

## Next Steps

1. **Test locally**: `npm run dev` and test all features
2. **Push to main**: `git push origin main`
3. **Monitor deployment**: Check GitHub Actions tab
4. **Verify live site**: Visit `https://jobchta.github.io/LogicLoom/`
5. **Set up Supabase** (optional): Follow database setup if backend needed

## Support

For issues:
1. Check GitHub Issues: `https://github.com/jobchta/LogicLoom/issues`
2. Review logs in Actions tab
3. Verify `.env` variables are set
4. Check browser console for errors

---

**Last Updated**: January 6, 2026
**Deployment Status**: ✅ Ready for Production
