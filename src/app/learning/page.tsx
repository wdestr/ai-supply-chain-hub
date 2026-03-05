'use client';

import { useState } from 'react';
import { learningResources, getLearningTypes, getLearningByType } from '@/data/resources';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

const typeLabels: Record<string, string> = {
  course: 'Courses',
  book: 'Books',
  podcast: 'Podcasts',
  community: 'Communities',
  conference: 'Conferences',
  newsletter: 'Newsletters',
};

const typeColors: Record<string, 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'cyan'> = {
  course: 'blue',
  book: 'purple',
  podcast: 'green',
  community: 'amber',
  conference: 'rose',
  newsletter: 'cyan',
};

const levelColors: Record<string, 'blue' | 'green' | 'amber'> = {
  beginner: 'green',
  intermediate: 'amber',
  advanced: 'blue',
};

export default function LearningPage() {
  const types = getLearningTypes();
  const grouped = getLearningByType();
  const [activeType, setActiveType] = useState<string>('all');
  const [costFilter, setCostFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredTypes = activeType === 'all' ? types : [activeType];

  return (
    <>
      <Hero
        title="Learning Resources"
        subtitle={`${learningResources.length}+ curated courses, books, podcasts, communities, and conferences for supply chain AI education.`}
        gradient="from-amber-500 to-rose-500"
      />

      {/* Filters */}
      <section className="sticky top-16 z-40 border-b border-white/10 bg-navy-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {/* Type filter */}
            <button
              onClick={() => setActiveType('all')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                activeType === 'all'
                  ? 'bg-electric-500 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              All ({learningResources.length})
            </button>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeType === type
                    ? 'bg-electric-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {typeLabels[type] || type} ({grouped[type]?.length || 0})
              </button>
            ))}

            <div className="mx-2 w-px bg-white/10" />

            {/* Cost filter */}
            {['all', 'free', 'paid'].map((cost) => (
              <button
                key={cost}
                onClick={() => setCostFilter(cost)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  costFilter === cost
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cost === 'all' ? 'Any Cost' : cost.charAt(0).toUpperCase() + cost.slice(1)}
              </button>
            ))}

            <div className="mx-2 w-px bg-white/10" />

            {/* Level filter */}
            {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setLevelFilter(level)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  levelFilter === level
                    ? 'bg-violet-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {level === 'all' ? 'Any Level' : level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredTypes.map((type) => {
          const resources = (grouped[type] || []).filter(
            (r) =>
              (costFilter === 'all' || r.cost === costFilter) &&
              (levelFilter === 'all' || r.level === levelFilter)
          );

          if (resources.length === 0) return null;

          return (
            <div key={type} className="mb-16">
              <div className="mb-6 flex items-center gap-3">
                <Badge label={typeLabels[type] || type} color={typeColors[type] || 'blue'} size="md" />
                <span className="text-sm text-slate-500">{resources.length} resources</span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resources.map((r) => (
                  <Card key={r.name}>
                    <div className="flex items-start justify-between">
                      <h3 className="text-base font-semibold text-white">{r.name}</h3>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 shrink-0 text-slate-500 transition-colors hover:text-electric-400"
                        aria-label={`Visit ${r.name}`}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{r.description}</p>
                    <div className="mt-4 flex gap-2">
                      <Badge
                        label={r.cost === 'free' ? 'Free' : 'Paid'}
                        color={r.cost === 'free' ? 'green' : 'amber'}
                      />
                      <Badge label={r.level} color={levelColors[r.level] || 'blue'} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
