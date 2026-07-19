import type { Metadata } from 'next';
import Link from 'next/link';
import { contentOutlines } from '@/data/resources';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

export const metadata: Metadata = {
  title: 'Blog & Guides — AI in Supply Chain',
  description: 'In-depth guides on understanding, evaluating, and implementing AI across demand planning, procurement, warehousing, and logistics.',
  alternates: { canonical: '/blog' },
};

const categoryForArticle: Record<string, string> = {
  'ai-in-supply-chain-101': 'Fundamentals',
  'how-to-evaluate-ai-tools-supply-chain': 'Strategy',
  'building-first-ai-use-case': 'Implementation',
  'roi-of-ai-supply-chain': 'Business Case',
  'ai-skills-supply-chain-2025': 'Skills',
  'from-excel-to-ai': 'Career',
  'prompt-engineering-supply-chain': 'Hands-On',
  'computer-vision-warehousing': 'Technology',
  'ai-powered-demand-forecasting': 'Technology',
  'last-mile-delivery-ai': 'Technology',
};

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

export default function BlogPage() {
  return (
    <>
      <Hero
        title="Blog & Guides"
        subtitle="In-depth articles to help you understand, evaluate, and implement AI across your supply chain operations."
        gradient="from-rose-500 to-violet-500"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contentOutlines.map((article) => {
            const category = categoryForArticle[article.slug] || 'Guide';
            return (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card className="flex h-full flex-col">
                  <Badge label={category} color={categoryColors[category] || 'blue'} />
                  <h2 className="mt-3 text-xl font-bold text-white">{article.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {article.outline[0].includes(' — ')
                      ? article.outline[0].split(' — ').slice(1).join(' — ')
                      : article.outline[0]}
                  </p>
                  <div className="mt-4 border-t border-white/5 pt-4">
                    <div className="text-sm text-slate-500">{article.outline.length} sections</div>
                    <div className="mt-2 text-sm font-medium text-electric-400">Read article &rarr;</div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
