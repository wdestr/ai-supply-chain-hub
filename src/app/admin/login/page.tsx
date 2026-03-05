'use client';

import { Suspense, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const redirect = searchParams.get('redirect') || '/admin';
    router.push(redirect);
    router.refresh();
  }

  return (
    <form onSubmit={handleLogin} className="bg-[#111827] border border-slate-700/50 rounded-xl p-8 space-y-5">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 bg-[#0a0e1a] border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          placeholder="admin@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2.5 bg-[#0a0e1a] border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          placeholder="Enter password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-slate-400 mt-2">AI in Supply Chain Resource Hub</p>
        </div>

        <Suspense fallback={<div className="text-slate-400 text-center py-8">Loading...</div>}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-slate-500 text-xs mt-6">
          Protected admin area. Contact the site administrator for access.
        </p>
      </div>
    </div>
  );
}
