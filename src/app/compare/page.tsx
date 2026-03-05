'use client';

import { useState } from 'react';
import { platforms } from '@/data/resources';
import Hero from '@/components/Hero';
import Badge from '@/components/Badge';

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);

  const togglePlatform = (name: string) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : prev.length < 3
          ? [...prev, name]
          : prev
    );
  };

  const selectedPlatforms = platforms.filter((p) => selected.includes(p.name));

  return (
    <>
      <Hero
        title="Compare Platforms"
        subtitle="Select up to 3 platforms to compare side-by-side. Evaluate features, funding, customers, and AI approaches."
        gradient="from-cyan-500 to-electric-500"
      />

      {/* Selection */}
      <section className="sticky top-16 z-40 border-b border-white/10 bg-navy-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-sm text-slate-500">{selected.length}/3 selected:</span>
            <div className="flex flex-wrap gap-2">
              {selected.length === 0 && (
                <span className="text-sm text-slate-600">Choose platforms below to compare</span>
              )}
              {selected.map((name) => (
                <button
                  key={name}
                  onClick={() => togglePlatform(name)}
                  className="flex items-center gap-1.5 rounded-full bg-electric-500/15 px-3 py-1 text-sm font-medium text-electric-400 transition-colors hover:bg-electric-500/25"
                >
                  {name}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ))}
            </div>
            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                className="ml-auto shrink-0 text-xs text-slate-500 hover:text-white"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      {selectedPlatforms.length >= 2 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Attribute</th>
                  {selectedPlatforms.map((p) => (
                    <th key={p.name} className="px-6 py-4 text-left text-sm font-bold text-white">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-400">Function</td>
                  {selectedPlatforms.map((p) => (
                    <td key={p.name} className="px-6 py-4"><Badge label={p.function} color="blue" /></td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-400">Founded</td>
                  {selectedPlatforms.map((p) => (
                    <td key={p.name} className="px-6 py-4 text-sm text-slate-300">{p.founded}</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-400">Funding</td>
                  {selectedPlatforms.map((p) => (
                    <td key={p.name} className="px-6 py-4 text-sm font-medium text-emerald-400">{p.funding}</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-400">Description</td>
                  {selectedPlatforms.map((p) => (
                    <td key={p.name} className="px-6 py-4 text-sm leading-relaxed text-slate-300">{p.description}</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-400">AI Approach</td>
                  {selectedPlatforms.map((p) => (
                    <td key={p.name} className="px-6 py-4 text-sm leading-relaxed text-slate-300">{p.ai_approach}</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-400">Key Customers</td>
                  {selectedPlatforms.map((p) => (
                    <td key={p.name} className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {p.key_customers.map((c) => (
                          <span key={c} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-300">{c}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-400">Website</td>
                  {selectedPlatforms.map((p) => (
                    <td key={p.name} className="px-6 py-4">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm text-electric-400 hover:text-electric-300">
                        Visit site &rarr;
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Platform Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-lg font-semibold text-white">
          {selected.length < 3 ? 'Select platforms to compare' : 'Maximum 3 platforms selected'}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {platforms.map((p) => {
            const isSelected = selected.includes(p.name);
            const isDisabled = !isSelected && selected.length >= 3;

            return (
              <button
                key={p.name}
                onClick={() => !isDisabled && togglePlatform(p.name)}
                disabled={isDisabled}
                className={`rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-electric-500/50 bg-electric-500/10'
                    : isDisabled
                      ? 'cursor-not-allowed border-white/5 bg-white/[0.01] opacity-40'
                      : 'border-white/10 bg-white/[0.03] hover:border-electric-500/30 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-white">{p.name}</h3>
                  <div className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                    isSelected ? 'border-electric-500 bg-electric-500' : 'border-white/20 bg-transparent'
                  }`}>
                    {isSelected && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-xs text-slate-500">{p.function}</p>
                <p className="mt-1 text-xs text-emerald-500">{p.funding.split('(')[0].trim()}</p>
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}
