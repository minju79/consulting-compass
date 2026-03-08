// Brief data schema, storage, and engine utilities
import { toast } from "sonner";

export const BRIEF_STORAGE_KEY = "consulting-guide-brief-v2";
export const BRIEF_SCHEMA_VERSION = 2;

export interface BriefData {
  _schemaVersion: number;
  _lastSaved?: string;
  // 기본 정보
  companyName: string;
  consultingType: string;
  coreServices: string;
  targetClients: string;
  industries: string;
  regions: string;
  projectScale: string;
  salesMethod: string;
  // 전환 전략
  primaryCta: string;
  leadMethod: string[];
  // 증거 자산
  hasCases: boolean | null;
  hasClientLogos: boolean | null;
  hasMetrics: boolean | null;
  hasTestimonials: boolean | null;
  hasExpertProfiles: boolean | null;
  hasInsights: boolean | null;
  hasDownloads: boolean | null;
  hasWebinars: boolean | null;
  // 브랜드
  brandTone: string;
  hasBrandAssets: boolean | null;
  needsMultilang: boolean | null;
  // 요구사항
  requiredPages: string;
  prohibitedExpressions: string;
  claimsToReview: string;
  competitorNotes: string;
}

export const emptyBrief: BriefData = {
  _schemaVersion: BRIEF_SCHEMA_VERSION,
  companyName: "",
  consultingType: "",
  coreServices: "",
  targetClients: "",
  industries: "",
  regions: "",
  projectScale: "",
  salesMethod: "",
  primaryCta: "",
  leadMethod: [],
  hasCases: null,
  hasClientLogos: null,
  hasMetrics: null,
  hasTestimonials: null,
  hasExpertProfiles: null,
  hasInsights: null,
  hasDownloads: null,
  hasWebinars: null,
  brandTone: "",
  hasBrandAssets: null,
  needsMultilang: null,
  requiredPages: "",
  prohibitedExpressions: "",
  claimsToReview: "",
  competitorNotes: "",
};

export const exampleBrief: BriefData = {
  _schemaVersion: BRIEF_SCHEMA_VERSION,
  companyName: "Apex 전략 컨설팅 (예시)",
  consultingType: "경영 전략",
  coreServices: "성장 전략 수립, 시장 진출 전략, M&A 자문, 조직 혁신, 디지털 전환 전략",
  targetClients: "연매출 1,000억 이상 중견·대기업, 금융·제조·IT 산업 C레벨 의사결정자",
  industries: "금융, 제조, IT/테크, 헬스케어",
  regions: "국내 전국 + 동남아시아",
  projectScale: "중규모 (3~6개월)",
  salesMethod: "혼합",
  primaryCta: "프로젝트 문의",
  leadMethod: ["문의 폼", "전화", "이메일"],
  hasCases: true,
  hasClientLogos: true,
  hasMetrics: true,
  hasTestimonials: true,
  hasExpertProfiles: true,
  hasInsights: true,
  hasDownloads: true,
  hasWebinars: false,
  brandTone: "Corporate (보수적·신뢰)",
  hasBrandAssets: true,
  needsMultilang: false,
  requiredPages: "홈, 서비스, 산업별, 사례, 팀, 인사이트, 문의",
  prohibitedExpressions: "업계 최고, 유일, 1위, 압도적",
  claimsToReview: "'국내 최대 규모' — 검증 필요",
  competitorNotes: "대형 컨설팅(맥킨지, BCG)과 차별화: 국내 산업 심층 이해, 실행 밀착 지원",
};

export function loadBrief(): BriefData {
  try {
    const raw = localStorage.getItem(BRIEF_STORAGE_KEY);
    if (!raw) return { ...emptyBrief };
    const parsed = JSON.parse(raw);
    if (parsed._schemaVersion !== BRIEF_SCHEMA_VERSION) {
      // Migration: reset on version mismatch
      return { ...emptyBrief };
    }
    return { ...emptyBrief, ...parsed };
  } catch {
    return { ...emptyBrief };
  }
}

export function saveBrief(data: BriefData): boolean {
  try {
    const toSave = { ...data, _schemaVersion: BRIEF_SCHEMA_VERSION, _lastSaved: new Date().toISOString() };
    localStorage.setItem(BRIEF_STORAGE_KEY, JSON.stringify(toSave));
    return true;
  } catch {
    return false;
  }
}

export function exportBriefJson(data: BriefData): string {
  return JSON.stringify({ ...data, _schemaVersion: BRIEF_SCHEMA_VERSION }, null, 2);
}

export function importBriefJson(json: string): BriefData | null {
  try {
    const parsed = JSON.parse(json);
    if (typeof parsed !== "object" || !parsed) return null;
    return { ...emptyBrief, ...parsed, _schemaVersion: BRIEF_SCHEMA_VERSION };
  } catch {
    return null;
  }
}

// ─── Brief Analysis Engine ───

export type SiteType = "리드 수집형" | "신뢰 증명형" | "케이스 스터디 중심형" | "전문가 중심형" | "인사이트 중심형" | "산업 특화형";

export interface BriefAnalysis {
  completionRate: number;
  requiredCompletionRate: number;
  missingRequired: string[];
  siteType: SiteType;
  siteTypeReason: string;
  proofScore: number; // 0-10
  proofSummary: { id: string; label: string; status: "보유" | "부족" | "비공개" | "미입력" }[];
  recommendedCta: string;
  recommendedHero: string;
  scaleRecommendation: "최소" | "표준" | "풀";
}

const REQUIRED_FIELDS: (keyof BriefData)[] = ["companyName", "consultingType", "coreServices", "targetClients", "primaryCta"];
const ALL_FIELDS: (keyof BriefData)[] = [
  "companyName", "consultingType", "coreServices", "targetClients", "industries",
  "regions", "projectScale", "salesMethod", "primaryCta", "leadMethod",
  "hasCases", "hasClientLogos", "hasMetrics", "hasTestimonials", "hasExpertProfiles",
  "hasInsights", "hasDownloads", "hasWebinars", "brandTone", "hasBrandAssets",
  "needsMultilang", "requiredPages",
];

function isFilled(val: unknown): boolean {
  if (val === null || val === undefined) return false;
  if (typeof val === "string") return val.trim().length > 0;
  if (typeof val === "boolean") return true;
  if (Array.isArray(val)) return val.length > 0;
  return true;
}

export function analyzeBrief(brief: BriefData): BriefAnalysis {
  // Completion
  const filledAll = ALL_FIELDS.filter((k) => isFilled(brief[k])).length;
  const completionRate = Math.round((filledAll / ALL_FIELDS.length) * 100);
  const filledReq = REQUIRED_FIELDS.filter((k) => isFilled(brief[k])).length;
  const requiredCompletionRate = Math.round((filledReq / REQUIRED_FIELDS.length) * 100);
  const missingRequired = REQUIRED_FIELDS.filter((k) => !isFilled(brief[k])).map((k) => {
    const labels: Record<string, string> = { companyName: "회사명", consultingType: "컨설팅 유형", coreServices: "핵심 서비스", targetClients: "타겟 고객", primaryCta: "핵심 CTA" };
    return labels[k] || k;
  });

  // Proof
  const proofFields: { key: keyof BriefData; label: string; id: string }[] = [
    { key: "hasCases", label: "케이스 스터디", id: "case-study" },
    { key: "hasClientLogos", label: "고객사 로고", id: "client-logos" },
    { key: "hasMetrics", label: "성과 수치", id: "metrics" },
    { key: "hasTestimonials", label: "추천사", id: "testimonial" },
    { key: "hasExpertProfiles", label: "전문가 프로필", id: "expert-profile" },
    { key: "hasInsights", label: "인사이트/블로그", id: "insights" },
    { key: "hasDownloads", label: "다운로드 리소스", id: "downloads" },
    { key: "hasWebinars", label: "세미나/웨비나", id: "webinars" },
  ];
  const proofSummary = proofFields.map((pf) => {
    const val = brief[pf.key];
    const status = val === null ? "미입력" : val === true ? "보유" : "부족";
    return { id: pf.id, label: pf.label, status: status as "보유" | "부족" | "비공개" | "미입력" };
  });
  const proofScore = proofSummary.filter((p) => p.status === "보유").length;

  // Site type
  let siteType: SiteType = "리드 수집형";
  let siteTypeReason = "기본: 인바운드 리드 수집 중심 사이트";
  if (brief.hasCases && brief.hasMetrics) {
    siteType = "케이스 스터디 중심형";
    siteTypeReason = "사례 + 성과 수치 보유 → 사례 중심으로 신뢰 구축";
  } else if (brief.hasExpertProfiles && brief.projectScale === "소규모 (1~3개월)") {
    siteType = "전문가 중심형";
    siteTypeReason = "전문가 프로필 보유 + 소규모 → 부티크 전문가 모델";
  } else if (brief.hasInsights && brief.hasDownloads) {
    siteType = "인사이트 중심형";
    siteTypeReason = "인사이트 + 다운로드 리소스 → 콘텐츠 마케팅 중심";
  } else if (brief.industries && brief.industries.split(",").length >= 2) {
    siteType = "산업 특화형";
    siteTypeReason = "2개 이상 산업군 명시 → 산업별 랜딩 페이지 권장";
  } else if (proofScore >= 5) {
    siteType = "신뢰 증명형";
    siteTypeReason = "다수의 증거 자산 보유 → 신뢰 요소 중심 배치";
  }

  // CTA
  const ctaMap: Record<string, string> = {
    "상담 문의": "전문가 상담 신청하기",
    "프로젝트 문의": "프로젝트 문의하기",
    "무료 진단 신청": "무료 진단 신청하기",
    "리포트 다운로드": "무료 리포트 다운로드",
    "세미나 참가": "세미나 참가 신청하기",
    "전화 상담": "전문가 전화 상담 예약",
  };
  const recommendedCta = ctaMap[brief.primaryCta] || "프로젝트 문의하기";

  // Hero
  let recommendedHero = `[타겟]을 위한 [핵심 서비스] — [차별화]`;
  if (brief.hasMetrics) recommendedHero = `[성과 수치]를 만드는 [서비스명]`;
  else if (brief.industries) recommendedHero = `[산업] 전문 [서비스] 컨설팅`;

  // Scale
  let scaleRecommendation: "최소" | "표준" | "풀" = "표준";
  if (proofScore >= 6 && brief.hasInsights) scaleRecommendation = "풀";
  else if (proofScore <= 2) scaleRecommendation = "최소";

  return {
    completionRate,
    requiredCompletionRate,
    missingRequired,
    siteType,
    siteTypeReason,
    proofScore,
    proofSummary,
    recommendedCta,
    recommendedHero,
    scaleRecommendation,
  };
}

// ─── Blueprint Generation Engine ───

export interface PageBlueprint {
  name: string;
  status: "필수" | "권장" | "조건부" | "제거 가능";
  condition?: string;
  blocks: { name: string; status: "required" | "optional" | "conditional" | "prohibited"; note?: string }[];
  cta: string;
  proofElements: string[];
  seoPoints: string[];
  mobileRule: string;
}

export function generateBlueprints(brief: BriefData, analysis: BriefAnalysis): PageBlueprint[] {
  const pages: PageBlueprint[] = [];

  // 홈페이지 — always required
  pages.push({
    name: "홈페이지",
    status: "필수",
    blocks: [
      { name: "Hero", status: "required", note: analysis.recommendedHero },
      { name: "Trust Strip", status: brief.hasClientLogos ? "required" : "conditional", note: brief.hasClientLogos ? "고객사 로고" : "산업군 기반 텍스트 대체" },
      { name: "서비스 개요", status: "required" },
      { name: "프로세스/방법론", status: "required" },
      { name: "성과 수치", status: brief.hasMetrics ? "required" : "optional", note: !brief.hasMetrics ? "정성적 표현으로 대체" : undefined },
      { name: "케이스 스터디", status: brief.hasCases ? "required" : "conditional", note: !brief.hasCases ? "프로세스 블록으로 대체" : undefined },
      { name: "전문가 소개", status: brief.hasExpertProfiles ? "optional" : "conditional" },
      { name: "추천사", status: brief.hasTestimonials ? "optional" : "prohibited", note: !brief.hasTestimonials ? "허위 추천사 금지" : undefined },
      { name: "인사이트", status: brief.hasInsights ? "optional" : "prohibited" },
      { name: "FAQ", status: "optional" },
      { name: "CTA 배너", status: "required" },
      { name: "Footer", status: "required" },
      { name: "팝업/배너 프로모션", status: "prohibited" },
      { name: "자동재생 비디오", status: "prohibited" },
    ],
    cta: analysis.recommendedCta,
    proofElements: analysis.proofSummary.filter((p) => p.status === "보유").map((p) => p.label),
    seoPoints: ["H1: 핵심 서비스 키워드", "Organization JSON-LD", "FAQ 있으면 FAQPage 스키마"],
    mobileRule: "서비스 카드 1컬럼, 성과 수치 2x2 그리드",
  });

  // 서비스 페이지
  pages.push({
    name: "서비스 소개",
    status: "필수",
    blocks: [
      { name: "서비스 Hero", status: "required" },
      { name: "문제 정의", status: "required" },
      { name: "서비스 상세", status: "required" },
      { name: "프로세스", status: "required" },
      { name: "관련 사례", status: brief.hasCases ? "required" : "conditional" },
      { name: "CTA 배너", status: "required" },
    ],
    cta: `이 서비스 문의하기`,
    proofElements: ["방법론", brief.hasCases ? "관련 사례" : "프로세스 시각화"].filter(Boolean),
    seoPoints: ["Service 스키마", "H1: 서비스명 + 키워드"],
    mobileRule: "서비스 상세 아코디언, 프로세스 세로",
  });

  // 산업별 페이지
  const industryCount = brief.industries ? brief.industries.split(",").filter(Boolean).length : 0;
  if (industryCount >= 2) {
    pages.push({
      name: "산업/전문분야 페이지",
      status: "권장",
      condition: `${industryCount}개 산업군 명시`,
      blocks: [
        { name: "산업 Hero", status: "required" },
        { name: "산업 과제", status: "required" },
        { name: "솔루션 매핑", status: "required" },
        { name: "관련 사례", status: brief.hasCases ? "required" : "conditional" },
        { name: "CTA 배너", status: "required" },
      ],
      cta: "[산업] 전문 상담 요청하기",
      proofElements: ["산업 경험", "관련 사례"],
      seoPoints: ["H1: 산업명 + 컨설팅"],
      mobileRule: "과제-솔루션 매핑 카드 리스트",
    });
  }

  // 케이스 스터디
  if (brief.hasCases) {
    pages.push({
      name: "케이스 스터디 목록",
      status: "권장",
      blocks: [
        { name: "페이지 Hero", status: "required" },
        { name: "필터/카테고리", status: "required" },
        { name: "사례 카드 그리드", status: "required" },
        { name: "CTA 배너", status: "required" },
      ],
      cta: "우리 산업에 맞는 사례 상담하기",
      proofElements: ["사례 데이터"],
      seoPoints: ["사례별 구조화 URL"],
      mobileRule: "카드 1컬럼, 필터 드롭다운",
    });
    pages.push({
      name: "케이스 스터디 상세",
      status: "권장",
      blocks: [
        { name: "프로젝트 Hero", status: "required" },
        { name: "과제 (Challenge)", status: "required" },
        { name: "접근 (Approach)", status: "required" },
        { name: "성과 (Result)", status: "required" },
        { name: "추천사", status: brief.hasTestimonials ? "optional" : "prohibited" },
        { name: "CTA 배너", status: "required" },
      ],
      cta: "유사 프로젝트 문의하기",
      proofElements: ["성과 수치"],
      seoPoints: ["Article 스키마", "BreadcrumbList"],
      mobileRule: "요약 테이블 수직 배치",
    });
  }

  // 인사이트
  if (brief.hasInsights) {
    pages.push({
      name: "인사이트/블로그",
      status: "권장",
      blocks: [
        { name: "페이지 Hero", status: "required" },
        { name: "카테고리 필터", status: "required" },
        { name: "아티클 카드 그리드", status: "required" },
      ],
      cta: "전문가 인사이트 구독하기",
      proofElements: ["저자 전문가 프로필"],
      seoPoints: ["Article 스키마", "카테고리별 URL"],
      mobileRule: "카드 1컬럼",
    });
  }

  // 팀/전문가
  if (brief.hasExpertProfiles) {
    pages.push({
      name: "팀/전문가 소개",
      status: "권장",
      blocks: [
        { name: "페이지 Hero", status: "required" },
        { name: "전문가 카드 그리드", status: "required" },
      ],
      cta: "전문가와 상담하기",
      proofElements: ["전문가 프로필"],
      seoPoints: ["Person 스키마 고려"],
      mobileRule: "2컬럼 카드",
    });
  }

  // 문의
  pages.push({
    name: "문의/상담 신청",
    status: "필수",
    blocks: [
      { name: "페이지 Hero", status: "required", note: "응답 시간 약속 포함" },
      { name: "문의 폼", status: "required", note: "4~6 필드" },
      { name: "연락 정보", status: "required" },
      { name: "신뢰 요소", status: "required" },
    ],
    cta: "문의 보내기",
    proofElements: brief.hasClientLogos ? ["고객사 로고", "보안 안내"] : ["응답 시간 약속", "보안 안내"],
    seoPoints: ["ContactPoint 스키마"],
    mobileRule: "폼 풀 폭",
  });

  // 리포트 랜딩
  if (brief.hasDownloads) {
    pages.push({
      name: "리포트/다운로드 랜딩",
      status: "조건부",
      condition: "다운로드 리소스 보유",
      blocks: [
        { name: "Hero", status: "required" },
        { name: "목차/하이라이트", status: "required" },
        { name: "다운로드 폼", status: "required" },
      ],
      cta: "무료 리포트 다운로드",
      proofElements: ["저자 전문성"],
      seoPoints: ["리포트 키워드 H1"],
      mobileRule: "폼 풀 폭",
    });
  }

  // 웨비나
  if (brief.hasWebinars) {
    pages.push({
      name: "웨비나/세미나",
      status: "조건부",
      condition: "세미나/웨비나 운영",
      blocks: [
        { name: "Hero", status: "required" },
        { name: "연사 소개", status: "required" },
        { name: "참가 등록 폼", status: "required" },
      ],
      cta: "참가 신청하기",
      proofElements: ["연사 프로필"],
      seoPoints: ["Event 스키마"],
      mobileRule: "폼 풀 폭",
    });
  }

  return pages;
}

// ─── Prompt Generator ───

export function generateLovablePrompt(brief: BriefData, analysis: BriefAnalysis, blueprints: PageBlueprint[]): string {
  const pageList = blueprints.map((p) => p.name).join(", ");
  const proofList = analysis.proofSummary.filter((p) => p.status === "보유").map((p) => p.label).join(", ");
  const missingProof = analysis.proofSummary.filter((p) => p.status === "부족").map((p) => p.label).join(", ");

  return `# ${brief.companyName || "[회사명]"} 공개용 컨설팅 홈페이지 생성 프롬프트

## 기본 정보
- 회사명: ${brief.companyName || "[회사명]"}
- 컨설팅 유형: ${brief.consultingType || "[유형]"}
- 핵심 서비스: ${brief.coreServices || "[서비스]"}
- 타겟 고객: ${brief.targetClients || "[타겟]"}
- 산업군: ${brief.industries || "[산업군]"}
- 브랜드 톤: ${brief.brandTone || "Corporate"}

## 사이트 유형: ${analysis.siteType}
${analysis.siteTypeReason}

## 추천 규모: ${analysis.scaleRecommendation} 구조

## 페이지 구성
${pageList}

## 핵심 CTA
"${analysis.recommendedCta}"

## 히어로 구조
${analysis.recommendedHero}

## 보유 증거 자산
${proofList || "없음"}

## 부족한 증거 자산 (대체 전략 필요)
${missingProof || "없음"}

## 금지 표현
${brief.prohibitedExpressions || "업계 최고, 유일, 1위, 압도적"}

## 검토 필요한 주장
${brief.claimsToReview || "없음"}

## 기술 스택
React + TypeScript + Tailwind CSS + shadcn/ui

## 디자인 방향
- 컨설팅 업종에 적합한 차분하고 프리미엄한 B2B 톤
- 정제된 비주얼, 넉넉한 여백, 체계적인 정보 구조
- 모바일 우선 반응형 설계
- 접근성 기준 WCAG AA 준수

## SEO 구조
- 모든 페이지에 고유 title, description, canonical
- Organization, Service, Article, FAQPage JSON-LD 적용
- 시맨틱 HTML (header/nav/main/footer)

위 정보를 기반으로 ${brief.companyName || "[회사명]"} 공개용 컨설팅 홈페이지를 제작해 주세요.
허위 고객사, 허위 수치, 허위 추천사, 허위 경력을 만들지 마세요.
모든 예시 데이터에는 "(예시 데이터)" 표기를 해 주세요.`;
}
