'use client';

import Script from 'next/script';

export default function VercelAnalytics() {
  if (process.env.NODE_ENV !== 'production') return null;
  return (
    <Script
      src="/_vercel/insights/script.js"
      strategy="afterInteractive"
    />
  );
}
