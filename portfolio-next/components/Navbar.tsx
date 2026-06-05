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
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
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
          Gabriel<span className="accent-text logo-dot">.</span>
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
              aria-label="Selecionar idioma"
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
            <ul className={`lang-menu${langOpen ? ' open' : ''}`} role="listbox" aria-label="Selecionar idioma">
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
            aria-label="Alternar tema"
            type="button"
            onClick={toggle}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          {/* Mobile menu */}
          <button
            className={`menu-toggle${menuOpen ? ' active' : ''}`}
            id="menuToggle"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
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
