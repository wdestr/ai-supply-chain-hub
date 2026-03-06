export interface ContentSource {
  name: string;
  url: string;
  type: 'rss' | 'atom';
  targetTable: 'tools' | 'learning_resources' | 'use_cases' | 'platforms' | 'inspiration_projects';
  relevanceKeywords?: string[];
  defaults?: Record<string, string>;
}

export const CONTENT_SOURCES: ContentSource[] = [
  // Supply Chain + AI News → use_cases
  {
    name: 'Supply Chain Brain',
    url: 'https://www.supplychainbrain.com/rss',
    type: 'rss',
    targetTable: 'use_cases',
    relevanceKeywords: ['AI', 'artificial intelligence', 'machine learning', 'automation', 'predictive', 'generative'],
    defaults: { function_area: 'General' },
  },
  {
    name: 'Supply Chain Dive',
    url: 'https://www.supplychaindive.com/feeds/news/',
    type: 'rss',
    targetTable: 'use_cases',
    relevanceKeywords: ['AI', 'artificial intelligence', 'machine learning', 'automation', 'predictive', 'digital'],
    defaults: { function_area: 'General' },
  },
  {
    name: 'Logistics Management',
    url: 'https://www.logisticsmgmt.com/rss',
    type: 'rss',
    targetTable: 'use_cases',
    relevanceKeywords: ['AI', 'artificial intelligence', 'machine learning', 'automation', 'robotics'],
    defaults: { function_area: 'Transportation & Logistics' },
  },

  // AI Tool Discovery → tools
  {
    name: 'MIT Technology Review - AI',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed',
    type: 'rss',
    targetTable: 'tools',
    relevanceKeywords: ['supply chain', 'logistics', 'forecasting', 'warehouse', 'procurement', 'inventory'],
    defaults: { category: 'AI/ML Development Platforms' },
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/category/ai/feed/',
    type: 'rss',
    targetTable: 'tools',
    relevanceKeywords: ['supply chain', 'logistics', 'enterprise', 'operations', 'planning'],
    defaults: { category: 'AI/ML Development Platforms' },
  },

  // Learning Resources
  {
    name: 'Towards Data Science',
    url: 'https://towardsdatascience.com/feed',
    type: 'rss',
    targetTable: 'learning_resources',
    relevanceKeywords: ['supply chain', 'logistics', 'demand forecast', 'inventory', 'operations research'],
    defaults: { type: 'Blog / Article', cost: 'Free', level: 'Intermediate' },
  },

  // Inspiration Projects
  {
    name: 'GitHub Supply Chain AI',
    url: 'https://rsshub.app/github/search/repos/supply+chain+AI/stars',
    type: 'rss',
    targetTable: 'inspiration_projects',
    defaults: { category: 'Open Source', project_type: 'general_ai' },
  },
];

export const SUPPLY_CHAIN_KEYWORDS = [
  'supply chain', 'logistics', 'warehouse', 'inventory', 'procurement',
  'demand forecast', 'demand planning', 'transportation', 'freight',
  'distribution', 'fulfillment', 'last mile', 'S&OP', 'IBP',
  'sourcing', 'supplier', 'manufacturing', 'production planning',
  'quality control', 'reverse logistics', 'returns management',
  'cold chain', 'track and trace', 'visibility',
];
