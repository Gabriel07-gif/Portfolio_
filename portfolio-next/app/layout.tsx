import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LangProvider }  from '@/contexts/LangContext';
import VercelAnalytics  from '@/components/VercelAnalytics';

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gabrielricartedev.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  'Gabriel Ricarte | Dev Full-Stack',
    template: '%s | Gabriel Ricarte',
  },
  description: 'Portfolio de Gabriel Ricarte — Desenvolvedor Web Full-Stack em Fortaleza, CE. Especializado em React, Next.js, TypeScript, Node.js e PostgreSQL. Disponível para freelance e oportunidades CLT.',
  keywords: [
    /* PT */
    'desenvolvedor full-stack', 'desenvolvedor frontend', 'desenvolvedor web',
    'react', 'nextjs', 'next.js', 'typescript', 'node.js', 'postgresql',
    'portfolio', 'fortaleza', 'ceará', 'brasil', 'freelancer', 'javascript',
    'desenvolvedor react', 'desenvolvedor next.js', 'programador web',
    /* EN */
    'full-stack developer', 'frontend developer', 'web developer',
    'react developer', 'nextjs developer', 'software engineer',
    /* ES */
    'desarrollador full-stack', 'desarrollador web', 'programador',
  ],
  authors:     [{ name: 'Gabriel Ricarte', url: 'https://github.com/gabriel07-gif' }],
  creator:     'Gabriel Ricarte',
  publisher:   'Gabriel Ricarte',
  robots:      { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'technology',
  openGraph: {
    title:       'Gabriel Ricarte | Dev Full-Stack',
    description: 'Criando experiências digitais modernas com React, Next.js e TypeScript. Disponível para projetos freelance e oportunidades CLT.',
    type:        'website',
    url:         SITE_URL,
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
    creator:     '@devgabriel_01',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#04040e' },
    { media: '(prefers-color-scheme: light)', color: '#f6f8ff' },
  ],
  width:        'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id':   `${SITE_URL}/#person`,
      name:        'Gabriel Ricarte',
      givenName:   'Gabriel',
      familyName:  'Ricarte',
      jobTitle:    'Desenvolvedor Web Full-Stack',
      description: 'Desenvolvedor Web Full-Stack em Fortaleza, CE. Especializado em React, Next.js, TypeScript, Node.js e PostgreSQL.',
      url:   SITE_URL,
      email: 'gabrielricarte000@gmail.com',
      address: {
        '@type':         'PostalAddress',
        addressLocality: 'Fortaleza',
        addressRegion:   'CE',
        addressCountry:  'BR',
      },
      sameAs: [
        'https://github.com/gabriel07-gif',
        'https://www.linkedin.com/in/gabriel-lucas-439153308/',
        'https://instagram.com/devgabriel_01',
      ],
      knowsAbout: [
        'React', 'Next.js', 'TypeScript', 'JavaScript',
        'Node.js', 'PostgreSQL', 'HTML', 'CSS', 'Framer Motion',
        'Web Development', 'Frontend Development', 'Full-Stack Development',
      ],
      image: {
        '@type':  'ImageObject',
        url:      `${SITE_URL}/images/fotonova.jpg`,
        width:    340,
        height:   380,
      },
    },
    {
      '@type': 'WebSite',
      '@id':   `${SITE_URL}/#website`,
      url:         SITE_URL,
      name:        'Gabriel Ricarte | Dev Full-Stack',
      description: 'Portfolio de Gabriel Ricarte — Desenvolvedor Web Full-Stack em Fortaleza, CE.',
      author:      { '@id': `${SITE_URL}/#person` },
      inLanguage:  ['pt-BR', 'en', 'es'],
    },
    {
      '@type': 'ProfilePage',
      '@id':   `${SITE_URL}/#profilepage`,
      url:         SITE_URL,
      name:        'Gabriel Ricarte — Portfolio',
      dateCreated: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      about:       { '@id': `${SITE_URL}/#person` },
      mainEntity:  { '@id': `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        <VercelAnalytics />
      </body>
    </html>
  );
}
