import type { ReactNode } from 'react';

export type ChipData = {
  name:      string;
  img?:      string;
  imgLight?: string;
  icon?:     ReactNode;
  letter?:   string;
  featured?: boolean;
};

export const FRONTEND: ChipData[] = [
  { name: 'HTML5',      img: '/images/svg/html5.svg' },
  { name: 'CSS3',       img: '/images/svg/css3.svg' },
  { name: 'JavaScript', img: '/images/svg/javascript.svg' },
  { name: 'TypeScript', img: '/images/svg/typescript.svg',  featured: true },
  { name: 'React',      img: '/images/svg/react.svg',       featured: true },
  { name: 'Next.js',    img: '/images/svg/nextjs-white.svg', imgLight: '/images/svg/nextjs-dark.svg', featured: true },
];

export const BACKEND: ChipData[] = [
  { name: 'Node.js',    img: '/images/svg/nodejs.svg',      featured: true },
  { name: 'PostgreSQL', img: '/images/svg/postgresql.svg' },
  { name: 'REST APIs',  img: '/images/svg/api.svg' },
  { name: 'SQL',        img: '/images/svg/database.svg' },
];

export const TOOLS: ChipData[] = [
  { name: 'Git',    img: '/images/svg/git.svg' },
  { name: 'Figma',  img: '/images/svg/figma.svg' },
  { name: 'Vercel', img: '/images/svg/vercel-white.svg', imgLight: '/images/svg/vercel-dark.svg' },
  { name: 'Docker', img: '/images/svg/docker.svg' },
];
