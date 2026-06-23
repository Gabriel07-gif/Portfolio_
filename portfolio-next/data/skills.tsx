export type ChipData = {
  name:      string;
  img?:      string;
  icon?:     React.ReactNode;
  letter?:   string;
  featured?: boolean;
};

export const FRONTEND: ChipData[] = [
  { name: 'HTML5',      img: '/images/logo3.png' },
  { name: 'CSS3',       img: '/images/logo2.png' },
  { name: 'JavaScript', img: '/images/logo1.png' },
  { name: 'TypeScript', img: '/images/logo13.png', featured: true },
  { name: 'React',      img: '/images/logo14.png', featured: true },
  { name: 'Next.js',    img: '/images/logo5.png',  featured: true },
];

export const BACKEND: ChipData[] = [
  { name: 'Node.js',    img: '/images/logo15.png', featured: true },
  { name: 'PostgreSQL', img: '/images/logo4.png' },
  { name: 'REST APIs',  img: '/images/logo16.png' },
  { name: 'SQL',        img: '/images/logo17.png' },
];

export const TOOLS: ChipData[] = [
  { name: 'Git',    img: '/images/logo18.png' },
  { name: 'Figma',  img: '/images/logo20.png' },
  { name: 'Vercel', img: '/images/logo22.png' },
  { name: 'Docker', img: '/images/logo19.png' },
];
