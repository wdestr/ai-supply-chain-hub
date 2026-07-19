import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Here — Your Guide to AI in Supply Chain',
  description: 'New to AI in supply chain? Start here for a curated path through the tools, platforms, use cases, and guides that matter most.',
  alternates: { canonical: '/start-here' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
