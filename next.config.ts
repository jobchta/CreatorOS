import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If you are deploying to a GitHub Pages project site (e.g. username.github.io/repo-name),
  // you must set the basePath to '/repo-name'.
  // basePath: '/your-repo-name',
};

export default nextConfig;
