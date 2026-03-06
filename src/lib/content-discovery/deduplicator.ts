import { SupabaseClient } from '@supabase/supabase-js';

export async function isDuplicate(
  supabase: SupabaseClient,
  table: string,
  url: string,
  title: string,
): Promise<boolean> {
  const urlCol = table === 'inspiration_projects' ? 'link' : 'url';
  const titleCol = table === 'inspiration_projects' ? 'project_name' : 'name';

  if (url) {
    const { data } = await supabase
      .from(table)
      .select('id')
      .eq(urlCol, url)
      .limit(1);
    if (data && data.length > 0) return true;
  }

  if (title) {
    const { data } = await supabase
      .from(table)
      .select('id')
      .eq(titleCol, title)
      .limit(1);
    if (data && data.length > 0) return true;
  }

  return false;
}
