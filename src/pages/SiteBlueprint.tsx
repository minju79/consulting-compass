import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { InfoList } from "@/components/guide/InfoList";

const siteTypes = [
  { type: "리드 수집형", condition: "인바운드 영업 중심, 문의 폼이 핵심 전환", emphasis: "CTA 반복 배치, 폼 최소화, 응답 약속" },
  { type: "신뢰 증명형", condition: "고가치 프로젝트, 긴 의사결정 과정", emphasis: "사례, 수치, 전문가, 추천사 중심 구성" },
  { type: "케이스 스터디 중심형", condition: "3건 이상의 강력한 사례 보유", emphasis: "사례 목록 + 상세 페이지 우선, 검색 유입 최적화" },
  { type: "전문가 중심형", condition: "개인 전문가 또는 소규모 부티크", emphasis: "전문가 프로필, 경력, 고유 방법론 강조" },
  { type: "인사이트 중심형", condition: "블로그/리포트로 유입·리드 확보", emphasis: "콘텐츠 허브 구조, 뉴스레터, 다운로드 폼" },
  { type: "산업 특화형", condition: "특정 산업(금융, 헬스케어 등)에 집중", emphasis: "산업별 랜딩 페이지, 산업 과제-솔루션 매핑" },
];

const recommendedPages = {
  core: ["홈페이지", "서비스 소개", "문의/상담 신청"],
  recommended: ["케이스 스터디 목록", "케이스 스터디 상세", "회사 소개", "팀/전문가 소개"],
  conditional: [
    { page: "산업/전문분야 페이지", condition: "2개 이상 산업에 특화된 경우" },
    { page: "인사이트/블로그", condition: "정기적 콘텐츠 운영이 가능한 경우" },
    { page: "리포트 랜딩 페이지", condition: "다운로드 리소스가 있는 경우" },
    { page: "웨비나/세미나 페이지", condition: "정기 행사를 운영하는 경우" },
    { page: "비교/역량 매트릭스", condition: "서비스 티어 또는 경쟁 비교가 필요한 경우" },
  ],
};

const heroStructures = [
  { type: "가치 제안형", structure: "[타겟]을 위한 [핵심 가치] — [차별화 포인트]", bestFor: "일반적인 컨설팅 회사" },
  { type: "문제 해결형", structure: "[문제]를 [방식]으로 해결합니다", bestFor: "특정 과제 해결에 집중하는 경우" },
  { type: "성과 중심형", structure: "[성과 수치]를 만드는 [서비스]", bestFor: "강력한 성과 수치가 있는 경우" },
  { type: "산업 전문형", structure: "[산업] 전문 [서비스] 컨설팅", bestFor: "특정 산업에 특화된 경우" },
];

const SiteBlueprint = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="Site Blueprint"
        title="사이트 청사진"
        description="고객사 브리프를 기반으로 공개용 컨설팅 사이트의 추천 구조, 페이지, 섹션, CTA를 도출합니다."
      />

      <div className="rounded-lg border bg-accent/5 border-accent/20 p-4 mb-8">
        <p className="text-sm text-foreground font-medium mb-1">📋 빠른 적용 포인트</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Client Brief에서 수집한 정보를 기반으로 아래 판별 기준에 따라 사이트 유형을 결정합니다.</li>
          <li>• 증거 자산(사례, 수치, 로고) 보유 여부가 페이지 구조에 직접 영향을 줍니다.</li>
          <li>• 모든 판단은 규칙 기반이며, Implementation Rules 페이지에서 세부 조건을 확인할 수 있습니다.</li>
        </ul>
      </div>

      <SectionBlock id="site-types" title="추천 사이트 유형 판별">
        <div className="space-y-3">
          {siteTypes.map((st) => (
            <div key={st.type} className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm text-foreground">{st.type}</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-1"><strong>조건:</strong> {st.condition}</p>
              <p className="text-xs text-accent"><strong>강조점:</strong> {st.emphasis}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="page-structure" title="추천 페이지 구조">
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-sm text-foreground">필수 페이지</h4>
              <BadgeLabel type="required" />
            </div>
            <div className="flex flex-wrap gap-2">
              {recommendedPages.core.map((p) => (
                <span key={p} className="rounded-md border bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground">{p}</span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-sm text-foreground">권장 페이지</h4>
              <BadgeLabel type="recommended" />
            </div>
            <div className="flex flex-wrap gap-2">
              {recommendedPages.recommended.map((p) => (
                <span key={p} className="rounded-md border bg-accent/5 px-3 py-1.5 text-xs font-medium text-foreground">{p}</span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-sm text-foreground">조건부 페이지</h4>
              <BadgeLabel type="conditional" />
            </div>
            <div className="space-y-2">
              {recommendedPages.conditional.map((p) => (
                <div key={p.page} className="flex items-start gap-3 text-xs">
                  <span className="font-medium text-foreground shrink-0 w-40">{p.page}</span>
                  <span className="text-muted-foreground">조건: {p.condition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="hero-structure" title="추천 히어로 구조">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {heroStructures.map((h) => (
            <div key={h.type} className="rounded-lg border bg-card p-4">
              <h4 className="font-semibold text-sm text-foreground mb-1">{h.type}</h4>
              <p className="text-xs font-mono text-accent mb-1">{h.structure}</p>
              <p className="text-xs text-muted-foreground">적합: {h.bestFor}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="trust-elements" title="추천 신뢰 요소 (보유 자산별)">
        <div className="rounded-lg border bg-card p-5">
          <div className="space-y-3">
            {[
              { asset: "사례 보유", trust: "케이스 스터디 섹션, 성과 수치 블록" },
              { asset: "로고 공개 가능", trust: "Trust Strip (히어로 하단)" },
              { asset: "수치 공개 가능", trust: "통계/성과 수치 블록, 히어로 부속" },
              { asset: "추천사 보유", trust: "추천사/인용 블록, CTA 인접" },
              { asset: "전문가 프로필 보유", trust: "팀/전문가 카드, 사례 상세에서 담당자 표기" },
              { asset: "블로그 운영", trust: "인사이트 섹션, SEO 유입 확보" },
              { asset: "자산 부족", trust: "프로세스/방법론 + 산업 경험 서술로 대체" },
            ].map((item) => (
              <div key={item.asset} className="flex items-start gap-3 text-sm">
                <span className="font-medium text-foreground w-36 shrink-0">{item.asset}</span>
                <span className="text-muted-foreground text-xs">{item.trust}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="seo-structure" title="추천 SEO 구조">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={[
            "홈: [회사명] — [핵심 서비스] 전문 컨설팅",
            "서비스: [서비스명] | [회사명] — 메타 디스크립션에 타겟+성과 포함",
            "사례: [산업/고객사] 프로젝트 사례 | [회사명]",
            "산업: [산업명] 컨설팅 | [회사명]",
            "인사이트: [주제] — [회사명] 인사이트",
            "각 서비스·산업 페이지에 Service 스키마 적용",
            "각 사례에 Article 스키마 + BreadcrumbList",
            "FAQ 섹션에 FAQPage 스키마",
            "전 페이지 Organization 스키마",
          ]} />
        </div>
      </SectionBlock>

      <SectionBlock id="subtype-variations" title="세부 컨설팅 분야별 변경점">
        <div className="space-y-3">
          {[
            { subtype: "IT/DX 컨설팅", variation: "기술 스택, 디지털 역량, 파트너 기술 인증 블록 추가" },
            { subtype: "HR 컨설팅", variation: "조직문화 진단, 인재관리, 교육 프로그램 성과 강조" },
            { subtype: "마케팅 전략", variation: "캠페인 성과, 채널 전략, 데이터 분석 역량 강조" },
            { subtype: "재무 자문", variation: "거래 실적, 인가/라이선스, 규제 전문성 강조" },
            { subtype: "ESG 컨설팅", variation: "지속가능성 지표, 인증, 보고서 발간 이력 강조" },
            { subtype: "경영 전략", variation: "CEO/C레벨 경험, 글로벌 프로젝트, 산업별 전문성 강조" },
          ].map((item) => (
            <div key={item.subtype} className="rounded-lg border bg-card p-4">
              <h4 className="font-semibold text-sm text-foreground mb-1">{item.subtype}</h4>
              <p className="text-xs text-muted-foreground">{item.variation}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="wireframe-order" title="추천 와이어프레임 블록 순서 (홈페이지 기준)">
        <div className="rounded-lg border bg-card overflow-hidden">
          {[
            { n: "01", block: "Hero", note: "가치 제안 + Primary CTA + Secondary CTA" },
            { n: "02", block: "Trust Strip", note: "고객사 로고 (없으면 성과 수치)" },
            { n: "03", block: "서비스 개요", note: "3~6개 서비스 카드" },
            { n: "04", block: "프로세스", note: "문제 해결 단계 시각화" },
            { n: "05", block: "케이스 스터디", note: "대표 사례 2~3건" },
            { n: "06", block: "성과 수치", note: "핵심 KPI 3~4개" },
            { n: "07", block: "전문가 소개", note: "핵심 인력 3~5명 (선택)" },
            { n: "08", block: "추천사", note: "고객 추천사 (보유 시)" },
            { n: "09", block: "인사이트", note: "최신 아티클 (운영 시)" },
            { n: "10", block: "FAQ", note: "5~7개 질문" },
            { n: "11", block: "CTA 배너", note: "최종 전환 유도" },
            { n: "12", block: "Footer", note: "연락처, 링크, 사업 정보" },
          ].map((item) => (
            <div key={item.n} className="flex items-center gap-4 px-5 py-3 border-b last:border-b-0 text-sm">
              <span className="font-mono text-xs text-muted-foreground w-6">{item.n}</span>
              <span className="font-medium text-foreground w-28 shrink-0">{item.block}</span>
              <span className="text-xs text-muted-foreground">{item.note}</span>
            </div>
          ))}
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default SiteBlueprint;
