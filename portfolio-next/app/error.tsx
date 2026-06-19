'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[App Error]', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg, #05050f)',
        gap: 20, textAlign: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(4rem, 16vw, 7rem)',
          fontWeight: 900, lineHeight: 1,
          background: 'linear-gradient(135deg, #00ff88, #00aaff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Erro
      </div>

      <h1
        style={{
          fontSize: '1.25rem', fontWeight: 700,
          color: 'var(--text, #e8eaf0)', margin: 0,
        }}
      >
        Algo deu errado
      </h1>

      <p
        style={{
          color: 'var(--muted, #6b7a99)', maxWidth: 400,
          lineHeight: 1.75, margin: 0, fontSize: '0.95rem',
        }}
      >
        Um erro inesperado aconteceu. Tente recarregar a página.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', borderRadius: 12,
            background: 'linear-gradient(135deg, #00ff88, #00aaff)',
            color: '#05050f', fontWeight: 600, fontSize: '0.95rem',
            border: 'none', cursor: 'pointer',
          }}
        >
          Tentar novamente
        </button>
        <a
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', borderRadius: 12,
            border: '1.5px solid rgba(0,255,136,0.3)',
            color: '#00ff88', fontWeight: 600, fontSize: '0.95rem',
            textDecoration: 'none',
          }}
        >
          Voltar ao início
        </a>
      </div>

      {error.digest && (
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem', color: 'rgba(107,122,153,0.6)',
            letterSpacing: '0.08em', marginTop: 12,
          }}
        >
          digest: {error.digest}
        </p>
      )}
    </div>
  );
}
