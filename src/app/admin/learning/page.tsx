'use client';

import { useAdminCrud } from '@/lib/useAdminCrud';
import DataTable from '@/components/admin/DataTable';
import ResourceForm from '@/components/admin/ResourceForm';

const columns = [
  { key: 'type', label: 'Type' },
  { key: 'name', label: 'Resource' },
  { key: 'level', label: 'Level' },
  { key: 'cost', label: 'Cost' },
];

const fields = [
  { key: 'type', label: 'Type', type: 'select' as const, required: true, options: [
    'course', 'book', 'podcast', 'community', 'conference', 'newsletter', 'youtube', 'certification',
  ]},
  { key: 'name', label: 'Resource Name', type: 'text' as const, required: true },
  { key: 'url', label: 'URL', type: 'url' as const },
  { key: 'description', label: 'Description', type: 'textarea' as const },
  { key: 'level', label: 'Level', type: 'select' as const, options: ['beginner', 'intermediate', 'advanced', 'all levels'] },
  { key: 'cost', label: 'Cost', type: 'text' as const, placeholder: 'Free, $49, Subscription' },
];

export default function AdminLearningPage() {
  const { data, loading, editing, creating, setEditing, setCreating, createItem, updateItem, deleteItem } = useAdminCrud({
    table: 'learning_resources',
    orderBy: 'type',
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Learning Resources ({data.length})</h1>
        <button onClick={() => setCreating(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Add Resource
        </button>
      </div>

      <DataTable columns={columns} data={data} loading={loading} onEdit={setEditing} onDelete={deleteItem} />

      {creating && <ResourceForm title="Add Learning Resource" fields={fields} onSubmit={createItem} onCancel={() => setCreating(false)} />}
      {editing && <ResourceForm title="Edit Learning Resource" fields={fields} initialValues={editing} onSubmit={updateItem} onCancel={() => setEditing(null)} />}
    </div>
  );
}
