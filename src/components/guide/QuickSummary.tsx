interface QuickSummaryProps {
  points: string[];
  title?: string;
}

export function QuickSummary({ points, title = "📋 빠른 적용 포인트" }: QuickSummaryProps) {
  return (
    <div className="rounded-lg border bg-accent/5 border-accent/20 p-4 mb-8">
      <p className="text-sm text-foreground font-medium mb-1">{title}</p>
      <ul className="text-xs text-muted-foreground space-y-1">
        {points.map((point, i) => (
          <li key={i}>• {point}</li>
        ))}
      </ul>
    </div>
  );
}
