import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";

interface TemplateSection {
  name: string;
  purpose: string;
  optional?: boolean;
}

interface PageTemplate {
  title: string;
  description: string;
  sections: TemplateSection[];
  headline: string;
  cta: string;
  trust: string;
  mobileNote: string;
}

const templates: PageTemplate[] = [
  {
    title: "홈페이지",
    description: "방문자의 첫 인상을 결정짓는 핵심 페이지. 전문성, 서비스 범위, 신뢰를 압축 전달합니다.",
    sections: [
      { name: "Hero", purpose: "핵심 가치 제안 + CTA" },
      { name: "Trust Strip", purpose: "고객사 로고 5~8개" },
      { name: "서비스 개요", purpose: "주요 서비스 3~6개 카드" },
      { name: "성과 수치", purpose: "핵심 KPI 3~4개" },
      { name: "프로세스", purpose: "문제 해결 프로세스 시각화" },
      { name: "케이스 스터디", purpose: "대표 사례 2~3건" },
      { name: "전문가 소개", purpose: "핵심 인력 3~5명" },
      { name: "인사이트", purpose: "최신 아티클 2~3건" },
      { name: "FAQ", purpose: "자주 묻는 질문 5~7개" },
      { name: "CTA 배너", purpose: "최종 전환 유도" },
      { name: "Footer", purpose: "연락처, 링크, 사업 정보" },
    ],
    headline: "[타겟]을 위한 [핵심 가치] — [차별화 포인트]",
    cta: "프로젝트 문의하기 / 무료 상담 신청하기",
    trust: "고객사 로고, 프로젝트 수, 산업 경험, 수상/인증",
    mobileNote: "히어로 이미지 축소, 서비스 카드 1컬럼, 프로세스 세로 타임라인 전환",
  },
  {
    title: "서비스 소개 페이지",
    description: "개별 서비스의 상세 내용, 적용 대상, 프로세스, 성과를 설명하는 페이지입니다.",
    sections: [
      { name: "서비스 Hero", purpose: "서비스명 + 한 줄 설명 + CTA" },
      { name: "문제 정의", purpose: "이 서비스가 해결하는 과제" },
      { name: "서비스 상세", purpose: "세부 항목 3~5개" },
      { name: "적용 대상", purpose: "이 서비스가 적합한 기업/상황" },
      { name: "프로세스", purpose: "진행 단계 시각화" },
      { name: "관련 사례", purpose: "이 서비스 관련 케이스 2~3건" },
      { name: "성과 수치", purpose: "서비스별 대표 KPI" },
      { name: "FAQ", purpose: "서비스 관련 질문", optional: true },
      { name: "CTA 배너", purpose: "상담 전환 유도" },
    ],
    headline: "[문제]를 [방법]으로 해결하는 [서비스명]",
    cta: "이 서비스 문의하기",
    trust: "관련 사례 성과 수치, 담당 전문가 프로필",
    mobileNote: "서비스 상세 항목 아코디언 전환, 프로세스 세로 레이아웃",
  },
  {
    title: "산업/전문분야 소개 페이지",
    description: "특정 산업군에 대한 전문성을 강조하는 페이지입니다.",
    sections: [
      { name: "산업 Hero", purpose: "산업명 + 전문성 요약" },
      { name: "산업 과제", purpose: "해당 산업의 핵심 과제 3~5개" },
      { name: "솔루션 매핑", purpose: "과제별 제공 서비스 매칭" },
      { name: "관련 사례", purpose: "해당 산업 케이스 2~4건" },
      { name: "담당 전문가", purpose: "산업 전문 인력 소개" },
      { name: "CTA 배너", purpose: "산업 전문 상담 유도" },
    ],
    headline: "[산업] 전문 — [핵심 역량]으로 [성과]를 만듭니다",
    cta: "[산업] 전문 상담 요청하기",
    trust: "해당 산업 프로젝트 수, 관련 인증, 전문가 프로필",
    mobileNote: "과제-솔루션 매핑을 카드 리스트로 전환",
  },
  {
    title: "케이스 스터디 목록 페이지",
    description: "전체 사례를 산업/서비스별로 필터링하여 탐색할 수 있는 페이지입니다.",
    sections: [
      { name: "페이지 Hero", purpose: "사례 소개 헤드라인" },
      { name: "필터/카테고리", purpose: "산업별, 서비스별 필터" },
      { name: "사례 카드 그리드", purpose: "이미지 + 태그 + 제목 + 성과" },
      { name: "CTA 배너", purpose: "문의 전환 유도" },
    ],
    headline: "프로젝트 사례 — 데이터로 증명하는 성과",
    cta: "우리 산업에 맞는 사례 상담하기",
    trust: "사례 수, 산업 커버리지, 성과 수치",
    mobileNote: "필터를 드롭다운으로, 카드 1컬럼 나열",
  },
  {
    title: "케이스 스터디 상세 페이지",
    description: "개별 프로젝트의 배경, 접근 방식, 성과를 상세히 보여주는 페이지입니다.",
    sections: [
      { name: "프로젝트 Hero", purpose: "프로젝트명 + 산업 + 핵심 성과" },
      { name: "프로젝트 개요", purpose: "배경, 기간, 규모 요약 테이블" },
      { name: "과제 (Challenge)", purpose: "고객이 직면한 문제" },
      { name: "접근 (Approach)", purpose: "해결 방법론과 프로세스" },
      { name: "성과 (Result)", purpose: "구체적 수치와 영향" },
      { name: "고객 추천사", purpose: "고객 담당자 코멘트", optional: true },
      { name: "관련 사례", purpose: "유사 사례 2~3건 추천" },
      { name: "CTA 배너", purpose: "유사 프로젝트 문의 유도" },
    ],
    headline: "[고객사/산업] — [핵심 성과 수치]를 달성한 [프로젝트명]",
    cta: "유사 프로젝트 문의하기",
    trust: "구체적 성과 수치, 고객 추천사, 프로젝트 상세 정보",
    mobileNote: "요약 테이블 수직 배치, 성과 수치 강조 표시",
  },
  {
    title: "인사이트/블로그 목록 페이지",
    description: "전문 아티클, 보고서, 관점을 통해 전문성을 증명하는 콘텐츠 허브입니다.",
    sections: [
      { name: "페이지 Hero", purpose: "인사이트 소개 헤드라인" },
      { name: "카테고리 필터", purpose: "주제별, 유형별 필터" },
      { name: "피쳐드 아티클", purpose: "최신/주요 아티클 1~2건 대형 카드" },
      { name: "아티클 카드 그리드", purpose: "이미지 + 카테고리 + 제목 + 요약" },
      { name: "뉴스레터 CTA", purpose: "이메일 구독 유도", optional: true },
    ],
    headline: "인사이트 — 전략적 관점과 산업 분석",
    cta: "전문가 인사이트 구독하기",
    trust: "아티클 수, 저자 전문가 프로필",
    mobileNote: "피쳐드 카드 1컬럼, 카드 간소화",
  },
  {
    title: "회사 소개 페이지",
    description: "회사의 미션, 비전, 연혁, 가치관을 전달하는 페이지입니다.",
    sections: [
      { name: "Hero", purpose: "회사 핵심 미션 한 줄" },
      { name: "회사 소개", purpose: "설립 배경, 핵심 가치, 차별점" },
      { name: "연혁/성장", purpose: "주요 이정표 타임라인", optional: true },
      { name: "숫자로 보는 회사", purpose: "직원 수, 프로젝트 수, 고객사 수 등" },
      { name: "리더십", purpose: "경영진/파운더 소개" },
      { name: "문화/가치", purpose: "일하는 방식, 핵심 가치", optional: true },
      { name: "CTA 배너", purpose: "함께 일하기 / 문의하기" },
    ],
    headline: "[핵심 가치] — [차별화된 접근]으로 [성과]를 만듭니다",
    cta: "함께 일하기 / 파트너 되기",
    trust: "연혁, 수상, 인증, 경영진 프로필",
    mobileNote: "타임라인 세로 전환, 수치 블록 2x2 그리드",
  },
  {
    title: "팀/전문가 소개 페이지",
    description: "전문 인력의 역량을 보여주어 인간적 신뢰를 형성하는 페이지입니다.",
    sections: [
      { name: "페이지 Hero", purpose: "팀 소개 헤드라인" },
      { name: "전문가 카드 그리드", purpose: "사진 + 이름 + 직함 + 전문 분야" },
      { name: "전문가 상세", purpose: "클릭 시 경력, 프로젝트 경험 확장", optional: true },
      { name: "채용 CTA", purpose: "채용 페이지 연결", optional: true },
    ],
    headline: "전문가 팀 — [분야] 최고의 인재가 함께합니다",
    cta: "전문가와 상담하기 / 채용 공고 보기",
    trust: "전문가 수, 전문 분야 커버리지, 학력/자격",
    mobileNote: "2컬럼 카드, 상세 정보는 모달 또는 별도 페이지",
  },
  {
    title: "문의/상담 신청 페이지",
    description: "최종 전환을 유도하는 핵심 페이지. 최소 필드와 명확한 기대 설정이 핵심입니다.",
    sections: [
      { name: "페이지 Hero", purpose: "문의 유도 헤드라인 + 응답 시간 약속" },
      { name: "문의 폼", purpose: "4~6 필드, 명확한 라벨" },
      { name: "연락 정보", purpose: "전화, 이메일, 주소, 지도" },
      { name: "FAQ", purpose: "상담 관련 자주 묻는 질문", optional: true },
      { name: "신뢰 요소", purpose: "로고, 인증, 보안 안내" },
    ],
    headline: "프로젝트를 시작하세요 — 영업일 1일 이내 회신드립니다",
    cta: "문의 보내기 / 프로젝트 상담 시작하기",
    trust: "응답 시간 약속, 보안 배지, 개인정보 보호 안내",
    mobileNote: "폼 풀 폭, 연락 정보 아래로 이동",
  },
];

const PageTemplates = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="Page Templates"
        title="페이지 템플릿"
        description="실제 고객사 사이트에 바로 적용 가능한 페이지별 구조 템플릿입니다. 각 템플릿의 섹션 순서, 목적, 권장 CTA, 모바일 처리 방식을 제공합니다."
      />

      {templates.map((tmpl) => (
        <SectionBlock key={tmpl.title} id={tmpl.title.replace(/\s/g, "-")} title={tmpl.title} description={tmpl.description}>
          {/* 섹션 구조 */}
          <div className="rounded-lg border bg-card overflow-hidden mb-4">
            <div className="px-4 py-2 bg-surface border-b">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">섹션 구조</span>
            </div>
            {tmpl.sections.map((sec, i) => (
              <div key={sec.name} className="flex items-center gap-3 px-4 py-2.5 border-b last:border-b-0 text-sm">
                <span className="font-mono text-xs text-muted-foreground w-5">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium text-foreground w-36 shrink-0">
                  {sec.name}
                  {sec.optional && <span className="text-xs text-muted-foreground ml-1">(선택)</span>}
                </span>
                <span className="text-xs text-muted-foreground">{sec.purpose}</span>
              </div>
            ))}
          </div>

          {/* 메타 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border bg-card p-4">
              <span className="text-xs font-semibold text-muted-foreground">추천 헤드라인 구조</span>
              <p className="text-sm text-foreground mt-1 font-mono">{tmpl.headline}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <span className="text-xs font-semibold text-muted-foreground">추천 CTA</span>
              <p className="text-sm text-foreground mt-1">{tmpl.cta}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <span className="text-xs font-semibold text-muted-foreground">포함해야 할 신뢰 요소</span>
              <p className="text-sm text-muted-foreground mt-1">{tmpl.trust}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <span className="text-xs font-semibold text-muted-foreground">모바일 축약 방식</span>
              <p className="text-sm text-muted-foreground mt-1">{tmpl.mobileNote}</p>
            </div>
          </div>
        </SectionBlock>
      ))}
    </AppLayout>
  );
};

export default PageTemplates;
