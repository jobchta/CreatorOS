# LogicLoom

**The Creator Business Operating System.**

LogicLoom is an all-in-one platform designed to replace the fragmented stack of tools (spreadsheets, Notion, Metricool, Linktree) that creators currently use to run their businesses. It focuses on **Business Management**, not content generation.

## 🚀 Features (Phase 1)

*   **Brand Rate Calculator:** Estimate your worth based on niche, platform, and follower count.
*   **Engagement Analyzer:** Assess the quality of your audience engagement.
*   **Landing Page:** High-converting explanation of the value proposition.
*   **Dashboard:** Real-time analytics and content calendar integration.

## 🛠️ Tech Stack

*   **Framework:** Next.js 16 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4
*   **Database:** Supabase (PostgreSQL) - **Integrated**
*   **Auth:** Supabase Auth - **Integrated**
*   **Icons:** Lucide React

## 🔒 Security & Privacy

**IMPORTANT:** To ensure this project remains secure and private:

1.  **Keep this Repository Private:** If you are hosting this on GitHub, ensure the repository visibility is set to **Private** in the repository settings.
2.  **Protect Secrets:**
    *   **NEVER** commit `.env` or `.env.local` files to version control.
    *   The `.gitignore` file is pre-configured to exclude these files.
    *   Store API keys and database credentials in your hosting platform's environment variables (e.g., GitHub Secrets for Actions).

## 📦 Deployment

This project is configured for **Static Site Generation (SSG)** to support hosting on **GitHub Pages**.

*   **Hosting:** GitHub Pages.
*   **Database:** [Supabase Free Tier](https://supabase.com/pricing).
*   **Note:** Server-side middleware is disabled. Authentication protection is handled client-side.

### Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Copy `.env.example` to `.env.local` and add your Supabase credentials:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000/LogicLoom](http://localhost:3000/LogicLoom) (matches base path).

4.  **Database Setup (Supabase):**
    *   Create a new project on [Supabase](https://supabase.com/).
    *   Run the SQL content from `db/schema.sql` in the Supabase SQL Editor.
