import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin, safeError } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const authResult = await requireAdmin(request);
  if (authResult instanceof NextResponse) return authResult;

  const supabase = createAdminClient();

  const [
    useCases,
    tools,
    platforms,
    learning,
    inspiration,
    subscribers,
    contacts,
    recentViews,
    totalViews,
  ] = await Promise.all([
    supabase.from('use_cases').select('*', { count: 'exact', head: true }),
    supabase.from('tools').select('*', { count: 'exact', head: true }),
    supabase.from('platforms').select('*', { count: 'exact', head: true }),
    supabase.from('learning_resources').select('*', { count: 'exact', head: true }),
    supabase.from('inspiration_projects').select('*', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('read', false),
    supabase
      .from('page_views')
      .select('path, created_at')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(20),
    supabase.from('page_views').select('*', { count: 'exact', head: true }),
  ]);

  // Check for any query errors
  const anyError = [useCases, tools, platforms, learning, inspiration, subscribers, contacts, recentViews, totalViews].some(r => r.error);
  if (anyError) return safeError();

  // Top pages (last 7 days)
  const { data: topPages } = await supabase.rpc('get_top_pages', {
    days_back: 7,
    page_limit: 10,
  }).maybeSingle() || { data: null };

  return NextResponse.json({
    resources: {
      use_cases: useCases.count || 0,
      tools: tools.count || 0,
      platforms: platforms.count || 0,
      learning_resources: learning.count || 0,
      inspiration_projects: inspiration.count || 0,
      total: (useCases.count || 0) + (tools.count || 0) + (platforms.count || 0) + (learning.count || 0) + (inspiration.count || 0),
    },
    newsletter_subscribers: subscribers.count || 0,
    unread_contacts: contacts.count || 0,
    total_page_views: totalViews.count || 0,
    recent_views: recentViews.data || [],
    top_pages: topPages || [],
  });
}
