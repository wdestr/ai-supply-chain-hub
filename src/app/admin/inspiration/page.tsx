'use client';

import { useAdminCrud } from '@/lib/useAdminCrud';
import DataTable from '@/components/admin/DataTable';
import ResourceForm from '@/components/admin/ResourceForm';

const columns = [
  { key: 'project_name', label: 'Project' },
  { key: 'creator', label: 'Creator' },
  { key: 'category', label: 'Category' },
  { key: 'project_type', label: 'Type' },
];

const fields = [
  { key: 'project_name', label: 'Project Name', type: 'text' as const, required: true },
  { key: 'creator', label: 'Creator', type: 'text' as const },
  { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
  { key: 'what_they_built', label: 'What They Built', type: 'textarea' as const },
  { key: 'tools_used', label: 'Tools Used', type: 'array' as const, placeholder: 'Python, TensorFlow, etc.' },
  { key: 'link', label: 'Primary Link', type: 'url' as const },
  { key: 'secondary_links', label: 'Additional Links', type: 'array' as const, placeholder: 'https://..., https://...' },
  { key: 'category', label: 'Category', type: 'text' as const },
  { key: 'why_inspiring', label: 'Why Inspiring', type: 'textarea' as const },
  { key: 'sc_application', label: 'SC Application', type: 'text' as const },
  { key: 'project_type', label: 'Project Type', type: 'select' as const, options: ['supply_chain', 'general_ai'] },
];

export default function AdminInspirationPage() {
  const { data, loading, editing, creating, setEditing, setCreating, createItem, updateItem, deleteItem } = useAdminCrud({
    table: 'inspiration_projects',
    orderBy: 'project_name',
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Inspiration Projects ({data.length})</h1>
        <button onClick={() => setCreating(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Add Project
        </button>
      </div>

      <DataTable columns={columns} data={data} loading={loading} onEdit={setEditing} onDelete={deleteItem} />

      {creating && <ResourceForm title="Add Project" fields={fields} onSubmit={createItem} onCancel={() => setCreating(false)} />}
      {editing && <ResourceForm title="Edit Project" fields={fields} initialValues={editing} onSubmit={updateItem} onCancel={() => setEditing(null)} />}
    </div>
  );
}
