import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 512, height: 512,
          background: '#04040e',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 410, height: 410,
            background: 'linear-gradient(135deg, #060612 0%, #0d0d28 100%)',
            borderRadius: 90,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '3px solid rgba(0,255,136,0.18)',
          }}
        >
          <span
            style={{
              color: '#00ff88',
              fontSize: 260,
              fontWeight: 900,
              fontFamily: 'system-ui, sans-serif',
              lineHeight: 1,
            }}
          >
            G
          </span>
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
