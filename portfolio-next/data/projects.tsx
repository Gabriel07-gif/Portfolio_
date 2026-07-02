import type { ReactNode } from 'react';
import { MockVenezamotos, MockJuriVox, MockPortfolio } from '@/components/ProjectMocks';

export interface Project {
  id:         string;
  tagKey:     string;
  titleKey:   string;
  descKey:    string;
  techs:      string[];
  url:        string;
  githubUrl?: string;
  urlLabel:   string;
  videoSrc?:  string;
  screenshot: string;
  fallback:   ReactNode;
  featured:   boolean;
  live:       boolean;
}

export const PROJECTS: Project[] = [
  {
    id:         'venezamotos',
    tagKey:     'proj1.tag',
    titleKey:   'proj1.title',
    descKey:    'proj1.desc',
    techs:      ['HTML', 'CSS', 'JavaScript'],
    url:        'https://www.venezamotoseveiculos.com.br',
    urlLabel:   'venezamotoseveiculos.com.br',
    videoSrc:   '/videos/venezamotos.mp4',
    screenshot: '/images/project-venezamotos.png',
    fallback:   <MockVenezamotos />,
    featured:   true,
    live:       true,
  },
  {
    id:         'jurivox',
    tagKey:     'proj2.tag',
    titleKey:   'proj2.title',
    descKey:    'proj2.desc',
    techs:      ['Next.js', 'TypeScript', 'Supabase', 'Clerk', 'Stripe', 'Tailwind'],
    url:        'https://jurisflow-omega.vercel.app/',
    urlLabel:   'jurisflow-omega.vercel.app',
    videoSrc:   '/videos/jurivox.mp4',
    screenshot: '/images/project-jurivox.png',
    fallback:   <MockJuriVox />,
    featured:   false,
    live:       true,
  },
  {
    id:         'portfolio',
    tagKey:     'proj3.tag',
    titleKey:   'proj3.title',
    descKey:    'proj3.desc',
    techs:      ['Next.js', 'TypeScript', 'Framer Motion', 'Three.js'],
    url:        'https://github.com/gabriel07-gif',
    githubUrl:  'https://github.com/gabriel07-gif',
    urlLabel:   'github.com/gabriel07-gif',
    screenshot: '/images/project-github.png',
    fallback:   <MockPortfolio />,
    featured:   false,
    live:       false,
  },
];
