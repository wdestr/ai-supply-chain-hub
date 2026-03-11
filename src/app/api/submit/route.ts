import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimit } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  const rateLimited = rateLimit(request, { maxRequests: 5, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }); }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : '';
  const url = typeof body.url === 'string' ? body.url.trim().slice(0, 500) : '';
  const category = typeof body.category === 'string' ? body.category.trim().slice(0, 100) : '';
  const description = typeof body.description === 'string' ? body.description.trim().slice(0, 2000) : '';
  const contact_email = typeof body.contact_email === 'string' ? body.contact_email.trim().toLowerCase() : '';
  const pricing_model = typeof body.pricing_model === 'string' ? body.pricing_model.trim().slice(0, 100) : '';
  const supply_chain_relevance = typeof body.supply_chain_relevance === 'string' ? body.supply_chain_relevance.trim().slice(0, 2000) : '';

  if (!name || name.length < 2) {
    return NextResponse.json({ error: 'Tool/platform name is required' }, { status: 400 });
  }

  if (!url || !/^https?:\/\/.+/.test(url)) {
    return NextResponse.json({ error: 'Valid URL is required' }, { status: 400 });
  }

  if (!contact_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) {
    return NextResponse.json({ error: 'Valid contact email is required' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('tool_submissions')
    .insert({ name, url, category, description, contact_email, pricing_model, supply_chain_relevance, status: 'pending' });

  if (error) {
    console.error('Submit error:', error);
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Submission received successfully' });
}
