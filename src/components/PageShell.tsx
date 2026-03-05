'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import SearchModal from './SearchModal';

export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <SearchModal />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
