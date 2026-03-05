interface HeroProps {
  title: string;
  subtitle: string;
  gradient?: string;
  children?: React.ReactNode;
}

export default function Hero({ title, subtitle, gradient = 'from-electric-500 to-emerald-500', children }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5`} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-400 sm:text-xl">
          {subtitle}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
