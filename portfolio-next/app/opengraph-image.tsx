import { ImageResponse } from 'next/og';

export const runtime     = 'edge';
export const alt         = 'Gabriel Ricarte — Dev Full-Stack';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const stack = ['React', 'Next.js', 'TypeScript', 'Node.js'];

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%', width: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#05050f',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient blobs */}
        <div style={{
          position: 'absolute', top: -180, left: -180,
          width: 520, height: 520, borderRadius: 260,
          background: 'radial-gradient(circle, rgba(0,255,136,0.13) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: -120, right: -120,
          width: 420, height: 420, borderRadius: 210,
          background: 'radial-gradient(circle, rgba(0,170,255,0.09) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '10%',
          width: 300, height: 300, borderRadius: 150,
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
        }} />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.028) 1px, transparent 1px)',
          backgroundSize: '1200px 60px',
          opacity: 1,
        }} />

        {/* Name */}
        <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1, zIndex: 1 }}>
          <span style={{
            fontSize: 104, fontWeight: 900,
            color: '#e8eaf0', letterSpacing: '-4px',
          }}>
            Gabriel
          </span>
          <span style={{ fontSize: 104, fontWeight: 900, color: '#00ff88' }}>.</span>
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 30, color: '#6b7a99',
          marginTop: 10, letterSpacing: '1.5px',
          zIndex: 1,
        }}>
          Dev Full-Stack · Fortaleza, CE
        </div>

        {/* Stack pills */}
        <div style={{ display: 'flex', gap: 14, marginTop: 40, zIndex: 1 }}>
          {stack.map((tech, i) => (
            <div key={i} style={{
              padding: '10px 24px',
              background: 'rgba(0,255,136,0.09)',
              border: '1px solid rgba(0,255,136,0.22)',
              borderRadius: 10,
              color: '#00ff88',
              fontSize: 22,
              fontWeight: 500,
            }}>
              {tech}
            </div>
          ))}
        </div>

        {/* Available badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginTop: 42, zIndex: 1,
          padding: '12px 32px',
          background: 'rgba(0,255,136,0.06)',
          border: '1px solid rgba(0,255,136,0.14)',
          borderRadius: 32,
          color: '#5fcf9a',
          fontSize: 20,
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: 5,
            background: '#00ff88',
            boxShadow: '0 0 8px rgba(0,255,136,0.8)',
          }} />
          Disponível para novos projetos
        </div>
      </div>
    ),
    size,
  );
}
