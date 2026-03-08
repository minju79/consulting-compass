import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyBlockProps {
  content: string;
  label?: string;
  language?: string;
}

export function CopyBlock({ content, label, language }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      {label && (
        <div className="flex items-center justify-between px-4 py-2 bg-surface border-b">
          <span className="text-xs font-semibold text-foreground">{label}</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={copied ? "복사됨" : "복사"}
          >
            {copied ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
            {copied ? "복사됨" : "복사"}
          </button>
        </div>
      )}
      <pre className="text-[11px] font-mono text-muted-foreground p-4 overflow-x-auto whitespace-pre-wrap">{content}</pre>
      {!label && (
        <div className="flex justify-end px-3 pb-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={copied ? "복사됨" : "복사"}
          >
            {copied ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
            {copied ? "복사됨" : "복사"}
          </button>
        </div>
      )}
    </div>
  );
}
