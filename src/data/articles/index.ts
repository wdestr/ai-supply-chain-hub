import { batch1Articles } from './batch1';
import { batch2Articles } from './batch2';

export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
}

const allArticles: Article[] = [...batch1Articles, ...batch2Articles];

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getAllArticles(): Article[] {
  return allArticles;
}

export function getAllArticleSlugs(): string[] {
  return allArticles.map((a) => a.slug);
}

export function getAdjacentArticles(slug: string): { prev: Article | null; next: Article | null } {
  const index = allArticles.findIndex((a) => a.slug === slug);
  return {
    prev: index > 0 ? allArticles[index - 1] : null,
    next: index < allArticles.length - 1 ? allArticles[index + 1] : null,
  };
}

// Map article categories/slugs to relevant resource tags for sidebar suggestions
const articleResourceMap: Record<string, { platformKeywords: string[]; toolKeywords: string[]; useCaseKeywords: string[] }> = {
  'ai-in-supply-chain-101': { platformKeywords: ['Demand Planning', 'End-to-End Planning'], toolKeywords: ['AI/ML Platform', 'Data & Analytics'], useCaseKeywords: ['Demand Planning', 'Procurement'] },
  'how-to-evaluate-ai-tools-supply-chain': { platformKeywords: ['Demand Planning', 'End-to-End Planning'], toolKeywords: ['AI/ML Platform', 'BI & Visualization'], useCaseKeywords: ['Demand Planning'] },
  'building-first-ai-use-case': { platformKeywords: ['Demand Planning'], toolKeywords: ['AI/ML Platform', 'Data & Analytics'], useCaseKeywords: ['Demand Planning', 'Warehouse Operations'] },
  'roi-of-ai-supply-chain': { platformKeywords: ['End-to-End Planning', 'Demand Planning'], toolKeywords: ['Data & Analytics', 'BI & Visualization'], useCaseKeywords: ['Demand Planning', 'Warehouse Operations'] },
  'ai-skills-supply-chain-2025': { platformKeywords: [], toolKeywords: ['AI/ML Platform', 'Data & Analytics'], useCaseKeywords: [] },
  'from-excel-to-ai': { platformKeywords: ['Demand Planning'], toolKeywords: ['BI & Visualization', 'Data & Analytics', 'RPA & Workflow'], useCaseKeywords: ['Demand Planning'] },
  'prompt-engineering-supply-chain': { platformKeywords: [], toolKeywords: ['AI/ML Platform'], useCaseKeywords: [] },
  'computer-vision-warehousing': { platformKeywords: ['Warehouse Robotics'], toolKeywords: ['Computer Vision'], useCaseKeywords: ['Warehouse Operations'] },
  'ai-powered-demand-forecasting': { platformKeywords: ['Demand Planning'], toolKeywords: ['AI/ML Platform', 'Data & Analytics'], useCaseKeywords: ['Demand Planning'] },
  'last-mile-delivery-ai': { platformKeywords: ['Last-Mile Delivery', 'Fleet & Logistics'], toolKeywords: [], useCaseKeywords: ['Last-Mile Delivery', 'Transportation & Fleet'] },
};

export function getArticleResourceTags(slug: string) {
  return articleResourceMap[slug] || { platformKeywords: [], toolKeywords: [], useCaseKeywords: [] };
}
