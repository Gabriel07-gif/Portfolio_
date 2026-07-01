'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';

interface FormState {
  name:     string;
  email:    string;
  message:  string;
  website:  string; /* honeypot — hidden from real users, bots fill it */
}

function GmailIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4CAF50" d="M45 16.2l-5 2.75-5 4.75V40h7c1.657 0 3-1.343 3-3V16.2z"/>
      <path fill="#1E88E5" d="M3 16.2l3.614 1.71L13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z"/>
      <polygon fill="#E53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
      <path fill="#C62828" d="M3 12.298V16.2l10 7.5V11.2H6C4.342 11.2 3 12.342 3 12.298z"/>
      <path fill="#FBC02D" d="M45 12.298V16.2l-10 7.5V11.2h7C43.658 11.2 45 12.342 45 12.298z"/>
    </svg>
  );
}

type Social = {
  key: string;
  label: string;
  url: string;
  img?: string;
  imgLight?: string;
  icon?: React.ReactNode;
};

const SOCIALS: Social[] = [
  { key: 'facebook',  label: 'Facebook',  img: '/images/logo7.png',  url: 'https://www.facebook.com/profile.php?id=61585909988380' },
  { key: 'instagram', label: 'Instagram', img: '/images/logo8.png',  url: 'https://instagram.com/ricarte.dev' },
  { key: 'whatsapp',  label: 'WhatsApp',  img: '/images/logo11.png', url: 'https://wa.me/5585988485621' },
  { key: 'github',    label: 'GitHub',    img: '/images/logo10.png', imgLight: '/images/logo9.png', url: 'https://github.com/gabriel07-gif' },
  { key: 'gmail',     label: 'Gmail',     icon: <GmailIcon />,       url: 'https://mail.google.com/mail/?view=cm&to=gabrielricarte000@gmail.com' },
  { key: 'linkedin',  label: 'LinkedIn',  img: '/images/logo12.png', url: 'https://www.linkedin.com/in/gabriel-lucas-439153308/' },
];

const MAILTO_FALLBACK = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'gabrielricarte000@gmail.com';

export default function Contact() {
  const { t } = useLang();
  const [form, setForm]     = useState<FormState>({ name: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState<Partial<Omit<FormState, 'website'>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  const validate = (): boolean => {
    const errs: Partial<Omit<FormState, 'website'>> = {};
    if (!form.name.trim()    || form.name.length > 80)     errs.name    = 'form.error.name';
    if (!form.email.trim()   || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) errs.email = 'form.error.email';
    if (!form.message.trim() || form.message.length > 2000) errs.message = 'form.error.message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const showToast = (msg: string) => {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    /* Honeypot check — bot filled the hidden field */
    if (form.website) return;
    if (!validate()) return;
    setStatus('loading');
    try {
      const { website: _hp, ...payload } = form;
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '', website: '' });
        setErrors({});
        setCharCount(0);
        showToast(t('form.success'));
        setTimeout(() => setStatus('idle'), 3000);
      } else if (res.status === 429) {
        setStatus('error');
        showToast(t('form.rateLimit'));
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        showToast(t('form.error'));
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      /* API unreachable — open the user's mail client as fallback */
      const sub  = encodeURIComponent(`Contato via Portfolio — ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\nDe: ${form.name} <${form.email}>`);
      window.open(`mailto:${MAILTO_FALLBACK}?subject=${sub}&body=${body}`, '_blank');
      showToast(t('form.fallback'));
      setStatus('idle');
    }
  };

  const btnLabel =
    status === 'loading' ? t('form.sending') :
    status === 'success' ? t('form.sent')    :
    t('form.send');

  return (
    <section id="contato" className="bg-alt" aria-label={t('nav.contact')}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">06</span>
          <h2>
            <span>{t('section.contact.pre')}</span>
            <span className="accent-text">{t('section.contact.acc')}</span>
          </h2>
          <p className="section-sub">{t('section.contact.sub')}</p>
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

        <motion.p
          className="contact-desc"
          style={{ color: 'var(--muted)', marginBottom: 36, maxWidth: 640 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('contact.desc')}
        </motion.p>

        <motion.form
          className="contact-form"
          id="contactForm"
          noValidate
          aria-label={t('form.label')}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Honeypot — visually hidden, bots fill it, humans don't */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
          />

          <div className="form-row">
            <div className={`form-group${errors.name ? ' invalid' : ''}`}>
              <input
                type="text" id="formName" name="name"
                placeholder=" " required autoComplete="name"
                maxLength={80} aria-required="true"
                aria-describedby={errors.name ? 'err-name' : undefined}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                onBlur={() => { if (form.name.trim()) setErrors(er => ({ ...er, name: undefined })); }}
              />
              <label htmlFor="formName">{t('form.name')}</label>
              <div className="form-focus-bar" aria-hidden="true" />
              {errors.name && <span id="err-name" className="form-error-msg" role="alert">{t(errors.name)}</span>}
            </div>
            <div className={`form-group${errors.email ? ' invalid' : ''}`}>
              <input
                type="email" id="formEmail" name="email"
                placeholder=" " required autoComplete="email"
                maxLength={120} aria-required="true"
                aria-describedby={errors.email ? 'err-email' : undefined}
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                onBlur={() => { if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) setErrors(er => ({ ...er, email: undefined })); }}
              />
              <label htmlFor="formEmail">{t('form.email')}</label>
              <div className="form-focus-bar" aria-hidden="true" />
              {errors.email && <span id="err-email" className="form-error-msg" role="alert">{t(errors.email)}</span>}
            </div>
          </div>

          <div className={`form-group${errors.message ? ' invalid' : ''}`}>
            <textarea
              id="formMsg" name="message" rows={5}
              placeholder=" " required maxLength={2000}
              aria-required="true"
              aria-describedby={errors.message ? 'err-message' : undefined}
              value={form.message}
              onChange={e => {
                setForm(f => ({ ...f, message: e.target.value }));
                setCharCount(e.target.value.length);
              }}
            />
            <label htmlFor="formMsg">{t('form.message')}</label>
            <div className="form-focus-bar" aria-hidden="true" />
            <span className="form-char-count" aria-hidden="true">{charCount} / 2000</span>
            {errors.message && <span id="err-message" className="form-error-msg" role="alert">{t(errors.message)}</span>}
          </div>

          <button
            type="submit"
            className={`btn btn-primary magnetic form-submit-btn${status === 'loading' ? ' loading' : ''}${status === 'success' ? ' success' : ''}`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <svg className="spinner" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25"/>
                <path d="M9 2a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : status === 'success' ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span className="submit-label">{btnLabel}</span>
          </button>
        </motion.form>

        <p className="redes-label">{t('contact.or')}</p>

        <ul className="redes" role="list">
          {SOCIALS.map((social, i) => (
            <motion.li
              key={social.key}
              data-brand={social.key}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={social.url}
                target={social.url.startsWith('mailto') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="redelink"
              >
                {social.icon ? social.icon : social.key === 'github' ? (
                  <>
                    <Image src={social.img!}                  alt={social.label} width={44} height={44} loading="lazy" className="github-logo-dark"  />
                    <Image src={social.imgLight ?? social.img!} alt="" width={44} height={44} loading="lazy" className="github-logo-light" aria-hidden="true" />
                  </>
                ) : (
                  <Image src={social.img!} alt={social.label} width={44} height={44} loading="lazy" />
                )}
                <span>{social.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
