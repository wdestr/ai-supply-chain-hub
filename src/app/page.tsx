import Link from 'next/link';
import { getStats, useCases, platforms, contentOutlines } from '@/data/resources';
import { getAllArticles } from '@/data/articles';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import AnimatedCounter from '@/components/AnimatedCounter';

const stats = getStats();
const articles = getAllArticles();

const functionColors: Record<string, string> = {
  'Demand Planning & Forecasting': 'blue',
  'Procurement & Sourcing': 'green',
  'Warehouse & Distribution': 'purple',
  'Transportation & Logistics': 'amber',
  'Last-Mile Delivery': 'rose',
  'Inventory Management': 'cyan',
  'Supply Chain Planning (S&OP/IBP)': 'violet',
  'Customer Service & Order Management': 'slate',
};

export default function HomePage() {
  const featuredUseCases = useCases.slice(0, 6);
  const featuredPlatforms = platforms.slice(0, 6);
  const featuredArticles = articles.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-electric-500 to-emerald-500 opacity-[0.07]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-3xl">
            <Badge label="470+ Resources" color="green" size="md" />
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              AI in{' '}
              <span className="bg-gradient-to-r from-electric-400 to-emerald-400 bg-clip-text text-transparent">
                Supply Chain
              </span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-300">
              Your comprehensive resource hub for understanding, evaluating, and implementing AI across supply chain operations. From demand forecasting to last-mile delivery.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/start-here"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-electric-500 to-emerald-500 px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-electric-500/25"
              >
                Start Here
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link
                href="/use-cases"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Explore Use Cases
              </Link>
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center rounded-xl border border-electric-500/30 bg-electric-500/10 px-6 py-3 text-base font-semibold text-electric-400 transition-all hover:bg-electric-500/20"
              >
                Assess Your Readiness
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <section className="border-y border-white/10 bg-navy-900/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:grid-cols-6 lg:px-8">
          {[
            { label: 'Total Resources', value: stats.totalResources, suffix: '' },
            { label: 'Use Cases', value: stats.useCaseCount, suffix: '+' },
            { label: 'AI Platforms', value: stats.platformCount, suffix: '+' },
            { label: 'Tools', value: stats.toolCount, suffix: '+' },
            { label: 'Learning Resources', value: stats.learningCount, suffix: '+' },
            { label: 'Function Areas', value: stats.functionCount, suffix: '' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white sm:text-3xl">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Tools Banner */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link href="/assessment" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-rose-500/10 p-6 transition-all hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15">
                <svg className="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">AI Readiness Assessment</h3>
            </div>
            <p className="mt-3 text-sm text-slate-400">6 quick questions to get your personalized AI adoption roadmap.</p>
            <div className="mt-4 text-sm font-medium text-violet-400 transition-colors group-hover:text-violet-300">
              Take the quiz &rarr;
            </div>
          </Link>

          <Link href="/roi-calculator" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 p-6 transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15">
                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">ROI Calculator</h3>
            </div>
            <p className="mt-3 text-sm text-slate-400">Estimate the return on investment for AI in your supply chain.</p>
            <div className="mt-4 text-sm font-medium text-emerald-400 transition-colors group-hover:text-emerald-300">
              Calculate ROI &rarr;
            </div>
          </Link>

          <Link href="/compare" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-electric-500/10 p-6 transition-all hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15">
                <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Compare Platforms</h3>
            </div>
            <p className="mt-3 text-sm text-slate-400">Side-by-side comparison of 35+ AI supply chain platforms.</p>
            <div className="mt-4 text-sm font-medium text-cyan-400 transition-colors group-hover:text-cyan-300">
              Start comparing &rarr;
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Use Cases */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Top Use Cases</h2>
            <p className="mt-2 text-slate-400">How leading companies are applying AI across supply chain functions</p>
          </div>
          <Link href="/use-cases" className="hidden text-sm font-medium text-electric-400 hover:text-electric-300 sm:block">
            View all &rarr;
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredUseCases.map((uc, i) => (
            <Card key={i}>
              <Badge label={uc.function} color={(functionColors[uc.function] || 'blue') as 'blue'} />
              <h3 className="mt-3 text-lg font-semibold text-white">{uc.use_case}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-3">{uc.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {uc.companies_doing_it.slice(0, 3).map((company) => (
                  <span key={company} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-300">{company}</span>
                ))}
              </div>
              <div className="mt-3 border-t border-white/5 pt-3">
                <p className="text-xs font-medium text-emerald-400">{uc.results}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/use-cases" className="text-sm font-medium text-electric-400 hover:text-electric-300">
            View all use cases &rarr;
          </Link>
        </div>
      </section>

      {/* Featured Platforms */}
      <section className="border-t border-white/5 bg-navy-900/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">Leading Platforms</h2>
              <p className="mt-2 text-slate-400">Purpose-built AI platforms transforming supply chain operations</p>
            </div>
            <Link href="/platforms" className="hidden text-sm font-medium text-electric-400 hover:text-electric-300 sm:block">
              View all &rarr;
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPlatforms.map((p) => (
              <Card key={p.name}>
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                  <Badge label={p.funding.split('(')[0].trim().slice(0, 20)} color="green" />
                </div>
                <p className="mt-1 text-xs text-slate-500">{p.function}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 line-clamp-3">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.key_customers.slice(0, 3).map((c) => (
                    <span key={c} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-300">{c}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Previews */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Latest Insights</h2>
            <p className="mt-2 text-slate-400">In-depth guides for supply chain AI adoption</p>
          </div>
          <Link href="/blog" className="hidden text-sm font-medium text-electric-400 hover:text-electric-300 sm:block">
            View all &rarr;
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <Card>
                <Badge label={article.category} color="purple" />
                <h3 className="mt-3 text-lg font-semibold text-white">{article.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{article.readTime}</p>
                <div className="mt-4 text-sm font-medium text-electric-400">
                  Read article &rarr;
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-electric-500/20 to-emerald-500/20 p-8 sm:p-12">
            <div className="relative">
              <h2 className="text-3xl font-bold text-white">Ready to explore AI in your supply chain?</h2>
              <p className="mt-3 max-w-xl text-slate-300">
                Browse our complete resource library — from beginner-friendly courses to advanced platform evaluations.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/learning"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-navy-950 transition-all hover:bg-slate-100"
                >
                  Start Learning
                </Link>
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
                >
                  Explore Tools
                </Link>
                <Link
                  href="/glossary"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
                >
                  AI Glossary
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
