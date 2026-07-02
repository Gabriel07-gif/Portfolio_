import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gabriel Ricarte — Dev Full-Stack',
    short_name: 'Gabriel Ricarte',
    description: 'Gabriel Ricarte — Full-Stack Web Developer',
    start_url: '/',
    display: 'standalone',
    background_color: '#05050f',
    theme_color: '#00ff88',
    icons: [
      { src: '/favicon.ico',  sizes: 'any', type: 'image/x-icon' },
      { src: '/icon.svg',     sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
