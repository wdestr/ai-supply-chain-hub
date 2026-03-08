'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const initialized = useRef(false);

  // Initialize GA4: set up dataLayer FIRST, then load the script
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || initialized.current) return;
    initialized.current = true;

    // 1. Set up dataLayer and gtag function BEFORE loading the script
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
      send_page_view: true,
    });

    // 2. Now load gtag.js — it will process the dataLayer entries above
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Track page views on client-side route changes
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
