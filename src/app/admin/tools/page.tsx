'use client';

import { useAdminCrud } from '@/lib/useAdminCrud';
import DataTable from '@/components/admin/DataTable';
import ResourceForm from '@/components/admin/ResourceForm';

const columns = [
  { key: 'category', label: 'Category' },
  { key: 'name', label: 'Tool' },
  { key: 'pricing_model', label: 'Pricing' },
  { key: 'url', label: 'URL', render: (v: string) => v ? <a href={v} target="_blank" rel="noopener" className="text-blue-400 hover:underline truncate block max-w-[200px]">{v}</a> : '—' },
];

const fields = [
  { key: 'category', label: 'Category', type: 'select' as const, required: true, options: [
    'AI/ML Development Platforms', 'Data & Analytics Platforms', 'Business Intelligence with AI',
    'AI Assistants & Copilots', 'RPA & Process Automation', 'Document AI / OCR',
    'Computer Vision', 'NLP & Conversational AI', 'IoT & Sensor Analytics',
    'Simulation & Digital Twin', 'Cybersecurity',
  ]},
  { key: 'name', label: 'Tool Name', type: 'text' as const, required: true },
  { key: 'url', label: 'Website URL', type: 'url' as const },
  { key: 'description', label: 'Description', type: 'textarea' as const },
  { key: 'supply_chain_relevance', label: 'Supply Chain Relevance', type: 'textarea' as const },
  { key: 'pricing_model', label: 'Pricing Model', type: 'text' as const, placeholder: 'Free tier, Enterprise, etc.' },
];

export default function AdminToolsPage() {
  const { data, loading, editing, creating, setEditing, setCreating, createItem, updateItem, deleteItem } = useAdminCrud({
    table: 'tools',
    orderBy: 'category',
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Tools ({data.length})</h1>
        <button onClick={() => setCreating(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Add Tool
        </button>
      </div>

      <DataTable columns={columns} data={data} loading={loading} onEdit={setEditing} onDelete={deleteItem} />

      {creating && <ResourceForm title="Add Tool" fields={fields} onSubmit={createItem} onCancel={() => setCreating(false)} />}
      {editing && <ResourceForm title="Edit Tool" fields={fields} initialValues={editing} onSubmit={updateItem} onCancel={() => setEditing(null)} />}
    </div>
  );
}
