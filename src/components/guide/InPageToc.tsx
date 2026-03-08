interface TocItem {
  id: string;
  label: string;
}

interface InPageTocProps {
  items: TocItem[];
}

export function InPageToc({ items }: InPageTocProps) {
  if (items.length < 3) return null;
  return (
    <nav aria-label="페이지 내 목차" className="rounded-lg border bg-surface p-4 mb-8">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">목차</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-xs text-muted-foreground hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
