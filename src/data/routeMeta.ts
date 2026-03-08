import { industryConfig } from "./industryConfig";

export type SchemaType = "WebSite" | "WebPage" | "CollectionPage" | "FAQPage" | "Article" | "ProfilePage" | "AboutPage";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogImage?: string;
  robots?: string;
  schemaType: SchemaType;
  searchIntent?: string;
  keywords?: string[];
  navTitle: string;
  navOrder: number;
  icon: string;
  group: "guide" | "tool";
  breadcrumbLabel: string;
}

const OG_IMAGE = "/og-image.png";

export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    path: "/",
    title: `${industryConfig.tagline} | 내부 기준서`,
    description: `${industryConfig.name} 업종 홈페이지를 빠르게 제작하기 위한 디자인·UI·UX·콘텐츠·SEO 통합 가이드 사이트.`,
    ogTitle: industryConfig.tagline,
    ogDescription: `${industryConfig.name} 업종 홈페이지 제작을 위한 내부 실무 기준서.`,
    ogType: "website",
    ogImage: OG_IMAGE,
    robots: "index, follow",
    schemaType: "WebSite",
    searchIntent: "내부용 대시보드 — 전체 가이드 탐색 진입점",
    keywords: ["컨설팅", "웹사이트", "제작 가이드", "B2B"],
    navTitle: "Overview",
    navOrder: 0,
    icon: "LayoutDashboard",
    group: "guide",
    breadcrumbLabel: "홈",
  },
  "/industry-overview": {
    path: "/industry-overview",
    title: `${industryConfig.name} 업종 특성 분석 | ${industryConfig.tagline}`,
    description: `${industryConfig.name} 업종 홈페이지가 일반 서비스업과 어떻게 다른지, 방문자 심리와 전환 구조를 분석합니다.`,
    ogTitle: `${industryConfig.name} 업종 특성 분석`,
    ogDescription: `${industryConfig.name} 사이트 방문자 심리, 신뢰 형성 요소, 전환 흐름 가이드.`,
    ogType: "article",
    ogImage: OG_IMAGE,
    robots: "index, follow",
    schemaType: "Article",
    searchIntent: "업종 이해 — 의사결정자 심리와 차별 요소 파악",
    keywords: ["컨설팅", "업종 분석", "B2B 방문자 심리"],
    navTitle: "Industry",
    navOrder: 1,
    icon: "Building2",
    group: "guide",
    breadcrumbLabel: "업종 특성",
  },
  "/design-guide": {
    path: "/design-guide",
    title: `디자인 가이드 | ${industryConfig.tagline}`,
    description: `${industryConfig.name} 업종에 적합한 브랜드 톤, 컬러, 타이포그래피, 이미지 스타일, 레이아웃 원칙을 정의합니다.`,
    ogTitle: `${industryConfig.name} 디자인 가이드`,
    ogDescription: "컬러 시스템, 타이포그래피, 간격, 이미지 스타일 등 디자인 토큰 정의.",
    ogType: "article",
    ogImage: OG_IMAGE,
    robots: "index, follow",
    schemaType: "Article",
    searchIntent: "디자인 실행 — 컬러, 타이포, 간격, 이미지 스타일 적용",
    keywords: ["디자인 시스템", "B2B 컬러", "타이포그래피"],
    navTitle: "Design Guide",
    navOrder: 2,
    icon: "Palette",
    group: "guide",
    breadcrumbLabel: "디자인",
  },
  "/ui-guide": {
    path: "/ui-guide",
    title: `UI 가이드 | ${industryConfig.tagline}`,
    description: `${industryConfig.name} 사이트 핵심 UI 컴포넌트의 사용 목적, 배치 기준, 접근성 규칙을 정리합니다.`,
    ogTitle: `${industryConfig.name} UI 가이드`,
    ogDescription: "헤더, 히어로, 카드, CTA, 폼 등 UI 컴포넌트 가이드.",
    ogType: "article",
    ogImage: OG_IMAGE,
    robots: "index, follow",
    schemaType: "Article",
    searchIntent: "UI 구현 — 컴포넌트별 배치, 접근성, 반응형 기준",
    keywords: ["UI 컴포넌트", "접근성", "CTA"],
    navTitle: "UI Guide",
    navOrder: 3,
    icon: "Component",
    group: "guide",
    breadcrumbLabel: "UI",
  },
  "/ux-guide": {
    path: "/ux-guide",
    title: `UX 가이드 | ${industryConfig.tagline}`,
    description: `${industryConfig.name} 사이트 방문자의 사용자 여정, CTA 배치, 신뢰 요소 위치, 전환 최적화 전략을 정리합니다.`,
    ogTitle: `${industryConfig.name} UX 가이드`,
    ogDescription: "사용자 여정, 전환 최적화, 폼 전략, 모바일 UX 가이드.",
    ogType: "article",
    ogImage: OG_IMAGE,
    robots: "index, follow",
    schemaType: "Article",
    searchIntent: "UX 설계 — 여정 맵, CTA 배치, 전환 최적화, 모바일 UX",
    keywords: ["UX 전략", "전환 최적화", "사용자 여정"],
    navTitle: "UX Guide",
    navOrder: 4,
    icon: "Users",
    group: "guide",
    breadcrumbLabel: "UX",
  },
  "/page-templates": {
    path: "/page-templates",
    title: `페이지 템플릿 | ${industryConfig.tagline}`,
    description: "실제 고객사 사이트에 바로 적용 가능한 페이지별 구조 템플릿. 필수/선택/조건부 블록 시스템.",
    ogTitle: "페이지 템플릿",
    ogDescription: "홈, 서비스, 사례, 인사이트, 문의 등 페이지 블록 시스템.",
    ogType: "article",
    ogImage: OG_IMAGE,
    robots: "index, follow",
    schemaType: "CollectionPage",
    keywords: ["페이지 구조", "블록 시스템", "템플릿"],
    navTitle: "Page Templates",
    navOrder: 5,
    icon: "FileText",
    group: "guide",
    breadcrumbLabel: "페이지 템플릿",
  },
  "/content-guide": {
    path: "/content-guide",
    title: `콘텐츠 가이드 | ${industryConfig.tagline}`,
    description: `${industryConfig.name} 업종에서 신뢰를 높이는 카피라이팅 원칙, 문장 공식, 템플릿, CTA 문구를 정리합니다.`,
    ogTitle: `${industryConfig.name} 콘텐츠 가이드`,
    ogDescription: "증거 기반 카피라이팅, 문장 공식, CTA 라이브러리.",
    ogType: "article",
    ogImage: OG_IMAGE,
    robots: "index, follow",
    schemaType: "Article",
    keywords: ["카피라이팅", "CTA", "B2B 콘텐츠"],
    navTitle: "Content Guide",
    navOrder: 6,
    icon: "PenTool",
    group: "guide",
    breadcrumbLabel: "콘텐츠",
  },
  "/seo-geo": {
    path: "/seo-geo",
    title: `SEO · GEO 가이드 | ${industryConfig.tagline}`,
    description: "검색 엔진 최적화와 AI 검색 최적화를 위한 메타 태그, URL 구조, 구조화 데이터, 콘텐츠 전략.",
    ogTitle: "SEO · GEO 가이드",
    ogDescription: "메타 태그, JSON-LD, sitemap, AI 검색 최적화 전략.",
    ogType: "article",
    ogImage: OG_IMAGE,
    robots: "index, follow",
    schemaType: "Article",
    searchIntent: "SEO/GEO 실행 가이드 — 메타, 구조화 데이터, AI 검색 최적화",
    keywords: ["SEO", "GEO", "JSON-LD", "구조화 데이터"],
    navTitle: "SEO / GEO",
    navOrder: 7,
    icon: "Search",
    group: "guide",
    breadcrumbLabel: "SEO/GEO",
  },
  "/checklist": {
    path: "/checklist",
    title: `실무 체크리스트 | ${industryConfig.tagline}`,
    description: `${industryConfig.name} 업종 홈페이지 제작 단계별 검수 항목. 디자인, UI, UX, SEO, 런칭 전 체크리스트.`,
    ogTitle: "실무 체크리스트",
    ogDescription: "제작 전·디자인·UI·UX·모바일·SEO·런칭 전 체크리스트.",
    ogType: "article",
    ogImage: OG_IMAGE,
    robots: "index, follow",
    schemaType: "WebPage",
    searchIntent: "제작 검수 — 단계별 체크 항목 확인",
    keywords: ["체크리스트", "QA", "런칭"],
    navTitle: "Checklist",
    navOrder: 8,
    icon: "CheckSquare",
    group: "guide",
    breadcrumbLabel: "체크리스트",
  },
  "/client-brief": {
    path: "/client-brief",
    title: `고객사 브리프 | ${industryConfig.tagline}`,
    description: "컨설팅 고객사의 정보를 체계적으로 수집·정리하여 사이트 제작 청사진의 기초 데이터를 구성합니다.",
    ogTitle: "고객사 브리프",
    ogDescription: "고객사 정보 수집 도구 — 서비스, 타겟, 자산, 브랜드 톤 정리.",
    ogType: "website",
    ogImage: OG_IMAGE,
    robots: "noindex, follow",
    schemaType: "WebPage",
    searchIntent: "브리프 입력 — 고객사 정보 수집 시작점",
    keywords: ["브리프", "고객 정보", "입력 도구"],
    navTitle: "Client Brief",
    navOrder: 9,
    icon: "ClipboardList",
    group: "tool",
    breadcrumbLabel: "브리프",
  },
  "/site-blueprint": {
    path: "/site-blueprint",
    title: `사이트 청사진 | ${industryConfig.tagline}`,
    description: "고객사 브리프를 기반으로 공개용 컨설팅 사이트의 추천 구조, 페이지, 섹션, CTA를 도출합니다.",
    ogTitle: "사이트 청사진",
    ogDescription: "브리프 기반 사이트 구조 생성 — 유형 판별, 페이지, 섹션 도출.",
    ogType: "website",
    ogImage: OG_IMAGE,
    robots: "noindex, follow",
    schemaType: "WebPage",
    searchIntent: "청사진 생성 — 브리프 기반 공개용 사이트 구조 출력",
    keywords: ["사이트 구조", "청사진", "페이지 설계"],
    navTitle: "Site Blueprint",
    navOrder: 10,
    icon: "Map",
    group: "tool",
    breadcrumbLabel: "청사진",
  },
  "/implementation-rules": {
    path: "/implementation-rules",
    title: `구현 규칙 | ${industryConfig.tagline}`,
    description: "디자이너·기획자·개발자가 실제 제작 시 바로 적용할 수 있는 조건부 구현 규칙 문서.",
    ogTitle: "구현 규칙",
    ogDescription: "조건별 템플릿 선택, CTA 우선순위, 자산 부족 시 대체 구조.",
    ogType: "website",
    ogImage: OG_IMAGE,
    robots: "noindex, follow",
    schemaType: "WebPage",
    searchIntent: "구현 규칙 — 브리프 기반 조건부 제작 지침 도출",
    keywords: ["구현 규칙", "조건부 블록", "제작 지침"],
    navTitle: "Impl Rules",
    navOrder: 11,
    icon: "Settings",
    group: "tool",
    breadcrumbLabel: "구현 규칙",
  },
  "/proof-system": {
    path: "/proof-system",
    title: `신뢰 증거 체계 | ${industryConfig.tagline}`,
    description: `${industryConfig.name} 업종 특유의 신뢰 증거 우선순위, 배치 규칙, 부족 시 대체 전략을 구조화합니다.`,
    ogTitle: "신뢰 증거 체계",
    ogDescription: "신뢰 요소 우선순위, 페이지별 배치, 자산 부족 시 대체안.",
    ogType: "website",
    ogImage: OG_IMAGE,
    robots: "noindex, follow",
    schemaType: "WebPage",
    searchIntent: "신뢰 체계 — 증거 자산 우선순위와 배치 규칙",
    keywords: ["신뢰 증거", "proof", "대체 전략"],
    navTitle: "Proof System",
    navOrder: 12,
    icon: "ShieldCheck",
    group: "tool",
    breadcrumbLabel: "증거 체계",
  },
};

// Fallback meta for 404 and unknown routes
export const fallbackMeta: RouteMeta = {
  path: "/404",
  title: `페이지를 찾을 수 없습니다 | ${industryConfig.tagline}`,
  description: "요청하신 페이지가 존재하지 않습니다.",
  ogTitle: "페이지를 찾을 수 없습니다",
  ogDescription: "요청하신 페이지가 존재하지 않거나 이동되었습니다.",
  ogType: "website",
  ogImage: OG_IMAGE,
  robots: "noindex, nofollow",
  schemaType: "WebPage",
  navTitle: "404",
  navOrder: 99,
  icon: "AlertTriangle",
  group: "guide",
  breadcrumbLabel: "404",
};

export const getRouteMeta = (path: string): RouteMeta => routeMeta[path] || fallbackMeta;

export const getCanonicalUrl = (path: string): string =>
  `${industryConfig.siteUrl}${path === "/" ? "" : path}`;

export const getSortedRoutes = () =>
  Object.values(routeMeta).sort((a, b) => a.navOrder - b.navOrder);

export const getRoutesByGroup = (group: "guide" | "tool") =>
  getSortedRoutes().filter((r) => r.group === group);

export const getAdjacentRoutes = (path: string) => {
  const sorted = getSortedRoutes();
  const idx = sorted.findIndex((r) => r.path === path);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
};

export const getBreadcrumbs = (path: string) => {
  const meta = getRouteMeta(path);
  const crumbs = [{ label: "홈", path: "/" }];
  if (path !== "/") {
    crumbs.push({ label: meta.breadcrumbLabel, path });
  }
  return crumbs;
};
