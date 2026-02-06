import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone', // Required for Docker deployments
  async redirects() {
    return [
      {
        source: '/:path(.*)',
        has: [
          {
            type: 'host',
            value: 'admin\\.thegreatbulls\\.in',
          },
        ],
        destination: '/admin/:path',
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com' // For S3 images if needed
      }
    ]
  },
  experimental: {},
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Environment variables that should be available at build time
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000'
  }
};

export default nextConfig;

