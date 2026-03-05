'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface PathStat {
  path: string;
  count: number;
}

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [weekViews, setWeekViews] = useState(0);
  const [topPages, setTopPages] = useState<PathStat[]>([]);
  const [recentViews, setRecentViews] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetch() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const [total, todayData, weekData, recent] = await Promise.all([
        supabase.from('page_views').select('*', { count: 'exact', head: true }),
        supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', today),
        supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
        supabase.from('page_views').select('path, created_at').order('created_at', { ascending: false }).limit(50),
      ]);

      setTotalViews(total.count || 0);
      setTodayViews(todayData.count || 0);
      setWeekViews(weekData.count || 0);
      setRecentViews(recent.data || []);

      // Calculate top pages from recent data
      const pathCounts: Record<string, number> = {};
      (recent.data || []).forEach((v: any) => {
        pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
      });
      const sorted = Object.entries(pathCounts)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
      setTopPages(sorted);

      setLoading(false);
    }
    fetch();
  }, [supabase]);

  if (loading) {
    return <div className="text-slate-400 py-20 text-center">Loading analytics...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Analytics</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-5">
          <div className="text-2xl font-bold text-white">{totalViews.toLocaleString()}</div>
          <div className="text-slate-400 text-sm">Total Page Views</div>
        </div>
        <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-5">
          <div className="text-2xl font-bold text-blue-400">{weekViews.toLocaleString()}</div>
          <div className="text-slate-400 text-sm">This Week</div>
        </div>
        <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-5">
          <div className="text-2xl font-bold text-emerald-400">{todayViews.toLocaleString()}</div>
          <div className="text-slate-400 text-sm">Today</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top pages */}
        <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Top Pages (Recent)</h2>
          {topPages.length === 0 ? (
            <p className="text-slate-500 text-sm">No data yet</p>
          ) : (
            <div className="space-y-2">
              {topPages.map((page) => (
                <div key={page.path} className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm font-mono truncate">{page.path}</span>
                  <span className="text-slate-400 text-sm ml-4 shrink-0">{page.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent views */}
        <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Recent Activity</h2>
          {recentViews.length === 0 ? (
            <p className="text-slate-500 text-sm">No page views yet</p>
          ) : (
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
              {recentViews.slice(0, 30).map((view, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-300 font-mono truncate">{view.path}</span>
                  <span className="text-slate-500 text-xs shrink-0 ml-2">
                    {new Date(view.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
