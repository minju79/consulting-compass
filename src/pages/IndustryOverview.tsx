import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { InfoList } from "@/components/guide/InfoList";

const IndustryOverview = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="Industry Analysis"
        title="컨설팅 업종 특성 분석"
        description="컨설팅 업종 홈페이지가 일반 서비스업 사이트와 어떻게 다른지, 방문자 심리와 전환 구조를 정리합니다."
      />

      <SectionBlock id="difference" title="컨설팅 사이트가 일반 서비스업과 다른 점">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">일반 서비스업 사이트</h4>
            <InfoList items={[
              "제품/서비스 즉시 구매 또는 예약 중심",
              "가격 비교가 핵심 의사결정 요소",
              "감성적 비주얼과 프로모션이 효과적",
              "개인 소비자 대상, 짧은 의사결정",
              "리뷰와 별점이 주요 신뢰 요소",
            ]} />
          </div>
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">컨설팅 업종 사이트</h4>
            <InfoList items={[
              "상담 요청·프로젝트 문의 전환 중심",
              "전문성·실적·방법론이 핵심 판단 기준",
              "정제된 비주얼과 정보 밀도가 중요",
              "기업 의사결정자 대상, 긴 검토 과정",
              "사례·팀·프로세스가 주요 신뢰 요소",
            ]} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="visitor-priorities" title="방문자가 가장 먼저 확인하려는 정보">
        <div className="space-y-3">
          {[
            { rank: "1순위", content: "이 회사가 우리 업계/문제를 이해하고 있는가?" },
            { rank: "2순위", content: "유사한 프로젝트를 수행한 경험이 있는가?" },
            { rank: "3순위", content: "어떤 프로세스와 방법론으로 일하는가?" },
            { rank: "4순위", content: "구체적인 성과 수치가 있는가?" },
            { rank: "5순위", content: "누가 우리 프로젝트를 담당하게 되는가?" },
            { rank: "6순위", content: "비용 구조와 상담 절차는 어떻게 되는가?" },
          ].map((item) => (
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
          {[
            { title: "사례 연구", desc: "문제-접근-성과 구조의 케이스 스터디" },
            { title: "성과 수치", desc: "프로젝트 수, 고객사 수, 성장률 등 (예시 데이터 명시)" },
            { title: "전문가 프로필", desc: "핵심 인력의 경력·전문 분야 소개" },
            { title: "고객사 로고", desc: "서비스한 기업의 로고 스트립" },
            { title: "방법론·프로세스", desc: "체계적 접근 방식을 시각화" },
            { title: "인사이트 콘텐츠", desc: "전문성을 증명하는 아티클·보고서" },
            { title: "인증·수상", desc: "관련 자격, 수상 내역, 파트너십" },
            { title: "고객 추천사", desc: "실명 기반 추천사 또는 인터뷰" },
            { title: "언론 노출", desc: "미디어 인용, 기고, 컨퍼런스 발표" },
          ].map((item) => (
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
            <thead>
              <tr className="border-b bg-surface">
                <th className="text-left p-3 font-semibold text-foreground">기준</th>
                <th className="text-left p-3 font-semibold text-foreground">확인 방법</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["전문성", "산업별 경험, 방법론, 팀 역량 페이지"],
                ["실적", "케이스 스터디, 성과 수치, 고객사 로고"],
                ["체계성", "프로세스 타임라인, 서비스 구조"],
                ["투명성", "비용 안내, FAQ, 상담 절차 설명"],
                ["접근성", "상담 폼 간소화, 연락처 명시, 빠른 응답 약속"],
              ].map(([criteria, method]) => (
                <tr key={criteria} className="border-b last:border-b-0">
                  <td className="p-3 font-medium text-foreground">{criteria}</td>
                  <td className="p-3 text-muted-foreground">{method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      <SectionBlock id="conversion-flow" title="전환이 발생하는 대표 흐름">
        <div className="flex flex-wrap items-center gap-2 p-5 rounded-lg border bg-surface">
          {["검색/추천 유입", "→", "히어로 영역 확인", "→", "서비스 탐색", "→", "사례/성과 확인", "→", "팀/전문가 확인", "→", "문의 폼 작성"].map((step, i) => (
            <span key={i} className={step === "→" ? "text-accent font-bold" : "text-sm bg-card border rounded-md px-3 py-1.5 font-medium text-foreground"}>
              {step}
            </span>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="categories" title="컨설팅 업종 세부 카테고리">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            "경영 전략", "디지털 전환", "IT 컨설팅", "HR 컨설팅",
            "마케팅 전략", "재무 자문", "법률 자문", "ESG 컨설팅",
            "M&A 자문", "브랜드 전략", "공공 정책", "운영 효율화",
          ].map((cat) => (
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
          {[
            { pattern: "추상적인 카피만 나열", problem: "\"혁신적 솔루션으로 비즈니스 성장을 지원합니다\" — 구체적으로 무엇을 하는지 알 수 없음" },
            { pattern: "사례·증거 부재", problem: "서비스만 나열하고 실제 프로젝트 경험이나 성과를 보여주지 않음" },
            { pattern: "과도한 비주얼 위주", problem: "화려한 애니메이션에 집중하고 정보 전달이 부족한 사이트" },
            { pattern: "CTA 모호함", problem: "\"Learn More\", \"자세히 보기\"만 반복, 방문자가 다음 행동을 모름" },
            { pattern: "모바일 경험 미흡", problem: "데스크톱 기준으로만 설계하여 모바일에서 정보 계층이 무너짐" },
            { pattern: "팀·전문가 정보 부재", problem: "누가 서비스를 제공하는지 알 수 없어 신뢰가 형성되지 않음" },
          ].map((item) => (
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
