import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimit } from '@/lib/api-auth';

// GET /api/rate?type=tool&id=make-formerly-integromat
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  if (!type || !id) {
    return NextResponse.json({ error: 'type and id are required' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('tool_ratings')
    .select('rating')
    .eq('resource_type', type)
    .eq('resource_id', id);

  if (error) {
    return NextResponse.json({ average: 0, count: 0 });
  }

  const count = data.length;
  const average = count > 0
    ? Math.round((data.reduce((sum, r) => sum + r.rating, 0) / count) * 10) / 10
    : 0;

  return NextResponse.json({ average, count });
}

// POST /api/rate
export async function POST(request: NextRequest) {
  const rateLimited = rateLimit(request, { maxRequests: 10, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid body' }, { status: 400 }); }

  const type = typeof body.type === 'string' ? body.type : '';
  const id = typeof body.id === 'string' ? body.id.trim().slice(0, 200) : '';
  const rating = Number(body.rating);

  if (!['tool', 'platform'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be 1-5' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('tool_ratings')
    .insert({ resource_type: type, resource_id: id, rating });

  if (error) {
    return NextResponse.json({ error: 'Failed to save rating' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
