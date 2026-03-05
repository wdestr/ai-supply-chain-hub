'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface UseAdminCrudOptions {
  table: string;
  orderBy?: string;
}

export function useAdminCrud({ table, orderBy = 'created_at' }: UseAdminCrudOptions) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const supabase = createClient();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: rows, error } = await supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending: false })
      .limit(500);

    if (!error && rows) {
      setData(rows);
    }
    setLoading(false);
  }, [table, orderBy, supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function createItem(values: Record<string, any>) {
    const { error } = await supabase.from(table).insert(values);
    if (error) throw new Error(error.message);
    setCreating(false);
    await fetchData();
  }

  async function updateItem(values: Record<string, any>) {
    const { id, created_at, updated_at, fts, ...rest } = values;
    const { error } = await supabase.from(table).update(rest).eq('id', id);
    if (error) throw new Error(error.message);
    setEditing(null);
    await fetchData();
  }

  async function deleteItem(id: string) {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw new Error(error.message);
    await fetchData();
  }

  return {
    data,
    loading,
    editing,
    creating,
    setEditing,
    setCreating,
    createItem,
    updateItem,
    deleteItem,
    refresh: fetchData,
  };
}
