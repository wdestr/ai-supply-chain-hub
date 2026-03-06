import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin, safeError } from '@/lib/api-auth';

const VALID_TABLES = ['use_cases', 'tools', 'platforms', 'learning_resources', 'inspiration_projects'] as const;
type ValidTable = (typeof VALID_TABLES)[number];

export async function GET(request: NextRequest) {
  const authResult = await requireAdmin(request);
  if (authResult instanceof NextResponse) return authResult;

  const supabase = createAdminClient();
  const status = request.nextUrl.searchParams.get('status') || 'draft';

  if (!['draft', 'published', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const results: Record<string, any[]> = {};

  for (const table of VALID_TABLES) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) return safeError();
    results[table] = data || [];
  }

  return NextResponse.json({ data: results });
}

export async function PATCH(request: NextRequest) {
  const authResult = await requireAdmin(request);
  if (authResult instanceof NextResponse) return authResult;

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { table, id, action } = body;

  if (!table || !VALID_TABLES.includes(table as ValidTable)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  // Validate UUID format to prevent injection
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!id || typeof id !== 'string' || !UUID_REGEX.test(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  if (!['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action, must be approve or reject' }, { status: 400 });
  }

  const newStatus = action === 'approve' ? 'published' : 'rejected';
  const supabase = createAdminClient();

  const { error } = await supabase
    .from(table)
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return safeError();

  return NextResponse.json({ success: true, status: newStatus });
}
