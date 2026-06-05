'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';

function useCounter(target: number, duration = 1600, trigger = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const tick  = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, trigger]);
  return value;
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M7.5 10.5L4 7M7.5 10.5L11 7M7.5 10.5V1.5M2 13.5h11"
        stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function About() {
  const { t }  = useLang();
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

  const years = useCounter(2,  1600, inView);
  const projs  = useCounter(5,  1800, inView);
  const techs  = useCounter(10, 1400, inView);

  const TAGS = ['about.tag1', 'about.tag2', 'about.tag3', 'about.tag4'];

  return (
    <section id="sobre" aria-label="Sobre mim" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">04</span>
          <h2>
            <span>{t('section.about.pre')}</span>
            <span className="accent-text">{t('section.about.acc')}</span>
          </h2>
          <p className="section-sub">{t('section.about.sub')}</p>
          <div className="section-line" aria-hidden="true" />
        </motion.div>

        <div className="about-grid">
          {/* Profile image */}
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -60, rotateY: 12 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 800 }}
          >
            <div className="img-wrapper">
              <div className="img-border" />
              <Image
                src="/images/logo5.jpg"
                alt="Foto de perfil de Gabriel"
                width={340}
                height={380}
                loading="lazy"
                style={{ objectFit: 'cover', borderRadius: '24px', width: '100%', height: 'auto' }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0,255,136,0.06))',
                  borderRadius: '24px',
                }}
              />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p dangerouslySetInnerHTML={{ __html: t('about.p1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('about.p2') }} />

            <div className="about-tags" aria-label="Áreas de atuação">
              {TAGS.map(key => (
                <span key={key}>{t(key)}</span>
              ))}
            </div>

            <div className="about-stats" aria-label="Números">
              <div className="about-stat">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span className="stat-num">{years}</span>
                  <span className="stat-plus" aria-hidden="true">+</span>
                </div>
                <span className="stat-label">{t('about.stat.years')}</span>
              </div>
              <div className="about-stat">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span className="stat-num">{projs}</span>
                  <span className="stat-plus" aria-hidden="true">+</span>
                </div>
                <span className="stat-label">{t('about.stat.projects')}</span>
              </div>
              <div className="about-stat">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span className="stat-num">{techs}</span>
                  <span className="stat-plus" aria-hidden="true">+</span>
                </div>
                <span className="stat-label">{t('about.stat.techs')}</span>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <a
                href="/cv-gabriel-ricarte.pdf"
                download
                className="btn btn-outline magnetic"
                aria-label="Download do currículo"
              >
                <DownloadIcon />
                {t('about.cv')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
