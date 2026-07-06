import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 192, height: 192,
          background: '#04040e',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 154, height: 154,
            background: 'linear-gradient(135deg, #060612 0%, #0d0d28 100%)',
            borderRadius: 34,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid rgba(0,255,136,0.18)',
          }}
        >
          <span
            style={{
              color: '#00ff88',
              fontSize: 98,
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
    { width: 192, height: 192 },
  );
}
