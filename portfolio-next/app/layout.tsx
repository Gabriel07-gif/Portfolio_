import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LangProvider }  from '@/contexts/LangContext';

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-mono',
  display:  'swap',
  weight:   ['400', '500', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title:       'Gabriel Ricarte | Dev Full-Stack',
  description: 'Portfolio de Gabriel Ricarte — Desenvolvedor Web Full-Stack em Fortaleza, CE. Especializado em React, Next.js, TypeScript, Node.js e PostgreSQL.',
  keywords:    ['desenvolvedor', 'full-stack', 'frontend', 'react', 'nextjs', 'typescript', 'portfolio', 'fortaleza', 'web', 'javascript', 'node'],
  authors:     [{ name: 'Gabriel Ricarte', url: 'https://github.com/gabriel07-gif' }],
  creator:     'Gabriel Ricarte',
  robots:      { index: true, follow: true },
  openGraph: {
    title:       'Gabriel Ricarte | Dev Full-Stack',
    description: 'Criando experiências digitais modernas com React, Next.js e TypeScript.',
    type:        'website',
    locale:      'pt_BR',
    siteName:    'Gabriel Ricarte — Portfolio',
    images: [{
      url:    '/images/project-github.png',
      width:  1200,
      height: 630,
      alt:    'Gabriel Ricarte — Desenvolvedor Full-Stack',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Gabriel Ricarte | Dev Full-Stack',
    description: 'Criando experiências digitais modernas com React, Next.js e TypeScript.',
    images:      ['/images/project-github.png'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#05050f' },
    { media: '(prefers-color-scheme: light)', color: '#f0f4ff' },
  ],
  width:        'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* Inline theme script prevents FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',s);}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          <LangProvider>
            {children}
          </LangProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
