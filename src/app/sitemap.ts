import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aischub.com';
  const articles = getAllArticles();

  const staticPages = [
    '', '/use-cases', '/tools', '/platforms', '/learning', '/blog',
    '/assessment', '/roi-calculator', '/compare', '/glossary',
    '/start-here', '/inspiration', '/contact', '/advertise',
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

  return [...staticEntries, ...articleEntries];
}
