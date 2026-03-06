'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ClickStat { resource_name: string; click_type: string; count: number }
interface AdStat { id: string; slot_name: string; title: string; impressions: number; clicks: number }

export default function AdminRevenuePage() {
  const [loading, setLoading] = useState(true);
  const [clickStats, setClickStats] = useState<ClickStat[]>([]);
  const [adStats, setAdStats] = useState<AdStat[]>([]);
  const [totalClicks7d, setTotalClicks7d] = useState(0);
  const [totalClicks30d, setTotalClicks30d] = useState(0);
  const [affiliateClicks30d, setAffiliateClicks30d] = useState(0);
  const [featuredCount, setFeaturedCount] = useState(0);

  useEffect(() => {
    const supabase = createClient();
    const now = new Date();
    const d7 = new Date(now.getTime() - 7 * 86400000).toISOString();
    const d30 = new Date(now.getTime() - 30 * 86400000).toISOString();

    async function load() {
      const [clicks7, clicks30, affiliate30, topClicks, ads, featuredTools, featuredPlatforms] = await Promise.all([
        supabase.from('link_clicks').select('*', { count: 'exact', head: true }).gte('created_at', d7),
        supabase.from('link_clicks').select('*', { count: 'exact', head: true }).gte('created_at', d30),
        supabase.from('link_clicks').select('*', { count: 'exact', head: true }).gte('created_at', d30).eq('click_type', 'affiliate'),
        supabase.from('link_clicks').select('resource_name, click_type').gte('created_at', d30).order('created_at', { ascending: false }).limit(500),
        supabase.from('ad_placements').select('id, slot_name, title, impressions, clicks').order('impressions', { ascending: false }),
        supabase.from('tools').select('*', { count: 'exact', head: true }).eq('is_featured', true),
        supabase.from('platforms').select('*', { count: 'exact', head: true }).eq('is_featured', true),
      ]);

      setTotalClicks7d(clicks7.count || 0);
      setTotalClicks30d(clicks30.count || 0);
      setAffiliateClicks30d(affiliate30.count || 0);
      setFeaturedCount((featuredTools.count || 0) + (featuredPlatforms.count || 0));

      // Aggregate top resources by click count
      if (topClicks.data) {
        const map = new Map<string, ClickStat>();
        for (const c of topClicks.data) {
          const key = c.resource_name || 'Unknown';
          const existing = map.get(key);
          if (existing) {
            existing.count++;
          } else {
            map.set(key, { resource_name: key, click_type: c.click_type, count: 1 });
          }
        }
        setClickStats(Array.from(map.values()).sort((a, b) => b.count - a.count).slice(0, 15));
      }

      setAdStats(ads.data || []);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return <div className="text-slate-400 py-12 text-center">Loading revenue data...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Revenue Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Clicks (7d)', value: totalClicks7d, color: 'text-blue-400' },
          { label: 'Clicks (30d)', value: totalClicks30d, color: 'text-blue-400' },
          { label: 'Affiliate Clicks (30d)', value: affiliateClicks30d, color: 'text-emerald-400' },
          { label: 'Featured Items', value: featuredCount, color: 'text-amber-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#111827] border border-slate-700/50 rounded-xl p-5">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Resources by Clicks */}
        <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Resources by Clicks (30d)</h2>
          {clickStats.length === 0 ? (
            <p className="text-slate-500 text-sm">No click data yet</p>
          ) : (
            <div className="space-y-2">
              {clickStats.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-800 last:border-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm text-white truncate">{s.resource_name}</span>
                    {s.click_type === 'affiliate' && (
                      <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">affiliate</span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-300 ml-3">{s.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ad Performance */}
        <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Ad Performance</h2>
          {adStats.length === 0 ? (
            <p className="text-slate-500 text-sm">No ads configured yet</p>
          ) : (
            <div className="space-y-3">
              {adStats.map((ad) => {
                const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : '0.0';
                return (
                  <div key={ad.id} className="border-b border-slate-800 pb-3 last:border-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{ad.title}</span>
                      <span className="text-xs text-slate-500">{ad.slot_name}</span>
                    </div>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs text-slate-400">{ad.impressions.toLocaleString()} impr.</span>
                      <span className="text-xs text-slate-400">{ad.clicks.toLocaleString()} clicks</span>
                      <span className="text-xs text-emerald-400">{ctr}% CTR</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
