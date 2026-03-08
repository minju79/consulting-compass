import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { CopyBlock } from "@/components/guide/CopyBlock";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
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
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <h4 className="font-semibold text-sm text-foreground">{bp.name}</h4>
        <BadgeLabel type={bp.status === "필수" ? "required" : bp.status === "권장" ? "recommended" : bp.status === "조건부" ? "conditional" : "optional"}>
          {bp.status}
        </BadgeLabel>
        {bp.condition && <span className="text-[10px] text-muted-foreground">({bp.condition})</span>}
      </div>

      {/* Blocks */}
      <div className="space-y-1.5 mb-3">
        {bp.blocks.map((b) => (
          <div key={b.name} className="flex items-center gap-2 text-xs">
            <span className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${statusColors[b.status]}`}>
              {statusLabels[b.status]}
            </span>
            <span className="text-foreground">{b.name}</span>
            {b.note && <span className="text-muted-foreground">— {b.note}</span>}
          </div>
        ))}
      </div>

      {/* Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] mt-3 pt-3 border-t">
        <div><span className="text-muted-foreground font-semibold">핵심 CTA:</span> <span className="text-accent font-medium">{bp.cta}</span></div>
        <div><span className="text-muted-foreground font-semibold">모바일:</span> <span className="text-foreground">{bp.mobileRule}</span></div>
        {bp.proofElements.length > 0 && (
          <div className="col-span-2"><span className="text-muted-foreground font-semibold">증거 요소:</span> <span className="text-foreground">{bp.proofElements.join(", ")}</span></div>
        )}
        {bp.seoPoints.length > 0 && (
          <div className="col-span-2"><span className="text-muted-foreground font-semibold">SEO:</span> <span className="text-foreground">{bp.seoPoints.join(", ")}</span></div>
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

  return (
    <AppLayout>
      <PageHeader badge="Site Blueprint" title="사이트 청사진" description={`${brief.companyName || "고객사"} 브리프 기반으로 생성된 공개용 컨설팅 사이트 구조입니다.`} />

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
          <p className="text-xs text-muted-foreground">{analysis.siteTypeReason}</p>
        </div>
      </SectionBlock>

      {/* Page Blueprints */}
      <SectionBlock id="pages" title={`추천 페이지 구조 (${blueprints.length}개)`}>
        <div className="space-y-4">
          {blueprints.map((bp) => <PageBlueprintCard key={bp.name} bp={bp} />)}
        </div>
      </SectionBlock>

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
      </div>
    </AppLayout>
  );
};

export default SiteBlueprint;
