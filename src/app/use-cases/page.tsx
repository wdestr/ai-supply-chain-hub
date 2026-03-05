'use client';

import { useState } from 'react';
import { useCases, getUseCaseFunctions, getUseCasesByFunction } from '@/data/resources';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

const colorMap: Record<string, 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'cyan'> = {
  'Demand Planning & Forecasting': 'blue',
  'Procurement & Sourcing': 'green',
  'Warehouse & Distribution': 'purple',
  'Transportation & Logistics': 'amber',
  'Last-Mile Delivery': 'rose',
  'Inventory Management': 'cyan',
  'Supply Chain Planning (S&OP/IBP)': 'blue',
  'Customer Service & Order Management': 'green',
};

export default function UseCasesPage() {
  const functions = getUseCaseFunctions();
  const grouped = getUseCasesByFunction();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const filteredFunctions = activeFilter === 'all' ? functions : [activeFilter];

  return (
    <>
      <Hero
        title="AI Use Cases"
        subtitle={`${useCases.length}+ real-world applications of AI across supply chain functions, with proven results from leading companies.`}
        gradient="from-electric-500 to-violet-500"
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
              All ({useCases.length})
            </button>
            {functions.map((fn) => (
              <button
                key={fn}
                onClick={() => setActiveFilter(fn)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === fn
                    ? 'bg-electric-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {fn.split(' ')[0]} ({grouped[fn]?.length || 0})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredFunctions.map((fn) => (
          <div key={fn} className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <Badge label={fn} color={colorMap[fn] || 'blue'} size="md" />
              <span className="text-sm text-slate-500">{grouped[fn]?.length} use cases</span>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {grouped[fn]?.map((uc, i) => {
                const globalIndex = useCases.indexOf(uc);
                const isExpanded = expandedCards.has(globalIndex);

                return (
                  <Card key={i}>
                    <button
                      onClick={() => toggleCard(globalIndex)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-white">{uc.use_case}</h3>
                        <svg
                          className={`ml-2 h-5 w-5 shrink-0 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <p className={`mt-2 text-sm leading-relaxed text-slate-400 ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {uc.description}
                      </p>
                    </button>

                    {isExpanded && (
                      <div className="mt-4 space-y-4 border-t border-white/5 pt-4">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Companies</h4>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {uc.companies_doing_it.map((c) => (
                              <span key={c} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-300">{c}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tools Used</h4>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {uc.tools_used.map((t) => (
                              <span key={t} className="rounded-md bg-electric-500/10 px-2 py-0.5 text-xs text-electric-400">{t}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Results</h4>
                          <p className="mt-1 text-sm font-medium text-emerald-400">{uc.results}</p>
                        </div>
                      </div>
                    )}
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
