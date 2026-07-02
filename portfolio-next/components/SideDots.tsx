'use client';

import { useLang } from '@/contexts/LangContext';
import { useActiveSection } from '@/hooks/useActiveSection';

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
  const [active, setActive] = useActiveSection();

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
