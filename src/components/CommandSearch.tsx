import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getSortedRoutes } from "@/data/routeMeta";
import { Search } from "lucide-react";

const iconMap: Record<string, string> = {
  LayoutDashboard: "📊", Building2: "🏢", Palette: "🎨", Component: "🧩",
  Users: "👥", FileText: "📄", PenTool: "✍️", Search: "🔍",
  CheckSquare: "✅", ClipboardList: "📋", Map: "🗺️", Settings: "⚙️", ShieldCheck: "🛡️",
};

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const routes = getSortedRoutes();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors"
        aria-label="검색 (Ctrl+K)"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">검색</span>
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="페이지 검색..." />
        <CommandList>
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup heading="페이지">
            {routes.map((r) => (
              <CommandItem
                key={r.path}
                value={`${r.navTitle} ${r.title}`}
                onSelect={() => {
                  navigate(r.path);
                  setOpen(false);
                }}
              >
                <span className="mr-2">{iconMap[r.icon] || "📄"}</span>
                <span>{r.navTitle}</span>
                <span className="ml-auto text-xs text-muted-foreground">{r.path}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
