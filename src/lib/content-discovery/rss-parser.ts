export interface FeedItem {
  title: string;
  url: string;
  description: string;
  publishedAt: string | null;
}

export async function parseFeed(feedUrl: string): Promise<FeedItem[]> {
  const response = await fetch(feedUrl, {
    headers: { 'User-Agent': 'AIScHub-ContentBot/1.0' },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Feed fetch failed: ${response.status} ${feedUrl}`);
  }

  const xml = await response.text();
  const items: FeedItem[] = [];

  // Try RSS 2.0 <item> elements
  const rssItems = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
  for (const itemXml of rssItems) {
    items.push({
      title: extractTag(itemXml, 'title'),
      url: extractTag(itemXml, 'link') || extractTag(itemXml, 'guid'),
      description: stripHtml(extractTag(itemXml, 'description')),
      publishedAt: extractTag(itemXml, 'pubDate') || null,
    });
  }

  // If no RSS items, try Atom <entry> elements
  if (items.length === 0) {
    const atomEntries = xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
    for (const entryXml of atomEntries) {
      const linkMatch = entryXml.match(/<link[^>]+href=["']([^"']+)["']/i);
      items.push({
        title: extractTag(entryXml, 'title'),
        url: linkMatch?.[1] || '',
        description: stripHtml(extractTag(entryXml, 'summary') || extractTag(entryXml, 'content')),
        publishedAt: extractTag(entryXml, 'published') || extractTag(entryXml, 'updated') || null,
      });
    }
  }

  return items.filter(item => item.title && item.url);
}

function extractTag(xml: string, tag: string): string {
  const cdataPattern = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`, 'i');
  const cdataMatch = xml.match(cdataPattern);
  if (cdataMatch) return cdataMatch[1].trim();

  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = xml.match(pattern);
  return match ? match[1].trim() : '';
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 2000);
}
