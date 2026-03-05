'use client';

import { useState } from 'react';
import { generalTools, getToolCategories, getToolsByCategory } from '@/data/resources';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

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

  const filteredCategories = activeFilter === 'all' ? categories : [activeFilter];

  return (
    <>
      <Hero
        title="AI Tools"
        subtitle={`${generalTools.length}+ general-purpose AI tools used across supply chain operations — from data platforms to AI assistants.`}
        gradient="from-violet-500 to-electric-500"
      />

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
              {grouped[cat]?.map((tool) => (
                <Card key={tool.name}>
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 shrink-0 text-slate-500 transition-colors hover:text-electric-400"
                      aria-label={`Visit ${tool.name}`}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
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
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
