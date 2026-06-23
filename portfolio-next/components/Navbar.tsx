'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/contexts/LangContext';
import { useTheme } from '@/contexts/ThemeContext';
import { type Lang } from '@/lib/i18n';

const NAV_LINKS = [
  { href: '#inicio',      key: 'nav.home'     },
  { href: '#servicos',    key: 'nav.services'  },
  { href: '#projetos',    key: 'nav.projects'  },
  { href: '#habilidades', key: 'nav.skills'    },
  { href: '#sobre',       key: 'nav.about'     },
  { href: '#faq',         key: 'nav.faq'       },
  { href: '#contato',     key: 'nav.contact'   },
] as const;

export default function Navbar() {
  const { t, lang, setLang, meta } = useLang();
  const { theme, toggle }          = useTheme();
  const [scrolled,   setScrolled]  = useState(false);
  const [menuOpen,   setMenuOpen]  = useState(false);
  const [langOpen,   setLangOpen]  = useState(false);
  const [active,     setActive]    = useState('#inicio');
  const langRef = useRef<HTMLDivElement>(null);

  /* Navbar scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting);
        if (visible) setActive(`#${visible.target.id}`);
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* Close lang dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleNavClick = (href: string) => {
    setActive(href);
    setMenuOpen(false);
    /* Lenis (SmoothScroll) intercepts anchor clicks at document level */
  };

  const handleLangSelect = (l: Lang) => {
    setLang(l);
    setLangOpen(false);
  };

  return (
    <header>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar" aria-label="Menu principal">
        <a
          href="#inicio"
          className="logo"
          aria-label="Gabriel — Início"
          onClick={e => { e.preventDefault(); handleNavClick('#inicio'); }}
        >
          Gabriel
        </a>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks" role="list">
          {NAV_LINKS.map(({ href, key }) => (
            <li key={href}>
              <a
                href={href}
                className={active === href ? 'active' : ''}
                onClick={e => { e.preventDefault(); handleNavClick(href); }}
              >
                {t(key)}
                {active === href && (
                  <span className="nav-active-line" aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          {/* Language Switcher */}
          <div className="lang-switcher" ref={langRef} id="langSwitcher">
            <button
              className={`lang-btn${langOpen ? ' open' : ''}`}
              aria-label={t('nav.lang')}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              type="button"
              onClick={() => setLangOpen(o => !o)}
            >
              <span aria-hidden="true">{meta[lang].flag}</span>
              <span className="lang-code">{meta[lang].code}</span>
              <svg className="lang-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ul className={`lang-menu${langOpen ? ' open' : ''}`} role="listbox" aria-label={t('nav.lang')}>
              {(['pt', 'en', 'es'] as Lang[]).map(l => (
                <li
                  key={l}
                  className={`lang-option${lang === l ? ' active' : ''}`}
                  role="option"
                  tabIndex={0}
                  aria-selected={lang === l}
                  onClick={() => handleLangSelect(l)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLangSelect(l);
                    }
                  }}
                >
                  <span aria-hidden="true">{meta[l].flag}</span>
                  <span>{meta[l].name}</span>
                  <span className="lo-check" aria-hidden="true">✓</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            id="themeToggle"
            aria-label={theme === 'dark' ? t('nav.theme.dark') : t('nav.theme.light')}
            type="button"
            onClick={toggle}
          >
            {theme === 'dark' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          {/* Mobile menu */}
          <button
            className={`menu-toggle${menuOpen ? ' active' : ''}`}
            id="menuToggle"
            aria-label={menuOpen ? t('nav.menu.close') : t('nav.menu.open')}
            aria-expanded={menuOpen}
            aria-controls="navLinks"
            type="button"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  );
}
