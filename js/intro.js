/**
 * intro.js — Animação 3D premium de entrada
 * Three.js r128
 *
 * Componentes:
 *  · Glow volumétrico em camadas (núcleo luminoso)
 *  · 3 anéis giroscópio internos (rápidos, opostos)
 *  · Icosaedro wireframe + pontos nos vértices
 *  · 3 anéis orbitais externos
 *  · Galáxia espiral (disco de partículas 3-braços)
 *  · Nuvem halo envolvente
 *  · Câmera com movimento sutil (oscilação senoidal)
 *  · Interação com mouse (o grupo inteiro reage)
 *  · Implosão de partículas na saída
 *  · Flash de glow no nome após todas as letras aparecerem
 */

'use strict';

(function initIntro() {

    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    /* Acessibilidade: sem animação se o usuário preferir */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        overlay.remove(); return;
    }

    /* Não repete na mesma sessão */
    if (sessionStorage.getItem('g-intro-done')) {
        overlay.style.display = 'none'; return;
    }

    const canvas = document.getElementById('intro-canvas');
    if (!canvas || typeof THREE === 'undefined') {
        overlay.style.display = 'none'; return;
    }

    /* ═══════════════════════════════════════════════════════
       SETUP BÁSICO
    ═══════════════════════════════════════════════════════ */
    const W      = window.innerWidth;
    const H      = window.innerHeight;
    const isMob  = W < 768;
    const DPR    = Math.min(window.devicePixelRatio, 2);

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(54, W / H, 0.1, 200);
    camera.position.set(0, 0.6, 7.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMob, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor(0x000000, 0);

    /* ── GRUPO PRINCIPAL (recebe rotação do mouse) ── */
    const G = new THREE.Group();
    scene.add(G);

    /* ═══════════════════════════════════════════════════════
       1. GLOW VOLUMÉTRICO — camadas de esferas transparentes
    ═══════════════════════════════════════════════════════ */
    const glowGroup = new THREE.Group();
    G.add(glowGroup);

    [
        { r: 0.18, op: 0.28, col: 0x00ffaa },
        { r: 0.40, op: 0.16, col: 0x00ff88 },
        { r: 0.75, op: 0.09, col: 0x22cc88 },
        { r: 1.20, op: 0.05, col: 0x0088ff },
        { r: 1.80, op: 0.025, col: 0x0044cc },
        { r: 2.60, op: 0.012, col: 0x220044 },
    ].forEach(d => {
        const m = new THREE.Mesh(
            new THREE.SphereGeometry(d.r, 16, 16),
            new THREE.MeshBasicMaterial({ color: d.col, transparent: true, opacity: d.op })
        );
        glowGroup.add(m);
    });

    /* ═══════════════════════════════════════════════════════
       2. ANÉIS GIROSCÓPIO — 3 planos ortogonais, rápidos
    ═══════════════════════════════════════════════════════ */
    const gyroData = [
        { rX: 0,           rZ: 0,           col: 0x00ff88, sp:  2.2, tube: 0.013 },
        { rX: Math.PI / 2, rZ: 0,           col: 0x00ccff, sp: -1.8, tube: 0.011 },
        { rX: Math.PI / 4, rZ: Math.PI / 3, col: 0x9955ff, sp:  1.5, tube: 0.009 },
    ];
    const gyroMeshes = gyroData.map(d => {
        const m = new THREE.Mesh(
            new THREE.TorusGeometry(0.78, d.tube, 8, 72),
            new THREE.MeshBasicMaterial({ color: d.col, transparent: true, opacity: 0.88 })
        );
        m.rotation.x = d.rX;
        m.rotation.z = d.rZ;
        m.userData.sp = d.sp;
        G.add(m);
        return m;
    });

    /* ═══════════════════════════════════════════════════════
       3. ICOSAEDRO WIREFRAME + PONTOS NOS VÉRTICES
    ═══════════════════════════════════════════════════════ */
    const icoGeo = new THREE.IcosahedronGeometry(1.9, 1);

    const icoMat = new THREE.LineBasicMaterial({
        color: 0x00ff88, transparent: true, opacity: 0.16
    });
    const icoMesh = new THREE.LineSegments(
        new THREE.WireframeGeometry(icoGeo), icoMat
    );
    G.add(icoMesh);

    /* Pontos brilhantes em cada vértice */
    const vGeo = new THREE.BufferGeometry();
    vGeo.setAttribute('position', icoGeo.attributes.position.clone());
    G.add(new THREE.Points(
        vGeo,
        new THREE.PointsMaterial({
            color: 0x88ffcc, size: 0.09,
            sizeAttenuation: true, transparent: true, opacity: 0.95
        })
    ));

    /* ═══════════════════════════════════════════════════════
       4. ANÉIS ORBITAIS EXTERNOS
    ═══════════════════════════════════════════════════════ */
    const outerRings = [
        { r: 2.7, tube: 0.007, col: 0x00ff88, rX: 1.2, rZ: 0.3, sp:  0.22 },
        { r: 3.6, tube: 0.005, col: 0x00aaff, rX: 0.4, rZ: 1.1, sp: -0.16 },
        { r: 4.5, tube: 0.004, col: 0x8833ff, rX: 1.9, rZ: 0.8, sp:  0.11 },
    ].map(d => {
        const m = new THREE.Mesh(
            new THREE.TorusGeometry(d.r, d.tube, 8, 160),
            new THREE.MeshBasicMaterial({ color: d.col, transparent: true, opacity: 0.50 })
        );
        m.rotation.x = d.rX;
        m.rotation.z = d.rZ;
        m.userData.sp = d.sp;
        G.add(m);
        return m;
    });

    /* ═══════════════════════════════════════════════════════
       5. GALÁXIA ESPIRAL — disco com 3 braços
    ═══════════════════════════════════════════════════════ */
    const NG       = isMob ? 900 : 2400;
    const gPos     = new Float32Array(NG * 3);
    const gOrigPos = new Float32Array(NG * 3);
    const gCols    = new Float32Array(NG * 3);

    for (let i = 0; i < NG; i++) {
        const arm   = Math.floor(Math.random() * 3);
        const off   = (arm * Math.PI * 2) / 3;
        const r     = 1.8 + Math.random() * 5.2;
        const theta = off + r * 0.60 + (Math.random() - 0.5) * 0.9;
        const h     = (Math.random() - 0.5) * (0.15 + r * 0.055);

        const x = r * Math.cos(theta);
        const y = h;
        const z = r * Math.sin(theta);

        gPos[i * 3] = gOrigPos[i * 3] = x;
        gPos[i * 3 + 1] = gOrigPos[i * 3 + 1] = y;
        gPos[i * 3 + 2] = gOrigPos[i * 3 + 2] = z;

        /* Cor: centro branco-verde → borda azul-roxo */
        const t = Math.min(r / 7, 1);
        gCols[i * 3]     = t * 0.35;
        gCols[i * 3 + 1] = 1 - t * 0.35;
        gCols[i * 3 + 2] = t * 0.95;
    }

    const galaxyGeo = new THREE.BufferGeometry();
    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
    galaxyGeo.setAttribute('color',    new THREE.BufferAttribute(gCols, 3));

    const galaxyMat = new THREE.PointsMaterial({
        size: isMob ? 0.030 : 0.022,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
    });
    const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
    galaxy.rotation.x = 0.44;
    galaxy.rotation.z = 0.20;
    G.add(galaxy);

    /* ═══════════════════════════════════════════════════════
       6. NUVEM HALO — partículas esféricas ao redor
    ═══════════════════════════════════════════════════════ */
    const NH   = isMob ? 120 : 350;
    const hPos  = new Float32Array(NH * 3);
    const hCols = new Float32Array(NH * 3);
    for (let i = 0; i < NH; i++) {
        const u = Math.random(), v = Math.random();
        const th = 2 * Math.PI * u;
        const ph = Math.acos(2 * v - 1);
        const r  = 6.0 + Math.random() * 4.0;
        hPos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
        hPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        hPos[i * 3 + 2] = r * Math.cos(ph);
        const t = Math.random();
        hCols[i * 3]     = t * 0.25;
        hCols[i * 3 + 1] = 0.55 + t * 0.45;
        hCols[i * 3 + 2] = t * 0.85;
    }
    const hGeo = new THREE.BufferGeometry();
    hGeo.setAttribute('position', new THREE.BufferAttribute(hPos, 3));
    hGeo.setAttribute('color',    new THREE.BufferAttribute(hCols, 3));
    const halo = new THREE.Points(
        hGeo,
        new THREE.PointsMaterial({ size: 0.014, vertexColors: true, transparent: true, opacity: 0.50, sizeAttenuation: true })
    );
    G.add(halo);

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
    const t0          = performance.now();
    let   isExiting   = false;
    let   exitProg    = 0;
    const GAL_ATTR    = galaxyGeo.attributes.position;

    function animate(now) {
        rafId = requestAnimationFrame(animate);
        const t = (now - t0) * 0.001;

        /* ── Câmera: oscilação senoidal sutil ── */
        camera.position.x = Math.sin(t * 0.08)  * 0.28;
        camera.position.y = 0.6 + Math.sin(t * 0.12) * 0.38;
        camera.position.z = 7.2 + Math.sin(t * 0.07) * 0.35;
        camera.lookAt(0, 0, 0);

        /* ── Rotação pelo mouse (lerp suave) ── */
        if (!isMob) {
            G.rotation.y += (mX * 0.20 - G.rotation.y) * 0.035;
            G.rotation.x += (mY * 0.14 - G.rotation.x) * 0.035;
        }

        /* ── Giroscópio interno ── */
        gyroMeshes.forEach(m => { m.rotation.y += m.userData.sp * 0.014; });

        /* ── Icosaedro ── */
        icoMesh.rotation.x = t * 0.14;
        icoMesh.rotation.y = t * 0.22;
        icoMat.opacity = 0.10 + Math.sin(t * 2.0) * 0.07;

        /* ── Anéis externos ── */
        outerRings.forEach(m => { m.rotation.y += m.userData.sp * 0.014; });

        /* ── Glow pulsante (escala) ── */
        if (!isExiting) {
            const pulse = 0.88 + Math.sin(t * 2.4) * 0.12;
            glowGroup.scale.setScalar(pulse);
        }

        /* ── Galáxia e halo ── */
        galaxy.rotation.y = t * 0.038;
        halo.rotation.y   = -t * 0.018;
        halo.rotation.x   =  t * 0.009;

        /* ══════════════════════════════════
           IMPLOSÃO NA SAÍDA
        ══════════════════════════════════ */
        if (isExiting) {
            exitProg = Math.min(exitProg + 0.020, 1);
            /* ease-in quadrático */
            const ease = exitProg * exitProg;

            /* Partículas correm para o centro */
            for (let i = 0; i < NG; i++) {
                GAL_ATTR.array[i * 3]     = gOrigPos[i * 3]     * (1 - ease);
                GAL_ATTR.array[i * 3 + 1] = gOrigPos[i * 3 + 1] * (1 - ease);
                GAL_ATTR.array[i * 3 + 2] = gOrigPos[i * 3 + 2] * (1 - ease);
            }
            GAL_ATTR.needsUpdate = true;

            /* Glow expande enquanto partículas implodem */
            glowGroup.scale.setScalar(1 + ease * 5);

            /* Resto some gradualmente */
            icoMat.opacity = 0.16 * (1 - ease);
            outerRings.forEach(m => { m.material.opacity = 0.50 * (1 - ease); });
            gyroMeshes.forEach(m => { m.material.opacity = 0.88 * (1 - ease); });
            galaxyMat.opacity = Math.max(0, 0.85 - ease * 1.2);
            halo.material.opacity = 0.50 * (1 - ease);

            /* Quando a implosão termina → ativa saída CSS */
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
       ANIMAÇÃO DO TEXTO — letras reveladas uma a uma
    ═══════════════════════════════════════════════════════ */
    const nameEl = overlay.querySelector('.intro-name');
    if (nameEl) {
        const txt = nameEl.textContent.trim();
        nameEl.textContent = '';
        nameEl.setAttribute('aria-label', txt);

        [...txt].forEach((ch, i) => {
            const sp = document.createElement('span');
            sp.className   = 'intro-ltr';
            sp.textContent = ch === ' ' ? '\u00A0' : ch;
            sp.style.animationDelay = `${0.5 + i * 0.085}s`;
            nameEl.appendChild(sp);
        });

        /* Flash de glow após última letra aparecer */
        const glowAt = (0.5 + (txt.length - 1) * 0.085 + 0.58) * 1000;
        setTimeout(() => nameEl.classList.add('intro-name--glow'), glowAt);
    }

    /* ═══════════════════════════════════════════════════════
       BARRA DE PROGRESSO
    ═══════════════════════════════════════════════════════ */
    const TOTAL_MS = 4600;
    const barFill  = overlay.querySelector('.intro-bar-fill');
    if (barFill) {
        barFill.style.transition = `width ${TOTAL_MS}ms linear`;
        requestAnimationFrame(() => { barFill.style.width = '100%'; });
    }

    /* ═══════════════════════════════════════════════════════
       ENCERRAMENTO
    ═══════════════════════════════════════════════════════ */
    let dismissed = false;

    function dismiss() {
        if (dismissed) return;
        dismissed = true;
        clearTimeout(autoTimer);

        /* Fade do texto e barra */
        const content = overlay.querySelector('.intro-content');
        const bar     = overlay.querySelector('.intro-bar-wrap');
        if (content) { content.style.transition = 'opacity 0.3s ease'; content.style.opacity = '0'; }
        if (bar)     { bar.style.transition     = 'opacity 0.3s ease'; bar.style.opacity     = '0'; }

        /* Inicia implosão 3D */
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

    /* Resize responsivo */
    window.addEventListener('resize', () => {
        const nW = window.innerWidth, nH = window.innerHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
    }, { passive: true });

})();
