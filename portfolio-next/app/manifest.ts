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
      { src: '/icon.svg',       sizes: 'any',     type: 'image/svg+xml', purpose: 'any'      },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png',     purpose: 'any'      },
      { src: '/api/icon192',    sizes: '192x192', type: 'image/png',     purpose: 'any'      },
      { src: '/api/icon512',    sizes: '512x512', type: 'image/png',     purpose: 'maskable' },
    ],
  };
}
