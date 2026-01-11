/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Enabled static export for GitHub Pages
  output: 'export',

  // ✅ Base path for GitHub Pages project repository
  basePath: '/LogicLoom',
  assetPrefix: '/LogicLoom/',

  // ✅ Disable static image optimization (required for static export)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Security headers (Only applied when running via 'next start', ignored in static export)
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
