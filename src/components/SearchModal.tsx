'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useCases, generalTools, platforms, learningResources, contentOutlines } from '@/data/resources';
import { allProjects } from '@/data/inspiration';

interface SearchResult {
  type: 'use-case' | 'tool' | 'platform' | 'learning' | 'article' | 'project';
  title: string;
  subtitle: string;
  href: string;
}

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  useCases.forEach((uc) => {
    results.push({
      type: 'use-case',
      title: uc.use_case,
      subtitle: uc.function,
      href: '/use-cases',
    });
  });

  generalTools.forEach((t) => {
    results.push({
      type: 'tool',
      title: t.name,
      subtitle: t.category,
      href: '/tools',
    });
  });

  platforms.forEach((p) => {
    results.push({
      type: 'platform',
      title: p.name,
      subtitle: p.function,
      href: '/platforms',
    });
  });

  learningResources.forEach((r) => {
    results.push({
      type: 'learning',
      title: r.name,
      subtitle: `${r.type} · ${r.level} · ${r.cost}`,
      href: '/learning',
    });
  });

  contentOutlines.forEach((a) => {
    results.push({
      type: 'article',
      title: a.title,
      subtitle: 'Blog Article',
      href: `/blog/${a.slug}`,
    });
  });

  allProjects.forEach((p) => {
    results.push({
      type: 'project',
      title: p.project_name,
      subtitle: `by ${p.creator} · ${p.category}`,
      href: '/inspiration',
    });
  });

  return results;
}

const typeColors: Record<string, string> = {
  'use-case': 'bg-electric-500/15 text-electric-400',
  tool: 'bg-violet-500/15 text-violet-400',
  platform: 'bg-emerald-500/15 text-emerald-400',
  learning: 'bg-amber-500/15 text-amber-400',
  article: 'bg-rose-500/15 text-rose-400',
  project: 'bg-cyan-500/15 text-cyan-400',
};

const typeLabels: Record<string, string> = {
  'use-case': 'Use Case',
  tool: 'Tool',
  platform: 'Platform',
  learning: 'Learning',
  article: 'Article',
  project: 'Project',
};

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchIndex = useMemo(() => buildSearchIndex(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [query, searchIndex]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-navy-900 shadow-2xl shadow-black/50">
        {/* Search input */}
        <div className="flex items-center border-b border-white/10 px-4">
          <svg className="mr-3 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search use cases, tools, platforms, articles..."
            className="flex-1 bg-transparent py-4 text-base text-white outline-none placeholder:text-slate-500"
          />
          <kbd className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-500">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {query.trim() && results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {results.map((r, i) => (
            <Link
              key={`${r.type}-${i}`}
              href={r.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
            >
              <span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${typeColors[r.type]}`}>
                {typeLabels[r.type]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white">{r.title}</div>
                <div className="truncate text-xs text-slate-500">{r.subtitle}</div>
              </div>
              <svg className="h-4 w-4 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Footer */}
        {!query.trim() && (
          <div className="border-t border-white/10 px-4 py-3">
            <p className="text-xs text-slate-500">
              Search across {searchIndex.length} resources — use cases, tools, platforms, courses, and articles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function SearchButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}
