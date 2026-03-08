import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface GuideCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  href?: string;
  accent?: boolean;
}

export function GuideCard({ title, description, icon, href, accent }: GuideCardProps) {
  const content = (
    <div
      className={`group rounded-lg border p-5 md:p-6 transition-all duration-200 hover:shadow-md ${
        accent
          ? "border-accent/30 bg-accent/5 hover:border-accent/50"
          : "border-border bg-card hover:border-accent/30"
      }`}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="shrink-0 mt-0.5 text-accent">{icon}</div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm md:text-base mb-1 flex items-center gap-2">
            {title}
            {href && (
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            )}
          </h3>
          <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }
  return content;
}
