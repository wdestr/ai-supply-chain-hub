import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimit, safeError } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const rateLimited = rateLimit(request, { maxRequests: 20, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  const query = request.nextUrl.searchParams.get('q');

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ error: 'Query must be at least 2 characters' }, { status: 400 });
  }

  if (query.length > 500) {
    return NextResponse.json({ error: 'Search query too long' }, { status: 400 });
  }

  const searchTerm = query.trim();
  const supabase = createAdminClient();

  const [useCases, tools, platforms, learning, inspiration] = await Promise.all([
    supabase
      .from('use_cases')
      .select('id, name, function_area, description')
      .eq('status', 'published')
      .textSearch('fts', searchTerm, { type: 'websearch' })
      .limit(10),
    supabase
      .from('tools')
      .select('id, name, category, description')
      .eq('status', 'published')
      .textSearch('fts', searchTerm, { type: 'websearch' })
      .limit(10),
    supabase
      .from('platforms')
      .select('id, name, function_area, description')
      .eq('status', 'published')
      .textSearch('fts', searchTerm, { type: 'websearch' })
      .limit(10),
    supabase
      .from('learning_resources')
      .select('id, name, type, description')
      .eq('status', 'published')
      .textSearch('fts', searchTerm, { type: 'websearch' })
      .limit(10),
    supabase
      .from('inspiration_projects')
      .select('id, project_name, category, description')
      .eq('status', 'published')
      .textSearch('fts', searchTerm, { type: 'websearch' })
      .limit(10),
  ]);

  const anyError = [useCases, tools, platforms, learning, inspiration].some(r => r.error);
  if (anyError) return safeError();

  const results = {
    use_cases: (useCases.data || []).map(r => ({ ...r, type: 'use_case' })),
    tools: (tools.data || []).map(r => ({ ...r, type: 'tool' })),
    platforms: (platforms.data || []).map(r => ({ ...r, type: 'platform' })),
    learning: (learning.data || []).map(r => ({ ...r, type: 'learning' })),
    inspiration: (inspiration.data || []).map(r => ({ ...r, type: 'project' })),
  };

  const totalResults =
    results.use_cases.length +
    results.tools.length +
    results.platforms.length +
    results.learning.length +
    results.inspiration.length;

  return NextResponse.json({ results, total: totalResults });
}
