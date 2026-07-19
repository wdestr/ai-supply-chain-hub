import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Supply Chain Use Cases',
  description: 'Real-world AI use cases across demand planning, procurement, warehousing, transportation, and last-mile delivery — with examples from leading companies.',
  alternates: { canonical: '/use-cases' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
