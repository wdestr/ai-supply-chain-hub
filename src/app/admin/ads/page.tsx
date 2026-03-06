'use client';

import { useAdminCrud } from '@/lib/useAdminCrud';
import DataTable from '@/components/admin/DataTable';
import ResourceForm from '@/components/admin/ResourceForm';

const columns = [
  { key: 'slot_name', label: 'Slot' },
  { key: 'title', label: 'Title' },
  { key: 'is_active', label: 'Active', render: (v: boolean) => v ? 'Yes' : 'No' },
  { key: 'impressions', label: 'Impr.' },
  { key: 'clicks', label: 'Clicks' },
  { key: 'destination_url', label: 'URL', render: (v: string) =>
    v ? <a href={v} target="_blank" rel="noopener" className="text-blue-400 hover:underline truncate block max-w-[200px]">{v}</a> : '---'
  },
];

const fields = [
  { key: 'slot_name', label: 'Slot Name', type: 'select' as const, required: true, options: [
    'blog-sidebar', 'tools-top', 'platforms-top', 'homepage-mid', 'footer-above',
  ]},
  { key: 'title', label: 'Ad Title', type: 'text' as const, required: true },
  { key: 'image_url', label: 'Image URL', type: 'url' as const, placeholder: 'https://...' },
  { key: 'destination_url', label: 'Destination URL', type: 'url' as const, required: true },
  { key: 'is_active', label: 'Active', type: 'checkbox' as const, placeholder: 'Enable this ad' },
  { key: 'starts_at', label: 'Start Date (optional)', type: 'text' as const, placeholder: '2026-03-01T00:00:00Z' },
  { key: 'ends_at', label: 'End Date (optional)', type: 'text' as const, placeholder: '2026-06-01T00:00:00Z' },
];

export default function AdminAdsPage() {
  const { data, loading, editing, creating, setEditing, setCreating, createItem, updateItem, deleteItem } = useAdminCrud({
    table: 'ad_placements',
    orderBy: 'created_at',
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Ad Placements ({data.length})</h1>
        <button onClick={() => setCreating(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Add Ad
        </button>
      </div>

      <DataTable columns={columns} data={data} loading={loading} onEdit={setEditing} onDelete={deleteItem} />

      {creating && <ResourceForm title="Add Ad Placement" fields={fields} onSubmit={createItem} onCancel={() => setCreating(false)} />}
      {editing && <ResourceForm title="Edit Ad Placement" fields={fields} initialValues={editing} onSubmit={updateItem} onCancel={() => setEditing(null)} />}
    </div>
  );
}
