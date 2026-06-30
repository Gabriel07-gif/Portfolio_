'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';

export default function Testimonial() {
  const { t } = useLang();

  return (
    <section id="depoimento" className="testimonial-section" aria-label={t('testimonial.label')}>
      <div className="container">
        <motion.div
          className="testimonial-wrap"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Label */}
          <div className="testimonial-label-row" aria-hidden="true">
            <span className="testimonial-line" />
            <span className="testimonial-tag">{t('testimonial.label')}</span>
            <span className="testimonial-line" />
          </div>

          {/* Quote mark */}
          <div className="testimonial-quote-mark" aria-hidden="true">"</div>

          {/* Quote text */}
          <motion.blockquote
            className="testimonial-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('testimonial.quote').replace(/^"|"$/g, '')}
          </motion.blockquote>

          {/* Attribution */}
          <motion.div
            className="testimonial-author"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="testimonial-avatar" aria-hidden="true">V</div>
            <div>
              <span className="testimonial-name">{t('testimonial.name')}</span>
              <span className="testimonial-role">{t('testimonial.role')}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
