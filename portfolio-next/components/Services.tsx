'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';

const SERVICES = [
  {
    id:        'frontend',
    titleKey:  'service1.title',
    descKey:   'service1.desc',
    listKeys:  ['service1.list.1', 'service1.list.2', 'service1.list.3', 'service1.list.4'],
    highlight: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id:        'fullstack',
    titleKey:  'service2.title',
    descKey:   'service2.desc',
    listKeys:  ['service2.list.1', 'service2.list.2', 'service2.list.3', 'service2.list.4'],
    highlight: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 7h4M7 11h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id:        'design',
    titleKey:  'service3.title',
    descKey:   'service3.desc',
    listKeys:  ['service3.list.1', 'service3.list.2', 'service3.list.3', 'service3.list.4'],
    highlight: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 60, scale: 0.95, rotateX: 8 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1, rotateX: 0,
    transition: { duration: 0.85, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const spotlightRafMap = new WeakMap<Element, number>();

function onSpotlight(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const x = e.clientX;
  const y = e.clientY;
  if (spotlightRafMap.has(el)) return;
  const rafId = requestAnimationFrame(() => {
    spotlightRafMap.delete(el);
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${x - rect.left}px`);
    el.style.setProperty('--mouse-y', `${y - rect.top}px`);
  });
  spotlightRafMap.set(el, rafId);
}

export default function Services() {
  const { t } = useLang();

  return (
    <section id="servicos" className="bg-alt" aria-label={t('nav.services')}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">01</span>
          <h2>
            <span>{t('section.services.pre')}</span>
            <span className="accent-text">{t('section.services.acc')}</span>
          </h2>
          <p className="section-sub">{t('section.services.sub')}</p>
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

        <div className="services-grid">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.id}
              className={`service-card${svc.highlight ? ' service-card--highlight' : ''}`}
              data-service={svc.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
              onMouseMove={onSpotlight}
            >
              <div className="service-icon" aria-hidden="true">{svc.icon}</div>
              <h3>{t(svc.titleKey)}</h3>
              <p>{t(svc.descKey)}</p>
              <ul className="service-list" aria-label={t(svc.titleKey)}>
                {svc.listKeys.map(key => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
