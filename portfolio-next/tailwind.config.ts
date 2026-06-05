import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg:       'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        'bg-card':'var(--bg-card)',
        accent:   'var(--accent)',
        'accent-2':'var(--accent-2)',
        'accent-3':'var(--accent-3)',
        text:     'var(--text)',
        muted:    'var(--muted)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'tape':        'tape 28s linear infinite',
        'tape-rev':    'tapeRev 28s linear infinite',
        'float':       'float 6s ease-in-out infinite',
        'pulse-glow':  'pulseGlow 2.5s ease-in-out infinite',
        'shimmer':     'shimmer 4s ease-in-out infinite',
        'blob-1':      'blobMove1 14s ease-in-out infinite',
        'blob-2':      'blobMove2 16s ease-in-out infinite',
        'blob-3':      'blobMove3 18s ease-in-out infinite',
        'cursor-blink':'cursorBlink 1.1s step-end infinite',
        'badge-pulse': 'badgePulse 2s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
      },
      keyframes: {
        tape:       { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        tapeRev:    { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-16px)' } },
        pulseGlow:  { '0%,100%': { opacity: '0.7' }, '50%': { opacity: '1' } },
        shimmer:    { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        blobMove1:  { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(40px,-30px) scale(1.08)' }, '66%': { transform: 'translate(-20px,20px) scale(0.95)' } },
        blobMove2:  { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '40%': { transform: 'translate(-50px,40px) scale(1.06)' }, '70%': { transform: 'translate(30px,-20px) scale(0.97)' } },
        blobMove3:  { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(60px,30px) scale(1.05)' } },
        cursorBlink:{ '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        badgePulse: { '0%,100%': { boxShadow: '0 0 0 0 rgba(0,255,136,0.4)' }, '50%': { boxShadow: '0 0 0 8px rgba(0,255,136,0)' } },
      },
      backgroundSize: { '200%': '200%' },
    },
  },
  plugins: [],
};

export default config;
