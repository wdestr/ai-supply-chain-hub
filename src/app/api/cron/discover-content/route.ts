import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { safeError } from '@/lib/api-auth';
import { discoverContent } from '@/lib/content-discovery';
import { timingSafeEqual } from 'crypto';

function verifyBearerToken(header: string | null, secret: string | undefined): boolean {
  if (!secret || !header) return false;
  const token = header.replace(/^Bearer\s+/i, '');
  if (!token) return false;
  try {
    const a = Buffer.from(token);
    const b = Buffer.from(secret);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  if (!verifyBearerToken(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: run, error: runError } = await supabase
    .from('content_discovery_runs')
    .insert({ status: 'running' })
    .select()
    .single();

  if (runError || !run) return safeError();

  try {
    const result = await discoverContent(supabase);

    await supabase
      .from('content_discovery_runs')
      .update({
        completed_at: new Date().toISOString(),
        status: 'completed',
        sources_checked: result.sourcesChecked,
        items_discovered: result.itemsDiscovered,
        items_inserted: result.itemsInserted,
        items_skipped_duplicate: result.itemsSkippedDuplicate,
        summary: result.summary,
      })
      .eq('id', run.id);

    return NextResponse.json({ success: true, runId: run.id, ...result });
  } catch (err) {
    await supabase
      .from('content_discovery_runs')
      .update({
        completed_at: new Date().toISOString(),
        status: 'failed',
        error_message: err instanceof Error ? err.message : 'Unknown error',
      })
      .eq('id', run.id);

    return safeError();
  }
}
