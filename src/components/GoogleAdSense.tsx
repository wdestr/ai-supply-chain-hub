'use client';

import Script from 'next/script';

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

/**
 * Loads the Google AdSense global script.
 * Requires NEXT_PUBLIC_ADSENSE_PUBLISHER_ID env var (format: ca-pub-XXXXXXXXXXXXXXXX).
 * Add this to layout.tsx alongside <GoogleAnalytics />.
 */
export default function GoogleAdSense() {
  if (!PUBLISHER_ID) return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
