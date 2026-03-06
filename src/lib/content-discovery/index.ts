import { SupabaseClient } from '@supabase/supabase-js';
import { CONTENT_SOURCES } from './sources';
import { parseFeed } from './rss-parser';
import { isDuplicate } from './deduplicator';
import { isRelevant, mapToRow } from './categorizer';

export interface DiscoveryResult {
  sourcesChecked: number;
  itemsDiscovered: number;
  itemsInserted: number;
  itemsSkippedDuplicate: number;
  summary: Record<string, { discovered: number; inserted: number; skipped: number; errors: string[] }>;
}

export async function discoverContent(supabase: SupabaseClient): Promise<DiscoveryResult> {
  const result: DiscoveryResult = {
    sourcesChecked: 0,
    itemsDiscovered: 0,
    itemsInserted: 0,
    itemsSkippedDuplicate: 0,
    summary: {},
  };

  for (const source of CONTENT_SOURCES) {
    const sourceResult = { discovered: 0, inserted: 0, skipped: 0, errors: [] as string[] };

    try {
      const items = await parseFeed(source.url);
      result.sourcesChecked++;

      const relevant = items.filter(item => isRelevant(item, source));
      sourceResult.discovered = relevant.length;
      result.itemsDiscovered += relevant.length;

      for (const item of relevant.slice(0, 10)) {
        try {
          const duplicate = await isDuplicate(supabase, source.targetTable, item.url, item.title);

          if (duplicate) {
            sourceResult.skipped++;
            result.itemsSkippedDuplicate++;
            continue;
          }

          const row = mapToRow(item, source);
          const { error } = await supabase.from(source.targetTable).insert(row);

          if (error) {
            sourceResult.errors.push(`Insert failed: ${error.message}`);
          } else {
            sourceResult.inserted++;
            result.itemsInserted++;
          }
        } catch (itemErr) {
          sourceResult.errors.push(
            `Item "${item.title.slice(0, 50)}": ${itemErr instanceof Error ? itemErr.message : 'Unknown'}`
          );
        }
      }
    } catch (feedErr) {
      sourceResult.errors.push(
        `Feed fetch failed: ${feedErr instanceof Error ? feedErr.message : 'Unknown'}`
      );
    }

    result.summary[source.name] = sourceResult;
  }

  return result;
}
