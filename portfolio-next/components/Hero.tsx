'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';
import { useCounter } from '@/hooks/useCounter';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { Card } from '@/components/ui/card';

const NAME = 'Gabriel Ricarte';

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

  /* Orb follows cursor — transform (not left/top) so this is compositor-only
     and never triggers layout; rAF-batched to coalesce bursts of mousemove
     events into at most one style write per frame. */
  useEffect(() => {
    const hero = sectionRef.current;
    const orb  = orbRef.current;
    if (!hero || !orb || !window.matchMedia('(any-pointer: fine)').matches) return;

    let rafId = 0;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        orb.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      });
    };
    hero.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      hero.removeEventListener('mousemove', onMove);
    };
  }, []);

  /* Cycle through roles every 2.8 s */
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx(i => (i + 1) % (CYCLE_ROLES[lang]?.length ?? CYCLE_ROLES.pt.length));
    }, 2800);
    return () => clearInterval(id);
  }, [lang]);

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
    <section id="inicio" className="hero" ref={sectionRef} aria-label={t('hero.label')}>
      <div
        className="hero-orb"
        ref={orbRef}
        aria-hidden="true"
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid">

          {/* ── LEFT ── */}
          <div>
            <motion.div className="hero-location" {...fadeUp(0)} aria-label={t('hero.location.label')}>
              <svg width="7" height="7" viewBox="0 0 7 7" aria-hidden="true">
                <circle cx="3.5" cy="3.5" r="3.5" fill="currentColor" />
              </svg>
              {t('hero.location')}
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
              {NAME.split('').map((char, i) =>
                char === ' ' ? (
                  <motion.span
                    key={`name-char-${i}`}
                    variants={{}}
                    style={{ display: 'inline' }}
                    aria-hidden="true"
                  >
                    {' '}
                  </motion.span>
                ) : (
                  <motion.span
                    key={`name-char-${i}`}
                    className="hero-char"
                    variants={charVariants}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.span>
                )
              )}
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

            <motion.p className="hero-desc" {...fadeUp(0.25)}>
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
            <motion.div className="hero-stats" {...fadeUp(0.9)} aria-label={t('hero.stats.label')}>
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

          {/* ── RIGHT: 3D SPLINE ROBOT SCENE & SPOTLIGHT ── */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 80, rotateY: -24 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 900 }}
            aria-hidden="true"
          >
            <Card className="hero-spline-card w-full bg-black/[0.94] relative overflow-hidden border border-white/10 shadow-2xl rounded-2xl flex flex-col">
              <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
              />
              <div className="w-full h-full relative z-10">
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </Card>

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
