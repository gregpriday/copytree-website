interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

export default function FeatureCard({ icon, title, description, highlight = false }: FeatureCardProps) {
  return (
    <div className={`
      relative p-6 rounded-xl transition-all duration-200
      ${highlight 
        ? 'bg-gradient-to-br from-primary/10 to-emerald/10 border-2 border-primary/30 shadow-lg hover:shadow-xl hover:border-primary/50' 
        : 'bg-background border border-border hover:border-border/70 hover:shadow-md'
      }
    `}>
      <div className="flex items-start gap-4">
        <div className={`
          flex-shrink-0 p-3 rounded-lg
          ${highlight ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
        `}>
          {icon}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}