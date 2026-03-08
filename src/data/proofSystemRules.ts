// Proof system rules — trust evidence hierarchy and placement
export interface ProofAsset {
  id: string;
  name: string;
  priority: number;
  impactLevel: "최상" | "상" | "중" | "하";
  description: string;
  bestPlacement: string[];
  fallbackWhenMissing: string;
  verificationNeeded: boolean;
}

export const proofAssets: ProofAsset[] = [
  {
    id: "case-study",
    name: "케이스 스터디",
    priority: 1,
    impactLevel: "최상",
    description: "문제-접근-성과 구조의 실제 프로젝트 사례",
    bestPlacement: ["홈페이지 중반", "서비스 페이지 하단", "사례 목록 페이지"],
    fallbackWhenMissing: "프로세스/방법론 블록으로 체계적 접근 방식 증명",
    verificationNeeded: true,
  },
  {
    id: "metrics",
    name: "성과 수치",
    priority: 2,
    impactLevel: "최상",
    description: "프로젝트 수, 성장률, 고객 만족도 등 구체적 수치",
    bestPlacement: ["히어로 하단", "서비스 페이지", "사례 상세"],
    fallbackWhenMissing: "'N년 이상의 업계 경험', '다수의 프로젝트 수행' 등 정성적 표현",
    verificationNeeded: true,
  },
  {
    id: "client-logos",
    name: "고객사 로고",
    priority: 3,
    impactLevel: "상",
    description: "서비스한 기업/기관의 브랜드 로고 스트립",
    bestPlacement: ["히어로 직하단", "문의 폼 상단"],
    fallbackWhenMissing: "'금융/제조/IT 산업 다수 고객사 보유' 등 산업군 기반 서술",
    verificationNeeded: true,
  },
  {
    id: "expert-profile",
    name: "전문가 프로필",
    priority: 4,
    impactLevel: "상",
    description: "핵심 인력의 경력, 전문 분야, 학력 소개",
    bestPlacement: ["팀 페이지", "홈페이지 하반부", "서비스 페이지"],
    fallbackWhenMissing: "'평균 N년 경력의 전문가 팀' 등 팀 역량 요약",
    verificationNeeded: false,
  },
  {
    id: "methodology",
    name: "방법론/프레임워크",
    priority: 5,
    impactLevel: "상",
    description: "독자적 또는 표준 방법론, 프로세스 시각화",
    bestPlacement: ["서비스 페이지", "홈페이지", "산업별 페이지"],
    fallbackWhenMissing: "단계별 프로세스 타임라인으로 체계성 전달",
    verificationNeeded: false,
  },
  {
    id: "industry-experience",
    name: "산업 경험",
    priority: 6,
    impactLevel: "상",
    description: "특정 산업에서의 프로젝트 이력, 전문성",
    bestPlacement: ["산업별 페이지", "서비스 페이지", "홈페이지"],
    fallbackWhenMissing: "산업 트렌드 인사이트 콘텐츠로 전문성 간접 증명",
    verificationNeeded: false,
  },
  {
    id: "partnership",
    name: "파트너십",
    priority: 7,
    impactLevel: "중",
    description: "기술/전략 파트너, 협력사 관계",
    bestPlacement: ["회사 소개", "푸터", "히어로 하단"],
    fallbackWhenMissing: "관련 기술 역량, 인증 정보로 대체",
    verificationNeeded: true,
  },
  {
    id: "certification",
    name: "인증/수상",
    priority: 8,
    impactLevel: "중",
    description: "관련 자격, 수상, 인증 마크",
    bestPlacement: ["회사 소개", "푸터", "문의 폼 인접"],
    fallbackWhenMissing: "팀 자격/학력, 전문 교육 이수 내역으로 대체",
    verificationNeeded: true,
  },
  {
    id: "testimonial",
    name: "추천사/인용",
    priority: 9,
    impactLevel: "중",
    description: "고객 담당자의 실명 기반 코멘트",
    bestPlacement: ["홈페이지 중반", "사례 상세", "문의 폼 인접"],
    fallbackWhenMissing: "케이스 스터디 성과 수치로 간접 증명",
    verificationNeeded: true,
  },
  {
    id: "media",
    name: "미디어/리포트/세미나",
    priority: 10,
    impactLevel: "하",
    description: "언론 인용, 기고, 컨퍼런스 발표, 보고서",
    bestPlacement: ["인사이트 페이지", "회사 소개", "푸터"],
    fallbackWhenMissing: "자체 인사이트 콘텐츠로 전문성 증명",
    verificationNeeded: true,
  },
];

export const proofStatusLabels = {
  verified: { label: "검증 완료", color: "accent" },
  needsReview: { label: "검토 필요", color: "warning" },
  private: { label: "비공개 자산", color: "muted" },
} as const;

// Page-level proof placement rules
export const pageProofRules: Record<string, { required: string[]; recommended: string[]; optional: string[] }> = {
  homepage: {
    required: ["case-study", "metrics"],
    recommended: ["client-logos", "methodology", "testimonial"],
    optional: ["certification", "media", "partnership"],
  },
  service: {
    required: ["methodology"],
    recommended: ["case-study", "metrics", "expert-profile"],
    optional: ["testimonial", "industry-experience"],
  },
  industry: {
    required: ["industry-experience"],
    recommended: ["case-study", "expert-profile"],
    optional: ["metrics", "partnership"],
  },
  caseStudy: {
    required: ["metrics"],
    recommended: ["testimonial"],
    optional: ["expert-profile"],
  },
  contact: {
    required: [],
    recommended: ["client-logos", "metrics", "certification"],
    optional: ["testimonial"],
  },
  about: {
    required: ["expert-profile"],
    recommended: ["certification", "partnership", "media"],
    optional: ["metrics"],
  },
};
