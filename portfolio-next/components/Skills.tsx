'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';

const SKILLS = [
  { name: 'HTML 5',     pct: 92, img: '/images/logo3.png' },
  { name: 'CSS 3',      pct: 88, img: '/images/logo2.png' },
  { name: 'JavaScript', pct: 80, img: '/images/logo1.png' },
  { name: 'TypeScript', pct: 70, img: '' },
  { name: 'React',      pct: 72, img: '' },
  { name: 'Next.js',    pct: 65, img: '' },
  { name: 'Node.js',    pct: 68, img: '' },
  { name: 'PostgreSQL', pct: 68, img: '/images/logo4.png' },
  { name: 'Git',        pct: 82, img: '/images/logo6.png' },
];

function IconTS() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="5" fill="#3178C6"/>
      <path fill="#fff" d="M5 14.5h7V17H9.5v8H7.5v-8H5v-2.5zm14 8.3v-1.3c1 .66 2.1 1 3.2 1 1.5 0 2.3-.57 2.3-1.7s-.66-1.6-2.4-2.1c-2.4-.87-3.6-2.1-3.6-3.9 0-2.2 1.75-3.8 4.4-3.8 1.2 0 2.3.3 3.3.88v2.5c-.9-.65-2-.98-3.1-.98-1.3 0-2.1.55-2.1 1.45 0 .9.65 1.35 2.3 1.9 2.5.88 3.8 2.1 3.8 4.1 0 2.35-1.75 4-4.7 4-1.65 0-3.2-.55-4.4-1.95z"/>
    </svg>
  );
}

function IconReact() {
  return (
    <svg width="34" height="34" viewBox="0 0 512 512" aria-hidden="true">
      <circle cx="256" cy="256" r="52" fill="#61DAFB"/>
      <ellipse cx="256" cy="256" rx="230" ry="88" fill="none" stroke="#61DAFB" strokeWidth="26"/>
      <ellipse cx="256" cy="256" rx="230" ry="88" fill="none" stroke="#61DAFB" strokeWidth="26" transform="rotate(60 256 256)"/>
      <ellipse cx="256" cy="256" rx="230" ry="88" fill="none" stroke="#61DAFB" strokeWidth="26" transform="rotate(120 256 256)"/>
    </svg>
  );
}

function IconNextjs() {
  return (
    <svg width="34" height="34" viewBox="0 0 180 180" aria-hidden="true">
      <defs>
        <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff"/>
          <stop offset="100%" stopColor="#888"/>
        </linearGradient>
      </defs>
      <rect width="180" height="180" rx="36" fill="#000"/>
      <path fill="url(#ng)" d="M87 36L36 144h18l14.5-32h37L120 144h18L87 36zm-11 60l13-29 13 29H76z"/>
      <path fill="#fff" opacity=".9" d="M134 36v108h-16V36h16z"/>
    </svg>
  );
}

function IconNodejs() {
  return (
    <svg width="34" height="34" viewBox="0 0 56 64" aria-hidden="true">
      <path fill="#8CC84B" d="M27.99 0L.5 16v32l27.49 16L55.5 48V16L27.99 0z"/>
      <path fill="#fff" d="M28 10l-2.5 1.45v29.1L28 42l13.5-7.8V18.8L28 10zM28 14l10 5.8v11.4L28 37l-10-5.8V19.8L28 14z"/>
      <path fill="#fff" d="M19.5 21l8.5 4.9 8.5-4.9v9.8L28 35.7l-8.5-4.9V21z" opacity=".6"/>
    </svg>
  );
}

function SkillIcon({ skill }: { skill: typeof SKILLS[0] }) {
  if (skill.name === 'TypeScript') return <IconTS />;
  if (skill.name === 'React')      return <IconReact />;
  if (skill.name === 'Next.js')    return <IconNextjs />;
  if (skill.name === 'Node.js')    return <IconNodejs />;
  return (
    <Image
      src={skill.img}
      alt={skill.name}
      width={34}
      height={34}
      loading="lazy"
      style={{ objectFit: 'contain' }}
    />
  );
}

function SkillBar({ pct, animate }: { pct: number; animate: boolean }) {
  return (
    <div
      className="skill-bar"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="skill-fill"
        style={{
          width: animate ? `${pct}%` : '0%',
          transition: animate ? 'width 1.4s cubic-bezier(0.16,1,0.3,1)' : 'none',
        }}
      />
    </div>
  );
}

export default function Skills() {
  const { t } = useLang();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="habilidades" className="bg-alt" aria-label="Habilidades" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">03</span>
          <h2>
            <span>{t('section.skills.pre')}</span>
            <span className="accent-text">{t('section.skills.acc')}</span>
          </h2>
          <p className="section-sub">{t('section.skills.sub')}</p>
          <div className="section-line" aria-hidden="true" />
        </motion.div>

        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              data-skill={skill.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="skill-icon-wrap">
                <SkillIcon skill={skill} />
              </div>
              <div className="skill-info">
                <div className="skill-top">
                  <h3>{skill.name}</h3>
                  <span className="skill-pct">{skill.pct}%</span>
                </div>
                <SkillBar pct={skill.pct} animate={inView} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
