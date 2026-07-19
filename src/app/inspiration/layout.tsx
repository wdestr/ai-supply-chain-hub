import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Supply Chain Inspiration — Real Projects',
  description: 'Get inspired by real AI supply chain projects and implementations from operators putting AI into production.',
  alternates: { canonical: '/inspiration' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
