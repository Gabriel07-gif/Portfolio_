import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gabriel Ricarte — Dev Full-Stack',
    short_name: 'Gabriel Ricarte',
    description: 'Portfolio de Gabriel Ricarte, Desenvolvedor Web Full-Stack',
    start_url: '/',
    display: 'standalone',
    background_color: '#05050f',
    theme_color: '#00ff88',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  };
}
