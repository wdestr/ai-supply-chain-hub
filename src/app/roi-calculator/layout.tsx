import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Supply Chain ROI Calculator',
  description: 'Estimate the ROI of AI in your supply chain — model forecast accuracy gains, inventory reduction, and cost savings in minutes.',
  alternates: { canonical: '/roi-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
