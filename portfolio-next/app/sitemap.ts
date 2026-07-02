import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gabrielricartedev.com';

const ROUTES = [
  { path: '/', changeFrequency: 'monthly' as const, priority: 1.0 },
  /* Add new routes here as the site grows:
     { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 } */
] satisfies { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url:             `${SITE_URL}${path}`,
    lastModified:    new Date(),
    changeFrequency,
    priority,
  }));
}
