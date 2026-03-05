'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      setSubmissions(data || []);
      setLoading(false);
    }
    fetch();
  }, [supabase]);

  async function markRead(id: string) {
    await supabase.from('contact_submissions').update({ read: true }).eq('id', id);
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, read: true } : s)));
  }

  if (loading) {
    return <div className="text-slate-400 py-20 text-center">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Contact Submissions ({submissions.length})</h1>

      {submissions.length === 0 ? (
        <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-12 text-center text-slate-400">
          No submissions yet
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className={`bg-[#111827] border rounded-xl transition-colors ${
                sub.read ? 'border-slate-700/50' : 'border-blue-500/30 bg-blue-500/5'
              }`}
            >
              <button
                onClick={() => { setExpanded(expanded === sub.id ? null : sub.id); if (!sub.read) markRead(sub.id); }}
                className="w-full text-left px-5 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {!sub.read && <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />}
                  <div>
                    <span className="text-white font-medium">{sub.name || 'Anonymous'}</span>
                    <span className="text-slate-500 text-sm ml-2">{sub.email}</span>
                    {sub.subject && <span className="text-slate-400 text-sm ml-2">— {sub.subject}</span>}
                  </div>
                </div>
                <span className="text-slate-500 text-xs">{new Date(sub.created_at).toLocaleDateString()}</span>
              </button>

              {expanded === sub.id && (
                <div className="px-5 pb-4 border-t border-slate-700/50 pt-3">
                  <p className="text-slate-300 text-sm whitespace-pre-wrap">{sub.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
