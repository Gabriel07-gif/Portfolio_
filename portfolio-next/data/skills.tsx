import {
  IconTS, IconReact, IconNextjs,
  IconNodejs, IconGit, IconFigma,
  IconVercel, IconDocker,
} from '@/components/SkillIcons';

export type ChipData = {
  name:    string;
  img?:    string;
  icon?:   React.ReactNode;
  letter?: string;
};

export const FRONTEND: ChipData[] = [
  { name: 'HTML5',      img: '/images/logo3.png' },
  { name: 'CSS3',       img: '/images/logo2.png' },
  { name: 'JavaScript', img: '/images/logo1.png' },
  { name: 'TypeScript', icon: <IconTS /> },
  { name: 'React',      icon: <IconReact /> },
  { name: 'Next.js',    icon: <IconNextjs /> },
];

export const BACKEND: ChipData[] = [
  { name: 'Node.js',    icon: <IconNodejs /> },
  { name: 'PostgreSQL', img: '/images/logo4.png' },
  { name: 'REST APIs',  letter: 'API' },
  { name: 'SQL',        letter: 'SQL' },
];

export const TOOLS: ChipData[] = [
  { name: 'Git',    icon: <IconGit /> },
  { name: 'Figma',  icon: <IconFigma /> },
  { name: 'Vercel', icon: <IconVercel /> },
  { name: 'Docker', icon: <IconDocker /> },
];
