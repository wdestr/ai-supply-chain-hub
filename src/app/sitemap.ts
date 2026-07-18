import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/data/articles';
import { getAllToolSlugs, getAllPlatformSlugs } from '@/data/resources';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').trim() || 'https://aischub.com';
  const articles = getAllArticles();
  const toolSlugs = getAllToolSlugs();
  const platformSlugs = getAllPlatformSlugs();

  const staticPages = [
    '', '/use-cases', '/tools', '/tools/operator', '/prompts', '/platforms', '/learning', '/blog',
    '/assessment', '/roi-calculator', '/compare', '/glossary',
    '/start-here', '/inspiration', '/contact', '/advertise', '/submit',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const toolEntries: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const platformEntries: MetadataRoute.Sitemap = platformSlugs.map((slug) => ({
    url: `${baseUrl}/platforms/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries, ...toolEntries, ...platformEntries];
}
