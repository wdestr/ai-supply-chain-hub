'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

const CATEGORIES = [
  'Data & Analytics Platforms',
  'AI/ML Development Platforms',
  'Business Intelligence with AI',
  'AI Assistants & Copilots',
  'RPA & Process Automation',
  'Document AI / OCR',
  'Computer Vision',
  'Supply Chain Planning',
  'Demand Planning',
  'Warehouse Management',
  'Transportation Management',
  'Procurement',
  'Inventory Optimization',
  'Other',
];

const PRICING_MODELS = [
  'Free',
  'Freemium',
  'Free Trial',
  'Paid',
  'Enterprise',
  'Open Source',
  'Contact for Pricing',
];

interface FormState {
  name: string;
  url: string;
  category: string;
  pricing_model: string;
  description: string;
  supply_chain_relevance: string;
  contact_email: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  url: '',
  category: '',
  pricing_model: '',
  description: '',
  supply_chain_relevance: '',
  contact_email: '',
};

export default function SubmitPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong');
        return;
      }
      setStatus('success');
      setForm(EMPTY_FORM);
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  const inputCls = 'w-full px-4 py-2.5 bg-navy-950 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-electric-500/50 focus:border-electric-500';
  const labelCls = 'block text-sm font-medium text-slate-300 mb-1.5';

  return (
    <section className="pt-20 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-electric-500/10 px-4 py-1.5 text-sm font-medium text-electric-400 mb-4">
            Free Listing
          </span>
          <h1 className="text-3xl font-bold text-white">Submit a Tool or Platform</h1>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto">
            Know an AI tool or supply chain platform that should be listed here? Submit it and we&apos;ll review it within 48 hours.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">✓</div>
            <div className="text-emerald-400 text-lg font-semibold mb-2">Submission Received!</div>
            <p className="text-slate-400 text-sm">
              Thanks for contributing to the hub. We&apos;ll review your submission and add it within 48 hours.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-5 text-sm text-electric-400 hover:text-electric-300 transition-colors"
            >
              Submit another tool
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-navy-900/50 border border-slate-700/50 rounded-xl p-6 sm:p-8 space-y-5">
            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
                {errorMsg}
              </div>
            )}

            {/* Name + URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className={labelCls}>
                  Tool / Platform Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={set('name')}
                  className={inputCls}
                  placeholder="e.g. ToolName AI"
                />
              </div>
              <div>
                <label htmlFor="url" className={labelCls}>
                  Website URL <span className="text-red-400">*</span>
                </label>
                <input
                  id="url"
                  type="url"
                  required
                  value={form.url}
                  onChange={set('url')}
                  className={inputCls}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Category + Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className={labelCls}>Category</label>
                <select
                  id="category"
                  value={form.category}
                  onChange={set('category')}
                  className={inputCls}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="pricing_model" className={labelCls}>Pricing Model</label>
                <select
                  id="pricing_model"
                  value={form.pricing_model}
                  onChange={set('pricing_model')}
                  className={inputCls}
                >
                  <option value="">Select pricing</option>
                  {PRICING_MODELS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={labelCls}>
                Product Description <span className="text-red-400">*</span>
              </label>
              <textarea
                id="description"
                required
                rows={3}
                value={form.description}
                onChange={set('description')}
                className={inputCls + ' resize-none'}
                placeholder="What does this tool do? What problem does it solve?"
              />
            </div>

            {/* Supply chain relevance */}
            <div>
              <label htmlFor="supply_chain_relevance" className={labelCls}>
                Supply Chain Relevance
              </label>
              <textarea
                id="supply_chain_relevance"
                rows={3}
                value={form.supply_chain_relevance}
                onChange={set('supply_chain_relevance')}
                className={inputCls + ' resize-none'}
                placeholder="How is this tool used in supply chain operations? (demand planning, warehouse automation, etc.)"
              />
            </div>

            {/* Contact email */}
            <div>
              <label htmlFor="contact_email" className={labelCls}>
                Your Email <span className="text-red-400">*</span>
              </label>
              <input
                id="contact_email"
                type="email"
                required
                value={form.contact_email}
                onChange={set('contact_email')}
                className={inputCls}
                placeholder="you@company.com"
              />
              <p className="mt-1 text-xs text-slate-500">We&apos;ll reach out if we have questions about the listing.</p>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-electric-500 hover:bg-electric-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            >
              {status === 'loading' ? 'Submitting...' : 'Submit for Review'}
            </button>

            <p className="text-center text-xs text-slate-500">
              Want featured placement?{' '}
              <a href="/advertise" className="text-electric-400 hover:text-electric-300">
                See our paid listing options →
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
