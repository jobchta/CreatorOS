/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export removed to support dynamic server components
  // output: 'export',

  // Base path removed (assuming root deployment for SaaS, e.g. Vercel/Railway)
  // basePath: '/LogicLoom',
  // assetPrefix: '/LogicLoom/',

  // Images config
  images: {
    unoptimized: true, // Keep unoptimized if using external CDNs or to be safe
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Security headers
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

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
