'use client';

import { useState } from 'react';
import { platforms, getPlatformFunctions } from '@/data/resources';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

export default function PlatformsPage() {
  const functions = getPlatformFunctions();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredPlatforms = activeFilter === 'all'
    ? platforms
    : platforms.filter((p) => p.function === activeFilter);

  return (
    <>
      <Hero
        title="AI Platforms"
        subtitle={`${platforms.length}+ purpose-built AI platforms transforming supply chain planning, visibility, risk management, and operations.`}
        gradient="from-emerald-500 to-cyan-500"
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
              All ({platforms.length})
            </button>
            {functions.map((fn) => (
              <button
                key={fn}
                onClick={() => setActiveFilter(fn)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeFilter === fn
                    ? 'bg-electric-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {fn.length > 30 ? fn.split('/')[0].trim() : fn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredPlatforms.map((p) => (
            <Card key={p.name} className="flex flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">Founded: {p.founded}</p>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-slate-500 transition-colors hover:text-electric-400"
                  aria-label={`Visit ${p.name}`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge label={p.function} color="blue" />
                <Badge label={p.funding} color="green" />
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>

              <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">AI Approach</h4>
                  <p className="mt-1 text-sm text-slate-300">{p.ai_approach}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Key Customers</h4>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {p.key_customers.map((c) => (
                      <span key={c} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-300">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
