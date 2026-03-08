import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { getRoutesByGroup } from "@/data/routeMeta";
import { industryConfig } from "@/data/industryConfig";
import { Search } from "lucide-react";

const iconMap: Record<string, string> = {
  LayoutDashboard: "📊", Building2: "🏢", Palette: "🎨", Component: "🧩",
  Users: "👥", FileText: "📄", PenTool: "✍️", Search: "🔍",
  CheckSquare: "✅", ClipboardList: "📋", Map: "🗺️", Settings: "⚙️", ShieldCheck: "🛡️",
};

const groupLabels: Record<string, string> = {
  guide: "📘 가이드",
  tool: "🛠️ 제작 도구",
};

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const guideRoutes = getRoutesByGroup("guide");
  const toolRoutes = getRoutesByGroup("tool");

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

  const renderGroup = (routes: typeof guideRoutes, group: "guide" | "tool") => (
    <CommandGroup heading={groupLabels[group] || industryConfig.navGroups[group]}>
      {routes.map((r) => (
        <CommandItem
          key={r.path}
          value={`${r.navTitle} ${r.breadcrumbLabel} ${r.description} ${r.searchIntent || ""} ${(r.keywords || []).join(" ")}`}
          onSelect={() => { navigate(r.path); setOpen(false); }}
          className="flex items-start gap-3 py-2.5"
        >
          <span className="text-base mt-0.5 shrink-0">{iconMap[r.icon] || "📄"}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{r.navTitle}</span>
              <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">
                {r.group === "guide" ? "가이드" : "도구"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{r.breadcrumbLabel} — {r.description.slice(0, 60)}{r.description.length > 60 ? "…" : ""}</p>
          </div>
          <span className="ml-auto text-[10px] text-muted-foreground/50 shrink-0 mt-1 hidden sm:block">{r.path}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );

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
        <CommandInput placeholder="페이지 검색... (이름, 설명, 키워드, 사용 목적)" />
        <CommandList>
          <CommandEmpty>
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground">검색 결과가 없습니다.</p>
              <p className="text-xs text-muted-foreground mt-1">다른 키워드로 시도해 보세요.</p>
              <p className="text-[10px] text-muted-foreground/50 mt-2">팁: 페이지 이름, 설명, 키워드, 검색 의도로 검색할 수 있습니다.</p>
            </div>
          </CommandEmpty>
          {renderGroup(guideRoutes, "guide")}
          {renderGroup(toolRoutes, "tool")}
        </CommandList>
      </CommandDialog>
    </>
  );
}
