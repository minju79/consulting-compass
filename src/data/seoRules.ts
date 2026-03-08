// SEO/GEO rules and examples for consulting industry

export const metaTemplates = [
  { page: "홈", title: "[회사명] — [핵심 서비스] 전문 컨설팅", description: "[회사명]은 [타겟 산업]을 위한 [서비스]를 제공합니다. [성과 수치] (예시 데이터)", searchIntent: "브랜드 검색, 컨설팅 업체 탐색" },
  { page: "서비스 목록", title: "컨설팅 서비스 | [회사명]", description: "[핵심 서비스 3~4개] 등 전문 컨설팅 서비스를 제공합니다. 무료 초기 상담 가능.", searchIntent: "서비스 탐색, 비교 검토" },
  { page: "서비스 상세", title: "[서비스명] | [회사명]", description: "[서비스 한줄 설명]. [타겟]을 위한 맞춤형 솔루션. 무료 상담 가능.", searchIntent: "특정 서비스 정보 탐색" },
  { page: "산업별 페이지", title: "[산업명] 컨설팅 | [회사명]", description: "[산업명] 분야 [N]+년 경험. [성과 요약]. 전문 컨설턴트와 상담하세요.", searchIntent: "산업 + 컨설팅 복합 검색" },
  { page: "사례 목록", title: "프로젝트 사례 | [회사명]", description: "[산업별] 실제 프로젝트 사례와 성과를 확인하세요. [사례 수]+ 프로젝트 경험. (예시)", searchIntent: "실적 확인, 신뢰 검증" },
  { page: "사례 상세", title: "[프로젝트명] — 사례 연구 | [회사명]", description: "[산업]의 [과제]를 해결한 사례. [핵심 성과 1줄]. (예시 데이터)", searchIntent: "특정 사례 상세 확인" },
  { page: "인사이트 목록", title: "인사이트 · 리포트 | [회사명]", description: "[산업/주제] 관련 최신 인사이트와 전문 리포트를 확인하세요.", searchIntent: "전문 콘텐츠 탐색" },
  { page: "아티클 상세", title: "[아티클 제목] | [회사명] 인사이트", description: "[아티클 요약 1~2문장]. [회사명] 전문가가 작성한 인사이트.", searchIntent: "특정 주제 정보 탐색" },
  { page: "회사소개", title: "[회사명] 소개 — 미션과 전문성", description: "[회사명]의 미션, 팀, 연혁을 소개합니다. [설립년도] 이래 [프로젝트수]+ 프로젝트 수행. (예시)", searchIntent: "회사 검증, 브랜드 확인" },
  { page: "팀 소개", title: "전문가 팀 | [회사명]", description: "[회사명]의 핵심 컨설턴트를 소개합니다. [산업별] 전문가 [N]명.", searchIntent: "담당자 확인, 전문성 검증" },
  { page: "문의", title: "문의하기 | [회사명]", description: "프로젝트 문의 및 무료 상담을 신청하세요. 영업일 1일 이내 회신.", searchIntent: "연락처 탐색, 즉시 문의" },
];

export const canonicalStrategy = [
  "모든 페이지에 self-referencing canonical 설정",
  "www / non-www 중 하나를 선택하고 통일",
  "트레일링 슬래시(/) 유무를 통일",
  "HTTP → HTTPS 리다이렉트 설정",
  "파라미터가 붙은 URL은 파라미터 없는 URL을 canonical로 지정",
  "페이지네이션 시 첫 페이지를 canonical로 또는 rel=prev/next 활용",
  "동일 콘텐츠가 여러 URL에 존재하면 대표 URL 하나만 canonical",
];

export const internalLinkMap = [
  { from: "서비스 페이지", to: "관련 케이스 스터디", anchor: "'[산업명] 프로젝트 사례 보기'" },
  { from: "케이스 스터디", to: "관련 서비스 페이지", anchor: "'[서비스명] 더 알아보기'" },
  { from: "인사이트 아티클", to: "관련 서비스 + 사례", anchor: "'관련 서비스 확인하기'" },
  { from: "산업별 페이지", to: "해당 산업 사례 + 서비스", anchor: "'[산업명] 전체 사례 보기'" },
  { from: "팀 페이지", to: "각 전문가의 담당 서비스/산업", anchor: "'담당 프로젝트 보기'" },
  { from: "모든 페이지 하단", to: "문의 페이지", anchor: "'프로젝트 문의하기'" },
];

export const jsonLdExamples = [
  {
    schema: "Organization",
    usage: "모든 페이지 공통 (홈페이지 중심)",
    code: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[회사명]",
  "url": "https://[도메인]",
  "logo": "https://[도메인]/logo.png",
  "description": "[회사 소개 1~2문장]",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+82-2-XXXX-XXXX",
    "contactType": "customer service",
    "availableLanguage": ["Korean", "English"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/[회사명]",
    "https://blog.naver.com/[회사명]"
  ]
}`,
  },
  {
    schema: "Service",
    usage: "서비스 상세 페이지",
    code: `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[서비스명]",
  "description": "[서비스 설명]",
  "provider": {
    "@type": "Organization",
    "name": "[회사명]"
  },
  "areaServed": {
    "@type": "Country",
    "name": "South Korea"
  },
  "serviceType": "[서비스 유형]"
}`,
  },
  {
    schema: "Article / BlogPosting",
    usage: "인사이트/블로그 아티클",
    code: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[아티클 제목]",
  "author": {
    "@type": "Person",
    "name": "[작성자명]",
    "jobTitle": "[직책]"
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-20",
  "description": "[요약]",
  "image": "https://[도메인]/images/article-og.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "[회사명]"
  }
}`,
  },
  {
    schema: "FAQPage",
    usage: "FAQ 섹션이 있는 모든 페이지",
    code: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "컨설팅 비용은 어떻게 책정되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "프로젝트 범위, 기간, 투입 인력에 따라 달라집니다. 초기 상담에서 맞춤 견적을 제공합니다."
      }
    }
  ]
}`,
  },
  {
    schema: "BreadcrumbList",
    usage: "2단계 이상 깊이의 모든 페이지",
    code: `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://[도메인]/" },
    { "@type": "ListItem", "position": 2, "name": "서비스", "item": "https://[도메인]/services" },
    { "@type": "ListItem", "position": 3, "name": "[서비스명]", "item": "https://[도메인]/services/[slug]" }
  ]
}`,
  },
  {
    schema: "WebSite",
    usage: "홈페이지 (사이트 검색 기능 포함 시)",
    code: `{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "[회사명]",
  "url": "https://[도메인]",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://[도메인]/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}`,
  },
];

export const landingPageRules = [
  { pattern: "산업 + 서비스", example: "/services/finance-digital-transformation", keyword: "금융 디지털 전환 컨설팅" },
  { pattern: "문제 + 솔루션", example: "/solutions/cost-reduction-strategy", keyword: "비용 절감 전략 컨설팅" },
  { pattern: "지역 + 컨설팅", example: "/seoul-strategy-consulting", keyword: "서울 전략 컨설팅" },
  { pattern: "역할 + 과제", example: "/for-cfo/financial-planning", keyword: "CFO 재무 전략" },
  { pattern: "인사이트 허브", example: "/insights/digital-transformation", keyword: "디지털 전환 트렌드" },
];

export const sitemapStructure = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 홈 -->
  <url>
    <loc>https://[도메인]/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- 서비스 -->
  <url>
    <loc>https://[도메인]/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://[도메인]/services/[서비스-slug]</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- 사례 -->
  <url>
    <loc>https://[도메인]/case-studies</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- 인사이트 -->
  <url>
    <loc>https://[도메인]/insights</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- 팀 -->
  <url>
    <loc>https://[도메인]/team</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <!-- 문의 -->
  <url>
    <loc>https://[도메인]/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

export const robotsTxtExample = `User-agent: *
Allow: /

# 내부/관리 페이지 차단
Disallow: /admin/
Disallow: /api/
Disallow: /draft/
Disallow: /preview/

# 검색 파라미터 페이지 차단 (크롤링 예산 절약)
Disallow: /*?sort=
Disallow: /*?filter=

# Sitemap 경로
Sitemap: https://[도메인]/sitemap.xml`;

export const ogTwitterExample = `<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="[회사명]" />
<meta property="og:title" content="[페이지 제목] | [회사명]" />
<meta property="og:description" content="[페이지 설명 160자 이내]" />
<meta property="og:image" content="https://[도메인]/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://[도메인]/[경로]" />
<meta property="og:locale" content="ko_KR" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[페이지 제목]" />
<meta name="twitter:description" content="[페이지 설명]" />
<meta name="twitter:image" content="https://[도메인]/og-image.jpg" />`;

export const headingStructureExample = [
  { tag: "H1", text: "[회사명] — [핵심 가치 제안]", rule: "페이지당 1개, 핵심 키워드 포함" },
  { tag: "H2", text: "서비스 영역", rule: "주요 섹션 제목, 3~8개" },
  { tag: "H3", text: "디지털 전환 컨설팅", rule: "H2 하위 항목" },
  { tag: "H2", text: "프로젝트 사례", rule: "다음 주요 섹션" },
  { tag: "H3", text: "[산업명] — [프로젝트명]", rule: "사례별 제목" },
  { tag: "H2", text: "자주 묻는 질문", rule: "FAQ 섹션" },
];

export const aiSearchOptimization = [
  "질문-답변 구조 활용: FAQ, '~란?' 형태의 섹션 제목",
  "핵심 정보를 문단 첫 문장에 배치 (인용 확률 증가)",
  "리스트, 표 형태로 정보를 구조화 (AI가 파싱하기 쉬움)",
  "명확한 헤딩 계층으로 주제 구분",
  "전문 용어에 대한 정의를 인라인 또는 별도 섹션으로 제공",
  "업데이트 날짜를 명시하여 정보 최신성 표시",
  "저자/전문가 정보를 Schema와 함께 제공 (E-E-A-T 강화)",
  "한 페이지 = 한 주제 원칙 유지",
  "구체적 수치와 사례를 문장에 포함 (AI 요약 시 인용률 증가)",
  "정의형 문장 활용: '[용어]란 [정의]입니다' 구조",
];
