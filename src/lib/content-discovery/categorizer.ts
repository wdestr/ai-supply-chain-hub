import { ContentSource, SUPPLY_CHAIN_KEYWORDS } from './sources';
import { FeedItem } from './rss-parser';

export function isRelevant(item: FeedItem, source: ContentSource): boolean {
  const text = `${item.title} ${item.description}`.toLowerCase();

  if (source.relevanceKeywords && source.relevanceKeywords.length > 0) {
    return source.relevanceKeywords.some(kw => text.includes(kw.toLowerCase()));
  }

  return SUPPLY_CHAIN_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
}

export function mapToRow(
  item: FeedItem,
  source: ContentSource,
): Record<string, unknown> {
  const base = {
    status: 'draft',
    source_url: item.url,
    discovered_by: 'cron',
  };

  switch (source.targetTable) {
    case 'tools':
      return {
        ...base,
        category: source.defaults?.category || 'General',
        name: item.title.slice(0, 500),
        url: item.url,
        description: item.description.slice(0, 5000),
        supply_chain_relevance: '',
        pricing_model: '',
      };

    case 'use_cases':
      return {
        ...base,
        function_area: source.defaults?.function_area || 'General',
        name: item.title.slice(0, 500),
        description: item.description.slice(0, 5000),
        companies: [],
        tools_used: [],
        results: '',
        sources: item.url ? [item.url] : [],
      };

    case 'learning_resources':
      return {
        ...base,
        type: source.defaults?.type || 'Blog / Article',
        name: item.title.slice(0, 500),
        url: item.url,
        description: item.description.slice(0, 5000),
        cost: source.defaults?.cost || '',
        level: source.defaults?.level || '',
      };

    case 'platforms':
      return {
        ...base,
        name: item.title.slice(0, 500),
        url: item.url,
        function_area: source.defaults?.function_area || 'General',
        description: item.description.slice(0, 5000),
        founded: '',
        funding: '',
        ai_approach: '',
        key_customers: [],
      };

    case 'inspiration_projects':
      return {
        ...base,
        project_name: item.title.slice(0, 500),
        creator: '',
        description: item.description.slice(0, 5000),
        what_they_built: '',
        tools_used: [],
        link: item.url,
        secondary_links: [],
        category: source.defaults?.category || '',
        why_inspiring: '',
        sc_application: '',
        project_type: source.defaults?.project_type || 'general_ai',
      };

    default:
      throw new Error(`Unknown target table: ${source.targetTable}`);
  }
}
