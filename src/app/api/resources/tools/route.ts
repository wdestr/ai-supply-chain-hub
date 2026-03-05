import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin, validateFields, safeError } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  const { searchParams } = request.nextUrl;

  const category = searchParams.get('category');
  const search = searchParams.get('q');
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '100') || 100, 1), 200);
  const offset = Math.max(parseInt(searchParams.get('offset') || '0') || 0, 0);

  if (search && search.length > 500) return NextResponse.json({ error: 'Search query too long' }, { status: 400 });

  let query = supabase.from('tools').select('*', { count: 'exact' }).order('category').range(offset, offset + limit - 1);
  if (category) query = query.eq('category', category);
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
    { field: 'category', required: true, type: 'string', maxLength: 200 },
    { field: 'name', required: true, type: 'string', maxLength: 500 },
    { field: 'url', type: 'url', maxLength: 2000 },
    { field: 'description', type: 'string', maxLength: 5000 },
    { field: 'supply_chain_relevance', type: 'string', maxLength: 5000 },
    { field: 'pricing_model', type: 'string', maxLength: 500 },
  ]);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const safe = { category: body.category, name: body.name, url: body.url || '', description: body.description || '', supply_chain_relevance: body.supply_chain_relevance || '', pricing_model: body.pricing_model || '' };

  const supabase = createAdminClient();
  const { data, error } = await supabase.from('tools').insert(safe).select().single();
  if (error) return safeError();

  return NextResponse.json({ data }, { status: 201 });
}
