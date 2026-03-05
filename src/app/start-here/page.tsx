'use client';

import { useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

interface RolePathway {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'cyan';
  firstArticle: {
    title: string;
    slug: string;
    description: string;
  };
  useCases: {
    title: string;
    description: string;
  }[];
  tools: {
    name: string;
    description: string;
  }[];
  platforms: {
    name: string;
    description: string;
  }[];
  learningFocus: string[];
  quickWins: string[];
}

const roles: RolePathway[] = [
  {
    id: 'planner',
    title: 'Supply Chain Planner',
    icon: '📊',
    description: 'Demand planning, S&OP, inventory optimization, and forecast accuracy improvement.',
    color: 'blue',
    firstArticle: {
      title: 'AI-Powered Demand Forecasting',
      slug: 'ai-powered-demand-forecasting',
      description: 'Learn how AI and ML models are transforming demand forecasting accuracy by 20-50% across industries.',
    },
    useCases: [
      { title: 'AI Demand Sensing & Forecasting', description: 'Real-time demand signals to improve forecast accuracy by 20-50%' },
      { title: 'Intelligent Inventory Optimization', description: 'Dynamic safety stock and reorder points driven by ML models' },
      { title: 'S&OP/IBP Process Automation', description: 'AI-assisted scenario planning and consensus forecasting' },
    ],
    tools: [
      { name: 'ChatGPT / Claude', description: 'Analyze demand patterns, clean data, generate exception reports' },
      { name: 'Power BI + Copilot', description: 'AI-enhanced dashboards for demand and inventory KPIs' },
      { name: 'Databricks', description: 'Build custom ML forecasting models on your historical data' },
    ],
    platforms: [
      { name: 'o9 Solutions', description: 'AI-native integrated planning platform with demand sensing' },
      { name: 'RELEX Solutions', description: 'Unified demand forecasting and replenishment optimization' },
      { name: 'Blue Yonder', description: 'Cognitive demand planning with Luminate platform' },
    ],
    learningFocus: [
      'Coursera: AI for Supply Chain Management (Rutgers)',
      'MIT MicroMasters: Supply Chain Analytics',
      'Prompt engineering for demand analysis',
    ],
    quickWins: [
      'Use ChatGPT to analyze your demand variance and identify bias patterns',
      'Build a simple ML forecast in Python to benchmark against your current tool',
      'Set up automated exception alerts using AI assistants for forecast outliers',
    ],
  },
  {
    id: 'procurement',
    title: 'Procurement Specialist',
    icon: '🤝',
    description: 'Spend analytics, supplier management, sourcing strategy, and risk mitigation.',
    color: 'green',
    firstArticle: {
      title: 'How to Evaluate AI Tools for Supply Chain',
      slug: 'how-to-evaluate-ai-tools-supply-chain',
      description: 'A practical framework for assessing AI tools, from quick wins like AI assistants to enterprise platforms.',
    },
    useCases: [
      { title: 'AI-Powered Spend Analytics', description: 'Automatic spend classification and savings opportunity identification' },
      { title: 'Supplier Risk Monitoring', description: 'Real-time risk scoring using news, financial, and geopolitical data' },
      { title: 'Contract Intelligence', description: 'NLP-based contract analysis for compliance and negotiation insights' },
    ],
    tools: [
      { name: 'ChatGPT / Claude', description: 'Analyze supplier proposals, draft RFPs, summarize contracts' },
      { name: 'UiPath / Automation Anywhere', description: 'Automate PO processing, invoice matching, supplier onboarding' },
      { name: 'Tableau + AI', description: 'Visual spend analytics with anomaly detection' },
    ],
    platforms: [
      { name: 'Coupa', description: 'AI-driven spend management with community intelligence' },
      { name: 'SAP Ariba', description: 'Procurement network with AI-powered sourcing and risk' },
      { name: 'Resilinc / Interos.ai', description: 'Multi-tier supplier risk intelligence and mapping' },
    ],
    learningFocus: [
      'CIPS Procurement Excellence program',
      'Spend analysis and category management with AI',
      'Supplier relationship management best practices',
    ],
    quickWins: [
      'Use AI to classify and clean your spend data for immediate category visibility',
      'Set up automated supplier news monitoring with AI alerts',
      'Draft your next RFP using Claude to ensure comprehensive evaluation criteria',
    ],
  },
  {
    id: 'warehouse',
    title: 'Warehouse/Distribution Manager',
    icon: '🏭',
    description: 'Warehouse operations, robotics, picking optimization, and inventory accuracy.',
    color: 'purple',
    firstArticle: {
      title: 'Computer Vision in Warehousing',
      slug: 'computer-vision-warehousing',
      description: 'How computer vision AI is revolutionizing quality inspection, inventory counting, and safety monitoring.',
    },
    useCases: [
      { title: 'Autonomous Mobile Robots (AMRs)', description: 'AI-guided robots for picking, packing, and sortation' },
      { title: 'Computer Vision Quality Inspection', description: 'Automated defect detection and package verification' },
      { title: 'Intelligent Slotting Optimization', description: 'ML-driven warehouse layout and SKU placement optimization' },
    ],
    tools: [
      { name: 'ChatGPT / Claude', description: 'Analyze throughput data, generate SOPs, optimize shift schedules' },
      { name: 'Google Cloud Vision', description: 'Computer vision for label reading, defect detection, counting' },
      { name: 'Power BI + Copilot', description: 'Real-time warehouse performance dashboards' },
    ],
    platforms: [
      { name: 'Locus Robotics', description: 'Collaborative AMRs for picking and warehouse productivity' },
      { name: 'Symbotic', description: 'End-to-end AI-powered warehouse automation system' },
      { name: '6 River Systems', description: 'Collaborative mobile robots for fulfillment operations' },
    ],
    learningFocus: [
      'Warehouse automation ROI frameworks',
      'Introduction to computer vision for operations',
      'Change management for robotics deployment',
    ],
    quickWins: [
      'Use AI to analyze pick path data and identify slotting improvement opportunities',
      'Deploy computer vision on one receiving dock for automated package counting',
      'Build AI-powered dashboards for real-time labor productivity tracking',
    ],
  },
  {
    id: 'transportation',
    title: 'Transportation/Logistics Analyst',
    icon: '🚛',
    description: 'Route optimization, carrier management, freight visibility, and last-mile delivery.',
    color: 'amber',
    firstArticle: {
      title: 'Last-Mile Delivery AI',
      slug: 'last-mile-delivery-ai',
      description: 'Explore how AI is tackling the most expensive and complex part of the supply chain: last-mile delivery.',
    },
    useCases: [
      { title: 'AI Route Optimization', description: 'Dynamic routing considering traffic, weather, time windows, and capacity' },
      { title: 'Real-Time Shipment Visibility', description: 'Predictive ETAs and exception management across modes' },
      { title: 'Freight Rate Prediction', description: 'ML models for spot rate forecasting and carrier negotiations' },
    ],
    tools: [
      { name: 'ChatGPT / Claude', description: 'Analyze carrier performance data, draft RFPs, model lane scenarios' },
      { name: 'Google OR-Tools', description: 'Open-source optimization for routing and scheduling problems' },
      { name: 'Tableau + AI', description: 'Transportation cost analytics and carrier scorecards' },
    ],
    platforms: [
      { name: 'project44', description: 'Real-time visibility with predictive ETAs across all modes' },
      { name: 'FourKites', description: 'End-to-end supply chain visibility and predictive analytics' },
      { name: 'Uber Freight / Convoy', description: 'AI-powered digital freight matching and pricing' },
    ],
    learningFocus: [
      'Operations research and optimization fundamentals',
      'TMS implementation best practices',
      'Last-mile delivery technology landscape',
    ],
    quickWins: [
      'Use AI to analyze your freight spend and identify consolidation opportunities',
      'Set up automated carrier performance scorecards with AI-generated insights',
      'Model your top 20 lanes with route optimization to estimate savings potential',
    ],
  },
  {
    id: 'director',
    title: 'Supply Chain Director/VP',
    icon: '🎯',
    description: 'Strategic AI roadmap, ROI justification, organizational transformation, and vendor selection.',
    color: 'rose',
    firstArticle: {
      title: 'ROI of AI in Supply Chain',
      slug: 'roi-of-ai-supply-chain',
      description: 'A data-driven guide to quantifying the business case for AI across supply chain functions.',
    },
    useCases: [
      { title: 'AI-Powered Control Towers', description: 'End-to-end visibility with predictive analytics and automated exception management' },
      { title: 'Digital Twin Simulation', description: 'Network-wide modeling for scenario planning and risk mitigation' },
      { title: 'Autonomous Planning', description: 'Self-healing supply chains with AI-driven decision automation' },
    ],
    tools: [
      { name: 'ChatGPT / Claude', description: 'Research AI vendors, draft business cases, summarize analyst reports' },
      { name: 'ROI Calculator', description: 'Quantify the financial impact of AI investments across functions' },
      { name: 'Power BI + Copilot', description: 'Executive dashboards for AI initiative tracking' },
    ],
    platforms: [
      { name: 'o9 Solutions', description: 'End-to-end integrated planning and analytics platform' },
      { name: 'Kinaxis', description: 'Concurrent planning with AI for agile decision-making' },
      { name: 'Blue Yonder', description: 'Enterprise-scale cognitive supply chain platform' },
    ],
    learningFocus: [
      'Gartner Supply Chain Symposium / CSCMP EDGE',
      'McKinsey / BCG supply chain AI publications',
      'Executive AI literacy and strategy frameworks',
    ],
    quickWins: [
      'Use the ROI Calculator to build your first AI business case in under 30 minutes',
      'Have AI summarize the latest Gartner Magic Quadrant for your planning needs',
      'Map your top 5 pain points to specific AI use cases using this resource hub',
    ],
  },
  {
    id: 'tech',
    title: 'Technology/Data Team',
    icon: '💻',
    description: 'Platform evaluation, data architecture, ML engineering, and implementation strategy.',
    color: 'cyan',
    firstArticle: {
      title: 'Building Your First AI Use Case',
      slug: 'building-first-ai-use-case',
      description: 'A step-by-step guide to selecting, scoping, and delivering your first supply chain AI pilot project.',
    },
    useCases: [
      { title: 'Data Pipeline Automation', description: 'Automated ETL, data quality monitoring, and feature engineering' },
      { title: 'Custom ML Model Development', description: 'Build proprietary forecasting and optimization models on your data' },
      { title: 'AI/ML Platform Architecture', description: 'Design scalable infrastructure for training, serving, and monitoring models' },
    ],
    tools: [
      { name: 'Databricks / Snowflake', description: 'Unified data lakehouse for ML engineering at scale' },
      { name: 'Python + scikit-learn + PyTorch', description: 'Core ML stack for custom model development' },
      { name: 'MLflow / Weights & Biases', description: 'Experiment tracking, model registry, and deployment' },
    ],
    platforms: [
      { name: 'AWS SageMaker / Azure ML', description: 'Cloud ML platforms for training and deploying models' },
      { name: 'Google Vertex AI', description: 'Managed ML platform with AutoML and custom training' },
      { name: 'Lyric (Palantir for SC)', description: 'Supply chain-specific AI platform for rapid model deployment' },
    ],
    learningFocus: [
      'MLOps and production ML best practices',
      'Supply chain domain knowledge for data teams',
      'API integration patterns for SC platforms',
    ],
    quickWins: [
      'Set up a proof-of-concept ML pipeline for demand forecasting on historical data',
      'Benchmark open-source models against vendor solutions for your top use case',
      'Build a data quality dashboard to identify readiness gaps before platform selection',
    ],
  },
];

export default function StartHerePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const activeRole = roles.find((r) => r.id === selectedRole);

  return (
    <>
      <Hero
        title="Start Here"
        subtitle="New to AI in supply chain? Find the right path based on your role and experience level. We'll guide you to the most relevant content, tools, and resources."
        gradient="from-electric-500 to-amber-500"
      />

      {/* Role Selector */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">What best describes your role?</h2>
          <p className="mt-2 text-sm text-slate-400">
            Select your role below and we will build a personalized learning pathway just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className="text-left"
            >
              <Card
                className={`h-full transition-all ${
                  selectedRole === role.id
                    ? 'border-electric-500/50 bg-electric-500/10 ring-1 ring-electric-500/30'
                    : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{role.icon}</span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{role.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{role.description}</p>
                  </div>
                </div>
                {selectedRole === role.id && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-electric-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Selected — see your pathway below
                  </div>
                )}
              </Card>
            </button>
          ))}
        </div>
      </section>

      {/* Personalized Pathway */}
      {activeRole && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          {/* Pathway Header */}
          <div className="mb-10 rounded-2xl border border-white/10 bg-gradient-to-r from-electric-500/10 to-amber-500/10 p-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeRole.icon}</span>
              <div>
                <Badge label="Your Personalized Pathway" color={activeRole.color} size="md" />
                <h2 className="mt-2 text-2xl font-bold text-white">{activeRole.title} AI Journey</h2>
              </div>
            </div>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-300">
              Here is your recommended path for exploring AI in supply chain. Start with the article below, then explore use cases, tools, and platforms tailored to your role.
            </p>
          </div>

          {/* Step 1: First Article */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-500/15 text-sm font-bold text-electric-400">
                1
              </span>
              <h3 className="text-lg font-bold text-white">Start with This Article</h3>
            </div>
            <Link href={`/blog/${activeRole.firstArticle.slug}`}>
              <Card className="border-electric-500/20 bg-electric-500/[0.04]">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge label="Recommended Read" color={activeRole.color} />
                    <h4 className="mt-2 text-lg font-semibold text-white">{activeRole.firstArticle.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{activeRole.firstArticle.description}</p>
                  </div>
                  <svg className="ml-4 h-5 w-5 shrink-0 text-electric-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            </Link>
          </div>

          {/* Step 2: Use Cases */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-500/15 text-sm font-bold text-electric-400">
                2
              </span>
              <h3 className="text-lg font-bold text-white">Explore Relevant Use Cases</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {activeRole.useCases.map((uc) => (
                <Link key={uc.title} href="/use-cases">
                  <Card className="h-full">
                    <h4 className="text-sm font-semibold text-white">{uc.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{uc.description}</p>
                    <div className="mt-3 text-xs font-medium text-electric-400">View use cases &rarr;</div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Step 3: Tools */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-500/15 text-sm font-bold text-electric-400">
                3
              </span>
              <h3 className="text-lg font-bold text-white">Tools to Explore</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {activeRole.tools.map((tool) => (
                <Link key={tool.name} href="/tools">
                  <Card className="h-full">
                    <h4 className="text-sm font-semibold text-white">{tool.name}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{tool.description}</p>
                    <div className="mt-3 text-xs font-medium text-electric-400">Browse tools &rarr;</div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Step 4: Platforms */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-500/15 text-sm font-bold text-electric-400">
                4
              </span>
              <h3 className="text-lg font-bold text-white">Platforms to Consider</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {activeRole.platforms.map((platform) => (
                <Link key={platform.name} href="/platforms">
                  <Card className="h-full">
                    <h4 className="text-sm font-semibold text-white">{platform.name}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{platform.description}</p>
                    <div className="mt-3 text-xs font-medium text-electric-400">Compare platforms &rarr;</div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Step 5: Learning */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-500/15 text-sm font-bold text-electric-400">
                5
              </span>
              <h3 className="text-lg font-bold text-white">Keep Learning</h3>
            </div>
            <Card>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recommended Learning</h4>
                  <ul className="mt-3 space-y-2">
                    {activeRole.learningFocus.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/learning" className="mt-4 inline-block text-sm font-medium text-electric-400 hover:text-electric-300">
                    Browse all learning resources &rarr;
                  </Link>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quick Wins to Try Today</h4>
                  <ul className="mt-3 space-y-2">
                    {activeRole.quickWins.map((win) => (
                      <li key={win} className="flex items-start gap-2 text-sm text-slate-300">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {win}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Step 6: Assessment CTA */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-500/15 text-sm font-bold text-electric-400">
                6
              </span>
              <h3 className="text-lg font-bold text-white">Assess Your AI Readiness</h3>
            </div>
            <Link href="/assessment">
              <Card className="border-amber-500/20 bg-gradient-to-r from-electric-500/[0.06] to-amber-500/[0.06]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-white">Take the AI Readiness Assessment</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      Answer 6 quick questions to get a personalized score and detailed recommendations for your organization's AI journey.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-electric-500 to-amber-500 px-4 py-2 text-sm font-semibold text-white">
                      Start Assessment
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                  <svg className="hidden h-16 w-16 shrink-0 text-amber-500/20 sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </Card>
            </Link>
          </div>

          {/* Reset / Try Another Role */}
          <div className="text-center">
            <button
              onClick={() => {
                setSelectedRole(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              Choose a different role
            </button>
          </div>
        </section>
      )}

      {/* Bottom CTA when no role selected */}
      {!selectedRole && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <Card hover={false} className="text-center">
            <h3 className="text-lg font-semibold text-white">Not sure where to start?</h3>
            <p className="mt-2 text-sm text-slate-400">
              Take our AI Readiness Assessment to get a personalized score and recommendations.
            </p>
            <Link
              href="/assessment"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-electric-500 to-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Take the Assessment
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </Card>
        </section>
      )}
    </>
  );
}
