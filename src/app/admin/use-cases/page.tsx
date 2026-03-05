'use client';

import { useAdminCrud } from '@/lib/useAdminCrud';
import DataTable from '@/components/admin/DataTable';
import ResourceForm from '@/components/admin/ResourceForm';

const columns = [
  { key: 'function_area', label: 'Function' },
  { key: 'name', label: 'Use Case' },
  { key: 'companies', label: 'Companies' },
  { key: 'results', label: 'Results' },
];

const fields = [
  { key: 'function_area', label: 'Function Area', type: 'select' as const, required: true, options: [
    'Demand Planning & Forecasting', 'Procurement & Sourcing', 'Warehouse & Distribution',
    'Transportation & Logistics', 'Last-Mile Delivery', 'Inventory Management',
    'Supply Chain Planning (S&OP/IBP)', 'Customer Service & Order Management',
    'Quality Management', 'Sustainability & ESG', 'Returns & Reverse Logistics', 'Manufacturing',
  ]},
  { key: 'name', label: 'Use Case Name', type: 'text' as const, required: true },
  { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
  { key: 'companies', label: 'Companies Doing It', type: 'array' as const, placeholder: 'Company1, Company2, Company3' },
  { key: 'tools_used', label: 'Tools Used', type: 'array' as const, placeholder: 'Tool1, Tool2' },
  { key: 'results', label: 'Results', type: 'text' as const },
  { key: 'sources', label: 'Sources', type: 'array' as const, placeholder: 'https://example.com' },
];

export default function AdminUseCasesPage() {
  const { data, loading, editing, creating, setEditing, setCreating, createItem, updateItem, deleteItem } = useAdminCrud({
    table: 'use_cases',
    orderBy: 'function_area',
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Use Cases ({data.length})</h1>
        <button
          onClick={() => setCreating(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Add Use Case
        </button>
      </div>

      <DataTable columns={columns} data={data} loading={loading} onEdit={setEditing} onDelete={deleteItem} />

      {creating && (
        <ResourceForm title="Add Use Case" fields={fields} onSubmit={createItem} onCancel={() => setCreating(false)} />
      )}
      {editing && (
        <ResourceForm title="Edit Use Case" fields={fields} initialValues={editing} onSubmit={updateItem} onCancel={() => setEditing(null)} />
      )}
    </div>
  );
}
