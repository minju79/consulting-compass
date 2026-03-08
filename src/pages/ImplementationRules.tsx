import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { CopyBlock } from "@/components/guide/CopyBlock";
import { InfoList } from "@/components/guide/InfoList";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { loadBrief, saveBrief, exampleBrief, analyzeBrief, generateBlueprints, getProofFallbacks, BriefData } from "@/lib/brief";

function RuleCard({ condition, result, active }: { condition: string; result: string; active: boolean }) {
  return (
    <div className={`rounded-lg border p-4 transition-colors ${active ? "bg-accent/5 border-accent/30" : "bg-card"}`}>
      <div className="flex items-center gap-2 mb-1">
        {active && <BadgeLabel type="required">적용</BadgeLabel>}
        {!active && <BadgeLabel type="optional">비활성</BadgeLabel>}
        <span className="text-xs text-muted-foreground">{condition}</span>
      </div>
      <p className={`text-sm ${active ? "text-accent font-medium" : "text-foreground"}`}>→ {result}</p>
    </div>
  );
}

const templateSelectionRules = [
  { condition: "인바운드 영업 중심 + 사례 3건 이상", result: "케이스 스터디 중심형 + 리드 수집형 혼합", check: (b: BriefData) => b.salesMethod?.includes("인바운드") && b.hasCases },
  { condition: "부티크 컨설팅 + 전문가 중심", result: "전문가 중심형", check: (b: BriefData) => b.projectScale === "소규모 (1~3개월)" && b.hasExpertProfiles },
  { condition: "산업 특화 + 2개 이상 산업 페이지", result: "산업 특화형", check: (b: BriefData) => (b.industries?.split(",").filter((s) => s.trim()).length || 0) >= 2 },
  { condition: "블로그/리포트 정기 발행 + SEO 유입", result: "인사이트 중심형", check: (b: BriefData) => b.hasInsights && b.hasDownloads },
  { condition: "사례 + 수치 보유", result: "케이스 스터디 중심형", check: (b: BriefData) => b.hasCases === true && b.hasMetrics === true },
  { condition: "증거 자산 5개 이상", result: "신뢰 증명형", check: (b: BriefData) => { const a = analyzeBrief(b); return a.proofScore >= 5; } },
  { condition: "일반적인 종합 컨설팅", result: "리드 수집형 (기본)", check: () => true },
  { condition: "빠른 제작 + 낮은 예산", result: "최소 구조: 홈 + 서비스 + 문의 3페이지", check: () => false },
];

const ctaRules = [
  { condition: "B2B 고가치 프로젝트", cta: "프로젝트 문의하기", check: (b: BriefData) => b.primaryCta === "프로젝트 문의" },
  { condition: "무료 초기 진단 제공", cta: "무료 진단 신청하기", check: (b: BriefData) => b.primaryCta === "무료 진단 신청" },
  { condition: "리포트/가이드 리드젠", cta: "무료 리포트 다운로드", check: (b: BriefData) => b.primaryCta === "리포트 다운로드" },
  { condition: "전화 상담 선호", cta: "전문가 전화 상담 예약", check: (b: BriefData) => b.primaryCta === "전화 상담" },
  { condition: "세미나/웨비나 기반", cta: "세미나 참가 신청하기", check: (b: BriefData) => b.primaryCta === "세미나 참가" },
  { condition: "일반 상담 문의", cta: "전문가 상담 신청하기", check: (b: BriefData) => b.primaryCta === "상담 문의" },
];

const layoutRules = [
  { condition: "사례 보유 + 산업 2개 이상", layout: "산업별 → 사례별 이중 탐색 구조", check: (b: BriefData) => b.hasCases && (b.industries?.split(",").filter((s) => s.trim()).length || 0) >= 2 },
  { condition: "서비스 6개 이상", layout: "서비스 카테고리 분류 → 서브 페이지 분리", check: (b: BriefData) => (b.coreServices?.split(",").filter((s) => s.trim()).length || 0) >= 6 },
  { condition: "부티크 모델", layout: "전문가 중심 1페이지 통합 가능", check: (b: BriefData) => b.projectScale === "소규모 (1~3개월)" },
  { condition: "다국어 필요", layout: "언어 스위처 + hreflang 적용", check: (b: BriefData) => b.needsMultilang === true },
  { condition: "인사이트 운영", layout: "블로그/인사이트 섹션 + 카테고리 구조", check: (b: BriefData) => b.hasInsights === true },
  { condition: "다운로드 리소스 보유", layout: "리포트 랜딩 페이지 + 리드젠 폼", check: (b: BriefData) => b.hasDownloads === true },
];

const ImplementationRules = () => {
  const brief = useMemo(() => loadBrief(), []);
  const isEmpty = !brief.companyName && !brief.consultingType;
  const analysis = useMemo(() => analyzeBrief(brief), [brief]);
  const blueprints = useMemo(() => isEmpty ? [] : generateBlueprints(brief, analysis), [brief, analysis, isEmpty]);
  const proofFallbacks = useMemo(() => getProofFallbacks(analysis), [analysis]);

  const handleLoadExample = () => {
    saveBrief(exampleBrief);
    window.location.reload();
  };

  const requiredBlocks = blueprints.flatMap((bp) => bp.blocks.filter((b) => b.status === "required")).map((b) => b.name);
  const uniqueRequired = [...new Set(requiredBlocks)];
  const conditionalBlocks = blueprints.flatMap((bp) => bp.blocks.filter((b) => b.status === "conditional")).map((b) => `${b.name}${b.note ? ` (${b.note})` : ""}`);
  const uniqueConditional = [...new Set(conditionalBlocks)];
  const prohibitedBlocks = blueprints.flatMap((bp) => bp.blocks.filter((b) => b.status === "prohibited")).map((b) => b.name);
  const uniqueProhibited = [...new Set(prohibitedBlocks)];
  const optionalBlocks = blueprints.flatMap((bp) => bp.blocks.filter((b) => b.status === "optional")).map((b) => b.name);
  const uniqueOptional = [...new Set(optionalBlocks)];

  const activeProofFallbacks = proofFallbacks.filter((f) => f.active);

  const implGuide = `# ${brief.companyName || "[회사명]"} 구현 지침 요약

## 사이트 유형: ${analysis.siteType}
판별 근거: ${analysis.siteTypeReason}

## 추천 규모: ${analysis.scaleRecommendation}
## 유형: ${analysis.isBoutique ? "부티크 컨설팅" : "종합 컨설팅"}
## 핵심 CTA: "${analysis.recommendedCta}"
## 보조 CTA: "${analysis.recommendedSecondaryCta}"

## 필수 블록 (${uniqueRequired.length}개)
${uniqueRequired.map((b) => `- ${b}`).join("\n")}

## 선택 블록 (${uniqueOptional.length}개)
${uniqueOptional.map((b) => `- ${b}`).join("\n") || "없음"}

## 조건부 블록 (${uniqueConditional.length}개)
${uniqueConditional.map((b) => `- ${b}`).join("\n") || "없음"}

## 금지 블록 (${uniqueProhibited.length}개)
${uniqueProhibited.map((b) => `- ${b}`).join("\n") || "없음"}

## 증거 자산 대체 전략
${activeProofFallbacks.map((f) => `- ${f.asset}: ${f.fallback}`).join("\n") || "모두 보유 — 대체 불필요"}

## 페이지 구성 (${blueprints.length}개)
${blueprints.map((bp) => `- ${bp.name} (${bp.status})`).join("\n")}

## 핵심 신뢰 블록 (예산 축소 시에도 유지)
- Hero + 핵심 메시지
- 서비스 개요
- 프로세스/방법론
- CTA 배너
- 연락 정보
${brief.hasCases ? "- 케이스 스터디 하이라이트" : ""}
`;

  return (
    <AppLayout>
      <PageHeader badge="Implementation Rules" title="구현 규칙" description="Client Brief 기반으로 실제 제작 시 바로 적용할 수 있는 조건부 구현 규칙입니다." />

      {/* Quick summary */}
      {!isEmpty && (
        <div className="rounded-lg border bg-accent/5 border-accent/20 p-4 mb-6">
          <p className="text-sm text-foreground font-medium mb-1">📋 빠른 적용 포인트</p>
          <ul className="text-xs text-muted-foreground space-y-0.5">
            <li>• 사이트 유형: <strong className="text-accent">{analysis.siteType}</strong> · {analysis.isBoutique ? "부티크" : "종합"} · {analysis.hasIndustryFocus ? `${analysis.industryCount}개 산업 특화` : "일반"}</li>
            <li>• 필수 블록 {uniqueRequired.length}개 · 조건부 {uniqueConditional.length}개 · 금지 {uniqueProhibited.length}개 · 자산 대체 필요 {activeProofFallbacks.length}개</li>
            <li>• 추천 규모: <strong className="text-foreground">{analysis.scaleRecommendation}</strong> · 총 {blueprints.length}개 페이지</li>
            <li>• 콘텐츠: {analysis.hasContentStrategy ? "인사이트 운영" : "미운영"} · 다운로드: {analysis.hasDownloadStrategy ? "운영" : "미운영"}</li>
          </ul>
        </div>
      )}

      {isEmpty && (
        <div className="rounded-lg border-2 border-dashed bg-surface p-8 text-center mb-8">
          <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-base font-semibold text-foreground mb-1">브리프 데이터가 없습니다</h3>
          <p className="text-sm text-muted-foreground mb-4">브리프를 작성하면 입력값에 따라 실제 규칙이 활성화됩니다.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/client-brief" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">브리프 작성하기 <ArrowRight className="h-4 w-4" /></Link>
            <button onClick={handleLoadExample} className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"><Sparkles className="h-4 w-4 text-accent" /> 예시로 보기</button>
          </div>
        </div>
      )}

      {!isEmpty && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <div className="rounded-lg border bg-accent/5 border-accent/20 p-4">
            <span className="text-[10px] text-muted-foreground">사이트 유형</span>
            <p className="text-sm font-bold text-accent">{analysis.siteType}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <span className="text-[10px] text-muted-foreground">추천 규모</span>
            <p className="text-sm font-bold text-foreground">{analysis.scaleRecommendation}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <span className="text-[10px] text-muted-foreground">필수 블록</span>
            <p className="text-sm font-bold text-foreground">{uniqueRequired.length}개</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <span className="text-[10px] text-muted-foreground">대체 필요</span>
            <p className="text-sm font-bold text-foreground">{activeProofFallbacks.length}개</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <span className="text-[10px] text-muted-foreground">유형</span>
            <p className="text-sm font-bold text-foreground">{analysis.isBoutique ? "부티크" : "종합"}</p>
          </div>
        </div>
      )}

      {/* Template Selection */}
      <SectionBlock id="template-selection" title="템플릿 선택 규칙">
        <div className="space-y-2">
          {templateSelectionRules.map((r) => (
            <RuleCard key={r.condition} condition={r.condition} result={r.result} active={!isEmpty && r.check(brief)} />
          ))}
        </div>
      </SectionBlock>

      {/* CTA Selection */}
      <SectionBlock id="cta-selection" title="CTA 선택 규칙">
        <div className="space-y-2">
          {ctaRules.map((r) => (
            <RuleCard key={r.condition} condition={r.condition} result={r.cta} active={!isEmpty && r.check(brief)} />
          ))}
        </div>
      </SectionBlock>

      {/* Layout Rules */}
      <SectionBlock id="layout-rules" title="레이아웃 분기 규칙">
        <div className="space-y-2">
          {layoutRules.map((r) => (
            <RuleCard key={r.condition} condition={r.condition} result={r.layout} active={!isEmpty && r.check(brief)} />
          ))}
        </div>
      </SectionBlock>

      {/* Required Blocks */}
      <SectionBlock id="required-blocks" title="필수 블록 결과">
        <div className="rounded-lg border bg-primary/5 border-primary/20 p-5">
          <div className="flex flex-wrap gap-2">
            {(uniqueRequired.length > 0 ? uniqueRequired : ["Hero", "서비스 개요", "프로세스", "CTA 배너", "Footer"]).map((b) => (
              <div key={b} className="flex items-center gap-1.5">
                <BadgeLabel type="required" />
                <span className="text-sm text-foreground">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionBlock>

      {/* Conditional Blocks */}
      {uniqueConditional.length > 0 && (
        <SectionBlock id="conditional-blocks" title="조건부 블록">
          <div className="space-y-2">
            {uniqueConditional.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <BadgeLabel type="conditional" />
                <span className="text-sm text-foreground">{b}</span>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Optional Blocks */}
      {uniqueOptional.length > 0 && (
        <SectionBlock id="optional-blocks" title="선택 블록 (제거 가능)">
          <div className="space-y-2">
            {uniqueOptional.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <BadgeLabel type="optional" />
                <span className="text-sm text-foreground">{b}</span>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Prohibited Blocks */}
      {uniqueProhibited.length > 0 && (
        <SectionBlock id="prohibited-blocks" title="금지 블록">
          <div className="space-y-2">
            {uniqueProhibited.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <BadgeLabel type="prohibited" />
                <span className="text-sm text-foreground">{b}</span>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Proof Fallbacks */}
      <SectionBlock id="proof-fallbacks" title="증거 자산 부족 시 대체 전략">
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <caption className="sr-only">증거 자산 부족 시 대체 전략 표</caption>
            <thead>
              <tr className="border-b bg-surface">
                <th scope="col" className="text-left p-3 text-xs font-semibold text-foreground">자산</th>
                <th scope="col" className="text-left p-3 text-xs font-semibold text-foreground">대체 전략</th>
                <th scope="col" className="text-left p-3 text-xs font-semibold text-foreground w-20">상태</th>
              </tr>
            </thead>
            <tbody>
              {proofFallbacks.map((pf) => (
                <tr key={pf.asset} className={`border-b last:border-b-0 ${pf.active ? "bg-destructive/5" : ""}`}>
                  <td className="p-3 text-xs font-medium text-foreground">{pf.asset}</td>
                  <td className="p-3 text-xs text-muted-foreground">{pf.fallback}</td>
                  <td className="p-3">
                    {pf.active ? <BadgeLabel type="prohibited">대체 필요</BadgeLabel> :
                     <BadgeLabel type="required">보유</BadgeLabel>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      {/* Scale */}
      <SectionBlock id="budget-scaling" title="예산별 구조 축소 규칙">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { scale: "최소", desc: "빠른 제작 / 낮은 예산", pages: ["홈페이지", "서비스 (통합)", "문의/상담"], active: analysis.scaleRecommendation === "최소" },
            { scale: "표준", desc: "일반적인 컨설팅 사이트", pages: ["홈", "서비스 (개별)", "사례 목록+상세", "회사 소개", "팀", "문의"], active: analysis.scaleRecommendation === "표준" },
            { scale: "풀", desc: "콘텐츠 마케팅 통합", pages: ["표준 + 산업별", "인사이트", "리포트 랜딩", "웨비나", "역량 매트릭스"], active: analysis.scaleRecommendation === "풀" },
          ].map((item) => (
            <div key={item.scale} className={`rounded-lg border p-5 ${item.active ? "bg-accent/5 border-accent/30" : "bg-card"}`}>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm text-foreground">{item.scale} 구조</h4>
                {item.active && <BadgeLabel type="recommended">추천</BadgeLabel>}
              </div>
              <p className="text-[10px] text-muted-foreground mb-2">{item.desc}</p>
              <InfoList items={item.pages} />
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* Core trust blocks */}
      <SectionBlock id="core-trust" title="반드시 유지해야 하는 핵심 신뢰 블록">
        <div className="rounded-lg border bg-card p-5">
          <p className="text-xs text-muted-foreground mb-3">예산 축소 시에도 아래 블록은 반드시 유지하세요.</p>
          <div className="flex flex-wrap gap-2">
            {["Hero + 핵심 메시지", "서비스 개요", "프로세스/방법론", "CTA 배너", "연락 정보"].map((b) => (
              <div key={b} className="flex items-center gap-1.5">
                <BadgeLabel type="required" />
                <span className="text-sm text-foreground">{b}</span>
              </div>
            ))}
          </div>
          {brief.hasCases && (
            <p className="text-xs text-muted-foreground mt-3">+ 사례 보유 시 "케이스 스터디 하이라이트"도 필수 유지</p>
          )}
        </div>
      </SectionBlock>

      {/* Subtype rules */}
      <SectionBlock id="subtype-rules" title="세부 컨설팅 분야별 추가 섹션 규칙">
        <div className="space-y-3">
          {[
            { subtype: "IT/DX", additions: ["기술 스택 블록", "파트너 기술 인증", "디지털 역량 매트릭스"], active: brief.consultingType === "디지털 전환" || brief.consultingType === "IT 컨설팅" },
            { subtype: "HR", additions: ["조직문화 진단 블록", "교육/워크숍 프로그램", "인재관리 성과"], active: brief.consultingType === "HR 컨설팅" },
            { subtype: "마케팅", additions: ["캠페인 성과 대시보드", "채널 전략 블록", "데이터 분석 역량"], active: brief.consultingType === "마케팅 전략" },
            { subtype: "재무/M&A", additions: ["거래 실적", "인가/라이선스 블록", "규제 전문성"], active: brief.consultingType === "재무 자문" || brief.consultingType === "M&A 자문" },
            { subtype: "ESG", additions: ["지속가능성 지표", "ESG 인증", "보고서 발간 이력"], active: brief.consultingType === "ESG 컨설팅" },
            { subtype: "경영 전략", additions: ["성장 전략 프레임워크", "시장 분석 블록", "이사회 보고용 요약"], active: brief.consultingType === "경영 전략" },
          ].map((item) => (
            <div key={item.subtype} className={`rounded-lg border p-4 ${item.active ? "bg-accent/5 border-accent/30" : "bg-card"}`}>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-sm text-foreground">{item.subtype} 컨설팅</h4>
                {item.active && <BadgeLabel type="recommended">해당</BadgeLabel>}
              </div>
              <div className="flex flex-wrap gap-2">
                {item.additions.map((a) => (
                  <span key={a} className="rounded-md border bg-surface px-2.5 py-1 text-xs text-muted-foreground">{a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* Content verification */}
      <SectionBlock id="verification" title="콘텐츠 검증 우선순위">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={[
            "1순위: 성과 수치 (프로젝트 수, 성장률, ROI 등) — 반드시 출처 확인",
            "2순위: 고객사 관련 언급 — 로고 사용, 사명 노출 허가 확인",
            "3순위: 추천사 — 실명, 직함, 내용 게시 동의 확인",
            "4순위: 인증/수상 — 유효 기간, 실제 보유 확인",
            "5순위: 파트너십 — 현재 유효한 관계인지 확인",
            "'업계 최고', '유일', '1위' 등의 표현 → 반드시 근거 확보 또는 제거",
          ]} />
        </div>
      </SectionBlock>

      {/* Copy-ready implementation guide */}
      {!isEmpty && (
        <SectionBlock id="copy-guide" title="즉시 제작 지침 (복사용)">
          <CopyBlock content={implGuide} label="구현 지침 요약 — 복사하여 팀에 공유" />
        </SectionBlock>
      )}

      {/* Workflow */}
      <div className="flex flex-wrap gap-3 mt-4">
        <Link to="/proof-system" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          신뢰 증거 체계 확인 <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/site-blueprint" className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
          청사진으로 돌아가기
        </Link>
      </div>
    </AppLayout>
  );
};

export default ImplementationRules;
