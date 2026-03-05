interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm ${
        hover ? 'transition-all duration-300 hover:border-electric-500/30 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-electric-500/5' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
