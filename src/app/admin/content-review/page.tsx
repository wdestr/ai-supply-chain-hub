'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface DraftItem {
  id: string;
  name?: string;
  project_name?: string;
  description?: string;
  source_url?: string;
  discovered_by?: string;
  created_at: string;
  [key: string]: any;
}

const TABLE_LABELS: Record<string, string> = {
  use_cases: 'Use Cases',
  tools: 'Tools',
  platforms: 'Platforms',
  learning_resources: 'Learning Resources',
  inspiration_projects: 'Inspiration Projects',
};

export default function ContentReviewPage() {
  const [drafts, setDrafts] = useState<Record<string, DraftItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);
  const [filter, setFilter] = useState<'draft' | 'rejected'>('draft');

  const supabase = createClient();

  const fetchDrafts = useCallback(async () => {
    setLoading(true);
    const results: Record<string, DraftItem[]> = {};

    for (const table of Object.keys(TABLE_LABELS)) {
      const { data } = await supabase
        .from(table)
        .select('*')
        .eq('status', filter)
        .order('created_at', { ascending: false })
        .limit(50);
      results[table] = data || [];
    }

    setDrafts(results);
    setLoading(false);
  }, [filter, supabase]);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  async function handleAction(table: string, id: string, action: 'approve' | 'reject') {
    setActing(id);
    try {
      const newStatus = action === 'approve' ? 'published' : 'rejected';
      const { error } = await supabase
        .from(table)
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setDrafts(prev => ({
        ...prev,
        [table]: prev[table].filter(item => item.id !== id),
      }));
    } catch {
      alert('Action failed. Please try again.');
    }
    setActing(null);
  }

  async function handleBulkApprove(table: string) {
    const items = drafts[table];
    if (!items?.length) return;
    if (!confirm(`Approve all ${items.length} ${TABLE_LABELS[table]} drafts?`)) return;

    setActing('bulk');
    for (const item of items) {
      await supabase
        .from(table)
        .update({ status: 'published', updated_at: new Date().toISOString() })
        .eq('id', item.id);
    }
    await fetchDrafts();
    setActing(null);
  }

  const totalDrafts = Object.values(drafts).reduce((sum, items) => sum + items.length, 0);

  function getItemName(item: DraftItem): string {
    return item.name || item.project_name || 'Untitled';
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Review</h1>
          <p className="text-slate-400 text-sm mt-1">
            {loading ? 'Loading...' : `${totalDrafts} item${totalDrafts !== 1 ? 's' : ''} pending review`}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('draft')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === 'draft'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Drafts
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === 'rejected'
                ? 'bg-red-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : totalDrafts === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg">No {filter} items to review</p>
          <p className="text-sm mt-1">New content discovered by the weekly cron job will appear here.</p>
        </div>
      ) : (
        Object.entries(drafts).map(([table, items]) => {
          if (items.length === 0) return null;
          return (
            <div key={table} className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white">
                  {TABLE_LABELS[table]} ({items.length})
                </h2>
                {filter === 'draft' && items.length > 1 && (
                  <button
                    onClick={() => handleBulkApprove(table)}
                    disabled={acting === 'bulk'}
                    className="text-xs px-3 py-1 bg-green-600/20 text-green-400 hover:bg-green-600/30 rounded transition-colors disabled:opacity-50"
                  >
                    Approve All
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="bg-[#111827] border border-slate-700/50 rounded-lg p-4 flex items-start gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium truncate">{getItemName(item)}</h3>
                        {item.discovered_by && (
                          <span className="text-xs px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded">
                            {item.discovered_by}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        {item.source_url && (
                          <a
                            href={item.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors truncate max-w-xs"
                          >
                            {item.source_url}
                          </a>
                        )}
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {filter === 'draft' && (
                        <>
                          <button
                            onClick={() => handleAction(table, item.id, 'approve')}
                            disabled={acting === item.id}
                            className="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(table, item.id, 'reject')}
                            disabled={acting === item.id}
                            className="px-3 py-1.5 text-sm bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {filter === 'rejected' && (
                        <button
                          onClick={() => handleAction(table, item.id, 'approve')}
                          disabled={acting === item.id}
                          className="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
