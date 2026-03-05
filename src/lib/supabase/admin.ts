import { createClient } from '@supabase/supabase-js';

// Service role client — use only in server-side code (API routes, scripts)
// This bypasses Row Level Security
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!url || !key || url.includes('your_') || !url.startsWith('http')) {
    return createClient('https://placeholder.supabase.co', 'placeholder-key');
  }

  return createClient(url, key);
}
