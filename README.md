# LogicLoom

**The Creator Business Operating System.**

LogicLoom is an all-in-one platform designed to replace the fragmented stack of tools (spreadsheets, Notion, Metricool, Linktree) that creators currently use to run their businesses. It focuses on **Business Management**, not content generation.

## 🚀 Features (Phase 1)

*   **Brand Rate Calculator:** Estimate your worth based on niche, platform, and follower count.
*   **Engagement Analyzer:** Assess the quality of your audience engagement.
*   **Landing Page:** High-converting explanation of the value proposition.

## 🛠️ Tech Stack

*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Database (Planned):** Supabase (PostgreSQL)
*   **Icons:** Lucide React

## 🔒 Security & Privacy

**IMPORTANT:** To ensure this project remains secure and private:

1.  **Keep this Repository Private:** If you are hosting this on GitHub, ensure the repository visibility is set to **Private** in the repository settings.
2.  **Protect Secrets:**
    *   **NEVER** commit `.env` or `.env.local` files to version control.
    *   The `.gitignore` file is pre-configured to exclude these files.
    *   Store API keys and database credentials in your hosting platform's environment variables (e.g., Vercel Project Settings).

## 📦 Zero Investment Setup

This project is architected to run completely free for the initial phases using the following tiers:

1.  **Hosting:** [Vercel Hobby Tier](https://vercel.com/pricing) (Free forever for personal projects).
2.  **Database:** [Supabase Free Tier](https://supabase.com/pricing) (500MB database, sufficient for thousands of users).

### Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

3.  **Database Setup (Supabase):**
    *   Create a new project on [Supabase](https://supabase.com/).
    *   Go to the **SQL Editor** in your Supabase dashboard.
    *   Copy the content of `db/schema.sql` from this repository.
    *   Paste it into the SQL Editor and run it to create your database tables.

4.  **Deploy to Vercel:**
    *   Push this code to your private GitHub repository.
    *   Import the repository into Vercel.
    *   Vercel will automatically detect the Next.js settings and deploy.
