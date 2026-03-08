// Industry-level configuration — swap this file to adapt for different industries
export const industryConfig = {
  id: "consulting",
  name: "컨설팅",
  nameEn: "Consulting",
  tagline: "컨설팅 업종 웹사이트 제작 가이드",
  description: "디자이너, 기획자, 개발자가 컨설팅 업종 홈페이지를 빠르고 일관되게 제작하기 위한 내부 기준서",
  siteUrl: "https://consulting-guide.lovable.app",
  locale: "ko_KR",
  lang: "ko",

  // Visitor psychology
  visitorPriorities: [
    { rank: "1순위", content: "이 회사가 우리 업계/문제를 이해하고 있는가?" },
    { rank: "2순위", content: "유사한 프로젝트를 수행한 경험이 있는가?" },
    { rank: "3순위", content: "어떤 프로세스와 방법론으로 일하는가?" },
    { rank: "4순위", content: "구체적인 성과 수치가 있는가?" },
    { rank: "5순위", content: "누가 우리 프로젝트를 담당하게 되는가?" },
    { rank: "6순위", content: "비용 구조와 상담 절차는 어떻게 되는가?" },
  ],

  // Core traits that differentiate this industry
  coreTraits: [
    "상담 요청·프로젝트 문의 전환 중심",
    "전문성·실적·방법론이 핵심 판단 기준",
    "정제된 비주얼과 정보 밀도가 중요",
    "기업 의사결정자 대상, 긴 검토 과정",
    "사례·팀·프로세스가 주요 신뢰 요소",
  ],

  // Comparison with general service industry
  generalServiceTraits: [
    "제품/서비스 즉시 구매 또는 예약 중심",
    "가격 비교가 핵심 의사결정 요소",
    "감성적 비주얼과 프로모션이 효과적",
    "개인 소비자 대상, 짧은 의사결정",
    "리뷰와 별점이 주요 신뢰 요소",
  ],

  // Trust elements
  trustElements: [
    { title: "사례 연구", desc: "문제-접근-성과 구조의 케이스 스터디", priority: 1 },
    { title: "성과 수치", desc: "프로젝트 수, 고객사 수, 성장률 등 (예시 데이터 명시)", priority: 2 },
    { title: "전문가 프로필", desc: "핵심 인력의 경력·전문 분야 소개", priority: 3 },
    { title: "고객사 로고", desc: "서비스한 기업의 로고 스트립", priority: 4 },
    { title: "방법론·프로세스", desc: "체계적 접근 방식을 시각화", priority: 5 },
    { title: "인사이트 콘텐츠", desc: "전문성을 증명하는 아티클·보고서", priority: 6 },
    { title: "인증·수상", desc: "관련 자격, 수상 내역, 파트너십", priority: 7 },
    { title: "고객 추천사", desc: "실명 기반 추천사 또는 인터뷰", priority: 8 },
    { title: "언론 노출", desc: "미디어 인용, 기고, 컨퍼런스 발표", priority: 9 },
  ],

  // Failure patterns
  failurePatterns: [
    { pattern: "추상적인 카피만 나열", problem: "'혁신적 솔루션으로 비즈니스 성장을 지원합니다' — 구체적으로 무엇을 하는지 알 수 없음" },
    { pattern: "사례·증거 부재", problem: "서비스만 나열하고 실제 프로젝트 경험이나 성과를 보여주지 않음" },
    { pattern: "과도한 비주얼 위주", problem: "화려한 애니메이션에 집중하고 정보 전달이 부족한 사이트" },
    { pattern: "CTA 모호함", problem: "'Learn More', '자세히 보기'만 반복, 방문자가 다음 행동을 모름" },
    { pattern: "모바일 경험 미흡", problem: "데스크톱 기준으로만 설계하여 모바일에서 정보 계층이 무너짐" },
    { pattern: "팀·전문가 정보 부재", problem: "누가 서비스를 제공하는지 알 수 없어 신뢰가 형성되지 않음" },
  ],

  // Conversion flow
  conversionFlow: ["검색/추천 유입", "히어로 영역 확인", "서비스 탐색", "사례/성과 확인", "팀/전문가 확인", "문의 폼 작성"],

  // Sub-categories
  subCategories: [
    "경영 전략", "디지털 전환", "IT 컨설팅", "HR 컨설팅",
    "마케팅 전략", "재무 자문", "법률 자문", "ESG 컨설팅",
    "M&A 자문", "브랜드 전략", "공공 정책", "운영 효율화",
  ],

  // Decision criteria for decision-makers
  decisionCriteria: [
    { criteria: "전문성", method: "산업별 경험, 방법론, 팀 역량 페이지" },
    { criteria: "실적", method: "케이스 스터디, 성과 수치, 고객사 로고" },
    { criteria: "체계성", method: "프로세스 타임라인, 서비스 구조" },
    { criteria: "투명성", method: "비용 안내, FAQ, 상담 절차 설명" },
    { criteria: "접근성", method: "상담 폼 간소화, 연락처 명시, 빠른 응답 약속" },
  ],

  // Recommended public site structure
  publicSiteStructure: [
    { label: "Hero", desc: "무엇을, 누구에게, 어떻게 해결하는지 즉시 전달" },
    { label: "Trust Strip", desc: "파트너 로고, 수치, 인증, 언론 노출" },
    { label: "주요 서비스", desc: "핵심 서비스를 3~6개로 분류하여 제시" },
    { label: "산업별 역량", desc: "전문 분야 또는 산업군별 경험 제시" },
    { label: "프로세스", desc: "문제 해결 프로세스를 단계별로 시각화" },
    { label: "성과 지표", desc: "핵심 성과 수치 3~4개로 신뢰 강화" },
    { label: "케이스 스터디", desc: "대표 사례 2~3건, 성과 중심 서술" },
    { label: "전문가 소개", desc: "핵심 인력 3~5명, 전문 분야 명시" },
    { label: "인사이트", desc: "최신 아티클 또는 보고서 카드" },
    { label: "FAQ", desc: "자주 묻는 질문 아코디언 방식" },
    { label: "상담 CTA", desc: "구체적 전환 유도 — '프로젝트 문의하기'" },
    { label: "Footer", desc: "연락처, 사업 정보, 주요 링크" },
  ],
};

export type IndustryConfig = typeof industryConfig;
