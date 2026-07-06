import { ImageResponse } from 'next/og';

export const runtime     = 'edge';
export const size        = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180, height: 180,
          background: '#04040e',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 144, height: 144,
            background: 'linear-gradient(135deg, #060612 0%, #0d0d28 100%)',
            borderRadius: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1.5px solid rgba(0,255,136,0.18)',
          }}
        >
          <span
            style={{
              color: '#00ff88',
              fontSize: 90,
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
    { width: 180, height: 180 },
  );
}
