'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import DataTable from '@/components/admin/DataTable';

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });
      setSubscribers(data || []);
      setLoading(false);
    }
    fetch();
  }, [supabase]);

  const columns = [
    { key: 'email', label: 'Email' },
    { key: 'subscribed_at', label: 'Subscribed', render: (v: string) => new Date(v).toLocaleDateString() },
    { key: 'active', label: 'Status', render: (v: boolean) => (
      <span className={v ? 'text-emerald-400' : 'text-slate-500'}>{v ? 'Active' : 'Unsubscribed'}</span>
    )},
  ];

  const activeCount = subscribers.filter(s => s.active).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Newsletter</h1>
          <p className="text-slate-400 text-sm mt-1">{activeCount} active subscribers</p>
        </div>
      </div>

      <DataTable columns={columns} data={subscribers} loading={loading} />
    </div>
  );
}
