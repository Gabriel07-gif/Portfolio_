# Portfolio — Gabriel Ricarte

Portfolio pessoal de Gabriel Ricarte, desenvolvedor web full-stack em Fortaleza, CE.
Site disponível em `https://gabrielricartedev.com`.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15.1.0 (App Router) |
| UI | React 19 |
| Linguagem | TypeScript 5.7 strict mode |
| Estilização | CSS global (`app/globals.css`) — sem Tailwind no runtime |
| Animações | Framer Motion 11 |
| Scroll suave | Lenis 1.3 |
| 3D (intro) | Three.js 0.170 |
| Email | Nodemailer 6.9 |
| Analytics | @vercel/analytics 2 |
| Deploy | Vercel |

---

## Scripts

```bash
npm run dev          # Servidor de dev
npm run dev:fresh    # Limpa .next e inicia dev
npm run build        # Build de produção
npm run build:fresh  # Limpa .next e faz build
npm start            # Inicia servidor de produção
npm run lint         # ESLint
```

---

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canônica (padrão: `https://gabrielricartedev.com`) |
| `SMTP_HOST` | Host do servidor SMTP |
| `SMTP_PORT` | Porta SMTP (ex.: 587) |
| `SMTP_USER` | Usuário SMTP |
| `SMTP_PASS` | Senha SMTP |
| `CONTACT_EMAIL` | Destino dos emails recebidos |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email exibido no cliente (fallback mailto) |

---

## Estrutura de arquivos

```
portfolio-next/
├── app/
│   ├── layout.tsx          # RootLayout: metadados, JSON-LD, nonce, fonts, providers
│   ├── page.tsx            # Página principal (todos os sections)
│   ├── globals.css         # Todos os estilos (~2534 linhas)
│   └── api/
│       └── contact/
│           └── route.ts    # API de contato (Nodemailer + rate limiting)
├── components/             # 25 componentes (ver tabela abaixo)
├── contexts/
│   ├── ThemeContext.tsx     # dark/light — persiste em localStorage
│   └── LangContext.tsx     # pt/en/es — chama t() para i18n
├── hooks/
│   ├── useActiveSection.ts # Rastreia seção visível para nav highlighting
│   ├── useCounter.ts       # Contagem animada de números
│   └── useInView.ts        # Intersection Observer wrapper
├── lib/
│   ├── i18n.ts             # ~600+ chaves de tradução PT/EN/ES
│   └── lenis-instance.ts   # Singleton do Lenis para acesso global
├── data/
│   ├── projects.tsx        # Array PROJECTS (3 projetos)
│   └── skills.tsx          # Arrays FRONTEND, BACKEND, TOOLS
├── middleware.ts            # CSP nonce por request, headers de segurança
├── next.config.ts           # Configuração Next.js, headers de cache
└── public/
    ├── images/              # Fotos, logos, ícones SVG
    └── videos/              # Videos dos projetos (.mp4)
```

---

## Componentes

| Componente | Descrição |
|---|---|
| `ClientShell` | Wrapper client-only: monta IntroOverlay, CustomCursor, ParticleCanvas, MagneticLayer, SmoothScroll |
| `IntroOverlay` | Tela de entrada com Three.js (esfera, anéis, partículas). Dispensada por click/Enter/ESC/timeout |
| `Navbar` | Barra de navegação com links de seção, toggle tema, toggle idioma |
| `Hero` | Seção principal com nome, título, CTA e animações Framer Motion |
| `TechTape` | Fita horizontal com logos de tecnologias (scroll infinito) |
| `Services` | Cards dos serviços oferecidos |
| `Projects` | Lista os projetos de `data/projects.tsx` com vídeo/screenshot e modal |
| `ProjectMocks` | Componentes mock visuais (MockVenezamotos, MockJuriVox, MockPortfolio) usados como fallback |
| `Skills` | Grade de habilidades técnicas de `data/skills.tsx` |
| `About` | Seção sobre o autor com foto (fotonova.jpg) e bio |
| `FAQ` | Perguntas frequentes com accordion |
| `Contact` | Formulário de contato + links de redes sociais |
| `Footer` | Rodapé com links e copyright |
| `ScrollProgress` | Barra de progresso de scroll no topo da página |
| `SideDots` | Indicadores laterais de seção ativa (ocultos em mobile) |
| `BackTop` | Botão "voltar ao topo" com SVG de seta |
| `Toast` | Notificação global (id="toast") usada pelo Contact |
| `SkipLink` | Link de acessibilidade "pular para conteúdo" |
| `CustomCursor` | Cursor personalizado (apenas desktop) |
| `ParticleCanvas` | Canvas com partículas de fundo |
| `MagneticLayer` | Efeito magnético nos elementos `.magnetic` |
| `SmoothScroll` | Inicializa e gerencia singleton do Lenis |
| `MotionProvider` | Desabilita animações Framer Motion via `reducedMotion` |
| `ErrorBoundary` | Boundary React para captura de erros em render |
| `VercelAnalytics` | Integra @vercel/analytics de forma lazy |

---

## Seções da página (ordem)

1. `#inicio` — Hero
2. *(sem id)* — TechTape
3. `#servicos` — Services
4. `#projetos` — Projects
5. `#habilidades` — Skills
6. `#sobre` — About
7. `#faq` — FAQ
8. `#contato` — Contact

---

## Projetos (`data/projects.tsx`)

| id | Título i18n | Techs | Video | Destaque |
|---|---|---|---|---|
| `venezamotos` | `proj1.title` | HTML, CSS, JavaScript | `/videos/venezamotos.mp4` | Sim |
| `jurivox` | `proj2.title` | Next.js, TypeScript, Supabase, Clerk, Stripe, Tailwind | `/videos/jurivox.mp4` | Não |
| `portfolio` | `proj3.title` | Next.js, TypeScript, Framer Motion, Three.js | `/videos/portfolio.mp4` | Não |

---

## Habilidades (`data/skills.tsx`)

**FRONTEND**: HTML5, CSS3, JavaScript, TypeScript\*, React\*, Next.js\*

**BACKEND**: Node.js\*, PostgreSQL, REST APIs, SQL

**TOOLS**: Git, Figma, Vercel, Docker

\* = `featured: true`

---

## i18n (`lib/i18n.ts`)

- Idiomas: `pt` (padrão), `en`, `es`
- Selecionado via `LangContext` — toggle na Navbar
- Acessado via `const { t } = useLang()` e `t('chave')`
- Chaves cobrem todos os textos visíveis: nav, seções, formulário, erros, FAQ, serviços, projetos, habilidades

---

## API de contato (`app/api/contact/route.ts`)

- `POST /api/contact` — aceita `{ name, email, message }`
- Rate limiting por IP (em memória, sem Redis)
- Envia email principal via Nodemailer (SMTP configurável)
- Envia auto-reply em try-catch independente (falha não retorna 500)
- Honeypot no formulário frontend (`field: website`) — bots preenchem, humanos não
- Validação: nome ≤80 chars, email regex, mensagem ≤2000 chars
- Fallback: se fetch falhar, abre `mailto:` no client

---

## Segurança

- **CSP** gerada por nonce em `middleware.ts` por request (não estática)
  - Dev: `unsafe-inline` + `unsafe-eval` para HMR
  - Prod: `nonce-{nonce}` + `strict-dynamic`
- Headers adicionais em `next.config.ts`:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `X-DNS-Prefetch-Control: on`
- `poweredByHeader: false` — remove `X-Powered-By: Next.js`

---

## Cache (`next.config.ts`)

| Rota | Cache-Control |
|---|---|
| `/_next/static/*` | `public, max-age=31536000, immutable` |
| `/images/*` | `public, max-age=2592000, stale-while-revalidate=86400` |
| `/videos/*` | `public, max-age=2592000, stale-while-revalidate=86400` |

---

## CSS (`app/globals.css`)

- Arquivo único, ~2534 linhas
- Variáveis CSS em `:root` e `[data-theme="light"]`
- Principais variáveis de tema: `--bg`, `--surface`, `--text`, `--muted`, `--accent`, `--shadow`, `--shadow-lg`
- Fontes: `--font-inter` (corpo), `--font-mono` (código)
- Classes utilitárias: `.container`, `.section-header`, `.section-num`, `.section-line`, `.btn`, `.btn-primary`, `.glass-card`, `.magnetic`
- Scroll suave: gerenciado via Lenis; `prefers-reduced-motion` desativa Lenis e usa `animation-duration: 0.01ms`
- GPU compositing nos blobs: `will-change: transform; contain: layout style`

---

## Assets públicos

```
public/images/
├── fotonova.jpg              # Foto de perfil (About)
├── project-venezamotos.png   # Screenshot do projeto
├── project-jurivox.png       # Screenshot do projeto
├── project-portfolio.png     # Screenshot do projeto
├── logo7.png  → logo12.png   # Logos de redes sociais (Facebook, Instagram, WhatsApp, GitHub, GitHub light, LinkedIn)
├── logofav.png               # Favicon/logo do site
└── svg/                      # SVGs das tecnologias (17 arquivos)
    html5.svg, css3.svg, javascript.svg, typescript.svg,
    react.svg, nextjs-white.svg, nextjs-dark.svg, nodejs.svg,
    postgresql.svg, api.svg, database.svg, git.svg, figma.svg,
    vercel-white.svg, vercel-dark.svg, docker.svg

public/videos/
├── venezamotos.mp4           # Demo do projeto Venezamotos
├── jurivox.mp4               # Demo do projeto JuriVox
└── portfolio.mp4             # Demo deste portfolio (720p, ~2.6MB, sem áudio)
```

---

## Metadados e SEO

- Definidos em `app/layout.tsx` via `export const metadata`
- JSON-LD Schema.org: `Person`, `WebSite`, `ProfilePage`
- OpenGraph e Twitter Card configurados
- `canonical` aponta para `NEXT_PUBLIC_SITE_URL`
- Keywords em PT, EN e ES
- Idiomas declarados: `pt-BR`, `en`, `es`
- `<html lang="pt-BR">` — tema inicial `dark`

---

## Fonts

- **Inter** (`--font-inter`) — Google Fonts, subset latin, display swap
- **JetBrains Mono** (`--font-mono`) — Google Fonts, pesos 400/500/700, display swap

---

## PWA

Manifest em `public/manifest.webmanifest` (ou `app/manifest.ts`) com ícones:
SVG, 180×180, 192×192, 512×512

---

## Acessibilidade

- `<SkipLink>` leva ao `#main-content`
- Todos os inputs com `<label>` associado, `aria-required`, `aria-describedby` para erros
- SVGs decorativos com `aria-hidden="true"`
- `role="alert"` nas mensagens de erro do formulário
- `role="progressbar"` no ScrollProgress
- `prefers-reduced-motion` respeitado (Lenis desligado, animações encurtadas)
- Imagens com `alt` descritivo ou `alt=""` quando decorativas

---

## Convenções de desenvolvimento

- TypeScript strict — sem `any`, sem erros em `npx tsc --noEmit`
- Componentes client-side marcados com `'use client'`
- Sem Tailwind no runtime — classes CSS customizadas no `globals.css`
- Nenhuma animação sem fallback para `prefers-reduced-motion`
- Remoção de event listeners no cleanup do `useEffect`
- Sem comentários de código exceto para lógica não óbvia (honeypot, nonce, etc.)
