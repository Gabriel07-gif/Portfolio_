'use client';

const TECHS = [
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Node.js', 'PostgreSQL', 'Git', 'GitHub', 'REST APIs',
  'Framer Motion', 'Three.js', 'Responsive Design', 'UI / UX',
];

const TECHS_2 = [
  'Tailwind CSS', 'Prisma', 'Express', 'Vite', 'Jest',
  'Docker', 'Figma', 'GraphQL', 'Redux', 'MongoDB', 'CI / CD', 'Accessibility',
];

export default function TechTape() {
  const row1 = [...TECHS,   ...TECHS];
  const row2 = [...TECHS_2, ...TECHS_2];

  return (
    <div className="tech-tape" aria-hidden="true" role="presentation">
      <div className="tech-tape-track">
        {row1.map((tech, i) => (
          <span key={i}>{tech}</span>
        ))}
      </div>
      <div className="tech-tape-track tech-tape-track-rev">
        {row2.map((tech, i) => (
          <span key={i}>{tech}</span>
        ))}
      </div>
    </div>
  );
}
