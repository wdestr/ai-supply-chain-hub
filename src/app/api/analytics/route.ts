import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimit } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  const rateLimited = rateLimit(request, { maxRequests: 30, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }); }

  const path = typeof body.path === 'string' ? body.path.trim().slice(0, 500) : '';
  const referrer = typeof body.referrer === 'string' ? body.referrer.trim().slice(0, 2000) : null;

  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }

  const supabase = createAdminClient();
  // Fire and forget — don't block the response
  supabase
    .from('page_views')
    .insert({ path, referrer })
    .then(() => {});

  return NextResponse.json({ ok: true });
}
