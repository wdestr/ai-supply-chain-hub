'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdSenseUnit from '@/components/AdSenseUnit';

interface AdBannerProps {
  slot: string;
  className?: string;
}

interface Ad {
  id: string;
  title: string;
  image_url: string | null;
  destination_url: string;
}

export default function AdBanner({ slot, className = '' }: AdBannerProps) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();
  const tracked = useRef(false);

  useEffect(() => {
    tracked.current = false;
    const supabase = createClient();

    async function fetchAd() {
      const now = new Date().toISOString();
      const { data } = await supabase
        .from('ad_placements')
        .select('id, title, image_url, destination_url')
        .eq('slot_name', slot)
        .eq('is_active', true)
        .or(`starts_at.is.null,starts_at.lte.${now}`)
        .or(`ends_at.is.null,ends_at.gte.${now}`)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setAd(data);
        // Track impression
        if (!tracked.current) {
          tracked.current = true;
          fetch('/api/ad-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ad_id: data.id, event_type: 'impression', referrer_path: pathname }),
          }).catch(() => {});
        }
      }
      setLoaded(true);
    }

    fetchAd();
  }, [slot, pathname]);

  // Show custom Supabase-managed ad (sold directly)
  if (ad) {
    function handleClick() {
      if (!ad) return;
      fetch('/api/ad-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ad_id: ad.id, event_type: 'click', referrer_path: pathname }),
      }).catch(() => {});
    }

    return (
      <div className={`rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden ${className}`}>
        <a
          href={ad.destination_url}
          target="_blank"
          rel="noopener sponsored"
          onClick={handleClick}
          className="block"
        >
          {ad.image_url && (
            <img src={ad.image_url} alt={ad.title} className="w-full object-cover" loading="lazy" />
          )}
          <div className="p-3">
            <p className="text-sm font-medium text-white">{ad.title}</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">Sponsored</p>
          </div>
        </a>
      </div>
    );
  }

  // Fallback: Google AdSense unit (when no direct ad is sold for this slot)
  if (loaded) {
    return <AdSenseUnit slotName={slot} className={className} />;
  }

  return null;
}
