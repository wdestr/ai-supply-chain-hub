import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimit } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  const rateLimited = rateLimit(request, { maxRequests: 5, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }); }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!email || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert(
      { email, active: true, subscribed_at: new Date().toISOString() },
      { onConflict: 'email' }
    );

  if (error) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Subscribed successfully' });
}
