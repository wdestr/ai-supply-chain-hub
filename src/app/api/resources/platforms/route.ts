import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin, validateFields, safeError, rateLimit } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const rateLimited = rateLimit(request, { maxRequests: 30, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  const supabase = createAdminClient();
  const { searchParams } = request.nextUrl;

  const functionArea = searchParams.get('function');
  const search = searchParams.get('q');
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '100') || 100, 1), 200);
  const offset = Math.max(parseInt(searchParams.get('offset') || '0') || 0, 0);

  if (search && search.length > 500) return NextResponse.json({ error: 'Search query too long' }, { status: 400 });

  let query = supabase.from('platforms').select('*', { count: 'exact' }).eq('status', 'published').order('name').range(offset, offset + limit - 1);
  if (functionArea) query = query.eq('function_area', functionArea);
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
    { field: 'name', required: true, type: 'string', maxLength: 500 },
    { field: 'function_area', required: true, type: 'string', maxLength: 200 },
    { field: 'url', type: 'url', maxLength: 2000 },
    { field: 'description', type: 'string', maxLength: 5000 },
    { field: 'founded', type: 'string', maxLength: 50 },
    { field: 'funding', type: 'string', maxLength: 200 },
    { field: 'ai_approach', type: 'string', maxLength: 5000 },
    { field: 'key_customers', type: 'array' },
    { field: 'affiliate_url', type: 'url', maxLength: 2000 },
    { field: 'is_featured', type: 'boolean' },
    { field: 'featured_priority', type: 'number' },
    { field: 'sponsor_label', type: 'string', maxLength: 200 },
  ]);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const safe = {
    name: body.name, function_area: body.function_area, url: body.url || '', description: body.description || '',
    founded: body.founded || '', funding: body.funding || '', ai_approach: body.ai_approach || '',
    key_customers: Array.isArray(body.key_customers) ? body.key_customers.slice(0, 50) : [],
    affiliate_url: body.affiliate_url || null, is_featured: !!body.is_featured,
    featured_priority: typeof body.featured_priority === 'number' ? body.featured_priority : 0,
    sponsor_label: body.sponsor_label || null,
  };

  const supabase = createAdminClient();
  const { data, error } = await supabase.from('platforms').insert(safe).select().single();
  if (error) return safeError();

  return NextResponse.json({ data }, { status: 201 });
}
