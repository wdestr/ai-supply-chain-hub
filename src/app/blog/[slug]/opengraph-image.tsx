import { ImageResponse } from 'next/og';
import { getArticleBySlug, getAllArticleSlugs } from '@/data/articles';

export const alt = 'AISCHub — AI in Supply Chain article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const title = article?.title ?? 'AI in Supply Chain';
  const category = article?.category ?? 'Guide';

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
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #8b5cf6 100%)',
            }}
          />
          <div style={{ display: 'flex', fontSize: '26px', fontWeight: 700 }}>AISCHub</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              fontSize: '22px',
              fontWeight: 600,
              color: '#38bdf8',
              background: 'rgba(56,189,248,0.12)',
              padding: '8px 18px',
              borderRadius: '999px',
            }}
          >
            {category}
          </div>
          <div style={{ display: 'flex', fontSize: '58px', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-1.5px' }}>
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: '24px', color: '#94a3b8', fontWeight: 600 }}>
          aischub.com/blog
        </div>
      </div>
    ),
    { ...size },
  );
}
