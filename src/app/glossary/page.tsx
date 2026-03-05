'use client';

import { useState, useMemo } from 'react';
import Hero from '@/components/Hero';
import Card from '@/components/Card';

type GlossaryCategory = 'ai' | 'supply-chain' | 'business';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: GlossaryCategory;
}

const glossaryTerms: GlossaryTerm[] = [
  // AI/ML Terms
  {
    term: 'Agentic AI',
    definition:
      'AI systems that can autonomously plan, reason, and execute multi-step tasks with minimal human intervention. In supply chain, agentic AI can independently handle exception management, reroute shipments, or adjust procurement orders based on real-time conditions.',
    category: 'ai',
  },
  {
    term: 'Algorithm',
    definition:
      'A step-by-step procedure or set of rules for solving a problem or performing a computation. In supply chain AI, algorithms drive everything from route optimization to demand forecasting models.',
    category: 'ai',
  },
  {
    term: 'Anomaly Detection',
    definition:
      'A technique used to identify unusual patterns or outliers in data that do not conform to expected behavior. Critical for detecting supply chain disruptions, quality defects, fraud, or equipment failures before they escalate.',
    category: 'ai',
  },
  {
    term: 'Computer Vision',
    definition:
      'A field of AI that enables machines to interpret and understand visual information from images or video. Used in warehouses for automated quality inspection, inventory counting, package dimensioning, and autonomous vehicle navigation.',
    category: 'ai',
  },
  {
    term: 'Deep Learning',
    definition:
      'A subset of machine learning based on artificial neural networks with multiple layers (deep architectures). Excels at recognizing complex patterns in large datasets, powering applications like demand forecasting, image recognition in warehouses, and natural language processing.',
    category: 'ai',
  },
  {
    term: 'Digital Twin',
    definition:
      'A virtual replica of a physical asset, process, or system that is continuously updated with real-time data. In supply chain, digital twins simulate warehouse layouts, transportation networks, or entire supply chain ecosystems to test scenarios and optimize performance without real-world risk.',
    category: 'ai',
  },
  {
    term: 'Edge Computing',
    definition:
      'Processing data near the source of generation rather than in a centralized cloud data center. Enables real-time AI inference at warehouses, factories, and distribution centers for time-sensitive decisions like quality control and equipment monitoring.',
    category: 'ai',
  },
  {
    term: 'Feature Engineering',
    definition:
      'The process of selecting, transforming, and creating input variables (features) from raw data to improve the performance of machine learning models. In supply chain, features might include lagged demand values, weather data, promotional calendars, or lead time variability.',
    category: 'ai',
  },
  {
    term: 'Generative AI (GenAI)',
    definition:
      'AI models capable of creating new content such as text, images, code, or structured data. In supply chain, GenAI assists with drafting RFPs, summarizing supplier reports, generating scenario analyses, writing code for analytics, and powering conversational interfaces for planners.',
    category: 'ai',
  },
  {
    term: 'Hallucination',
    definition:
      'When an AI model generates information that sounds plausible but is factually incorrect or fabricated. A critical risk factor when using GenAI for supply chain decision support, requiring human-in-the-loop validation for high-stakes outputs.',
    category: 'ai',
  },
  {
    term: 'Inference',
    definition:
      'The process of using a trained machine learning model to make predictions or decisions on new, unseen data. In supply chain, inference happens when a deployed model generates a demand forecast, classifies a shipment risk, or recommends a reorder quantity.',
    category: 'ai',
  },
  {
    term: 'Large Language Model (LLM)',
    definition:
      'A deep learning model trained on massive text datasets that can understand and generate human language. Examples include GPT-4, Claude, and Gemini. Used in supply chain for report generation, conversational analytics, document extraction, and intelligent assistants for planners.',
    category: 'ai',
  },
  {
    term: 'Machine Learning (ML)',
    definition:
      'A branch of artificial intelligence where systems learn patterns from data and improve performance over time without being explicitly programmed for every scenario. The foundation for most AI-driven supply chain applications including forecasting, optimization, and classification.',
    category: 'ai',
  },
  {
    term: 'Model',
    definition:
      'A mathematical representation learned from data that captures relationships between inputs and outputs. In supply chain, models are built for demand forecasting, supplier risk scoring, route optimization, and inventory classification.',
    category: 'ai',
  },
  {
    term: 'Natural Language Processing (NLP)',
    definition:
      'A branch of AI focused on enabling computers to understand, interpret, and generate human language. Applied in supply chain for parsing purchase orders, extracting data from contracts, sentiment analysis of supplier communications, and chatbot interfaces.',
    category: 'ai',
  },
  {
    term: 'Neural Network',
    definition:
      'A computing system inspired by the biological neural networks of the brain, consisting of interconnected nodes (neurons) organized in layers. Neural networks are the building blocks of deep learning and power many advanced supply chain AI applications.',
    category: 'ai',
  },
  {
    term: 'Predictive Analytics',
    definition:
      'The use of statistical algorithms and machine learning to identify the likelihood of future outcomes based on historical data. In supply chain, used for demand forecasting, predictive maintenance, supplier risk assessment, and delivery time estimation.',
    category: 'ai',
  },
  {
    term: 'Prescriptive Analytics',
    definition:
      'Advanced analytics that recommends specific actions or decisions to optimize outcomes. Goes beyond prediction to suggest what to do, such as optimal reorder quantities, best carrier selection, or ideal production schedules.',
    category: 'ai',
  },
  {
    term: 'Reinforcement Learning',
    definition:
      'A type of machine learning where an agent learns to make decisions by taking actions in an environment and receiving rewards or penalties. Applied in supply chain for dynamic pricing, autonomous warehouse robots, and real-time routing decisions.',
    category: 'ai',
  },
  {
    term: 'Supervised Learning',
    definition:
      'A machine learning approach where the model is trained on labeled data, learning to map inputs to known outputs. Used in supply chain for demand forecasting (predicting quantities), classification (categorizing shipment delays), and quality prediction.',
    category: 'ai',
  },
  {
    term: 'Training Data',
    definition:
      'The dataset used to teach a machine learning model patterns and relationships. Quality training data in supply chain must capture seasonality, promotions, disruptions, and market dynamics to produce reliable models.',
    category: 'ai',
  },
  {
    term: 'Transfer Learning',
    definition:
      'A technique where a model trained on one task is reused as the starting point for a different but related task. Valuable in supply chain when historical data is limited, allowing models pre-trained on large datasets to be fine-tuned for specific forecasting or classification tasks.',
    category: 'ai',
  },
  {
    term: 'Unsupervised Learning',
    definition:
      'A machine learning approach where the model discovers hidden patterns or groupings in data without labeled examples. Applied in supply chain for customer segmentation, SKU clustering, anomaly detection, and identifying hidden patterns in logistics data.',
    category: 'ai',
  },

  // Supply Chain Terms
  {
    term: '3PL (Third-Party Logistics)',
    definition:
      'A company that provides outsourced logistics services including warehousing, transportation, and fulfillment. AI is helping 3PLs optimize warehouse operations, improve load planning, and provide better visibility to their clients.',
    category: 'supply-chain',
  },
  {
    term: 'AMR (Autonomous Mobile Robot)',
    definition:
      'Robots that can navigate and perform tasks in warehouses and distribution centers without fixed infrastructure like rails or tracks. AMRs use AI, sensors, and computer vision to move goods, assist picking, and optimize material flow.',
    category: 'supply-chain',
  },
  {
    term: 'AS/RS (Automated Storage and Retrieval System)',
    definition:
      'Computer-controlled systems that automatically place and retrieve goods from defined storage locations. Modern AS/RS systems increasingly incorporate AI for slotting optimization, throughput balancing, and predictive maintenance.',
    category: 'supply-chain',
  },
  {
    term: 'ATP/CTP (Available-to-Promise / Capable-to-Promise)',
    definition:
      'ATP determines if an order can be fulfilled from existing inventory; CTP evaluates whether production capacity and materials can fulfill an order by a requested date. AI enhances both by considering real-time constraints, probabilistic supply, and demand variability.',
    category: 'supply-chain',
  },
  {
    term: 'Control Tower',
    definition:
      'A centralized hub providing end-to-end visibility across the supply chain with real-time data, analytics, and decision support. AI-powered control towers can proactively detect disruptions, recommend mitigating actions, and orchestrate cross-functional responses.',
    category: 'supply-chain',
  },
  {
    term: 'Demand Sensing',
    definition:
      'The use of near-real-time data (POS data, weather, social signals, web traffic) to detect short-term demand shifts earlier than traditional forecasting. AI and ML algorithms enable demand sensing by processing high-frequency signals that humans cannot analyze at scale.',
    category: 'supply-chain',
  },
  {
    term: 'ERP (Enterprise Resource Planning)',
    definition:
      'Integrated software systems that manage core business processes including procurement, manufacturing, inventory, finance, and HR. Modern ERPs are embedding AI capabilities for intelligent automation, predictive insights, and natural language interfaces.',
    category: 'supply-chain',
  },
  {
    term: 'Fill Rate',
    definition:
      'The percentage of customer demand that is met from available stock without backorders or lost sales. A key service level metric that AI-driven inventory optimization aims to improve while minimizing the total inventory investment required.',
    category: 'supply-chain',
  },
  {
    term: 'IBP (Integrated Business Planning)',
    definition:
      'A cross-functional planning process that aligns strategic, financial, and operational plans across an organization. AI enhances IBP by automating scenario generation, improving forecast accuracy, and providing intelligent recommendations to bridge gaps between plans.',
    category: 'supply-chain',
  },
  {
    term: 'Last Mile Delivery',
    definition:
      'The final leg of the delivery process from a distribution hub to the end customer. Often the most expensive and complex part of the supply chain, AI optimizes last mile through dynamic routing, delivery time prediction, and autonomous delivery vehicles.',
    category: 'supply-chain',
  },
  {
    term: 'Lead Time',
    definition:
      'The total time from placing an order with a supplier to receiving the goods. Lead time variability is a major driver of safety stock requirements. AI helps predict actual lead times more accurately and detects patterns in supplier delivery performance.',
    category: 'supply-chain',
  },
  {
    term: 'MEIO (Multi-Echelon Inventory Optimization)',
    definition:
      'An advanced approach to inventory management that simultaneously optimizes stock levels across all nodes in a supply network (raw materials, WIP, finished goods, DCs, stores). AI-powered MEIO considers network interdependencies that traditional single-echelon methods miss.',
    category: 'supply-chain',
  },
  {
    term: 'OTIF (On-Time In-Full)',
    definition:
      'A key supply chain performance metric measuring the percentage of orders delivered on the promised date with the complete quantity ordered. OTIF is increasingly being used as a supplier scorecard metric and directly impacts revenue and customer satisfaction.',
    category: 'supply-chain',
  },
  {
    term: 'RPA (Robotic Process Automation)',
    definition:
      'Software robots that automate repetitive, rule-based tasks across supply chain systems such as data entry, order processing, invoice matching, and report generation. Often a first step toward AI adoption, with more advanced organizations layering intelligent automation on top.',
    category: 'supply-chain',
  },
  {
    term: 'S&OP (Sales & Operations Planning)',
    definition:
      'A monthly cross-functional process that balances demand and supply plans to align with business strategy and financial targets. AI is transforming S&OP by automating baseline forecasts, generating scenarios, identifying risks, and enabling more frequent planning cycles.',
    category: 'supply-chain',
  },
  {
    term: 'Safety Stock',
    definition:
      'Extra inventory held as a buffer to protect against uncertainty in demand and supply. AI-driven safety stock calculations dynamically adjust based on forecast error, lead time variability, service level targets, and real-time risk signals rather than using static rules.',
    category: 'supply-chain',
  },
  {
    term: 'SKU (Stock Keeping Unit)',
    definition:
      'A unique identifier for each distinct product and service that can be purchased. Modern supply chains may manage hundreds of thousands of SKUs, making AI-powered classification, segmentation, and forecasting essential for managing at scale.',
    category: 'supply-chain',
  },
  {
    term: 'TMS (Transportation Management System)',
    definition:
      'Software that plans, executes, and optimizes the movement of goods across transportation modes. AI-enhanced TMS platforms provide dynamic routing, carrier selection optimization, predictive ETAs, and automated freight audit.',
    category: 'supply-chain',
  },
  {
    term: 'Touchless Planning',
    definition:
      'The concept of automating routine planning decisions so they execute without human intervention, freeing planners to focus on exceptions and strategic decisions. AI enables touchless planning by handling the long tail of low-variability, predictable SKU-location combinations.',
    category: 'supply-chain',
  },
  {
    term: 'WMS (Warehouse Management System)',
    definition:
      'Software that controls and optimizes warehouse operations including receiving, putaway, picking, packing, and shipping. AI is augmenting WMS with intelligent slotting, labor forecasting, dynamic wave planning, and computer vision for inventory accuracy.',
    category: 'supply-chain',
  },
  {
    term: 'Bullwhip Effect',
    definition:
      'The phenomenon where small fluctuations in consumer demand get amplified as orders move upstream through the supply chain, causing increasingly larger swings in inventory and production. AI-driven demand sensing and information sharing help dampen this effect.',
    category: 'supply-chain',
  },
  {
    term: 'Dock-to-Stock Time',
    definition:
      'The elapsed time from when goods arrive at a receiving dock until they are put away and available in the inventory system. AI and automation reduce dock-to-stock time through automated receiving, computer vision inspection, and optimized putaway logic.',
    category: 'supply-chain',
  },
  {
    term: 'Network Design',
    definition:
      'The strategic process of determining the optimal number, location, and capacity of facilities (plants, warehouses, distribution centers) in a supply chain network. AI and advanced analytics enable more sophisticated scenario modeling and continuous network optimization.',
    category: 'supply-chain',
  },

  // Business Terms
  {
    term: 'Change Management',
    definition:
      'The structured approach to transitioning individuals, teams, and organizations from a current state to a desired future state. Critical for AI adoption in supply chain, as technology alone fails without addressing people, processes, and organizational readiness.',
    category: 'business',
  },
  {
    term: 'COE (Center of Excellence)',
    definition:
      'A dedicated team or shared facility that provides leadership, best practices, research, and support for a focus area. Many organizations establish AI or analytics COEs to accelerate supply chain AI adoption, ensure governance, and build internal capabilities.',
    category: 'business',
  },
  {
    term: 'Data Governance',
    definition:
      'The overall management of data availability, usability, integrity, and security in an organization. Strong data governance is a prerequisite for successful AI in supply chain, ensuring models are trained on accurate, consistent, and trustworthy data.',
    category: 'business',
  },
  {
    term: 'Digital Transformation',
    definition:
      'The integration of digital technology into all areas of a business, fundamentally changing how it operates and delivers value. In supply chain, digital transformation encompasses AI adoption, cloud migration, IoT deployment, and connected planning.',
    category: 'business',
  },
  {
    term: 'KPI (Key Performance Indicator)',
    definition:
      'A measurable value that demonstrates how effectively an organization is achieving key objectives. Supply chain AI initiatives should be measured against clear KPIs such as forecast accuracy improvement, inventory reduction, OTIF improvement, and cost savings.',
    category: 'business',
  },
  {
    term: 'MVP (Minimum Viable Product)',
    definition:
      'The simplest version of a product or solution that delivers enough value to validate the concept with real users. In AI projects, an MVP might be a basic forecasting model for a single product category before scaling across the entire portfolio.',
    category: 'business',
  },
  {
    term: 'NPV (Net Present Value)',
    definition:
      'A financial metric that calculates the present value of all future cash flows (inflows and outflows) generated by an investment. Used to evaluate the financial viability of AI and supply chain technology investments by accounting for the time value of money.',
    category: 'business',
  },
  {
    term: 'Pilot',
    definition:
      'A small-scale, controlled test of a new technology, process, or solution before broader rollout. AI pilots in supply chain typically target a specific region, product line, or business unit to prove value and identify implementation challenges before enterprise-wide deployment.',
    category: 'business',
  },
  {
    term: 'POC (Proof of Concept)',
    definition:
      'A demonstration or exercise whose purpose is to verify that a concept or theory has practical potential. In supply chain AI, a POC typically tests whether a specific algorithm or approach can solve a particular problem using the organization\'s own data.',
    category: 'business',
  },
  {
    term: 'ROI (Return on Investment)',
    definition:
      'A performance measure used to evaluate the efficiency or profitability of an investment, calculated as the net benefit divided by the cost. AI in supply chain typically delivers ROI through reduced inventory carrying costs, improved service levels, lower transportation spend, and labor productivity gains.',
    category: 'business',
  },
  {
    term: 'Scalability',
    definition:
      'The ability of a system, process, or solution to handle growing amounts of work or expand in scope without degrading performance. A key consideration when deploying AI in supply chain, ensuring models and infrastructure can scale from pilot to enterprise-wide deployment.',
    category: 'business',
  },
  {
    term: 'TCO (Total Cost of Ownership)',
    definition:
      'A financial estimate that accounts for all direct and indirect costs of purchasing, deploying, and operating a system over its lifetime. For supply chain AI, TCO includes software licensing, cloud infrastructure, integration, data preparation, training, maintenance, and ongoing model management.',
    category: 'business',
  },
  {
    term: 'Use Case',
    definition:
      'A specific application or scenario where AI can be applied to solve a supply chain problem or create value. Examples include demand forecasting, warehouse slotting optimization, supplier risk monitoring, and dynamic pricing. Prioritizing high-impact use cases is key to AI adoption success.',
    category: 'business',
  },
];

const categoryLabels: Record<GlossaryCategory, string> = {
  ai: 'AI / ML',
  'supply-chain': 'Supply Chain',
  business: 'Business',
};

const categoryColors: Record<GlossaryCategory, string> = {
  ai: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
  'supply-chain': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  business: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
};

const categoryFilterActive: Record<string, string> = {
  all: 'bg-electric-500 text-white',
  ai: 'bg-violet-500 text-white',
  'supply-chain': 'bg-emerald-500 text-white',
  business: 'bg-cyan-500 text-white',
};

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTerms = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return glossaryTerms
      .filter((item) => {
        const matchesCategory =
          activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch =
          !query ||
          item.term.toLowerCase().includes(query) ||
          item.definition.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, activeCategory]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const item of filteredTerms) {
      const letter = item.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(item);
    }
    return groups;
  }, [filteredTerms]);

  const letters = Object.keys(groupedTerms).sort();

  const categoryCounts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = (item: GlossaryTerm) =>
      !query ||
      item.term.toLowerCase().includes(query) ||
      item.definition.toLowerCase().includes(query);

    return {
      all: glossaryTerms.filter(matchesSearch).length,
      ai: glossaryTerms.filter((t) => t.category === 'ai' && matchesSearch(t)).length,
      'supply-chain': glossaryTerms.filter(
        (t) => t.category === 'supply-chain' && matchesSearch(t)
      ).length,
      business: glossaryTerms.filter(
        (t) => t.category === 'business' && matchesSearch(t)
      ).length,
    };
  }, [searchQuery]);

  return (
    <>
      <Hero
        title="Glossary"
        subtitle="A comprehensive reference of AI, machine learning, and supply chain terminology. Demystify the jargon and speak the language of intelligent supply chains."
        gradient="from-cyan-500 to-violet-500"
      />

      {/* Search & Filters */}
      <section className="sticky top-16 z-40 border-b border-white/10 bg-navy-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="relative mb-3">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search terms and definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-electric-500/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-electric-500/25"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'ai', 'supply-chain', 'business'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? categoryFilterActive[cat]
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat === 'all'
                  ? `All (${categoryCounts.all})`
                  : `${categoryLabels[cat as GlossaryCategory]} (${categoryCounts[cat as GlossaryCategory]})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Letter Navigation */}
        {letters.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-1.5">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-sm font-semibold text-slate-400 transition-all hover:border-electric-500/30 hover:bg-white/[0.06] hover:text-white"
              >
                {letter}
              </a>
            ))}
          </div>
        )}

        {/* Terms by Letter */}
        {letters.length > 0 ? (
          letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-40">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-lg font-bold text-white">
                  {letter}
                </span>
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-slate-600">
                  {groupedTerms[letter].length}{' '}
                  {groupedTerms[letter].length === 1 ? 'term' : 'terms'}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {groupedTerms[letter].map((item) => (
                  <Card key={item.term}>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-white">{item.term}</h3>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${
                          categoryColors[item.category]
                        }`}
                      >
                        {categoryLabels[item.category]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {item.definition}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg
              className="mb-4 h-12 w-12 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-white">No terms found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search query or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 rounded-lg bg-electric-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-electric-600"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Summary Footer */}
        {filteredTerms.length > 0 && (
          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
            <p className="text-sm text-slate-500">
              Showing{' '}
              <span className="font-medium text-slate-300">{filteredTerms.length}</span> of{' '}
              <span className="font-medium text-slate-300">{glossaryTerms.length}</span> terms
              {activeCategory !== 'all' && (
                <>
                  {' '}
                  in{' '}
                  <span className="font-medium text-slate-300">
                    {categoryLabels[activeCategory as GlossaryCategory]}
                  </span>
                </>
              )}
              {searchQuery && (
                <>
                  {' '}
                  matching{' '}
                  <span className="font-medium text-slate-300">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                </>
              )}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
