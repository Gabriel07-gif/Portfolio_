'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';
import { useCounter } from '@/hooks/useCounter';
import { useInView }   from '@/hooks/useInView';

export default function About() {
  const { t }  = useLang();
  const [sectionRef, inView] = useInView<HTMLElement>(0.2);

  const years = useCounter(2,  1600, { trigger: inView });
  const projs  = useCounter(5,  1800, { trigger: inView });
  const techs  = useCounter(10, 1400, { trigger: inView });

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
          {/* Profile image — clip-path reveal from left */}
          <motion.div
            className="about-image"
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0 round 24px)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0 round 24px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
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
                alt="Foto de perfil de Gabriel"
                width={680}
                height={760}
                quality={98}
                priority
                style={{ objectFit: 'cover', objectPosition: 'top center', borderRadius: '24px', width: '100%', height: 'auto', imageRendering: 'auto' }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0,255,136,0.06))',
                  borderRadius: '24px',
                }}
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

            <motion.a
              href="#contato"
              className="btn btn-primary magnetic"
              style={{ marginTop: 28, display: 'inline-flex' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
