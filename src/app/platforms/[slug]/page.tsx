import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPlatformBySlug, getAllPlatformSlugs, nameToSlug, generalTools, useCases } from '@/data/resources';
import Badge from '@/components/Badge';
import NewsletterSignup from '@/components/NewsletterSignup';
import BookmarkButton from '@/components/BookmarkButton';
import RatingWidget from '@/components/RatingWidget';

export function generateStaticParams() {
  return getAllPlatformSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatformBySlug(slug);
  if (!platform) return { title: 'Platform Not Found' };
  return {
    title: `${platform.name} — AI Supply Chain Platform`,
    description: platform.description.slice(0, 160),
    openGraph: {
      title: `${platform.name} | AI Supply Chain Platforms`,
      description: platform.description.slice(0, 160),
      type: 'website',
    },
  };
}

const functionColors: Record<string, 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'cyan'> = {
  'Supply Chain Planning': 'blue',
  'Supply Chain Planning / S&OP': 'blue',
  'Demand Planning': 'purple',
  'Warehouse Management': 'amber',
  'Transportation Management': 'cyan',
  'Procurement': 'green',
  'Inventory Optimization': 'rose',
};

function getFunctionColor(fn: string): 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'cyan' {
  for (const key of Object.keys(functionColors)) {
    if (fn.includes(key)) return functionColors[key];
  }
  return 'blue';
}

export default async function PlatformPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const platform = getPlatformBySlug(slug);
  if (!platform) notFound();

  const color = getFunctionColor(platform.function);

  // Related tools mentioned in description/ai_approach
  const relatedTools = generalTools
    .filter((t) =>
      platform.description.toLowerCase().includes(t.name.toLowerCase()) ||
      platform.ai_approach.toLowerCase().includes(t.name.toLowerCase())
    )
    .slice(0, 4);

  // Related use cases by function keyword
  const functionKeyword = platform.function.split('/')[0].trim().split(' ')[0];
  const relatedUseCases = useCases
    .filter((uc) => uc.function.includes(functionKeyword))
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: platform.name,
    url: platform.url,
    description: platform.description,
    applicationCategory: 'Supply Chain Management Software',
    foundingDate: platform.founded,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 pt-16 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link href="/platforms" className="text-sm text-slate-400 hover:text-white transition-colors">
              ← Back to Platforms
            </Link>
          </div>
          <Badge label={platform.function.split('/')[0].trim()} color={color} size="sm" />
          <div className="mt-4 flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {platform.name}
            </h1>
            <BookmarkButton
              item={{ id: slug, name: platform.name, type: 'platform', description: platform.description }}
              className="mt-1"
            />
          </div>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl line-clamp-3">{platform.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-electric-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-electric-400 transition-colors"
            >
              Visit {platform.name} →
            </a>
            {platform.founded && (
              <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300">
                Founded {platform.founded.split('(')[0].trim()}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Full description */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-semibold text-white mb-3">About {platform.name}</h2>
              <p className="text-slate-300 leading-relaxed">{platform.description}</p>
            </div>

            {/* AI Approach */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-semibold text-white mb-3">AI Approach</h2>
              <p className="text-slate-300 leading-relaxed">{platform.ai_approach}</p>
            </div>

            {/* Key Customers */}
            {platform.key_customers?.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Key Customers</h2>
                <div className="flex flex-wrap gap-2">
                  {platform.key_customers.map((c) => (
                    <span key={c} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related use cases */}
            {relatedUseCases.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Related Use Cases</h2>
                <div className="space-y-3">
                  {relatedUseCases.map((uc) => (
                    <div key={uc.use_case} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs text-slate-500 mb-1">{uc.function}</div>
                      <div className="text-sm font-medium text-white">{uc.use_case}</div>
                      <div className="mt-1 text-xs text-slate-400 line-clamp-2">{uc.results}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related tools */}
            {relatedTools.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Related AI Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedTools.map((t) => (
                    <Link
                      key={t.name}
                      href={`/tools/${nameToSlug(t.name)}`}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-electric-500/30 hover:bg-white/[0.06] transition-all"
                    >
                      <div className="text-sm font-medium text-white">{t.name}</div>
                      <div className="mt-1 text-xs text-slate-400 line-clamp-2">{t.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Quick Facts</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-slate-500">Function</dt>
                  <dd className="text-slate-200">{platform.function}</dd>
                </div>
                {platform.founded && (
                  <div>
                    <dt className="text-slate-500">Founded</dt>
                    <dd className="text-slate-200">{platform.founded}</dd>
                  </div>
                )}
                {platform.funding && (
                  <div>
                    <dt className="text-slate-500">Funding</dt>
                    <dd className="text-slate-200">{platform.funding}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-slate-500">Website</dt>
                  <dd>
                    <a href={platform.url} target="_blank" rel="noopener noreferrer" className="text-electric-400 hover:text-electric-300 truncate block">
                      {platform.url.replace('https://', '').replace('http://', '')}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <h3 className="text-sm font-semibold text-white mb-2">Get Featured</h3>
              <p className="text-xs text-slate-400 mb-3">Reach 10K+ supply chain professionals monthly.</p>
              <Link href="/advertise" className="block text-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
                View Listing Options
              </Link>
            </div>

            <RatingWidget resourceType="platform" resourceId={slug} />
            <NewsletterSignup variant="card" />
          </div>
        </div>

        {/* Back nav */}
        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between">
          <Link href="/platforms" className="text-sm text-slate-400 hover:text-white transition-colors">
            ← All Platforms
          </Link>
          <Link href="/tools" className="text-sm text-slate-400 hover:text-white transition-colors">
            Browse Tools →
          </Link>
        </div>
      </div>
    </>
  );
}
