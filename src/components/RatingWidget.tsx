'use client';

import { useState, useEffect } from 'react';

interface Props {
  resourceType: 'tool' | 'platform';
  resourceId: string;  // slug
}

const STORAGE_KEY = (type: string, id: string) => `rated_${type}_${id}`;

export default function RatingWidget({ resourceType, resourceId }: Props) {
  const [average, setAverage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [hovered, setHovered] = useState<number>(0);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage for prior rating
    const key = STORAGE_KEY(resourceType, resourceId);
    setHasRated(!!localStorage.getItem(key));

    // Fetch current rating stats
    fetch(`/api/rate?type=${resourceType}&id=${encodeURIComponent(resourceId)}`)
      .then((r) => r.json())
      .then(({ average: avg, count: cnt }) => {
        setAverage(avg ?? 0);
        setCount(cnt ?? 0);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [resourceType, resourceId]);

  async function handleRate(rating: number) {
    if (hasRated || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: resourceType, id: resourceId, rating }),
      });
      if (res.ok) {
        localStorage.setItem(STORAGE_KEY(resourceType, resourceId), String(rating));
        setHasRated(true);
        // Optimistically update the display
        const newCount = count + 1;
        const newAverage = Math.round(((average * count + rating) / newCount) * 10) / 10;
        setAverage(newAverage);
        setCount(newCount);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (!loaded) return null;

  const displayRating = hovered || (hasRated ? average : 0);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-sm font-semibold text-white mb-3">Rate this {resourceType}</h3>
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={hasRated || submitting}
            onClick={() => handleRate(star)}
            onMouseEnter={() => !hasRated && setHovered(star)}
            onMouseLeave={() => !hasRated && setHovered(0)}
            className="transition-colors disabled:cursor-default"
            aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
          >
            <svg
              className={`h-6 w-6 transition-colors ${
                star <= displayRating
                  ? 'text-amber-400'
                  : 'text-slate-600 hover:text-amber-300'
              }`}
              fill={star <= displayRating ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        ))}
      </div>
      <div className="text-xs text-slate-500">
        {count > 0
          ? `${average} / 5 · ${count} rating${count !== 1 ? 's' : ''}`
          : 'No ratings yet'}
        {hasRated && <span className="ml-2 text-emerald-500">Thanks for rating!</span>}
      </div>
    </div>
  );
}
