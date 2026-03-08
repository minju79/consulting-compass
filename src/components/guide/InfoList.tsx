interface InfoListProps {
  items: string[];
  ordered?: boolean;
}

export function InfoList({ items, ordered }: InfoListProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`space-y-2 text-sm text-muted-foreground ${ordered ? "list-decimal" : "list-disc"} pl-5`}>
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed">{item}</li>
      ))}
    </Tag>
  );
}
