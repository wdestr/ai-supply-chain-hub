'use client';

import { useState, useEffect } from 'react';
import { platforms, getPlatformFunctions } from '@/data/resources';
import { fetchMonetizationData } from '@/lib/monetization';
import type { MonetizationFields } from '@/types';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import TrackedLink from '@/components/TrackedLink';
import AdBanner from '@/components/AdBanner';

export default function PlatformsPage() {
  const functions = getPlatformFunctions();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [monet, setMonet] = useState<Map<string, MonetizationFields>>(new Map());

  useEffect(() => {
    fetchMonetizationData('platforms').then(setMonet);
  }, []);

  const filtered = activeFilter === 'all'
    ? platforms
    : platforms.filter((p) => p.function === activeFilter);

  // Sort: featured platforms first (by priority desc), then alphabetically
  const sortedPlatforms = [...filtered].sort((a, b) => {
    const aM = monet.get(a.name);
    const bM = monet.get(b.name);
    const aFeat = aM?.is_featured ? (aM.featured_priority || 0) : -1;
    const bFeat = bM?.is_featured ? (bM.featured_priority || 0) : -1;
    if (aFeat !== bFeat) return bFeat - aFeat;
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <Hero
        title="AI Platforms"
        subtitle={`${platforms.length}+ purpose-built AI platforms transforming supply chain planning, visibility, risk management, and operations.`}
        gradient="from-emerald-500 to-cyan-500"
      />

      {/* Ad Slot */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <AdBanner slot="platforms-top" />
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
          {sortedPlatforms.map((p) => {
            const m = monet.get(p.name);
            const isFeatured = m?.is_featured;
            const isAffiliate = !!m?.affiliate_url;

            return (
              <Card
                key={p.name}
                className={`flex flex-col ${isFeatured ? 'ring-1 ring-emerald-500/30' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{p.name}</h3>
                      {isFeatured && (
                        <Badge label={m?.sponsor_label || 'Featured'} color="green" />
                      )}
                      {isAffiliate && !isFeatured && (
                        <Badge label="Partner" color="amber" />
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500">Founded: {p.founded}</p>
                  </div>
                  <TrackedLink
                    href={p.url}
                    affiliateHref={m?.affiliate_url}
                    resourceType="platform"
                    resourceId={m?.id || p.name}
                    resourceName={p.name}
                    className="shrink-0 text-slate-500 transition-colors hover:text-electric-400"
                    ariaLabel={`Visit ${p.name}`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </TrackedLink>
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
            );
          })}
        </div>
      </section>
    </>
  );
}
