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

/** Normalize brief data: ensure all fields exist with correct types */
export function normalizeBrief(raw: Record<string, unknown>): BriefData {
  const result = { ...emptyBrief };
  for (const key of Object.keys(emptyBrief) as (keyof BriefData)[]) {
    const val = raw[key];
    const expected = emptyBrief[key];
    if (val === undefined || val === null) {
      // Keep empty default
    } else if (typeof expected === "string" && typeof val === "string") {
      (result as Record<string, unknown>)[key] = val;
    } else if (typeof expected === "boolean" || expected === null) {
      if (typeof val === "boolean") (result as Record<string, unknown>)[key] = val;
    } else if (Array.isArray(expected) && Array.isArray(val)) {
      (result as Record<string, unknown>)[key] = val.filter((v: unknown) => typeof v === "string");
    } else if (typeof expected === "number" && typeof val === "number") {
      (result as Record<string, unknown>)[key] = val;
    }
  }
  result._schemaVersion = BRIEF_SCHEMA_VERSION;
  return result;
}

export interface LoadBriefResult {
  data: BriefData;
  migrated: boolean;
  migrationReason?: string;
}

export function loadBrief(): BriefData {
  return loadBriefWithStatus().data;
}

export function loadBriefWithStatus(): LoadBriefResult {
  try {
    const raw = localStorage.getItem(BRIEF_STORAGE_KEY);
    if (!raw) return { data: { ...emptyBrief }, migrated: false };
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || !parsed) {
      return { data: { ...emptyBrief }, migrated: true, migrationReason: "invalid_data" };
    }
    if (parsed._schemaVersion !== BRIEF_SCHEMA_VERSION) {
      // Attempt migration by normalizing
      const normalized = normalizeBrief(parsed);
      return { data: normalized, migrated: true, migrationReason: `schema_v${parsed._schemaVersion || "unknown"}_to_v${BRIEF_SCHEMA_VERSION}` };
    }
    return { data: normalizeBrief(parsed), migrated: false };
  } catch {
    return { data: { ...emptyBrief }, migrated: true, migrationReason: "parse_error" };
  }
}

export interface SaveResult {
  success: boolean;
  timestamp?: string;
  error?: string;
}

export function saveBrief(data: BriefData): SaveResult {
  try {
    const ts = new Date().toISOString();
    const toSave = { ...data, _schemaVersion: BRIEF_SCHEMA_VERSION, _lastSaved: ts };
    localStorage.setItem(BRIEF_STORAGE_KEY, JSON.stringify(toSave));
    return { success: true, timestamp: ts };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "unknown" };
  }
}

export function exportBriefJson(data: BriefData): string {
  return JSON.stringify({ ...data, _schemaVersion: BRIEF_SCHEMA_VERSION }, null, 2);
}

export interface ImportResult {
  success: boolean;
  data?: BriefData;
  error?: "invalid_json" | "invalid_shape" | "invalid_version" | "empty_data";
  warning?: string;
}

export function importBriefJson(json: string): ImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { success: false, error: "invalid_json" };
  }
  if (typeof parsed !== "object" || !parsed || Array.isArray(parsed)) {
    return { success: false, error: "invalid_shape" };
  }
  const obj = parsed as Record<string, unknown>;
  let warning: string | undefined;

  // Version check: warn but still import
  if (obj._schemaVersion && obj._schemaVersion !== BRIEF_SCHEMA_VERSION) {
    warning = `스키마 버전이 다릅니다 (v${obj._schemaVersion} → v${BRIEF_SCHEMA_VERSION}). 자동 변환되었습니다.`;
  }
  const normalized = normalizeBrief(obj);
  // Check if at least one meaningful field is filled
  if (!normalized.companyName && !normalized.consultingType && !normalized.coreServices) {
    return { success: false, error: "empty_data" };
  }
  return { success: true, data: normalized, warning };
}

// ─── Brief Analysis Engine ───

export type SiteType = "리드 수집형" | "신뢰 증명형" | "케이스 스터디 중심형" | "전문가 중심형" | "인사이트 중심형" | "산업 특화형";

export interface ProofStatus {
  id: string;
  label: string;
  status: "보유" | "부족" | "비공개" | "미입력" | "검토 필요";
  strength: number; // 1-5
}

export interface BriefAnalysis {
  completionRate: number;
  requiredCompletionRate: number;
  missingRequired: string[];
  siteType: SiteType;
  siteTypeReason: string;
  proofScore: number;
  proofSummary: ProofStatus[];
  recommendedCta: string;
  recommendedSecondaryCta: string;
  recommendedHero: string;
  scaleRecommendation: "최소" | "표준" | "풀";
  isBoutique: boolean;
  hasIndustryFocus: boolean;
  industryCount: number;
  hasContentStrategy: boolean;
  hasDownloadStrategy: boolean;
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

const PROOF_STRENGTH: Record<string, number> = {
  "case-study": 5, "metrics": 5, "client-logos": 4, "expert-profile": 4,
  "insights": 3, "testimonial": 3, "downloads": 2, "webinars": 2,
};

export function analyzeBrief(brief: BriefData): BriefAnalysis {
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
  const proofSummary: ProofStatus[] = proofFields.map((pf) => {
    const val = brief[pf.key];
    let status: ProofStatus["status"] = "미입력";
    if (val === true) status = "보유";
    else if (val === false) status = "부족";
    return { id: pf.id, label: pf.label, status, strength: PROOF_STRENGTH[pf.id] || 1 };
  });
  const proofScore = proofSummary.filter((p) => p.status === "보유").length;

  // Derived flags
  const industryCount = brief.industries ? brief.industries.split(",").filter((s) => s.trim()).length : 0;
  const hasIndustryFocus = industryCount >= 2;
  const isBoutique = brief.projectScale === "소규모 (1~3개월)" || (brief.hasExpertProfiles === true && !hasIndustryFocus);
  const hasContentStrategy = brief.hasInsights === true;
  const hasDownloadStrategy = brief.hasDownloads === true;

  // Site type
  let siteType: SiteType = "리드 수집형";
  let siteTypeReason = "기본: 인바운드 리드 수집 중심 사이트";
  if (brief.hasCases && brief.hasMetrics) {
    siteType = "케이스 스터디 중심형";
    siteTypeReason = "사례 + 성과 수치 보유 → 사례 중심으로 신뢰 구축";
  } else if (brief.hasExpertProfiles && isBoutique) {
    siteType = "전문가 중심형";
    siteTypeReason = "전문가 프로필 보유 + 부티크 모델 → 전문가 중심 사이트";
  } else if (brief.hasInsights && brief.hasDownloads) {
    siteType = "인사이트 중심형";
    siteTypeReason = "인사이트 + 다운로드 리소스 → 콘텐츠 마케팅 중심";
  } else if (hasIndustryFocus) {
    siteType = "산업 특화형";
    siteTypeReason = `${industryCount}개 산업군 명시 → 산업별 랜딩 페이지 권장`;
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

  const secondaryCtaMap: Record<string, string> = {
    "상담 문의": "서비스 자세히 보기",
    "프로젝트 문의": "성공 사례 보기",
    "무료 진단 신청": "진단 프로세스 보기",
    "리포트 다운로드": "인사이트 더 보기",
    "세미나 참가": "세미나 일정 보기",
    "전화 상담": "서비스 자세히 보기",
  };
  const recommendedSecondaryCta = secondaryCtaMap[brief.primaryCta] || "서비스 자세히 보기";

  // Hero
  let recommendedHero = `[타겟]을 위한 [핵심 서비스] — [차별화]`;
  if (brief.hasMetrics) recommendedHero = `[성과 수치]를 만드는 [서비스명]`;
  else if (brief.industries) recommendedHero = `[산업] 전문 [서비스] 컨설팅`;

  // Scale
  let scaleRecommendation: "최소" | "표준" | "풀" = "표준";
  if (proofScore >= 6 && brief.hasInsights) scaleRecommendation = "풀";
  else if (proofScore <= 2) scaleRecommendation = "최소";

  return {
    completionRate, requiredCompletionRate, missingRequired,
    siteType, siteTypeReason, proofScore, proofSummary,
    recommendedCta, recommendedSecondaryCta, recommendedHero, scaleRecommendation,
    isBoutique, hasIndustryFocus, industryCount,
    hasContentStrategy, hasDownloadStrategy,
  };
}

// ─── Blueprint Generation Engine ───

export interface BlockDef {
  name: string;
  status: "required" | "optional" | "conditional" | "prohibited";
  note?: string;
}

export interface PageBlueprint {
  name: string;
  status: "필수" | "권장" | "조건부" | "제거 가능";
  condition?: string;
  blocks: BlockDef[];
  cta: string;
  secondaryCta?: string;
  proofElements: string[];
  seoPoints: string[];
  mobileRule: string;
  assetFallbacks?: string[];
  subtypeNotes?: string;
  reviewClaims?: string[];
}

export function generateBlueprints(brief: BriefData, analysis: BriefAnalysis): PageBlueprint[] {
  const pages: PageBlueprint[] = [];
  const proofOwned = analysis.proofSummary.filter((p) => p.status === "보유").map((p) => p.label);
  const proofMissing = analysis.proofSummary.filter((p) => p.status === "부족").map((p) => p.label);

  // ═══ 홈페이지 ═══
  pages.push({
    name: "홈페이지",
    status: "필수",
    blocks: [
      { name: "Hero", status: "required", note: analysis.recommendedHero },
      { name: "Trust Strip", status: brief.hasClientLogos ? "required" : "conditional", note: brief.hasClientLogos ? "고객사 로고" : "산업군 기반 텍스트 대체" },
      { name: "서비스 개요", status: "required", note: "핵심 서비스 3~6개 카드" },
      { name: "프로세스/방법론", status: "required", note: "4~6단계 타임라인" },
      { name: "성과 수치", status: brief.hasMetrics ? "required" : "optional", note: !brief.hasMetrics ? "정성적 표현으로 대체: 'N년 이상 경험'" : "핵심 KPI 3~4개" },
      { name: "케이스 스터디 하이라이트", status: brief.hasCases ? "required" : "conditional", note: !brief.hasCases ? "프로세스 블록으로 대체" : "대표 사례 2~3건" },
      { name: "전문가 소개", status: brief.hasExpertProfiles ? "optional" : "conditional", note: "핵심 인력 3~5명" },
      { name: "추천사", status: brief.hasTestimonials ? "optional" : "prohibited", note: !brief.hasTestimonials ? "허위 추천사 금지" : "실명 기반" },
      { name: "인사이트 미리보기", status: brief.hasInsights ? "optional" : "prohibited" },
      { name: "FAQ", status: "optional", note: "5~8개 항목" },
      { name: "CTA 배너", status: "required" },
      { name: "Footer", status: "required" },
      { name: "팝업/배너 프로모션", status: "prohibited" },
      { name: "자동재생 비디오", status: "prohibited" },
    ],
    cta: analysis.recommendedCta,
    secondaryCta: analysis.recommendedSecondaryCta,
    proofElements: proofOwned,
    seoPoints: ["H1: 핵심 서비스 키워드", "Organization JSON-LD", "FAQ 있으면 FAQPage 스키마", "og:type = website"],
    mobileRule: "서비스 카드 1컬럼, 성과 수치 2x2 그리드, Trust Strip 가로 스크롤",
    assetFallbacks: proofMissing.map((p) => `${p} 부족 → 대체 전략 필요`),
    subtypeNotes: analysis.isBoutique ? "부티크: 전문가 섹션 강조, 서비스 통합" : brief.consultingType ? `${brief.consultingType}: 해당 분야 강조` : undefined,
    reviewClaims: brief.claimsToReview ? [brief.claimsToReview] : [],
  });

  // ═══ 서비스 페이지 ═══
  pages.push({
    name: "서비스 소개",
    status: "필수",
    blocks: [
      { name: "서비스 Hero", status: "required", note: "서비스명 + 타겟 문제 정의" },
      { name: "문제 정의", status: "required", note: "타겟 고객이 겪는 과제" },
      { name: "서비스 상세", status: "required", note: "서비스별 상세 설명" },
      { name: "프로세스", status: "required", note: "서비스 수행 단계" },
      { name: "관련 사례", status: brief.hasCases ? "required" : "conditional", note: !brief.hasCases ? "서비스별 예상 효과로 대체" : "2~3건" },
      { name: "비교 테이블", status: "optional", note: "서비스 티어 또는 경쟁 비교" },
      { name: "CTA 배너", status: "required" },
      { name: "관련 인사이트", status: brief.hasInsights ? "optional" : "prohibited" },
    ],
    cta: "이 서비스 문의하기",
    secondaryCta: "관련 사례 보기",
    proofElements: ["방법론", brief.hasCases ? "관련 사례" : "프로세스 시각화"].filter(Boolean),
    seoPoints: ["Service 스키마", "H1: 서비스명 + 키워드", "BreadcrumbList"],
    mobileRule: "서비스 상세 아코디언, 프로세스 세로 타임라인",
    assetFallbacks: !brief.hasCases ? ["사례 없음 → 서비스 프로세스 시각화로 대체"] : [],
  });

  // ═══ 산업별 페이지 ═══
  if (analysis.hasIndustryFocus) {
    pages.push({
      name: "산업/전문분야 페이지",
      status: "권장",
      condition: `${analysis.industryCount}개 산업군 명시`,
      blocks: [
        { name: "산업 Hero", status: "required", note: "[산업] 전문 컨설팅" },
        { name: "산업 과제", status: "required", note: "해당 산업 고유 과제 3~5개" },
        { name: "솔루션 매핑", status: "required", note: "과제별 서비스 매핑" },
        { name: "관련 사례", status: brief.hasCases ? "required" : "conditional" },
        { name: "성과 수치", status: brief.hasMetrics ? "optional" : "prohibited" },
        { name: "CTA 배너", status: "required" },
      ],
      cta: "[산업] 전문 상담 요청하기",
      proofElements: ["산업 경험", "관련 사례"],
      seoPoints: ["H1: 산업명 + 컨설팅", "BreadcrumbList", "SEO 랜딩: 산업+서비스 조합"],
      mobileRule: "과제-솔루션 매핑 카드 리스트, 수치 2컬럼",
    });
  }

  // ═══ 케이스 스터디 목록 ═══
  if (brief.hasCases) {
    pages.push({
      name: "케이스 스터디 목록",
      status: "권장",
      blocks: [
        { name: "페이지 Hero", status: "required" },
        { name: "필터/카테고리", status: "required", note: "산업, 서비스, 규모별" },
        { name: "사례 카드 그리드", status: "required", note: "과제-성과 요약" },
        { name: "CTA 배너", status: "required" },
      ],
      cta: "우리 산업에 맞는 사례 상담하기",
      proofElements: ["사례 데이터"],
      seoPoints: ["CollectionPage 스키마", "사례별 구조화 URL"],
      mobileRule: "카드 1컬럼, 필터 드롭다운",
    });

    // ═══ 케이스 스터디 상세 ═══
    pages.push({
      name: "케이스 스터디 상세",
      status: "권장",
      blocks: [
        { name: "프로젝트 Hero", status: "required", note: "산업 + 서비스 + 기간" },
        { name: "과제 (Challenge)", status: "required" },
        { name: "접근 (Approach)", status: "required", note: "방법론 적용 사례" },
        { name: "성과 (Result)", status: "required", note: brief.hasMetrics ? "수치 기반" : "정성적 성과" },
        { name: "고객사 정보", status: brief.hasClientLogos ? "optional" : "prohibited", note: !brief.hasClientLogos ? "익명 처리: 'A금융사'" : undefined },
        { name: "추천사", status: brief.hasTestimonials ? "optional" : "prohibited" },
        { name: "관련 사례 링크", status: "optional" },
        { name: "CTA 배너", status: "required" },
      ],
      cta: "유사 프로젝트 문의하기",
      proofElements: ["성과 수치", "방법론"],
      seoPoints: ["Article 스키마", "BreadcrumbList", "og:type = article"],
      mobileRule: "요약 테이블 수직 배치, 성과 수치 카드",
      assetFallbacks: !brief.hasClientLogos ? ["고객사 비공개 → 'A금융사' 형태 익명 처리"] : [],
    });
  }

  // ═══ 팀/전문가 소개 ═══
  if (brief.hasExpertProfiles) {
    pages.push({
      name: "팀/전문가 소개",
      status: "권장",
      blocks: [
        { name: "페이지 Hero", status: "required" },
        { name: "전문가 카드 그리드", status: "required", note: "사진 + 이름 + 직함 + 전문분야" },
        { name: "경력 상세", status: "optional", note: "학력, 인증, 주요 프로젝트" },
        { name: "CTA 배너", status: "required" },
      ],
      cta: "전문가와 상담하기",
      proofElements: ["전문가 프로필", "인증"],
      seoPoints: ["ProfilePage / Person 스키마 고려", "BreadcrumbList"],
      mobileRule: "2컬럼 → 1컬럼 카드",
      assetFallbacks: !brief.hasBrandAssets ? ["전문가 사진 없음 → 이니셜 아바타 + 경력 요약"] : [],
    });
  }

  // ═══ 인사이트/블로그 ═══
  if (brief.hasInsights) {
    pages.push({
      name: "인사이트/블로그",
      status: "권장",
      blocks: [
        { name: "페이지 Hero", status: "required" },
        { name: "카테고리 필터", status: "required" },
        { name: "아티클 카드 그리드", status: "required", note: "제목 + 요약 + 카테고리 + 저자" },
        { name: "추천 아티클", status: "optional" },
      ],
      cta: "전문가 인사이트 구독하기",
      secondaryCta: "문의하기",
      proofElements: ["저자 전문가 프로필"],
      seoPoints: ["Article 스키마", "카테고리별 URL", "BreadcrumbList"],
      mobileRule: "카드 1컬럼",
    });
  }

  // ═══ 문의/상담 ═══
  pages.push({
    name: "문의/상담 신청",
    status: "필수",
    blocks: [
      { name: "페이지 Hero", status: "required", note: "응답 시간 약속 포함 (예: '24시간 이내')" },
      { name: "문의 폼", status: "required", note: "4~6 필드: 이름, 이메일, 회사, 문의유형, 내용" },
      { name: "연락 정보", status: "required", note: "전화, 이메일, 주소" },
      { name: "신뢰 요소", status: "required", note: brief.hasClientLogos ? "고객사 로고 + 보안 안내" : "응답 시간 약속 + 보안 안내" },
      { name: "FAQ", status: "optional", note: "상담 프로세스 FAQ 3~5개" },
    ],
    cta: "문의 보내기",
    secondaryCta: "전화 상담 예약",
    proofElements: brief.hasClientLogos ? ["고객사 로고", "보안 안내", "응답 시간"] : ["응답 시간 약속", "보안 안내"],
    seoPoints: ["ContactPoint 스키마", "LocalBusiness 고려", "BreadcrumbList"],
    mobileRule: "폼 풀 폭, 연락 정보 카드형",
  });

  // ═══ 리포트 랜딩 ═══
  if (brief.hasDownloads) {
    pages.push({
      name: "리포트/다운로드 랜딩",
      status: "조건부",
      condition: "다운로드 리소스 보유",
      blocks: [
        { name: "Hero", status: "required", note: "리포트 제목 + 핵심 인사이트" },
        { name: "목차/하이라이트", status: "required", note: "핵심 내용 3~5개" },
        { name: "다운로드 폼", status: "required", note: "이름 + 이메일 + 회사" },
        { name: "저자 소개", status: "optional" },
      ],
      cta: "무료 리포트 다운로드",
      proofElements: ["저자 전문성"],
      seoPoints: ["리포트 키워드 H1", "BreadcrumbList"],
      mobileRule: "폼 풀 폭",
    });
  }

  // ═══ 웨비나/세미나 ═══
  if (brief.hasWebinars) {
    pages.push({
      name: "웨비나/세미나",
      status: "조건부",
      condition: "세미나/웨비나 운영",
      blocks: [
        { name: "Hero", status: "required", note: "주제 + 일시 + 연사" },
        { name: "연사 소개", status: "required" },
        { name: "세션 아젠다", status: "optional" },
        { name: "참가 등록 폼", status: "required" },
      ],
      cta: "참가 신청하기",
      proofElements: ["연사 프로필"],
      seoPoints: ["Event 스키마", "BreadcrumbList"],
      mobileRule: "폼 풀 폭",
    });
  }

  // ═══ 회사 소개 ═══
  pages.push({
    name: "회사 소개",
    status: "권장",
    blocks: [
      { name: "회사 Hero", status: "required", note: "미션/비전 한 줄" },
      { name: "핵심 가치", status: "required", note: "3~5개 가치" },
      { name: "연혁/마일스톤", status: "optional" },
      { name: "팀 소개 요약", status: brief.hasExpertProfiles ? "required" : "optional" },
      { name: "파트너십/인증", status: "optional" },
      { name: "CTA 배너", status: "required" },
    ],
    cta: "함께 일하기",
    proofElements: ["파트너십", "인증"],
    seoPoints: ["AboutPage / Organization 스키마", "BreadcrumbList"],
    mobileRule: "가치 카드 1컬럼, 연혁 세로 타임라인",
  });

  return pages;
}

// ─── Proof-aware helpers ───

export function getProofFallbacks(analysis: BriefAnalysis): { asset: string; fallback: string; active: boolean }[] {
  const fallbackMap: Record<string, string> = {
    "케이스 스터디": "프로세스/방법론 블록으로 체계적 접근 방식 증명",
    "고객사 로고": "'금융/제조/IT 산업 다수 고객사 보유' 등 산업군 기반 서술",
    "성과 수치": "'N년 이상 경험', '다수의 성공적 프로젝트 수행' 등 정성적 표현",
    "추천사": "케이스 스터디 성과 수치로 간접 증명",
    "전문가 프로필": "이니셜 아바타 + 경력 요약 텍스트",
    "인사이트/블로그": "FAQ 확장 + 서비스 설명 콘텐츠 강화",
    "다운로드 리소스": "뉴스레터 구독 또는 상담 CTA로 대체",
    "세미나/웨비나": "인사이트 콘텐츠 또는 사례 강화로 대체",
  };
  return analysis.proofSummary.map((p) => ({
    asset: p.label,
    fallback: fallbackMap[p.label] || "대체 전략 필요",
    active: p.status === "부족",
  }));
}

// ─── Prompt Generator ───

export function generateLovablePrompt(brief: BriefData, analysis: BriefAnalysis, blueprints: PageBlueprint[]): string {
  const pageList = blueprints.map((p) => `- ${p.name} (${p.status})`).join("\n");
  const proofList = analysis.proofSummary.filter((p) => p.status === "보유").map((p) => p.label).join(", ");
  const missingProof = analysis.proofSummary.filter((p) => p.status === "부족").map((p) => p.label).join(", ");
  const fallbacks = getProofFallbacks(analysis);

  const blockDetails = blueprints.map((bp) => {
    const required = bp.blocks.filter((b) => b.status === "required").map((b) => `${b.name}${b.note ? ` (${b.note})` : ""}`).join(", ");
    const optional = bp.blocks.filter((b) => b.status === "optional").map((b) => b.name).join(", ");
    const conditional = bp.blocks.filter((b) => b.status === "conditional").map((b) => `${b.name}${b.note ? ` — ${b.note}` : ""}`).join(", ");
    const prohibited = bp.blocks.filter((b) => b.status === "prohibited").map((b) => b.name).join(", ");
    return `### ${bp.name} (${bp.status})
- 필수 블록: ${required || "없음"}
- 선택 블록: ${optional || "없음"}
- 조건부 블록: ${conditional || "없음"}
- 금지 블록: ${prohibited || "없음"}
- 핵심 CTA: "${bp.cta}"${bp.secondaryCta ? `\n- 보조 CTA: "${bp.secondaryCta}"` : ""}
- 증거 요소: ${bp.proofElements.join(", ") || "없음"}
- 모바일: ${bp.mobileRule}
- SEO: ${bp.seoPoints.join(", ")}${bp.assetFallbacks && bp.assetFallbacks.length > 0 ? `\n- 자산 부족 대체: ${bp.assetFallbacks.join("; ")}` : ""}${bp.subtypeNotes ? `\n- 유형 참고: ${bp.subtypeNotes}` : ""}${bp.reviewClaims && bp.reviewClaims.length > 0 ? `\n- 검토 필요: ${bp.reviewClaims.join("; ")}` : ""}`;
  }).join("\n\n");

  return `# ${brief.companyName || "[회사명]"} 공개용 컨설팅 홈페이지 생성 프롬프트

## 기본 정보
- 회사명: ${brief.companyName || "[회사명]"}
- 컨설팅 유형: ${brief.consultingType || "[유형]"}
- 핵심 서비스: ${brief.coreServices || "[서비스]"}
- 타겟 고객: ${brief.targetClients || "[타겟]"}
- 산업군: ${brief.industries || "[산업군]"}
- 브랜드 톤: ${brief.brandTone || "Corporate"}
- 유형: ${analysis.isBoutique ? "부티크 컨설팅" : "종합 컨설팅"}

## 사이트 유형: ${analysis.siteType}
${analysis.siteTypeReason}

## 추천 규모: ${analysis.scaleRecommendation} 구조 (${blueprints.length}개 페이지)

## 핵심 CTA: "${analysis.recommendedCta}"
## 보조 CTA: "${analysis.recommendedSecondaryCta}"

## 히어로 구조
${analysis.recommendedHero}
${brief.companyName ? `예시: "${brief.targetClients?.split(",")[0]?.trim() || "[타겟]"}을 위한 ${brief.coreServices?.split(",")[0]?.trim() || "[서비스]"} — ${brief.companyName}"` : ""}

## 페이지 구성
${pageList}

## 페이지별 블록 상세
${blockDetails}

## 보유 증거 자산
${proofList || "없음"}

## 부족한 증거 자산 (대체 전략 적용)
${missingProof || "없음 — 모두 보유"}
${fallbacks.filter((f) => f.active).length > 0 ? `\n대체 전략:\n${fallbacks.filter((f) => f.active).map((f) => `- ${f.asset}: ${f.fallback}`).join("\n")}` : ""}

## 금지 표현
${brief.prohibitedExpressions || "업계 최고, 유일, 1위, 압도적"}

## 검토 필요한 주장
${brief.claimsToReview || "없음"}

## 경쟁사 차별화
${brief.competitorNotes || "별도 없음"}

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
- og:image, twitter:card 적용

위 정보를 기반으로 ${brief.companyName || "[회사명]"} 공개용 컨설팅 홈페이지를 제작해 주세요.
허위 고객사, 허위 수치, 허위 추천사, 허위 경력을 만들지 마세요.
모든 예시 데이터에는 "(예시 데이터)" 표기를 해 주세요.`;
}
