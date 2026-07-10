'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';
import { useCounter } from '@/hooks/useCounter';
import { useInView }   from '@/hooks/useInView';

function parseBold(str: string): ReactNode {
  return str.split(/(<strong>.*?<\/strong>)/g).map((part, i) => {
    const m = part.match(/^<strong>(.*?)<\/strong>$/);
    return m ? <strong key={i}>{m[1]}</strong> : part;
  });
}
const TIMELINE_KEYS = ['t2', 't3', 't4'] as const; 

export default function About() { 
  const { t }  = useLang();
  const [sectionRef, inView] = useInView<HTMLElement>(0.1);

  const years = useCounter(2,  1600, { trigger: inView });
  const projs  = useCounter(8,  1800, { trigger: inView });
  const techs  = useCounter(15, 1400, { trigger: inView });

  const TAGS = ['about.tag1', 'about.tag2', 'about.tag3', 'about.tag4'];

  return (
    <section id="sobre" aria-label={t('nav.about')} ref={sectionRef}>
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
          <motion.div
            className="section-line"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="about-grid">
          {/* Profile image */}
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="img-wrapper"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="img-border" />
              <Image
                src="/images/fotonova.jpg"
                alt={t('about.photo.alt')}
                width={680}
                height={760}
                quality={92}
                priority
                sizes="(max-width: 480px) calc(100vw - 48px), (max-width: 768px) 380px, (max-width: 1200px) 45vw, 360px"
                style={{ objectFit: 'cover', objectPosition: 'top center', borderRadius: '24px', width: '100%', height: 'auto' }}
              />
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{parseBold(t('about.p1'))}</p>
            <p>{parseBold(t('about.p2'))}</p>

            <div className="about-tags" aria-label={t('about.tags.label')}>
              {TAGS.map(key => (
                <span key={key}>{t(key)}</span>
              ))}
            </div>

            <div className="about-stats" aria-label={t('about.stats.label')}>
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

            {/* ── TIMELINE ── */}
            <motion.div
              className="about-timeline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="about-timeline-label">{t('timeline.title')}</span>
              <div className="timeline-list">
                {TIMELINE_KEYS.map((key, i) => (
                  <motion.div
                    key={key}
                    className="timeline-item"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="timeline-dot" aria-hidden="true" />
                    <div className="timeline-body">
                      <div className="timeline-meta">
                        <span className="timeline-year">{t(`timeline.${key}.year`)}</span>
                        <span className="timeline-title">{t(`timeline.${key}.title`)}</span>
                      </div>
                      <p className="timeline-desc">{t(`timeline.${key}.desc`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.a
              href="#contato"
              className="btn btn-primary magnetic"
              style={{ marginTop: 32, display: 'inline-flex' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('about.contact')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
