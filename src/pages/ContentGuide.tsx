import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { InfoList } from "@/components/guide/InfoList";

const ContentGuide = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="Content & Copy"
        title="콘텐츠 가이드"
        description="컨설팅 업종에서 신뢰를 높이는 카피라이팅 원칙, 문장 톤, 템플릿, CTA 문구를 정리합니다."
      />

      <SectionBlock id="tone" title="컨설팅 업종의 문장 톤">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">✓ 지향하는 톤</h4>
            <InfoList items={[
              "명확하고 직접적인 서술",
              "전문적이지만 읽기 쉬운 문장",
              "데이터와 근거 기반 주장",
              "문제 → 해결 → 성과 구조",
              "자신감 있지만 겸손한 어조",
              "구체적 행동을 유도하는 문장",
            ]} />
          </div>
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">✕ 지양하는 톤</h4>
            <InfoList items={[
              "'혁신적', '선도적', '글로벌' 등 공허한 수식어 남발",
              "과도하게 감성적이거나 친근한 어조",
              "경쟁사를 직접 비교하거나 폄하",
              "출처 없는 통계나 과장된 수치",
              "지나치게 기술적인 전문 용어",
              "내부 용어를 외부 고객에게 그대로 사용",
            ]} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="abstraction-rule" title="추상적 표현을 줄이는 규칙">
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-surface">
                <th className="text-left p-3 font-semibold text-foreground text-xs">❌ 추상적</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs">✅ 구체적</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["비즈니스 성장을 지원합니다", "매출 20% 성장을 위한 전략 수립부터 실행까지 (예시 수치)"],
                ["혁신적인 솔루션을 제공합니다", "데이터 기반 의사결정 체계를 구축합니다"],
                ["글로벌 역량을 보유하고 있습니다", "12개국 200+ 프로젝트 수행 경험 (예시 수치)"],
                ["고객 중심의 접근 방식", "고객사 의사결정자와 주 1회 진행 상황을 공유합니다"],
                ["최고의 전문가가 함께합니다", "평균 12년 경력의 산업별 전문 컨설턴트가 담당합니다 (예시)"],
              ].map(([bad, good]) => (
                <tr key={bad} className="border-b last:border-b-0">
                  <td className="p-3 text-muted-foreground text-xs">{bad}</td>
                  <td className="p-3 text-foreground text-xs">{good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      <SectionBlock id="psr-structure" title="문제 → 해결 → 성과 서술 구조">
        <div className="rounded-lg border bg-accent/5 border-accent/20 p-5">
          <div className="space-y-4 text-sm">
            <div>
              <span className="font-semibold text-foreground">1. 문제 (Problem)</span>
              <p className="text-muted-foreground mt-1">"고객사는 급변하는 시장에서 기존 사업 모델의 수익성 저하에 직면했습니다."</p>
            </div>
            <div>
              <span className="font-semibold text-foreground">2. 해결 (Solution)</span>
              <p className="text-muted-foreground mt-1">"시장 분석, 경쟁 벤치마크, 고객 인터뷰를 기반으로 신규 수익 모델 3가지를 설계하고, 파일럿 테스트를 진행했습니다."</p>
            </div>
            <div>
              <span className="font-semibold text-foreground">3. 성과 (Result)</span>
              <p className="text-muted-foreground mt-1">"파일럿 3개월 만에 신규 채널 매출 비중이 15%에 도달했습니다." (예시 데이터)</p>
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="service-template" title="서비스 소개 문장 템플릿">
        <div className="rounded-lg border bg-card p-5 space-y-3 text-sm">
          <p className="text-muted-foreground">
            <strong className="text-foreground">공식:</strong> [타겟 고객]이 [직면하는 과제]를 [접근 방식]으로 해결하여 [기대 성과]를 달성할 수 있도록 지원합니다.
          </p>
          <p className="text-muted-foreground italic">
            예: "중견기업이 디지털 전환 과정에서 겪는 조직 저항을 변화 관리 프레임워크로 해결하여, 전환 프로젝트 성공률을 높일 수 있도록 지원합니다."
          </p>
        </div>
      </SectionBlock>

      <SectionBlock id="case-template" title="사례 소개 문장 템플릿">
        <div className="rounded-lg border bg-card p-5 space-y-3 text-sm">
          <p className="text-muted-foreground">
            <strong className="text-foreground">공식:</strong> [산업/규모]의 고객사가 [과제]를 해결하기 위해 [접근 방식]을 적용하여, [기간] 내 [구체적 성과]를 달성했습니다.
          </p>
          <p className="text-muted-foreground italic">
            예: "국내 금융사가 고객 이탈률 개선을 위해 데이터 기반 CRM 전략을 도입하여, 6개월 내 이탈률을 12% 감소시켰습니다." (예시 데이터)
          </p>
        </div>
      </SectionBlock>

      <SectionBlock id="hero-formula" title="히어로 카피 공식">
        <div className="space-y-3">
          {[
            { formula: "[타겟]을 위한 [핵심 가치]", example: "성장하는 기업을 위한 전략적 파트너" },
            { formula: "[문제]를 [방식]으로 해결합니다", example: "복잡한 비즈니스 과제를 데이터로 풀어냅니다" },
            { formula: "[성과]를 만드는 [차별점]", example: "측정 가능한 성과를 만드는 실행 중심 컨설팅" },
            { formula: "[산업] 전문 [서비스]", example: "금융·헬스케어 전문 디지털 전환 컨설팅" },
          ].map((item) => (
            <div key={item.formula} className="rounded-lg border bg-card p-4">
              <span className="text-xs font-mono text-accent">{item.formula}</span>
              <p className="text-sm text-foreground mt-1">→ "{item.example}"</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="numbers" title="숫자와 성과를 보여주는 방법">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={[
            "숫자는 크게 표시: '300+' 형태로, 텍스트와 시각적 위계 구분",
            "맥락 제공: 숫자만이 아닌, 의미를 함께 — '300+ 프로젝트 수행'",
            "비교 가능한 수치: '전년 대비 25% 성장' 같은 상대적 표현 활용",
            "출처 표시: 예시 데이터인 경우 반드시 '(예시 데이터)' 명시",
            "과장 금지: 검증 불가한 '업계 최고', '1위' 등의 표현 제한",
            "단위 명확히: '300+건', '50+개 기업', '12개국' 등",
          ]} />
        </div>
      </SectionBlock>

      <SectionBlock id="avoid-sentences" title="피해야 할 문장 예시">
        <div className="space-y-2">
          {[
            "\"세계 최고의 컨설팅 서비스를 제공합니다\" — 검증 불가, 신뢰 저하",
            "\"원스톱 토탈 솔루션\" — 지나치게 범용적, 차별점 없음",
            "\"고객의 꿈을 실현합니다\" — 감성적 과잉, B2B 부적절",
            "\"디지털 혁신을 선도합니다\" — 구체적 내용 없는 수식어",
            "\"함께 성장하겠습니다\" — 모호하고 차별화 없음",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <span className="text-destructive text-sm shrink-0">✕</span>
              <span className="text-xs text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="cta-examples" title="추천 CTA 문구 예시">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { context: "홈페이지 히어로", cta: "프로젝트 문의하기" },
            { context: "서비스 페이지", cta: "이 서비스 상담 요청하기" },
            { context: "사례 페이지", cta: "유사 프로젝트 문의하기" },
            { context: "팀 소개 페이지", cta: "전문가와 상담하기" },
            { context: "인사이트 페이지", cta: "전문 인사이트 구독하기" },
            { context: "문의 페이지", cta: "문의 보내기" },
            { context: "중간 CTA 배너", cta: "무료 초기 진단 받아보기" },
            { context: "Footer CTA", cta: "프로젝트를 시작하세요" },
          ].map((item) => (
            <div key={item.context} className="flex items-center gap-3 rounded-lg border bg-card p-3">
              <span className="text-xs text-muted-foreground w-28 shrink-0">{item.context}</span>
              <span className="text-sm font-medium text-accent">{item.cta}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="faq-writing" title="FAQ 작성 방식">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={[
            "질문은 고객의 언어로 — 내부 용어가 아닌 고객이 실제로 궁금해하는 형태",
            "답변은 2~4문장 이내, 핵심을 먼저 답하고 보충 설명",
            "너무 많은 FAQ는 역효과 — 5~8개가 적정, 카테고리 분류 가능",
            "상담으로 연결되는 질문은 답변 끝에 CTA 링크 추가",
            "예: '비용은 어떻게 책정되나요?' → 답변 + '상담을 통해 맞춤 견적을 받아보세요'",
          ]} />
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default ContentGuide;
