import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimit } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  const rateLimited = rateLimit(request, { maxRequests: 60, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const ad_id = typeof body.ad_id === 'string' ? body.ad_id.trim() : '';
  const event_type = body.event_type === 'click' ? 'click' : 'impression';
  const referrer_path = typeof body.referrer_path === 'string' ? body.referrer_path.trim().slice(0, 500) : null;

  if (!ad_id) {
    return NextResponse.json({ error: 'ad_id required' }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Insert granular event
  supabase.from('ad_events').insert({ ad_id, event_type, referrer_path })
    .then(({ error }) => {
      if (error) console.error('Ad event insert failed:', error.message);
    });

  // Increment counter on ad_placements for quick dashboard reads
  supabase.rpc('increment_ad_counter', { p_ad_id: ad_id, p_field: event_type === 'click' ? 'clicks' : 'impressions' })
    .then(({ error }) => {
      if (error) console.error('Ad counter increment failed:', error.message);
    });

  return NextResponse.json({ ok: true });
}
