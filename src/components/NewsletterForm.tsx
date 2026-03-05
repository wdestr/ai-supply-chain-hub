'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
        return;
      }

      setStatus('success');
      setMessage('Subscribed!');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setMessage('Network error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-3 py-2 bg-navy-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-electric-500 focus:border-electric-500"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-3 py-2 bg-electric-500 hover:bg-electric-400 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
      >
        {status === 'loading' ? '...' : status === 'success' ? 'Done' : 'Subscribe'}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs mt-1">{message}</p>}
    </form>
  );
}
