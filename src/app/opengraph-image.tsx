import { ImageResponse } from 'next/og';

export const alt = 'AI in Supply Chain Resource Hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0a1024 0%, #0f172a 55%, #111a3a 100%)',
          padding: '72px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #8b5cf6 100%)',
            }}
          />
          <div style={{ display: 'flex', fontSize: '30px', fontWeight: 700, letterSpacing: '-0.5px' }}>
            AISCHub
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', fontSize: '64px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1.5px' }}>
            AI in Supply Chain
          </div>
          <div style={{ display: 'flex', fontSize: '30px', color: '#94a3b8', lineHeight: 1.3 }}>
            470+ curated tools, platforms, use cases &amp; guides
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: '24px', color: '#38bdf8', fontWeight: 600 }}>
          aischub.com
        </div>
      </div>
    ),
    { ...size },
  );
}
