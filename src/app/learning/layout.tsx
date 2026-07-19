import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn AI for Supply Chain — Courses & Resources',
  description: 'Curated courses, certifications, and learning resources to build AI skills for supply chain and logistics professionals.',
  alternates: { canonical: '/learning' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
