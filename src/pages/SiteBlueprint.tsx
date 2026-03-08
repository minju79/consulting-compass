import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { CopyBlock } from "@/components/guide/CopyBlock";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Sparkles, Copy } from "lucide-react";
import {
  BriefData,
  exampleBrief,
  loadBrief,
  saveBrief,
  analyzeBrief,
  generateBlueprints,
  generateLovablePrompt,
  PageBlueprint,
} from "@/lib/brief";

const statusColors: Record<string, string> = {
  required: "bg-primary/10 text-primary border-primary/20",
  optional: "bg-muted text-muted-foreground border-border",
  conditional: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  prohibited: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels: Record<string, string> = {
  required: "필수", optional: "선택", conditional: "조건부", prohibited: "금지",
};

function PageBlueprintCard({ bp }: { bp: PageBlueprint }) {
  const blocksByStatus = {
    required: bp.blocks.filter((b) => b.status === "required"),
    optional: bp.blocks.filter((b) => b.status === "optional"),
    conditional: bp.blocks.filter((b) => b.status === "conditional"),
    prohibited: bp.blocks.filter((b) => b.status === "prohibited"),
  };

  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <h4 className="font-semibold text-sm text-foreground">{bp.name}</h4>
        <BadgeLabel type={bp.status === "필수" ? "required" : bp.status === "권장" ? "recommended" : bp.status === "조건부" ? "conditional" : "optional"}>
          {bp.status}
        </BadgeLabel>
        {bp.condition && <span className="text-[10px] text-muted-foreground">({bp.condition})</span>}
      </div>

      {/* Blocks by status */}
      <div className="space-y-3 mb-4">
        {(["required", "optional", "conditional", "prohibited"] as const).map((status) => {
          const blocks = blocksByStatus[status];
          if (blocks.length === 0) return null;
          return (
            <div key={status}>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1 block">
                {statusLabels[status]} 블록
              </span>
              <div className="space-y-1">
                {blocks.map((b) => (
                  <div key={b.name} className="flex items-start gap-2 text-xs">
                    <span className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] font-semibold shrink-0 mt-0.5 ${statusColors[b.status]}`}>
                      {statusLabels[b.status]}
                    </span>
                    <span className="text-foreground">{b.name}</span>
                    {b.note && <span className="text-muted-foreground">— {b.note}</span>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-3 border-t">
        <div><span className="text-muted-foreground font-semibold">핵심 CTA:</span> <span className="text-accent font-medium">"{bp.cta}"</span></div>
        {bp.secondaryCta && <div><span className="text-muted-foreground font-semibold">보조 CTA:</span> <span className="text-foreground">"{bp.secondaryCta}"</span></div>}
        <div><span className="text-muted-foreground font-semibold">모바일:</span> <span className="text-foreground">{bp.mobileRule}</span></div>
        {bp.proofElements.length > 0 && (
          <div className="col-span-2"><span className="text-muted-foreground font-semibold">증거 요소:</span> <span className="text-foreground">{bp.proofElements.join(", ")}</span></div>
        )}
        {bp.seoPoints.length > 0 && (
          <div className="col-span-2"><span className="text-muted-foreground font-semibold">SEO:</span> <span className="text-foreground">{bp.seoPoints.join(", ")}</span></div>
        )}
        {bp.assetFallbacks && bp.assetFallbacks.length > 0 && (
          <div className="col-span-2"><span className="text-destructive font-semibold">자산 부족 대체:</span> <span className="text-muted-foreground">{bp.assetFallbacks.join("; ")}</span></div>
        )}
        {bp.subtypeNotes && (
          <div className="col-span-2"><span className="text-muted-foreground font-semibold">유형 참고:</span> <span className="text-foreground">{bp.subtypeNotes}</span></div>
        )}
        {bp.reviewClaims && bp.reviewClaims.length > 0 && (
          <div className="col-span-2"><span className="text-yellow-600 font-semibold">검토 필요:</span> <span className="text-muted-foreground">{bp.reviewClaims.join("; ")}</span></div>
        )}
      </div>
    </div>
  );
}

const SiteBlueprint = () => {
  const brief = useMemo(() => loadBrief(), []);
  const isEmpty = !brief.companyName && !brief.consultingType && !brief.coreServices;
  const analysis = useMemo(() => analyzeBrief(brief), [brief]);
  const blueprints = useMemo(() => isEmpty ? [] : generateBlueprints(brief, analysis), [brief, analysis, isEmpty]);
  const prompt = useMemo(() => isEmpty ? "" : generateLovablePrompt(brief, analysis, blueprints), [brief, analysis, blueprints, isEmpty]);

  const handleLoadExample = () => {
    saveBrief(exampleBrief);
    window.location.reload();
  };

  if (isEmpty) {
    return (
      <AppLayout>
        <PageHeader badge="Site Blueprint" title="사이트 청사진" description="고객사 브리프를 기반으로 공개용 컨설팅 사이트 구조를 동적으로 생성합니다." />
        <div className="rounded-lg border-2 border-dashed bg-surface p-10 text-center">
          <AlertTriangle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">브리프 데이터가 없습니다</h3>
          <p className="text-sm text-muted-foreground mb-6">Client Brief에서 고객사 정보를 먼저 입력해 주세요.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/client-brief" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              브리프 작성하기 <ArrowRight className="h-4 w-4" />
            </Link>
            <button onClick={handleLoadExample} className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
              <Sparkles className="h-4 w-4 text-accent" /> 예시 데이터로 미리보기
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const requiredPages = blueprints.filter((bp) => bp.status === "필수");
  const recommendedPages = blueprints.filter((bp) => bp.status === "권장");
  const conditionalPages = blueprints.filter((bp) => bp.status === "조건부" || bp.status === "제거 가능");

  return (
    <AppLayout>
      <PageHeader badge="Site Blueprint" title="사이트 청사진" description={`${brief.companyName || "고객사"} 브리프 기반으로 생성된 공개용 컨설팅 사이트 구조입니다.`} />

      {/* Quick summary */}
      <div className="rounded-lg border bg-accent/5 border-accent/20 p-4 mb-6">
        <p className="text-sm text-foreground font-medium mb-1">📋 빠른 적용 포인트</p>
        <ul className="text-xs text-muted-foreground space-y-0.5">
          <li>• 사이트 유형: <strong className="text-accent">{analysis.siteType}</strong> — {analysis.siteTypeReason}</li>
          <li>• 추천 규모: <strong className="text-foreground">{analysis.scaleRecommendation}</strong> · 총 {blueprints.length}개 페이지 · 증거 자산 {analysis.proofScore}/8</li>
          <li>• 핵심 CTA: <strong className="text-foreground">"{analysis.recommendedCta}"</strong></li>
          <li>• 유형: {analysis.isBoutique ? "부티크 컨설팅" : "종합 컨설팅"} · 산업 특화: {analysis.hasIndustryFocus ? `${analysis.industryCount}개 산업` : "일반"}</li>
        </ul>
      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-lg border bg-accent/5 border-accent/20 p-4">
          <span className="text-[10px] text-muted-foreground">추천 사이트 유형</span>
          <p className="text-sm font-bold text-accent">{analysis.siteType}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <span className="text-[10px] text-muted-foreground">추천 규모</span>
          <p className="text-sm font-bold text-foreground">{analysis.scaleRecommendation} 구조</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <span className="text-[10px] text-muted-foreground">핵심 CTA</span>
          <p className="text-sm font-bold text-foreground">{analysis.recommendedCta}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <span className="text-[10px] text-muted-foreground">증거 자산</span>
          <p className="text-sm font-bold text-foreground">{analysis.proofScore}/8 보유</p>
        </div>
      </div>

      {/* Site type reasoning */}
      <SectionBlock id="site-type" title="추천 사이트 유형 판별 근거">
        <div className="rounded-lg border bg-card p-5">
          <p className="text-sm text-foreground mb-2"><strong>{analysis.siteType}</strong></p>
          <p className="text-xs text-muted-foreground mb-3">{analysis.siteTypeReason}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="rounded-md border bg-surface px-3 py-2">
              <span className="text-muted-foreground">유형:</span>
              <span className="text-foreground ml-1">{analysis.isBoutique ? "부티크" : "종합"}</span>
            </div>
            <div className="rounded-md border bg-surface px-3 py-2">
              <span className="text-muted-foreground">산업:</span>
              <span className="text-foreground ml-1">{analysis.hasIndustryFocus ? `${analysis.industryCount}개 특화` : "일반"}</span>
            </div>
            <div className="rounded-md border bg-surface px-3 py-2">
              <span className="text-muted-foreground">규모:</span>
              <span className="text-foreground ml-1">{brief.projectScale || "미지정"}</span>
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* Required Pages */}
      <SectionBlock id="required-pages" title={`필수 페이지 (${requiredPages.length}개)`}>
        <div className="space-y-4">
          {requiredPages.map((bp) => <PageBlueprintCard key={bp.name} bp={bp} />)}
        </div>
      </SectionBlock>

      {/* Recommended Pages */}
      {recommendedPages.length > 0 && (
        <SectionBlock id="recommended-pages" title={`권장 페이지 (${recommendedPages.length}개)`}>
          <div className="space-y-4">
            {recommendedPages.map((bp) => <PageBlueprintCard key={bp.name} bp={bp} />)}
          </div>
        </SectionBlock>
      )}

      {/* Conditional Pages */}
      {conditionalPages.length > 0 && (
        <SectionBlock id="conditional-pages" title={`조건부 페이지 (${conditionalPages.length}개)`}>
          <div className="space-y-4">
            {conditionalPages.map((bp) => <PageBlueprintCard key={bp.name} bp={bp} />)}
          </div>
        </SectionBlock>
      )}

      {/* Hero & Meta Recommendations */}
      <SectionBlock id="hero-meta" title="추천 히어로 & 메타 구조">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-2">히어로 카피 구조</h4>
            <p className="text-xs font-mono text-accent">{analysis.recommendedHero}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {brief.companyName && `예: "${brief.targetClients?.split(",")[0]?.trim() || "[타겟]"}을 위한 ${brief.coreServices?.split(",")[0]?.trim() || "[서비스]"} — ${brief.companyName}"`}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-2">추천 메타 타이틀</h4>
            <p className="text-xs font-mono text-muted-foreground">홈: {brief.companyName} — {brief.coreServices?.split(",")[0]?.trim()} 전문 컨설팅</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">서비스: [서비스명] | {brief.companyName}</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">사례: [산업] 프로젝트 사례 | {brief.companyName}</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">팀: 전문가 소개 | {brief.companyName}</p>
          </div>
        </div>
      </SectionBlock>

      {/* Proof Summary */}
      <SectionBlock id="proof" title="증거 자산 기반 추천">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {analysis.proofSummary.map((p) => (
            <div key={p.id} className={`rounded-md border px-3 py-2 ${p.status === "보유" ? "bg-accent/5 border-accent/20" : p.status === "부족" ? "bg-destructive/5 border-destructive/20" : "bg-muted"}`}>
              <span className="text-xs text-muted-foreground">{p.label}</span>
              <p className="text-xs font-semibold mt-0.5">{p.status}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-3 text-xs">
          <Link to="/proof-system" className="text-accent hover:underline">증거 체계 상세 →</Link>
          <Link to="/implementation-rules" className="text-accent hover:underline">구현 규칙 →</Link>
        </div>
      </SectionBlock>

      {/* Lovable Prompt */}
      <SectionBlock id="prompt" title="Lovable 공개 사이트 생성 프롬프트">
        <CopyBlock content={prompt} label="생성 프롬프트 — 복사하여 Lovable에 붙여넣기" />
      </SectionBlock>

      {/* Workflow CTA */}
      <div className="flex flex-wrap gap-3 mt-4">
        <Link to="/implementation-rules" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          구현 규칙 확인하기 <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/proof-system" className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
          신뢰 증거 체계 보기
        </Link>
        <Link to="/client-brief" className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
          브리프 수정하기
        </Link>
      </div>
    </AppLayout>
  );
};

export default SiteBlueprint;
