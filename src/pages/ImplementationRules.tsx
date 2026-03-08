import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { InfoList } from "@/components/guide/InfoList";

const templateSelectionRules = [
  { condition: "인바운드 영업 중심 + 사례 3건 이상", result: "케이스 스터디 중심형 + 리드 수집형 혼합" },
  { condition: "부티크 컨설팅 + 전문가 3명 이하", result: "전문가 중심형" },
  { condition: "산업 특화 + 2개 이상 산업 페이지 필요", result: "산업 특화형" },
  { condition: "블로그/리포트 정기 발행 + SEO 유입 목표", result: "인사이트 중심형" },
  { condition: "일반적인 종합 컨설팅", result: "리드 수집형 (기본)" },
  { condition: "빠른 제작 + 낮은 예산", result: "최소 구조: 홈 + 서비스 + 문의 3페이지" },
];

const ctaSelectionRules = [
  { condition: "B2B 고가치 프로젝트, 긴 의사결정", primaryCta: "프로젝트 문의하기", reason: "구체적이고 부담이 적은 표현" },
  { condition: "무료 초기 진단 제공", primaryCta: "무료 진단 신청하기", reason: "가치 선제공으로 전환 장벽 낮춤" },
  { condition: "리포트/가이드 리드젠", primaryCta: "무료 리포트 다운로드", reason: "즉각 가치 교환" },
  { condition: "전화 상담 선호", primaryCta: "전문가 전화 상담 예약", reason: "직접 소통 선호 고객 타겟" },
];

const proofFallbacks = [
  { missing: "고객사 로고 비공개", alternative: "'금융/제조/IT 산업 다수 고객사 보유' 등 산업군 기반 서술", placement: "히어로 하단 텍스트 배지" },
  { missing: "성과 수치 비공개", alternative: "'N년 이상 업계 경험', '다수의 성공적 프로젝트 수행' 등 정성적 표현", placement: "히어로 또는 서비스 섹션" },
  { missing: "추천사 없음", alternative: "케이스 스터디 성과 수치로 간접 증명", placement: "사례 섹션 강화" },
  { missing: "전문가 사진 없음", alternative: "이니셜 아바타 + 경력 요약 텍스트", placement: "팀 카드" },
  { missing: "사례 0건", alternative: "프로세스/방법론 블록으로 체계적 접근 증명 + 산업 경험 서술", placement: "홈 중반 + 서비스 페이지" },
  { missing: "블로그 미운영", alternative: "FAQ 확장 + 서비스 설명 콘텐츠 강화", placement: "각 페이지 FAQ" },
  { missing: "다운로드 리소스 없음", alternative: "뉴스레터 구독 또는 상담 CTA로 대체", placement: "CTA 배너" },
];

const siteTypeDecisionRules = [
  { condition: "사례 보유 + 수치 공개 가능", recommendation: "서비스 중심형 → 케이스 중심형으로 전환 권장" },
  { condition: "전문가 3명 이상 + 각 전문 분야 뚜렷", recommendation: "전문가 소개 페이지 독립 운영" },
  { condition: "산업 2개 이상 특화", recommendation: "산업별 랜딩 페이지 별도 제작" },
  { condition: "인사이트 월 2회 이상 발행 가능", recommendation: "인사이트 허브 + SEO 랜딩 구조 추가" },
  { condition: "예산 제한 + 빠른 런칭 필요", recommendation: "홈 + 서비스 + 문의 3페이지 최소 구조" },
];

const coreBlocks = [
  "Hero (가치 제안 + CTA)",
  "서비스 개요 (3~6개)",
  "프로세스 / 방법론",
  "CTA 배너 (최종 전환)",
  "Footer (연락처, 링크)",
];

const ImplementationRules = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="Implementation Rules"
        title="구현 규칙"
        description="디자이너·기획자·개발자가 실제 제작 시 바로 적용할 수 있는 조건부 구현 규칙 문서입니다."
      />

      <div className="rounded-lg border bg-accent/5 border-accent/20 p-4 mb-8">
        <p className="text-sm text-foreground font-medium mb-1">📋 빠른 적용 포인트</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• 모든 규칙은 "조건 → 결과" 형태로 정리되어 있어, Client Brief 결과를 대입하면 바로 판단할 수 있습니다.</li>
          <li>• proof asset 부족 시 대체 전략을 반드시 확인하세요.</li>
          <li>• 최소 구조에서도 반드시 유지해야 하는 핵심 블록이 있습니다.</li>
        </ul>
      </div>

      <SectionBlock id="template-selection" title="템플릿 선택 규칙">
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-surface">
                <th className="text-left p-3 font-semibold text-foreground text-xs">조건</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs">추천 템플릿</th>
              </tr>
            </thead>
            <tbody>
              {templateSelectionRules.map((r) => (
                <tr key={r.condition} className="border-b last:border-b-0">
                  <td className="p-3 text-xs text-muted-foreground">{r.condition}</td>
                  <td className="p-3 text-xs font-medium text-foreground">{r.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      <SectionBlock id="cta-selection" title="CTA 선택 규칙">
        <div className="space-y-3">
          {ctaSelectionRules.map((r) => (
            <div key={r.condition} className="rounded-lg border bg-card p-4">
              <p className="text-xs text-muted-foreground mb-1"><strong>조건:</strong> {r.condition}</p>
              <p className="text-sm font-medium text-accent mb-1">→ "{r.primaryCta}"</p>
              <p className="text-xs text-muted-foreground">{r.reason}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="site-type-decisions" title="사이트 유형 분기 규칙">
        <div className="space-y-3">
          {siteTypeDecisionRules.map((r) => (
            <div key={r.condition} className="rounded-lg border bg-card p-4">
              <p className="text-xs text-muted-foreground mb-1"><strong>조건:</strong> {r.condition}</p>
              <p className="text-sm text-foreground">{r.recommendation}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="proof-fallbacks" title="증거 자산 부족 시 대체 전략">
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-surface">
                <th className="text-left p-3 font-semibold text-foreground text-xs">부족한 자산</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs">대체 전략</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs hidden md:table-cell">배치 위치</th>
              </tr>
            </thead>
            <tbody>
              {proofFallbacks.map((f) => (
                <tr key={f.missing} className="border-b last:border-b-0">
                  <td className="p-3 text-xs font-medium text-foreground">{f.missing}</td>
                  <td className="p-3 text-xs text-muted-foreground">{f.alternative}</td>
                  <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">{f.placement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      <SectionBlock id="core-blocks" title="반드시 유지해야 하는 핵심 블록">
        <div className="rounded-lg border bg-primary/5 border-primary/20 p-5">
          <p className="text-xs text-muted-foreground mb-3">아래 블록은 예산이나 시간이 부족해도 반드시 포함해야 합니다.</p>
          <div className="space-y-2">
            {coreBlocks.map((block) => (
              <div key={block} className="flex items-center gap-2">
                <BadgeLabel type="required" />
                <span className="text-sm text-foreground">{block}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="subtype-rules" title="세부 컨설팅 분야별 추가 섹션 규칙">
        <div className="space-y-3">
          {[
            { subtype: "IT/DX", additions: ["기술 스택 블록", "파트너 기술 인증", "디지털 역량 매트릭스"] },
            { subtype: "HR", additions: ["조직문화 진단 블록", "교육/워크숍 프로그램", "인재관리 성과"] },
            { subtype: "마케팅", additions: ["캠페인 성과 대시보드", "채널 전략 블록", "데이터 분석 역량"] },
            { subtype: "재무", additions: ["거래 실적", "인가/라이선스 블록", "규제 전문성"] },
            { subtype: "ESG", additions: ["지속가능성 지표", "ESG 인증", "보고서 발간 이력"] },
          ].map((item) => (
            <div key={item.subtype} className="rounded-lg border bg-card p-4">
              <h4 className="font-semibold text-sm text-foreground mb-2">{item.subtype} 컨설팅</h4>
              <div className="flex flex-wrap gap-2">
                {item.additions.map((a) => (
                  <span key={a} className="rounded-md border bg-surface px-2.5 py-1 text-xs text-muted-foreground">{a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="content-verification" title="콘텐츠 검증 우선순위">
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

      <SectionBlock id="budget-scaling" title="예산별 구조 축소 규칙">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-2">최소 구조 (3페이지)</h4>
            <InfoList items={["홈페이지", "서비스 소개 (통합)", "문의/상담"]} />
          </div>
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-2">표준 구조 (6~8페이지)</h4>
            <InfoList items={["홈", "서비스 (개별)", "사례 목록+상세", "회사 소개", "팀", "문의"]} />
          </div>
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-2">풀 구조 (10+ 페이지)</h4>
            <InfoList items={["표준 구조 + 산업별", "인사이트/블로그", "리포트 랜딩", "웨비나", "역량 매트릭스"]} />
          </div>
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default ImplementationRules;
