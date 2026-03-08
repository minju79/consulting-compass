import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { InfoList } from "@/components/guide/InfoList";
import { proofAssets, pageProofRules } from "@/data/proofSystemRules";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { loadBrief, analyzeBrief } from "@/lib/brief";

const pageLabels: Record<string, string> = {
  homepage: "홈페이지", service: "서비스 페이지", industry: "산업/전문분야 페이지",
  caseStudy: "케이스 스터디", contact: "문의 페이지", about: "회사 소개",
};

const ProofSystem = () => {
  const brief = useMemo(() => loadBrief(), []);
  const analysis = useMemo(() => analyzeBrief(brief), [brief]);
  const hasBrief = !!brief.companyName || !!brief.consultingType;

  return (
    <AppLayout>
      <PageHeader
        badge="Proof System"
        title="신뢰 증거 체계"
        description="컨설팅 업종 특유의 신뢰 증거 우선순위, 페이지별 배치 규칙, 자산 부족 시 대체 전략을 구조화합니다."
      />

      {/* Brief-linked summary board */}
      {hasBrief && (
        <div className="rounded-lg border bg-accent/5 border-accent/20 p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">{brief.companyName || "고객사"} 증거 자산 현황</h3>
            <span className="text-xs text-muted-foreground">점수: {analysis.proofScore}/8</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {analysis.proofSummary.map((p) => (
              <div key={p.id} className={`rounded-md border px-3 py-2 ${
                p.status === "보유" ? "bg-accent/10 border-accent/30" :
                p.status === "부족" ? "bg-destructive/5 border-destructive/20" : "bg-muted"
              }`}>
                <span className="text-xs text-muted-foreground">{p.label}</span>
                <div className="mt-1">
                  <BadgeLabel type={p.status === "보유" ? "required" : p.status === "부족" ? "prohibited" : "optional"}>
                    {p.status}
                  </BadgeLabel>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-3 text-xs">
            <Link to="/client-brief" className="text-accent hover:underline">브리프 수정 →</Link>
            <Link to="/site-blueprint" className="text-accent hover:underline">청사진 보기 →</Link>
            <Link to="/implementation-rules" className="text-accent hover:underline">구현 규칙 →</Link>
          </div>
        </div>
      )}

      {!hasBrief && (
        <div className="rounded-lg border bg-accent/5 border-accent/20 p-4 mb-8">
          <p className="text-sm text-foreground font-medium mb-1">📋 빠른 적용 포인트</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• <Link to="/client-brief" className="text-accent hover:underline">Client Brief</Link>를 작성하면 여기에 실제 고객사 자산 현황이 표시됩니다.</li>
            <li>• 신뢰 요소는 우선순위가 있으며, 모든 것을 다 보여줄 필요는 없습니다.</li>
            <li>• 보유하지 않은 자산에 대해서는 반드시 대체 전략을 적용하세요.</li>
          </ul>
        </div>
      )}

      <SectionBlock id="priority" title="신뢰 요소 우선순위 체계">
        <div className="space-y-3">
          {proofAssets.map((asset) => {
            const briefStatus = analysis.proofSummary.find((p) => p.id === asset.id);
            return (
              <div key={asset.id} className={`rounded-lg border p-4 ${briefStatus?.status === "보유" ? "bg-accent/5 border-accent/20" : briefStatus?.status === "부족" ? "bg-destructive/5 border-destructive/20" : "bg-card"}`}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-lg font-bold text-accent/50 font-mono">#{asset.priority}</span>
                  <h4 className="font-semibold text-sm text-foreground">{asset.name}</h4>
                  <BadgeLabel type={asset.impactLevel === "최상" ? "required" : asset.impactLevel === "상" ? "recommended" : "optional"}>
                    영향도: {asset.impactLevel}
                  </BadgeLabel>
                  {asset.verificationNeeded && <BadgeLabel type="review">검증 필요</BadgeLabel>}
                  {hasBrief && briefStatus && (
                    <BadgeLabel type={briefStatus.status === "보유" ? "required" : briefStatus.status === "부족" ? "prohibited" : "optional"}>
                      {briefStatus.status}
                    </BadgeLabel>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{asset.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">최적 배치</span>
                    <ul className="mt-1 space-y-0.5">
                      {asset.bestPlacement.map((p) => <li key={p} className="text-xs text-muted-foreground">• {p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">부족 시 대체</span>
                    <p className="text-xs text-muted-foreground mt-1">{asset.fallbackWhenMissing}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionBlock>

      <SectionBlock id="page-rules" title="페이지별 증거 배치 규칙">
        <div className="space-y-4">
          {Object.entries(pageProofRules).map(([page, rules]) => (
            <div key={page} className="rounded-lg border bg-card p-5">
              <h4 className="font-semibold text-sm text-foreground mb-3">{pageLabels[page] || page}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["required", "recommended", "optional"] as const).map((level) => (
                  <div key={level}>
                    <div className="flex items-center gap-1 mb-2">
                      <BadgeLabel type={level === "required" ? "required" : level === "recommended" ? "recommended" : "optional"} />
                    </div>
                    {rules[level].length > 0 ? (
                      <ul className="space-y-1">
                        {rules[level].map((id) => {
                          const asset = proofAssets.find((a) => a.id === id);
                          const bStatus = analysis.proofSummary.find((p) => p.id === id);
                          return (
                            <li key={id} className="text-xs text-foreground flex items-center gap-1">
                              {asset?.name || id}
                              {hasBrief && bStatus?.status === "부족" && <span className="text-destructive text-[10px]">(부족)</span>}
                            </li>
                          );
                        })}
                      </ul>
                    ) : <p className="text-xs text-muted-foreground">없음</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="asset-classification" title="자산 분류 체계">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-accent/5 border-accent/20 p-5">
            <h4 className="font-semibold text-sm text-foreground mb-2">✓ 검증 완료</h4>
            <p className="text-xs text-muted-foreground mb-2">사실 확인이 완료되어 즉시 게시 가능한 자산</p>
            <InfoList items={["수치 출처 확인됨", "로고 사용 허가 획득", "추천사 게시 동의 완료", "인증 유효기간 확인"]} />
          </div>
          <div className="rounded-lg border bg-yellow-500/5 border-yellow-500/20 p-5">
            <h4 className="font-semibold text-sm text-foreground mb-2">⚠ 검토 필요</h4>
            <p className="text-xs text-muted-foreground mb-2">게시 전 사실 확인 또는 허가가 필요한 자산</p>
            <InfoList items={["수치 출처 미확인", "로고 사용 허가 미확인", "'업계 최고' 등 검증 필요 표현", "파트너십 유효성 미확인"]} />
          </div>
          <div className="rounded-lg border bg-muted p-5">
            <h4 className="font-semibold text-sm text-foreground mb-2">— 비공개 자산</h4>
            <p className="text-xs text-muted-foreground mb-2">보유하고 있으나 외부 게시가 불가능한 자산</p>
            <InfoList items={["NDA 대상 고객사", "비공개 프로젝트", "내부 전용 수치", "→ 대체 전략 적용 필요"]} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="combination-fallbacks" title="증거 부족 시 대체 가능한 조합">
        <div className="space-y-3">
          {[
            { scenario: "사례 0건 + 수치 없음", combo: "프로세스/방법론 + 전문가 경력 + 산업 경험 서술" },
            { scenario: "로고 비공개 + 추천사 없음", combo: "산업군 기반 서술 + 프로젝트 수 (추상적 표현) + 프로세스" },
            { scenario: "전문가 사진 없음", combo: "이니셜 아바타 + 경력/학력 요약 + 전문 분야 태그" },
            { scenario: "모든 자산 부족 (신규 회사)", combo: "창업자 경력 + 방법론 + 무료 초기 진단 CTA + FAQ 확장" },
          ].map((item) => (
            <div key={item.scenario} className="rounded-lg border bg-card p-4">
              <p className="text-xs text-destructive font-medium mb-1">시나리오: {item.scenario}</p>
              <p className="text-sm text-foreground">→ {item.combo}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="prohibited-claims" title="금지된 무근거 주장">
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5">
          <p className="text-xs text-muted-foreground mb-3">아래 표현은 객관적 근거 없이 사용해서는 안 됩니다.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {["업계 최고", "유일", "압도적", "검증된 성과", "반드시 개선", "확실한 ROI", "가장 빠른", "1위", "최고 수준"].map((expr) => (
              <div key={expr} className="flex items-center gap-1.5 rounded-md border border-destructive/20 bg-background px-3 py-1.5">
                <span className="text-destructive text-xs">✕</span>
                <span className="text-xs text-foreground">{expr}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            또한 허위 고객사, 허위 수치, 허위 추천사, 허위 언론 노출, 허위 파트너십, 허위 수상 이력, 허위 전문가 경력을 절대 만들지 마세요.
          </p>
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default ProofSystem;
