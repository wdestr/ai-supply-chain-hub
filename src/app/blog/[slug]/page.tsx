import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getAllArticleSlugs, getAdjacentArticles, getArticleResourceTags } from '@/data/articles';
import { platforms, generalTools, useCases } from '@/data/resources';
import Badge from '@/components/Badge';
import AdBanner from '@/components/AdBanner';

const categoryColors: Record<string, 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'cyan'> = {
  Fundamentals: 'blue',
  Strategy: 'green',
  Implementation: 'purple',
  'Business Case': 'amber',
  Skills: 'cyan',
  Career: 'rose',
  'Hands-On': 'green',
  Technology: 'blue',
};

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { prev, next } = getAdjacentArticles(slug);
  const tags = getArticleResourceTags(slug);

  // Get related resources
  const relatedPlatforms = tags.platformKeywords.length > 0
    ? platforms.filter((p) => tags.platformKeywords.includes(p.function)).slice(0, 4)
    : [];
  const relatedTools = tags.toolKeywords.length > 0
    ? generalTools.filter((t) => tags.toolKeywords.includes(t.category)).slice(0, 3)
    : [];
  const relatedUseCases = tags.useCaseKeywords.length > 0
    ? useCases.filter((uc) => tags.useCaseKeywords.includes(uc.function)).slice(0, 3)
    : [];

  const hasRelated = relatedPlatforms.length > 0 || relatedTools.length > 0 || relatedUseCases.length > 0;

  return (
    <>
      {/* Article Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-electric-500 to-violet-500 opacity-[0.05]" />

        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-sm text-slate-400 transition-colors hover:text-electric-400">
            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <Badge label={article.category} color={categoryColors[article.category] || 'blue'} size="md" />
            <span className="text-sm text-slate-500">{article.readTime}</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex gap-12">
          {/* Main Content */}
          <article className="min-w-0 max-w-4xl flex-1">
            {article.sections.map((section, i) => (
              <section key={i} id={`section-${i}`} className="mb-12">
                <h2 className="text-2xl font-bold text-white">{section.heading}</h2>
                <div
                  className="article-content mt-4 space-y-4 text-base leading-relaxed text-slate-300"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </section>
            ))}

            {/* Prev / Next Navigation */}
            <div className="mt-16 border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-electric-500/30 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous Article
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white group-hover:text-electric-400 transition-colors">
                      {prev.title}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 text-right transition-all hover:border-electric-500/30 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center justify-end gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                      Next Article
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white group-hover:text-electric-400 transition-colors">
                      {next.title}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-sm font-medium text-slate-400 transition-colors hover:text-electric-400"
                >
                  View all articles
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">In this article</h3>
                <nav className="mt-4 space-y-2">
                  {article.sections.map((section, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="block text-sm text-slate-400 transition-colors hover:text-electric-400"
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related Platforms */}
              {relatedPlatforms.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Related Platforms</h3>
                  <div className="mt-3 space-y-2">
                    {relatedPlatforms.map((p) => (
                      <a
                        key={p.name}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-electric-500/20 hover:bg-white/[0.05]"
                      >
                        <div className="text-sm font-medium text-white">{p.name}</div>
                        <div className="mt-0.5 text-xs text-slate-500">{p.function}</div>
                      </a>
                    ))}
                  </div>
                  <Link href="/platforms" className="mt-2 inline-block text-xs text-electric-400 hover:text-electric-300">
                    View all platforms &rarr;
                  </Link>
                </div>
              )}

              {/* Related Tools */}
              {relatedTools.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Related Tools</h3>
                  <div className="mt-3 space-y-2">
                    {relatedTools.map((t) => (
                      <a
                        key={t.name}
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-emerald-500/20 hover:bg-white/[0.05]"
                      >
                        <div className="text-sm font-medium text-white">{t.name}</div>
                        <div className="mt-0.5 text-xs text-slate-500">{t.category}</div>
                      </a>
                    ))}
                  </div>
                  <Link href="/tools" className="mt-2 inline-block text-xs text-electric-400 hover:text-electric-300">
                    View all tools &rarr;
                  </Link>
                </div>
              )}

              {/* Related Use Cases */}
              {relatedUseCases.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Related Use Cases</h3>
                  <div className="mt-3 space-y-2">
                    {relatedUseCases.map((uc) => (
                      <div
                        key={uc.use_case}
                        className="rounded-lg border border-white/5 bg-white/[0.02] p-3"
                      >
                        <div className="text-sm font-medium text-white">{uc.use_case}</div>
                        <div className="mt-0.5 text-xs text-slate-500">{uc.function}</div>
                      </div>
                    ))}
                  </div>
                  <Link href="/use-cases" className="mt-2 inline-block text-xs text-electric-400 hover:text-electric-300">
                    View all use cases &rarr;
                  </Link>
                </div>
              )}

              {/* Sponsored Ad */}
              <AdBanner slot="blog-sidebar" />

              {/* Quick Actions */}
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-electric-500/5 to-emerald-500/5 p-4">
                <h3 className="text-sm font-semibold text-white">Ready to get started?</h3>
                <div className="mt-3 space-y-2">
                  <Link
                    href="/assessment"
                    className="block rounded-lg bg-electric-500/10 px-3 py-2 text-xs font-medium text-electric-400 transition-colors hover:bg-electric-500/20"
                  >
                    Take the AI Readiness Assessment
                  </Link>
                  <Link
                    href="/roi-calculator"
                    className="block rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                  >
                    Calculate Your ROI
                  </Link>
                  <Link
                    href="/compare"
                    className="block rounded-lg bg-violet-500/10 px-3 py-2 text-xs font-medium text-violet-400 transition-colors hover:bg-violet-500/20"
                  >
                    Compare Platforms
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
