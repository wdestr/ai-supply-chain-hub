import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin, validateFields, safeError } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  const { searchParams } = request.nextUrl;

  const functionArea = searchParams.get('function');
  const search = searchParams.get('q');
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '100') || 100, 1), 200);
  const offset = Math.max(parseInt(searchParams.get('offset') || '0') || 0, 0);

  if (search && search.length > 500) {
    return NextResponse.json({ error: 'Search query too long' }, { status: 400 });
  }

  let query = supabase
    .from('use_cases')
    .select('*', { count: 'exact' })
    .order('function_area')
    .range(offset, offset + limit - 1);

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
    { field: 'function_area', required: true, type: 'string', maxLength: 200 },
    { field: 'name', required: true, type: 'string', maxLength: 500 },
    { field: 'description', type: 'string', maxLength: 5000 },
    { field: 'results', type: 'string', maxLength: 2000 },
    { field: 'companies', type: 'array' },
    { field: 'tools_used', type: 'array' },
    { field: 'sources', type: 'array' },
  ]);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  // Only allow known fields
  const safe = {
    function_area: body.function_area,
    name: body.name,
    description: body.description || '',
    companies: Array.isArray(body.companies) ? body.companies.slice(0, 50) : [],
    tools_used: Array.isArray(body.tools_used) ? body.tools_used.slice(0, 50) : [],
    results: body.results || '',
    sources: Array.isArray(body.sources) ? body.sources.slice(0, 20) : [],
  };

  const supabase = createAdminClient();
  const { data, error } = await supabase.from('use_cases').insert(safe).select().single();
  if (error) return safeError();

  return NextResponse.json({ data }, { status: 201 });
}
