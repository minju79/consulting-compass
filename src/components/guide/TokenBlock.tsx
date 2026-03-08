interface Token {
  name: string;
  value: string;
  preview?: string; // CSS color string for swatch
}

interface TokenBlockProps {
  title: string;
  tokens: Token[];
}

export function TokenBlock({ title, tokens }: TokenBlockProps) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tokens.map((t) => (
          <div key={t.name} className="flex items-center gap-3 rounded-md border bg-card p-3">
            {t.preview && (
              <div
                className="w-8 h-8 rounded-md border shrink-0"
                style={{ backgroundColor: t.preview }}
              />
            )}
            <div className="min-w-0">
              <p className="text-xs font-mono font-medium text-foreground truncate">{t.name}</p>
              <p className="text-xs text-muted-foreground truncate">{t.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
