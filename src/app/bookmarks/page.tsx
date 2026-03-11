'use client';

import Link from 'next/link';
import { useBookmarks } from '@/lib/useBookmarks';
import Badge from '@/components/Badge';
import Card from '@/components/Card';

export default function BookmarksPage() {
  const { bookmarks, remove, hydrated } = useBookmarks();

  const tools = bookmarks.filter((b) => b.type === 'tool').sort((a, b) => b.savedAt - a.savedAt);
  const plats = bookmarks.filter((b) => b.type === 'platform').sort((a, b) => b.savedAt - a.savedAt);

  if (!hydrated) {
    return (
      <section className="pt-20 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center text-slate-500 py-24">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Saved Resources</h1>
          <p className="mt-2 text-slate-400">
            {bookmarks.length > 0
              ? `${bookmarks.length} saved item${bookmarks.length !== 1 ? 's' : ''}`
              : 'No saved items yet'}
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
            <div className="text-4xl mb-4">🔖</div>
            <h2 className="text-lg font-semibold text-white mb-2">Nothing saved yet</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
              Click the bookmark icon on any tool or platform to save it here for quick access.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/tools" className="text-sm text-electric-400 hover:text-electric-300 transition-colors">
                Browse Tools →
              </Link>
              <Link href="/platforms" className="text-sm text-electric-400 hover:text-electric-300 transition-colors">
                Browse Platforms →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {tools.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Badge label="Tools" color="blue" />
                  <span className="text-slate-500 text-sm font-normal">{tools.length} saved</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tools.map((b) => (
                    <Card key={b.id}>
                      <div className="flex items-start justify-between">
                        <Link href={`/tools/${b.id}`} className="text-sm font-semibold text-white hover:text-electric-400 transition-colors">
                          {b.name}
                        </Link>
                        <button
                          onClick={() => remove(b.id)}
                          className="ml-2 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Remove"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">{b.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {plats.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Badge label="Platforms" color="purple" />
                  <span className="text-slate-500 text-sm font-normal">{plats.length} saved</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {plats.map((b) => (
                    <Card key={b.id}>
                      <div className="flex items-start justify-between">
                        <Link href={`/platforms/${b.id}`} className="text-sm font-semibold text-white hover:text-electric-400 transition-colors">
                          {b.name}
                        </Link>
                        <button
                          onClick={() => remove(b.id)}
                          className="ml-2 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Remove"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">{b.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
