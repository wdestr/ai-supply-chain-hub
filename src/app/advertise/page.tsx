import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise',
  description:
    'Reach 10,000+ supply chain and AI professionals. Feature your tool, platform, or service on the AI in Supply Chain Resource Hub.',
};

const tiers = [
  {
    name: 'Featured Listing',
    price: '$299',
    period: '/month',
    highlight: true,
    badge: 'Most Popular',
    description:
      'Get a "Featured" badge on your tool or platform card with priority placement at the top of your category.',
    features: [
      'Priority placement within your category',
      '"Featured" badge on your card',
      'Custom sponsor label (e.g., "Sponsored by Acme")',
      'Affiliate link tracking with click analytics',
      'Monthly performance report',
      'Cancel anytime',
    ],
    cta: 'Get Featured',
  },
  {
    name: 'Banner Ad',
    price: '$499',
    period: '/month',
    highlight: false,
    badge: null,
    description:
      'A display banner ad shown on high-traffic pages — tools, platforms, blog, and more.',
    features: [
      'Impression & click tracking',
      'Custom title, description, and image',
      'Rotate across multiple page slots',
      'Real-time performance dashboard',
      'A/B test up to 2 creatives',
      'Cancel anytime',
    ],
    cta: 'Buy Banner',
  },
  {
    name: 'Newsletter Sponsor',
    price: '$199',
    period: '/issue',
    highlight: false,
    badge: null,
    description:
      'A dedicated sponsor mention in our weekly AI in Supply Chain digest sent to our subscriber list.',
    features: [
      'Sponsor mention with your logo and link',
      'Up to 75 words of custom copy',
      'Sent to engaged subscribers',
      'Click-through tracking',
      'Archive link on the blog',
      'One issue minimum',
    ],
    cta: 'Sponsor an Issue',
  },
];

const stats = [
  { value: '10K+', label: 'Monthly visitors' },
  { value: '475+', label: 'Indexed resources' },
  { value: '93', label: 'AI platforms listed' },
  { value: '84', label: 'AI tools listed' },
];

const audience = [
  { icon: '🏭', title: 'Supply Chain Leaders', description: 'VPs, Directors, and Managers driving AI adoption in their operations.' },
  { icon: '🤖', title: 'AI/ML Practitioners', description: 'Data scientists and ML engineers building supply chain AI models.' },
  { icon: '📦', title: 'Procurement & Ops', description: 'Procurement managers evaluating tools to automate and optimize workflows.' },
  { icon: '🚀', title: 'Founders & Consultants', description: 'Startup founders and consultants serving the supply chain industry.' },
];

const faqs = [
  {
    q: 'How quickly do featured listings go live?',
    a: 'Within 1–2 business days of payment confirmation. We\'ll send you a confirmation with your listing preview.',
  },
  {
    q: 'What if my tool isn\'t already listed?',
    a: 'No problem — we\'ll add your tool or platform to the directory as part of your featured listing setup.',
  },
  {
    q: 'What formats does the banner ad accept?',
    a: 'We accept a title, short description (up to 100 chars), image URL (16:9 or 3:1 aspect ratio), and a destination URL.',
  },
  {
    q: 'Is there a minimum commitment?',
    a: 'Featured listings and banner ads are month-to-month. Newsletter sponsorships are per-issue with no minimum.',
  },
  {
    q: 'Do you offer custom packages?',
    a: 'Yes — reach out for bulk rates, annual discounts, or multi-placement bundles.',
  },
];

export default function AdvertisePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-electric-500 opacity-5" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Now accepting sponsors
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Reach Supply Chain AI<br />
            <span className="text-emerald-400">Decision-Makers</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400 sm:text-xl">
            AISCHub is the go-to reference for AI in supply chain. Get your tool, platform,
            or service in front of the professionals actively evaluating solutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:hello@aischub.com?subject=Advertising%20Inquiry"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
            >
              Get in Touch
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-white">{s.value}</div>
                <div className="mt-1 text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Who You&apos;ll Reach</h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">
            Our audience is actively evaluating and adopting AI tools for supply chain operations.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map((a) => (
            <div
              key={a.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center"
            >
              <div className="text-3xl mb-3">{a.icon}</div>
              <h3 className="font-semibold text-white mb-2">{a.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Advertising Options</h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">
            Flexible options to fit your budget and goals. All plans include click analytics and a
            monthly performance report.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 ${
                tier.highlight
                  ? 'border-emerald-500/40 bg-emerald-500/5 shadow-lg shadow-emerald-500/10'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                    {tier.badge}
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-slate-400 text-sm">{tier.period}</span>
                </div>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{tier.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <svg
                      className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:hello@aischub.com?subject=${encodeURIComponent(tier.cta + ' — ' + tier.name)}`}
                className={`block w-full rounded-xl px-5 py-3 text-center text-sm font-semibold transition-colors ${
                  tier.highlight
                    ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                    : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="mt-10 rounded-2xl border border-electric-500/20 bg-electric-500/5 p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Need a Custom Package?</h3>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Looking for annual pricing, multi-placement bundles, or a co-marketing partnership?
            Let&apos;s talk.
          </p>
          <a
            href="mailto:hello@aischub.com?subject=Custom%20Advertising%20Package"
            className="inline-flex items-center gap-2 rounded-xl bg-electric-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-electric-400"
          >
            Contact Us
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Get in Touch',
                description:
                  'Email us at hello@aischub.com or click any "Get in Touch" button. Tell us your tool and goal.',
              },
              {
                step: '02',
                title: 'We Set It Up',
                description:
                  'We configure your listing, badge, and tracking links within 1–2 business days.',
              },
              {
                step: '03',
                title: 'Track Results',
                description:
                  'Monitor click-throughs and impressions in your monthly report or our admin dashboard.',
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-5">
                <div className="text-4xl font-extrabold text-emerald-500/30 shrink-0 leading-none">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-10">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 bg-gradient-to-r from-emerald-500/10 to-electric-500/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Get Started?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Drop us an email and we&apos;ll get back to you within 24 hours.
          </p>
          <a
            href="mailto:hello@aischub.com?subject=Advertising%20Inquiry"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald-400"
          >
            hello@aischub.com
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <p className="mt-4 text-xs text-slate-500">
            Already listed?{' '}
            <Link href="/tools" className="text-electric-400 hover:underline">
              Browse the tools directory →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
