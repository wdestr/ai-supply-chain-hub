'use client';

import { useState } from 'react';

interface Props {
  variant?: 'inline' | 'card';
  className?: string;
}

export default function NewsletterSignup({ variant = 'card', className = '' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      // Beehiiv embed form — replace PUBLICATION_ID with actual ID after signup
      const res = await fetch('https://www.beehiiv.com/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          publication_id: process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID || 'pub_placeholder',
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'aischub',
          utm_medium: 'website',
        }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-electric-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="shrink-0 rounded-lg bg-electric-500 px-4 py-2 text-sm font-semibold text-white hover:bg-electric-400 disabled:opacity-60 transition-colors"
        >
          {status === 'loading' ? '...' : status === 'success' ? '✓ Subscribed' : 'Subscribe'}
        </button>
        {status === 'error' && (
          <span className="text-xs text-rose-400 self-center">Try again</span>
        )}
      </form>
    );
  }

  return (
    <div className={`rounded-xl border border-electric-500/20 bg-electric-500/5 p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">📬</span>
        <h3 className="text-base font-semibold text-white">Weekly AI Supply Chain Digest</h3>
      </div>
      <p className="text-sm text-slate-400 mb-4">
        New tools, use cases, and industry insights — every week. Free forever.
      </p>
      {status === 'success' ? (
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-400">
          ✓ You&apos;re in! Check your inbox for a confirmation.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-electric-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-lg bg-electric-500 py-2.5 text-sm font-semibold text-white hover:bg-electric-400 disabled:opacity-60 transition-colors"
          >
            {status === 'loading' ? 'Subscribing...' : 'Get Weekly Digest'}
          </button>
          {status === 'error' && (
            <p className="text-xs text-rose-400">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </div>
  );
}
