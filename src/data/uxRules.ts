// UX rules data for consulting industry

export const userJourneySteps = ["첫 방문 (인식)", "신뢰 확인", "서비스 탐색", "사례 확인", "의사결정", "문의 전환"];

export const visitTypes = [
  { type: "서비스 탐색형", desc: "어떤 서비스를 제공하는지 파악하려는 방문자", flow: "히어로 → 서비스 섹션 → 서비스 상세 → CTA" },
  { type: "사례 검토형", desc: "유사 산업 경험과 성과를 확인하려는 방문자", flow: "히어로 → 사례 → 사례 상세 → 팀 → CTA" },
  { type: "회사 검증형", desc: "이미 소개받은 후 회사를 검증하려는 방문자", flow: "히어로 → 회사 소개 → 팀 → 사례 → CTA" },
  { type: "바로 문의형", desc: "이미 의사결정 후 연락처를 찾는 방문자", flow: "헤더 CTA → 문의 폼 (즉시 접근 가능해야 함)" },
];

export const firstScreenRequirements = [
  "무슨 회사인지 — 업종과 핵심 역량을 한 문장으로",
  "누구를 위한 서비스인지 — 타겟 고객군 명시",
  "무엇을 요청할 수 있는지 — 구체적 CTA 제공",
  "왜 신뢰할 수 있는지 — 로고, 수치, 인증 등 1개 이상",
];

export const ctaPrinciples = [
  { rule: "헤더에 항상 CTA 배치", desc: "어느 페이지에서든 '문의하기'에 즉시 접근 가능" },
  { rule: "히어로에 Primary CTA + Secondary CTA", desc: "주 전환(문의) + 보조 행동(서비스 보기)" },
  { rule: "콘텐츠 3~4섹션마다 중간 CTA", desc: "정보 탐색 후 자연스러운 전환점 제공" },
  { rule: "페이지 하단에 최종 CTA 배너", desc: "모든 정보를 확인한 후의 전환 기회" },
  { rule: "CTA 문구는 구체적으로", desc: "'자세히 보기' ✕ → '프로젝트 문의하기' ✓" },
];

export const trustPlacements = [
  "Above the fold: 고객사 로고 스트립, 핵심 성과 수치",
  "서비스 섹션 직후: 프로세스 다이어그램, 방법론",
  "CTA 인접 영역: 보안 배지, 고객 추천사, '000+개 기업이 선택'",
  "사례 섹션: 구체적 성과 수치가 포함된 케이스 카드",
  "폼 옆: 응답 시간 약속, 개인정보 보호 안내",
  "푸터: 인증, 파트너십 로고, 사업자 정보",
];

export const formStrategy = {
  recommended: [
    "필수 필드 4~5개: 이름, 회사, 이메일, 문의 유형, 메시지",
    "문의 유형은 드롭다운으로 선택 간소화",
    "전화번호는 선택(optional)으로",
    "예산/규모 질문은 제거 또는 선택으로",
    "'영업일 1일 이내 회신' 등 응답 약속 표시",
  ],
  avoid: [
    "필드 7개 이상 (이탈률 급증)",
    "주소, 직급, 부서 등 불필요한 필드",
    "CAPTCHA를 시각적으로 방해되게 배치",
    "제출 후 아무 피드백 없는 폼",
    "에러 메시지가 모호한 폼",
  ],
};

export const bounceFixPatterns = [
  { point: "히어로에서 이탈", fix: "헤드라인이 추상적 → 구체적 가치 제안 + 시각적 증거" },
  { point: "서비스 페이지에서 이탈", fix: "서비스 설명이 나열식 → 문제-해결-성과 구조로 전환" },
  { point: "문의 폼에서 이탈", fix: "필드 과다 → 최소화 + 부담 없는 문의임을 강조" },
  { point: "사례 없는 사이트", fix: "사례가 없으면 → 프로세스/방법론으로 전문성 대체" },
  { point: "모바일 탐색 이탈", fix: "데스크톱 레이아웃 그대로 → 모바일 전용 정보 계층" },
];

export const mobileUxPriorities = [
  "CTA 버튼은 하단 고정(sticky) 또는 쉽게 접근 가능한 위치에",
  "정보 계층은 데스크톱과 동일하게 유지 (단, 표현 방식은 단순화)",
  "카드 그리드 → 1컬럼 세로 스크롤로 전환",
  "이미지 크기 축소, 텍스트 중심으로 전환",
  "터치 영역 최소 44×44px, 충분한 여백",
  "모바일에서 사례 카드는 제목 + 핵심 성과 수치로 축약",
  "햄버거 메뉴 내에도 CTA 버튼 배치",
];

export const microcopyExamples = [
  { bad: "자세히 보기", good: "서비스 상세 확인하기" },
  { bad: "더 알아보기", good: "프로젝트 사례 살펴보기" },
  { bad: "문의하기", good: "프로젝트 문의 시작하기" },
  { bad: "시작하기", good: "무료 상담 신청하기" },
  { bad: "연락처", good: "전문가와 상담하기" },
  { bad: "제출", good: "문의 보내기" },
];

export const accessibilityRules = [
  { category: "포커스", rules: ["모든 인터랙티브 요소에 focus-visible 스타일 적용", "포커스 순서가 시각적 순서와 일치", "모달/드롭다운에서 포커스 트랩 적용"] },
  { category: "상태", rules: ["hover / active / disabled 상태 구분", "aria-expanded로 열림/닫힘 표시", "aria-current='page'로 현재 페이지 표시"] },
  { category: "대비", rules: ["텍스트 대비비 WCAG AA 4.5:1 이상", "큰 텍스트(18px+, bold 14px+) 3:1 이상", "인터랙티브 요소 경계선 3:1 이상"] },
  { category: "키보드", rules: ["Tab/Shift+Tab으로 전체 탐색 가능", "Enter/Space로 활성화 가능", "Escape로 모달/드롭다운 닫기"] },
  { category: "시맨틱", rules: ["header, nav, main, footer, aside 사용", "테이블에 caption, th scope 적용", "폼에 label 연결, fieldset/legend 사용"] },
  { category: "모바일", rules: ["터치 타겟 최소 44×44px", "요소 간 간격 최소 8px", "핀치 줌 차단 금지"] },
];

export const stateDesign = {
  formStates: [
    { state: "default", desc: "기본 상태 — 보더 + 플레이스홀더" },
    { state: "focus", desc: "포커스 — accent 보더 + 링 효과" },
    { state: "error", desc: "에러 — destructive 보더 + 에러 메시지" },
    { state: "success", desc: "성공 — 성공 색상 보더 + 확인 아이콘" },
    { state: "disabled", desc: "비활성 — 낮은 opacity + cursor-not-allowed" },
    { state: "pending", desc: "처리 중 — 스피너 + '전송 중...' 텍스트" },
  ],
  emptyStates: [
    "검색 결과 없음 → 대체 추천 또는 검색 팁 제공",
    "콘텐츠 없음 → 곧 업데이트 안내 + CTA",
    "데이터 로딩 중 → 스켈레톤 UI 또는 프로그레스",
    "에러 발생 → 명확한 안내 + 재시도 버튼",
    "폼 제출 완료 → 감사 메시지 + 다음 단계 안내",
  ],
};
