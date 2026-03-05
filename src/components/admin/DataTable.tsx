'use client';

import { useState } from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onDelete?: (id: string) => void;
  onEdit?: (row: any) => void;
  loading?: boolean;
}

export default function DataTable({ columns, data, onDelete, onEdit, loading }: DataTableProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-12 text-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-12 text-center">
        <div className="text-slate-400">No data found</div>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-4 py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right px-4 py-3 text-slate-400 font-medium text-xs uppercase tracking-wider w-32">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id || i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-slate-300 max-w-xs truncate">
                    {col.render ? col.render(row[col.key], row) : (
                      Array.isArray(row[col.key])
                        ? row[col.key].slice(0, 3).join(', ') + (row[col.key].length > 3 ? '...' : '')
                        : String(row[col.key] || '—')
                    )}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3 text-right space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-400 hover:text-blue-300 text-xs"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      confirmDelete === row.id ? (
                        <span className="space-x-1">
                          <button
                            onClick={() => { onDelete(row.id); setConfirmDelete(null); }}
                            className="text-red-400 hover:text-red-300 text-xs font-medium"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="text-slate-500 hover:text-slate-400 text-xs"
                          >
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(row.id)}
                          className="text-red-500/60 hover:text-red-400 text-xs"
                        >
                          Delete
                        </button>
                      )
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
