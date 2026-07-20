'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import promptData from '@/data/operator-prompts.json';
import Hero from '@/components/Hero';

interface Prompt {
  num: number;
  title: string;
  prompt: string;
  note: string;
}
interface Section {
  section: string;
  chapter: string;
  prompts: Prompt[];
}

const FREE_COUNT = 6; // prompts visible before the email gate
const UNLOCK_KEY = 'aisc_prompts_unlocked';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="shrink-0 rounded-md border border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-electric-500 hover:text-electric-400"
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  );
}

function PromptCard({ p }: { p: Prompt }) {
  return (
    <div id={`prompt-${p.num}`} className="rounded-xl border border-slate-800 bg-navy-900/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-white">
          <span className="mr-2 text-electric-400">{p.num}.</span>
          {p.title}
        </h3>
        <CopyButton text={p.prompt} />
      </div>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg bg-navy-950 p-4 font-mono text-[13px] leading-relaxed text-slate-300">
        {p.prompt}
      </pre>
      {p.note && (
        <p className="mt-3 text-sm italic text-slate-400">
          <span className="font-semibold not-italic text-slate-300">Usage note: </span>
          {p.note}
        </p>
      )}
    </div>
  );
}

function EmailGate({ locked, onUnlock }: { locked: number; onUnlock: () => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'prompt-library' }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setMessage(data.error || 'Something went wrong — try again.');
        return;
      }
      localStorage.setItem(UNLOCK_KEY, '1');
      onUnlock();
    } catch {
      setStatus('error');
      setMessage('Network error — try again.');
    }
  }

  return (
    <div className="rounded-2xl border border-electric-500/40 bg-gradient-to-br from-navy-900 to-navy-950 p-8 text-center">
      <h3 className="text-2xl font-bold text-white">Unlock the other {locked} prompts</h3>
      <p className="mx-auto mt-3 max-w-xl text-slate-400">
        The full library — claims packets, dispatch triage, SOP generators, hiring, automation
        specs, and the rest — is free. Drop your email and it unlocks instantly, and you&apos;ll
        get the updated version when tools and prompts change (they do, fast).
      </p>
      <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-lg border border-slate-700 bg-navy-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-electric-500 focus:outline-none focus:ring-1 focus:ring-electric-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="shrink-0 rounded-lg bg-electric-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-electric-400 disabled:opacity-50"
        >
          {status === 'loading' ? 'Unlocking…' : 'Unlock all 50'}
        </button>
      </form>
      {status === 'error' && <p className="mt-2 text-sm text-red-400">{message}</p>}
      <p className="mt-4 text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
    </div>
  );
}

export default function PromptLibraryClient() {
  const sections = (promptData as { sections: Section[] }).sections;
  const total = sections.reduce((n, s) => n + s.prompts.length, 0);
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUnlocked(localStorage.getItem(UNLOCK_KEY) === '1');
    setHydrated(true);
  }, []);

  let shown = 0;

  return (
    <>
      <Hero
        title="The Operator's Prompt Library"
        subtitle={`${total} field-tested AI prompts for small logistics operators — RFP teardowns, claims packets, dispatch triage, SOPs, and the rest of the desk work. From The AI Operator's Playbook — coming soon.`}
        gradient="from-amber-500 to-electric-500"
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* How prompts work */}
        <div className="rounded-xl border border-slate-800 bg-navy-900/40 p-5 text-sm leading-relaxed text-slate-300">
          <p>
            Every prompt here is built the same three-part way: <strong className="text-white">give the tool the material</strong> (paste
            the document, the numbers, the notes), <strong className="text-white">tell it the job</strong> (extract, draft, summarize,
            check), and <strong className="text-white">tell it the format you want back</strong>. Swap the [BRACKETED] placeholders for
            your real information. The first output is a draft, not an answer — nothing here sends itself. You read it, you fix it, you
            send it.
          </p>
          <p className="mt-3 text-slate-400">
            These are the appendices from{' '}
            <em className="text-slate-300">The AI Operator&apos;s Playbook</em> by Wiley Strahan — Book 2 of the Operator&apos;s
            Playbook series, coming soon. The book will teach the workflows behind every prompt.{' '}
            <Link href="/tools/operator" className="text-electric-400 hover:text-electric-300">
              See the companion tool stack →
            </Link>
          </p>
        </div>

        {/* Section jump nav */}
        <div className="mt-8 flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s.section}
              href={`#${s.section.replace(/[^a-zA-Z]+/g, '-').toLowerCase()}`}
              className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 transition-colors hover:border-electric-500 hover:text-electric-400"
            >
              {s.section}
            </a>
          ))}
        </div>

        {/* Sections */}
        {sections.map((s) => {
          const visiblePrompts = s.prompts.filter(() => {
            shown += 1;
            return unlocked || shown <= FREE_COUNT;
          });
          const anchor = s.section.replace(/[^a-zA-Z]+/g, '-').toLowerCase();
          if (visiblePrompts.length === 0 && !unlocked) return null;
          return (
            <section key={s.section} id={anchor} className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-bold text-white">
                {s.section}
                {s.chapter && <span className="ml-2 text-sm font-normal text-slate-500">Chapter {s.chapter}</span>}
              </h2>
              <div className="mt-4 space-y-5">
                {visiblePrompts.map((p) => (
                  <PromptCard key={p.num} p={p} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Gate */}
        {hydrated && !unlocked && (
          <div className="mt-12">
            <EmailGate locked={total - FREE_COUNT} onUnlock={() => setUnlocked(true)} />
          </div>
        )}

        {/* Book plug */}
        <div className="mt-16 rounded-2xl border border-slate-800 bg-navy-900/60 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">Launching soon from Wiley Strahan</p>
          <h3 className="mt-2 text-2xl font-bold text-white">Supply Chain Careers: The Field Guide</h3>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            The honest map of supply chain careers — the lanes, the salaries, the first 90 days, and how AI is changing the work —
            from fifteen-plus years inside one of the world&apos;s largest logistics operations.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Coming to Amazon in the next few months — followed by <em>The AI Operator&apos;s Playbook</em>, the book behind this
            prompt library. Subscribers hear first.
          </p>
        </div>
      </div>
    </>
  );
}
