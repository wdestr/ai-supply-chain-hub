import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin, validateFields, safeError, rateLimit } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const rateLimited = rateLimit(request, { maxRequests: 30, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  const supabase = createAdminClient();
  const { searchParams } = request.nextUrl;

  const category = searchParams.get('category');
  const projectType = searchParams.get('type');
  const search = searchParams.get('q');
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '100') || 100, 1), 200);
  const offset = Math.max(parseInt(searchParams.get('offset') || '0') || 0, 0);

  if (search && search.length > 500) {
    return NextResponse.json({ error: 'Search query too long' }, { status: 400 });
  }

  let query = supabase
    .from('inspiration_projects')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('project_name')
    .range(offset, offset + limit - 1);

  if (category) query = query.eq('category', category);
  if (projectType) query = query.eq('project_type', projectType);
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
    { field: 'project_name', required: true, type: 'string', maxLength: 500 },
    { field: 'creator', type: 'string', maxLength: 200 },
    { field: 'description', type: 'string', maxLength: 5000 },
    { field: 'what_they_built', type: 'string', maxLength: 5000 },
    { field: 'tools_used', type: 'array' },
    { field: 'link', type: 'url', maxLength: 2000 },
    { field: 'secondary_links', type: 'array' },
    { field: 'category', type: 'string', maxLength: 200 },
    { field: 'why_inspiring', type: 'string', maxLength: 5000 },
    { field: 'sc_application', type: 'string', maxLength: 5000 },
  ]);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const safe = {
    project_name: body.project_name,
    creator: body.creator || '',
    description: body.description || '',
    what_they_built: body.what_they_built || '',
    tools_used: Array.isArray(body.tools_used) ? body.tools_used.slice(0, 50) : [],
    link: body.link || '',
    secondary_links: Array.isArray(body.secondary_links) ? body.secondary_links.slice(0, 20) : [],
    category: body.category || '',
    why_inspiring: body.why_inspiring || '',
    sc_application: body.sc_application || '',
  };

  const supabase = createAdminClient();
  const { data, error } = await supabase.from('inspiration_projects').insert(safe).select().single();
  if (error) return safeError();

  return NextResponse.json({ data }, { status: 201 });
}
