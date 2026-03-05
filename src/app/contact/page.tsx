'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
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
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  return (
    <section className="pt-20 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">Get in Touch</h1>
          <p className="mt-3 text-slate-400">
            Have a question, suggestion, or want to contribute to the resource hub? We&apos;d love to hear from you.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 text-center">
            <div className="text-emerald-400 text-lg font-semibold mb-2">Message Sent</div>
            <p className="text-slate-400 text-sm">Thank you for reaching out. We&apos;ll get back to you soon.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-sm text-electric-400 hover:text-electric-300 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-navy-900/50 border border-slate-700/50 rounded-xl p-6 sm:p-8 space-y-5">
            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">Name</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-navy-950 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-electric-500/50 focus:border-electric-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">Email <span className="text-red-400">*</span></label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-navy-950 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-electric-500/50 focus:border-electric-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1.5">Subject</label>
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-2.5 bg-navy-950 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-electric-500/50 focus:border-electric-500"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">Message <span className="text-red-400">*</span></label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 bg-navy-950 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-electric-500/50 focus:border-electric-500 resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-electric-500 hover:bg-electric-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
