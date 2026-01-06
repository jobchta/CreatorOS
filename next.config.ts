import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Set base path for GitHub Pages (repo name)
  basePath: isGitHubPages ? '/LogicLoom' : '',

  // Asset prefix for correct CSS/JS loading
  assetPrefix: isGitHubPages ? '/LogicLoom/' : '',

  // Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },

  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
