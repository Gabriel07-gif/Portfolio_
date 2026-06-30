import type { NextConfig } from 'next';

const CSP = [
  "default-src 'self'",
  /* Next.js requires unsafe-inline for inline scripts/styles and Framer Motion for inline transforms */
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https:",
  "connect-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  /* Prevent MIME-type sniffing */
  { key: 'X-Content-Type-Options',  value: 'nosniff' },
  /* Block clickjacking */
  { key: 'X-Frame-Options',         value: 'SAMEORIGIN' },
  /* Referrer policy */
  { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
  /* Limit browser feature access */
  { key: 'Permissions-Policy',      value: 'camera=(), microphone=(), geolocation=()' },
  /* DNS prefetch for performance */
  { key: 'X-DNS-Prefetch-Control',  value: 'on' },
  /* Content Security Policy */
  { key: 'Content-Security-Policy', value: CSP },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        /* Immutable cache for hashed Next.js chunks */
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        /* Long-lived cache for public images and SVGs */
        source: '/images/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      {
        /* Long-lived cache for videos (large files, rarely change) */
        source: '/videos/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default nextConfig;
