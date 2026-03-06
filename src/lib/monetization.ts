import { createClient } from '@/lib/supabase/client';
import type { MonetizationFields } from '@/types';

/**
 * Fetches monetization overlay data (affiliate URLs, featured status) from the database.
 * Returns a Map keyed by resource name for fast lookup against static JSON data.
 */
export async function fetchMonetizationData(
  table: 'tools' | 'platforms'
): Promise<Map<string, MonetizationFields>> {
  const supabase = createClient();
  const { data } = await supabase
    .from(table)
    .select('id, name, affiliate_url, is_featured, featured_priority, sponsor_label')
    .or('affiliate_url.neq.,is_featured.eq.true')
    .eq('status', 'published');

  const map = new Map<string, MonetizationFields>();
  if (data) {
    for (const item of data) {
      map.set(item.name, {
        id: item.id,
        affiliate_url: item.affiliate_url,
        is_featured: item.is_featured,
        featured_priority: item.featured_priority,
        sponsor_label: item.sponsor_label,
      });
    }
  }
  return map;
}
