import { ImageResponse } from 'next/og';
import fs   from 'fs';
import path from 'path';

export const runtime     = 'nodejs';
export const alt         = 'Gabriel Ricarte — Dev Full-Stack';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const imgBuffer = fs.readFileSync(path.join(process.cwd(), 'public/images/fotonova.jpg'));
  const imgSrc    = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%', width: '100%',
          display: 'flex', flexDirection: 'column',
          backgroundColor: '#04040e',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient blobs */}
        <div style={{
          position: 'absolute', top: -200, left: -150,
          width: 600, height: 600, borderRadius: 300,
          background: 'radial-gradient(circle, rgba(0,255,136,0.14) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: -150, right: -100,
          width: 500, height: 500, borderRadius: 250,
          background: 'radial-gradient(circle, rgba(0,170,255,0.10) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '10%',
          width: 420, height: 420, borderRadius: 210,
          background: 'radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)',
        }} />

        {/* Horizontal grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.025) 1px, transparent 1px)',
          backgroundSize: '1200px 80px',
        }} />

        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #00ff88, #00aaff, #7c3aed)',
        }} />

        {/* Content — row layout */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          padding: '0 80px',
          gap: 64,
          position: 'relative', zIndex: 1,
        }}>

          {/* Left: text */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Tag line */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              marginBottom: 28,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: 4,
                background: '#00ff88',
                boxShadow: '0 0 10px rgba(0,255,136,0.9)',
              }} />
              <span style={{
                fontSize: 17, color: 'rgba(0,255,136,0.75)',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                fontWeight: 500,
              }}>
                Full-Stack Web Developer · Fortaleza, Brazil
              </span>
            </div>

            {/* Name */}
            <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1 }}>
              <span style={{
                fontSize: 96, fontWeight: 900,
                color: '#e8f0f8', letterSpacing: '-4px',
              }}>
                Gabriel
              </span>
              <span style={{
                fontSize: 96, fontWeight: 900,
                background: 'linear-gradient(120deg, #00ff88, #00aaff)',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-4px',
              }}>
                {' '}Ricarte
              </span>
            </div>

            {/* Stack pills */}
            <div style={{ display: 'flex', gap: 10, marginTop: 36, flexWrap: 'wrap' }}>
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'].map((tech, i) => (
                <div key={i} style={{
                  padding: '9px 20px',
                  background: i === 1
                    ? 'rgba(0,255,136,0.12)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i === 1 ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 10,
                  color: i === 1 ? '#00ff88' : 'rgba(232,240,248,0.65)',
                  fontSize: 18,
                  fontWeight: i === 1 ? 600 : 400,
                }}>
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Right: circular photo */}
          <div style={{
            display: 'flex',
            position: 'relative',
            width: 260, height: 260,
            flexShrink: 0,
          }}>
            {/* Gradient ring */}
            <div style={{
              position: 'absolute', inset: -3,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00ff88, #00aaff, #7c3aed)',
            }} />
            {/* White gap ring */}
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              border: '3px solid #04040e',
              zIndex: 1,
            }} />
            {/* Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              width={260}
              height={260}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center top',
                position: 'relative',
                zIndex: 2,
              }}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 80px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', zIndex: 1,
        }}>
          <span style={{ color: 'rgba(136,146,176,0.7)', fontSize: 18 }}>
            {(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gabrielricartedev.com').replace('https://', '')}
          </span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 28px',
            background: 'rgba(0,255,136,0.06)',
            border: '1px solid rgba(0,255,136,0.15)',
            borderRadius: 28,
            color: 'rgba(0,255,136,0.8)',
            fontSize: 18,
          }}>
            <div style={{
              width: 9, height: 9, borderRadius: 5,
              background: '#00ff88',
            }} />
            Available for projects
          </div>
        </div>
      </div>
    ),
    size,
  );
}
