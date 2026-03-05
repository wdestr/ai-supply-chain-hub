import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimit } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  const rateLimited = rateLimit(request, { maxRequests: 3, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }); }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim().slice(0, 500) : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 5000) : '';

  if (!email || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  }

  if (!message || message.length < 10) {
    return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('contact_submissions')
    .insert({ name, email, subject, message });

  if (error) {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Message sent successfully' });
}
