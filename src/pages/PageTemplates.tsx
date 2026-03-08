import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { QuickSummary } from "@/components/guide/QuickSummary";
import { InPageToc } from "@/components/guide/InPageToc";
import { templateBlueprints } from "@/data/templateBlueprints";

const statusColors: Record<string, "required" | "optional" | "conditional" | "prohibited"> = {
  required: "required",
  optional: "optional",
  conditional: "conditional",
  prohibited: "prohibited",
};

const PageTemplates = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="Page Templates"
        title="페이지 템플릿"
        description="실제 고객사 사이트에 바로 적용 가능한 페이지별 블록 시스템입니다. 필수/선택/조건부/금지 블록과 proof 요구사항을 제공합니다."
      />

      <QuickSummary points={[
        "각 템플릿은 필수 / 선택 / 조건부 / 금지 블록으로 구분됩니다.",
        "'증거 필요' 블록은 실제 자산이 있어야 사용합니다. 없으면 대체안을 확인하세요.",
        "세부 컨설팅 유형별 변경점도 각 템플릿에 포함되어 있습니다.",
      ]} />

      <InPageToc items={templateBlueprints.map((t) => ({ id: t.id, label: t.title }))} />

      {templateBlueprints.map((tmpl) => (
        <SectionBlock key={tmpl.id} id={tmpl.id} title={tmpl.title} description={tmpl.description}>
          {/* 블록 구조 */}
          <div className="rounded-lg border bg-card overflow-hidden mb-4">
            <div className="px-4 py-2 bg-surface border-b">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">블록 구조</span>
            </div>
            {tmpl.blocks.map((block, i) => (
              <div key={block.name} className="flex items-start gap-3 px-4 py-2.5 border-b last:border-b-0 text-sm">
                <span className="font-mono text-xs text-muted-foreground w-5 shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-medium text-foreground text-xs">{block.name}</span>
                    <BadgeLabel type={statusColors[block.status]} />
                    {block.proofRequired && <BadgeLabel type="proof">증거</BadgeLabel>}
                    {block.seoRelevance && <BadgeLabel type="seo" />}
                  </div>
                  <span className="text-xs text-muted-foreground">{block.purpose}</span>
                  {block.condition && (
                    <p className="text-[10px] text-muted-foreground mt-0.5 italic">조건: {block.condition}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 메타 정보 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="rounded-lg border bg-card p-4">
              <span className="text-xs font-semibold text-muted-foreground">핵심 CTA</span>
              <p className="text-sm text-accent mt-1 font-medium">{tmpl.primaryCta}</p>
              {tmpl.secondaryCta && <p className="text-xs text-muted-foreground mt-0.5">보조: {tmpl.secondaryCta}</p>}
            </div>
            <div className="rounded-lg border bg-card p-4">
              <span className="text-xs font-semibold text-muted-foreground">필수 신뢰 요소</span>
              <ul className="mt-1 space-y-0.5">
                {tmpl.requiredTrust.map((t) => (
                  <li key={t} className="text-xs text-muted-foreground">• {t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <span className="text-xs font-semibold text-muted-foreground">SEO 포인트</span>
              <ul className="mt-1 space-y-0.5">
                {tmpl.seoPoints.map((s) => (
                  <li key={s} className="text-xs text-muted-foreground">• {s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <span className="text-xs font-semibold text-muted-foreground">모바일 축약</span>
              <ul className="mt-1 space-y-0.5">
                {tmpl.mobileShortcuts.map((m) => (
                  <li key={m} className="text-xs text-muted-foreground">• {m}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Proof & Fallbacks */}
          {(tmpl.proofRequirements.length > 0 || tmpl.assetFallbacks.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tmpl.proofRequirements.length > 0 && (
                <div className="rounded-lg border bg-card p-4">
                  <span className="text-xs font-semibold text-muted-foreground">증거 요구사항</span>
                  <ul className="mt-1 space-y-0.5">
                    {tmpl.proofRequirements.map((p) => (
                      <li key={p} className="text-xs text-foreground">• {p}</li>
                    ))}
                  </ul>
                </div>
              )}
              {tmpl.assetFallbacks.length > 0 && (
                <div className="rounded-lg border bg-card p-4">
                  <span className="text-xs font-semibold text-muted-foreground">자산 부족 시 대체안</span>
                  <ul className="mt-1 space-y-0.5">
                    {tmpl.assetFallbacks.map((f) => (
                      <li key={f} className="text-xs text-muted-foreground">• {f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Subtype variations */}
          {tmpl.subtypeVariations && tmpl.subtypeVariations.length > 0 && (
            <div className="rounded-lg border bg-surface p-4 mt-3">
              <span className="text-xs font-semibold text-muted-foreground">세부 유형별 변경점</span>
              <ul className="mt-1 space-y-0.5">
                {tmpl.subtypeVariations.map((v) => (
                  <li key={v} className="text-xs text-muted-foreground">• {v}</li>
                ))}
              </ul>
            </div>
          )}
        </SectionBlock>
      ))}
    </AppLayout>
  );
};

export default PageTemplates;
