import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Readiness Assessment for Supply Chain',
  description: 'Take the free AI readiness assessment to benchmark your supply chain organization and get a tailored roadmap for adopting AI.',
  alternates: { canonical: '/assessment' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
