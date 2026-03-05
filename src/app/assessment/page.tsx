'use client';

import { useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Card from '@/components/Card';

interface Question {
  id: string;
  question: string;
  options: { label: string; score: number; detail: string }[];
}

const questions: Question[] = [
  {
    id: 'data_quality',
    question: 'How would you rate your supply chain data quality?',
    options: [
      { label: 'Mostly in spreadsheets, lots of manual entry', score: 1, detail: 'Siloed, inconsistent data across systems' },
      { label: 'Centralized ERP but many data gaps', score: 2, detail: 'Single system of record but quality issues' },
      { label: 'Clean data in ERP/WMS/TMS, some automation', score: 3, detail: 'Good foundation with room for improvement' },
      { label: 'Integrated data warehouse, high quality, governed', score: 4, detail: 'Analytics-ready data infrastructure' },
    ],
  },
  {
    id: 'tech_maturity',
    question: 'What tools does your team primarily use today?',
    options: [
      { label: 'Excel and email', score: 1, detail: 'Manual processes, spreadsheet-driven' },
      { label: 'ERP + Excel, some BI dashboards', score: 2, detail: 'Basic system with reporting layer' },
      { label: 'Modern ERP + BI + some AI features', score: 3, detail: 'Modern stack with emerging AI capabilities' },
      { label: 'AI-enabled platforms with advanced analytics', score: 4, detail: 'Mature AI/ML adoption already underway' },
    ],
  },
  {
    id: 'team_skills',
    question: 'What is your team\'s current AI/data literacy?',
    options: [
      { label: 'Limited — most are Excel-focused', score: 1, detail: 'Need foundational AI education' },
      { label: 'Some BI skills, curious about AI', score: 2, detail: 'Ready for structured AI learning' },
      { label: 'Data-literate, some using AI assistants', score: 3, detail: 'Ready for advanced tool adoption' },
      { label: 'Strong analytics skills, some data science', score: 4, detail: 'Ready for custom ML and advanced platforms' },
    ],
  },
  {
    id: 'leadership',
    question: 'How does your leadership view AI investment?',
    options: [
      { label: 'Skeptical or unaware', score: 1, detail: 'Need to build the business case from scratch' },
      { label: 'Interested but no budget allocated', score: 2, detail: 'Open to pilots, need ROI justification' },
      { label: 'Actively exploring, some budget available', score: 3, detail: 'Ready for structured pilot programs' },
      { label: 'Committed with dedicated AI/digital budget', score: 4, detail: 'Ready for scaled deployment' },
    ],
  },
  {
    id: 'pain_points',
    question: 'What is your biggest supply chain challenge?',
    options: [
      { label: 'Forecast accuracy — always too high or too low', score: 2, detail: 'AI demand sensing can deliver 20-50% improvement' },
      { label: 'Visibility — don\'t know where things are', score: 3, detail: 'Real-time tracking platforms can solve this quickly' },
      { label: 'Manual processes eating up planner time', score: 2, detail: 'RPA and AI assistants for quick wins' },
      { label: 'Supplier risks and disruption management', score: 3, detail: 'AI risk platforms provide early warning' },
    ],
  },
  {
    id: 'budget',
    question: 'What is your realistic AI budget for the next 12 months?',
    options: [
      { label: 'Under $10K — just exploring', score: 1, detail: 'Focus on free tools and AI assistants' },
      { label: '$10K–$100K — ready for a pilot', score: 2, detail: 'SaaS pilots and consultant-supported POCs' },
      { label: '$100K–$500K — serious investment', score: 3, detail: 'Purpose-built platform implementation' },
      { label: '$500K+ — enterprise commitment', score: 4, detail: 'Full platform deployment with change management' },
    ],
  },
];

interface ResultTier {
  level: string;
  color: string;
  title: string;
  description: string;
  recommendations: string[];
  nextSteps: { label: string; href: string }[];
}

function getResult(score: number): ResultTier {
  if (score <= 10) {
    return {
      level: 'Foundation',
      color: 'from-amber-500 to-rose-500',
      title: 'Building Your Foundation',
      description: 'Your organization is at the early stages of AI readiness. The good news: there are immediate, low-cost steps you can take to start building capabilities and demonstrating value.',
      recommendations: [
        'Start with AI assistants (ChatGPT, Claude) for data analysis and report generation — zero infrastructure required',
        'Invest in data quality: clean up your master data, standardize formats, eliminate spreadsheet silos',
        'Take a free Coursera course on AI in Supply Chain to build team literacy',
        'Identify one high-pain, data-rich process as your first AI candidate (demand forecasting is usually the best bet)',
        'Build the business case using our ROI calculator to get leadership buy-in',
      ],
      nextSteps: [
        { label: 'Read: From Excel to AI', href: '/blog/from-excel-to-ai' },
        { label: 'Read: AI in Supply Chain 101', href: '/blog/ai-in-supply-chain-101' },
        { label: 'Try the ROI Calculator', href: '/roi-calculator' },
        { label: 'Explore Free Learning', href: '/learning' },
      ],
    };
  }
  if (score <= 16) {
    return {
      level: 'Emerging',
      color: 'from-electric-500 to-cyan-500',
      title: 'Ready for Your First AI Pilot',
      description: 'You have the foundational elements in place. Your next move is to run a focused pilot project that demonstrates measurable ROI and builds organizational momentum.',
      recommendations: [
        'Choose your first use case carefully — demand forecasting or inventory optimization typically offer the clearest ROI',
        'Evaluate purpose-built platforms (Blue Yonder, o9 Solutions, RELEX) against your specific needs',
        'Run a 6-8 week proof of concept with clear success metrics before committing to a platform',
        'Upskill 2-3 team members as AI champions who can bridge business and technology',
        'Develop a prompt engineering practice with AI assistants for immediate productivity gains',
      ],
      nextSteps: [
        { label: 'Read: Building Your First AI Use Case', href: '/blog/building-first-ai-use-case' },
        { label: 'Read: How to Evaluate AI Tools', href: '/blog/how-to-evaluate-ai-tools-supply-chain' },
        { label: 'Compare Platforms', href: '/compare' },
        { label: 'Explore Use Cases', href: '/use-cases' },
      ],
    };
  }
  if (score <= 20) {
    return {
      level: 'Advancing',
      color: 'from-emerald-500 to-electric-500',
      title: 'Scale and Optimize Your AI Stack',
      description: 'Your organization has strong AI readiness. Focus on scaling successful pilots, deepening platform capabilities, and building a comprehensive AI-powered supply chain.',
      recommendations: [
        'Scale proven pilots across more SKUs, regions, or business units',
        'Integrate AI insights into S&OP/IBP processes for cross-functional impact',
        'Add supply chain visibility (project44, FourKites) and risk management (Resilinc, Interos.ai) layers',
        'Build a Center of Excellence to share best practices and coordinate AI investments',
        'Explore advanced use cases: control towers, digital twins, autonomous planning',
      ],
      nextSteps: [
        { label: 'Read: ROI of AI in Supply Chain', href: '/blog/roi-of-ai-supply-chain' },
        { label: 'Read: AI-Powered Demand Forecasting', href: '/blog/ai-powered-demand-forecasting' },
        { label: 'Browse All Platforms', href: '/platforms' },
        { label: 'Explore Advanced Use Cases', href: '/use-cases' },
      ],
    };
  }
  return {
    level: 'Leading',
    color: 'from-violet-500 to-rose-500',
    title: 'Push the Frontier',
    description: 'Your organization is among the most AI-mature in supply chain. Focus on cutting-edge capabilities, ecosystem integration, and becoming a competitive moat through AI.',
    recommendations: [
      'Explore agentic AI and autonomous decision-making (Uber Freight runs 30+ AI agents across shipment lifecycle)',
      'Implement digital twins for network-wide simulation and optimization (NVIDIA Omniverse, Siemens Tecnomatix)',
      'Deploy computer vision and robotics (Symbotic, Locus Robotics) for warehouse automation',
      'Build custom ML models on your proprietary data for competitive advantage (Lyric, Databricks)',
      'Lead industry conversations — present at Gartner Supply Chain Symposium, CSCMP EDGE',
    ],
    nextSteps: [
      { label: 'Read: Computer Vision in Warehousing', href: '/blog/computer-vision-warehousing' },
      { label: 'Read: Last-Mile Delivery AI', href: '/blog/last-mile-delivery-ai' },
      { label: 'Explore Warehouse Robotics', href: '/platforms' },
      { label: 'Advanced Learning Resources', href: '/learning' },
    ],
  };
}

export default function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const progress = (Object.keys(answers).length / questions.length) * 100;
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <>
      <Hero
        title="AI Readiness Assessment"
        subtitle="Answer 6 quick questions to find out where you stand and get a personalized roadmap for AI adoption in your supply chain."
        gradient="from-violet-500 to-amber-500"
      />

      {!showResults ? (
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex justify-between text-sm text-slate-500">
              <span>{Object.keys(answers).length} of {questions.length} questions</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-electric-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-10">
            {questions.map((q, qi) => (
              <div key={q.id}>
                <h3 className="text-lg font-semibold text-white">
                  <span className="mr-2 text-electric-400">{qi + 1}.</span>
                  {q.question}
                </h3>
                <div className="mt-4 space-y-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = answers[q.id] === opt.score && answers[`${q.id}_idx`] === oi;
                    return (
                      <button
                        key={oi}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.score, [`${q.id}_idx`]: oi }))}
                        className={`w-full rounded-xl border p-4 text-left transition-all ${
                          isSelected
                            ? 'border-electric-500/50 bg-electric-500/10'
                            : 'border-white/10 bg-white/[0.02] hover:border-electric-500/30 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="text-sm font-medium text-white">{opt.label}</div>
                        <div className="mt-0.5 text-xs text-slate-500">{opt.detail}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="mt-12 text-center">
            <button
              onClick={() => allAnswered && setShowResults(true)}
              disabled={!allAnswered}
              className={`inline-flex items-center justify-center rounded-xl px-8 py-3 text-base font-semibold transition-all ${
                allAnswered
                  ? 'bg-gradient-to-r from-electric-500 to-emerald-500 text-white hover:opacity-90 hover:shadow-lg hover:shadow-electric-500/25'
                  : 'cursor-not-allowed bg-white/5 text-slate-600'
              }`}
            >
              Get My Results
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Score */}
          <div className={`rounded-2xl bg-gradient-to-r ${result.color} p-[1px]`}>
            <div className="rounded-2xl bg-navy-950 p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
                  <span className="text-2xl font-bold text-white">{totalScore}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-400">Your Readiness Level</div>
                  <h2 className="text-2xl font-bold text-white">{result.level}: {result.title}</h2>
                </div>
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-300">{result.description}</p>
            </div>
          </div>

          {/* Recommendations */}
          <Card className="mt-8">
            <h3 className="text-lg font-bold text-white">Your Personalized Recommendations</h3>
            <ul className="mt-4 space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric-500/15 text-xs font-bold text-electric-400">
                    {i + 1}
                  </span>
                  {rec}
                </li>
              ))}
            </ul>
          </Card>

          {/* Next Steps */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white">Recommended Next Steps</h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {result.nextSteps.map((step) => (
                <Link key={step.href} href={step.href}>
                  <Card className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{step.label}</span>
                    <svg className="h-4 w-4 text-electric-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Retake */}
          <div className="mt-10 text-center">
            <button
              onClick={() => { setAnswers({}); setShowResults(false); }}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              Retake Assessment
            </button>
          </div>
        </section>
      )}
    </>
  );
}
