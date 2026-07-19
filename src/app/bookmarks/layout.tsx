import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Bookmarks — AISCHub',
  description: 'Your saved AI supply chain tools, platforms, and resources.',
  alternates: { canonical: '/bookmarks' },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
