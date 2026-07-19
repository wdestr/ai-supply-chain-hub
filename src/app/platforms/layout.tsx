import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Supply Chain Platforms — Directory',
  description: 'Explore 35+ enterprise AI supply chain platforms for planning, forecasting, logistics, and risk — with capabilities and use cases.',
  alternates: { canonical: '/platforms' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
