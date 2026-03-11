'use client';

import { useBookmarks, type Bookmark } from '@/lib/useBookmarks';

interface Props {
  item: Omit<Bookmark, 'savedAt'>;
  className?: string;
}

export default function BookmarkButton({ item, className = '' }: Props) {
  const { isBookmarked, toggle, hydrated } = useBookmarks();

  if (!hydrated) return null;

  const bookmarked = isBookmarked(item.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle({ ...item, savedAt: Date.now() });
      }}
      title={bookmarked ? 'Remove bookmark' : 'Save bookmark'}
      aria-label={bookmarked ? 'Remove bookmark' : 'Save bookmark'}
      className={`transition-colors ${bookmarked ? 'text-electric-400' : 'text-slate-500 hover:text-slate-300'} ${className}`}
    >
      <svg className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
  );
}
