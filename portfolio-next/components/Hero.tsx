'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';

const CHARSET  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?<>';
const ORIGINAL = 'Gabriel';

function useCounter(target: number, duration = 1400, trigger = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const tick  = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, trigger]);
  return value;
}

function useTypewriter(words: string[], enabled = true) {
  const [text, setText] = useState('');
  const state = useRef({ ri: 0, ci: 0, deleting: false, timer: 0 });

  useEffect(() => {
    if (!enabled || !words.length) return;
    const s = state.current;
    s.ri = 0; s.ci = 0; s.deleting = false;
    clearTimeout(s.timer);

    const tick = () => {
      const word = words[s.ri];
      s.ci = s.deleting ? s.ci - 1 : s.ci + 1;
      setText(word.slice(0, s.ci));
      if (!s.deleting && s.ci === word.length) {
        s.deleting = true;
        s.timer = window.setTimeout(tick, 2200);
        return;
      }
      if (s.deleting && s.ci === 0) {
        s.deleting = false;
        s.ri = (s.ri + 1) % words.length;
      }
      s.timer = window.setTimeout(tick, s.deleting ? 52 : 108);
    };

    s.timer = window.setTimeout(tick, 1800);
    return () => clearTimeout(s.timer);
  }, [words, enabled]);

  return text;
}

export default function Hero() {
  const { t } = useLang();
  const [inView,    setInView]    = useState(false);
  const [glitching, setGlitching] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

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

  const handleNameHover = () => {
    if (glitching) return;
    setGlitching(true);
    setTimeout(() => setGlitching(false), 800);
  };

  const years = useCounter(2,  1400, inView);
  const projs  = useCounter(5,  1600, inView);
  const techs  = useCounter(10, 1200, inView);

  const twWords  = t('hero.typewriter').split('|');
  const typeText = useTypewriter(twWords, true);

  const nameVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.3 } },
  };
  const charVariants = {
    hidden:  { opacity: 0, y: -60, rotateX: 90 },
    visible: { opacity: 1, y: 0,   rotateX: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 18 } },
  };
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0,  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const } },
  });

  const TECH_ORBS = [
    { src: '/images/logo3.png',  alt: 'HTML',       style: { left: '-52px', top: '-18px' }    },
    { src: '/images/logo2.png',  alt: 'CSS',        style: { right: '-52px', top: '20px' }    },
    { src: '/images/logo1.png',  alt: 'JavaScript', style: { left: '-52px', bottom: '-18px' } },
    { src: '/images/logo4.png',  alt: 'PostgreSQL', style: { right: '-52px', bottom: '-18px' }},
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
            {/* location badge */}
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
              id="heroName"
              variants={nameVariants}
              initial="hidden"
              animate="visible"
              onMouseEnter={handleNameHover}
              style={{ perspective: 600 }}
            >
              {ORIGINAL.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className={`hero-char${glitching ? ' glitch' : ''}`}
                  variants={charVariants}
                  style={{ display: 'inline-block' }}
                >
                  {glitching && i < ORIGINAL.length - 1
                    ? CHARSET[Math.floor(Math.random() * CHARSET.length)]
                    : char}
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

            <motion.p className="hero-role" aria-live="polite" {...fadeUp(0.5)}>
              {t('hero.role.pre')}&nbsp;
              <span className="accent-text">{typeText}</span>
              <span className="cursor-blink" aria-hidden="true">|</span>
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

            <motion.div className="hero-stats" {...fadeUp(0.88)} aria-label="Estatísticas">
              <div className="hero-stat">
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span className="stat-n">{years}</span>
                  <span className="stat-plus" aria-hidden="true">+</span>
                </div>
                <span className="stat-l">{t('hero.stat.years')}</span>
              </div>
              <div className="hero-stat-div" aria-hidden="true" />
              <div className="hero-stat">
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span className="stat-n">{projs}</span>
                  <span className="stat-plus" aria-hidden="true">+</span>
                </div>
                <span className="stat-l">{t('hero.stat.projects')}</span>
              </div>
              <div className="hero-stat-div" aria-hidden="true" />
              <div className="hero-stat">
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span className="stat-n">{techs}</span>
                  <span className="stat-plus" aria-hidden="true">+</span>
                </div>
                <span className="stat-l">{t('hero.stat.techs')}</span>
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
                  <span className="code-filename">gabriel.ts</span>
                </div>
                <div className="code-body">
                  <p><span className="c-line">1</span><span className="c-comment">// about me</span></p>
                  <p><span className="c-line">2</span><span className="c-kw">interface</span> <span className="c-prop">Profile</span> {'{'}</p>
                  <p><span className="c-line">3</span><span className="indent"><span className="c-prop">name</span>: <span className="c-str">string</span>;</span></p>
                  <p><span className="c-line">4</span><span className="indent"><span className="c-prop">role</span>: <span className="c-str">string</span>;</span></p>
                  <p><span className="c-line">5</span><span className="indent"><span className="c-prop">stack</span>: <span className="c-str">string</span>[];</span></p>
                  <p><span className="c-line">6</span><span className="indent"><span className="c-prop">open</span>: <span className="c-str">boolean</span>;</span></p>
                  <p><span className="c-line">7</span>{'}'}</p>
                  <p><span className="c-line">8</span></p>
                  <p><span className="c-line">9</span><span className="c-kw">const</span> me<span className="c-kw">:</span> <span className="c-prop">Profile</span> = {'{'}</p>
                  <p><span className="c-line">10</span><span className="indent"><span className="c-prop">name</span>: <span className="c-str">&quot;Gabriel&quot;</span>,</span></p>
                  <p><span className="c-line">11</span><span className="indent"><span className="c-prop">role</span>: <span className="c-str">&quot;Full-Stack Dev&quot;</span>,</span></p>
                  <p><span className="c-line">12</span><span className="indent"><span className="c-prop">stack</span>: [<span className="c-str">&quot;React&quot;</span>, <span className="c-str">&quot;Next&quot;</span>, <span className="c-str">&quot;Node&quot;</span>],</span></p>
                  <p><span className="c-line">13</span><span className="indent"><span className="c-prop">open</span>: <span className="c-bool">true</span>,</span></p>
                  <p><span className="c-line">14</span>{'}'};</p>
                  <p><span className="c-line">15</span><span className="cursor-code" /></p>
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

      {/* scroll-down indicator */}
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
