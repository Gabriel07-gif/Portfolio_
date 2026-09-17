'use client';

import { Analytics } from '@vercel/analytics/react';

export default function VercelAnalytics() {
  return process.env.NEXT_PUBLIC_VERCEL_ENV ? <Analytics /> : null;
}
