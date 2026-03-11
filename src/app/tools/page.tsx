'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generalTools, getToolCategories, getToolsByCategory, nameToSlug } from '@/data/resources';
import { fetchMonetizationData } from '@/lib/monetization';
import type { MonetizationFields } from '@/types';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import TrackedLink from '@/components/TrackedLink';
import AdBanner from '@/components/AdBanner';

const categoryColors: Record<string, 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'cyan'> = {
  'Data & Analytics Platforms': 'blue',
  'AI/ML Development Platforms': 'purple',
  'Business Intelligence with AI': 'cyan',
  'AI Assistants & Copilots': 'green',
  'RPA & Process Automation': 'amber',
  'Document AI / OCR': 'rose',
  'Computer Vision': 'blue',
};

export default function ToolsPage() {
  const categories = getToolCategories();
  const grouped = getToolsByCategory();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [monet, setMonet] = useState<Map<string, MonetizationFields>>(new Map());

  useEffect(() => {
    fetchMonetizationData('tools').then(setMonet);
  }, []);

  const filteredCategories = activeFilter === 'all' ? categories : [activeFilter];

  // Sort tools within each category: featured items first (by priority desc), then alphabetically
  function sortTools(tools: typeof generalTools) {
    return [...tools].sort((a, b) => {
      const aM = monet.get(a.name);
      const bM = monet.get(b.name);
      const aFeat = aM?.is_featured ? (aM.featured_priority || 0) : -1;
      const bFeat = bM?.is_featured ? (bM.featured_priority || 0) : -1;
      if (aFeat !== bFeat) return bFeat - aFeat;
      return a.name.localeCompare(b.name);
    });
  }

  return (
    <>
      <Hero
        title="AI Tools"
        subtitle={`${generalTools.length}+ general-purpose AI tools used across supply chain operations — from data platforms to AI assistants.`}
        gradient="from-violet-500 to-electric-500"
      />

      {/* Ad Slot */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <AdBanner slot="tools-top" />
      </div>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 border-b border-white/10 bg-navy-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-electric-500 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              All ({generalTools.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === cat
                    ? 'bg-electric-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.split(' ')[0]} ({grouped[cat]?.length || 0})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredCategories.map((cat) => (
          <div key={cat} className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <Badge label={cat} color={categoryColors[cat] || 'blue'} size="md" />
              <span className="text-sm text-slate-500">{grouped[cat]?.length} tools</span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortTools(grouped[cat] || []).map((tool) => {
                const m = monet.get(tool.name);
                const isFeatured = m?.is_featured;
                const isAffiliate = !!m?.affiliate_url;

                return (
                  <Card
                    key={tool.name}
                    className={isFeatured ? 'ring-1 ring-emerald-500/30' : ''}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Link href={`/tools/${nameToSlug(tool.name)}`} className="text-lg font-semibold text-white hover:text-electric-400 transition-colors">
                          {tool.name}
                        </Link>
                        {isFeatured && (
                          <Badge label={m?.sponsor_label || 'Featured'} color="green" />
                        )}
                        {isAffiliate && !isFeatured && (
                          <Badge label="Partner" color="amber" />
                        )}
                      </div>

                      <TrackedLink
                        href={tool.url}
                        affiliateHref={m?.affiliate_url}
                        resourceType="tool"
                        resourceId={m?.id || tool.name}
                        resourceName={tool.name}
                        className="ml-2 shrink-0 text-slate-500 transition-colors hover:text-electric-400"
                        ariaLabel={`Visit ${tool.name}`}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </TrackedLink>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{tool.description}</p>
                    <div className="mt-4 border-t border-white/5 pt-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Supply Chain Use</h4>
                      <p className="mt-1 text-sm text-slate-300">{tool.supply_chain_relevance}</p>
                    </div>
                    <div className="mt-3">
                      <Badge label={tool.pricing_model} color="slate" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
