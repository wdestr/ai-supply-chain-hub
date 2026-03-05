'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { scProjects, generalProjects, additionalResources, getInspirationStats } from '@/data/inspiration';
import type { IndividualProject } from '@/types';

const stats = getInspirationStats();

const categoryLabels: Record<string, string> = {
  'demand-forecasting': 'Demand Forecasting',
  'inventory': 'Inventory & RL',
  'open-source-tool': 'Open Source Tools',
  'automation': 'Automation & Agents',
  'visualization': 'Dashboards & Viz',
  'logistics': 'Logistics & Networks',
  'route-optimization': 'Route Optimization',
  'computer-vision': 'Computer Vision',
  'time-series-forecasting': 'Time Series',
  'anomaly-detection': 'Anomaly Detection',
  'predictive-maintenance': 'Predictive Maintenance',
  'llm-chatbot': 'LLM & Chatbots',
  'document-processing': 'Document Processing',
  'data-pipeline': 'Data Pipelines',
};

const categoryColors: Record<string, 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'cyan'> = {
  'demand-forecasting': 'blue',
  'inventory': 'green',
  'open-source-tool': 'purple',
  'automation': 'amber',
  'visualization': 'cyan',
  'logistics': 'rose',
  'route-optimization': 'amber',
  'computer-vision': 'purple',
  'time-series-forecasting': 'blue',
  'anomaly-detection': 'rose',
  'predictive-maintenance': 'green',
  'llm-chatbot': 'cyan',
  'document-processing': 'amber',
  'data-pipeline': 'green',
};

function ProjectCard({ project, type }: { project: IndividualProject; type: 'sc' | 'general' }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card hover={true}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-white">{project.project_name}</h3>
        <Badge
          label={categoryLabels[project.category] || project.category}
          color={categoryColors[project.category] || 'blue'}
        />
      </div>
      <p className="mt-1 text-xs text-slate-500">by {project.creator}</p>

      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        {expanded ? project.description : project.description.slice(0, 180) + (project.description.length > 180 ? '...' : '')}
      </p>

      {expanded && (
        <div className="mt-4 space-y-3">
          {project.what_they_built && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">What They Built</div>
              <p className="mt-1 text-sm text-slate-300">{project.what_they_built}</p>
            </div>
          )}

          {type === 'general' && project.sc_application && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Supply Chain Application</div>
              <p className="mt-1 text-sm text-emerald-400">{project.sc_application}</p>
            </div>
          )}

          {project.why_inspiring && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Why It&apos;s Inspiring</div>
              <p className="mt-1 text-sm text-electric-400">{project.why_inspiring}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.tools_used.map((tool) => (
              <span key={tool} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-300">{tool}</span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-medium text-slate-500 transition-colors hover:text-white"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-electric-400 transition-colors hover:text-electric-300"
        >
          View Project
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </Card>
  );
}

export default function InspirationPage() {
  const [activeTab, setActiveTab] = useState<'sc' | 'general' | 'resources'>('sc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentProjects = activeTab === 'sc' ? scProjects : generalProjects;
  const currentCategories = [...new Set(currentProjects.map((p) => p.category))];

  const filteredProjects = currentProjects.filter((p) => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch = searchQuery === '' ||
      p.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tools_used.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Hero
        title="Inspiration Gallery"
        subtitle={`${stats.totalProjects} real AI projects built by individuals, students, and open-source contributors. Get inspired and start building.`}
        gradient="from-amber-500 to-rose-500"
      />

      {/* Stats bar */}
      <section className="border-b border-white/10 bg-navy-900/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.scProjects}</div>
            <div className="mt-1 text-xs text-slate-400">Supply Chain Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.generalProjects}</div>
            <div className="mt-1 text-xs text-slate-400">General AI Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.categories}</div>
            <div className="mt-1 text-xs text-slate-400">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.kaggleCompetitions}</div>
            <div className="mt-1 text-xs text-slate-400">Kaggle Competitions</div>
          </div>
        </div>
      </section>

      {/* Tabs + Filters */}
      <section className="sticky top-16 z-40 border-b border-white/10 bg-navy-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex gap-1 border-b border-white/5 pt-3">
            {[
              { id: 'sc' as const, label: 'Supply Chain Projects', count: scProjects.length },
              { id: 'general' as const, label: 'General AI (SC Applicable)', count: generalProjects.length },
              { id: 'resources' as const, label: 'Competitions & Resources', count: 0 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setCategoryFilter('all'); }}
                className={`rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white/5 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-1.5 text-xs text-slate-500">({tab.count})</span>
                )}
              </button>
            ))}
          </div>

          {/* Search + Category filter */}
          {activeTab !== 'resources' && (
            <div className="flex flex-wrap items-center gap-3 py-3">
              <div className="relative flex-1 sm:max-w-xs">
                <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects, tools, creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-electric-500/50"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    categoryFilter === 'all'
                      ? 'bg-electric-500 text-white'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  All ({currentProjects.filter(p => {
                    if (!searchQuery) return true;
                    return p.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.tools_used.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
                  }).length})
                </button>
                {currentCategories.map((cat) => {
                  const count = currentProjects.filter(p => {
                    const matchesCat = p.category === cat;
                    if (!searchQuery) return matchesCat;
                    return matchesCat && (
                      p.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.tools_used.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                    );
                  }).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        categoryFilter === cat
                          ? 'bg-electric-500 text-white'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {categoryLabels[cat] || cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab !== 'resources' ? (
          <>
            {filteredProjects.length === 0 ? (
              <div className="py-16 text-center">
                <svg className="mx-auto h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="mt-3 text-slate-400">No projects match your search.</p>
                <button
                  onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
                  className="mt-2 text-sm text-electric-400 hover:text-electric-300"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    type={activeTab === 'sc' ? 'sc' : 'general'}
                  />
                ))}
              </div>
            )}

            <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-center text-sm text-slate-500">
              Showing {filteredProjects.length} of {currentProjects.length} projects
            </div>
          </>
        ) : (
          /* Resources tab */
          <div className="space-y-10">
            {/* Kaggle Competitions */}
            {additionalResources.kaggle_competitions && additionalResources.kaggle_competitions.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white">Kaggle Competitions</h2>
                <p className="mt-1 text-sm text-slate-400">Practice your skills with real supply chain data challenges</p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {additionalResources.kaggle_competitions.map((comp) => (
                    <a key={comp.name} href={comp.url} target="_blank" rel="noopener noreferrer">
                      <Card>
                        <Badge label="Kaggle" color="cyan" />
                        <h3 className="mt-2 text-sm font-semibold text-white">{comp.name}</h3>
                        <p className="mt-1 text-xs text-slate-400">{comp.description}</p>
                        <div className="mt-3 text-xs font-medium text-electric-400">View competition &rarr;</div>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Open Source SC Planning Tools */}
            {additionalResources.open_source_sc_planning_tools && additionalResources.open_source_sc_planning_tools.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white">Open Source Planning Tools</h2>
                <p className="mt-1 text-sm text-slate-400">Free, production-ready tools you can deploy today</p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {additionalResources.open_source_sc_planning_tools.map((tool) => (
                    <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer">
                      <Card>
                        <Badge label="Open Source" color="green" />
                        <h3 className="mt-2 text-sm font-semibold text-white">{tool.name}</h3>
                        <p className="mt-1 text-xs text-slate-400">{tool.description}</p>
                        <div className="mt-3 text-xs font-medium text-electric-400">View on GitHub &rarr;</div>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Channels */}
            {additionalResources.key_learning_channels && additionalResources.key_learning_channels.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white">Key Learning Channels</h2>
                <p className="mt-1 text-sm text-slate-400">The best channels to learn supply chain AI hands-on</p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {additionalResources.key_learning_channels.map((ch) => (
                    <a key={ch.name} href={ch.url} target="_blank" rel="noopener noreferrer">
                      <Card>
                        <Badge label="Learning" color="purple" />
                        <h3 className="mt-2 text-sm font-semibold text-white">{ch.name}</h3>
                        <p className="mt-1 text-xs text-slate-400">{ch.description}</p>
                        <div className="mt-3 text-xs font-medium text-electric-400">Explore &rarr;</div>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Curated Reference Lists */}
            {additionalResources.curated_reference_lists && additionalResources.curated_reference_lists.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white">Curated Reference Lists</h2>
                <p className="mt-1 text-sm text-slate-400">Awesome lists and curated collections for deeper exploration</p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {additionalResources.curated_reference_lists.map((list) => (
                    <a key={list.name} href={list.url} target="_blank" rel="noopener noreferrer">
                      <Card>
                        <Badge label="Reference" color="amber" />
                        <h3 className="mt-2 text-sm font-semibold text-white">{list.name}</h3>
                        <p className="mt-1 text-xs text-slate-400">{list.description}</p>
                        <div className="mt-3 text-xs font-medium text-electric-400">View list &rarr;</div>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
