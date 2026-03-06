import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimit } from '@/lib/api-auth';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const rateLimited = rateLimit(request, { maxRequests: 60, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const resource_type = typeof body.resource_type === 'string' ? body.resource_type.trim() : '';
  const resource_id = typeof body.resource_id === 'string' ? body.resource_id.trim() : '';
  const resource_name = typeof body.resource_name === 'string' ? body.resource_name.trim().slice(0, 500) : null;
  const click_type = body.click_type === 'affiliate' ? 'affiliate' : 'outbound';
  const referrer_path = typeof body.referrer_path === 'string' ? body.referrer_path.trim().slice(0, 500) : null;

  if (!resource_type || !resource_id || !['tool', 'platform'].includes(resource_type)) {
    return NextResponse.json({ error: 'resource_type and resource_id required' }, { status: 400 });
  }

  // Hash IP for dedup without storing raw IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const ip_hash = crypto.createHash('sha256').update(ip + resource_id).digest('hex').slice(0, 16);

  const supabase = createAdminClient();
  supabase
    .from('link_clicks')
    .insert({ resource_type, resource_id, resource_name, click_type, referrer_path, ip_hash })
    .then(({ error }) => {
      if (error) console.error('Click tracking insert failed:', error.message);
    });

  return NextResponse.json({ ok: true });
}
