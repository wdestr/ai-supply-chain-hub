'use client';

import Script from 'next/script';

// Publisher ID: A6304849 (wileystrahan@gmail.com on impact.com)
// Automatically transforms outbound links to affiliated brands (Coursera, etc.)
// into tracked affiliate links without manual URL changes.
const PUBLISHER_TAG_URL = 'https://utt.impactcdn.com/P-A6304849-9978-45fa-a5b9-b4d3784faca41.js';

export default function ImpactPublisherTag() {
  return (
    <Script
      src={PUBLISHER_TAG_URL}
      strategy="afterInteractive"
    />
  );
}
