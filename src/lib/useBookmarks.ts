'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'aischub_bookmarks';

export interface Bookmark {
  id: string;           // slug
  name: string;
  type: 'tool' | 'platform';
  description: string;
  savedAt: number;      // timestamp
}

function loadBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks: Bookmark[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    // storage full or unavailable
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setBookmarks(loadBookmarks());
    setHydrated(true);
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((b) => b.id === id),
    [bookmarks]
  );

  const toggle = useCallback((item: Bookmark) => {
    setBookmarks((prev) => {
      const next = prev.some((b) => b.id === item.id)
        ? prev.filter((b) => b.id !== item.id)
        : [...prev, { ...item, savedAt: Date.now() }];
      saveBookmarks(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => b.id !== id);
      saveBookmarks(next);
      return next;
    });
  }, []);

  return { bookmarks, isBookmarked, toggle, remove, hydrated };
}
