# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This repo root contains two unrelated things:
- `portfolio-next/` — the actual Next.js 15 application (all code lives here; run all commands from this directory).
- `fotosportfolio/` — a flat dump of raw source images/video/logos, not consumed by the build directly. Assets actually used by the site live in `portfolio-next/public/`.

There is no monorepo tooling — `portfolio-next` is a standalone app. `cd portfolio-next` before running any command below.

A very detailed (Portuguese) walkthrough of the whole codebase already exists at [portfolio-next/DOCUMENTACAO.md](portfolio-next/DOCUMENTACAO.md) — read it for line-level explanations of animations, i18n, theming, etc. This file summarizes the architecture; DOCUMENTACAO.md is the deep reference.

## Commands

Run from `portfolio-next/`:

```bash
npm install          # install deps
npm run dev           # dev server with hot reload, http://localhost:3000
npm run dev:fresh     # wipe .next then dev
npm run build         # production build
npm run build:fresh   # wipe .next then build
npm run start          # run the production build
npm run lint           # eslint (eslint-config-next)
```

There is no test suite configured in this project.

Requires a `.env.local` (copy from `.env.example`) with SMTP credentials for the contact form: `CONTACT_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NEXT_PUBLIC_SITE_URL`.

## Architecture

Single-page portfolio site (Next.js 15 App Router, React 19, TypeScript). `app/page.tsx` composes one section-per-component in order (Hero → TechTape → Services → Projects → Skills → About → FAQ → Contact → Footer); adding a section means adding a component, wiring it into `page.tsx`, and registering its id in `hooks/useActiveSection.ts`, `components/SideDots.tsx`, and `components/Navbar.tsx`.

**Styling**: all CSS lives in one file, `app/globals.css` (~2400 lines), using CSS custom properties as design tokens — no CSS-in-JS, no CSS Modules, Tailwind is installed but essentially unused. Theme switching works by toggling `data-theme="light"|"dark"` on `<html>`; every color in the CSS is `var(--token)`, so palette changes only touch the `:root` / `[data-theme="light"]` blocks at the top of `globals.css`.

**Global state via Context** (`contexts/`): `ThemeContext` (dark/light, persisted to `localStorage`, applied pre-hydration via an inline `<script>` in `app/layout.tsx` to avoid a flash of unstyled content) and `LangContext` (pt/en/es, also `localStorage`-persisted with `navigator.language` fallback). Both wrap the app in `layout.tsx`.

**i18n** (`lib/i18n.ts`): flat `Record<Lang, Record<string, string>>` dictionary keyed by dotted strings (e.g. `'hero.title'`). Components call `const { t } = useLang()` and `t('key')`. Lookup falls back pt → key-as-string, so a missing translation never throws. Some values embed `<strong>` tags parsed manually into JSX (see `About.tsx`'s `parseBold`).

**Content data separated from presentation**: `data/projects.tsx` and `data/skills.tsx` hold the editable arrays (project metadata, skill chip lists) that `components/Projects.tsx` and `components/Skills.tsx` render — edit content there, not in the components. Translation keys referenced by this data (`titleKey`, `descKey`, etc.) must be added to all three languages in `lib/i18n.ts`.

**Client vs. server components**: default is server components (`layout.tsx`, `page.tsx`, `Footer.tsx`). Anything with `useState`/`useEffect`/event listeners needs `'use client'`. Heavy browser-only pieces (Three.js intro, custom cursor, Lenis smooth scroll) are loaded through `components/ClientShell.tsx` via `next/dynamic` with `{ ssr: false }` — follow this pattern for any new component that touches `window`, WebGL, or other browser-only APIs.

**Animation**: Framer Motion throughout. Standard entrance pattern is `whileInView` + `viewport={{ once: true }}` with the ease-out-expo curve `[0.16, 1, 0.3, 1]`. Cursor-tracking effects (`Hero.tsx` orb, `Projects.tsx` 3D tilt, `CustomCursor.tsx`) use `useMotionValue`/`useSpring` instead of `useState` to update the DOM directly without re-renders.

**IntroOverlay** (`components/IntroOverlay.tsx`) is the most complex component: a one-time Three.js intro animation, skipped on repeat visits via `sessionStorage['g-intro-done']`, and skipped entirely on touch devices (CSS-only fallback) to avoid battery/perf issues. Three.js is dynamically `import()`ed so it never ships to devices that don't need it.

**Scroll**: `lib/lenis-instance.ts` holds a module-level singleton Lenis instance so only one smooth-scroll system exists; `components/SmoothScroll.tsx` creates/registers it and intercepts in-page anchor clicks, `components/BackTop.tsx` reads the singleton rather than creating a second Lenis. Disabled on mobile and under `prefers-reduced-motion`.

**Contact form / backend**: the only API route is `app/api/contact/route.ts` (Nodemailer over SMTP). Flow: in-memory per-IP rate limit (3 req/min, `Map`-based, resets on server restart) → honeypot field check (`website` filled = bot, silently rejected) → server-side validation/length limits → CRLF/HTML sanitization → send notification + confirmation email. `components/Contact.tsx` is the client side: client-side validation, loading/success/error states, `mailto:` fallback link if the API fails.

**Security headers**: `middleware.ts` generates a per-request CSP nonce (`strict-dynamic` script-src in production, relaxed for `next dev` hot-reload) and forwards it via `x-nonce`; `next.config.ts` sets the static security headers (`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, etc.) and long-lived cache headers for `/images/`, `/videos/`, and hashed `_next/static` assets.

## Conventions to follow when editing

- Add UI text only through `lib/i18n.ts` (all three languages: pt/en/es) — never hardcode user-facing strings in components.
- New images/videos actually served by the site go in `public/images/` or `public/videos/`; `fotosportfolio/` at the repo root is just an unprocessed asset staging area, not read by the app.
- Colors/spacing/radii should reference existing CSS variables in `globals.css` rather than introducing new literals.
- Path alias `@/*` maps to the `portfolio-next/` root (see `tsconfig.json`).
