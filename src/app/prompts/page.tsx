import type { Metadata } from 'next';
import PromptLibraryClient from './PromptLibraryClient';

export const metadata: Metadata = {
  title: 'The Operator\'s Prompt Library — 50 AI Prompts for Small Logistics Businesses',
  description:
    '50 field-tested AI prompts for delivery contractors, small fleets, brokers, and 3PLs — RFP teardowns, claims packets, dispatch triage, SOPs, and more. From The AI Operator\'s Playbook by Wiley Strahan (coming soon). Free.',
  openGraph: {
    title: 'The Operator\'s Prompt Library',
    description: '50 field-tested AI prompts for small logistics operators. Free.',
    images: ['/images/operator/prompts-og.jpg'],
  },
};

export default function PromptsPage() {
  return <PromptLibraryClient />;
}
