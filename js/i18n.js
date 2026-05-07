/**
 * i18n.js — Sistema de internacionalização
 * Idiomas: Português (PT) · English (EN) · Español (ES)
 */

'use strict';

const I18N = (() => {

    /* ═══════════════════════════════════════════
       DICIONÁRIO DE TRADUÇÕES
    ═══════════════════════════════════════════ */
    const DICT = {

        /* ─── PORTUGUÊS (padrão) ─── */
        pt: {
            /* Navbar */
            'nav.home':       'Início',
            'nav.services':   'Serviços',
            'nav.projects':   'Projetos',
            'nav.skills':     'Habilidades',
            'nav.about':      'Sobre',
            'nav.contact':    'Contato',

            /* Side dots */
            'dot.home':       'Início',
            'dot.services':   'Serviços',
            'dot.projects':   'Projetos',
            'dot.skills':     'Habilidades',
            'dot.about':      'Sobre',
            'dot.contact':    'Contato',

            /* Serviços */
            'section.services.pre':  'O que',
            'section.services.acc':  ' Faço',
            'section.services.sub':  'Serviços para transformar suas ideias em realidade digital',
            'service1.title': 'Frontend Development',
            'service1.desc':  'Interfaces modernas, responsivas e performáticas criadas com HTML, CSS e JavaScript.',
            'service2.title': 'Full-Stack',
            'service2.desc':  'Desenvolvimento completo do frontend ao banco de dados, entregando soluções integradas e escaláveis.',
            'service3.title': 'UI / UX Design',
            'service3.desc':  'Experiências de usuário intuitivas e visualmente atraentes, focadas em usabilidade e conversão.',

            /* Formulário */
            'form.name':    'Seu Nome',
            'form.email':   'Seu E-mail',
            'form.message': 'Sua Mensagem',
            'form.send':    'Enviar Mensagem',
            'contact.or':   '— ou conecte-se pelas redes —',

            /* Hero */
            'hero.greeting':  'Olá, eu sou',
            'hero.role.pre':  'Desenvolvedor',
            'hero.desc':      'Criando experiências digitais modernas com código limpo e design que encanta. Transformo ideias em produtos reais.',
            'hero.btn.projects': 'Ver Projetos',
            'hero.btn.contact':  'Fale Comigo',
            'hero.available':    'Disponível para projetos',
            'hero.stat.years':   'Anos',
            'hero.stat.projects':'Projetos',
            'hero.stat.techs':   'Tecnologias',
            'hero.typewriter':   'Web Full-Stack|Frontend Dev|Criador de UIs|Apaixonado por Código',

            /* Projetos */
            'section.projects.pre':   'Meus',
            'section.projects.acc':   'Projetos',
            'section.projects.sub':   'Uma seleção dos trabalhos que mais me orgulho',
            'proj1.tag':    '⭐ Em Destaque',
            'proj1.title':  'Loja de Veículos',
            'proj1.desc':   'Site completo com filtro de produtos, paginação e integração direta com WhatsApp. Frontend moderno e totalmente responsivo.',
            'proj2.tag':    'Gestão Jurídica',
            'proj2.title':  'JuriVox',
            'proj2.desc':   'SaaS de gestão jurídica com controle de processos, clientes e prazos. Interface moderna e responsiva para escritórios de advocacia.',
            'proj.btn':     'Acessar Projeto →',

            /* Habilidades */
            'section.skills.pre':  'Minhas',
            'section.skills.acc':  'Habilidades',
            'section.skills.sub':  'Tecnologias que domino e uso no dia a dia',

            /* Sobre */
            'section.about.pre':   'Sobre',
            'section.about.acc':   'Mim',
            'section.about.sub':   'Conheça um pouco da minha história',
            'about.p1': 'Olá! Sou <strong>Gabriel</strong>, tenho 20 anos e sou apaixonado por desenvolvimento web. Estou cursando <strong>Análise e Desenvolvimento de Sistemas</strong> na Universidade Estácio de Sá em Fortaleza, Ceará.',
            'about.p2': 'Minha paixão é criar soluções digitais que sejam <span class="accent-text">funcionais</span> e <span class="accent-text">esteticamente agradáveis</span>. Sempre buscando aprender novas tecnologias e evoluir como desenvolvedor.',
            'about.tag1': 'Desenvolvimento Web',
            'about.tag2': 'UI / UX',
            'about.tag3': 'Full-Stack',
            'about.tag4': 'Banco de Dados',
            'about.stat.years':    'Anos Estudando',
            'about.stat.projects': 'Projetos',
            'about.stat.techs':    'Tecnologias',

            /* Contato */
            'section.contact.pre':  'Entre em',
            'section.contact.acc':  'Contato',
            'section.contact.sub':  'Vamos construir algo incrível juntos',
            'contact.desc': 'Aberto a oportunidades de trabalho, projetos colaborativos ou apenas para dizer olá. Escolha como prefere se conectar:',

            /* Footer */
            'footer.in':     'em Fortaleza, CE',
            'footer.top':    '↑ Topo',

            /* Toast */
            'toast.lang': '🇧🇷 Português selecionado',

            /* Page title */
            'page.title': 'Gabriel | Dev Full-Stack',
        },

        /* ─── ENGLISH ─── */
        en: {
            'nav.home':       'Home',
            'nav.services':   'Services',
            'nav.projects':   'Projects',
            'nav.skills':     'Skills',
            'nav.about':      'About',
            'nav.contact':    'Contact',

            'dot.home':       'Home',
            'dot.services':   'Services',
            'dot.projects':   'Projects',
            'dot.skills':     'Skills',
            'dot.about':      'About',
            'dot.contact':    'Contact',

            'section.services.pre':  'What I',
            'section.services.acc':  ' Do',
            'section.services.sub':  'Services to turn your ideas into digital reality',
            'service1.title': 'Frontend Development',
            'service1.desc':  'Modern, responsive, and performant interfaces built with HTML, CSS, and JavaScript.',
            'service2.title': 'Full-Stack',
            'service2.desc':  'Complete development from frontend to database, delivering integrated and scalable solutions.',
            'service3.title': 'UI / UX Design',
            'service3.desc':  'Intuitive and visually appealing user experiences focused on usability and conversion.',

            'form.name':    'Your Name',
            'form.email':   'Your Email',
            'form.message': 'Your Message',
            'form.send':    'Send Message',
            'contact.or':   '— or connect through social media —',

            'hero.greeting':  'Hi, I am',
            'hero.role.pre':  'Developer',
            'hero.desc':      'Building modern digital experiences with clean code and captivating design. I turn ideas into real products.',
            'hero.btn.projects': 'View Projects',
            'hero.btn.contact':  'Talk to Me',
            'hero.available':    'Available for projects',
            'hero.stat.years':   'Years',
            'hero.stat.projects':'Projects',
            'hero.stat.techs':   'Technologies',
            'hero.typewriter':   'Web Full-Stack|Frontend Dev|UI Creator|Code Passionate',

            'section.projects.pre':   'My',
            'section.projects.acc':   'Projects',
            'section.projects.sub':   'A selection of the work I am most proud of',
            'proj1.tag':    '⭐ Featured',
            'proj1.title':  'Vehicle Store',
            'proj1.desc':   'Complete website with product filtering, pagination, and direct WhatsApp integration. Modern and fully responsive frontend.',
            'proj2.tag':    'Legal Management',
            'proj2.title':  'JuriVox',
            'proj2.desc':   'Legal management SaaS with case tracking, client management, and deadline control. Modern and responsive interface for law firms.',
            'proj.btn':     'View Project →',

            'section.skills.pre':  'My',
            'section.skills.acc':  'Skills',
            'section.skills.sub':  'Technologies I master and use every day',

            'section.about.pre':   'About',
            'section.about.acc':   'Me',
            'section.about.sub':   'Get to know a bit of my story',
            'about.p1': 'Hi! I\'m <strong>Gabriel</strong>, I\'m 20 years old and passionate about web development. I\'m studying <strong>Systems Analysis and Development</strong> at Estácio de Sá University in Fortaleza, Brazil.',
            'about.p2': 'My passion is creating digital solutions that are <span class="accent-text">functional</span> and <span class="accent-text">aesthetically pleasing</span>. Always seeking to learn new technologies and grow as a developer.',
            'about.tag1': 'Web Development',
            'about.tag2': 'UI / UX',
            'about.tag3': 'Full-Stack',
            'about.tag4': 'Database',
            'about.stat.years':    'Years Studying',
            'about.stat.projects': 'Projects',
            'about.stat.techs':    'Technologies',

            'section.contact.pre':  'Get in',
            'section.contact.acc':  'Touch',
            'section.contact.sub':  'Let\'s build something amazing together',
            'contact.desc': 'Open to work opportunities, collaborative projects, or just to say hello. Choose how you prefer to connect:',

            'footer.made':   'Made with',
            'footer.in':     'in Fortaleza, Brazil',
            'footer.top':    '↑ Top',
            'toast.lang':    '🇺🇸 English selected',
            'page.title':    'Gabriel | Full-Stack Dev',
        },

        /* ─── ESPAÑOL ─── */
        es: {
            'nav.home':       'Inicio',
            'nav.services':   'Servicios',
            'nav.projects':   'Proyectos',
            'nav.skills':     'Habilidades',
            'nav.about':      'Sobre mí',
            'nav.contact':    'Contacto',

            'dot.home':       'Inicio',
            'dot.services':   'Servicios',
            'dot.projects':   'Proyectos',
            'dot.skills':     'Habilidades',
            'dot.about':      'Sobre mí',
            'dot.contact':    'Contacto',

            'section.services.pre':  'Lo que',
            'section.services.acc':  ' Hago',
            'section.services.sub':  'Servicios para transformar tus ideas en realidad digital',
            'service1.title': 'Frontend Development',
            'service1.desc':  'Interfaces modernas, responsivas y performáticas creadas con HTML, CSS y JavaScript.',
            'service2.title': 'Full-Stack',
            'service2.desc':  'Desarrollo completo desde el frontend hasta la base de datos, entregando soluciones integradas y escalables.',
            'service3.title': 'UI / UX Design',
            'service3.desc':  'Experiencias de usuario intuitivas y visualmente atractivas, enfocadas en usabilidad y conversión.',

            'form.name':    'Tu Nombre',
            'form.email':   'Tu E-mail',
            'form.message': 'Tu Mensaje',
            'form.send':    'Enviar Mensaje',
            'contact.or':   '— o conéctate por las redes —',

            'hero.greeting':  'Hola, soy',
            'hero.role.pre':  'Desarrollador',
            'hero.desc':      'Creando experiencias digitales modernas con código limpio y diseño cautivador. Transformo ideas en productos reales.',
            'hero.btn.projects': 'Ver Proyectos',
            'hero.btn.contact':  'Contáctame',
            'hero.available':    'Disponible para proyectos',
            'hero.stat.years':   'Años',
            'hero.stat.projects':'Proyectos',
            'hero.stat.techs':   'Tecnologías',
            'hero.typewriter':   'Web Full-Stack|Frontend Dev|Creador de UIs|Apasionado por el Código',

            'section.projects.pre':   'Mis',
            'section.projects.acc':   'Proyectos',
            'section.projects.sub':   'Una selección de los trabajos de los que más me enorgullezco',
            'proj1.tag':    '⭐ Destacado',
            'proj1.title':  'Tienda de Vehículos',
            'proj1.desc':   'Sitio completo con filtro de productos, paginación e integración directa con WhatsApp. Frontend moderno y totalmente responsive.',
            'proj2.tag':    'Gestión Jurídica',
            'proj2.title':  'JuriVox',
            'proj2.desc':   'SaaS de gestión jurídica con control de casos, clientes y plazos. Interfaz moderna y responsive para estudios de abogados.',
            'proj.btn':     'Ver Proyecto →',

            'section.skills.pre':  'Mis',
            'section.skills.acc':  'Habilidades',
            'section.skills.sub':  'Tecnologías que domino y uso a diario',

            'section.about.pre':   'Sobre',
            'section.about.acc':   'Mí',
            'section.about.sub':   'Conoce un poco de mi historia',
            'about.p1': '¡Hola! Soy <strong>Gabriel</strong>, tengo 20 años y me apasiona el desarrollo web. Estudio <strong>Análisis y Desarrollo de Sistemas</strong> en la Universidad Estácio de Sá en Fortaleza, Brasil.',
            'about.p2': 'Mi pasión es crear soluciones digitales que sean <span class="accent-text">funcionales</span> y <span class="accent-text">estéticamente agradables</span>. Siempre buscando aprender nuevas tecnologías y crecer como desarrollador.',
            'about.tag1': 'Desarrollo Web',
            'about.tag2': 'UI / UX',
            'about.tag3': 'Full-Stack',
            'about.tag4': 'Base de Datos',
            'about.stat.years':    'Años Estudiando',
            'about.stat.projects': 'Proyectos',
            'about.stat.techs':    'Tecnologías',

            'section.contact.pre':  'Ponte en',
            'section.contact.acc':  'Contacto',
            'section.contact.sub':  'Construyamos algo increíble juntos',
            'contact.desc': 'Abierto a oportunidades de trabajo, proyectos colaborativos o simplemente para saludar. Elige cómo prefieres conectarte:',

            'footer.made':   'Hecho con',
            'footer.in':     'en Fortaleza, Brasil',
            'footer.top':    '↑ Arriba',
            'toast.lang':    '🇪🇸 Español seleccionado',
            'page.title':    'Gabriel | Dev Full-Stack',
        },
    };

    /* ═══════════════════════════════════════════
       META DOS IDIOMAS (bandeira, código, nome)
    ═══════════════════════════════════════════ */
    const LANG_META = {
        pt: { flag: '🇧🇷', code: 'PT', name: 'Português' },
        en: { flag: '🇺🇸', code: 'EN', name: 'English'   },
        es: { flag: '🇪🇸', code: 'ES', name: 'Español'   },
    };

    /* ═══════════════════════════════════════════
       SIDE DOTS — labels por seção e idioma
    ═══════════════════════════════════════════ */
    const SIDE_DOT_MAP = [
        { href: '#inicio',      key: 'dot.home'     },
        { href: '#servicos',    key: 'dot.services'  },
        { href: '#projetos',    key: 'dot.projects'  },
        { href: '#habilidades', key: 'dot.skills'    },
        { href: '#sobre',       key: 'dot.about'     },
        { href: '#contato',     key: 'dot.contact'   },
    ];

    /* ═══════════════════════════════════════════
       ESTADO
    ═══════════════════════════════════════════ */
    let current = 'pt';

    /* ─── Detecta idioma preferido ─── */
    function detect() {
        const saved = localStorage.getItem('g-lang');
        if (saved && DICT[saved]) return saved;
        const br = (navigator.language || '').toLowerCase().slice(0, 2);
        if (DICT[br]) return br;
        return 'pt';
    }

    /* ─── Tradução de uma chave ─── */
    function t(key) {
        return (DICT[current] && DICT[current][key])
            || (DICT['pt']    && DICT['pt'][key])
            || key;
    }

    /* ─── Toast de notificação ─── */
    let _toastTimer = null;
    function showToast(msg) {
        const el = document.getElementById('langToast');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(_toastTimer);
        _toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
    }

    /* ─── Aplica todas as traduções na página ─── */
    function applyAll(skipTransition) {
        const root = document.documentElement;

        if (!skipTransition) {
            root.classList.add('lang-transitioning');
        }

        const doApply = () => {
            /* Elementos simples */
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (el.dataset.i18nHtml === 'true') {
                    el.innerHTML = t(key);
                } else {
                    el.textContent = t(key);
                }
            });

            /* Atributos (aria-label, placeholder, etc.) */
            document.querySelectorAll('[data-i18n-aria]').forEach(el => {
                el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
            });

            /* Side dots labels */
            document.querySelectorAll('.side-dot').forEach(dot => {
                const href = dot.getAttribute('href');
                const entry = SIDE_DOT_MAP.find(m => m.href === href);
                if (entry) {
                    dot.setAttribute('data-label', t(entry.key));
                    dot.setAttribute('aria-label', t(entry.key));
                }
            });

            /* Typewriter */
            const twWords = t('hero.typewriter').split('|');
            if (typeof window.__setTypewriterWords === 'function') {
                window.__setTypewriterWords(twWords);
            }

            /* Page title */
            document.title = t('page.title');

            /* lang attribute no html */
            root.lang = current === 'pt' ? 'pt-br' : current;

            if (!skipTransition) {
                requestAnimationFrame(() => root.classList.remove('lang-transitioning'));
            }
        };

        if (skipTransition) {
            doApply();
        } else {
            setTimeout(doApply, 180);
        }
    }

    /* ─── Atualiza a UI do seletor ─── */
    function updateSwitcherUI(lang) {
        const btn = document.getElementById('langBtn');
        if (btn) {
            const meta = LANG_META[lang];
            const flagEl = btn.querySelector('.lang-flag');
            const codeEl = btn.querySelector('.lang-code');
            if (flagEl) flagEl.textContent = meta.flag;
            if (codeEl) codeEl.textContent = meta.code;
        }
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === lang);
            opt.setAttribute('aria-selected', String(opt.dataset.lang === lang));
        });
    }

    /* ─── Muda idioma ─── */
    function setLang(lang, silent) {
        if (!DICT[lang] || lang === current) return;
        current = lang;
        localStorage.setItem('g-lang', lang);
        applyAll(false);
        updateSwitcherUI(lang);
        if (!silent) showToast(t('toast.lang'));
    }

    /* ─── Init ─── */
    function init() {
        current = detect();

        /* Inicializa opções do menu com os nomes corretos */
        document.querySelectorAll('.lang-option').forEach(opt => {
            const l = opt.dataset.lang;
            if (LANG_META[l]) {
                const flagSpan = opt.querySelector('.lo-flag');
                const nameSpan = opt.querySelector('.lo-name');
                if (flagSpan) flagSpan.textContent = LANG_META[l].flag;
                if (nameSpan) nameSpan.textContent  = LANG_META[l].name;
            }
        });

        /* Aplica idioma inicial sem transição */
        applyAll(true);
        updateSwitcherUI(current);

        /* ── Toggle do dropdown ── */
        const btn  = document.getElementById('langBtn');
        const menu = document.getElementById('langMenu');
        if (!btn || !menu) return;

        btn.addEventListener('click', e => {
            e.stopPropagation();
            const isOpen = menu.classList.toggle('open');
            btn.classList.toggle('open', isOpen);
            btn.setAttribute('aria-expanded', String(isOpen));
        });

        menu.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', () => {
                setLang(opt.dataset.lang);
                menu.classList.remove('open');
                btn.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            });
            /* Keyboard support */
            opt.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLang(opt.dataset.lang);
                    menu.classList.remove('open');
                    btn.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        });

        /* Fechar ao clicar fora */
        document.addEventListener('click', () => {
            menu.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        });

        /* Fechar com Escape */
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && menu.classList.contains('open')) {
                menu.classList.remove('open');
                btn.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                btn.focus();
            }
        });
    }

    return { init, setLang, t, current: () => current };

})();

/* Inicializa após o DOM carregar */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => I18N.init());
} else {
    I18N.init();
}
