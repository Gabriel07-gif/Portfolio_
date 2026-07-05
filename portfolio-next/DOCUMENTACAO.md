# Documentação Completa — Portfolio Gabriel Ricarte

> **Para quem é isso?** Esta documentação foi escrita pensando em desenvolvedores de todos os níveis, inclusive iniciantes. Se você é experiente, use o sumário para ir direto ao que precisa. Se está começando, leia do começo — cada seção explica o "por quê" antes do "como".

---

## Sumário

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Estrutura de Pastas](#2-estrutura-de-pastas)
3. [Como Rodar Localmente](#3-como-rodar-localmente)
4. [Padrões de Projeto Usados](#4-padrões-de-projeto-usados)
5. [Sistema de Temas (Dark / Light)](#5-sistema-de-temas-dark--light)
6. [Sistema de Idiomas (i18n)](#6-sistema-de-idiomas-i18n)
7. [Componentes — Como Cada Um Funciona](#7-componentes--como-cada-um-funciona)
8. [Hooks Customizados](#8-hooks-customizados)
9. [Dados do Site (Projetos e Skills)](#9-dados-do-site-projetos-e-skills)
10. [API de Contato (Backend)](#10-api-de-contato-backend)
11. [Sistema de Animações](#11-sistema-de-animações)
12. [CSS — Arquitetura e Variáveis](#12-css--arquitetura-e-variáveis)
13. [Segurança e Performance](#13-segurança-e-performance)
14. [Como Fazer Mudanças Comuns](#14-como-fazer-mudanças-comuns)
15. [Deploy na Vercel](#15-deploy-na-vercel)
16. [Glossário para Iniciantes](#16-glossário-para-iniciantes)

---

## 1. Visão Geral do Projeto

Este é um **portfolio pessoal profissional** construído com Next.js 15. O site apresenta os serviços, projetos, habilidades e informações de contato de Gabriel Ricarte, desenvolvedor Full-Stack de Fortaleza/CE.

### Tecnologias principais

| Tecnologia | Para que serve |
|---|---|
| **Next.js 15** | Framework React com roteamento, SSR e otimizações automáticas |
| **React 19** | Biblioteca de interface — os componentes visuais |
| **TypeScript** | JavaScript com tipos — ajuda a encontrar erros antes de rodar |
| **Framer Motion** | Biblioteca de animações para React |
| **Three.js** | Gráficos 3D no navegador (usado na tela de intro) |
| **Lenis** | Scroll suave com física realista |
| **Nodemailer** | Envio de e-mails pelo servidor (formulário de contato) |
| **CSS puro** | Todo o estilo está em `globals.css` — sem CSS-in-JS |
| **Vercel** | Plataforma de deploy (hospedagem) |

### O que o site tem

- Tela de introdução 3D animada (apenas na primeira visita)
- Cursor personalizado com efeito magnético
- Navbar com troca de idioma (PT/EN/ES) e tema (dark/light)
- 7 seções: Hero, Serviços, Projetos, Skills, Sobre, FAQ, Contato
- Formulário de contato com envio real de e-mail
- Scroll suave com indicador de progresso
- Totalmente responsivo para mobile

---

## 2. Estrutura de Pastas

```
portfolio-next/
│
├── app/                        ← Roteamento Next.js (App Router)
│   ├── layout.tsx              ← HTML raiz: providers, fonts, SEO, anti-FOUC
│   ├── page.tsx                ← Página principal: monta todas as seções
│   ├── globals.css             ← TODO o CSS do site (~2400 linhas)
│   ├── favicon.ico
│   ├── sitemap.ts              ← Sitemap automático
│   ├── robots.ts               ← robots.txt
│   └── api/
│       └── contact/
│           └── route.ts        ← Endpoint POST para envio de e-mail
│
├── components/                 ← Componentes React (blocos visuais)
│   ├── Navbar.tsx              ← Barra de navegação
│   ├── Hero.tsx                ← Seção inicial (nome, animações)
│   ├── TechTape.tsx            ← Carrossel de tecnologias
│   ├── Services.tsx            ← Seção de serviços
│   ├── Projects.tsx            ← Seção de projetos
│   ├── ProjectMocks.tsx        ← Mockups SVG dos projetos
│   ├── Skills.tsx              ← Seção de habilidades
│   ├── About.tsx               ← Seção sobre mim
│   ├── FAQ.tsx                 ← Perguntas frequentes (accordion)
│   ├── Contact.tsx             ← Formulário de contato
│   ├── Footer.tsx              ← Rodapé
│   ├── IntroOverlay.tsx        ← Tela de introdução 3D
│   ├── ClientShell.tsx         ← Agrupa componentes só-client
│   ├── CustomCursor.tsx        ← Cursor personalizado
│   ├── MagneticLayer.tsx       ← Efeito magnético nos botões
│   ├── SmoothScroll.tsx        ← Inicializa o Lenis
│   ├── ParticleCanvas.tsx      ← Grid de fundo
│   ├── SideDots.tsx            ← Indicadores de seção lateral
│   ├── ScrollProgress.tsx      ← Barra de progresso no topo
│   ├── Toast.tsx               ← Notificações
│   ├── BackTop.tsx             ← Botão "voltar ao topo"
│   ├── SkipLink.tsx            ← Link de acessibilidade
│   └── VercelAnalytics.tsx     ← Analytics da Vercel
│
├── contexts/                   ← Estado global (Context API do React)
│   ├── ThemeContext.tsx         ← Estado do tema dark/light
│   └── LangContext.tsx          ← Estado do idioma atual
│
├── hooks/                      ← Lógica reutilizável (custom hooks)
│   ├── useCounter.ts           ← Anima números de 0 até X
│   ├── useInView.ts            ← Detecta se elemento está visível
│   └── useActiveSection.ts     ← Detecta qual seção está em foco
│
├── lib/                        ← Utilitários e singletons
│   ├── i18n.ts                 ← Todas as traduções (PT/EN/ES)
│   └── lenis-instance.ts       ← Instância global do Lenis
│
├── data/                       ← Dados editáveis do site
│   ├── projects.tsx            ← Lista de projetos
│   └── skills.tsx              ← Lista de habilidades
│
├── public/                     ← Arquivos estáticos servidos diretamente
│   ├── images/                 ← Fotos, logos, ícones
│   └── videos/                 ← Vídeos dos projetos
│
├── middleware.ts               ← Segurança (CSP, headers)
├── next.config.ts              ← Configuração do Next.js
├── tsconfig.json               ← Configuração TypeScript
├── tailwind.config.ts          ← Configuração Tailwind (mínima, quase não usada)
└── package.json                ← Dependências e scripts
```

### Por que essa estrutura?

O Next.js 15 usa o **App Router** — cada pasta dentro de `app/` representa uma rota. A pasta `components/` separa os blocos visuais da lógica. Os `contexts/` guardam estado global acessível de qualquer componente. Os `hooks/` encapsulam comportamentos reutilizáveis.

---

## 3. Como Rodar Localmente

### Pré-requisitos

- Node.js 18 ou superior instalado
- Uma conta de e-mail para SMTP (Gmail funciona)

### Passo a passo

```bash
# 1. Entrar na pasta do projeto
cd portfolio-next

# 2. Instalar dependências
npm install

# 3. Criar o arquivo de variáveis de ambiente
# Copie o .env.example e renomeie para .env.local
copy .env.example .env.local    # Windows
cp .env.example .env.local      # Linux/Mac

# 4. Editar o .env.local com suas credenciais
# (veja a seção de variáveis de ambiente abaixo)

# 5. Rodar em desenvolvimento
npm run dev

# O site abre em http://localhost:3000
```

### Variáveis de ambiente (`.env.local`)

```env
# E-mail onde você quer receber os contatos
CONTACT_EMAIL=seu@email.com

# Credenciais SMTP para envio de e-mails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu@gmail.com
SMTP_PASS=sua-senha-de-app   # Senha de app do Google, não a senha normal

# URL do seu site (para CSP e links canônicos)
NEXT_PUBLIC_SITE_URL=https://seusite.com
```

> **Como criar a senha de app do Gmail:** Google Account → Segurança → Verificação em duas etapas → Senhas de app → Criar senha para "Mail"

### Scripts disponíveis

```bash
npm run dev          # Desenvolvimento com hot-reload
npm run dev:fresh    # Limpa cache e reinicia em desenvolvimento
npm run build        # Gera build de produção
npm run build:fresh  # Limpa cache e gera build
npm run start        # Roda o build de produção
npm run lint         # Verifica erros de código
```

---

## 4. Padrões de Projeto Usados

Esta seção explica as "filosofias" de organização que guiam o código.

### 4.1 Component-Based Architecture (Arquitetura baseada em componentes)

**O que é:** O site é dividido em blocos independentes chamados componentes. Cada componente é responsável por uma parte visual e sua lógica.

**Como funciona aqui:** `page.tsx` é como uma "página em branco" que simplesmente encaixa os componentes em ordem:

```tsx
// app/page.tsx (simplificado)
export default function HomePage() {
  return (
    <main>
      <Hero />        {/* seção de boas-vindas */}
      <TechTape />    {/* carrossel de tecnologias */}
      <Services />    {/* serviços oferecidos */}
      <Projects />    {/* projetos */}
      <Skills />      {/* habilidades */}
      <About />       {/* sobre mim */}
      <FAQ />         {/* perguntas frequentes */}
      <Contact />     {/* formulário de contato */}
      <Footer />      {/* rodapé */}
    </main>
  );
}
```

**Vantagem:** Para adicionar ou remover uma seção, você mexe em apenas um lugar.

---

### 4.2 Context API (Estado Global)

**O que é:** Uma forma de compartilhar informações entre componentes sem precisar passar por todos os componentes intermediários ("prop drilling").

**Analogia:** Imagine um painel de controle central. Qualquer componente da casa pode ler e alterar as configurações sem precisar perguntar para os cômodos do meio.

**Como funciona aqui:** Dois contextos são criados:
- `ThemeContext` — guarda se o tema é "dark" ou "light"
- `LangContext` — guarda o idioma atual ("pt", "en", "es")

Ambos envolvem toda a aplicação no `layout.tsx`:

```tsx
// app/layout.tsx (simplificado)
<ThemeProvider>
  <LangProvider>
    {children}  {/* toda a aplicação aqui dentro */}
  </LangProvider>
</ThemeProvider>
```

Qualquer componente acessa esses valores com:
```tsx
const { theme, toggleTheme } = useTheme();
const { t, lang, setLang } = useLang();
```

---

### 4.3 Separation of Concerns (Separação de responsabilidades)

**O que é:** Cada parte do código faz uma coisa só.

**Como funciona aqui:**
- `data/projects.tsx` — só guarda dados dos projetos (sem lógica visual)
- `hooks/useCounter.ts` — só implementa a lógica de contar números
- `components/Projects.tsx` — só cuida de mostrar os projetos na tela
- `lib/i18n.ts` — só guarda as traduções
- `app/api/contact/route.ts` — só processa o envio de e-mail

Se você quer mudar um projeto, vai em `data/projects.tsx`. Se quer mudar o visual do card do projeto, vai em `components/Projects.tsx`. Nunca se confunde.

---

### 4.4 Singleton Pattern (no Lenis)

**O que é:** Garante que existe apenas UMA instância de algo no sistema.

**Como funciona aqui:** O Lenis (scroll suave) precisa existir apenas uma vez. O arquivo `lib/lenis-instance.ts` guarda a instância:

```ts
// lib/lenis-instance.ts
let _lenis: Lenis | null = null;

export function getLenis() { return _lenis; }
export function setLenis(l: Lenis | null) { _lenis = l; }
```

O `SmoothScroll.tsx` cria o Lenis e o registra. O `BackTop.tsx` o lê para fazer scroll suave sem criar outro Lenis. Sem o singleton, haveria dois sistemas de scroll conflitando.

---

### 4.5 Custom Hooks (Lógica reutilizável)

**O que é:** Funções especiais do React que encapsulam comportamentos e podem ser usadas em múltiplos componentes.

**Como funciona aqui:**
- `useInView` — detecta quando um elemento entra na viewport. Usado em `About.tsx` e `Skills.tsx`
- `useCounter` — anima um número de 0 até um valor. Usado em `Hero.tsx` e `About.tsx`
- `useActiveSection` — detecta qual seção o usuário está vendo. Usado em `Navbar.tsx` e `SideDots.tsx`

Sem os hooks, essa lógica estaria duplicada em vários componentes.

---

### 4.6 Client Components vs Server Components

**O que é:** No Next.js 15, por padrão os componentes rodam no servidor. Componentes que usam interatividade (estado, eventos) precisam da diretiva `'use client'` no topo.

**Como funciona aqui:**

Componentes de servidor (sem `'use client'`):
- `app/layout.tsx` — estrutura HTML base
- `app/page.tsx` — monta a página
- `components/Footer.tsx` — só texto estático

Componentes de cliente (com `'use client'`):
- `contexts/ThemeContext.tsx` — tem estado (`useState`)
- `components/Navbar.tsx` — tem scroll listener
- `components/IntroOverlay.tsx` — usa Three.js, canvas, animações
- Todo componente com `useState`, `useEffect`, event listeners

**O padrão ClientShell:** Componentes pesados que só funcionam no browser (Three.js, Lenis, cursor) são carregados dinamicamente para não quebrarem o SSR:

```tsx
// components/ClientShell.tsx
const IntroOverlay  = dynamic(() => import('./IntroOverlay'),  { ssr: false });
const CustomCursor  = dynamic(() => import('./CustomCursor'),  { ssr: false });
const SmoothScroll  = dynamic(() => import('./SmoothScroll'),  { ssr: false });
```

O `ssr: false` garante que esses componentes só carregam no browser, nunca no servidor.

---

## 5. Sistema de Temas (Dark / Light)

### Como funciona

O tema é controlado por um atributo `data-theme` na tag `<html>`, e o CSS usa isso para alterar as variáveis de cor.

**Fluxo completo:**

```
Usuário clica no ícone de sol/lua
  → toggleTheme() em ThemeContext é chamado
  → estado muda: "dark" → "light"
  → document.documentElement.setAttribute('data-theme', 'light')
  → CSS vê [data-theme="light"] e ativa as variáveis de cor claras
  → localStorage.setItem('theme', 'light') para persistir
```

### O código do ThemeContext

```tsx
// contexts/ThemeContext.tsx (simplificado)
'use client';

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Lê o tema salvo quando o componente carrega
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const initial = (saved as 'dark' | 'light') || preferred;
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext)!;
}
```

### Como o CSS usa o tema

```css
/* globals.css — Variáveis do tema escuro (padrão) */
:root {
  --bg:      #050510;    /* fundo principal */
  --text:    #e8eaf0;    /* cor do texto */
  --accent:  #00ff88;    /* verde neon */
  --muted:   #8892a4;    /* texto secundário */
}

/* Variáveis do tema claro */
[data-theme="light"] {
  --bg:      #f0f4ff;
  --text:    #0a0f1e;
  --accent:  #2563eb;    /* azul no modo claro */
  --muted:   #4a5568;
}
```

Todos os elementos usam `color: var(--text)` e `background: var(--bg)`, então quando o atributo muda, tudo muda automaticamente.

### Anti-FOUC (Flash of Unstyled Content)

**Problema:** O React carrega no browser e pode demorar um frame para aplicar o tema salvo, causando um "flash" do tema errado.

**Solução:** Um script inline no `<head>` roda ANTES do React, já aplicando o tema correto:

```tsx
// app/layout.tsx
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', t);
    } catch(e) {}
  })();
`}} />
```

Esse script executa sincronamente — o tema já está aplicado quando o primeiro pixel é pintado.

---

## 6. Sistema de Idiomas (i18n)

### Como funciona

O sistema de internacionalização (i18n) usa um dicionário simples de chave → texto para cada idioma.

**Fluxo completo:**

```
Usuário seleciona "EN" na Navbar
  → setLang('en') em LangContext é chamado
  → lang muda para 'en'
  → localStorage.setItem('lang', 'en') para persistir
  → Todos os componentes que usam t('chave') re-renderizam
  → Os textos são trocados instantaneamente
```

### A estrutura do i18n.ts

```ts
// lib/i18n.ts (estrutura simplificada)
type Lang = 'pt' | 'en' | 'es';

const translations: Record<Lang, Record<string, string>> = {
  pt: {
    'nav.about':       'Sobre',
    'nav.contact':     'Contato',
    'hero.title':      'Desenvolvedor',
    'hero.available':  'Disponível para projetos',
    // ... mais de 200 chaves
  },
  en: {
    'nav.about':       'About',
    'nav.contact':     'Contact',
    'hero.title':      'Developer',
    'hero.available':  'Available for projects',
  },
  es: {
    'nav.about':       'Sobre mí',
    'nav.contact':     'Contacto',
    'hero.title':      'Desarrollador',
    'hero.available':  'Disponible para proyectos',
  },
};

export function translate(lang: Lang, key: string): string {
  return translations[lang]?.[key] ?? translations['pt'][key] ?? key;
}
```

Se uma chave não existe no idioma solicitado, cai para português. Se não existe em português, retorna a própria chave — nunca quebra.

### Como usar em qualquer componente

```tsx
'use client';
import { useLang } from '@/contexts/LangContext';

export default function MeuComponente() {
  const { t } = useLang();

  return (
    <h1>{t('nav.about')}</h1>   {/* renderiza "Sobre", "About" ou "Sobre mí" */}
  );
}
```

### Detecção automática de idioma

```tsx
// contexts/LangContext.tsx (lógica de detecção)
useEffect(() => {
  const saved = localStorage.getItem('lang');
  if (saved) { setLang(saved as Lang); return; }

  // Fallback: idioma do navegador
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith('es')) setLang('es');
  else if (nav.startsWith('en')) setLang('en');
  else setLang('pt');  // padrão
}, []);
```

### Como adicionar uma nova tradução

1. Abra `lib/i18n.ts`
2. Adicione a chave nos três idiomas:

```ts
pt: {
  // ... chaves existentes ...
  'minha.nova.chave': 'Texto em português',
},
en: {
  'minha.nova.chave': 'English text',
},
es: {
  'minha.nova.chave': 'Texto en español',
},
```

3. Use no componente:
```tsx
<p>{t('minha.nova.chave')}</p>
```

---

## 7. Componentes — Como Cada Um Funciona

### 7.1 Navbar

**Arquivo:** `components/Navbar.tsx`

**O que faz:**
- Mostra os links de navegação
- Muda visual quando o usuário scrolla (fica mais transparente)
- Destaca o link da seção que está visível
- Tem dropdown de idioma (PT/EN/ES)
- Tem botão de tema (sol/lua)
- Em mobile, vira um menu hamburger

**Lógica de scroll:**
```tsx
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

O `{ passive: true }` é importante: diz ao browser que o listener nunca vai chamar `preventDefault()`, permitindo otimizações de performance.

**Lógica de menu mobile:**
```tsx
const [menuOpen, setMenuOpen] = useState(false);

// Fecha ao clicar em um link
const handleNavClick = () => setMenuOpen(false);
```

**Como funciona o destaque de seção ativa:**

O hook `useActiveSection` usa IntersectionObserver para monitorar todas as seções. Quando uma seção ocupa a região central da tela, ela se torna "ativa". A Navbar usa esse valor para aplicar a classe CSS `active` no link correspondente.

---

### 7.2 Hero

**Arquivo:** `components/Hero.tsx`

**O que faz:**
- Mostra o nome com animação de entrada
- Alterna entre roles (Full-Stack, Frontend, etc.) com efeito de flip
- Tem um "orb" que segue o cursor suavemente
- Mostra stats animados (anos, projetos, tecnologias)
- Tem um card de status "online"

**Animação do role (ciclo de textos):**

```tsx
const ROLES = ['hero.role1', 'hero.role2', 'hero.role3', 'hero.role4'];
// Full-Stack Developer | Frontend Developer | Back-End Developer | TypeScript Dev

const [roleIdx, setRoleIdx] = useState(0);

useEffect(() => {
  const id = setInterval(() => {
    setRoleIdx(i => (i + 1) % ROLES.length);
  }, 2800);  // troca a cada 2.8 segundos
  return () => clearInterval(id);
}, []);
```

**Orb que segue o cursor:**

```tsx
const orbX = useMotionValue(0);
const orbY = useMotionValue(0);

const springX = useSpring(orbX, { stiffness: 50, damping: 20 });
const springY = useSpring(orbY, { stiffness: 50, damping: 20 });

// O useSpring cria uma física de mola:
// - stiffness 50 = mola fraca (movimento lento e suave)
// - damping 20 = amortecimento (não oscila muito)
```

---

### 7.3 Projects

**Arquivo:** `components/Projects.tsx`

**O que faz:**
- Lista os 3 projetos
- Toggle entre visualização por foto e por vídeo
- Efeito 3D de "tilt" quando o mouse passa
- Browser mockup ao redor das imagens

**Como funciona o efeito de tilt 3D:**

```tsx
const rotateX = useMotionValue(0);
const rotateY = useMotionValue(0);

const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  // Posição do mouse dentro do card (de -1 a 1)
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

  rotateX.set(-y * 8);  // máximo 8 graus de rotação
  rotateY.set(x * 8);
};
```

**Lazy load de vídeo:**

Os vídeos não carregam imediatamente — só quando estão a 300px de entrar na viewport:

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setVideoReady(true); },
    { rootMargin: '300px' }  // começa a carregar 300px antes de aparecer
  );
  if (videoRef.current) observer.observe(videoRef.current);
  return () => observer.disconnect();
}, []);
```

---

### 7.4 About

**Arquivo:** `components/About.tsx`

**O que faz:**
- Mostra foto de perfil com animação de entrada
- Texto sobre o desenvolvedor (com palavras em negrito)
- Tags de características
- Stats animados (anos, projetos, tecnologias)
- Timeline de carreira
- Botão CTA

**Como funciona o texto com negrito dinâmico:**

As traduções usam tags HTML dentro da string:
```ts
// lib/i18n.ts
'about.p1': 'Sou um desenvolvedor <strong>Full-Stack</strong> apaixonado por...'
```

A função `parseBold` converte isso para JSX:
```tsx
function parseBold(str: string): ReactNode {
  return str.split(/(<strong>.*?<\/strong>)/g).map((part, i) => {
    const m = part.match(/^<strong>(.*?)<\/strong>$/);
    return m ? <strong key={i}>{m[1]}</strong> : part;
  });
}

// Uso:
<p>{parseBold(t('about.p1'))}</p>
```

---

### 7.5 IntroOverlay

**Arquivo:** `components/IntroOverlay.tsx`

Esta é a parte mais complexa do projeto — uma animação 3D completa usando Three.js.

**O que faz:**
- Mostra uma tela de abertura por 6 segundos
- Roda animação 3D: esfera, anéis orbitais, partículas
- Anima o nome "GABRIEL RICARTE" letra por letra
- Tem barra de progresso
- O usuário pode fechar clicando, pressionando ESC/Enter/Space

**Fluxo de estados:**

```
mounted = false → verifica sessionStorage e reduced-motion
  ↓ (se não fez intro antes)
mounted = true → carrega Three.js e inicia animação
  ↓ (após 6 segundos ou clique do usuário)
dismiss() → inicia saída (fade out do conteúdo)
  ↓
isExiting = true → Three.js anima a saída (câmera zoom)
  ↓
exitProg >= 1 → remove overlay, salva sessionStorage
  ↓
hidden = true → componente some (return null)
```

**Path mobile vs desktop:**

Dispositivos touch (celulares e tablets) não rodam Three.js — usam apenas animações CSS para economizar bateria e evitar travamentos:

```tsx
const isTouch = window.matchMedia('(pointer: coarse)').matches;

if (isTouch) {
  // Apenas CSS animations — sem Three.js
  return cleanup;
}

// Desktop: carrega Three.js dinamicamente
const THREE = await import('three');
```

**SessionStorage:** Após ver a intro uma vez, `g-intro-done` é salvo. No próximo carregamento, a intro é pulada:

```tsx
if (sessionStorage.getItem('g-intro-done')) {
  setHidden(true);  // pula a intro
  return;
}
```

---

### 7.6 CustomCursor

**Arquivo:** `components/CustomCursor.tsx`

**O que faz:**
- Substitui o cursor padrão por um design customizado
- Tem dois elementos: um ponto (posição exata) e um anel (com delay/suavidade)
- Muda de tamanho ao passar em elementos clicáveis
- Mostra labels como "Abrir", "GitHub" ao passar em links específicos
- Só aparece em dispositivos com mouse (`any-pointer: fine`)

**Como funciona o lag do anel:**

```tsx
// Posição exata do cursor
const dotX = useMotionValue(-100);
const dotY = useMotionValue(-100);

// Posição suavizada para o anel (com mola/física)
const ringX = useSpring(dotX, { stiffness: 150, damping: 15 });
const ringY = useSpring(dotY, { stiffness: 150, damping: 15 });

// O anel "corre atrás" do ponto com um pequeno atraso natural
```

**Detecção de elementos interativos:**

```tsx
const selector = 'a, button, [role="button"], [data-interactive], label[for]';

const onEnter = (e: Event) => {
  const target = e.currentTarget as HTMLElement;
  const label = target.dataset.cursorLabel ?? '';  // atributo data-cursor-label
  setCursorLabel(label);
  setIsHover(true);
};
```

Para adicionar um label customizado ao cursor em qualquer elemento:
```html
<button data-cursor-label="Enviar">Enviar Formulário</button>
```

---

### 7.7 Contact (Formulário)

**Arquivo:** `components/Contact.tsx`

**O que faz:**
- Formulário com nome, e-mail e mensagem
- Validação no cliente antes de enviar
- Envia para `/api/contact` via POST
- Mostra estado de loading, sucesso ou erro
- Tem campo honeypot anti-spam invisível
- Fallback: link mailto se a API falhar

**Fluxo de envio:**

```
Usuário clica "Enviar"
  → validate() verifica campos localmente
    → se inválido: mostra erros inline
    → se válido: status = 'loading'
  → fetch('POST /api/contact', { nome, email, mensagem, website })
    → se website preenchido: campo honeypot! Rejeita silenciosamente
    → se ok: status = 'success', campos limpos
    → se erro 429: "Muitas tentativas, aguarde..."
    → se erro 500: status = 'error', mostra link mailto como fallback
```

**Honeypot anti-spam:**

```tsx
// Campo invisível para humanos, mas bots preenchem automaticamente
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>
```

Se `website` chegou preenchido ao servidor, é um bot — rejeita a requisição.

---

### 7.8 SmoothScroll

**Arquivo:** `components/SmoothScroll.tsx`

**O que faz:**
- Inicializa o Lenis para scroll suave
- Intercepta cliques em links âncora (`#sobre`, `#projetos`, etc.)
- Faz o scroll animado para a seção correta
- Não funciona em mobile (desativa para melhor performance)
- Respeita `prefers-reduced-motion`

```tsx
// Intercepta TODOS os links com href="#..."
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(href);
    lenis.scrollTo(target, { offset: -80 });  // -80px por causa da navbar
  });
});
```

---

## 8. Hooks Customizados

### 8.1 useCounter

**Arquivo:** `hooks/useCounter.ts`

Anima um número de 0 até `target` ao longo do tempo.

```ts
// Uso:
const anos = useCounter(2, 1600, { trigger: inView });
// → começa em 0, vai até 2, dura 1600ms, só começa quando inView = true
```

**Como funciona internamente:**

```ts
function useCounter(target: number, duration: number, options: Options): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!options.trigger) return;  // aguarda o trigger

    const start = performance.now();

    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      // Easing ease-out: começa rápido, desacelera no final
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) requestAnimationFrame(step);  // continua animando
    }

    requestAnimationFrame(step);
  }, [options.trigger]);

  return count;
}
```

O `requestAnimationFrame` sincroniza com o refresh do browser (60fps), garantindo animação suave.

---

### 8.2 useInView

**Arquivo:** `hooks/useInView.ts`

Detecta quando um elemento entra na área visível da tela.

```ts
// Uso:
const [ref, inView] = useInView<HTMLElement>(0.1);
// → inView = true quando 10% do elemento está visível

// No JSX:
<section ref={ref}>
  {inView && <ConteudoAnimado />}
</section>
```

**Como funciona:**

```ts
function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();  // desconecta após primeira vez
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
```

O IntersectionObserver é uma API nativa do browser muito eficiente — não usa scroll events.

---

### 8.3 useActiveSection

**Arquivo:** `hooks/useActiveSection.ts`

Rastreia qual seção está atualmente visível para o usuário.

```ts
// Uso (em Navbar e SideDots):
const [activeSection, setActiveSection] = useActiveSection();
// activeSection = 'hero' | 'servicos' | 'projetos' | ...
```

**Como funciona:**

Observa todas as seções simultaneamente. A configuração `rootMargin: '-20% 0px -70% 0px'` cria uma "zona ativa" entre 20% e 30% a partir do topo da viewport — a seção que está nessa zona é a ativa:

```
┌─────────────────────┐  ← topo da viewport
│                     │
│  20% (zona morta)   │  ← seções aqui: NÃO ativam
│                     │
├─────────────────────┤  ← início da zona ativa (20%)
│  10% (zona ativa)   │  ← seção aqui: ATIVA
├─────────────────────┤  ← fim da zona ativa (30%)
│                     │
│  70% (zona morta)   │  ← seções aqui: NÃO ativam
│                     │
└─────────────────────┘  ← fundo da viewport
```

---

## 9. Dados do Site (Projetos e Skills)

Esta é provavelmente a parte que você mais vai editar. Os dados do site estão separados da lógica visual para facilitar atualizações.

### 9.1 Como adicionar ou editar um projeto

**Arquivo:** `data/projects.tsx`

Cada projeto é um objeto com esta estrutura:

```tsx
{
  id: 'venezamotos',           // identificador único (slug)

  tagKey: 'project.tag.site',  // chave de tradução para a tag (ex: "Site Comercial")
  titleKey: 'project.venezamotos.title',  // chave do título
  descKey: 'project.venezamotos.desc',    // chave da descrição

  techs: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],  // badges de tecnologia

  url: 'https://venezamotos.com',  // link do site ao vivo
  githubUrl: 'https://github.com/...',  // link do GitHub (opcional)
  urlLabel: 'project.url.label',   // texto do botão (chave de tradução)

  videoSrc: '/videos/venezamotos.mp4',     // vídeo (opcional)
  screenshot: '/images/project-venezamotos.png',  // screenshot

  fallback: <MockVenezamotos />,  // SVG mostrado se imagem falhar

  featured: true,   // se true, card tem estilo destacado
  live: true,       // se true, mostra badge "LIVE"
}
```

**Para adicionar um novo projeto:**

1. Adicione o objeto em `data/projects.tsx`:

```tsx
export const projects: ProjectData[] = [
  // ... projetos existentes ...
  {
    id: 'meu-novo-projeto',
    tagKey: 'project.tag.app',
    titleKey: 'project.meuprojeto.title',
    descKey: 'project.meuprojeto.desc',
    techs: ['React', 'Node.js', 'PostgreSQL'],
    url: 'https://meuprojeto.com',
    screenshot: '/images/project-meuprojeto.png',
    fallback: <div>Mockup</div>,
    featured: false,
    live: true,
  }
];
```

2. Adicione as traduções em `lib/i18n.ts`:

```ts
pt: {
  'project.meuprojeto.title': 'Meu Projeto Incrível',
  'project.meuprojeto.desc': 'Descrição do projeto em português.',
},
en: {
  'project.meuprojeto.title': 'My Amazing Project',
  'project.meuprojeto.desc': 'Project description in English.',
},
es: {
  'project.meuprojeto.title': 'Mi Proyecto Increíble',
  'project.meuprojeto.desc': 'Descripción del proyecto en español.',
},
```

3. Coloque a imagem em `public/images/project-meuprojeto.png`

---

### 9.2 Como adicionar ou editar uma skill

**Arquivo:** `data/skills.tsx`

```tsx
export type ChipData = {
  name: string;      // nome da tecnologia (exibido)
  img?: string;      // caminho do logo (tema escuro)
  imgLight?: string; // caminho do logo (tema claro) - opcional
  icon?: string;     // emoji ou caractere (alternativa ao logo)
  letter?: string;   // letra inicial (alternativa ao logo)
  featured?: boolean; // se true, chip tem borda colorida destacada
};
```

**Exemplo: adicionando Prisma como skill**

```tsx
// data/skills.tsx
export const BACKEND: ChipData[] = [
  { name: 'Node.js',    img: '/images/svg/nodejs.svg', featured: true },
  { name: 'PostgreSQL', img: '/images/svg/postgresql.svg' },
  { name: 'REST APIs',  img: '/images/svg/api.svg' },
  { name: 'SQL',        letter: 'S' },

  // Novo:
  { name: 'Prisma', letter: 'P', featured: false },
];
```

---

## 10. API de Contato (Backend)

**Arquivo:** `app/api/contact/route.ts`

Esta é a única rota de backend do projeto. Ela processa o formulário de contato e envia e-mails.

### Fluxo completo de uma requisição

```
POST /api/contact
  { nome: "João", email: "joao@email.com", mensagem: "Olá!", website: "" }
    ↓
1. Rate limiting: máximo 3 tentativas por minuto por IP
    ↓ (se ok)
2. Honeypot: se "website" estiver preenchido → rejeita (é um bot)
    ↓
3. Validação dos campos:
   - nome: obrigatório, máx 80 chars
   - email: formato válido
   - mensagem: obrigatório, máx 2000 chars
    ↓ (se válido)
4. Sanitização: remove caracteres perigosos (\r\n, HTML especial)
    ↓
5. Envia e-mail de notificação para CONTACT_EMAIL
6. Envia e-mail de confirmação para o remetente
    ↓
7. Retorna { ok: true }
```

### Rate Limiting

O rate limiter usa um `Map` em memória (não persiste entre reinicializações):

```ts
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip) ?? { count: 0, resetAt: now + 60_000 };

  if (now > entry.resetAt) {
    // Janela expirou: reseta
    rateLimitStore.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 3) return false;  // limite atingido

  entry.count++;
  rateLimitStore.set(ip, entry);
  return true;
}
```

### Configuração do SMTP

O Nodemailer precisa de credenciais SMTP para enviar e-mails:

```ts
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,   // ex: 'smtp.gmail.com'
  port: Number(process.env.SMTP_PORT),  // ex: 587
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

Para o Gmail, use **Senha de App** (não a senha normal da conta). Crie em: Google Account → Segurança → Senhas de app.

---

## 11. Sistema de Animações

O projeto usa Framer Motion para praticamente todas as animações. Aqui estão os padrões usados.

### 11.1 Animações de entrada na viewport

O padrão mais comum: elementos aparecem quando entram na tela.

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}        // começa: invisível, 40px abaixo
  whileInView={{ opacity: 1, y: 0 }}      // termina: visível, posição normal
  viewport={{ once: true, amount: 0.2 }}  // dispara quando 20% visível, só uma vez
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}  // curva ease-out expo
>
  Conteúdo que aparece com animação
</motion.div>
```

A curva de easing `[0.16, 1, 0.3, 1]` é uma **ease-out exponencial**: começa muito rápido e desacelera suavemente no final. Essa é a curva padrão em iOS e dá sensação de qualidade premium.

### 11.2 Stagger (animações encadeadas)

Para animar múltiplos itens em sequência (um após o outro):

```tsx
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.5,
      delay: i * 0.1,  // cada item tem 100ms de delay a mais
    }}
  >
    {item.content}
  </motion.div>
))}
```

Com 5 itens: 0ms, 100ms, 200ms, 300ms, 400ms de delay. Cria o efeito cascata.

### 11.3 Hover e interações

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}     // cresce 5% no hover
  whileTap={{ scale: 0.97 }}        // encolhe levemente ao clicar
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
  Botão animado
</motion.button>
```

### 11.4 Motion Values (animações baseadas em eventos)

Usadas no Hero (orb) e Projects (tilt 3D):

```tsx
// Não usa estado — usa motion values para performance máxima
const x = useMotionValue(0);
const y = useMotionValue(0);

// Suaviza com física de mola
const smoothX = useSpring(x, { stiffness: 50, damping: 20 });
const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

const handleMouseMove = (e: MouseEvent) => {
  x.set(e.clientX);
  y.set(e.clientY);
};

// No JSX:
<motion.div style={{ x: smoothX, y: smoothY }} />
```

Motion Values nunca causam re-render do componente — são atualizadas diretamente no DOM via `transform`, o que é muito mais eficiente que `setState`.

### 11.5 AnimatePresence (animação de saída)

Para animar elementos que saem do DOM (como o accordion do FAQ):

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}  // animação ao remover do DOM
      transition={{ duration: 0.3 }}
    >
      Conteúdo do accordion
    </motion.div>
  )}
</AnimatePresence>
```

Sem `AnimatePresence`, o elemento sairia do DOM instantaneamente, sem animação de saída.

---

## 12. CSS — Arquitetura e Variáveis

Todo o CSS está em `app/globals.css` (~2400 linhas). Não há CSS-in-JS, CSS Modules ou Tailwind (quase).

### 12.1 Variáveis CSS (tokens de design)

```css
:root {
  /* Cores base */
  --bg:       #050510;
  --bg-card:  #0d0d1a;
  --text:     #e8eaf0;
  --muted:    #8892a4;

  /* Cores de destaque */
  --accent:   #00ff88;   /* verde neon principal */
  --accent-2: #00aaff;   /* azul secundário */
  --accent-3: #5533ff;   /* roxo terciário */

  /* Tipografia */
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-jb-mono), monospace;

  /* Bordas e sombras */
  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 20px;
  --r-xl: 28px;
  --shadow-lg: 0 25px 60px rgba(0,0,0,0.4);

  /* Espaçamentos de seção */
  --section-py: 120px;
}
```

**Como usar em novos estilos:**

```css
.meu-elemento {
  background: var(--bg-card);
  color: var(--text);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-lg);
}
```

### 12.2 Organização do CSS

O CSS segue uma ordem lógica:

```
1. Variáveis globais (:root e [data-theme="light"])
2. Reset e base (* e body)
3. Layout utilities (.container, .section-header)
4. Componentes globais (.btn, .glass-card)
5. Seção por seção (/* ── HERO ── */, /* ── ABOUT ── */)
6. Media queries (agrupadas por breakpoint)
7. Animações (@keyframes)
8. Tema claro ([data-theme="light"] overrides)
```

### 12.3 Breakpoints

```css
/* Desktop: sem media query (default) */

/* Tablet/Desktop médio */
@media (max-width: 1024px) { ... }

/* Tablet */
@media (max-width: 880px) { ... }

/* Mobile grande */
@media (max-width: 640px) { ... }

/* Mobile pequeno */
@media (max-width: 480px) { ... }

/* Mobile muito pequeno */
@media (max-width: 360px) { ... }
```

O CSS é **desktop-first** — o design padrão é para telas grandes, e os breakpoints reduzem progressivamente.

### 12.4 Utility classes

Algumas classes utilitárias estão disponíveis globalmente:

```css
.container     /* max-width: 1200px com padding lateral */
.glass-card    /* fundo translúcido com blur (glass morphism) */
.btn           /* base de botão */
.btn-primary   /* botão com cor de destaque */
.btn-outline   /* botão com borda */
.magnetic      /* habilita efeito magnético (MagneticLayer.tsx) */
.accent-text   /* texto com gradiente colorido */
```

---

## 13. Segurança e Performance

### 13.1 Content Security Policy (CSP)

**Arquivo:** `middleware.ts`

O CSP é uma política que diz ao browser de onde ele pode carregar recursos. Protege contra XSS (Cross-Site Scripting):

```
script-src 'self' 'nonce-{nonce}'
```

Em produção, scripts só rodam se tiverem o `nonce` correto (uma string aleatória gerada a cada request). Isso impede scripts injetados por atacantes.

Em desenvolvimento, o CSP é mais permissivo para permitir o hot-reload do Next.js.

### 13.2 Security Headers

Configurados em `next.config.ts`:

```
X-Content-Type-Options: nosniff
→ impede o browser de "adivinhar" o tipo de arquivo

X-Frame-Options: SAMEORIGIN
→ impede o site de ser embarcado em iframes de outros domínios (proteção contra clickjacking)

Referrer-Policy: strict-origin-when-cross-origin
→ limita informações enviadas ao navegar para outros sites

Permissions-Policy: camera=(), microphone=(), geolocation=()
→ desativa acesso a câmera, microfone e GPS
```

### 13.3 Proteções no formulário de contato

1. **Honeypot:** Campo invisível — bots preenchem, humanos não
2. **Rate limiting:** Máximo 3 envios por minuto por IP
3. **Sanitização SMTP:** Remove `\r\n` que poderiam injetar headers no e-mail
4. **Escape HTML:** Converte `<script>` em `&lt;script&gt;` antes de exibir no e-mail
5. **Validação server-side:** Nunca confia apenas na validação do cliente

### 13.4 Otimizações de Performance

**Imagens:**
- Next.js `<Image>` converte automaticamente para WebP/AVIF
- `priority` apenas em imagens above-the-fold
- `sizes` correto para cada breakpoint evita carregar imagens maiores que o necessário

**Vídeos:**
- Lazy load com IntersectionObserver — só carregam quando próximos da viewport
- `rootMargin: '300px'` começa o download antecipado sem atrasar o load inicial

**JavaScript:**
- Three.js é carregado dinamicamente: `import('three')` — só carrega na intro
- Componentes client-only usam `dynamic(() => import(...), { ssr: false })`
- Motion Values do Framer Motion não causam re-render (diferente de useState)

**requestAnimationFrame:**
- Scroll progress, custom cursor e animações usam RAF
- RAF sincroniza com o refresh rate do monitor (60/120fps)
- Evita flickering e usa a GPU eficientemente

---

## 14. Como Fazer Mudanças Comuns

### Mudar informações pessoais

**Nome, título e descrição:**
- SEO / metadados: `app/layout.tsx` (objeto `metadata`)
- Schema.org: `app/layout.tsx` (script JSON-LD)
- Textos visíveis: `lib/i18n.ts` (chaves `hero.*`, `about.*`)

**Foto de perfil:**
- Substitua `/public/images/fotonova.jpg`
- Mantenha o mesmo nome de arquivo, ou atualize o `src` em `components/About.tsx` linha 74
- Recomendado: proporção 680×760 (retrato)

**Redes sociais:**
- Links do rodapé: `components/Footer.tsx`
- Links do formulário de contato: `components/Contact.tsx`

---

### Mudar as cores do site

**Tema escuro (cores principais):**
```css
/* app/globals.css, início do arquivo */
:root {
  --accent: #00ff88;  /* ← mude para qualquer cor */
}
```

**Tema claro:**
```css
[data-theme="light"] {
  --accent: #2563eb;  /* ← cor no modo claro */
}
```

> Depois de mudar `--accent`, todas as bordas, botões, textos destacados e brilhos mudam automaticamente — está tudo usando `var(--accent)`.

---

### Mudar a fonte

**Arquivo:** `app/layout.tsx`

```tsx
import { Inter, JetBrains_Mono, /* SuaFonte */ } from 'next/font/google';

const suaFonte = SuaFonte({
  subsets: ['latin'],
  variable: '--font-sua-fonte',
});
```

Adicione a variável no `<html>` e atualize `--font-sans` em `globals.css`.

---

### Adicionar uma nova seção

1. Crie o componente em `components/MinhaSecao.tsx`
2. Importe e adicione em `app/page.tsx`
3. Dê um `id` único para o scroll funcionar: `<section id="minha-secao">`
4. Adicione ao `hooks/useActiveSection.ts` (lista de IDs observados)
5. Adicione ao `components/SideDots.tsx` (array de seções)
6. Adicione link na `components/Navbar.tsx`
7. Adicione as traduções em `lib/i18n.ts`

---

### Mudar os textos do site

Todos os textos estão em `lib/i18n.ts`. Procure pela chave e mude o valor:

```ts
// lib/i18n.ts
pt: {
  'hero.name': 'Gabriel Ricarte',       // ← mude aqui
  'hero.available': 'Disponível para projetos',
  // ...
}
```

> **Dica:** Use Ctrl+F no VS Code para buscar o texto que aparece na tela e localizar a chave correspondente.

---

### Desativar a tela de introdução 3D

Em `components/ClientShell.tsx`, comente a linha do IntroOverlay:

```tsx
// const IntroOverlay = dynamic(() => import('./IntroOverlay'), { ssr: false });
```

---

### Desativar o cursor personalizado

Em `components/ClientShell.tsx`, comente:

```tsx
// const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
// const MagneticLayer = dynamic(() => import('./MagneticLayer'), { ssr: false });
```

E em `app/globals.css`, remova ou comente:
```css
/* @media (any-pointer: fine) { body { cursor: none; } } */
```

---

## 15. Deploy na Vercel

### Configuração inicial

1. Faça push do projeto para GitHub
2. Acesse vercel.com e importe o repositório
3. Configure as variáveis de ambiente na Vercel (mesmas do `.env.local`)
4. Clique em "Deploy"

### Variáveis de ambiente na Vercel

No painel da Vercel: Settings → Environment Variables

```
CONTACT_EMAIL        → seu@email.com
SMTP_HOST            → smtp.gmail.com
SMTP_PORT            → 587
SMTP_USER            → seu@gmail.com
SMTP_PASS            → sua-senha-de-app
NEXT_PUBLIC_SITE_URL → https://seudominio.com
```

### Domínio customizado

Settings → Domains → Add Domain → siga as instruções DNS

### Deploy automático

Cada push para a branch `main` dispara um novo deploy automaticamente.

---

## 16. Glossário para Iniciantes

| Termo | Explicação simples |
|---|---|
| **SSR** | Server-Side Rendering — o servidor gera o HTML antes de enviar para o browser |
| **Hydration** | Processo onde o React "toma controle" do HTML gerado pelo servidor e o torna interativo |
| **Context API** | Sistema do React para compartilhar dados entre componentes sem passar por cada um |
| **useState** | Hook do React para guardar um valor que, quando muda, atualiza a tela |
| **useEffect** | Hook do React para executar código quando o componente carrega ou algo muda |
| **useRef** | Referência direta a um elemento HTML — não causa re-render quando muda |
| **Motion Value** | Valor especial do Framer Motion que atualiza o DOM diretamente, sem re-render |
| **IntersectionObserver** | API do browser que detecta quando um elemento entra ou sai da área visível |
| **requestAnimationFrame** | Função do browser que executa código antes do próximo frame ser desenhado (~60x/s) |
| **Singleton** | Padrão onde só existe uma instância de algo (ex: um único Lenis no site todo) |
| **CSP** | Content Security Policy — política que diz ao browser de onde pode carregar recursos |
| **Nonce** | String aleatória usada na CSP para autorizar scripts específicos |
| **FOUC** | Flash of Unstyled Content — conteúdo aparecendo sem estilo por um frame |
| **Honeypot** | Campo de formulário invisível para humanos mas visível para bots |
| **Rate Limiting** | Limitar quantas vezes alguém pode fazer uma ação em um período de tempo |
| **Sanitização** | Limpar dados recebidos para remover código malicioso antes de usar |
| **SMTP** | Protocolo de envio de e-mail (Simple Mail Transfer Protocol) |
| **Stagger** | Animar múltiplos itens em sequência com pequenos atrasos entre cada um |
| **Easing** | Curva que define como uma animação acelera e desacelera |
| **Lenis** | Biblioteca JavaScript que suaviza o scroll nativo do browser com física |
| **Three.js** | Biblioteca para criar gráficos 3D no browser usando WebGL |
| **WebGL** | API do browser para gráficos acelerados por GPU |
| **RAF** | Abreviação de requestAnimationFrame |
| **DPR** | Device Pixel Ratio — quantos pixels físicos correspondem a 1 pixel CSS |
| **i18n** | Abreviação de "internationalization" — suporte a múltiplos idiomas |
| **dynamic()** | Função do Next.js para carregar componentes apenas quando necessário (lazy loading) |
| **App Router** | Sistema de roteamento do Next.js 13+ baseado na estrutura de pastas dentro de `app/` |
| **Prop Drilling** | Problema de passar dados por muitos componentes intermediários — evitado com Context |
| **SSG** | Static Site Generation — páginas geradas em tempo de build, sem servidor |
| **Lazy Loading** | Técnica de adiar o carregamento de recursos até que sejam necessários |
| **Tree Shaking** | Processo de remover código JavaScript não usado durante o build |

---

> **Dúvidas ou problemas?** Verifique o console do browser (F12 → Console) e o terminal onde roda `npm run dev`. A maioria dos erros aparece ali com mensagens claras.
