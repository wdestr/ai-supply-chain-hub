import Link from 'next/link';
import NewsletterForm from './NewsletterForm';
import AdBanner from './AdBanner';

export default function Footer() {
  return (
    <>
    <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
      <AdBanner slot="footer-above" />
    </div>
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-emerald-500">
                <span className="text-sm font-bold text-white">AI</span>
              </div>
              <span className="text-lg font-bold text-white">
                SC<span className="text-electric-400">Hub</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-400">
              Your comprehensive resource for AI in supply chain management. Explore tools, use cases, and insights.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Explore</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/use-cases" className="text-sm text-slate-400 hover:text-electric-400 transition-colors">Use Cases</Link></li>
              <li><Link href="/tools" className="text-sm text-slate-400 hover:text-electric-400 transition-colors">Tools</Link></li>
              <li><Link href="/platforms" className="text-sm text-slate-400 hover:text-electric-400 transition-colors">Platforms</Link></li>
              <li><Link href="/learning" className="text-sm text-slate-400 hover:text-electric-400 transition-colors">Learning</Link></li>
              <li><Link href="/blog" className="text-sm text-slate-400 hover:text-electric-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Tools</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/assessment" className="text-sm text-slate-400 hover:text-electric-400 transition-colors">AI Readiness Assessment</Link></li>
              <li><Link href="/roi-calculator" className="text-sm text-slate-400 hover:text-electric-400 transition-colors">ROI Calculator</Link></li>
              <li><Link href="/compare" className="text-sm text-slate-400 hover:text-electric-400 transition-colors">Compare Platforms</Link></li>
              <li><Link href="/glossary" className="text-sm text-slate-400 hover:text-electric-400 transition-colors">Glossary</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-400 hover:text-electric-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Stay Updated</h3>
            <p className="mt-3 text-sm text-slate-400 mb-3">
              Get the latest AI in supply chain insights delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-slate-500">
            AI in Supply Chain Resource Hub &middot; 470+ curated resources &middot; Data verified Feb 2025 &ndash; Feb 2026
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
