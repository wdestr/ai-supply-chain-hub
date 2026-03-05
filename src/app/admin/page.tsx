'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  resources: { use_cases: number; tools: number; platforms: number; learning_resources: number; inspiration_projects: number; total: number };
  newsletter_subscribers: number;
  unread_contacts: number;
  total_page_views: number;
  recent_views: { path: string; created_at: string }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-slate-400">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-20">
        <div className="text-slate-400 mb-2">Could not load dashboard stats</div>
        <p className="text-slate-500 text-sm">Make sure Supabase is configured and the database is seeded.</p>
      </div>
    );
  }

  const cards = [
    { label: 'Use Cases', value: stats.resources.use_cases, href: '/admin/use-cases', color: 'blue' },
    { label: 'Tools', value: stats.resources.tools, href: '/admin/tools', color: 'emerald' },
    { label: 'Platforms', value: stats.resources.platforms, href: '/admin/platforms', color: 'violet' },
    { label: 'Learning', value: stats.resources.learning_resources, href: '/admin/learning', color: 'amber' },
    { label: 'Inspiration', value: stats.resources.inspiration_projects, href: '/admin/inspiration', color: 'cyan' },
    { label: 'Total Resources', value: stats.resources.total, href: '#', color: 'slate' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      {/* Resource stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-[#111827] border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-colors"
          >
            <div className="text-2xl font-bold text-white">{card.value}</div>
            <div className="text-slate-400 text-xs mt-1">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Engagement stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/admin/newsletter" className="bg-[#111827] border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-colors">
          <div className="text-xl font-bold text-emerald-400">{stats.newsletter_subscribers}</div>
          <div className="text-slate-400 text-sm">Newsletter Subscribers</div>
        </Link>
        <Link href="/admin/contact" className="bg-[#111827] border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-colors">
          <div className="text-xl font-bold text-amber-400">{stats.unread_contacts}</div>
          <div className="text-slate-400 text-sm">Unread Messages</div>
        </Link>
        <Link href="/admin/analytics" className="bg-[#111827] border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-colors">
          <div className="text-xl font-bold text-blue-400">{stats.total_page_views}</div>
          <div className="text-slate-400 text-sm">Total Page Views</div>
        </Link>
      </div>

      {/* Recent activity */}
      <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-slate-300 mb-3">Recent Page Views (24h)</h2>
        {stats.recent_views.length === 0 ? (
          <p className="text-slate-500 text-sm">No page views recorded yet.</p>
        ) : (
          <div className="space-y-1.5">
            {stats.recent_views.map((view, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-slate-300 font-mono">{view.path}</span>
                <span className="text-slate-500 text-xs">{new Date(view.created_at).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
