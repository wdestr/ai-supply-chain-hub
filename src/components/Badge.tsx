const colorMap: Record<string, string> = {
  blue: 'bg-electric-500/15 text-electric-400 border-electric-500/25',
  green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  purple: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
  amber: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  rose: 'bg-rose-500/15 text-rose-400 border-rose-500/25',
  cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  slate: 'bg-slate-500/15 text-slate-400 border-slate-500/25',
};

interface BadgeProps {
  label: string;
  color?: keyof typeof colorMap;
  size?: 'sm' | 'md';
}

export default function Badge({ label, color = 'blue', size = 'sm' }: BadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${colorMap[color] || colorMap.blue} ${sizeClasses}`}>
      {label}
    </span>
  );
}
