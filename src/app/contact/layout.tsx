import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — AISCHub',
  description: 'Get in touch with AISCHub, the AI in supply chain resource hub — questions, partnerships, and vendor listings.',
  alternates: { canonical: '/contact' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
