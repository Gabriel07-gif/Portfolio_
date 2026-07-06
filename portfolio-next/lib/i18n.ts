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
  'hero.greeting':    'Olá, eu sou',
  'hero.role.pre':    'Desenvolvedor',
  'hero.role.title':  'Full-Stack',
  'hero.desc':        'Construo interfaces rápidas e APIs confiáveis — com atenção aos detalhes que separam um produto funcional de um produto que as pessoas gostam de usar.',
  'hero.btn.projects': 'Ver Projetos',
  'hero.btn.contact':  'Fale Comigo',
  'hero.available':    'Disponível para projetos',
  'hero.stat.years':    'Anos de Estudo',
  'hero.stat.projects': 'Projetos',
  'hero.stat.techs':    'Tecnologias',

  /* Services */
  'section.services.pre': 'O que', 'section.services.acc': ' Faço',
  'section.services.sub': 'O que entrego em cada projeto — sem rodeios',
  'service1.title': 'Frontend',
  'service1.desc':  'Interfaces que rodam rápido e parecem polidas. Atenção especial a performance, acessibilidade e os detalhes que os usuários sentem mas não conseguem nomear.',
  'service2.title': 'Full-Stack',
  'service2.desc':  'Do banco de dados à tela. Construo APIs, modelos de dados e frontends que funcionam como um sistema coeso — sem partes desconexas coladas juntas.',
  'service3.title': 'UI / UX',
  'service3.desc':  'Hierarquia visual, espaçamento e cores que guiam o olho. Não é só parecer bonito — é eliminar o atrito para o usuário concluir o que veio fazer.',

  /* Projects */
  'section.projects.pre': 'Meus', 'section.projects.acc': ' Projetos',
  'section.projects.sub': 'Projetos que mostram como trabalho na prática',
  /* Testimonial */
  'testimonial.quote': '"Gabriel entregou o site da nossa loja exatamente como precisávamos — rápido, bonito e fácil de navegar. Aumentou bastante o contato de clientes pelo WhatsApp."',
  'testimonial.name':  'Venezamotos',
  'testimonial.role':  'Cliente Real · venezamotoseveiculos.com.br',
  'testimonial.label': 'O que dizem',
  /* Timeline */
  'timeline.title':    'Trajetória',
  'timeline.t2.year':  '2023',
  'timeline.t2.title': 'Análise e Des. de Sistemas',
  'timeline.t2.desc':  'Ingresso na Estácio, Fortaleza — ADS. Foco em web full-stack.',
  'timeline.t3.year':  '2024',
  'timeline.t3.title': 'Desenvolvedor Freelance',
  'timeline.t3.desc':  'Primeiro cliente real (Venezamotos). Migração para React, Next.js e TypeScript.',
  'timeline.t4.year':  '2025',
  'timeline.t4.title': 'Full-Stack & SaaS',
  'timeline.t4.desc':  'JuriVox: plataforma SaaS jurídica com Next.js, Supabase, Clerk e Stripe.',
  'proj1.tag':   'Cliente Real',
  'proj1.title': 'Venezamotos',
  'proj1.desc':  'Site de revenda de motos e veículos com catálogo, filtros por categoria e contato direto via WhatsApp. HTML, CSS e JavaScript puro — sem frameworks, zero dependências de build.',
  'proj2.tag':   'SaaS Jurídico',
  'proj2.title': 'JuriVox',
  'proj2.desc':  'Plataforma para escritórios de advocacia gerenciarem processos, clientes e prazos. Interface construída para fluxo de trabalho jurídico real, não para aparecer em screenshot.',
  'proj3.tag':   'Projeto Pessoal',
  'proj3.title': 'Este Portfólio',
  'proj3.desc':  'Next.js 15, TypeScript, Framer Motion e Three.js na intro 3D. Multi-idioma (PT/EN/ES), tema dark/light e formulário de contato via API — construído do zero.',
  'proj.btn':    'Acessar',
  'proj.cursor': 'ABRIR',
  'proj.toggle.label': 'Modo de visualização',
  'proj.toggle.photo': 'Fotos',
  'proj.toggle.video': 'Vídeos',

  /* Skills */
  'section.skills.pre': 'Stack', 'section.skills.acc': ' Técnica',
  'section.skills.sub': 'As tecnologias que uso no dia a dia',
  'skills.cat.frontend': 'Frontend',
  'skills.cat.backend':  'Backend & Banco de Dados',
  'skills.cat.tools':    'Ferramentas',

  /* About */
  'section.about.pre': 'Sobre', 'section.about.acc': ' Mim',
  'section.about.sub': 'Por que fui parar nisso',
  'about.p1': 'Comecei a programar aos 18 anos tentando montar um site para o negócio da família. O que era pra ser um fim de semana virou uma obsessão — hoje tenho 20 anos, curso <strong>Análise e Desenvolvimento de Sistemas</strong> na Estácio em Fortaleza e desenvolvo aplicações completas para clientes reais.',
  'about.p2': 'Me importo com os detalhes que a maioria ignora: performance real, animações que fazem sentido, código que outra pessoa vai conseguir dar manutenção. Atualmente focado em <strong>Next.js</strong>, <strong>Node.js</strong> e <strong>PostgreSQL</strong>.',
  'about.tag1': 'Next.js & React',
  'about.tag2': 'Node.js & SQL',
  'about.tag3': 'UI que Funciona',
  'about.tag4': 'Fortaleza, CE',
  'about.stat.years':    'Anos Programando',
  'about.stat.projects': 'Projetos',
  'about.stat.techs':    'Tecnologias',
  'about.contact':       'Fale Comigo',

  /* FAQ */
  'nav.faq': 'FAQ',
  'section.faq.pre': 'Perguntas', 'section.faq.acc': ' Frequentes',
  'section.faq.sub': 'Respostas diretas às perguntas mais comuns',
  'faq.1.q': 'Qual o prazo médio de entrega de um projeto?',
  'faq.1.a': 'Depende da complexidade: uma landing page simples fica pronta em 5–7 dias úteis, um sistema completo leva entre 3 a 6 semanas. Sempre combinamos o prazo antes de começar e eu cumpro o que prometo.',
  'faq.2.q': 'Posso pedir alterações no design depois de aprovado?',
  'faq.2.a': 'Sim. Incluo duas rodadas de revisão no escopo. Após isso, alterações adicionais têm um custo combinado. O objetivo é entregar exatamente o que você precisa — sem surpresas.',
  'faq.3.q': 'Você trabalha com clientes fora do Brasil?',
  'faq.3.a': 'Sim, atendo clientes no Brasil e no exterior. Comunicação em português, inglês ou espanhol. Pagamento via transferência internacional (Wise, PayPal) ou Pix.',
  'faq.4.q': 'Como funciona o processo de pagamento?',
  'faq.4.a': 'Geralmente trabalho com 50% no início e 50% na entrega. Para projetos maiores podemos dividir em mais etapas. Aceito Pix, transferência bancária e, para clientes internacionais, Wise ou PayPal.',
  'faq.5.q': 'Você oferece suporte após a entrega?',
  'faq.5.a': 'Sim. Ofereço 30 dias de suporte gratuito após a entrega para corrigir eventuais bugs. Após isso, manutenção e novas funcionalidades são cobradas por hora ou em planos mensais.',

  /* Contact */
  'section.contact.pre': 'Entre em', 'section.contact.acc': ' Contato',
  'section.contact.sub': 'Vamos construir algo juntos',
  'contact.desc':    'Aberto a projetos freelance, oportunidades CLT ou apenas para conversar sobre tecnologia. Respondo em até 24h.',
  'contact.or':      '— ou pelas redes —',
  'form.name':       'Seu Nome',
  'form.email':      'Seu E-mail',
  'form.message':    'Sua Mensagem',
  'form.send':       'Enviar',
  'form.sending':    'Enviando...',
  'form.sent':       '✓ Enviado!',
  'form.success':    'Mensagem enviada. Responderei em breve.',
  'form.error':      'Erro ao enviar. Tente novamente.',
  'form.fallback':   'Não foi possível enviar. Abrindo seu e-mail…',
  'form.rateLimit':  'Muitas tentativas. Aguarde 1 minuto e tente novamente.',
  'form.error.name':    'Nome obrigatório (máx. 80 caracteres)',
  'form.error.email':   'E-mail inválido',
  'form.error.message': 'Mensagem obrigatória (máx. 2000 caracteres)',
  'form.fallback.subject': 'Contato via Portfolio — ',
  'form.fallback.from':    'De: ',

  /* Footer */
  'footer.in':       'em Fortaleza, CE',
  'footer.builtWith': 'Feito com',
  'footer.top':      '↑ Topo',
  'footer.back':     'Voltar ao topo',

  /* Toast */
  'toast.lang': '🇧🇷 Português selecionado',

  /* Page */
  'page.title': 'Gabriel Ricarte | Dev Full-Stack',

  /* 404 */
  'notFound.title':   'Página não encontrada',
  'notFound.desc':    'Essa rota não existe ou foi movida. Verifique o link ou volte à página inicial.',
  'notFound.back':    'Voltar ao início',
  'notFound.contact': 'Entre em contato',

  /* Services lists */
  'service1.list.1': 'HTML5 / CSS3',
  'service1.list.2': 'JavaScript & TypeScript',
  'service1.list.3': 'React & Next.js',
  'service1.list.4': 'Animações & UI',
  'service2.list.1': 'React / Next.js',
  'service2.list.2': 'Node.js & APIs REST',
  'service2.list.3': 'PostgreSQL / SQL',
  'service2.list.4': 'Deploy & DevOps',
  'service3.list.1': 'UI / UX Moderno',
  'service3.list.2': 'Design Responsivo',
  'service3.list.3': 'Framer Motion',
  'service3.list.4': 'Design Systems',

  /* Intro overlay */
  'intro.tag':       'Dev Full-Stack · Fortaleza, CE',
  'intro.role':      'Desenvolvedor Web Full-Stack',
  'intro.skip':      'Clique ou pressione ESC',
  'intro.skip.touch':'Toque para continuar',

  /* Navbar aria-labels */
  'nav.theme.dark':  'Ativar tema claro',
  'nav.theme.light': 'Ativar tema escuro',
  'nav.menu.open':   'Abrir menu',
  'nav.menu.close':  'Fechar menu',
  'nav.lang':        'Selecionar idioma',

  /* Footer */
  'footer.rights': 'Todos os direitos reservados.',

  /* Aria-labels */
  'hero.label':          'Apresentação',
  'hero.location.label': 'Localização',
  'hero.stats.label':    'Estatísticas',
  'about.tags.label':    'Áreas de atuação',
  'about.stats.label':   'Números',
  'backtop.label':       'Voltar ao topo da página',
  'form.label':          'Formulário de contato',
  'footer.stack.label':  'Stack usada',
  'intro.dialog.label':  'Animação de entrada',
  'nav.sections.label':  'Seções da página',
  'nav.main.label':      'Menu principal',
  'proj.live.label':     'Projeto no ar',
  'proj.techs.label':    'Tecnologias usadas',
  'proj.github.label':   'Ver código no GitHub',

  /* i18n fixes */
  'skip.content':     'Pular para o conteúdo',
  'hero.location':    'Fortaleza, CE',
  'about.photo.alt':  'Foto de perfil de Gabriel',
  'nav.logo.label':   'Gabriel — Início',
  'error.code':       'Erro',
  'error.title':      'Algo deu errado',
  'error.desc':       'Um erro inesperado aconteceu. Tente recarregar a página.',
  'error.retry':      'Tentar novamente',
  'error.back':       'Voltar ao início',
  'notFound.code':    'erro: rota não resolvida · código 404',
};

const en: Dict = {
  /* Nav */
  'nav.home':     'Home',    'nav.services': 'Services',
  'nav.projects': 'Projects','nav.skills':   'Skills',
  'nav.about':    'About',   'nav.contact':  'Contact',

  /* Hero */
  'hero.greeting':    'Hi, I am',
  'hero.role.pre':    'Developer',
  'hero.role.title':  'Full-Stack',
  'hero.desc':        'I build fast interfaces and reliable APIs — with attention to the details that separate a functional product from one people actually enjoy using.',
  'hero.btn.projects': 'View Projects',
  'hero.btn.contact':  'Talk to Me',
  'hero.available':    'Available for projects',
  'hero.stat.years':    'Years Studying',
  'hero.stat.projects': 'Projects',
  'hero.stat.techs':    'Technologies',

  /* Services */
  'section.services.pre': 'What I', 'section.services.acc': ' Do',
  'section.services.sub': 'What I deliver on each project — straight to the point',
  'service1.title': 'Frontend',
  'service1.desc':  'Interfaces that run fast and feel polished. Special attention to performance, accessibility, and the details users feel but cannot name.',
  'service2.title': 'Full-Stack',
  'service2.desc':  'From database to screen. I build APIs, data models and frontends that work as a cohesive system — not disconnected parts glued together.',
  'service3.title': 'UI / UX',
  'service3.desc':  'Visual hierarchy, spacing, and colors that guide the eye. Not just looking good — eliminating friction so users complete what they came to do.',

  /* Projects */
  'section.projects.pre': 'My', 'section.projects.acc': ' Projects',
  'section.projects.sub': 'Projects that show how I work in practice',
  /* Testimonial */
  'testimonial.quote': '"Gabriel delivered our store website exactly as we needed — fast, beautiful and easy to navigate. It significantly increased customer contact via WhatsApp."',
  'testimonial.name':  'Venezamotos',
  'testimonial.role':  'Real Client · venezamotoseveiculos.com.br',
  'testimonial.label': 'What they say',
  /* Timeline */
  'timeline.title':    'Journey',
  'timeline.t2.year':  '2023',
  'timeline.t2.title': 'Systems Analysis & Dev',
  'timeline.t2.desc':  'Enrolled at Estácio, Fortaleza — ADS. Focus on full-stack web.',
  'timeline.t3.year':  '2024',
  'timeline.t3.title': 'Freelance Developer',
  'timeline.t3.desc':  'First real client (Venezamotos). Migrated to React, Next.js and TypeScript.',
  'timeline.t4.year':  '2025',
  'timeline.t4.title': 'Full-Stack & SaaS',
  'timeline.t4.desc':  'JuriVox: legal SaaS platform with Next.js, Supabase, Clerk and Stripe.',
  'proj1.tag':   'Real Client',
  'proj1.title': 'Venezamotos',
  'proj1.desc':  'Motorcycle and vehicle dealership website with a product catalog, category filters, and direct WhatsApp contact. Pure HTML, CSS and JavaScript — no frameworks, zero build dependencies.',
  'proj2.tag':   'Legal SaaS',
  'proj2.title': 'JuriVox',
  'proj2.desc':  'Platform for law firms to manage cases, clients and deadlines. Interface built for real legal workflow, not for screenshots.',
  'proj3.tag':   'Personal Project',
  'proj3.title': 'This Portfolio',
  'proj3.desc':  'Next.js 15, TypeScript, Framer Motion and Three.js for the 3D intro. Multi-language (PT/EN/ES), dark/light theme and contact API — built from scratch.',
  'proj.btn':    'Open',
  'proj.cursor': 'OPEN',
  'proj.toggle.label': 'View mode',
  'proj.toggle.photo': 'Photos',
  'proj.toggle.video': 'Videos',

  /* Skills */
  'section.skills.pre': 'Tech', 'section.skills.acc': ' Stack',
  'section.skills.sub': 'The technologies I use every day',
  'skills.cat.frontend': 'Frontend',
  'skills.cat.backend':  'Backend & Database',
  'skills.cat.tools':    'Tools',

  /* About */
  'section.about.pre': 'About', 'section.about.acc': ' Me',
  'section.about.sub': 'Why I ended up doing this',
  'about.p1': "I started coding at 18 trying to build a website for my family's business. What was supposed to be a weekend project turned into an obsession — now I'm 20, studying <strong>Systems Analysis and Development</strong> at Estácio in Fortaleza, and building full applications for real clients.",
  'about.p2': "I care about the details most people skip: real performance, animations that make sense, code someone will actually be able to maintain. Currently focused on <strong>Next.js</strong>, <strong>Node.js</strong> and <strong>PostgreSQL</strong>.",
  'about.tag1': 'Next.js & React',
  'about.tag2': 'Node.js & SQL',
  'about.tag3': 'UI That Works',
  'about.tag4': 'Fortaleza, Brazil',
  'about.stat.years':    'Years Coding',
  'about.stat.projects': 'Projects',
  'about.stat.techs':    'Technologies',
  'about.contact':       "Let's Talk",

  /* FAQ */
  'nav.faq': 'FAQ',
  'section.faq.pre': 'Frequently', 'section.faq.acc': ' Asked',
  'section.faq.sub': 'Direct answers to the most common questions',
  'faq.1.q': 'What is the average project delivery time?',
  'faq.1.a': 'It depends on complexity: a simple landing page is ready in 5–7 business days, a full system takes 3 to 6 weeks. We always agree on a timeline before starting — and I stick to it.',
  'faq.2.q': 'Can I request design changes after approval?',
  'faq.2.a': 'Yes. I include two revision rounds in scope. After that, additional changes have an agreed cost. The goal is to deliver exactly what you need — no surprises.',
  'faq.3.q': 'Do you work with international clients?',
  'faq.3.a': 'Yes. I work with clients in Brazil and abroad. Communication in Portuguese, English or Spanish. Payment via international transfer (Wise, PayPal).',
  'faq.4.q': 'How does the payment process work?',
  'faq.4.a': 'I typically work with 50% upfront and 50% on delivery. For larger projects we can split into more milestones. I accept bank transfer and, for international clients, Wise or PayPal.',
  'faq.5.q': 'Do you offer post-delivery support?',
  'faq.5.a': 'Yes. I offer 30 days of free support after delivery to fix any bugs. After that, maintenance and new features are charged hourly or via monthly plans.',

  /* Contact */
  'section.contact.pre': 'Get in', 'section.contact.acc': ' Touch',
  'section.contact.sub': "Let's build something together",
  'contact.desc':    'Open to freelance projects, full-time opportunities, or just to talk tech. I reply within 24h.',
  'contact.or':      '— or through social media —',
  'form.name':       'Your Name',
  'form.email':      'Your Email',
  'form.message':    'Your Message',
  'form.send':       'Send',
  'form.sending':    'Sending...',
  'form.sent':       '✓ Sent!',
  'form.success':    "Message sent. I'll reply soon.",
  'form.error':      'Send error. Please try again.',
  'form.fallback':   'Could not send. Opening your email…',
  'form.rateLimit':  'Too many attempts. Please wait 1 minute and try again.',
  'form.error.name':    'Name is required (max 80 chars)',
  'form.error.email':   'Invalid email address',
  'form.error.message': 'Message is required (max 2000 chars)',
  'form.fallback.subject': 'Contact via Portfolio — ',
  'form.fallback.from':    'From: ',

  /* Footer */
  'footer.in':       'in Fortaleza, Brazil',
  'footer.builtWith': 'Built with',
  'footer.top':      '↑ Top',
  'footer.back':     'Back to top',

  /* Toast */
  'toast.lang': '🇺🇸 English selected',

  /* Page */
  'page.title': 'Gabriel Ricarte | Full-Stack Dev',

  /* 404 */
  'notFound.title':   'Page not found',
  'notFound.desc':    "This route doesn't exist or was moved. Check the link or go back home.",
  'notFound.back':    'Back to home',
  'notFound.contact': 'Contact me',

  /* Services lists */
  'service1.list.1': 'HTML5 / CSS3',
  'service1.list.2': 'JavaScript & TypeScript',
  'service1.list.3': 'React & Next.js',
  'service1.list.4': 'Animations & UI',
  'service2.list.1': 'React / Next.js',
  'service2.list.2': 'Node.js & REST APIs',
  'service2.list.3': 'PostgreSQL / SQL',
  'service2.list.4': 'Deploy & DevOps',
  'service3.list.1': 'Modern UI / UX',
  'service3.list.2': 'Responsive Design',
  'service3.list.3': 'Framer Motion',
  'service3.list.4': 'Design Systems',

  /* Intro overlay */
  'intro.tag':       'Full-Stack Dev · Fortaleza, CE',
  'intro.role':      'Full-Stack Web Developer',
  'intro.skip':      'Click or press ESC',
  'intro.skip.touch':'Tap to continue',

  /* Navbar aria-labels */
  'nav.theme.dark':  'Enable light theme',
  'nav.theme.light': 'Enable dark theme',
  'nav.menu.open':   'Open menu',
  'nav.menu.close':  'Close menu',
  'nav.lang':        'Select language',

  /* Footer */
  'footer.rights': 'All rights reserved.',

  /* Aria-labels */
  'hero.label':          'Presentation',
  'hero.location.label': 'Location',
  'hero.stats.label':    'Statistics',
  'about.tags.label':    'Areas of expertise',
  'about.stats.label':   'Numbers',
  'backtop.label':       'Back to top',
  'form.label':          'Contact form',
  'footer.stack.label':  'Tech stack used',
  'intro.dialog.label':  'Entry animation',
  'nav.sections.label':  'Page sections',
  'nav.main.label':      'Main menu',
  'proj.live.label':     'Live project',
  'proj.techs.label':    'Technologies used',
  'proj.github.label':   'View code on GitHub',

  /* i18n fixes */
  'skip.content':     'Skip to content',
  'hero.location':    'Fortaleza, CE',
  'about.photo.alt':  'Gabriel profile photo',
  'nav.logo.label':   'Gabriel — Home',
  'error.code':       'Error',
  'error.title':      'Something went wrong',
  'error.desc':       'An unexpected error occurred. Try reloading the page.',
  'error.retry':      'Try again',
  'error.back':       'Back to home',
  'notFound.code':    'error: route not resolved · code 404',
};

const es: Dict = {
  /* Nav */
  'nav.home':     'Inicio',      'nav.services': 'Servicios',
  'nav.projects': 'Proyectos',   'nav.skills':   'Habilidades',
  'nav.about':    'Sobre mí',    'nav.contact':  'Contacto',

  /* Hero */
  'hero.greeting':    'Hola, soy',
  'hero.role.pre':    'Desarrollador',
  'hero.role.title':  'Full-Stack',
  'hero.desc':        'Construyo interfaces rápidas y APIs confiables — con atención a los detalles que separan un producto funcional de uno que la gente disfruta usar.',
  'hero.btn.projects': 'Ver Proyectos',
  'hero.btn.contact':  'Contáctame',
  'hero.available':    'Disponible para proyectos',
  'hero.stat.years':    'Años Estudiando',
  'hero.stat.projects': 'Proyectos',
  'hero.stat.techs':    'Tecnologías',

  /* Services */
  'section.services.pre': 'Lo que', 'section.services.acc': ' Hago',
  'section.services.sub': 'Lo que entrego en cada proyecto — sin rodeos',
  'service1.title': 'Frontend',
  'service1.desc':  'Interfaces que corren rápido y se sienten pulidas. Atención especial al rendimiento, accesibilidad y los detalles que los usuarios sienten pero no pueden nombrar.',
  'service2.title': 'Full-Stack',
  'service2.desc':  'De la base de datos a la pantalla. Construyo APIs, modelos de datos y frontends que funcionan como un sistema cohesivo — no partes desconectadas pegadas con cinta.',
  'service3.title': 'UI / UX',
  'service3.desc':  'Jerarquía visual, espaciado y colores que guían la vista. No es solo verse bien — es eliminar la fricción para que el usuario complete lo que vino a hacer.',

  /* Projects */
  'section.projects.pre': 'Mis', 'section.projects.acc': ' Proyectos',
  'section.projects.sub': 'Proyectos que muestran cómo trabajo en la práctica',
  /* Testimonial */
  'testimonial.quote': '"Gabriel entregó el sitio de nuestra tienda exactamente como lo necesitábamos — rápido, bonito y fácil de navegar. Aumentó bastante el contacto de clientes por WhatsApp."',
  'testimonial.name':  'Venezamotos',
  'testimonial.role':  'Cliente Real · venezamotoseveiculos.com.br',
  'testimonial.label': 'Lo que dicen',
  /* Timeline */
  'timeline.title':    'Trayectoria',
  'timeline.t2.year':  '2023',
  'timeline.t2.title': 'Análisis y Des. de Sistemas',
  'timeline.t2.desc':  'Ingreso en Estácio, Fortaleza — ADS. Enfoque en web full-stack.',
  'timeline.t3.year':  '2024',
  'timeline.t3.title': 'Desarrollador Freelance',
  'timeline.t3.desc':  'Primer cliente real (Venezamotos). Migración a React, Next.js y TypeScript.',
  'timeline.t4.year':  '2025',
  'timeline.t4.title': 'Full-Stack & SaaS',
  'timeline.t4.desc':  'JuriVox: plataforma SaaS jurídica con Next.js, Supabase, Clerk y Stripe.',
  'proj1.tag':   'Cliente Real',
  'proj1.title': 'Venezamotos',
  'proj1.desc':  'Sitio de reventa de motos y vehículos con catálogo, filtros por categoría y contacto directo por WhatsApp. HTML, CSS y JavaScript puro — sin frameworks, cero dependencias de build.',
  'proj2.tag':   'SaaS Jurídico',
  'proj2.title': 'JuriVox',
  'proj2.desc':  'Plataforma para estudios de abogados para gestionar casos, clientes y plazos. Interfaz construida para el flujo de trabajo jurídico real, no para capturas de pantalla.',
  'proj3.tag':   'Proyecto Personal',
  'proj3.title': 'Este Portfolio',
  'proj3.desc':  'Next.js 15, TypeScript, Framer Motion y Three.js para la intro 3D. Multi-idioma (PT/EN/ES), tema dark/light y API de contacto — construido desde cero.',
  'proj.btn':    'Abrir',
  'proj.cursor': 'ABRIR',
  'proj.toggle.label': 'Modo de visualización',
  'proj.toggle.photo': 'Fotos',
  'proj.toggle.video': 'Videos',

  /* Skills */
  'section.skills.pre': 'Stack', 'section.skills.acc': ' Técnico',
  'section.skills.sub': 'Las tecnologías que uso día a día',
  'skills.cat.frontend': 'Frontend',
  'skills.cat.backend':  'Backend & Base de Datos',
  'skills.cat.tools':    'Herramientas',

  /* About */
  'section.about.pre': 'Sobre', 'section.about.acc': ' Mí',
  'section.about.sub': 'Por qué terminé haciendo esto',
  'about.p1': 'Empecé a programar a los 18 intentando construir un sitio web para el negocio familiar. Lo que iba a ser un proyecto de fin de semana se convirtió en una obsesión — ahora tengo 20 años, estudio <strong>Análisis y Desarrollo de Sistemas</strong> en Estácio en Fortaleza y desarrollo aplicaciones completas para clientes reales.',
  'about.p2': 'Me importan los detalles que la mayoría ignora: rendimiento real, animaciones que tienen sentido, código que alguien podrá mantener. Actualmente enfocado en <strong>Next.js</strong>, <strong>Node.js</strong> y <strong>PostgreSQL</strong>.',
  'about.tag1': 'Next.js & React',
  'about.tag2': 'Node.js & SQL',
  'about.tag3': 'UI que Funciona',
  'about.tag4': 'Fortaleza, Brasil',
  'about.stat.years':    'Años Programando',
  'about.stat.projects': 'Proyectos',
  'about.stat.techs':    'Tecnologías',
  'about.contact':       'Contáctame',

  /* FAQ */
  'nav.faq': 'FAQ',
  'section.faq.pre': 'Preguntas', 'section.faq.acc': ' Frecuentes',
  'section.faq.sub': 'Respuestas directas a las preguntas más comunes',
  'faq.1.q': '¿Cuál es el plazo promedio de entrega de un proyecto?',
  'faq.1.a': 'Depende de la complejidad: una landing page simple está lista en 5–7 días hábiles, un sistema completo tarda entre 3 y 6 semanas. Siempre acordamos el plazo antes de empezar y lo cumplo.',
  'faq.2.q': '¿Puedo pedir cambios en el diseño después de aprobarlo?',
  'faq.2.a': 'Sí. Incluyo dos rondas de revisión en el alcance. Después de eso, los cambios adicionales tienen un costo acordado. El objetivo es entregar exactamente lo que necesitas — sin sorpresas.',
  'faq.3.q': '¿Trabajas con clientes fuera de Brasil?',
  'faq.3.a': 'Sí, atiendo clientes en Brasil y en el exterior. Comunicación en portugués, inglés o español. Pago por transferencia internacional (Wise, PayPal).',
  'faq.4.q': '¿Cómo funciona el proceso de pago?',
  'faq.4.a': 'Generalmente trabajo con 50% al inicio y 50% en la entrega. Para proyectos más grandes podemos dividirlo en más etapas. Acepto transferencia bancaria y, para clientes internacionales, Wise o PayPal.',
  'faq.5.q': '¿Ofreces soporte después de la entrega?',
  'faq.5.a': 'Sí. Ofrezco 30 días de soporte gratuito tras la entrega para corregir posibles bugs. Después de eso, el mantenimiento y las nuevas funcionalidades se cobran por hora o en planes mensuales.',

  /* Contact */
  'section.contact.pre': 'Ponte en', 'section.contact.acc': ' Contacto',
  'section.contact.sub': 'Construyamos algo juntos',
  'contact.desc':    'Abierto a proyectos freelance, oportunidades full-time o simplemente para hablar de tecnología. Respondo en menos de 24h.',
  'contact.or':      '— o por las redes —',
  'form.name':       'Tu Nombre',
  'form.email':      'Tu E-mail',
  'form.message':    'Tu Mensaje',
  'form.send':       'Enviar',
  'form.sending':    'Enviando...',
  'form.sent':       '✓ ¡Enviado!',
  'form.success':    'Mensaje enviado. Te responderé pronto.',
  'form.error':      'Error al enviar. Inténtalo de nuevo.',
  'form.fallback':   'No se pudo enviar. Abriendo tu email…',
  'form.rateLimit':  'Demasiados intentos. Espera 1 minuto e inténtalo de nuevo.',
  'form.error.name':    'Nombre requerido (máx. 80 caracteres)',
  'form.error.email':   'Email inválido',
  'form.error.message': 'Mensaje requerido (máx. 2000 caracteres)',
  'form.fallback.subject': 'Contacto via Portfolio — ',
  'form.fallback.from':    'De: ',

  /* Footer */
  'footer.in':       'en Fortaleza, Brasil',
  'footer.builtWith': 'Hecho con',
  'footer.top':      '↑ Arriba',
  'footer.back':     'Volver arriba',

  /* Toast */
  'toast.lang': '🇪🇸 Español seleccionado',

  /* Page */
  'page.title': 'Gabriel Ricarte | Dev Full-Stack',

  /* 404 */
  'notFound.title':   'Página no encontrada',
  'notFound.desc':    'Esta ruta no existe o fue movida. Verifica el enlace o vuelve al inicio.',
  'notFound.back':    'Volver al inicio',
  'notFound.contact': 'Contáctame',

  /* Services lists */
  'service1.list.1': 'HTML5 / CSS3',
  'service1.list.2': 'JavaScript & TypeScript',
  'service1.list.3': 'React & Next.js',
  'service1.list.4': 'Animaciones & UI',
  'service2.list.1': 'React / Next.js',
  'service2.list.2': 'Node.js & APIs REST',
  'service2.list.3': 'PostgreSQL / SQL',
  'service2.list.4': 'Deploy & DevOps',
  'service3.list.1': 'UI / UX Moderno',
  'service3.list.2': 'Diseño Responsivo',
  'service3.list.3': 'Framer Motion',
  'service3.list.4': 'Design Systems',

  /* Intro overlay */
  'intro.tag':       'Dev Full-Stack · Fortaleza, CE',
  'intro.role':      'Desarrollador Web Full-Stack',
  'intro.skip':      'Haz clic o presiona ESC',
  'intro.skip.touch':'Toca para continuar',

  /* Navbar aria-labels */
  'nav.theme.dark':  'Activar tema claro',
  'nav.theme.light': 'Activar tema oscuro',
  'nav.menu.open':   'Abrir menú',
  'nav.menu.close':  'Cerrar menú',
  'nav.lang':        'Seleccionar idioma',

  /* Footer */
  'footer.rights': 'Todos los derechos reservados.',

  /* Aria-labels */
  'hero.label':          'Presentación',
  'hero.location.label': 'Ubicación',
  'hero.stats.label':    'Estadísticas',
  'about.tags.label':    'Áreas de trabajo',
  'about.stats.label':   'Estadísticas',
  'backtop.label':       'Volver al inicio',
  'form.label':          'Formulario de contacto',
  'footer.stack.label':  'Stack utilizada',
  'intro.dialog.label':  'Animación de entrada',
  'nav.sections.label':  'Secciones de la página',
  'nav.main.label':      'Menú principal',
  'proj.live.label':     'Proyecto en vivo',
  'proj.techs.label':    'Tecnologías usadas',
  'proj.github.label':   'Ver código en GitHub',

  /* i18n fixes */
  'skip.content':     'Saltar al contenido',
  'hero.location':    'Fortaleza, CE',
  'about.photo.alt':  'Foto de perfil de Gabriel',
  'nav.logo.label':   'Gabriel — Inicio',
  'error.code':       'Error',
  'error.title':      'Algo salió mal',
  'error.desc':       'Ocurrió un error inesperado. Intenta recargar la página.',
  'error.retry':      'Intentar de nuevo',
  'error.back':       'Volver al inicio',
  'notFound.code':    'error: ruta no resuelta · código 404',
};

export const DICT: Record<Lang, Dict> = { pt, en, es };

export function translate(lang: Lang, key: string): string {
  return DICT[lang]?.[key] ?? DICT['pt']?.[key] ?? key;
}

export function detectLang(): Lang {
  if (typeof window === 'undefined') return 'pt';
  /* localStorage throws in private browsing (Safari) or when storage is blocked */
  try {
    const saved = localStorage.getItem('g-lang');
    if (saved && saved in DICT) return saved as Lang;
  } catch {}
  const code = (navigator.language || '').toLowerCase().slice(0, 2);
  if (code in DICT) return code as Lang;
  return 'pt';
}
