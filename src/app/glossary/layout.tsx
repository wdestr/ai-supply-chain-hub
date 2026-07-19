import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Supply Chain Glossary — Key Terms Explained',
  description: 'Plain-English definitions of AI, machine learning, and supply chain terms — from demand sensing to digital twins and generative AI.',
  alternates: { canonical: '/glossary' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
