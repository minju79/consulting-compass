import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { QuickSummary } from "@/components/guide/QuickSummary";
import { InPageToc } from "@/components/guide/InPageToc";
import { useState, useCallback, useEffect, useRef } from "react";
import { checklistGroups } from "@/data/checklistDefinitions";

const CHECKLIST_STORAGE_KEY = "consulting-guide-checklist";

const categoryLabels: Record<string, string> = {
  planning: "기획",
  design: "디자인",
  ui: "UI",
  ux: "UX",
  content: "콘텐츠",
  seo: "SEO",
  a11y: "접근성",
  mobile: "모바일",
  proof: "신뢰 증거",
  launch: "런칭",
};

function loadChecked(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveChecked(data: Record<string, boolean>) {
  try {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

const Checklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => loadChecked());
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

  // Auto-save to localStorage
  const schedSave = useCallback((data: Record<string, boolean>) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveChecked(data), 300);
  }, []);

  const toggleItem = (groupId: string, index: number) => {
    const key = `${groupId}-${index}`;
    setCheckedItems((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      schedSave(next);
      return next;
    });
  };

  useEffect(() => {
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, []);

  const getGroupProgress = (group: typeof checklistGroups[number]) => {
    const checked = group.items.filter((_, i) => checkedItems[`${group.id}-${i}`]).length;
    return { checked, total: group.items.length };
  };

  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = checklistGroups.reduce((sum, g) => sum + g.items.length, 0);

  const tocItems = checklistGroups.map((g) => ({
    id: g.id,
    label: `${categoryLabels[g.category]} — ${g.title}`,
  }));

  return (
    <AppLayout>
      <PageHeader
        badge="Checklist"
        title="실무 체크리스트"
        description="컨설팅 업종 홈페이지 제작의 각 단계별 검수 항목입니다. 기획부터 런칭까지 10개 카테고리를 체크하세요."
      />

      <QuickSummary points={[
        "체크 상태는 브라우저에 자동 저장됩니다. 같은 기기에서 다시 열면 이어서 체크할 수 있습니다.",
        "기획 → 디자인 → UI → UX → 콘텐츠 → SEO → 접근성 → 모바일 → 신뢰 증거 → 런칭 순서로 검수하세요.",
        "모든 카테고리 100% 완료 후 런칭 승인을 진행하세요.",
      ]} />

      <InPageToc items={tocItems} />

      {/* 전체 진행률 */}
      <div className="rounded-lg border bg-card p-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">전체 진행률</span>
          <span className="text-sm font-bold text-accent">{totalChecked}/{totalItems}</span>
        </div>
        <div className="h-2.5 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${totalItems > 0 ? (totalChecked / totalItems) * 100 : 0}%` }}
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {checklistGroups.map((group) => {
            const p = getGroupProgress(group);
            const done = p.checked === p.total;
            return (
              <a key={group.id} href={`#${group.id}`} className={`text-[10px] px-2 py-1 rounded border transition-colors ${done ? "bg-accent/10 border-accent/30 text-accent" : "bg-surface border-border text-muted-foreground hover:text-foreground"}`}>
                {categoryLabels[group.category]} {p.checked}/{p.total}
              </a>
            );
          })}
        </div>
      </div>

      {checklistGroups.map((group) => {
        const progress = getGroupProgress(group);
        return (
          <SectionBlock key={group.id} id={group.id} title={group.title}>
            <div className="mb-3 flex items-center gap-3">
              <BadgeLabel type={progress.checked === progress.total ? "required" : "optional"}>
                {categoryLabels[group.category]}
              </BadgeLabel>
              <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${(progress.checked / progress.total) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground shrink-0">
                {progress.checked}/{progress.total}
              </span>
            </div>
            <div className="rounded-lg border bg-card overflow-hidden">
              {group.items.map((item, i) => {
                const key = `${group.id}-${i}`;
                const isChecked = checkedItems[key] || false;
                return (
                  <label
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-surface/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(group.id, i)}
                      className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent shrink-0"
                    />
                    <span className={`text-sm ${isChecked ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </SectionBlock>
        );
      })}
    </AppLayout>
  );
};

export default Checklist;
