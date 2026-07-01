'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/contexts/LangContext';

const SECTIONS = [
  { href: '#inicio',      labelKey: 'nav.home'     },
  { href: '#servicos',    labelKey: 'nav.services'  },
  { href: '#projetos',    labelKey: 'nav.projects'  },
  { href: '#habilidades', labelKey: 'nav.skills'    },
  { href: '#sobre',       labelKey: 'nav.about'     },
  { href: '#faq',         labelKey: 'nav.faq'       },
  { href: '#contato',     labelKey: 'nav.contact'   },
] as const;

export default function SideDots() {
  const { t }  = useLang();
  const [active, setActive] = useState('#inicio');

  useEffect(() => {
    const secs = document.querySelectorAll<HTMLElement>('section[id]');
    const obs  = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting);
        if (visible) setActive(`#${visible.target.id}`);
      },
      { threshold: 0.4 }
    );
    secs.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActive(href);
    /* Lenis (SmoothScroll) intercepts anchor clicks at document level */
  };

  return (
    <nav className="side-dots" id="sideDots" aria-label={t('nav.sections.label')}>
      {SECTIONS.map(({ href, labelKey }) => (
        <a
          key={href}
          href={href}
          data-label={t(labelKey)}
          className={`side-dot${active === href ? ' active' : ''}`}
          aria-label={t(labelKey)}
          onClick={e => handleClick(e, href)}
        />
      ))}
    </nav>
  );
}
