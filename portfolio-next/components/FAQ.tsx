'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';

const FAQ_KEYS = ['1', '2', '3', '4', '5'] as const;

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => setOpen(prev => prev === key ? null : key);

  return (
    <section id="faq" className="bg-alt" aria-label={t('nav.faq')}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">05</span>
          <h2>
            <span>{t('section.faq.pre')}</span>
            <span className="accent-text">{t('section.faq.acc')}</span>
          </h2>
          <p className="section-sub">{t('section.faq.sub')}</p>
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

        <ul className="faq-list" role="list">
          {FAQ_KEYS.map((key, i) => (
            <motion.li
              key={key}
              className={`faq-item${open === key ? ' open' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                id={`faq-btn-${key}`}
                className="faq-question"
                aria-expanded={open === key}
                aria-controls={`faq-ans-${key}`}
                onClick={() => toggle(key)}
                type="button"
              >
                <span className="faq-num">0{key}</span>
                <span className="faq-q-text">{t(`faq.${key}.q`)}</span>
                <span className="faq-icon">
                  <ChevronIcon />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === key && (
                  <motion.div
                    id={`faq-ans-${key}`}
                    className="faq-answer"
                    role="region"
                    aria-labelledby={`faq-btn-${key}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p>{t(`faq.${key}.a`)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
