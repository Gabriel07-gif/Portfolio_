'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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
  const projsVal = useCounter(5,  1600, { delayMs: 2000 });
  const techsVal = useCounter(10, 1200, { delayMs: 2200 });

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

  const TECH_ORBS = [
    { src: '/images/logo3.png',  alt: 'HTML',       style: { left: '-52px', top: '-18px' }     },
    { src: '/images/logo2.png',  alt: 'CSS',        style: { right: '-52px', top: '20px' }     },
    { src: '/images/logo1.png',  alt: 'JavaScript', style: { left: '-52px', bottom: '-18px' }  },
    { src: '/images/logo4.png',  alt: 'PostgreSQL', style: { right: '-52px', bottom: '-18px' } },
  ];

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
              <span className="greeting-line" aria-hidden="true" />
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
              <motion.span
                className="hero-dot"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 300 }}
                aria-hidden="true"
              >.</motion.span>
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
            <div className="code-card-wrap">
              <div className="code-card-ambient" />
              <div className="code-card">
                <div className="code-dots">
                  <span className="dot dot-red"    />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green"  />
                  <span className="code-filename">gabriel.config.ts</span>
                </div>
                <div className="code-body">
                  <p><span className="c-line">1</span><span className="c-comment">// quem está por trás disso</span></p>
                  <p><span className="c-line">2</span><span className="c-kw">const</span> dev = {'{'}</p>
                  <p><span className="c-line">3</span><span className="indent"><span className="c-prop">nome</span>:       <span className="c-str">&quot;Gabriel Ricarte&quot;</span>,</span></p>
                  <p><span className="c-line">4</span><span className="indent"><span className="c-prop">cidade</span>:     <span className="c-str">&quot;Fortaleza, CE&quot;</span>,</span></p>
                  <p><span className="c-line">5</span><span className="indent"><span className="c-prop">stack</span>:      [<span className="c-str">&quot;Next.js&quot;</span>, <span className="c-str">&quot;Node&quot;</span>, <span className="c-str">&quot;Postgres&quot;</span>],</span></p>
                  <p><span className="c-line">6</span><span className="indent"><span className="c-prop">projetos</span>:  <span className="c-num">5</span>,</span></p>
                  <p><span className="c-line">7</span><span className="indent"><span className="c-prop">disponivel</span>: <span className="c-bool">true</span>,</span></p>
                  <p><span className="c-line">8</span>{'}'} <span className="c-kw">as const</span>;</p>
                  <p><span className="c-line">9</span></p>
                  <p><span className="c-line">10</span><span className="c-kw">export default</span> dev;</p>
                  <p><span className="c-line">11</span><span className="cursor-code" /></p>
                </div>
              </div>

              <div className="tech-orbit">
                {TECH_ORBS.map((orb, i) => (
                  <div
                    key={i}
                    className="tech-orb"
                    style={{ position: 'absolute', ...orb.style, animationDelay: `${-i * 2.8}s` }}
                  >
                    <Image src={orb.src} alt={orb.alt} width={26} height={26} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true" />
              {t('hero.available')}
            </div>
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
