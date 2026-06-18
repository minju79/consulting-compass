// Design system tokens and rules — data-driven design guide

export const brandToneKeywords = [
  "Modern", "Premium", "Clean", "Editorial", "Corporate", "Strategic", "High-Trust", "Conversion-Oriented",
];

export const brandToneDescription = "\"대기업 컨설팅 + 부티크 전략 컨설팅\" 사이의 균형감을 목표로 합니다. 고급스럽지만 과시적이지 않고, 정보가 밀도 있지만 답답하지 않은 톤을 유지하세요.";

export const coreColors = [
  { name: "--primary", value: "262 47% 16%", preview: "hsl(262,47%,16%)" },
  { name: "--primary-foreground", value: "262 60% 98%", preview: "hsl(262,60%,98%)" },
  { name: "--accent", value: "262 75% 58%", preview: "hsl(262,75%,58%)" },
  { name: "--accent-foreground", value: "0 0% 100%", preview: "hsl(0,0%,100%)" },
  { name: "--background", value: "262 30% 98.5%", preview: "hsl(262,30%,98.5%)" },
  { name: "--foreground", value: "262 45% 10%", preview: "hsl(262,45%,10%)" },
];

export const surfaceColors = [
  { name: "--surface", value: "262 20% 97%", preview: "hsl(262,20%,97%)" },
  { name: "--muted", value: "262 15% 96%", preview: "hsl(262,15%,96%)" },
  { name: "--muted-foreground", value: "262 10% 46%", preview: "hsl(262,10%,46%)" },
  { name: "--border", value: "262 20% 90%", preview: "hsl(262,20%,90%)" },
  { name: "--card", value: "0 0% 100%", preview: "hsl(0,0%,100%)" },
  { name: "--destructive", value: "0 84% 60%", preview: "hsl(0,84%,60%)" },
];

export const colorUsageRules = [
  "Primary(딥 퍼플)는 텍스트, 헤더 배경, 주요 버튼에 사용",
  "Accent(연한 퍼플/라벤더)는 포인트 강조, 링크, 활성 상태, 보조 CTA에 사용",
  "배경은 화이트~라이트퍼플 계열로 섹션 간 미묘한 대비 제공",
  "네온, 유치한 그라디언트, 과도한 컬러 조합 금지",
  "텍스트 대비비(WCAG AA 기준 4.5:1) 준수",
];

export const typeScale = [
  { label: "H1 — 페이지 타이틀", size: "text-3xl md:text-4xl", weight: "font-extrabold", example: "전략적 성장을 위한 파트너" },
  { label: "H2 — 섹션 제목", size: "text-xl md:text-2xl", weight: "font-bold", example: "서비스 영역" },
  { label: "H3 — 하위 제목", size: "text-lg", weight: "font-semibold", example: "디지털 전환 컨설팅" },
  { label: "Body — 본문", size: "text-sm md:text-base", weight: "font-normal", example: "고객의 비즈니스 과제를 데이터 기반으로 분석하고 실행 가능한 전략을 수립합니다." },
  { label: "Caption — 보조 텍스트", size: "text-xs", weight: "font-normal", example: "프로젝트 기간: 12주 | 산업: 금융" },
  { label: "Label — 레이블", size: "text-xs", weight: "font-semibold tracking-widest uppercase", example: "CASE STUDY" },
];

export const spacingScale = [
  { px: "4px", rem: "0.25rem", usage: "아이콘-텍스트 간격" },
  { px: "8px", rem: "0.5rem", usage: "카드 내부 최소 간격" },
  { px: "12px", rem: "0.75rem", usage: "요소 간 기본 간격" },
  { px: "16px", rem: "1rem", usage: "섹션 내 그룹 간격" },
  { px: "24px", rem: "1.5rem", usage: "카드 패딩" },
  { px: "32px", rem: "2rem", usage: "섹션 간 간격 (소)" },
  { px: "48px", rem: "3rem", usage: "섹션 간 간격 (중)" },
  { px: "64px", rem: "4rem", usage: "섹션 간 간격 (대)" },
  { px: "96px", rem: "6rem", usage: "페이지 상하단 여백" },
];

export const borderRadii = [
  { label: "sm", value: "4px" },
  { label: "md", value: "6px" },
  { label: "lg", value: "8px" },
  { label: "xl", value: "12px" },
];

export const shadowLevels = [
  { label: "Level 0", shadow: "none", desc: "기본 상태" },
  { label: "Level 1", shadow: "0 1px 3px rgba(0,0,0,0.08)", desc: "카드 기본" },
  { label: "Level 2", shadow: "0 4px 12px rgba(0,0,0,0.08)", desc: "카드 hover" },
  { label: "Level 3", shadow: "0 8px 24px rgba(0,0,0,0.1)", desc: "모달, 드롭다운" },
];

export const imageGuidelines = [
  "실제 비즈니스 환경을 반영한 자연스러운 사진",
  "과도하게 연출된 스톡 사진 지양",
  "다양성을 고려한 인물 사진",
  "밝고 깔끔한 톤의 사무 환경",
  "데이터, 차트, 회의 장면 등 전문적 이미지",
  "일러스트보다 실사 우선 (프로세스 설명 시 예외)",
];

export const iconGuidelines = [
  "선형(outline) 스타일 기본, 2px stroke 권장",
  "일관된 아이콘 세트 사용 (Lucide, Phosphor 등)",
  "한 프로젝트 내에서 스타일 혼용 금지",
  "장식용이 아닌 기능적 아이콘 사용",
  "크기: 16px(인라인), 20px(리스트), 24px(카드)",
];

export const prohibitedVisuals = [
  "과한 글래스모피즘 효과",
  "유치한 3D 오브젝트",
  "의미 없는 파티클·애니메이션 남발",
  "네온 컬러, 장난스러운 그라디언트",
  "게임 UI 같은 표현",
  "e-commerce 스타일 레이아웃",
  "과도한 장식적 폰트",
  "무의미한 스톡 일러스트",
];

export const layoutPrinciples = [
  "12컬럼 그리드 기반, 최대 폭 1200~1440px",
  "섹션 간 64~96px 간격 유지",
  "카드/콘텐츠 블록은 좌우 여백을 충분히 확보",
  "모바일에서는 1컬럼으로 자연스럽게 전환",
  "정보 계층은 시각적 크기와 간격으로 표현",
  "한 섹션에 하나의 핵심 메시지에 집중",
  "above the fold에 핵심 가치 제안 + CTA 배치",
  "비대칭 레이아웃 활용 가능하나 질서감 유지",
];
