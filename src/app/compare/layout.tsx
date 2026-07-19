import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare AI Supply Chain Platforms',
  description: 'Side-by-side comparison of 35+ AI supply chain platforms — capabilities, functions, and fit for demand planning, logistics, and inventory.',
  alternates: { canonical: '/compare' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
