'use client';

import { useState, useEffect } from 'react';

interface Field {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'select' | 'array';
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

interface ResourceFormProps {
  fields: Field[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void>;
  onCancel: () => void;
  title: string;
}

export default function ResourceForm({ fields, initialValues, onSubmit, onCancel, title }: ResourceFormProps) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialValues) {
      setValues({ ...initialValues });
    } else {
      const defaults: Record<string, any> = {};
      fields.forEach((f) => {
        defaults[f.key] = f.type === 'array' ? [] : '';
      });
      setValues(defaults);
    }
  }, [initialValues, fields]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(values);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function updateField(key: string, value: any) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-slate-700/50 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#111827] border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-white text-xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                {field.label}{field.required && <span className="text-red-400 ml-0.5">*</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  value={values[field.key] || ''}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  required={field.required}
                  rows={3}
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  placeholder={field.placeholder}
                />
              ) : field.type === 'select' ? (
                <select
                  value={values[field.key] || ''}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  required={field.required}
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'array' ? (
                <input
                  value={Array.isArray(values[field.key]) ? values[field.key].join(', ') : values[field.key] || ''}
                  onChange={(e) => updateField(field.key, e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  placeholder={field.placeholder || 'Comma-separated values'}
                />
              ) : (
                <input
                  type={field.type}
                  value={values[field.key] || ''}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  required={field.required}
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {loading ? 'Saving...' : initialValues ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
