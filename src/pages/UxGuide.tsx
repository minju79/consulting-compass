import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { InfoList } from "@/components/guide/InfoList";

const UxGuide = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="UX Strategy"
        title="UX 가이드"
        description="컨설팅 사이트 방문자의 사용자 여정, CTA 배치 원칙, 신뢰 요소 위치, 전환 최적화 전략을 정리합니다."
      />

      <SectionBlock id="user-journey" title="대표 사용자 여정">
        <div className="rounded-lg border bg-card p-5">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {["첫 방문 (인식)", "→", "신뢰 확인", "→", "서비스 탐색", "→", "사례 확인", "→", "의사결정", "→", "문의 전환"].map((s, i) => (
              <span key={i} className={s === "→" ? "text-accent font-bold text-lg" : "text-sm bg-surface border rounded-md px-3 py-1.5 font-medium text-foreground"}>
                {s}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            B2B 컨설팅 구매는 평균 2~4주의 검토 기간이 소요됩니다. 첫 방문에서 즉시 전환되기보다,
            여러 번 재방문하며 신뢰를 확인한 후 문의를 결정합니다. 이를 고려한 정보 배치가 필요합니다.
          </p>
        </div>
      </SectionBlock>

      <SectionBlock id="visit-types" title="방문 목적별 UX 분기">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { type: "서비스 탐색형", desc: "어떤 서비스를 제공하는지 파악하려는 방문자", flow: "히어로 → 서비스 섹션 → 서비스 상세 → CTA" },
            { type: "사례 검토형", desc: "유사 산업 경험과 성과를 확인하려는 방문자", flow: "히어로 → 사례 → 사례 상세 → 팀 → CTA" },
            { type: "회사 검증형", desc: "이미 소개받은 후 회사를 검증하려는 방문자", flow: "히어로 → 회사 소개 → 팀 → 사례 → CTA" },
            { type: "바로 문의형", desc: "이미 의사결정 후 연락처를 찾는 방문자", flow: "헤더 CTA → 문의 폼 (즉시 접근 가능해야 함)" },
          ].map((item) => (
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
          <InfoList items={[
            "무슨 회사인지 — 업종과 핵심 역량을 한 문장으로",
            "누구를 위한 서비스인지 — 타겟 고객군 명시",
            "무엇을 요청할 수 있는지 — 구체적 CTA 제공",
            "왜 신뢰할 수 있는지 — 로고, 수치, 인증 등 1개 이상",
          ]} />
        </div>
      </SectionBlock>

      <SectionBlock id="cta-principles" title="CTA 배치 원칙">
        <div className="space-y-3">
          {[
            { rule: "헤더에 항상 CTA 배치", desc: "어느 페이지에서든 '문의하기'에 즉시 접근 가능" },
            { rule: "히어로에 Primary CTA + Secondary CTA", desc: "주 전환(문의) + 보조 행동(서비스 보기)" },
            { rule: "콘텐츠 3~4섹션마다 중간 CTA", desc: "정보 탐색 후 자연스러운 전환점 제공" },
            { rule: "페이지 하단에 최종 CTA 배너", desc: "모든 정보를 확인한 후의 전환 기회" },
            { rule: "CTA 문구는 구체적으로", desc: "'자세히 보기' ✕ → '프로젝트 문의하기' ✓, '사례 확인하기' ✓" },
          ].map((item) => (
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
          <InfoList items={[
            "Above the fold: 고객사 로고 스트립, 핵심 성과 수치",
            "서비스 섹션 직후: 프로세스 다이어그램, 방법론",
            "CTA 인접 영역: 보안 배지, 고객 추천사, '000+개 기업이 선택'",
            "사례 섹션: 구체적 성과 수치가 포함된 케이스 카드",
            "폼 옆: 응답 시간 약속, 개인정보 보호 안내",
            "푸터: 인증, 파트너십 로고, 사업자 정보",
          ]} />
        </div>
      </SectionBlock>

      <SectionBlock id="form-strategy" title="폼 최소화 전략">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">✓ 권장</h4>
            <InfoList items={[
              "필수 필드 4~5개: 이름, 회사, 이메일, 문의 유형, 메시지",
              "문의 유형은 드롭다운으로 선택 간소화",
              "전화번호는 선택(optional)으로",
              "예산/규모 질문은 제거 또는 선택으로",
              "'영업일 1일 이내 회신' 등 응답 약속 표시",
            ]} />
          </div>
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">✕ 지양</h4>
            <InfoList items={[
              "필드 7개 이상 (이탈률 급증)",
              "주소, 직급, 부서 등 불필요한 필드",
              "CAPTCHA를 시각적으로 방해되게 배치",
              "제출 후 아무 피드백 없는 폼",
              "에러 메시지가 모호한 폼",
            ]} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="bounce-points" title="이탈이 많이 나는 지점과 개선 방법">
        <div className="space-y-3">
          {[
            { point: "히어로에서 이탈", fix: "헤드라인이 추상적 → 구체적 가치 제안 + 시각적 증거" },
            { point: "서비스 페이지에서 이탈", fix: "서비스 설명이 나열식 → 문제-해결-성과 구조로 전환" },
            { point: "문의 폼에서 이탈", fix: "필드 과다 → 최소화 + 부담 없는 문의임을 강조" },
            { point: "사례 없는 사이트", fix: "사례가 없으면 → 프로세스/방법론으로 전문성 대체" },
            { point: "모바일 탐색 이탈", fix: "데스크톱 레이아웃 그대로 → 모바일 전용 정보 계층" },
          ].map((item) => (
            <div key={item.point} className="rounded-lg border bg-card p-4">
              <h4 className="font-semibold text-sm text-foreground mb-1">📍 {item.point}</h4>
              <p className="text-xs text-muted-foreground">{item.fix}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="mobile-ux" title="모바일 UX 우선순위">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={[
            "CTA 버튼은 하단 고정(sticky) 또는 쉽게 접근 가능한 위치에",
            "정보 계층은 데스크톱과 동일하게 유지 (단, 표현 방식은 단순화)",
            "카드 그리드 → 1컬럼 세로 스크롤로 전환",
            "이미지 크기 축소, 텍스트 중심으로 전환",
            "터치 영역 최소 44×44px, 충분한 여백",
            "모바일에서 사례 카드는 제목 + 핵심 성과 수치로 축약",
            "햄버거 메뉴 내에도 CTA 버튼 배치",
          ]} />
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
              {[
                ["자세히 보기", "서비스 상세 확인하기"],
                ["더 알아보기", "프로젝트 사례 살펴보기"],
                ["문의하기", "프로젝트 문의 시작하기"],
                ["시작하기", "무료 상담 신청하기"],
                ["연락처", "전문가와 상담하기"],
                ["제출", "문의 보내기"],
              ].map(([bad, good]) => (
                <tr key={bad} className="border-b last:border-b-0">
                  <td className="p-3 text-muted-foreground text-xs">{bad}</td>
                  <td className="p-3 text-foreground font-medium text-xs">{good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default UxGuide;
