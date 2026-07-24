'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';
import { PROJECTS, type Project } from '@/data/projects';

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M4 1H1v10h10V8M7 1h4m0 0v4M11 1 5.5 6.5"
        stroke="currentColor" strokeWidth="1.3"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="9" cy="10" r="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 17l5-5 4 4 3-3 6 4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M15 10l7-4v12l-7-4V10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

const PROJECT_IMG_SIZES = '(max-width: 900px) calc(100vw - 48px), (max-width: 1400px) calc(50vw - 24px), 680px';

function VideoPreview({ src, poster, fallback }: { src: string; poster?: string; fallback: React.ReactNode }) {
  const [errored,   setErrored]   = React.useState(false);
  const [inView,    setInView]    = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const margin = window.innerWidth <= 768 ? '150px' : '300px';
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: margin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const placeholder = poster ? (
    <Image
      src={poster} alt="" fill
      style={{ objectFit: 'cover', objectPosition: 'top' }}
      sizes={PROJECT_IMG_SIZES}
    />
  ) : fallback;

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {errored ? fallback : inView ? (
        <video
          src={src}
          poster={poster}
          autoPlay muted loop playsInline
          preload="metadata"
          onError={() => setErrored(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
            display: 'block',
          }}
        />
      ) : placeholder}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  t,
  mediaMode,
}: {
  project: Project;
  index: number;
  t: (k: string) => string;
  mediaMode: 'photo' | 'video';
}) {
  /* 3D tilt — Framer Motion motion values (composes safely with animations) */
  const mouseX  = useMotionValue(0.5);
  const mouseY  = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 260, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 260, damping: 28 });
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  /* Disable 3D tilt on touch devices */
  const [isTouch, setIsTouch] = React.useState(false);
  React.useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouch) return;
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left)  / r.width);
    mouseY.set((e.clientY - r.top)   / r.height);
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  };

  const onMouseLeave = () => {
    if (isTouch) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.article
      className={`project-card${project.featured ? ' project-card--featured' : ''}`}
      data-cursor-label={t('proj.cursor')}
      initial={{ opacity: 0, y: 70, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={isTouch ? {} : { y: -8 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.14, ease: [0.34, 1.56, 0.64, 1] }}
      style={isTouch ? {} : { rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Browser chrome + preview */}
      <div className="project-preview" aria-hidden="true">
        <div className="preview-chrome">
          <div className="preview-dots">
            <i /><i /><i />
          </div>
          <span className="preview-url">{project.urlLabel}</span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="preview-open"
            tabIndex={-1}
            aria-hidden="true"
          >
            <ExternalIcon />
          </a>
        </div>
        <div className="preview-body preview-svg">
          {project.videoSrc && mediaMode === 'video' ? (
            <VideoPreview
              src={project.videoSrc}
              poster={project.screenshot || undefined}
              fallback={
                project.screenshot ? (
                  <Image
                    src={project.screenshot}
                    alt={t(project.titleKey)}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                    sizes={PROJECT_IMG_SIZES}
                  />
                ) : project.fallback
              }
            />
          ) : project.screenshot ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={project.screenshot}
                alt={t(project.titleKey)}
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                sizes={PROJECT_IMG_SIZES}
              />
            </div>
          ) : (
            project.fallback
          )}
        </div>
      </div>

      <div className="project-body">
        <div className="project-card-meta">
          <span className="project-card-num">{String(index + 1).padStart(2, '0')}</span>
          {project.live && (
            <span className="project-live-badge" aria-label={t('proj.live.label')}>
              <span className="project-live-dot" aria-hidden="true" />
              LIVE
            </span>
          )}
        </div>
        <div className="project-tag">{t(project.tagKey)}</div>
        <h3>{t(project.titleKey)}</h3>
        <p>{t(project.descKey)}</p>
        <div className="project-techs" aria-label={t('proj.techs.label')}>
          {project.techs.map(tech => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-actions">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary magnetic"
          >
            <span>{t('proj.btn')}</span>
            <ExternalIcon />
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline magnetic btn-icon"
              aria-label={t('proj.github.label')}
            >
              <GitHubIcon />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { t } = useLang();
  const [mediaMode, setMediaMode] = React.useState<'photo' | 'video'>('photo');

  return (
    <section id="projetos" aria-label={t('nav.projects')}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">02</span>
          <h2>
            <span>{t('section.projects.pre')}</span>
            <span className="accent-text">{t('section.projects.acc')}</span>
          </h2>
          <p className="section-sub">{t('section.projects.sub')}</p>
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

        <div className="projects-mode-toggle" role="group" aria-label={t('proj.toggle.label')}>
          <button
            type="button"
            className={`projects-mode-btn${mediaMode === 'photo' ? ' active' : ''}`}
            aria-pressed={mediaMode === 'photo'}
            onClick={() => setMediaMode('photo')}
          >
            <PhotoIcon /> {t('proj.toggle.photo')}
          </button>
          <button
            type="button"
            className={`projects-mode-btn${mediaMode === 'video' ? ' active' : ''}`}
            aria-pressed={mediaMode === 'video'}
            onClick={() => setMediaMode('video')}
          >
            <VideoIcon /> {t('proj.toggle.video')}
          </button>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} t={t} mediaMode={mediaMode} />
          ))}
        </div>
      </div>
    </section>
  );
}
