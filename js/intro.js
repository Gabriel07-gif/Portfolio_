/**
 * intro.js — Animação de entrada v5 "OBSIDIAN"
 * Three.js r128
 *
 * Conceito: esfera escura com iluminação real (MeshPhong), sem AdditiveBlending
 * agressivo. Centro escuro maximiza contraste das palavras GABRIEL / RICARTE.
 *
 *  · Esfera central escura (MeshPhongMaterial) com specular verde
 *  · Shell icosaedro wireframe muito sutil (detalhe 0)
 *  · 5 anéis orbitais (LineLoop, standard blending)
 *  · Nuvem toroidal de partículas longe do centro (r ≈ 5–7)
 *  · Estrelas de fundo muito suaves
 *  · Luz de acento orbita a esfera lentamente
 */

'use strict';

(function initIntro() {

    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        overlay.remove(); return;
    }

    if (sessionStorage.getItem('g-intro-done')) {
        overlay.style.display = 'none'; return;
    }

    const canvas = document.getElementById('intro-canvas');
    if (!canvas || typeof THREE === 'undefined') {
        overlay.style.display = 'none'; return;
    }

    /* ═══════════════════════════════════════════════════════
       SETUP
    ═══════════════════════════════════════════════════════ */
    const W     = window.innerWidth;
    const H     = window.innerHeight;
    const isMob = W < 768;
    const DPR   = Math.min(window.devicePixelRatio, 2);

    const START_Z   = isMob ? 14 : 20;
    const TARGET_Z  = 7;
    const ENTRY_DUR = 2.6;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMob, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 120);
    camera.position.set(0, 0.3, START_Z);
    camera.lookAt(0, 0, 0);

    const G = new THREE.Group();
    scene.add(G);

    /* ═══════════════════════════════════════════════════════
       ILUMINAÇÃO — real 3-point lighting
    ═══════════════════════════════════════════════════════ */
    scene.add(new THREE.AmbientLight(0x080816, 3.5));

    const keyLight = new THREE.PointLight(0xffffff, 1.4, 45);
    keyLight.position.set(-5, 7, 11);
    scene.add(keyLight);

    /* accentLight orbita a esfera durante o loop */
    const accentLight = new THREE.PointLight(0x00ff88, 0.55, 22);
    accentLight.position.set(6, -3, 5);
    scene.add(accentLight);

    const rimLight = new THREE.PointLight(0x1133aa, 0.35, 30);
    rimLight.position.set(-7, 2, -9);
    scene.add(rimLight);

    /* ═══════════════════════════════════════════════════════
       1. ESFERA CENTRAL — dark metallic orb
       Phong com specular verde — specular highlight move com accentLight
    ═══════════════════════════════════════════════════════ */
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 64, 64),
        new THREE.MeshPhongMaterial({
            color:     0x050510,
            specular:  0x00cc66,
            shininess: 180,
            transparent: true,
            opacity:   0,
        })
    );
    G.add(sphere);

    /* ═══════════════════════════════════════════════════════
       2. SHELL — icosaedro wireframe muito sutil
    ═══════════════════════════════════════════════════════ */
    const shell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.55, 0),
        new THREE.MeshBasicMaterial({
            color: 0x00ff88, wireframe: true,
            transparent: true, opacity: 0,
        })
    );
    G.add(shell);

    /* ═══════════════════════════════════════════════════════
       3. ANÉIS ORBITAIS — LineLoop, standard blending
       5 anéis em planos diferentes, cores sutis
    ═══════════════════════════════════════════════════════ */
    function buildOrbit(radius) {
        const pts = [];
        for (let i = 0; i <= 128; i++) {
            const a = (i / 128) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
        }
        return new THREE.BufferGeometry().setFromPoints(pts);
    }

    const orbitDefs = [
        { r: 3.0, rX: 0.25,         rZ: 0.00,         col: 0x00ff88, tOp: 0.28, sp:  0.28 },
        { r: 3.9, rX: Math.PI / 2,  rZ: 0.35,         col: 0x00aaff, tOp: 0.20, sp: -0.19 },
        { r: 5.0, rX: 0.72,         rZ: 1.10,         col: 0x5533ff, tOp: 0.14, sp:  0.13 },
        { r: 6.1, rX: 1.45,         rZ: 0.65,         col: 0x0077cc, tOp: 0.10, sp: -0.08 },
        { r: 7.3, rX: 0.45,         rZ: 1.75,         col: 0x00ff88, tOp: 0.07, sp:  0.04 },
    ];

    const orbits = orbitDefs.map(d => {
        const mat  = new THREE.LineBasicMaterial({ color: d.col, transparent: true, opacity: 0 });
        const line = new THREE.LineLoop(buildOrbit(d.r), mat);
        line.rotation.x = d.rX;
        line.rotation.z = d.rZ;
        line.userData   = { sp: d.sp, tOp: d.tOp };
        G.add(line);
        return line;
    });

    /* ═══════════════════════════════════════════════════════
       4. PARTÍCULAS — distribuição toroidal longe do centro
       Raio principal: 4.8–7.3. Centro (onde está o texto) fica escuro.
    ═══════════════════════════════════════════════════════ */
    const NP    = isMob ? 500 : 1200;
    const pPos  = new Float32Array(NP * 3);
    const pCols = new Float32Array(NP * 3);

    for (let i = 0; i < NP; i++) {
        const u    = Math.random() * Math.PI * 2;
        const v    = Math.random() * Math.PI * 2;
        const R    = 4.8 + Math.random() * 2.5;
        const minR = 0.3 + Math.random() * 1.2;

        pPos[i * 3]     = (R + minR * Math.cos(v)) * Math.cos(u);
        pPos[i * 3 + 1] = minR * Math.sin(v) * 0.5;
        pPos[i * 3 + 2] = (R + minR * Math.cos(v)) * Math.sin(u);

        const t = Math.random();
        pCols[i * 3]     = 0;
        pCols[i * 3 + 1] = 0.45 + t * 0.55;
        pCols[i * 3 + 2] = t * 0.65;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos,  3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pCols, 3));

    const partMat = new THREE.PointsMaterial({
        size: isMob ? 0.038 : 0.022, vertexColors: true,
        transparent: true, opacity: 0,
        sizeAttenuation: true, depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, partMat);
    G.add(particles);

    /* ═══════════════════════════════════════════════════════
       5. ESTRELAS DE FUNDO — 700 pontos muito suaves
    ═══════════════════════════════════════════════════════ */
    const NS   = isMob ? 280 : 700;
    const sPos = new Float32Array(NS * 3);

    for (let i = 0; i < NS; i++) {
        const r  = 16 + Math.random() * 28;
        const u  = Math.random() * Math.PI * 2;
        const v  = Math.acos(2 * Math.random() - 1);
        sPos[i * 3]     = r * Math.sin(v) * Math.cos(u);
        sPos[i * 3 + 1] = r * Math.sin(v) * Math.sin(u);
        sPos[i * 3 + 2] = r * Math.cos(v);
    }

    const sGeo   = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));

    const starMat = new THREE.PointsMaterial({
        color: 0x88aadd, size: 0.06, transparent: true, opacity: 0,
        sizeAttenuation: true, depthWrite: false,
    });
    const stars = new THREE.Points(sGeo, starMat);
    scene.add(stars);  /* não entra no grupo G */

    /* ═══════════════════════════════════════════════════════
       RASTREAMENTO DO MOUSE
    ═══════════════════════════════════════════════════════ */
    let mX = 0, mY = 0;
    if (!isMob) {
        overlay.addEventListener('mousemove', e => {
            mX = (e.clientX / window.innerWidth  - 0.5) * 2;
            mY = (e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });
    }

    /* ═══════════════════════════════════════════════════════
       LOOP DE ANIMAÇÃO
    ═══════════════════════════════════════════════════════ */
    let rafId;
    const t0        = performance.now();
    let   isExiting = false;
    let   exitProg  = 0;

    function animate(now) {
        rafId = requestAnimationFrame(animate);
        const t = (now - t0) * 0.001;

        const entryRaw  = Math.min(t / ENTRY_DUR, 1);
        const entryEase = 1 - Math.pow(1 - entryRaw, 3);

        /* — câmera voa para dentro — */
        if (!isExiting) {
            camera.position.z = START_Z + (TARGET_Z - START_Z) * entryEase
                              + Math.sin(t * 0.06) * 0.22;
            camera.position.x = Math.sin(t * 0.05) * 0.15;
            camera.position.y = 0.3 + Math.sin(t * 0.08) * 0.18;
        }
        camera.lookAt(0, 0, 0);

        /* — paralaxe de mouse — */
        if (!isMob) {
            G.rotation.y += (mX * 0.14 - G.rotation.y) * 0.026;
            G.rotation.x += (mY * 0.09 - G.rotation.x) * 0.026;
        }

        /* — esfera — */
        sphere.rotation.y = t * 0.06;
        sphere.rotation.z = t * 0.02;
        sphere.material.opacity = Math.min(entryEase * 2.0, 0.96);

        /* — shell — */
        shell.rotation.x = t * 0.04;
        shell.rotation.y = t * 0.07;
        shell.rotation.z = t * 0.03;
        shell.material.opacity = Math.min(entryEase * 1.4, 0.09);

        /* — anéis orbitais — */
        orbits.forEach(line => {
            line.rotation.z += line.userData.sp * 0.009;
            line.material.opacity = Math.min(entryEase * 1.5, line.userData.tOp);
        });

        /* — partículas — */
        particles.rotation.y = t * 0.020;
        particles.rotation.x = t * 0.006;
        partMat.opacity = Math.min(entryEase * 1.3, 0.28);

        /* — estrelas — */
        stars.rotation.y = t * 0.002;
        starMat.opacity  = Math.min(entryEase * 1.1, 0.16);

        /* — accentLight orbita a esfera — */
        accentLight.position.x = Math.cos(t * 0.20) * 6.5;
        accentLight.position.z = Math.sin(t * 0.20) * 5.5 + 2;
        accentLight.position.y = Math.sin(t * 0.12) * 3;

        /* ── SAÍDA — fade simples ── */
        if (isExiting) {
            exitProg = Math.min(exitProg + 0.018, 1);
            const ease = exitProg * exitProg;

            sphere.material.opacity  = 0.96 * (1 - ease);
            shell.material.opacity   = 0.09 * (1 - ease);
            partMat.opacity          = 0.28 * (1 - ease);
            starMat.opacity          = 0.16 * (1 - ease);
            orbits.forEach(l => { l.material.opacity = l.userData.tOp * (1 - ease); });

            if (exitProg >= 1) {
                cancelAnimationFrame(rafId);
                overlay.classList.add('intro-leaving');
                setTimeout(() => {
                    overlay.remove();
                    sessionStorage.setItem('g-intro-done', '1');
                }, 900);
                return;
            }
        }

        renderer.render(scene, camera);
    }
    animate(t0);

    /* ═══════════════════════════════════════════════════════
       ANIMAÇÃO DO TEXTO — GABRIEL (branco) + RICARTE (verde)
    ═══════════════════════════════════════════════════════ */

    /* ── 1ª linha: GABRIEL cai do topo, letra a letra ── */
    const firstEl = overlay.querySelector('.intro-name-first');
    if (firstEl) {
        const txt = firstEl.textContent.trim();
        firstEl.innerHTML = '';
        firstEl.setAttribute('aria-label', txt);
        [...txt].forEach((ch, i) => {
            const sp = document.createElement('span');
            sp.className   = 'intro-ltr';
            sp.textContent = ch === ' ' ? ' ' : ch;
            sp.style.animationDelay = `${0.65 + i * 0.075}s`;
            firstEl.appendChild(sp);
        });
    }

    /* ── 2ª linha: RICARTE sobe de baixo em verde ── */
    const lastEl = overlay.querySelector('.intro-name-last');
    if (lastEl) {
        const txt = lastEl.textContent.trim();
        lastEl.innerHTML = '';
        lastEl.setAttribute('aria-label', txt);
        [...txt].forEach((ch, i) => {
            const sp = document.createElement('span');
            sp.className   = 'intro-ltr-up';
            sp.textContent = ch === ' ' ? ' ' : ch;
            sp.style.animationDelay = `${1.7 + i * 0.09}s`;
            lastEl.appendChild(sp);
        });
        /* RICARTE = 7 chars: última ≈ 2.24s + 0.65s ≈ 2.9s */
        const glowAt = Math.round((1.7 + 6 * 0.09 + 0.65) * 1000);
        setTimeout(() => lastEl.classList.add('intro-name-last--glow'), glowAt);
    }

    /* ═══════════════════════════════════════════════════════
       BARRA DE PROGRESSO + CONTADOR PERCENTUAL
    ═══════════════════════════════════════════════════════ */
    const TOTAL_MS = 6000;
    const barFill  = overlay.querySelector('.intro-bar-fill');
    if (barFill) {
        barFill.style.transition = `width ${TOTAL_MS}ms linear`;
        requestAnimationFrame(() => { barFill.style.width = '100%'; });
    }

    const percentEl = document.getElementById('introPercent');
    if (percentEl) {
        const t0pct    = Date.now();
        const pctTimer = setInterval(() => {
            const pct = Math.min(Math.round(((Date.now() - t0pct) / TOTAL_MS) * 100), 100);
            percentEl.textContent = pct;
            if (pct >= 100) clearInterval(pctTimer);
        }, 40);
    }

    /* ═══════════════════════════════════════════════════════
       ENCERRAMENTO
    ═══════════════════════════════════════════════════════ */
    let dismissed = false;

    function dismiss() {
        if (dismissed) return;
        dismissed = true;
        clearTimeout(autoTimer);

        const content = overlay.querySelector('.intro-content');
        const bar     = overlay.querySelector('.intro-bar-wrap');
        const pct     = overlay.querySelector('.intro-percent-wrap');
        if (content) { content.style.transition = 'opacity 0.35s ease'; content.style.opacity = '0'; }
        if (bar)     { bar.style.transition     = 'opacity 0.35s ease'; bar.style.opacity     = '0'; }
        if (pct)     { pct.style.transition     = 'opacity 0.35s ease'; pct.style.opacity     = '0'; }

        isExiting = true;
    }

    const autoTimer = setTimeout(dismiss, TOTAL_MS);

    overlay.addEventListener('click', dismiss, { once: true });
    document.addEventListener('keydown', function onKey(e) {
        if (['Escape', 'Enter', ' '].includes(e.key)) {
            document.removeEventListener('keydown', onKey);
            dismiss();
        }
    });

    window.addEventListener('resize', () => {
        const nW = window.innerWidth, nH = window.innerHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
    }, { passive: true });

})();
