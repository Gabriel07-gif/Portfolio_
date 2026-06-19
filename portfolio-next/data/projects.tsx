import { MockVenezamotos, MockJuriVox, MockPortfolio } from '@/components/ProjectMocks';

export interface Project {
  id:         string;
  tagKey:     string;
  titleKey:   string;
  descKey:    string;
  techs:      string[];
  url:        string;
  githubUrl:  string;
  urlLabel:   string;
  screenshot: string;
  fallback:   React.ReactNode;
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
    githubUrl:  '',
    urlLabel:   'venezamotoseveiculos.com.br',
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
    techs:      ['HTML', 'CSS', 'JavaScript'],
    url:        'https://jurisflow-omega.vercel.app/',
    githubUrl:  '',
    urlLabel:   'jurisflow-omega.vercel.app',
    screenshot: '',
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
