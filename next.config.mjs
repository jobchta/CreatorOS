/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled static export to support Middleware and SSR
  // output: 'export',

  // Base path removed as we are deploying to Vercel/SSR, not GitHub Pages
  // basePath: '/LogicLoom',
  // assetPrefix: '/LogicLoom/',

  images: {
    // Unoptimized can be false for Vercel, but keeping true for cost saving/simplicity if desired.
    // Usually standard Next.js Image Optimization is better.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
