'use client';

import { useEffect, useRef, useState } from 'react';
import type * as ThreeTypes from 'three';
import { useLang } from '@/contexts/LangContext';

const TOTAL_MS  = 6000;
const ENTRY_DUR = 2.6;

const GABRIEL = 'GABRIEL'.split('');
const RICARTE = 'RICARTE'.split('');

export default function IntroOverlay() {
  const { t } = useLang();
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const barWrapRef  = useRef<HTMLDivElement>(null);
  const pctWrapRef  = useRef<HTMLDivElement>(null);
  const barFillRef  = useRef<HTMLDivElement>(null);
  const pctRef      = useRef<HTMLSpanElement>(null);

  const [hidden,  setHidden]  = useState(false);
  const [mounted, setMounted] = useState(false);
  const [glowing, setGlowing] = useState(false);

  /* ── Check session / reduced-motion on client ── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHidden(true);
      return;
    }
    if (sessionStorage.getItem('g-intro-done')) {
      setHidden(true);
      return;
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas  = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    const isTouch  = window.matchMedia('(pointer: coarse)').matches;
    const W        = window.innerWidth;
    const H        = window.innerHeight;
    const isMob    = W < 768;
    const DPR      = Math.min(window.devicePixelRatio, 2);
    const START_Z  = isMob ? 14 : 20;
    const TARGET_Z = 7;

    let rafId     = 0;
    let isExiting = false;
    let exitProg  = 0;
    let dismissed = false;
    let mX = 0, mY = 0;
    let autoTimer:  ReturnType<typeof setTimeout>;
    let pctTimer:   ReturnType<typeof setInterval>;
    let glowTimer:  ReturnType<typeof setTimeout>;

    /* ── shared dismiss logic ── */
    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      clearTimeout(autoTimer);
      clearInterval(pctTimer);

      [contentRef.current, barWrapRef.current, pctWrapRef.current].forEach(el => {
        if (!el) return;
        el.style.transition = 'opacity 0.35s ease';
        el.style.opacity    = '0';
      });

      if (isTouch || rafId === 0) {
        /* No Three.js running — CSS fade directly */
        overlay.classList.add('intro-leaving');
        setTimeout(() => {
          sessionStorage.setItem('g-intro-done', '1');
          setHidden(true);
        }, 900);
      } else {
        isExiting = true;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (['Escape', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        dismiss();
      }
    };

    window.addEventListener('keydown', onKey);
    overlay.addEventListener('click', dismiss, { once: true });

    /* ── progress bar (always) ── */
    if (barFillRef.current) {
      barFillRef.current.style.transition = `width ${TOTAL_MS}ms linear`;
      requestAnimationFrame(() => {
        if (barFillRef.current) barFillRef.current.style.width = '100%';
      });
    }

    /* ── percent counter (always) ── */
    const t0pct = Date.now();
    pctTimer = setInterval(() => {
      const pct = Math.min(Math.round(((Date.now() - t0pct) / TOTAL_MS) * 100), 100);
      if (pctRef.current) pctRef.current.textContent = String(pct);
      if (pct >= 100) clearInterval(pctTimer);
    }, 40);

    /* ── glow on RICARTE after last letter lands (always) ── */
    glowTimer = setTimeout(() => setGlowing(true), Math.round((1.05 + 6 * 0.08 + 0.65) * 1000));

    /* ── auto-dismiss (always) ── */
    autoTimer = setTimeout(dismiss, TOTAL_MS);

    /* ── TOUCH PATH: CSS-only, skip Three.js ── */
    if (isTouch) {
      return () => {
        dismissed = true;
        clearTimeout(autoTimer);
        clearTimeout(glowTimer);
        clearInterval(pctTimer);
        window.removeEventListener('keydown', onKey);
        overlay.removeEventListener('click', dismiss);
      };
    }

    /* ── DESKTOP PATH: Three.js ── */
    const init = async () => {
      const THREE = await import('three');

      /* renderer */
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

      /* ── LIGHTING ── */
      scene.add(new THREE.AmbientLight(0x080816, 3.5));

      const keyLight = new THREE.PointLight(0xffffff, 1.4, 45);
      keyLight.position.set(-5, 7, 11);
      scene.add(keyLight);

      const accentLight = new THREE.PointLight(0x00ff88, 0.55, 22);
      accentLight.position.set(6, -3, 5);
      scene.add(accentLight);

      const rimLight = new THREE.PointLight(0x1133aa, 0.35, 30);
      rimLight.position.set(-7, 2, -9);
      scene.add(rimLight);

      /* ── 1. DARK SPHERE ── */
      const sphereMat = new THREE.MeshPhongMaterial({
        color: 0x050510, specular: 0x00cc66, shininess: 180,
        transparent: true, opacity: 0,
      });
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(2.2, 64, 64), sphereMat);
      G.add(sphere);

      /* ── 2. ICOSAHEDRON SHELL (wireframe) ── */
      const shellMat = new THREE.MeshBasicMaterial({
        color: 0x00ff88, wireframe: true, transparent: true, opacity: 0,
      });
      const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(2.55, 0), shellMat);
      G.add(shell);

      /* ── 3. ORBITAL RINGS ── */
      const orbitDefs = [
        { r: 3.0, rX: 0.25,          rZ: 0.00, col: 0x00ff88, tOp: 0.28, sp:  0.28 },
        { r: 3.9, rX: Math.PI / 2,   rZ: 0.35, col: 0x00aaff, tOp: 0.20, sp: -0.19 },
        { r: 5.0, rX: 0.72,          rZ: 1.10, col: 0x5533ff, tOp: 0.14, sp:  0.13 },
        { r: 6.1, rX: 1.45,          rZ: 0.65, col: 0x0077cc, tOp: 0.10, sp: -0.08 },
        { r: 7.3, rX: 0.45,          rZ: 1.75, col: 0x00ff88, tOp: 0.07, sp:  0.04 },
      ];

      const buildRing = (radius: number) => {
        const pts: ThreeTypes.Vector3[] = [];
        for (let i = 0; i <= 128; i++) {
          const a = (i / 128) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
        }
        return new THREE.BufferGeometry().setFromPoints(pts);
      };

      const orbits = orbitDefs.map(d => {
        const mat  = new THREE.LineBasicMaterial({ color: d.col, transparent: true, opacity: 0 });
        const line = new THREE.LineLoop(buildRing(d.r), mat);
        line.rotation.x = d.rX;
        line.rotation.z = d.rZ;
        line.userData   = { sp: d.sp, tOp: d.tOp };
        G.add(line);
        return line;
      });

      /* ── 4. TOROIDAL PARTICLE CLOUD ── */
      const NP    = isMob ? 500 : 1200;
      const pPos  = new Float32Array(NP * 3);
      const pCols = new Float32Array(NP * 3);
      for (let i = 0; i < NP; i++) {
        const u    = Math.random() * Math.PI * 2;
        const v    = Math.random() * Math.PI * 2;
        const R    = 4.8 + Math.random() * 2.5;
        const minR = 0.3 + Math.random() * 1.2;
        pPos[i*3]   = (R + minR * Math.cos(v)) * Math.cos(u);
        pPos[i*3+1] = minR * Math.sin(v) * 0.5;
        pPos[i*3+2] = (R + minR * Math.cos(v)) * Math.sin(u);
        const t = Math.random();
        pCols[i*3]   = 0;
        pCols[i*3+1] = 0.45 + t * 0.55;
        pCols[i*3+2] = t * 0.65;
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

      /* ── 5. BACKGROUND STARS ── */
      const NS   = isMob ? 280 : 700;
      const sPos = new Float32Array(NS * 3);
      for (let i = 0; i < NS; i++) {
        const r = 16 + Math.random() * 28;
        const u = Math.random() * Math.PI * 2;
        const v = Math.acos(2 * Math.random() - 1);
        sPos[i*3]   = r * Math.sin(v) * Math.cos(u);
        sPos[i*3+1] = r * Math.sin(v) * Math.sin(u);
        sPos[i*3+2] = r * Math.cos(v);
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0x88aadd, size: 0.06, transparent: true, opacity: 0,
        sizeAttenuation: true, depthWrite: false,
      });
      const stars = new THREE.Points(sGeo, starMat);
      scene.add(stars);

      /* ── 6. INNER SPARKLES ── */
      const NSP    = isMob ? 60 : 130;
      const spPos  = new Float32Array(NSP * 3);
      const spCols = new Float32Array(NSP * 3);
      for (let i = 0; i < NSP; i++) {
        const r = 2.6 + Math.random() * 1.9;
        const u = Math.random() * Math.PI * 2;
        const v = Math.acos(2 * Math.random() - 1);
        spPos[i*3]   = r * Math.sin(v) * Math.cos(u);
        spPos[i*3+1] = r * Math.sin(v) * Math.sin(u);
        spPos[i*3+2] = r * Math.cos(v);
        const b = 0.55 + Math.random() * 0.45;
        spCols[i*3]   = 0;
        spCols[i*3+1] = b;
        spCols[i*3+2] = b * 0.5;
      }
      const spGeo = new THREE.BufferGeometry();
      spGeo.setAttribute('position', new THREE.BufferAttribute(spPos,  3));
      spGeo.setAttribute('color',    new THREE.BufferAttribute(spCols, 3));
      const spMat = new THREE.PointsMaterial({
        size: isMob ? 0.055 : 0.038, vertexColors: true,
        transparent: true, opacity: 0,
        sizeAttenuation: true, depthWrite: false,
      });
      const sparkles = new THREE.Points(spGeo, spMat);
      G.add(sparkles);

      /* ── MOUSE PARALLAX ── */
      const onMouse = (e: MouseEvent) => {
        mX = (e.clientX / window.innerWidth  - 0.5) * 2;
        mY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      if (!isMob) overlay.addEventListener('mousemove', onMouse, { passive: true });

      /* ── RESIZE ── */
      const onResize = () => {
        const nW = window.innerWidth, nH = window.innerHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      };
      window.addEventListener('resize', onResize, { passive: true });

      /* ── ANIMATION LOOP ── */
      const t0 = performance.now();

      const animate = (now: number) => {
        rafId = requestAnimationFrame(animate);
        const t = (now - t0) * 0.001;

        const entryRaw  = Math.min(t / ENTRY_DUR, 1);
        const entryEase = 1 - Math.pow(1 - entryRaw, 3);

        /* camera fly-in */
        if (!isExiting) {
          camera.position.z = START_Z + (TARGET_Z - START_Z) * entryEase + Math.sin(t * 0.06) * 0.22;
          camera.position.x = Math.sin(t * 0.05) * 0.15;
          camera.position.y = 0.3 + Math.sin(t * 0.08) * 0.18;
        }
        camera.lookAt(0, 0, 0);

        /* mouse parallax */
        if (!isMob) {
          G.rotation.y += (mX * 0.14 - G.rotation.y) * 0.026;
          G.rotation.x += (mY * 0.09 - G.rotation.x) * 0.026;
        }

        /* sphere */
        sphere.rotation.y   = t * 0.06;
        sphere.rotation.z   = t * 0.02;
        sphereMat.opacity   = Math.min(entryEase * 2.0, 0.96);

        /* shell */
        shell.rotation.x    = t * 0.04;
        shell.rotation.y    = t * 0.07;
        shell.rotation.z    = t * 0.03;
        shellMat.opacity    = Math.min(entryEase * 1.4, 0.09);

        /* orbital rings */
        orbits.forEach(line => {
          line.rotation.z += (line.userData.sp as number) * 0.009;
          (line.material as ThreeTypes.LineBasicMaterial).opacity =
            Math.min(entryEase * 1.5, line.userData.tOp as number);
        });

        /* particles */
        particles.rotation.y = t * 0.020;
        particles.rotation.x = t * 0.006;
        partMat.opacity       = Math.min(entryEase * 1.3, 0.28);

        /* stars */
        stars.rotation.y   = t * 0.002;
        starMat.opacity    = Math.min(entryEase * 1.1, 0.16);

        /* inner sparkles */
        sparkles.rotation.y = -t * 0.030;
        sparkles.rotation.x =  t * 0.018;
        spMat.opacity = Math.min(entryEase * 1.4, 0.50);

        /* accent light orbits sphere */
        accentLight.color.setHSL(0.38 + Math.sin(t * 0.14) * 0.08, 1.0, 0.5);
        accentLight.position.x = Math.cos(t * 0.20) * 6.5;
        accentLight.position.z = Math.sin(t * 0.20) * 5.5 + 2;
        accentLight.position.y = Math.sin(t * 0.12) * 3;

        /* exit fade */
        if (isExiting) {
          exitProg = Math.min(exitProg + 0.018, 1);
          const ease = exitProg * exitProg;

          camera.position.z = TARGET_Z * (1 - exitProg * 0.72);
          G.rotation.y += exitProg * 0.038;

          sphereMat.opacity = 0.96 * (1 - ease);
          shellMat.opacity  = 0.09 * (1 - ease);
          partMat.opacity   = 0.28 * (1 - ease);
          starMat.opacity   = 0.16 * (1 - ease);
          spMat.opacity     = 0.50 * (1 - ease);
          orbits.forEach(l => {
            (l.material as ThreeTypes.LineBasicMaterial).opacity =
              (l.userData.tOp as number) * (1 - ease);
          });

          if (exitProg >= 1) {
            cancelAnimationFrame(rafId);
            if (overlay) {
              overlay.classList.add('intro-leaving');
              setTimeout(() => {
                sessionStorage.setItem('g-intro-done', '1');
                setHidden(true);
              }, 900);
            }
            return;
          }
        }

        renderer.render(scene, camera);
      };

      rafId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(rafId);
        if (!isMob) overlay.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        spGeo.dispose();
        spMat.dispose();
        renderer.dispose();
      };
    };

    let isCleaned = false;
    const cleanupPromise = init();

    return () => {
      isCleaned = true;
      dismissed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(autoTimer);
      clearTimeout(glowTimer);
      clearInterval(pctTimer);
      window.removeEventListener('keydown', onKey);
      overlay.removeEventListener('click', dismiss);
      cleanupPromise.then(fn => { if (isCleaned) fn?.(); }).catch(() => {});
    };
  }, [mounted]);

  if (hidden) return null;

  return (
    <div
      id="intro-overlay"
      ref={overlayRef}
      role="dialog"
      aria-label="Animação de entrada"
      aria-modal="true"
    >
      <canvas
        ref={canvasRef}
        id="intro-canvas"
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <div className="intro-grid"      aria-hidden="true" />
      <div className="intro-scanlines" aria-hidden="true" />

      <div className="intro-content" ref={contentRef}>
        <p className="intro-tag" aria-hidden="true">
          <span className="intro-tag-line" />
          {t('intro.tag')}
          <span className="intro-tag-line" />
        </p>

        {/* ── NAME — letter-by-letter ── */}
        <div className="intro-name-wrap" aria-label="Gabriel Ricarte">
          <h1 className="intro-name-first" aria-label="GABRIEL">
            {GABRIEL.map((ch, i) => (
              <span
                key={i}
                className="intro-ltr"
                style={{ animationDelay: `${0.65 + i * 0.075}s` }}
                aria-hidden="true"
              >{ch}</span>
            ))}
          </h1>

          <div className="intro-name-sep" aria-hidden="true" />

          <div
            className={`intro-name-last${glowing ? ' intro-name-last--glow' : ''}`}
            role="text"
            aria-label="RICARTE"
          >
            {RICARTE.map((ch, i) => (
              <span
                key={i}
                className="intro-ltr-up"
                style={{ animationDelay: `${1.05 + i * 0.08}s` }}
                aria-hidden="true"
              >{ch}</span>
            ))}
          </div>
        </div>

        <p className="intro-role">
          {t('intro.role')}
        </p>

        <div className="intro-badges" aria-hidden="true">
          <span>React</span>
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>Node.js</span>
        </div>

        <p className="intro-skip" aria-hidden="true">
          <span>▶</span> {t('intro.skip')}
        </p>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="intro-bar-wrap" ref={barWrapRef} aria-hidden="true">
        <div className="intro-bar-fill" ref={barFillRef} />
      </div>

      <div className="intro-percent-wrap" ref={pctWrapRef} aria-hidden="true">
        <span ref={pctRef}>0</span>%
      </div>

      {/* ── CORNER DECORATORS ── */}
      <div className="intro-corner intro-corner--tl" aria-hidden="true" />
      <div className="intro-corner intro-corner--tr" aria-hidden="true" />
      <div className="intro-corner intro-corner--bl" aria-hidden="true" />
      <div className="intro-corner intro-corner--br" aria-hidden="true" />
    </div>
  );
}
