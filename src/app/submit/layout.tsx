import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit a Resource — AISCHub',
  description: 'Submit an AI supply chain tool, platform, or resource to be featured in the AISCHub directory.',
  alternates: { canonical: '/submit' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
