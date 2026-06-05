'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';

interface FormState {
  name:    string;
  email:   string;
  message: string;
}

function GmailIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M8.5 14.5L22 23.5l13.5-9" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="8" y="14" width="28" height="17" rx="2"
        fill="none" stroke="#EA4335" strokeWidth="1.5"/>
      <path d="M8 14l6 6M36 14l-6 6" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round"/>
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
  { key: 'instagram', label: 'Instagram', img: '/images/logo8.png',  url: 'https://instagram.com/devgabriel_01' },
  { key: 'whatsapp',  label: 'WhatsApp',  img: '/images/logo11.png', url: 'https://wa.me/5585988485621' },
  { key: 'github',    label: 'GitHub',    img: '/images/logo10.png', imgLight: '/images/logo9.png', url: 'https://github.com/gabriel07-gif' },
  { key: 'gmail',     label: 'Gmail',     icon: <GmailIcon />,       url: 'mailto:gabrielricarte000@gmail.com' },
  { key: 'linkedin',  label: 'LinkedIn',  img: '/images/logo12.png', url: 'https://www.linkedin.com/in/gabriel-lucas-439153308/' },
];

export default function Contact() {
  const { t }         = useLang();
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors]   = useState<Partial<FormState>>({});
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()   || form.name.length > 80)    errs.name    = 'invalid';
    if (!form.email.trim()  || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'invalid';
    if (!form.message.trim()|| form.message.length > 2000) errs.message = 'invalid';
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
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setErrors({});
        setCharCount(0);
        showToast(t('form.success'));
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        showToast(t('form.error'));
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      /* Fallback: open mailto */
      const sub  = encodeURIComponent(`Contato via Portfolio — ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\nDe: ${form.name} <${form.email}>`);
      window.location.href = `mailto:gabrielricarte000@gmail.com?subject=${sub}&body=${body}`;
      showToast(t('form.success'));
      setStatus('idle');
    }
  };

  const btnLabel =
    status === 'loading' ? t('form.sending') :
    status === 'success' ? t('form.sent')    :
    t('form.send');

  return (
    <section id="contato" className="bg-alt" aria-label="Contato">
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
            <span>{t('section.contact.pre')}</span>
            <span className="accent-text">{t('section.contact.acc')}</span>
          </h2>
          <p className="section-sub">{t('section.contact.sub')}</p>
          <div className="section-line" aria-hidden="true" />
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

        {/* Contact form */}
        <motion.form
          className="contact-form"
          id="contactForm"
          noValidate
          aria-label="Formulário de contato"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="form-row">
            <div className={`form-group${errors.name ? ' invalid' : ''}`}>
              <input
                type="text" id="formName" name="name"
                placeholder=" " required autoComplete="name"
                maxLength={80} aria-required="true"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                onBlur={() => { if (form.name.trim()) setErrors(er => ({ ...er, name: undefined })); }}
              />
              <label htmlFor="formName">{t('form.name')}</label>
              <div className="form-focus-bar" aria-hidden="true" />
            </div>
            <div className={`form-group${errors.email ? ' invalid' : ''}`}>
              <input
                type="email" id="formEmail" name="email"
                placeholder=" " required autoComplete="email"
                maxLength={120} aria-required="true"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                onBlur={() => { if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) setErrors(er => ({ ...er, email: undefined })); }}
              />
              <label htmlFor="formEmail">{t('form.email')}</label>
              <div className="form-focus-bar" aria-hidden="true" />
            </div>
          </div>

          <div className={`form-group${errors.message ? ' invalid' : ''}`}>
            <textarea
              id="formMsg" name="message" rows={5}
              placeholder=" " required maxLength={2000}
              aria-required="true"
              value={form.message}
              onChange={e => {
                setForm(f => ({ ...f, message: e.target.value }));
                setCharCount(e.target.value.length);
              }}
            />
            <label htmlFor="formMsg">{t('form.message')}</label>
            <div className="form-focus-bar" aria-hidden="true" />
            <span className="form-char-count" aria-hidden="true">{charCount} / 2000</span>
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
                    <Image src={social.img!}           alt={social.label} width={44} height={44} loading="lazy" className="github-logo-dark"  />
                    <Image src={social.imgLight ?? social.img!} alt={social.label} width={44} height={44} loading="lazy" className="github-logo-light" aria-hidden="true" />
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
