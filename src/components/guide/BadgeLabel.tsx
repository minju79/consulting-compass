interface BadgeLabelProps {
  type: "required" | "recommended" | "optional" | "conditional" | "prohibited" | "proof" | "review" | "seo";
  children?: React.ReactNode;
}

const styles: Record<string, string> = {
  required: "bg-primary/10 text-primary border-primary/20",
  recommended: "bg-accent/10 text-accent border-accent/20",
  optional: "bg-muted text-muted-foreground border-border",
  conditional: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  prohibited: "bg-destructive/10 text-destructive border-destructive/20",
  proof: "bg-orange-500/10 text-orange-700 border-orange-500/20",
  review: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  seo: "bg-blue-500/10 text-blue-700 border-blue-500/20",
};

const labels: Record<string, string> = {
  required: "필수",
  recommended: "권장",
  optional: "선택",
  conditional: "조건부",
  prohibited: "금지",
  proof: "증거 필요",
  review: "검토 필요",
  seo: "SEO",
};

export function BadgeLabel({ type, children }: BadgeLabelProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${styles[type]}`}>
      {children || labels[type]}
    </span>
  );
}
