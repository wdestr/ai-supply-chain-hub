'use client';

import { createBrowserClient } from '@supabase/ssr';

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // During SSG/prerender, env vars may be placeholders — return a dummy client
  if (!url || !key || url.includes('your_') || !url.startsWith('http')) {
    // Return a minimal no-op client that won't throw during prerender
    return createBrowserClient('https://placeholder.supabase.co', 'placeholder-key');
  }

  client = createBrowserClient(url, key);
  return client;
}
