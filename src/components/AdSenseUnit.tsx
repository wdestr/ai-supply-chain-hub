'use client';

import { useEffect, useRef } from 'react';

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

// Map AdBanner slot names → AdSense ad-slot IDs via env vars.
// Set these in Vercel after creating ad units in your AdSense dashboard:
//   NEXT_PUBLIC_ADSENSE_SLOT_TOOLS_TOP, NEXT_PUBLIC_ADSENSE_SLOT_PLATFORMS_TOP,
//   NEXT_PUBLIC_ADSENSE_SLOT_BLOG_TOP, NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT
const SLOT_MAP: Record<string, string | undefined> = {
  'tools-top': process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOLS_TOP,
  'platforms-top': process.env.NEXT_PUBLIC_ADSENSE_SLOT_PLATFORMS_TOP,
  'blog-top': process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_TOP,
};

// Extend window type for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseUnitProps {
  /** Matches AdBanner slot names, e.g. "tools-top" */
  slotName: string;
  className?: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
}

export default function AdSenseUnit({ slotName, className = '', format = 'auto' }: AdSenseUnitProps) {
  const pushed = useRef(false);

  // Resolve slot ID: specific slot → default slot
  const slotId =
    SLOT_MAP[slotName] || process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT;

  useEffect(() => {
    if (!PUBLISHER_ID || !slotId || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet — will be pushed when script loads
    }
  }, [slotId]);

  if (!PUBLISHER_ID || !slotId) return null;

  return (
    <div className={`overflow-hidden rounded-xl ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
