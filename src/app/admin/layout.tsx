'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '~' },
  { href: '/admin/use-cases', label: 'Use Cases' },
  { href: '/admin/tools', label: 'Tools' },
  { href: '/admin/platforms', label: 'Platforms' },
  { href: '/admin/learning', label: 'Learning' },
  { href: '/admin/inspiration', label: 'Inspiration' },
  { href: '/admin/newsletter', label: 'Newsletter' },
  { href: '/admin/contact', label: 'Contact' },
  { href: '/admin/analytics', label: 'Analytics' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't wrap login page with admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111827] border-r border-slate-700/50 flex flex-col fixed h-screen">
        <div className="p-4 border-b border-slate-700/50">
          <Link href="/" className="text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors">
            AIScHub
          </Link>
          <p className="text-slate-500 text-xs mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'text-blue-400 bg-blue-500/10 border-r-2 border-blue-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-slate-500 hover:text-red-400 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-56 p-8">
        {children}
      </main>
    </div>
  );
}
