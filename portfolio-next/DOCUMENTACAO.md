# Documentação Completa — Portfolio Gabriel Ricarte

> Última atualização: 2026-06-24

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Stack de Tecnologias](#2-stack-de-tecnologias)
3. [Estrutura de Pastas](#3-estrutura-de-pastas)
4. [Como Rodar o Projeto](#4-como-rodar-o-projeto)
5. [Variáveis de Ambiente](#5-variáveis-de-ambiente)
6. [Sistema de Temas (Claro/Escuro)](#6-sistema-de-temas-claroeuro)
7. [Sistema de Traduções (PT/EN/ES)](#7-sistema-de-traduções-ptenes)
8. [Dados Editáveis](#8-dados-editáveis)
   - [Projetos](#81-projetos--dataprojectstsx)
   - [Habilidades](#82-habilidades--dataskillstsx)
9. [Componentes — o que cada um faz](#9-componentes--o-que-cada-um-faz)
10. [Arquitetura CSS (globals.css)](#10-arquitetura-css-globalscss)
11. [Rota de API — Formulário de Contato](#11-rota-de-api--formulário-de-contato)
12. [Deploy (Vercel)](#12-deploy-vercel)

---

## 1. Visão Geral

Este é o portfólio pessoal de Gabriel Ricarte, desenvolvido com **Next.js 15** (App Router). É um site de página única (SPA) com animações avançadas, suporte a 3 idiomas, tema claro/escuro, partículas, cursor personalizado, e formulário de contato com backend próprio.

**URL de produção:** `https://gabrielricartedev.com`

---

## 2. Stack de Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 15 | Framework React com App Router |
| TypeScript | 5 | Tipagem estática |
| Framer Motion | 11 | Animações de entrada, hover e layout |
| Three.js | r168 | Animação 3D na intro overlay |
| Lenis | latest | Smooth scroll |
| Nodemailer | latest | Envio de e-mail no backend |
| Google Fonts | — | Inter (corpo) + JetBrains Mono (código) |

---

## 3. Estrutura de Pastas

```
portfolio-next/
├── app/
│   ├── layout.tsx          ← Layout raiz (metadados, fontes, providers)
│   ├── page.tsx            ← Página principal (monta todos os componentes)
│   ├── globals.css         ← TODO o CSS do projeto (variáveis, temas, componentes)
│   ├── error.tsx           ← Página de erro
│   ├── not-found.tsx       ← Página 404
│   ├── icon.svg            ← Favicon SVG
│   ├── robots.txt          ← SEO robots
│   ├── sitemap.xml         ← SEO sitemap
│   ├── opengraph-image.tsx ← Gera imagem OG automaticamente
│   └── api/
│       └── contact/
│           └── route.ts    ← Endpoint POST do formulário
│
├── components/
│   ├── Navbar.tsx          ← Barra de navegação (links, tema, idioma, mobile)
│   ├── Hero.tsx            ← Seção inicial (nome, roles, stats, status card)
│   ├── TechTape.tsx        ← Fita infinita de tecnologias
│   ├── Services.tsx        ← Cards de serviços (Frontend, Full-Stack, UI/UX)
│   ├── Projects.tsx        ← Grid de projetos com toggle vídeo/foto
│   ├── Skills.tsx          ← Chips de habilidades (Frontend, Backend, Tools)
│   ├── About.tsx           ← Sobre mim (foto, bio, stats, timeline)
│   ├── FAQ.tsx             ← Perguntas frequentes (accordion)
│   ├── Contact.tsx         ← Formulário de contato + redes sociais
│   ├── Footer.tsx          ← Rodapé (logo, redes, stack usada)
│   ├── IntroOverlay.tsx    ← Tela de intro/splash com Three.js
│   ├── ClientShell.tsx     ← Agrupa os componentes client-only (dynamic import)
│   ├── CustomCursor.tsx    ← Cursor personalizado (ponto + anel)
│   ├── MagneticLayer.tsx   ← Efeito magnético em botões (.magnetic)
│   ├── ParticleCanvas.tsx  ← Grade de pontos de fundo
│   ├── SmoothScroll.tsx    ← Lenis smooth scroll + ancora links
│   ├── SideDots.tsx        ← Pontos laterais de navegação
│   ├── ScrollProgress.tsx  ← Barra de progresso de rolagem (topo)
│   ├── BackTop.tsx         ← Botão "voltar ao topo"
│   ├── Toast.tsx           ← Elemento de notificação toast
│   ├── ProjectMocks.tsx    ← SVGs mockup dos projetos
│   ├── SkillIcons.tsx      ← Ícones SVG das tecnologias
│   ├── Testimonial.tsx     ← Seção de depoimento
│   └── VercelAnalytics.tsx ← Analytics da Vercel (só em produção)
│
├── contexts/
│   ├── ThemeContext.tsx     ← Estado global do tema (dark/light)
│   └── LangContext.tsx     ← Estado global do idioma (pt/en/es) + função t()
│
├── data/
│   ├── projects.tsx        ← ⭐ DADOS DOS PROJETOS (edite aqui)
│   └── skills.tsx          ← ⭐ DADOS DAS HABILIDADES (edite aqui)
│
├── hooks/
│   ├── useCounter.ts       ← Hook de contagem animada
│   └── useInView.ts        ← Hook de detecção de visibilidade no viewport
│
├── lib/
│   ├── i18n.ts             ← ⭐ TODAS AS TRADUÇÕES (edite aqui)
│   └── lenis-instance.ts   ← Singleton do Lenis para acesso global
│
├── public/
│   ├── images/             ← Todas as imagens do site
│   │   ├── fotoperfil.jpg  ← Foto de perfil
│   │   ├── fotonova.jpg    ← Foto About
│   │   ├── logo1-22.png    ← Logos das tecnologias (skills)
│   │   ├── project-venezamotos.png
│   │   └── project-github.png
│   └── videos/
│       ├── venezamotos.mp4 ← Vídeo do projeto Venezamotos
│       └── jurivox.mp4     ← Vídeo do projeto JuriVox
│
├── next.config.ts          ← Config do Next.js (CSP, cache, imagens)
└── .env.local              ← Variáveis de ambiente (não commitado no git)
```

---

## 4. Como Rodar o Projeto

```bash
# Entrar na pasta
cd portfolio-next

# Instalar dependências (primeira vez)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
# → http://localhost:3000

# Criar build de produção
npm run build

# Iniciar servidor de produção local
npm start
```

---

## 5. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz de `portfolio-next/`:

```env
# URL do site em produção (usado nos metadados OG)
NEXT_PUBLIC_SITE_URL=https://gabrielricartedev.com

# Configurações do SMTP para envio de e-mail pelo formulário de contato
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app-gmail

# E-mail que recebe os contatos (padrão: gabrielricarte000@gmail.com)
CONTACT_EMAIL=gabrielricarte000@gmail.com
```

> **Importante:** Sem as variáveis `SMTP_*`, o formulário de contato não envia e-mail, mas o site funciona normalmente. Os contatos são apenas logados no console do servidor.

> **Gmail:** Para usar o Gmail como SMTP, ative "Verificação em 2 etapas" na conta e gere uma **Senha de App** em `myaccount.google.com/apppasswords`.

---

## 6. Sistema de Temas (Claro/Escuro)

### Como funciona

O tema é controlado pelo atributo `data-theme` na tag `<html>`:

```html
<html data-theme="dark">   ← modo escuro (padrão)
<html data-theme="light">  ← modo claro
```

### Arquivo principal: `contexts/ThemeContext.tsx`

- Lê o tema salvo no `localStorage` (chave: `'theme'`)
- Detecta a preferência do sistema (`prefers-color-scheme`) como fallback
- Salva a escolha do usuário no `localStorage`
- Para usar em qualquer componente:

```tsx
import { useTheme } from '@/contexts/ThemeContext';

const { theme, toggle } = useTheme();
// theme = 'dark' | 'light'
// toggle() alterna entre os dois
```

### Onde ficam as cores: `app/globals.css`

```css
/* ── Modo Escuro (padrão) ── */
:root {
  --bg:        #04040e;       /* Fundo principal */
  --bg-alt:    #07071a;       /* Fundo alternado (seções pares) */
  --bg-card:   #0e0e22;       /* Fundo dos cards */
  --accent:    #00ff88;       /* Verde neon (cor de destaque) */
  --accent-2:  #00aaff;       /* Azul (cor secundária) */
  --text:      #e8f0f8;       /* Texto principal */
  --muted:     #8892b0;       /* Texto secundário/apagado */
  --border:    rgba(255,255,255,0.08);
}

/* ── Modo Claro ── */
[data-theme="light"] {
  --bg:        #f6f8ff;
  --bg-alt:    #edf0fb;
  --bg-card:   #ffffff;
  --accent:    #2563eb;       /* Azul (cor de destaque no claro) */
  --accent-2:  #0ea5e9;
  --text:      #050511;
  --muted:     #4b5568;
  --border:    rgba(37,99,235,0.13);
}
```

### Como mudar a cor de destaque no modo claro

Edite `globals.css` na linha do `[data-theme="light"]`, campo `--accent`:

```css
[data-theme="light"] {
  --accent: #sua-cor-aqui;   /* Ex: #e11d48 para rosa, #16a34a para verde */
}
```

Depois, mude todas as ocorrências de `rgba(37,99,235,...)` para `rgba(R,G,B,...)` com os valores RGB da nova cor.

---

## 7. Sistema de Traduções (PT/EN/ES)

### Arquivo principal: `lib/i18n.ts`

Contém **~174 strings** por idioma (~522 no total). Todos os textos do site estão aqui.

### Como editar um texto

1. Abra `lib/i18n.ts`
2. Encontre a chave correspondente
3. Edite o valor para cada um dos 3 idiomas (`pt`, `en`, `es`)

**Exemplo — mudar o texto da bio:**

```typescript
// lib/i18n.ts
'about.p1': {
  pt: 'Seu novo texto em português aqui.',
  en: 'Your new English text here.',
  es: 'Tu nuevo texto en español aquí.',
},
```

### Como usar em um componente

```tsx
import { useLang } from '@/contexts/LangContext';

function MeuComponente() {
  const { t, lang } = useLang();

  return <p>{t('about.p1')}</p>;
  // Retorna o texto no idioma atual automaticamente
}
```

### Tabela de todas as chaves de tradução

| Categoria | Chaves | Descrição |
|---|---|---|
| **Página** | `page.title` | Título da aba do navegador |
| **Intro** | `intro.tag`, `intro.role`, `intro.skip` | Texto da tela de intro |
| **Navbar** | `nav.home` … `nav.faq` | Links da navegação |
| **Hero** | `hero.greeting`, `hero.role.pre`, `hero.desc`, `hero.btn.*`, `hero.stat.*` | Seção inicial |
| **Serviços** | `service1.*` … `service3.*` | Cards de serviço |
| **Projetos** | `proj1.*` … `proj3.*`, `proj.btn` | Cards de projetos |
| **Skills** | `skills.cat.frontend`, `.backend`, `.tools` | Categorias de habilidades |
| **Sobre** | `about.p1`, `about.p2`, `about.tag*`, `about.stat.*`, `about.contact` | Seção sobre |
| **Timeline** | `timeline.t[1-4].year`, `.title`, `.desc` | Linha do tempo |
| **FAQ** | `faq.[1-5].q`, `faq.[1-5].a` | Perguntas e respostas |
| **Contato** | `contact.desc`, `contact.or`, `form.*` | Formulário de contato |
| **Depoimento** | `testimonial.quote`, `.name`, `.role` | Seção de depoimento |
| **Rodapé** | `footer.in`, `footer.rights` | Rodapé |

---

## 8. Dados Editáveis

### 8.1 Projetos — `data/projects.tsx`

Este arquivo define os 3 projetos exibidos na seção "Projetos".

```typescript
export const PROJECTS: Project[] = [
  {
    id:         'venezamotos',          // Identificador único (não aparece no site)
    tagKey:     'proj1.tag',            // Chave de tradução da tag/categoria
    titleKey:   'proj1.title',          // Chave de tradução do título
    descKey:    'proj1.desc',           // Chave de tradução da descrição
    techs:      ['HTML', 'CSS', 'JavaScript'],  // Badges de tecnologia (texto livre)
    url:        'https://www.venezamotoseveiculos.com.br',  // Link do projeto
    githubUrl:  '',                     // Link do GitHub ('' = não mostra botão)
    urlLabel:   'venezamotoseveiculos.com.br',  // URL exibida no browser mockup
    videoSrc:   '/videos/venezamotos.mp4',      // Vídeo (opcional, '' = sem vídeo)
    screenshot: '/images/project-venezamotos.png',  // Screenshot ('' = usa SVG mock)
    fallback:   <MockVenezamotos />,    // SVG mockup (exibido se sem screenshot/vídeo)
    featured:   true,                   // true = card maior/destacado
    live:       true,                   // true = mostra badge "LIVE"
  },
  // ...mais projetos
];
```

#### Como adicionar um projeto

1. Coloque o screenshot em `public/images/project-meuprojeto.png`
2. (Opcional) Coloque o vídeo em `public/videos/meuprojeto.mp4`
3. (Opcional) Crie um SVG mockup em `components/ProjectMocks.tsx`
4. Adicione as traduções em `lib/i18n.ts` (chaves `proj4.*`)
5. Adicione o objeto no array `PROJECTS`:

```typescript
{
  id:         'meuprojeto',
  tagKey:     'proj4.tag',
  titleKey:   'proj4.title',
  descKey:    'proj4.desc',
  techs:      ['React', 'Node.js'],
  url:        'https://meuprojeto.com',
  githubUrl:  'https://github.com/gabriel07-gif/meuprojeto',
  urlLabel:   'meuprojeto.com',
  videoSrc:   '/videos/meuprojeto.mp4',  // ou '' se não tiver
  screenshot: '/images/project-meuprojeto.png',
  fallback:   <MockMeuProjeto />,
  featured:   false,
  live:       true,
}
```

#### Como remover um projeto

Simplesmente delete o objeto do array `PROJECTS`.

---

### 8.2 Habilidades — `data/skills.tsx`

Define os chips de habilidades na seção "Stack".

```typescript
export const FRONTEND: ChipData[] = [
  { name: 'HTML5',      img: '/images/logo3.png' },
  { name: 'CSS3',       img: '/images/logo2.png' },
  { name: 'JavaScript', img: '/images/logo1.png' },
  { name: 'TypeScript', img: '/images/logo13.png', featured: true }, // featured = borda colorida
  { name: 'React',      img: '/images/logo14.png', featured: true },
  { name: 'Next.js',    img: '/images/logo5.png',  featured: true },
];

export const BACKEND: ChipData[] = [ /* Node.js, PostgreSQL, REST APIs, SQL */ ];

export const TOOLS: ChipData[] = [ /* Git, Figma, Vercel, Docker */ ];
```

#### Como adicionar uma habilidade

1. Coloque o logo em `public/images/logo-nome.png` (PNG transparente, quadrado)
2. Adicione ao array correto em `data/skills.tsx`:

```typescript
{ name: 'Prisma', img: '/images/logo-prisma.png', featured: true }
```

#### Alternativas se não tiver imagem

```typescript
// Usar uma letra como placeholder:
{ name: 'Prisma', letter: 'P' }

// Usar um ícone SVG customizado (de SkillIcons.tsx):
{ name: 'TypeScript', icon: <IconTS /> }
```

#### `featured: true`

Adiciona uma borda de destaque ao chip. Use para as tecnologias principais.

---

## 9. Componentes — o que cada um faz

### `components/Navbar.tsx`

Barra de navegação fixa no topo.

**O que editar:**
- **Links:** edite o array `NAV_LINKS` dentro do arquivo — cada item tem `href` (âncora da seção) e `key` (chave de tradução)
- **Logo:** altere o texto "Gabriel" diretamente no JSX
- **Redes sociais no dropdown de idioma:** não há, está no Footer
- **Breakpoint mobile:** ≤768px — hamburguer menu aparece

---

### `components/Hero.tsx`

Seção inicial com nome animado, roles rotativas, stats e o card de status.

**O que editar:**
- **Roles rotativas:** array `CYCLE_ROLES` no topo do arquivo — atualmente `['Full-Stack', 'Frontend', 'Back-End', 'TypeScript']`
- **Velocidade de rotação:** `setInterval(..., 2800)` — mude `2800` para mais rápido/lento
- **Contadores:** `useCounter(2, ...)`, `useCounter(8, ...)`, `useCounter(15, ...)` — primeiro argumento é o valor final
- **Card de status (Dev Status):** o JSX está nas linhas ~186–259; o texto usa chaves de tradução
- **Nome:** constante `NAME = 'Gabriel'` no topo do arquivo

---

### `components/TechTape.tsx`

Fita infinita de tecnologias animada por CSS.

**O que editar:**
- **Row 1:** array `TECHS` — tecnologias que aparecem na primeira linha (esquerda → direita)
- **Row 2:** array `TECHS_2` — segunda linha (direita → esquerda)
- **Velocidade:** na `globals.css`, procure por `.tech-tape-track` e ajuste `animation-duration`

---

### `components/Services.tsx`

Três cards de serviços com spotlight ao hover.

**O que editar:**
- **Textos:** apenas em `lib/i18n.ts` com chaves `service[1-3].*`
- **Número de itens da lista:** cada serviço tem 4 itens (`list.1` a `list.4`) — para adicionar mais, adicione chaves `list.5` na i18n e inclua em `listKeys`
- **Card em destaque (meio):** `highlight: true` no objeto do serviço

---

### `components/Projects.tsx`

Grid de projetos com toggle Fotos/Vídeos e efeito 3D no hover.

**O que editar:**
- **Toggle padrão:** `useState<'photo' | 'video'>('photo')` — mude `'photo'` para `'video'` se quiser que vídeos iniciem ativos
- **Cards:** os dados vêm de `data/projects.tsx`
- **Efeito 3D:** os graus de rotação estão em `[6, -6]` e `[-6, 6]` — aumente para efeito mais pronunciado

---

### `components/Skills.tsx`

Chips de habilidades organizados em 3 categorias.

**O que editar:**
- **Dados:** em `data/skills.tsx`
- **Tamanho dos ícones:** em `globals.css`, procure `.skill-chip-icon` — atualmente `width: 64px; height: 64px`
- **Padding da imagem dentro do chip:** em `Skills.tsx` linha 19, `style={{ padding: '6px' }}`

---

### `components/About.tsx`

Seção "Sobre mim" com foto, bio, tags de habilidades, contadores e timeline.

**O que editar:**
- **Foto principal:** substitua `public/images/fotonova.jpg`
- **Textos:** `about.p1`, `about.p2` em `lib/i18n.ts` — suportam HTML (ex: `<strong>`, `<a>`)
- **Tags de skills:** `about.tag[1-4]` em `lib/i18n.ts`
- **Contadores:** encontre `useCounter(2, ...)`, `useCounter(8, ...)`, `useCounter(15, ...)` — altere o primeiro número para o valor real
- **Timeline:** chaves `timeline.t[1-4].*` em `lib/i18n.ts`

---

### `components/FAQ.tsx`

Accordion de 5 perguntas frequentes.

**O que editar:**
- **Perguntas e respostas:** chaves `faq.[1-5].q` e `faq.[1-5].a` em `lib/i18n.ts`
- **Número de itens:** o array `FAQ_KEYS = ['1', '2', '3', '4', '5']` determina quantos itens existem — adicione `'6'` e crie as chaves correspondentes na i18n para ter 6 itens

---

### `components/Contact.tsx`

Formulário de contato com validação, honeypot e links de redes sociais.

**O que editar:**
- **E-mail de fallback (mailto):** constante `MAILTO_FALLBACK` no topo do arquivo
- **Redes sociais:** array `SOCIALS` — cada item tem `key`, `label`, `icon`/`img`, e `url`
- **Limite de caracteres:** `maxLength={2000}` na textarea e validação em `validate()`
- **Rate limit:** configurado no backend (`app/api/contact/route.ts`) — atualmente 3 mensagens/minuto por IP

---

### `components/Footer.tsx`

Rodapé com logo, links sociais e stack usada.

**O que editar:**
- **Redes sociais:** array `SOCIALS` no topo do arquivo
- **Stack exibida:** array `STACK` — mostra quais tecnologias foram usadas para construir o site
- **Ano de copyright:** calculado automaticamente com `new Date().getFullYear()`
- **Textos:** chaves `footer.*` em `lib/i18n.ts`

---

### `components/IntroOverlay.tsx`

Tela de intro/splash com animação Three.js (partículas 3D). Aparece apenas na primeira visita por sessão.

**O que editar:**
- **Duração:** constante `TOTAL_MS = 6000` — duração total em ms antes de fechar automaticamente
- **Velocidade de entrada:** `ENTRY_DUR = 2.6` — duração da animação das letras (segundos)
- **Desativar completamente:** remova `<IntroOverlay />` de `ClientShell.tsx`

---

### `components/CustomCursor.tsx`

Cursor personalizado com ponto e anel. Automático em dispositivos não-touch.

**O que editar:**
- **Velocidade do anel:** constante `lerp = 0.13` — valores maiores = mais rápido (0.0 a 1.0)
- **Desativar:** remova `<CustomCursor />` de `ClientShell.tsx`

---

### `components/MagneticLayer.tsx`

Faz botões com classe `.magnetic` "atraírem" o cursor.

**O que editar:**
- **Força do efeito:** constante `STRENGTH = 0.4` — aumente para efeito mais forte
- **Adicionar o efeito a um botão:** adicione a classe `magnetic` ao elemento
- **Remover o efeito:** remova a classe `magnetic` ou remova `<MagneticLayer />` de `ClientShell.tsx`

---

### `components/SmoothScroll.tsx`

Rolagem suave usando a biblioteca Lenis.

**O que editar:**
- **Suavidade:** `lerp: 0.1` — valores menores = mais suave (0.05 recomendado para muito suave)
- **Desativar:** remova `<SmoothScroll />` de `ClientShell.tsx`
- **Offset do scroll:** `-80` representa a altura da navbar — mude se a navbar mudar de tamanho

---

### `components/Testimonial.tsx`

Um depoimento de cliente com avatar, nome e role.

**O que editar:**
- **Conteúdo:** chaves `testimonial.*` em `lib/i18n.ts`
- **Letra do avatar:** no JSX, encontre a letra "V" e troque pela inicial do nome

---

### `components/ProjectMocks.tsx`

SVGs estáticos que simulam a interface dos projetos. Aparecem como fallback quando não há screenshot ou enquanto o vídeo carrega.

**O que editar:**
- **Cores dos mocks:** edite os valores `fill` dentro de cada SVG
- **Adicionar novo mock:** crie uma nova função exportada `MockNomeDoProjeto()` seguindo o padrão das existentes (SVG com `viewBox="0 0 400 260"`)

---

## 10. Arquitetura CSS (`globals.css`)

O arquivo `app/globals.css` é **único e contém TODO o CSS do projeto** (~2400 linhas). Está organizado em seções com comentários `/* ── NOME DA SEÇÃO ── */`.

### Seções do arquivo

| Linhas | Seção | O que contém |
|---|---|---|
| 1–46 | THEME VARIABLES | Variáveis CSS de tema |
| 48–99 | BASE RESET | Reset, body, focus styles |
| 100–220 | BUTTONS | Estilos de botões |
| 221–350 | NAVBAR | Barra de navegação |
| 351–550 | HERO | Seção inicial |
| 551–780 | SERVICES | Cards de serviços |
| 781–900 | TECH TAPE | Fita de tecnologias |
| 900–1100 | CONTACT | Formulário de contato |
| 1100–1300 | FOOTER | Rodapé |
| 1300–1450 | RESPONSIVE NAVBAR | Navbar mobile |
| 1450–1700 | SKILLS | Chips de habilidades |
| 1700–1900 | PROJECT CARDS | Cards de projetos |
| 1900–2000 | HERO STATUS CARD | Card de status |
| 2000–2100 | CURSOR | Cursor personalizado |
| 2100–2300 | ABOUT / FAQ / OTHER | Sobre, FAQ, timeline |

### Como mudar a cor de um elemento específico

Procure pelo nome da classe no arquivo usando `Ctrl+F` e edite o valor correspondente.

**Exemplo — mudar a borda dos cards:**
```css
/* Procure por: */
.project-card {
  border: 1px solid var(--border);  /* usa variável do tema */
}
```

### Como adicionar estilo apenas no modo claro

```css
[data-theme="light"] .minha-classe {
  color: #sua-cor;
  background: #outra-cor;
}
```

### Variáveis CSS disponíveis (use em qualquer lugar)

```css
var(--bg)        /* Fundo principal */
var(--bg-alt)    /* Fundo alternado */
var(--bg-card)   /* Fundo de cards */
var(--accent)    /* Cor de destaque (verde escuro / azul claro) */
var(--accent-2)  /* Cor secundária (azul) */
var(--text)      /* Texto principal */
var(--muted)     /* Texto apagado */
var(--border)    /* Cor das bordas */
var(--shadow)    /* Sombra padrão */
var(--shadow-lg) /* Sombra grande */
```

---

## 11. Rota de API — Formulário de Contato

**Arquivo:** `app/api/contact/route.ts`

### Como funciona

```
Usuário preenche formulário
     ↓
POST /api/contact
     ↓
Rate limit (3 req/min por IP) ─────→ 429 Too Many Requests
     ↓
Validação campos (nome, email, mensagem)
     ↓
Sanitização (remove HTML injection, SMTP header injection)
     ↓
Envia e-mail para Gabriel (SMTP) ────→ E-mail de notificação
     ↓
Envia confirmação ao usuário ─────────→ E-mail de confirmação
     ↓
200 OK { ok: true }
```

### Rate limiting

```typescript
const RATE_WINDOW_MS = 60_000;  // janela de 1 minuto
const RATE_LIMIT_MAX = 3;       // máximo 3 envios por janela por IP
```

Para mudar os limites, edite essas constantes.

> **Nota:** O rate limit é in-memory — reseta quando o servidor reinicia. Aceitável para portfólio.

### Sem SMTP configurado

Se as variáveis `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` não estiverem definidas, o formulário ainda "funciona" — retorna `200 OK` mas só loga no console. Útil durante desenvolvimento.

---

## 12. Deploy (Vercel)

### Primeiro deploy

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Configure as variáveis de ambiente no painel da Vercel (Settings → Environment Variables):

```
NEXT_PUBLIC_SITE_URL    = https://seudominio.com
SMTP_HOST               = smtp.gmail.com
SMTP_PORT               = 587
SMTP_USER               = seu-email@gmail.com
SMTP_PASS               = senha-de-app-gmail
CONTACT_EMAIL           = gabrielricarte000@gmail.com
```

4. Clique em Deploy

### Deploys subsequentes

Cada push para a branch `main` dispara um deploy automático na Vercel.

### Domínio personalizado

Em Settings → Domains na Vercel, adicione seu domínio. Atualize `NEXT_PUBLIC_SITE_URL` com a URL final.

---

## Referência Rápida — Onde editar cada coisa

| O que mudar | Arquivo |
|---|---|
| Textos do site (qualquer idioma) | `lib/i18n.ts` |
| Adicionar/remover projeto | `data/projects.tsx` |
| Adicionar/remover skill | `data/skills.tsx` |
| Foto de perfil | `public/images/fotoperfil.jpg` |
| Foto do "Sobre" | `public/images/fotonova.jpg` |
| Cor de destaque do tema claro | `app/globals.css` → `[data-theme="light"] { --accent }` |
| Cor de destaque do tema escuro | `app/globals.css` → `:root { --accent }` |
| Vídeos dos projetos | `public/videos/*.mp4` |
| Links das redes sociais (footer) | `components/Footer.tsx` → array `SOCIALS` |
| Links das redes sociais (contato) | `components/Contact.tsx` → array `SOCIALS` |
| E-mail de recebimento | `.env.local` → `CONTACT_EMAIL` |
| Roles rotativas (Hero) | `components/Hero.tsx` → array `CYCLE_ROLES` |
| Itens da tech tape | `components/TechTape.tsx` → arrays `TECHS` e `TECHS_2` |
| Força do efeito magnético | `components/MagneticLayer.tsx` → `STRENGTH` |
| Duração da intro | `components/IntroOverlay.tsx` → `TOTAL_MS` |
| Suavidade do scroll | `components/SmoothScroll.tsx` → `lerp: 0.1` |
| Metadados SEO (título, descrição OG) | `app/layout.tsx` → `export const metadata` |
| CSP / headers de segurança | `next.config.ts` |
