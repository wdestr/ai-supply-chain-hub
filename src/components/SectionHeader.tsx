interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-base text-slate-400">{subtitle}</p>}
    </div>
  );
}
