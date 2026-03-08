import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { InfoList } from "@/components/guide/InfoList";
import { QuickSummary } from "@/components/guide/QuickSummary";
import { InPageToc } from "@/components/guide/InPageToc";
import { industryConfig } from "@/data/industryConfig";

const tocItems = [
  { id: "difference", label: "일반 서비스업과의 차이" },
  { id: "visitor-priorities", label: "방문자가 먼저 확인하는 정보" },
  { id: "trust-elements", label: "신뢰 형성 요소" },
  { id: "decision-criteria", label: "의사결정자 확인 기준" },
  { id: "conversion-flow", label: "전환 흐름" },
  { id: "categories", label: "세부 카테고리" },
  { id: "failure-patterns", label: "실패 패턴" },
];

const IndustryOverview = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="Industry Analysis"
        title="컨설팅 업종 특성 분석"
        description="컨설팅 업종 홈페이지가 일반 서비스업 사이트와 어떻게 다른지, 방문자 심리와 전환 구조를 정리합니다."
      />

      <QuickSummary points={[
        "컨설팅 사이트는 즉시 구매가 아닌 '신뢰 확인 → 전문성 판단 → 상담 요청' 흐름입니다.",
        "방문자는 사례, 팀, 프로세스, 성과 수치 순서로 신뢰를 확인합니다.",
        "추상적 카피, 사례 부재, CTA 모호함이 가장 흔한 실패 패턴입니다.",
      ]} />

      <InPageToc items={tocItems} />

      <SectionBlock id="difference" title="컨설팅 사이트가 일반 서비스업과 다른 점">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">일반 서비스업 사이트</h4>
            <InfoList items={industryConfig.generalServiceTraits} />
          </div>
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">컨설팅 업종 사이트</h4>
            <InfoList items={industryConfig.coreTraits} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="visitor-priorities" title="방문자가 가장 먼저 확인하려는 정보">
        <div className="space-y-3">
          {industryConfig.visitorPriorities.map((item) => (
            <div key={item.rank} className="flex items-start gap-3 rounded-lg border bg-card p-4">
              <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded shrink-0">
                {item.rank}
              </span>
              <span className="text-sm text-foreground">{item.content}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="trust-elements" title="신뢰 형성 요소">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {industryConfig.trustElements.map((item) => (
            <div key={item.title} className="rounded-lg border bg-card p-4">
              <h4 className="font-semibold text-sm text-foreground mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="decision-criteria" title="의사결정자가 확인하는 기준">
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <caption className="sr-only">의사결정자 확인 기준 표</caption>
            <thead>
              <tr className="border-b bg-surface">
                <th scope="col" className="text-left p-3 font-semibold text-foreground">기준</th>
                <th scope="col" className="text-left p-3 font-semibold text-foreground">확인 방법</th>
              </tr>
            </thead>
            <tbody>
              {industryConfig.decisionCriteria.map((item) => (
                <tr key={item.criteria} className="border-b last:border-b-0">
                  <td className="p-3 font-medium text-foreground">{item.criteria}</td>
                  <td className="p-3 text-muted-foreground">{item.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      <SectionBlock id="conversion-flow" title="전환이 발생하는 대표 흐름">
        <div className="flex flex-wrap items-center gap-2 p-5 rounded-lg border bg-surface">
          {industryConfig.conversionFlow.map((step, i) => (
            <span key={i}>
              {i > 0 && <span className="text-accent font-bold mr-2">→</span>}
              <span className="text-sm bg-card border rounded-md px-3 py-1.5 font-medium text-foreground">{step}</span>
            </span>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="categories" title="컨설팅 업종 세부 카테고리">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {industryConfig.subCategories.map((cat) => (
            <div key={cat} className="rounded-lg border bg-card p-3 text-center">
              <span className="text-sm font-medium text-foreground">{cat}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          각 세부 분야별로 강조해야 할 신뢰 요소와 콘텐츠 구조가 약간씩 달라질 수 있습니다.
          이 가이드의 기본 원칙을 따르되, 세부 분야에 맞는 사례와 전문 용어로 커스터마이징하세요.
        </p>
      </SectionBlock>

      <SectionBlock id="failure-patterns" title="컨설팅 사이트에서 자주 실패하는 패턴">
        <div className="space-y-3">
          {industryConfig.failurePatterns.map((item) => (
            <div key={item.pattern} className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <h4 className="font-semibold text-sm text-foreground mb-1">❌ {item.pattern}</h4>
              <p className="text-xs text-muted-foreground">{item.problem}</p>
            </div>
          ))}
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default IndustryOverview;
