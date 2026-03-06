'use client';

import { useAdminCrud } from '@/lib/useAdminCrud';
import DataTable from '@/components/admin/DataTable';
import ResourceForm from '@/components/admin/ResourceForm';

const columns = [
  { key: 'name', label: 'Platform' },
  { key: 'function_area', label: 'Focus Area' },
  { key: 'funding', label: 'Funding' },
  { key: 'is_featured', label: 'Featured', render: (v: boolean) => v ? '⭐' : '' },
  { key: 'key_customers', label: 'Customers' },
];

const fields = [
  { key: 'name', label: 'Platform Name', type: 'text' as const, required: true },
  { key: 'url', label: 'Website URL', type: 'url' as const },
  { key: 'function_area', label: 'Focus Area', type: 'select' as const, required: true, options: [
    'Demand Planning & Forecasting', 'Procurement & Sourcing', 'Warehouse & Distribution',
    'Transportation & Logistics', 'Last-Mile Delivery', 'Inventory Management',
    'Supply Chain Planning (S&OP/IBP)', 'End-to-End Planning', 'Supply Chain Visibility',
    'Risk Management', 'Sustainability',
  ]},
  { key: 'founded', label: 'Founded', type: 'text' as const, placeholder: '2018' },
  { key: 'funding', label: 'Funding', type: 'text' as const, placeholder: 'Series C ($120M)' },
  { key: 'description', label: 'Description', type: 'textarea' as const },
  { key: 'key_customers', label: 'Key Customers', type: 'array' as const, placeholder: 'Company1, Company2' },
  { key: 'ai_approach', label: 'AI Approach', type: 'textarea' as const },
  { key: 'affiliate_url', label: 'Affiliate URL', type: 'url' as const, placeholder: 'https://platform.com/?ref=aischub' },
  { key: 'is_featured', label: 'Featured', type: 'checkbox' as const, placeholder: 'Show as featured/sponsored' },
  { key: 'featured_priority', label: 'Featured Priority', type: 'number' as const, placeholder: '0 = lowest, 100 = highest' },
  { key: 'sponsor_label', label: 'Sponsor Label', type: 'text' as const, placeholder: 'Sponsored by X (optional)' },
];

export default function AdminPlatformsPage() {
  const { data, loading, editing, creating, setEditing, setCreating, createItem, updateItem, deleteItem } = useAdminCrud({
    table: 'platforms',
    orderBy: 'name',
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Platforms ({data.length})</h1>
        <button onClick={() => setCreating(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Add Platform
        </button>
      </div>

      <DataTable columns={columns} data={data} loading={loading} onEdit={setEditing} onDelete={deleteItem} />

      {creating && <ResourceForm title="Add Platform" fields={fields} onSubmit={createItem} onCancel={() => setCreating(false)} />}
      {editing && <ResourceForm title="Edit Platform" fields={fields} initialValues={editing} onSubmit={updateItem} onCancel={() => setEditing(null)} />}
    </div>
  );
}
