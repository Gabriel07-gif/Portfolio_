'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';

export default function NotFound() {
  const { t } = useLang();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)',
        gap: 20, textAlign: 'center',
        padding: '24px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(0,255,136,0.05) 0%, transparent 65%)',
      }} />

      <motion.div
        initial={{ opacity: 0, y: -24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0,   scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(7rem, 28vw, 14rem)',
          fontWeight: 900, lineHeight: 1,
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 60%, var(--accent-3) 100%)',
          backgroundSize: '200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        404
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.5 }}
        style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', margin: 0 }}
      >
        {t('notFound.title')}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          color: 'var(--muted)', maxWidth: 400,
          lineHeight: 1.75, margin: 0, fontSize: '1rem',
        }}
      >
        {t('notFound.desc')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Link href="/" className="btn btn-primary">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M12 7.5H3M7 3.5L3 7.5l4 4" stroke="currentColor" strokeWidth="1.7"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('notFound.back')}
        </Link>
        <Link href="/#contato" className="btn btn-outline">
          {t('notFound.contact')}
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.7 }}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.72rem', color: 'var(--muted)',
          letterSpacing: '0.1em', marginTop: 24,
        }}
      >
        {t('notFound.code')}
      </motion.p>
    </div>
  );
}
