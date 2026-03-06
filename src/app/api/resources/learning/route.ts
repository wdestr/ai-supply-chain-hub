import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin, validateFields, safeError, rateLimit } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const rateLimited = rateLimit(request, { maxRequests: 30, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  const supabase = createAdminClient();
  const { searchParams } = request.nextUrl;

  const type = searchParams.get('type');
  const level = searchParams.get('level');
  const cost = searchParams.get('cost');
  const search = searchParams.get('q');
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '100') || 100, 1), 200);
  const offset = Math.max(parseInt(searchParams.get('offset') || '0') || 0, 0);

  if (search && search.length > 500) {
    return NextResponse.json({ error: 'Search query too long' }, { status: 400 });
  }

  let query = supabase
    .from('learning_resources')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('type')
    .range(offset, offset + limit - 1);

  if (type) query = query.eq('type', type);
  if (level) query = query.eq('level', level);
  if (cost) query = query.eq('cost', cost);
  if (search) query = query.textSearch('fts', search, { type: 'websearch' });

  const { data, error, count } = await query;
  if (error) return safeError();

  return NextResponse.json({ data, total: count });
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdmin(request);
  if (authResult instanceof NextResponse) return authResult;

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const validationError = validateFields(body, [
    { field: 'type', required: true, type: 'string', maxLength: 100 },
    { field: 'name', required: true, type: 'string', maxLength: 500 },
    { field: 'url', type: 'url', maxLength: 2000 },
    { field: 'description', type: 'string', maxLength: 5000 },
    { field: 'cost', type: 'string', maxLength: 100 },
    { field: 'level', type: 'string', maxLength: 100 },
  ]);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const safe = {
    type: body.type,
    name: body.name,
    url: body.url || '',
    description: body.description || '',
    cost: body.cost || '',
    level: body.level || '',
  };

  const supabase = createAdminClient();
  const { data, error } = await supabase.from('learning_resources').insert(safe).select().single();
  if (error) return safeError();

  return NextResponse.json({ data }, { status: 201 });
}
