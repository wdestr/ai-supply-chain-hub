import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';

export const metadata: Metadata = {
  title: 'The Operator\'s Tool Stack by Budget — AI Tools for Small Logistics Businesses',
  description:
    'The maintained AI tool stack for 1–25 truck operators, small brokers, and 3PLs — three budget tiers ($0, ~$100/mo, ~$500/mo) across six workflow categories. From The AI Operator\'s Playbook by Wiley Strahan (coming soon).',
  openGraph: {
    title: 'The Operator\'s Tool Stack by Budget',
    description: 'AI tools for small logistics operators, organized by budget tier. Maintained and free.',
    images: ['/images/operator/tools-og.jpg'],
  },
};

interface StackRow {
  category: string;
  pick: string;
  price: string;
  note: string;
}

const TIERS: { name: string; tagline: string; rows: StackRow[]; footer?: string }[] = [
  {
    name: 'Tier 1 — $0 to Start',
    tagline: 'The goal at this tier isn\'t a full stack. It\'s proving the workflow works before you pay for anything.',
    rows: [
      { category: 'AI assistant', pick: 'ChatGPT or Google Gemini (free tiers)', price: '$0', note: 'Enough to run drafting and extraction workflows, with limits on volume and no business-tier data controls — don\'t paste anything sensitive into a free account.' },
      { category: 'Document extraction', pick: 'Your AI assistant, manually', price: '$0', note: 'Photograph or paste the document and ask for the fields in a table. Slow to set up per document type, fine at low volume.' },
      { category: 'Automation glue', pick: 'Zapier or Make (free plans)', price: '$0', note: 'Capped monthly tasks and one or two live automations — enough to build and test your first workflow before committing money.' },
      { category: 'Routing / dispatch', pick: 'Google Maps + a spreadsheet', price: '$0', note: 'What most operators under a handful of trucks already run. Routing software is worth renting once volume justifies it — not before.' },
      { category: 'Comms', pick: 'Existing email + WhatsApp Business', price: '$0', note: 'A 12-template message library costs nothing to build and covers most of your volume.' },
      { category: 'Bookkeeping assist', pick: 'Spreadsheet + AI assistant', price: '$0', note: 'Fine for testing "explain what changed this month." Not a substitute for closing your books.' },
    ],
  },
  {
    name: 'Tier 2 — ~$100/Month',
    tagline: 'Where most small operators should land once a workflow has proven itself. One paid seat per category, chosen deliberately rather than collected.',
    rows: [
      { category: 'AI assistant', pick: 'ChatGPT Plus or Claude Pro', price: '~$20/mo', note: 'Business-tier usage and training opt-outs. Pick one — running two is tool tourism, not redundancy.' },
      { category: 'Document extraction', pick: 'Folded into the assistant', price: '$0 incremental', note: 'At typical small-fleet volume, a dedicated per-page tool doesn\'t pay for itself yet.' },
      { category: 'Automation glue', pick: 'Zapier Starter or Make Core', price: '~$30/mo', note: 'Enough task volume for two or three live automations — quote intake and document filing first.' },
      { category: 'Routing / dispatch', pick: 'Still manual', price: '$0 incremental', note: 'Revisit at Tier 3 once route count makes optimization software pay for itself.' },
      { category: 'Comms', pick: 'Shared-inbox tool (e.g. Front starter)', price: '~$20–30/mo', note: 'Confirmations, ETAs, and complaint responses run through templates instead of one person\'s personal inbox.' },
      { category: 'Bookkeeping assist', pick: 'QuickBooks Online Simple Start / Essentials', price: '~$35–60/mo', note: 'Built-in AI categorization on; a human still reconciles and closes.' },
    ],
    footer: 'Roughly $100–120/month total for an assistant, automation glue, a shared inbox, and bookkeeping with AI features — a full stack minus dedicated document AI and dispatch software, which most fleets this size don\'t need yet.',
  },
  {
    name: 'Tier 3 — ~$500/Month',
    tagline: 'Makes sense once volume justifies dedicated tools in every category — when the manual workaround is visibly costing you hours, not minutes.',
    rows: [
      { category: 'AI assistant', pick: 'Team-tier seats (ChatGPT Team, Claude Team, or Microsoft Copilot in M365)', price: '~$100–150/mo', note: 'Three to five back-office seats with shared prompt libraries and admin-level data controls.' },
      { category: 'Document extraction', pick: 'Dedicated document-AI tool', price: '~$100–150/mo', note: 'Priced per page or document. Worth it once rate cons, PODs, or invoices run in daily volume.' },
      { category: 'Automation glue', pick: 'Zapier Team or Make Pro', price: '~$60–100/mo', note: 'Four or more live automations across quote intake, filing, and the daily ops digest.' },
      { category: 'Routing / dispatch', pick: 'Dedicated software (e.g. Route4Me, OptimoRoute, Onfleet)', price: '~$100–300/mo', note: 'Priced per driver or vehicle. You\'re renting solved routing science, not building it. Buy it here, not sooner.' },
      { category: 'Comms', pick: 'Fuller shared inbox or lightweight CRM', price: '~$60–100/mo', note: 'Automation rules layered on top of the AI-drafted templates.' },
      { category: 'Bookkeeping assist', pick: 'QuickBooks Online Plus + bookkeeper or service', price: '~$100–150/mo', note: 'AI drafts and flags; the human closes the books and signs what goes to the accountant.' },
    ],
    footer: 'A genuinely complete stack for a busier 10–25 truck operation — roughly $500–700/month, still under one truck payment, and every dollar optional if the category isn\'t earning its keep.',
  },
];

export default function OperatorStackPage() {
  return (
    <>
      <Hero
        title="The Operator's Tool Stack by Budget"
        subtitle="AI tools for 1–25 truck operators, small brokers, and 3PLs — three budget tiers across six workflow categories. This is the maintained version of Appendix B from The AI Operator's Playbook — coming soon."
        gradient="from-amber-500 to-electric-500"
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-800 bg-navy-900/40 p-5 text-sm leading-relaxed text-slate-300">
          <p>
            Categories age well; brands don&apos;t. Treat everything below as a starting shortlist, not gospel — prices are what
            vendors listed as of <strong className="text-white">mid-2026</strong> and they move. Pick your tier, then fill in a tool
            per category you actually need. Most small operators don&apos;t need all six categories running at once: start with
            whichever bucket of desk work eats the most of your week.
          </p>
          <p className="mt-3 text-slate-400">
            Pair this with the{' '}
            <Link href="/prompts" className="text-electric-400 hover:text-electric-300">
              free 50-prompt Operator&apos;s Prompt Library →
            </Link>
          </p>
        </div>

        {TIERS.map((tier) => (
          <section key={tier.name} className="mt-12">
            <h2 className="text-2xl font-bold text-white">{tier.name}</h2>
            <p className="mt-2 max-w-3xl text-slate-400">{tier.tagline}</p>
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-navy-900 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Workflow</th>
                    <th className="px-4 py-3">The pick</th>
                    <th className="px-4 py-3 whitespace-nowrap">Price*</th>
                    <th className="px-4 py-3">The honest note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-navy-950/50">
                  {tier.rows.map((r) => (
                    <tr key={r.category}>
                      <td className="px-4 py-3 font-semibold text-white">{r.category}</td>
                      <td className="px-4 py-3 text-slate-200">{r.pick}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-amber-400">{r.price}</td>
                      <td className="px-4 py-3 text-slate-400">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {tier.footer && <p className="mt-3 max-w-3xl text-sm italic text-slate-400">{tier.footer}</p>}
          </section>
        ))}

        <p className="mt-4 text-xs text-slate-500">
          *Prices as of this writing (mid-2026). Verify with the vendor — pricing in this category changes monthly.
        </p>

        {/* Replacement checklist */}
        <section className="mt-14 rounded-2xl border border-slate-800 bg-navy-900/60 p-8">
          <h2 className="text-xl font-bold text-white">When one of these tools dies</h2>
          <p className="mt-2 text-slate-400">
            Tools here get acquired, sunset, or repriced constantly. When one of yours does, don&apos;t panic-shop — run the same three
            checks every time:
          </p>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-300">
            <li>
              <strong className="text-white">What was the tool actually doing?</strong> Not its name — its function. Go back to the
              category, not the brand.
            </li>
            <li>
              <strong className="text-white">Does the replacement clear the same bar?</strong> Pricing model, data handling (does it
              train on your data, and can you turn that off), and whether it integrates with what you already run.
            </li>
            <li>
              <strong className="text-white">Pilot it on the same workflow before you cut over.</strong> One week of real volume, old
              and new side by side. Measure hours back and error rate — nothing fuzzier.
            </li>
          </ol>
          <p className="mt-4 text-sm text-slate-400">
            If you can&apos;t find a direct replacement inside 30 days, the category may not be worth a dedicated tool at your volume —
            fold it back into your AI assistant until it justifies itself again.
          </p>
        </section>

        {/* Enterprise sidebar */}
        <section className="mt-8 rounded-2xl border border-amber-500/30 bg-navy-900/40 p-8">
          <h2 className="text-xl font-bold text-white">Names you&apos;ll hear that aren&apos;t for you</h2>
          <p className="mt-2 text-slate-400">
            Read enough about &quot;AI in logistics&quot; and you&apos;ll run into platforms built for national retailers and Fortune
            500 supply chains — enterprise forecasting suites, network control towers, procurement platforms with implementation teams
            and minimum seat counts. They&apos;re not wrong tools; they&apos;re wrong for you. If a vendor can&apos;t tell you the
            price on the first call, that&apos;s your answer: nothing in the three tiers above requires a sales call to find out what
            it costs. (Curious anyway? The{' '}
            <Link href="/platforms" className="text-electric-400 hover:text-electric-300">
              enterprise platform directory
            </Link>{' '}
            covers that world.)
          </p>
        </section>

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
            tool stack. Subscribers hear first.
          </p>
        </div>
      </div>
    </>
  );
}
