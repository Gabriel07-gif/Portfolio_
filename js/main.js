/**
 * main.js — Portfolio de Gabriel
 * Scroll nativo do browser (GPU-acelerado).
 * Canvas limitado a 30fps com pausa automática.
 */

'use strict';

/* ─────────────────────────────────────────────
   UTILITÁRIOS GLOBAIS
───────────────────────────────────────────── */
const htmlEl     = document.documentElement;
const isMobile   = window.matchMedia('(pointer: coarse)').matches;
const prefersRed = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDark     = () => htmlEl.getAttribute('data-theme') !== 'light';

function debounce(fn, ms = 150) {
    let id;
    return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), ms); };
}

/* ─────────────────────────────────────────────
   1. TEMA CLARO / ESCURO
───────────────────────────────────────────── */
(function initTheme() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const next = isDark() ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
})();

/* ─────────────────────────────────────────────
   2. MENU MOBILE
───────────────────────────────────────────── */
(function initMobileMenu() {
    const btn   = document.getElementById('menuToggle');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        btn.classList.toggle('active');
        btn.setAttribute('aria-expanded', String(open));
    });

    links.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
            links.classList.remove('open');
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
        })
    );
})();

/* ─────────────────────────────────────────────
   3. NAVBAR + PROGRESSO + BACK-TO-TOP
   Scroll nativo — sem biblioteca JS no caminho
───────────────────────────────────────────── */
(function initNavbar() {
    const navbar  = document.getElementById('navbar');
    const prog    = document.getElementById('scrollProgress');
    const backTop = document.getElementById('backTop');
    if (!navbar) return;

    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y   = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            navbar.classList.toggle('scrolled', y > 60);
            if (backTop) backTop.classList.toggle('visible', y > 500);
            if (prog)    prog.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    if (backTop) {
        backTop.addEventListener('click', () =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
        );
    }
})();

/* ─────────────────────────────────────────────
   4. CANVAS — REDE DE PARTÍCULAS
   · 30 fps cap (não 60) via timestamp delta
   · Pausa quando aba está em background
   · Strokes agrupados em 1 path (muito mais rápido)
   · Menos partículas: 45 desktop / 20 mobile
───────────────────────────────────────────── */
(function initCanvas() {
    if (prefersRed) return;

    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const ctx      = canvas.getContext('2d', { alpha: true });
    const N        = isMobile ? 20 : 45;
    const MAX_DIST = isMobile ? 80 : 110;
    const FPS      = 30;
    const INTERVAL = 1000 / FPS;
    let W, H, lastTime = 0, rafId = null;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', debounce(resize, 200), { passive: true });

    const pts = Array.from({ length: N }, () => ({
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r:  Math.random() * 1.4 + 0.5,
    }));

    let mx = -9999, my = -9999;
    let col = isDark() ? '0,200,110' : '5,150,105';

    new MutationObserver(() => {
        col = isDark() ? '0,255,136' : '5,150,105';
    }).observe(htmlEl, { attributes: true, attributeFilter: ['data-theme'] });

    window.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
    }, { passive: true });

    /* Pausa quando aba fica em background */
    function pause()  { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }
    function resume() { if (!rafId) rafId = requestAnimationFrame(frame); }
    document.addEventListener('visibilitychange', () =>
        document.hidden ? pause() : resume()
    );

    function frame(ts) {
        rafId = requestAnimationFrame(frame);

        /* Cap de 30fps: ignora frames muito próximos */
        const delta = ts - lastTime;
        if (delta < INTERVAL) return;
        lastTime = ts - (delta % INTERVAL);

        ctx.clearRect(0, 0, W, H);
        const fillCol = `rgba(${col},.28)`;

        /* — Partículas — */
        ctx.fillStyle = fillCol;
        for (let i = 0; i < N; i++) {
            const p = pts[i];
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            /* Repulsão do cursor (só desktop) */
            if (!isMobile) {
                const dx = p.x - mx, dy = p.y - my;
                const d2 = dx * dx + dy * dy;
                if (d2 < 8000 && d2 > 0) {
                    const inv = 1.5 / Math.sqrt(d2);
                    p.x += dx * inv; p.y += dy * inv;
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 6.2832);
            ctx.fill();
        }

        /* — Linhas: 1 path por opacidade (muito mais eficiente) — */
        const STEPS = 5;
        for (let s = 1; s <= STEPS; s++) {
            const alphaMin = (s - 1) / STEPS;
            const alphaMax = s / STEPS;
            const alpha    = (alphaMin + alphaMax) / 2 * 0.10;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${col},${alpha.toFixed(3)})`;
            ctx.lineWidth   = 0.6;

            for (let i = 0; i < N - 1; i++) {
                for (let j = i + 1; j < N; j++) {
                    const dx = pts[i].x - pts[j].x;
                    const dy = pts[i].y - pts[j].y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 > MAX_DIST * MAX_DIST) continue;
                    const ratio = 1 - Math.sqrt(d2) / MAX_DIST;
                    if (ratio >= alphaMin && ratio < alphaMax) {
                        ctx.moveTo(pts[i].x, pts[i].y);
                        ctx.lineTo(pts[j].x, pts[j].y);
                    }
                }
            }
            ctx.stroke();
        }
    }

    rafId = requestAnimationFrame(frame);
})();

/* ─────────────────────────────────────────────
   5. TYPEWRITER — compatível com i18n
───────────────────────────────────────────── */
(function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    let roles = ['Web Full-Stack', 'Frontend Dev', 'Criador de UIs', 'Apaixonado por Código'];
    let ri = 0, ci = 0, deleting = false;
    let timerId = null;

    function tick() {
        const word = roles[ri];
        ci = deleting ? ci - 1 : ci + 1;
        el.textContent = word.slice(0, ci);

        if (!deleting && ci === word.length) { deleting = true; timerId = setTimeout(tick, 2200); return; }
        if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
        timerId = setTimeout(tick, deleting ? 52 : 108);
    }
    timerId = setTimeout(tick, 1800);

    /* Exposto para o i18n atualizar as palavras ao trocar de idioma */
    window.__setTypewriterWords = function (newWords) {
        if (!newWords || !newWords.length) return;
        roles = newWords;
        ri = 0; ci = 0; deleting = false;
        if (timerId) clearTimeout(timerId);
        el.textContent = '';
        timerId = setTimeout(tick, 250);
    };
})();

/* ─────────────────────────────────────────────
   6. SPLIT HERO NAME — letra por letra
───────────────────────────────────────────── */
(function splitHeroName() {
    const nameEl = document.getElementById('heroName');
    if (!nameEl) return;

    const text = 'Gabriel';
    const dot  = nameEl.querySelector('.hero-dot');
    nameEl.innerHTML = '';

    text.split('').forEach((c, i) => {
        const s = document.createElement('span');
        s.className   = 'hero-char';
        s.textContent = c;
        s.style.setProperty('--i', i);
        nameEl.appendChild(s);
    });

    if (dot) nameEl.appendChild(dot);
})();

/* ─────────────────────────────────────────────
   7. GSAP — HERO TIMELINE + CONTADORES
───────────────────────────────────────────── */
(function initHeroGSAP() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    if (prefersRed) {
        gsap.set(['.hero-content > *', '.hero-visual', '.hero-char', '.hero-dot'], { opacity: 1 });
        return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });

    tl.fromTo('.hero-greeting',
        { opacity: 0, y: -24, rotateX: 18, transformPerspective: 900 },
        { opacity: 1, y: 0,   rotateX: 0,  duration: 0.6 })

    .fromTo('.hero-char',
        { opacity: 0, y: -60, rotateX: 90, transformPerspective: 600 },
        { opacity: 1, y: 0,   rotateX: 0,  duration: 0.5, ease: 'back.out(1.7)',
          stagger: 0.06, clearProps: 'rotateX,transformPerspective' }, '-=0.3')

    .fromTo('.hero-dot',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' }, '-=0.05')

    .fromTo('.hero-role',
        { opacity: 0, y: -22, rotateX: 15, transformPerspective: 900 },
        { opacity: 1, y: 0,   rotateX: 0,  duration: 0.55 }, '-=0.18')

    .fromTo('.hero-desc',
        { opacity: 0, y: -18 },
        { opacity: 1, y: 0,   duration: 0.5 }, '-=0.3')

    .fromTo('.hero-buttons',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0,   duration: 0.45 }, '-=0.25')

    .fromTo('.hero-stats',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0,   duration: 0.45 }, '-=0.18')

    .fromTo('.hero-visual',
        isMobile
            ? { opacity: 0, y: 36 }
            : { opacity: 0, x: 80, rotateY: -24, transformPerspective: 900 },
        isMobile
            ? { opacity: 1, y: 0,  duration: 0.75 }
            : { opacity: 1, x: 0,  rotateY: 0,   duration: 0.95 },
        '-=0.9');

    tl.add(() => {
        document.querySelectorAll('.hero-stats [data-count]').forEach(el => {
            const end = +el.getAttribute('data-count');
            const obj = { n: 0 };
            gsap.to(obj, { n: end, duration: 1.4, ease: 'power2.out',
                onUpdate() { el.textContent = Math.round(obj.n); } });
        });
    }, '-=0.3');
})();

/* ─────────────────────────────────────────────
   8. GSAP — SCROLL REVEALS
───────────────────────────────────────────── */
(function initScrollReveals() {
    if (typeof gsap === 'undefined' || prefersRed) return;

    gsap.utils.toArray('.js-reveal').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 48, rotateX: 10, transformPerspective: 800 },
            { opacity: 1, y: 0,  rotateX: 0,  duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });

    gsap.fromTo('.js-reveal-left',
        { opacity: 0, x: -60, rotateY: 12, transformPerspective: 800 },
        { opacity: 1, x: 0,   rotateY: 0,  duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-grid', start: 'top 82%', once: true } });

    gsap.fromTo('.js-reveal-right',
        { opacity: 0, x: 60,  rotateY: -12, transformPerspective: 800 },
        { opacity: 1, x: 0,   rotateY: 0,   duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-grid', start: 'top 82%', once: true } });

    gsap.utils.toArray('.js-reveal-up').forEach((el, i) => {
        gsap.fromTo(el,
            { opacity: 0, y: 48 },
            { opacity: 1, y: 0,  duration: 0.6, ease: 'power3.out',
              delay: i * 0.06,
              scrollTrigger: { trigger: '.redes', start: 'top 88%', once: true } });
    });

    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.97 },
            { opacity: 1, y: 0,  scale: 1,    duration: 0.75, ease: 'power3.out',
              delay: i * 0.1,
              scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
    });

    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 55 },
            { opacity: 1, y: 0,  duration: 0.8, ease: 'power3.out',
              delay: i * 0.12,
              scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
    });

    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0,  duration: 0.65, ease: 'power3.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: card, start: 'top 90%', once: true } });
    });

    /* Skill bars */
    document.querySelectorAll('.skill-fill').forEach(fill => {
        const w = getComputedStyle(fill).getPropertyValue('--w').trim();
        gsap.to(fill, { width: w, duration: 1.4, ease: 'power2.out',
            scrollTrigger: { trigger: fill, start: 'top 90%', once: true } });
    });

    /* Contadores about */
    document.querySelectorAll('.about-stats [data-count]').forEach(el => {
        const end = +el.getAttribute('data-count');
        const obj = { n: 0 };
        gsap.to(obj, { n: end, duration: 1.6, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(obj.n); },
            scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
})();

/* ─────────────────────────────────────────────
   9. VANILLA TILT — cards 3D (só desktop)
───────────────────────────────────────────── */
(function initTilt() {
    if (isMobile || typeof VanillaTilt === 'undefined') return;
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
        max: 6, speed: 500, glare: true, 'max-glare': 0.08, perspective: 1000
    });
})();

/* ─────────────────────────────────────────────
   10. BOTÕES MAGNÉTICOS (só desktop)
───────────────────────────────────────────── */
(function initMagnetic() {
    if (isMobile || typeof gsap === 'undefined') return;

    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            gsap.to(btn, {
                x: (e.clientX - r.left - r.width  / 2) * 0.2,
                y: (e.clientY - r.top  - r.height / 2) * 0.2,
                duration: 0.35, ease: 'power2.out', overwrite: true
            });
        }, { passive: true });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.7,
                ease: 'elastic.out(1, 0.45)', overwrite: true });
        });
    });
})();

/* ─────────────────────────────────────────────
   11. ORBE DO HERO (só desktop)
───────────────────────────────────────────── */
(function initHeroOrb() {
    if (isMobile || typeof gsap === 'undefined') return;

    const hero = document.querySelector('.hero');
    const orb  = document.getElementById('heroOrb');
    if (!hero || !orb) return;

    hero.addEventListener('mousemove', e => {
        const r = hero.getBoundingClientRect();
        gsap.to(orb, {
            x: e.clientX - r.left - orb.offsetWidth  / 2,
            y: e.clientY - r.top  - orb.offsetHeight / 2,
            duration: 1.5, ease: 'power2.out', overwrite: true
        });
    }, { passive: true });
})();

/* ─────────────────────────────────────────────
   12. NAV ATIVO + SIDE DOTS
───────────────────────────────────────────── */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navAs    = document.querySelectorAll('.nav-links a');
    const sideAs   = document.querySelectorAll('.side-dot');
    if (!sections.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const id = e.target.id;
            navAs.forEach(a  => a.classList.toggle('active',  a.getAttribute('href') === `#${id}`));
            sideAs.forEach(d => d.classList.toggle('active', d.getAttribute('href') === `#${id}`));
        });
    }, { threshold: 0.4 });

    sections.forEach(s => obs.observe(s));
})();

/* ─────────────────────────────────────────────
   13. GLITCH / SCRAMBLE no hover do nome (desktop)
───────────────────────────────────────────── */
(function initGlitch() {
    if (isMobile) return;

    const nameEl  = document.getElementById('heroName');
    if (!nameEl) return;

    const charset  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    const original = 'Gabriel';
    let busy = false;

    nameEl.addEventListener('mouseenter', () => {
        if (busy) return;
        busy = true;
        const spans = nameEl.querySelectorAll('.hero-char');
        let frame = 0;
        const total = 18;

        const iv = setInterval(() => {
            spans.forEach((span, i) => {
                if (frame > i * (total / original.length)) {
                    span.textContent = original[i];
                    span.classList.remove('glitch-char');
                } else {
                    span.textContent = charset[Math.floor(Math.random() * charset.length)];
                    span.classList.add('glitch-char');
                }
            });
            if (++frame > total + 4) {
                spans.forEach((s, i) => { s.textContent = original[i]; s.classList.remove('glitch-char'); });
                clearInterval(iv);
                busy = false;
            }
        }, 40);
    });
})();

/* ─────────────────────────────────────────────
   14. CURSOR PERSONALIZADO (só desktop)
   Dot preciso + anel com lerp suave
───────────────────────────────────────────── */
(function initCursor() {
    if (isMobile) return;

    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let visible = false;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        if (!visible) {
            dot.style.opacity  = '1';
            ring.style.opacity = '1';
            visible = true;
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity  = '0';
        ring.style.opacity = '0';
        visible = false;
    });

    /* Hover em elementos clicáveis → anel maior */
    const CLICKABLE = 'a, button, .lang-option, .side-dot, .skill-card, .redes li, .project-card';
    document.querySelectorAll(CLICKABLE).forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
    });

    /* Click → pulso no anel */
    document.addEventListener('mousedown', () => {
        ring.classList.add('cursor-click');
        dot.style.transform = 'translate(-50%, -50%) scale(1.8)';
    });
    document.addEventListener('mouseup', () => {
        ring.classList.remove('cursor-click');
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    /* Loop com interpolação (lerp) para suavidade */
    (function loop() {
        requestAnimationFrame(loop);
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        dot.style.transform  = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    })();
})();

/* ─────────────────────────────────────────────
   16. CARD GLOW — rastreia o mouse (só desktop)
   Atualiza CSS custom properties --mouse-x/y
───────────────────────────────────────────── */
(function initCardGlow() {
    if (isMobile) return;

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', (e.clientX - r.left) + 'px');
            card.style.setProperty('--mouse-y', (e.clientY - r.top)  + 'px');
        }, { passive: true });
    });
})();

/* ─────────────────────────────────────────────
   18. FORMULÁRIO DE CONTATO
   · Floating labels (CSS cuida da animação)
   · Validação campo a campo no blur/input
   · Submit: abre mailto como fallback
───────────────────────────────────────────── */
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    /* Valida um único .form-group */
    function validateGroup(group) {
        const input = group.querySelector('input, textarea');
        if (!input) return true;
        const ok = input.checkValidity() && input.value.trim() !== '';
        group.classList.toggle('invalid', !ok);
        return ok;
    }

    /* Validação lazy: só dispara após o primeiro blur */
    form.querySelectorAll('.form-group').forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input) return;
        input.addEventListener('blur', () => validateGroup(group));
        input.addEventListener('input', () => {
            if (group.classList.contains('invalid')) validateGroup(group);
        });
    });

    form.addEventListener('submit', e => {
        e.preventDefault();

        /* Valida todos os campos */
        const groups   = [...form.querySelectorAll('.form-group')];
        const allValid = groups.every(g => validateGroup(g));
        if (!allValid) {
            const first = form.querySelector('.form-group.invalid input, .form-group.invalid textarea');
            if (first) first.focus();
            return;
        }

        const btn   = form.querySelector('.form-submit-btn');
        const label = form.querySelector('.submit-label');
        const name  = form.querySelector('#formName').value.trim();
        const email = form.querySelector('#formEmail').value.trim();
        const msg   = form.querySelector('#formMsg').value.trim();

        /* Estado de loading */
        const originalText = label.textContent;
        label.textContent  = '...';
        btn.classList.add('loading');
        btn.disabled = true;

        setTimeout(() => {
            /* Estado de sucesso */
            btn.classList.remove('loading');
            btn.classList.add('success');
            label.textContent = '✓ Enviado!';

            /* Toast de confirmação */
            const toast = document.getElementById('langToast');
            if (toast) {
                toast.textContent = '✅ Mensagem enviada com sucesso!';
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
            }

            /* Abre o cliente de e-mail como fallback */
            const subject = encodeURIComponent('Contato via Portfolio — ' + name);
            const body    = encodeURIComponent(msg + '\n\nDe: ' + name + ' <' + email + '>');
            window.location.href = 'mailto:seuemail@gmail.com?subject=' + subject + '&body=' + body;

            /* Reseta o formulário */
            form.reset();
            groups.forEach(g => g.classList.remove('invalid'));

            setTimeout(() => {
                btn.classList.remove('success');
                btn.disabled      = false;
                label.textContent = originalText;
            }, 2800);
        }, 900);
    });
})();

/* ─────────────────────────────────────────────
   17. REDES SOCIAIS — rotação 3D no hover
───────────────────────────────────────────── */
(function initRedesHover() {
    if (isMobile || typeof gsap === 'undefined') return;

    document.querySelectorAll('.redes li').forEach(li => {
        li.addEventListener('mouseenter', () => {
            gsap.to(li, { scale: 1.05, duration: 0.3, ease: 'power2.out', overwrite: true });
        });
        li.addEventListener('mouseleave', () => {
            gsap.to(li, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)', overwrite: true });
        });
    });
})();
