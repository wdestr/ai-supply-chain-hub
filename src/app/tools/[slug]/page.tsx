import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getToolBySlug, getAllToolSlugs, nameToSlug, platforms, useCases } from '@/data/resources';
import Badge from '@/components/Badge';
import NewsletterSignup from '@/components/NewsletterSignup';
import BookmarkButton from '@/components/BookmarkButton';
import RatingWidget from '@/components/RatingWidget';

export function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Tool Not Found' };
  return {
    title: `${tool.name} for Supply Chain AI`,
    description: tool.supply_chain_relevance,
    alternates: { canonical: `/tools/${slug}` },
    openGraph: {
      title: `${tool.name} | AI Supply Chain Tools`,
      description: tool.supply_chain_relevance,
      type: 'website',
      url: `/tools/${slug}`,
    },
  };
}

const categoryColors: Record<string, 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'cyan'> = {
  'Data & Analytics Platforms': 'blue',
  'AI/ML Development Platforms': 'purple',
  'Business Intelligence with AI': 'cyan',
  'AI Assistants & Copilots': 'green',
  'RPA & Workflow Automation': 'amber',
  'RPA & Process Automation': 'amber',
  'Document AI / OCR': 'rose',
  'Computer Vision': 'blue',
};

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const color = categoryColors[tool.category] || 'blue';

  // Related platforms that mention this tool or same category keywords
  const relatedPlatforms = platforms
    .filter((p) =>
      p.description.toLowerCase().includes(tool.name.toLowerCase()) ||
      p.ai_approach.toLowerCase().includes(tool.name.toLowerCase())
    )
    .slice(0, 4);

  // Related use cases that mention this tool category
  const relatedUseCases = useCases
    .filter((uc) => uc.tools_used?.some((t) => t.toLowerCase().includes(tool.name.toLowerCase())))
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: tool.url,
    description: tool.description,
    applicationCategory: tool.category,
    offers: {
      '@type': 'Offer',
      description: tool.pricing_model,
    },
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
            <Link href="/tools" className="text-sm text-slate-400 hover:text-white transition-colors">
              ← Back to AI Tools
            </Link>
          </div>
          <Badge label={tool.category} color={color} size="sm" />
          <div className="mt-4 flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {tool.name}
            </h1>
            <BookmarkButton
              item={{ id: slug, name: tool.name, type: 'tool', description: tool.description }}
              className="mt-1"
            />
          </div>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl">{tool.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-electric-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-electric-400 transition-colors"
            >
              Visit {tool.name} →
            </a>
            <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300">
              {tool.pricing_model}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Supply chain relevance */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-semibold text-white mb-3">Supply Chain Relevance</h2>
              <p className="text-slate-300 leading-relaxed">{tool.supply_chain_relevance}</p>
            </div>

            {/* Related use cases */}
            {relatedUseCases.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Use Cases with {tool.name}</h2>
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

            {/* Related platforms */}
            {relatedPlatforms.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Platforms That Use {tool.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedPlatforms.map((p) => (
                    <Link
                      key={p.name}
                      href={`/platforms/${nameToSlug(p.name)}`}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-electric-500/30 hover:bg-white/[0.06] transition-all"
                    >
                      <div className="text-sm font-medium text-white">{p.name}</div>
                      <div className="mt-1 text-xs text-slate-400 line-clamp-2">{p.description}</div>
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
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-slate-500">Category</dt>
                  <dd className="text-slate-200">{tool.category}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Pricing</dt>
                  <dd className="text-slate-200">{tool.pricing_model}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Website</dt>
                  <dd>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-electric-400 hover:text-electric-300 truncate block">
                      {tool.url.replace('https://', '').replace('http://', '')}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <h3 className="text-sm font-semibold text-white mb-2">Want to list your tool?</h3>
              <p className="text-xs text-slate-400 mb-3">Get featured placement and an affiliate listing on AISCHub.</p>
              <Link href="/advertise" className="block text-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
                View Listing Options
              </Link>
            </div>

            <RatingWidget resourceType="tool" resourceId={slug} />
            <NewsletterSignup variant="card" />
          </div>
        </div>

        {/* Back nav */}
        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between">
          <Link href="/tools" className="text-sm text-slate-400 hover:text-white transition-colors">
            ← All Tools
          </Link>
          <Link href="/platforms" className="text-sm text-slate-400 hover:text-white transition-colors">
            Browse Platforms →
          </Link>
        </div>
      </div>
    </>
  );
}
