/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 👈 Tells Next.js to build static HTML
  images: {
    unoptimized: true, // 👈 GitHub Pages cannot optimize images on the fly
  },
  // Fix for GitHub Pages sub-path (if your repo is logicloom, your site is user.github.io/logicloom)
  // Assuming repo name 'LogicLoom' based on context
  basePath: '/LogicLoom',
  assetPrefix: '/LogicLoom/',
};

export default nextConfig;
