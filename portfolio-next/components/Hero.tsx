'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';
import { useCounter } from '@/hooks/useCounter';

const NAME = 'Gabriel';

const CYCLE_ROLES: Record<string, string[]> = {
  pt: ['Full-Stack', 'Frontend', 'Back-End', 'TypeScript'],
  en: ['Full-Stack', 'Frontend', 'Back-End', 'TypeScript'],
  es: ['Full-Stack', 'Frontend', 'Back-End', 'TypeScript'],
};

export default function Hero() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef     = useRef<HTMLDivElement>(null);
  const [roleIdx,  setRoleIdx]  = useState(0);

  const yearsVal = useCounter(2,  1400, { delayMs: 1800 });
  const projsVal = useCounter(8,  1600, { delayMs: 2000 });
  const techsVal = useCounter(15, 1200, { delayMs: 2200 });

  /* Orb follows cursor */
  useEffect(() => {
    const hero = sectionRef.current;
    const orb  = orbRef.current;
    if (!hero || !orb || window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      orb.style.left = `${e.clientX - r.left}px`;
      orb.style.top  = `${e.clientY - r.top}px`;
    };
    hero.addEventListener('mousemove', onMove, { passive: true });
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  /* Cycle through roles every 2.8 s */
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx(i => (i + 1) % (CYCLE_ROLES[lang]?.length ?? 4));
    }, 2800);
    return () => clearInterval(id);
  }, [lang]);

  /* Reset index on language change */
  useEffect(() => { setRoleIdx(0); }, [lang]);

  const nameVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.3 } },
  };
  const charVariants = {
    hidden:  { opacity: 0, y: -60, rotateX: 90 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 18 } },
  };
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const } },
  });

  const roles = CYCLE_ROLES[lang] ?? CYCLE_ROLES.pt;


  return (
    <section id="inicio" className="hero" ref={sectionRef} aria-label="Apresentação">
      <div
        className="hero-orb"
        ref={orbRef}
        aria-hidden="true"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid">

          {/* ── LEFT ── */}
          <div>
            <motion.div className="hero-location" {...fadeUp(0)} aria-label="Localização">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  fill="currentColor" opacity=".9"/>
                <circle cx="12" cy="9" r="2.5" fill="var(--bg)" />
              </svg>
              Fortaleza, CE
            </motion.div>

            <motion.p className="hero-greeting" {...fadeUp(0.1)}>
              {t('hero.greeting')}
            </motion.p>

            <motion.h1
              className="hero-name"
              variants={nameVariants}
              initial="hidden"
              animate="visible"
              style={{ perspective: 600 }}
            >
              {NAME.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="hero-char"
                  variants={charVariants}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Role with cycling accent text */}
            <motion.p className="hero-role" {...fadeUp(0.5)}>
              {t('hero.role.pre')}&nbsp;
              <span
                className="hero-role-cycle"
                aria-live="polite"
                style={{ display: 'inline-block', position: 'relative', minWidth: 'min(180px, 45vw)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIdx]}
                    className="accent-text"
                    initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                    exit={{    opacity: 0, y: -14, filter: 'blur(6px)' }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'inline-block' }}
                  >
                    {roles[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.p>

            <motion.p className="hero-desc" {...fadeUp(0.65)}>
              {t('hero.desc')}
            </motion.p>

            <motion.div className="hero-buttons" {...fadeUp(0.75)}>
              <a href="#projetos" className="btn btn-primary magnetic">
                <span>{t('hero.btn.projects')}</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M3 7.5h9m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.7"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contato" className="btn btn-outline magnetic">
                {t('hero.btn.contact')}
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div className="hero-stats" {...fadeUp(0.9)} aria-label="Estatísticas">
              <div>
                <span className="stat-n">{yearsVal}</span>
                <span className="stat-plus" aria-hidden="true">+</span>
                <p className="stat-l">{t('hero.stat.years')}</p>
              </div>
              <div className="hero-stat-div" aria-hidden="true" />
              <div>
                <span className="stat-n">{projsVal}</span>
                <span className="stat-plus" aria-hidden="true">+</span>
                <p className="stat-l">{t('hero.stat.projects')}</p>
              </div>
              <div className="hero-stat-div" aria-hidden="true" />
              <div>
                <span className="stat-n">{techsVal}</span>
                <span className="stat-plus" aria-hidden="true">+</span>
                <p className="stat-l">{t('hero.stat.techs')}</p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: CODE CARD ── */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 80, rotateY: -24 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 900 }}
            aria-hidden="true"
          >
            <motion.div
              className="status-card-wrap"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
            >
              <div className="status-card-ambient" />
              <div className="status-card">
                <div className="status-card-header">
                  <span className="status-live-dot" />
                  <span className="status-card-label-top">dev · status</span>
                </div>
                <motion.div
                  className="status-card-body"
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 1.0 } } }}
                >
                  <motion.div
                    className="status-row"
                    variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } } }}
                  >
                    <span className="status-row-label">building now</span>
                    <span className="status-row-title">Portfolio v2</span>
                    <motion.div
                      className="status-chips"
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
                    >
                      {['Next.js', 'Three.js', 'Framer Motion'].map(tech => (
                        <motion.span
                          key={tech}
                          variants={{ hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 18 } } }}
                        >{tech}</motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                  <div className="status-divider" />

                  <motion.div
                    className="status-row"
                    variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } } }}
                  >
                    <span className="status-row-label">last shipped</span>
                    <a
                      href="https://www.venezamotoseveiculos.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="status-row-link"
                    >
                      venezamotos
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M4 1H1v10h10V8M7 1h4m0 0v4M11 1 5.5 6.5"
                          stroke="currentColor" strokeWidth="1.4"
                          strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <motion.div
                      className="status-chips"
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
                    >
                      {['HTML', 'CSS', 'JavaScript'].map(tech => (
                        <motion.span
                          key={tech}
                          variants={{ hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 18 } } }}
                        >{tech}</motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                  <div className="status-divider" />

                  <motion.div
                    className="status-row"
                    style={{ marginBottom: 0 }}
                    variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } } }}
                  >
                    <span className="status-row-label">focus stack</span>
                    <motion.div
                      className="status-stack-grid"
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                    >
                      {(['React', 'TypeScript', 'Node.js', 'PostgreSQL'] as const).map(tech => (
                        <motion.span
                          key={tech}
                          className="status-stack-item"
                          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 20 } } }}
                        >{tech}</motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
                <div className="status-card-footer">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>gabriel07-gif</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <span className="badge-dot" aria-hidden="true" />
              {t('hero.available')}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        aria-hidden="true"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 13l7 7 7-7"
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
