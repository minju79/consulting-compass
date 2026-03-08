import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { InfoList } from "@/components/guide/InfoList";
import {
  userJourneySteps, visitTypes, firstScreenRequirements,
  ctaPrinciples, trustPlacements, formStrategy,
  bounceFixPatterns, mobileUxPriorities, microcopyExamples,
  accessibilityRules, stateDesign,
} from "@/data/uxRules";

const UxGuide = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="UX Strategy"
        title="UX 가이드"
        description="컨설팅 사이트 방문자의 사용자 여정, CTA 배치 원칙, 신뢰 요소 위치, 전환 최적화, 접근성 및 상태 설계를 정리합니다."
      />

      <SectionBlock id="user-journey" title="대표 사용자 여정">
        <div className="rounded-lg border bg-card p-5">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {userJourneySteps.map((s, i) => (
              <span key={i}>
                {i > 0 && <span className="text-accent font-bold text-lg mr-2">→</span>}
                <span className="text-sm bg-surface border rounded-md px-3 py-1.5 font-medium text-foreground">{s}</span>
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            B2B 컨설팅 구매는 평균 2~4주의 검토 기간이 소요됩니다. 첫 방문에서 즉시 전환되기보다,
            여러 번 재방문하며 신뢰를 확인한 후 문의를 결정합니다.
          </p>
        </div>
      </SectionBlock>

      <SectionBlock id="visit-types" title="방문 목적별 UX 분기">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visitTypes.map((item) => (
            <div key={item.type} className="rounded-lg border bg-card p-5">
              <h4 className="font-semibold text-sm text-foreground mb-1">{item.type}</h4>
              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
              <p className="text-xs font-mono text-accent">{item.flow}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="first-screen" title="첫 화면에서 반드시 전달해야 하는 것">
        <div className="rounded-lg border bg-accent/5 border-accent/20 p-5">
          <InfoList items={firstScreenRequirements} />
        </div>
      </SectionBlock>

      <SectionBlock id="cta-principles" title="CTA 배치 원칙">
        <div className="space-y-3">
          {ctaPrinciples.map((item) => (
            <div key={item.rule} className="flex gap-3 rounded-lg border bg-card p-4">
              <span className="text-accent mt-0.5">●</span>
              <div>
                <h4 className="font-semibold text-sm text-foreground">{item.rule}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="trust-placement" title="신뢰 요소 배치 위치">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={trustPlacements} />
        </div>
      </SectionBlock>

      <SectionBlock id="form-strategy" title="폼 최소화 전략">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">✓ 권장</h4>
            <InfoList items={formStrategy.recommended} />
          </div>
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">✕ 지양</h4>
            <InfoList items={formStrategy.avoid} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="bounce-points" title="이탈 지점과 개선 방법">
        <div className="space-y-3">
          {bounceFixPatterns.map((item) => (
            <div key={item.point} className="rounded-lg border bg-card p-4">
              <h4 className="font-semibold text-sm text-foreground mb-1">📍 {item.point}</h4>
              <p className="text-xs text-muted-foreground">{item.fix}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="mobile-ux" title="모바일 UX 우선순위">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={mobileUxPriorities} />
        </div>
      </SectionBlock>

      <SectionBlock id="microcopy" title="마이크로카피 원칙">
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-surface">
                <th className="text-left p-3 font-semibold text-foreground text-xs">❌ 피하세요</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs">✅ 권장합니다</th>
              </tr>
            </thead>
            <tbody>
              {microcopyExamples.map((item) => (
                <tr key={item.bad} className="border-b last:border-b-0">
                  <td className="p-3 text-muted-foreground text-xs">{item.bad}</td>
                  <td className="p-3 text-foreground font-medium text-xs">{item.good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      {/* 접근성 */}
      <SectionBlock id="accessibility" title="접근성 규칙">
        <div className="space-y-3">
          {accessibilityRules.map((group) => (
            <div key={group.category} className="rounded-lg border bg-card p-4">
              <h4 className="font-semibold text-sm text-foreground mb-2">{group.category}</h4>
              <InfoList items={group.rules} />
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 상태 설계 */}
      <SectionBlock id="state-design" title="상태 설계">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">폼 필드 상태</h4>
            <div className="space-y-2">
              {stateDesign.formStates.map((item) => (
                <div key={item.state} className="flex items-start gap-2">
                  <span className="text-xs font-mono text-accent w-16 shrink-0">{item.state}</span>
                  <span className="text-xs text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">빈 상태 / 에러 상태</h4>
            <InfoList items={stateDesign.emptyStates} />
          </div>
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default UxGuide;
