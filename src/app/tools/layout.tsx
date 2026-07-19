import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Supply Chain Tools — Curated Directory',
  description: 'Browse curated AI tools for supply chain: analytics, ML platforms, computer vision, RPA, and BI. Compare capabilities, pricing, and use cases.',
  alternates: { canonical: '/tools' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
