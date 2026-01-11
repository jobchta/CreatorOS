# LogicLoom Deployment Guide

## GitHub Pages Deployment (Automatic)

LogicLoom is configured for **automatic deployment to GitHub Pages** on every push to the `main` branch.

### 1. Prerequisites

1.  **GitHub Repository**: Ensure your code is pushed to GitHub.
2.  **Repository Settings**:
    *   Go to **Settings** -> **Pages**.
    *   Source: **GitHub Actions**.

### 2. Deployment Process

The deployment is handled by the `.github/workflows/deploy.yml` file.

1.  **Push Changes**:
    ```bash
    git add .
    git commit -m "Your message"
    git push origin main
    ```
2.  **Monitor Build**:
    *   Go to the **Actions** tab in your repository to see the deployment progress.
3.  **View Site**:
    *   Once complete, your site will be live at: `https://<your-username>.github.io/LogicLoom/`

### 3. Environment Variables (Supabase)

To enable authentication and database features on your live site:

1.  Go to **Settings** -> **Secrets and variables** -> **Actions**.
2.  Click **New repository secret**.
3.  Add the following secrets:
    *   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.

### ⚠️ Important Notes for GitHub Pages

*   **Static Export**: The application is deployed as a static site (`output: 'export'`).
*   **Middleware**: Next.js Middleware (`middleware.ts`) **does not run** on GitHub Pages.
    *   Server-side route protection and cookie refreshing will not work as they do on Vercel.
    *   The application relies on client-side authentication checks.
*   **Image Optimization**: Next.js Image Optimization is disabled. Images are served as-is.
