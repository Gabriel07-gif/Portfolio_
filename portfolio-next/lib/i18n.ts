export type Lang = 'pt' | 'en' | 'es';

export interface LangMeta { flag: string; code: string; name: string; }

export const LANG_META: Record<Lang, LangMeta> = {
  pt: { flag: '🇧🇷', code: 'PT', name: 'Português' },
  en: { flag: '🇺🇸', code: 'EN', name: 'English'   },
  es: { flag: '🇪🇸', code: 'ES', name: 'Español'   },
};

type Dict = Record<string, string>;

const pt: Dict = {
  /* Nav */
  'nav.home':     'Início',   'nav.services': 'Serviços',
  'nav.projects': 'Projetos', 'nav.skills':   'Habilidades',
  'nav.about':    'Sobre',    'nav.contact':  'Contato',

  /* Hero */
  'hero.greeting':      'Olá, eu sou',
  'hero.role.pre':      'Desenvolvedor',
  'hero.desc':          'Criando experiências digitais modernas com código limpo e design que encanta. Transformo ideias em produtos reais.',
  'hero.btn.projects':  'Ver Projetos',
  'hero.btn.contact':   'Fale Comigo',
  'hero.available':     'Disponível para projetos',
  'hero.stat.years':    'Anos de Estudo',
  'hero.stat.projects': 'Projetos',
  'hero.stat.techs':    'Tecnologias',
  'hero.typewriter':    'Web Full-Stack|Frontend Dev|React Developer|Criador de UIs',

  /* Services */
  'section.services.pre': 'O que', 'section.services.acc': ' Faço',
  'section.services.sub': 'Serviços para transformar suas ideias em realidade digital',
  'service1.title': 'Frontend Development',
  'service1.desc':  'Interfaces modernas, responsivas e performáticas com React, Next.js e TypeScript.',
  'service2.title': 'Full-Stack',
  'service2.desc':  'Desenvolvimento completo do frontend ao banco de dados, entregando soluções integradas e escaláveis.',
  'service3.title': 'UI / UX Design',
  'service3.desc':  'Experiências de usuário intuitivas e visualmente atraentes, focadas em usabilidade e conversão.',

  /* Projects */
  'section.projects.pre': 'Meus', 'section.projects.acc': ' Projetos',
  'section.projects.sub': 'Uma seleção dos trabalhos que mais me orgulho',
  'proj1.tag':   '⭐ Em Destaque',
  'proj1.title': 'Loja de Veículos',
  'proj1.desc':  'Site completo com filtro de produtos, paginação e integração direta com WhatsApp. Frontend moderno e totalmente responsivo.',
  'proj2.tag':   'Gestão Jurídica',
  'proj2.title': 'JuriVox',
  'proj2.desc':  'SaaS de gestão jurídica com controle de processos, clientes e prazos. Interface moderna e responsiva para escritórios de advocacia.',
  'proj3.tag':   'Projeto Pessoal',
  'proj3.title': 'Portfolio',
  'proj3.desc':  'Portfolio pessoal construído com Next.js, TypeScript e animações 3D com Three.js. Design moderno com suporte a temas e multi-idiomas.',
  'proj.btn':    'Acessar Projeto',

  /* Skills */
  'section.skills.pre': 'Minhas', 'section.skills.acc': ' Habilidades',
  'section.skills.sub': 'Tecnologias que domino e uso no dia a dia',

  /* About */
  'section.about.pre': 'Sobre', 'section.about.acc': ' Mim',
  'section.about.sub': 'Conheça um pouco da minha história',
  'about.p1': 'Olá! Sou <strong>Gabriel</strong>, tenho 20 anos e sou apaixonado por desenvolvimento web. Estou cursando <strong>Análise e Desenvolvimento de Sistemas</strong> na Universidade Estácio de Sá em Fortaleza, Ceará.',
  'about.p2': 'Minha paixão é criar soluções digitais que sejam funcionais e esteticamente agradáveis. Sempre buscando aprender novas tecnologias — atualmente focado em <strong>React</strong>, <strong>Next.js</strong> e <strong>TypeScript</strong>.',
  'about.tag1': 'Desenvolvimento Web',
  'about.tag2': 'UI / UX',
  'about.tag3': 'Full-Stack',
  'about.tag4': 'Banco de Dados',
  'about.stat.years':    'Anos Estudando',
  'about.stat.projects': 'Projetos',
  'about.stat.techs':    'Tecnologias',
  'about.cv':            'Download CV',

  /* Contact */
  'section.contact.pre': 'Entre em', 'section.contact.acc': ' Contato',
  'section.contact.sub': 'Vamos construir algo incrível juntos',
  'contact.desc':    'Aberto a oportunidades de trabalho, projetos colaborativos ou apenas para dizer olá. Escolha como prefere se conectar:',
  'contact.or':      '— ou conecte-se pelas redes —',
  'form.name':       'Seu Nome',
  'form.email':      'Seu E-mail',
  'form.message':    'Sua Mensagem',
  'form.send':       'Enviar Mensagem',
  'form.sending':    'Enviando...',
  'form.sent':       '✓ Enviado!',
  'form.success':    '✅ Mensagem enviada! Responderei em breve.',
  'form.error':      '❌ Erro ao enviar. Tente novamente.',

  /* Footer */
  'footer.in':  'em Fortaleza, CE',
  'footer.top': '↑ Topo',

  /* Toast */
  'toast.lang': '🇧🇷 Português selecionado',

  /* Page */
  'page.title': 'Gabriel Ricarte | Dev Full-Stack',
};

const en: Dict = {
  /* Nav */
  'nav.home':     'Home',    'nav.services': 'Services',
  'nav.projects': 'Projects','nav.skills':   'Skills',
  'nav.about':    'About',   'nav.contact':  'Contact',

  /* Hero */
  'hero.greeting':      'Hi, I am',
  'hero.role.pre':      'Developer',
  'hero.desc':          'Building modern digital experiences with clean code and captivating design. I turn ideas into real products.',
  'hero.btn.projects':  'View Projects',
  'hero.btn.contact':   'Talk to Me',
  'hero.available':     'Available for projects',
  'hero.stat.years':    'Years Studying',
  'hero.stat.projects': 'Projects',
  'hero.stat.techs':    'Technologies',
  'hero.typewriter':    'Web Full-Stack|Frontend Dev|React Developer|UI Creator',

  /* Services */
  'section.services.pre': 'What I', 'section.services.acc': ' Do',
  'section.services.sub': 'Services to turn your ideas into digital reality',
  'service1.title': 'Frontend Development',
  'service1.desc':  'Modern, responsive, and performant interfaces built with React, Next.js and TypeScript.',
  'service2.title': 'Full-Stack',
  'service2.desc':  'Complete development from frontend to database, delivering integrated and scalable solutions.',
  'service3.title': 'UI / UX Design',
  'service3.desc':  'Intuitive and visually appealing user experiences focused on usability and conversion.',

  /* Projects */
  'section.projects.pre': 'My', 'section.projects.acc': ' Projects',
  'section.projects.sub': 'A selection of the work I am most proud of',
  'proj1.tag':   '⭐ Featured',
  'proj1.title': 'Vehicle Store',
  'proj1.desc':  'Complete website with product filtering, pagination, and direct WhatsApp integration. Modern and fully responsive frontend.',
  'proj2.tag':   'Legal Management',
  'proj2.title': 'JuriVox',
  'proj2.desc':  'Legal management SaaS with case tracking, client management, and deadline control. Modern interface for law firms.',
  'proj3.tag':   'Personal Project',
  'proj3.title': 'Portfolio',
  'proj3.desc':  'Personal portfolio built with Next.js, TypeScript and 3D animations using Three.js. Modern design with theme and multi-language support.',
  'proj.btn':    'View Project',

  /* Skills */
  'section.skills.pre': 'My', 'section.skills.acc': ' Skills',
  'section.skills.sub': 'Technologies I master and use every day',

  /* About */
  'section.about.pre': 'About', 'section.about.acc': ' Me',
  'section.about.sub': 'Get to know a bit of my story',
  'about.p1': "Hi! I'm <strong>Gabriel</strong>, I'm 20 years old and passionate about web development. I'm studying <strong>Systems Analysis and Development</strong> at Estácio de Sá University in Fortaleza, Brazil.",
  'about.p2': 'My passion is creating digital solutions that are functional and aesthetically pleasing. Always learning new technologies — currently focused on <strong>React</strong>, <strong>Next.js</strong> and <strong>TypeScript</strong>.',
  'about.tag1': 'Web Development',
  'about.tag2': 'UI / UX',
  'about.tag3': 'Full-Stack',
  'about.tag4': 'Database',
  'about.stat.years':    'Years Studying',
  'about.stat.projects': 'Projects',
  'about.stat.techs':    'Technologies',
  'about.cv':            'Download CV',

  /* Contact */
  'section.contact.pre': 'Get in', 'section.contact.acc': ' Touch',
  'section.contact.sub': "Let's build something amazing together",
  'contact.desc':    'Open to work opportunities, collaborative projects, or just to say hello. Choose how you prefer to connect:',
  'contact.or':      '— or connect through social media —',
  'form.name':       'Your Name',
  'form.email':      'Your Email',
  'form.message':    'Your Message',
  'form.send':       'Send Message',
  'form.sending':    'Sending...',
  'form.sent':       '✓ Sent!',
  'form.success':    "✅ Message sent! I'll reply soon.",
  'form.error':      '❌ Send error. Please try again.',

  /* Footer */
  'footer.in':  'in Fortaleza, Brazil',
  'footer.top': '↑ Top',

  /* Toast */
  'toast.lang': '🇺🇸 English selected',

  /* Page */
  'page.title': 'Gabriel Ricarte | Full-Stack Dev',
};

const es: Dict = {
  /* Nav */
  'nav.home':     'Inicio',      'nav.services': 'Servicios',
  'nav.projects': 'Proyectos',   'nav.skills':   'Habilidades',
  'nav.about':    'Sobre mí',    'nav.contact':  'Contacto',

  /* Hero */
  'hero.greeting':      'Hola, soy',
  'hero.role.pre':      'Desarrollador',
  'hero.desc':          'Creando experiencias digitales modernas con código limpio y diseño cautivador. Transformo ideas en productos reales.',
  'hero.btn.projects':  'Ver Proyectos',
  'hero.btn.contact':   'Contáctame',
  'hero.available':     'Disponible para proyectos',
  'hero.stat.years':    'Años Estudiando',
  'hero.stat.projects': 'Proyectos',
  'hero.stat.techs':    'Tecnologías',
  'hero.typewriter':    'Web Full-Stack|Frontend Dev|React Developer|Creador de UIs',

  /* Services */
  'section.services.pre': 'Lo que', 'section.services.acc': ' Hago',
  'section.services.sub': 'Servicios para transformar tus ideas en realidad digital',
  'service1.title': 'Frontend Development',
  'service1.desc':  'Interfaces modernas, responsivas y performáticas con React, Next.js y TypeScript.',
  'service2.title': 'Full-Stack',
  'service2.desc':  'Desarrollo completo desde el frontend hasta la base de datos, entregando soluciones integradas y escalables.',
  'service3.title': 'UI / UX Design',
  'service3.desc':  'Experiencias de usuario intuitivas y visualmente atractivas, enfocadas en usabilidad y conversión.',

  /* Projects */
  'section.projects.pre': 'Mis', 'section.projects.acc': ' Proyectos',
  'section.projects.sub': 'Una selección de los trabajos de los que más me enorgullezco',
  'proj1.tag':   '⭐ Destacado',
  'proj1.title': 'Tienda de Vehículos',
  'proj1.desc':  'Sitio completo con filtro de productos, paginación e integración directa con WhatsApp. Frontend moderno y totalmente responsive.',
  'proj2.tag':   'Gestión Jurídica',
  'proj2.title': 'JuriVox',
  'proj2.desc':  'SaaS de gestión jurídica con control de casos, clientes y plazos. Interfaz moderna y responsive para estudios de abogados.',
  'proj3.tag':   'Proyecto Personal',
  'proj3.title': 'Portfolio',
  'proj3.desc':  'Portfolio personal construido con Next.js, TypeScript y animaciones 3D con Three.js. Diseño moderno con soporte de temas y múltiples idiomas.',
  'proj.btn':    'Ver Proyecto',

  /* Skills */
  'section.skills.pre': 'Mis', 'section.skills.acc': ' Habilidades',
  'section.skills.sub': 'Tecnologías que domino y uso a diario',

  /* About */
  'section.about.pre': 'Sobre', 'section.about.acc': ' Mí',
  'section.about.sub': 'Conoce un poco de mi historia',
  'about.p1': '¡Hola! Soy <strong>Gabriel</strong>, tengo 20 años y me apasiona el desarrollo web. Estudio <strong>Análisis y Desarrollo de Sistemas</strong> en la Universidad Estácio de Sá en Fortaleza, Brasil.',
  'about.p2': 'Mi pasión es crear soluciones digitales funcionales y estéticamente agradables. Siempre aprendiendo — actualmente enfocado en <strong>React</strong>, <strong>Next.js</strong> y <strong>TypeScript</strong>.',
  'about.tag1': 'Desarrollo Web',
  'about.tag2': 'UI / UX',
  'about.tag3': 'Full-Stack',
  'about.tag4': 'Base de Datos',
  'about.stat.years':    'Años Estudiando',
  'about.stat.projects': 'Proyectos',
  'about.stat.techs':    'Tecnologías',
  'about.cv':            'Descargar CV',

  /* Contact */
  'section.contact.pre': 'Ponte en', 'section.contact.acc': ' Contacto',
  'section.contact.sub': 'Construyamos algo increíble juntos',
  'contact.desc':    'Abierto a oportunidades de trabajo, proyectos colaborativos o simplemente para saludar. Elige cómo prefieres conectarte:',
  'contact.or':      '— o conéctate por las redes —',
  'form.name':       'Tu Nombre',
  'form.email':      'Tu E-mail',
  'form.message':    'Tu Mensaje',
  'form.send':       'Enviar Mensaje',
  'form.sending':    'Enviando...',
  'form.sent':       '✓ ¡Enviado!',
  'form.success':    '✅ ¡Mensaje enviado! Te responderé pronto.',
  'form.error':      '❌ Error al enviar. Inténtalo de nuevo.',

  /* Footer */
  'footer.in':  'en Fortaleza, Brasil',
  'footer.top': '↑ Arriba',

  /* Toast */
  'toast.lang': '🇪🇸 Español seleccionado',

  /* Page */
  'page.title': 'Gabriel Ricarte | Dev Full-Stack',
};

export const DICT: Record<Lang, Dict> = { pt, en, es };

export function translate(lang: Lang, key: string): string {
  return DICT[lang]?.[key] ?? DICT['pt']?.[key] ?? key;
}

export function detectLang(): Lang {
  if (typeof window === 'undefined') return 'pt';
  const saved = localStorage.getItem('g-lang') as Lang | null;
  if (saved && DICT[saved]) return saved;
  const br = (navigator.language || '').toLowerCase().slice(0, 2) as Lang;
  if (DICT[br]) return br;
  return 'pt';
}
