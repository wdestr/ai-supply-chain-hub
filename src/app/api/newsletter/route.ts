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

  // 1. Save to Supabase (always)
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

  // 2. Forward to Beehiiv API if credentials are configured
  const beehiivKey = process.env.BEEHIIV_API_KEY;
  const beehiivPubId = process.env.BEEHIIV_PUBLICATION_ID;

  if (beehiivKey && beehiivPubId) {
    try {
      await fetch(`https://api.beehiiv.com/v2/publications/${beehiivPubId}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${beehiivKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'aischub',
          utm_medium: 'website',
        }),
      });
    } catch {
      // Non-fatal — subscriber is already saved to Supabase
    }
  }

  return NextResponse.json({ message: 'Subscribed successfully' });
}
