import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { useState } from "react";
import { checklistGroups } from "@/data/checklistDefinitions";

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

const Checklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (groupId: string, index: number) => {
    const key = `${groupId}-${index}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getGroupProgress = (group: typeof checklistGroups[number]) => {
    const checked = group.items.filter((_, i) => checkedItems[`${group.id}-${i}`]).length;
    return { checked, total: group.items.length };
  };

  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = checklistGroups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <AppLayout>
      <PageHeader
        badge="Checklist"
        title="실무 체크리스트"
        description="컨설팅 업종 홈페이지 제작의 각 단계별 검수 항목입니다. 기획부터 런칭까지 10개 카테고리를 체크하세요."
      />

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
